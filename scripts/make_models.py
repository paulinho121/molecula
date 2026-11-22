#!/usr/bin/env python3
"""
Gera modelos 3D (.glb) das moléculas a partir do PubChem, no mesmo estilo
dos arquivos do NIH/ChimeraX que já estão em public/models.

Para cada molécula são gerados 3 arquivos:
  <slug>-cpk.glb     esferas de van der Waals (CPK)
  <slug>-bas.glb     bola e bastão
  <slug>-sticks.glb  bastões

As cores ficam nos vértices (COLOR_0), sem materiais, igual aos GLBs do NIH.
Usa apenas a biblioteca padrão do Python (não precisa instalar nada).

Uso (na pasta molecula):
  python scripts/make_models.py "aspirin" "vitamin C" --out public/models
  python scripts/make_models.py --cid 2244 --slug aspirin --out public/models

Depois de gerar, o script imprime o trecho de modelVariants para colar em constants.ts.
"""

import argparse
import json
import math
import re
import struct
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

PUG = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound"
USER_AGENT = "molecula-model-converter/1.0"

# Cores CPK (RGB) no padrão usado pelo ChimeraX.
CPK_COLORS = {
    "H": (255, 255, 255), "C": (144, 144, 144), "N": (48, 80, 248),
    "O": (255, 13, 13), "F": (144, 224, 80), "Na": (171, 92, 242),
    "Mg": (138, 255, 0), "P": (255, 128, 0), "S": (255, 255, 48),
    "Cl": (31, 240, 31), "K": (143, 64, 212), "Ca": (61, 255, 0),
    "Fe": (224, 102, 51), "Zn": (125, 128, 176), "Br": (166, 41, 41),
    "I": (148, 0, 148), "Se": (255, 161, 0), "B": (255, 181, 181),
    "Si": (240, 200, 160), "Cu": (200, 128, 51), "Co": (240, 144, 160),
}
DEFAULT_COLOR = (255, 20, 147)

# Raios de van der Waals (Å).
VDW_RADII = {
    "H": 1.20, "C": 1.70, "N": 1.55, "O": 1.52, "F": 1.47, "P": 1.80,
    "S": 1.80, "Cl": 1.75, "Br": 1.85, "I": 1.98, "Na": 2.27, "K": 2.75,
}
DEFAULT_RADIUS = 1.80

BAS_ATOM_RADIUS = 0.35
BAS_BOND_RADIUS = 0.15
STICK_RADIUS = 0.20


# ---------------------------------------------------------------- PubChem

def fetch_sdf(query: str, by_cid: bool) -> str:
    """Baixa o SDF 3D do PubChem; se não houver 3D, usa 2D (sem profundidade)."""
    if by_cid:
        base = f"{PUG}/cid/{query}/record/SDF"
    else:
        base = f"{PUG}/name/{urllib.parse.quote(query)}/record/SDF"

    for record_type in ("3d", "2d"):
        url = f"{base}?record_type={record_type}"
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                text = resp.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as err:
            if record_type == "2d":
                raise RuntimeError(f"PubChem não encontrou '{query}' ({err.code})") from err
            continue
        if record_type == "2d":
            print(f"  aviso: '{query}' sem conformador 3D; usando 2D (z = 0)", file=sys.stderr)
        return text
    raise RuntimeError(f"Falha ao baixar '{query}'")


def fetch_pdb(pdb_id: str) -> str:
    """Baixa o arquivo PDB da estrutura no RCSB (macromoléculas, proteínas etc.)."""
    url = f"https://files.rcsb.org/download/{pdb_id.upper()}.pdb"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as err:
        raise RuntimeError(f"RCSB não encontrou '{pdb_id}' ({err.code})") from err


# ---------------------------------------------------------------- PDB parsing

COVALENT_RADII = {
    "H": 0.31, "C": 0.76, "N": 0.71, "O": 0.66, "F": 0.57, "P": 1.07,
    "S": 1.05, "Cl": 1.02, "Br": 1.20, "I": 1.39, "Na": 1.66, "K": 2.03,
    "Mg": 1.41, "Ca": 1.76, "Fe": 1.32, "Zn": 1.22, "Cu": 1.32, "Co": 1.26,
    "Se": 1.20, "Mn": 1.39,
}


def parse_pdb(text: str, chains=None, skip_water: bool = True):
    """Lê ATOM/HETATM do PDB. Retorna (átomos, ligações por distância)."""
    atoms = []
    for line in text.splitlines():
        if not (line.startswith("ATOM") or line.startswith("HETATM")):
            continue
        resname = line[17:20].strip()
        if skip_water and resname in ("HOH", "WAT"):
            continue
        chain = line[21:22].strip()
        if chains and chain not in chains:
            continue
        altloc = line[16:17].strip()
        if altloc not in ("", "A"):
            continue
        x, y, z = float(line[30:38]), float(line[38:46]), float(line[46:54])
        element = line[76:78].strip()
        if not element:
            element = line[12:16].strip().lstrip("0123456789")[:1]
        element = element.capitalize() if len(element) == 2 else element.upper()
        atoms.append((element, (x, y, z)))
    if not atoms:
        raise ValueError("nenhum átomo encontrado no PDB (verifique --chains)")
    return atoms, bonds_by_distance(atoms)


def bonds_by_distance(atoms):
    """Ligações covalentes por distância (grade espacial para não ser O(n²))."""
    cell = 2.5  # maior distância de ligação possível (S–S ≈ 2.4 Å com tolerância)
    grid = {}
    for idx, (_, (x, y, z)) in enumerate(atoms):
        key = (int(x // cell), int(y // cell), int(z // cell))
        grid.setdefault(key, []).append(idx)

    bonds = []
    for i, (sym_i, pos_i) in enumerate(atoms):
        kx, ky, kz = int(pos_i[0] // cell), int(pos_i[1] // cell), int(pos_i[2] // cell)
        r_i = COVALENT_RADII.get(sym_i, 0.8)
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for dz in (-1, 0, 1):
                    for j in grid.get((kx + dx, ky + dy, kz + dz), ()):
                        if j <= i:
                            continue
                        sym_j, pos_j = atoms[j]
                        r_j = COVALENT_RADII.get(sym_j, 0.8)
                        limit = (r_i + r_j) * 1.15
                        d2 = sum((a - b) ** 2 for a, b in zip(pos_i, pos_j))
                        if 0.16 < d2 < limit * limit:
                            bonds.append((i, j))
    return bonds


# ---------------------------------------------------------------- SDF parsing

def parse_sdf(text: str):
    """Lê o primeiro registro do SDF (formato V2000). Retorna (átomos, ligações)."""
    record = text.split("$$$$")[0].splitlines()
    if len(record) < 4:
        raise ValueError("SDF inválido")
    counts = record[3]
    n_atoms = int(counts[0:3])
    n_bonds = int(counts[3:6])

    atoms = []  # (symbol, (x, y, z))
    for line in record[4:4 + n_atoms]:
        parts = line.split()
        x, y, z = (float(parts[0]), float(parts[1]), float(parts[2]))
        atoms.append((parts[3], (x, y, z)))

    bonds = []  # (i, j) índices base 0
    for line in record[4 + n_atoms:4 + n_atoms + n_bonds]:
        parts = line.split()
        bonds.append((int(parts[0]) - 1, int(parts[1]) - 1))

    if not atoms:
        raise ValueError("SDF sem átomos")
    return atoms, bonds


# ---------------------------------------------------------------- geometria

def _sub(a, b):
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def _add(a, b):
    return (a[0] + b[0], a[1] + b[1], a[2] + b[2])


def _scale(a, s):
    return (a[0] * s, a[1] * s, a[2] * s)


def _norm(a):
    length = math.sqrt(a[0] ** 2 + a[1] ** 2 + a[2] ** 2) or 1.0
    return (a[0] / length, a[1] / length, a[2] / length)


def _cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


class Mesh:
    """Acumula vértices (posição, normal, cor RGBA) e triângulos."""

    def __init__(self, low_detail: bool = False):
        self.positions = []
        self.normals = []
        self.colors = []
        self.indices = []
        # Menos segmentos para estruturas grandes, para o GLB não ficar enorme.
        self.sphere_rings, self.sphere_segments = (6, 8) if low_detail else (12, 16)
        self.cyl_segments = 6 if low_detail else 12

    def add_quad_grid(self, grid, color):
        # grid: matriz (linhas x colunas) de (posição, normal)
        base_rows = len(grid)
        base_cols = len(grid[0])
        start = len(self.positions)
        for row in grid:
            for pos, nrm in row:
                self.positions.append(pos)
                self.normals.append(nrm)
                self.colors.append(color)
        for r in range(base_rows - 1):
            for c in range(base_cols - 1):
                a = start + r * base_cols + c
                b = a + 1
                d = a + base_cols
                e = d + 1
                self.indices.extend([a, d, b, b, d, e])

    def add_sphere(self, center, radius, color, rings=None, segments=None):
        rings = rings or self.sphere_rings
        segments = segments or self.sphere_segments
        grid = []
        for i in range(rings + 1):
            theta = math.pi * i / rings
            row = []
            for j in range(segments + 1):
                phi = 2 * math.pi * j / segments
                n = (math.sin(theta) * math.cos(phi), math.cos(theta), math.sin(theta) * math.sin(phi))
                row.append((_add(center, _scale(n, radius)), n))
            grid.append(row)
        self.add_quad_grid(grid, color)

    def add_cylinder(self, p0, p1, radius, color, segments=None):
        segments = segments or self.cyl_segments
        axis = _sub(p1, p0)
        if math.sqrt(sum(c * c for c in axis)) < 1e-6:
            return
        d = _norm(axis)
        helper = (1.0, 0.0, 0.0) if abs(d[0]) < 0.9 else (0.0, 1.0, 0.0)
        u = _norm(_cross(d, helper))
        v = _cross(d, u)
        grid = [[], []]
        for k in range(segments + 1):
            phi = 2 * math.pi * k / segments
            n = _add(_scale(u, math.cos(phi)), _scale(v, math.sin(phi)))
            grid[0].append((_add(p0, _scale(n, radius)), n))
            grid[1].append((_add(p1, _scale(n, radius)), n))
        self.add_quad_grid(grid, color)

    def to_arrays(self):
        return self.positions, self.normals, self.colors, self.indices


# ---------------------------------------------------------------- montagem

def build_mesh(atoms, bonds, style: str, low_detail: bool = False) -> Mesh:
    mesh = Mesh(low_detail=low_detail)
    colors = [CPK_COLORS.get(sym, DEFAULT_COLOR) + (255,) for sym, _ in atoms]
    positions = [pos for _, pos in atoms]

    if style == "cpk":
        for (sym, pos), col in zip(atoms, colors):
            radius = VDW_RADII.get(sym, DEFAULT_RADIUS)
            mesh.add_sphere(pos, radius, col)
        return mesh

    if style == "bas":
        for (sym, pos), col in zip(atoms, colors):
            mesh.add_sphere(pos, BAS_ATOM_RADIUS, col)
        bond_radius = BAS_BOND_RADIUS
    else:  # sticks
        # Sem ligações (ex.: sais iônicos), mostra os átomos como esferas.
        bonded = {i for b in bonds for i in b} or set(range(len(atoms)))
        for i in bonded:
            mesh.add_sphere(positions[i], STICK_RADIUS, colors[i])
        bond_radius = STICK_RADIUS

    # Cada ligação é dividida ao meio e cada metade recebe a cor do seu átomo.
    for i, j in bonds:
        p0, p1 = positions[i], positions[j]
        mid = _scale(_add(p0, p1), 0.5)
        mesh.add_cylinder(p0, mid, bond_radius, colors[i])
        mesh.add_cylinder(mid, p1, bond_radius, colors[j])
    return mesh


# ---------------------------------------------------------------- GLB

def write_glb(mesh: Mesh, path: Path, name: str):
    positions, normals, colors, indices = mesh.to_arrays()
    if not positions:
        raise ValueError("malha vazia")

    buf = bytearray()
    buffer_views = []
    accessors = []

    def add_view(data: bytes, target: int):
        while len(buf) % 4:
            buf.append(0)
        offset = len(buf)
        buf.extend(data)
        buffer_views.append({"buffer": 0, "byteOffset": offset, "byteLength": len(data), "target": target})
        return len(buffer_views) - 1

    def add_accessor(view, count, ctype, atype, extra=None):
        acc = {"bufferView": view, "componentType": ctype, "count": count, "type": atype}
        if extra:
            acc.update(extra)
        accessors.append(acc)
        return len(accessors) - 1

    # POSITION (float VEC3) com min/max
    flat_pos = b"".join(struct.pack("<3f", *p) for p in positions)
    mins = [min(p[k] for p in positions) for k in range(3)]
    maxs = [max(p[k] for p in positions) for k in range(3)]
    pos_acc = add_accessor(add_view(flat_pos, 34962), len(positions), 5126, "VEC3",
                           {"min": mins, "max": maxs})

    flat_nrm = b"".join(struct.pack("<3f", *n) for n in normals)
    nrm_acc = add_accessor(add_view(flat_nrm, 34962), len(normals), 5126, "VEC3")

    # COLOR_0 (ubyte VEC4 normalizado), igual aos GLBs do NIH
    flat_col = b"".join(struct.pack("<4B", *c) for c in colors)
    col_acc = add_accessor(add_view(flat_col, 34962), len(colors), 5121, "VEC4", {"normalized": True})

    flat_idx = struct.pack(f"<{len(indices)}I", *indices)
    idx_acc = add_accessor(add_view(flat_idx, 34963), len(indices), 5125, "SCALAR")

    gltf = {
        "asset": {"version": "2.0", "generator": "molecula scripts/make_models.py"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0, "name": name}],
        "meshes": [{"primitives": [{
            "attributes": {"POSITION": pos_acc, "NORMAL": nrm_acc, "COLOR_0": col_acc},
            "indices": idx_acc,
        }]}],
        "accessors": accessors,
        "bufferViews": buffer_views,
        "buffers": [{"byteLength": len(buf)}],
    }

    json_bytes = json.dumps(gltf, separators=(",", ":")).encode("utf-8")
    json_bytes += b" " * ((4 - len(json_bytes) % 4) % 4)
    while len(buf) % 4:
        buf.append(0)

    total = 12 + 8 + len(json_bytes) + 8 + len(buf)
    with open(path, "wb") as f:
        f.write(struct.pack("<4sII", b"glTF", 2, total))
        f.write(struct.pack("<I4s", len(json_bytes), b"JSON"))
        f.write(json_bytes)
        f.write(struct.pack("<I4s", len(buf), b"BIN\x00"))
        f.write(bytes(buf))


# ---------------------------------------------------------------- principal

def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "molecule"


def convert_pdb(pdb_id: str, chains, slug: str, out_dir: Path):
    print(f"[PDB {pdb_id}] baixando do RCSB...")
    text = fetch_pdb(pdb_id)
    atoms, bonds = parse_pdb(text, chains=chains)
    print(f"  {len(atoms)} átomos, {len(bonds)} ligações")
    low = len(atoms) > 1500
    if low:
        print("  estrutura grande: usando esferas de menor resolução")

    cx = sum(p[0] for _, p in atoms) / len(atoms)
    cy = sum(p[1] for _, p in atoms) / len(atoms)
    cz = sum(p[2] for _, p in atoms) / len(atoms)
    atoms = [(s, (p[0] - cx, p[1] - cy, p[2] - cz)) for s, p in atoms]

    files = {}
    for style in ("cpk", "bas", "sticks"):
        mesh = build_mesh(atoms, bonds, style, low_detail=low)
        out = out_dir / f"{slug}-{style}.glb"
        write_glb(mesh, out, f"{slug}-{style}")
        files[style] = out
        print(f"  gerado: {out} ({out.stat().st_size // 1024} KB)")
    return files


def convert(query: str, by_cid: bool, slug: str, out_dir: Path):
    print(f"[{query}] baixando do PubChem...")
    sdf = fetch_sdf(query, by_cid)
    atoms, bonds = parse_sdf(sdf)
    print(f"  {len(atoms)} átomos, {len(bonds)} ligações")

    # Centraliza a molécula na origem (o viewer enquadra o resto).
    cx = sum(p[0] for _, p in atoms) / len(atoms)
    cy = sum(p[1] for _, p in atoms) / len(atoms)
    cz = sum(p[2] for _, p in atoms) / len(atoms)
    atoms = [(s, (p[0] - cx, p[1] - cy, p[2] - cz)) for s, p in atoms]

    files = {}
    for style in ("cpk", "bas", "sticks"):
        mesh = build_mesh(atoms, bonds, style)
        out = out_dir / f"{slug}-{style}.glb"
        write_glb(mesh, out, f"{slug}-{style}")
        files[style] = out
        print(f"  gerado: {out} ({out.stat().st_size // 1024} KB)")
    return files


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("names", nargs="*", help="nomes de compostos em inglês (PubChem)")
    parser.add_argument("--cid", help="CID do PubChem (use com --slug)")
    parser.add_argument("--slug", help="nome dos arquivos gerados (padrão: nome em minúsculas)")
    parser.add_argument("--pdb", help="ID de estrutura do RCSB (ex.: 1A3N), em vez de nome/CID")
    parser.add_argument("--chains", help="cadeias do PDB a incluir, separadas por vírgula (ex.: A,B)")
    parser.add_argument("--out", default="public/models", help="pasta de saída (padrão: public/models)")
    args = parser.parse_args(argv)

    if not args.names and not args.cid and not args.pdb:
        parser.error("informe nomes de compostos, --cid ou --pdb")

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    if args.pdb:
        if not args.slug:
            parser.error("--pdb precisa de --slug")
        chains = [c.strip() for c in args.chains.split(",")] if args.chains else None
        try:
            files = convert_pdb(args.pdb, chains, slugify(args.slug), out_dir)
        except Exception as err:
            print(f"  ERRO em PDB '{args.pdb}': {err}", file=sys.stderr)
            return 1
        print("  modelVariants sugerido para constants.ts:")
        print("    modelVariants: {")
        for style in ("cpk", "bas", "sticks"):
            print(f"      {style}: '/models/{files[style].name}',")
        print("    },")
        return 0

    jobs = []
    if args.cid:
        if not args.slug:
            parser.error("--cid precisa de --slug")
        jobs.append((args.cid, True, slugify(args.slug)))
    for name in args.names:
        jobs.append((name, False, slugify(args.slug) if args.slug and len(args.names) == 1 else slugify(name)))

    failed = []
    for query, by_cid, slug in jobs:
        try:
            files = convert(query, by_cid, slug, out_dir)
        except Exception as err:  # continua com as próximas moléculas
            print(f"  ERRO em '{query}': {err}", file=sys.stderr)
            failed.append(query)
            continue
        print("  modelVariants sugerido para constants.ts:")
        print("    modelVariants: {")
        for style, key in (("cpk", "cpk"), ("bas", "bas"), ("sticks", "sticks")):
            print(f"      {key}: '/models/{files[style].name}',")
        print("    },")

    if failed:
        print(f"Falharam: {', '.join(failed)}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
