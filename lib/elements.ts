// Dados químicos básicos dos elementos (número atômico, símbolo, nome e massa atômica).
// Fonte: tabela periódica IUPAC (massas padrão arredondadas).

export interface ElementInfo {
  symbol: string;
  name: string;      // nome em português
  atomicNumber: number;
  atomicMass: number; // u (g/mol)
}

const ELEMENTS: Record<string, ElementInfo> = {
  H:  { symbol: 'H',  name: 'Hidrogênio',  atomicNumber: 1,  atomicMass: 1.008 },
  He: { symbol: 'He', name: 'Hélio',       atomicNumber: 2,  atomicMass: 4.0026 },
  Li: { symbol: 'Li', name: 'Lítio',       atomicNumber: 3,  atomicMass: 6.94 },
  B:  { symbol: 'B',  name: 'Boro',        atomicNumber: 5,  atomicMass: 10.81 },
  C:  { symbol: 'C',  name: 'Carbono',     atomicNumber: 6,  atomicMass: 12.011 },
  N:  { symbol: 'N',  name: 'Nitrogênio',  atomicNumber: 7,  atomicMass: 14.007 },
  O:  { symbol: 'O',  name: 'Oxigênio',    atomicNumber: 8,  atomicMass: 15.999 },
  F:  { symbol: 'F',  name: 'Flúor',       atomicNumber: 9,  atomicMass: 18.998 },
  Na: { symbol: 'Na', name: 'Sódio',       atomicNumber: 11, atomicMass: 22.99 },
  Mg: { symbol: 'Mg', name: 'Magnésio',    atomicNumber: 12, atomicMass: 24.305 },
  Si: { symbol: 'Si', name: 'Silício',     atomicNumber: 14, atomicMass: 28.085 },
  P:  { symbol: 'P',  name: 'Fósforo',     atomicNumber: 15, atomicMass: 30.974 },
  S:  { symbol: 'S',  name: 'Enxofre',     atomicNumber: 16, atomicMass: 32.06 },
  Cl: { symbol: 'Cl', name: 'Cloro',       atomicNumber: 17, atomicMass: 35.45 },
  K:  { symbol: 'K',  name: 'Potássio',    atomicNumber: 19, atomicMass: 39.098 },
  Ca: { symbol: 'Ca', name: 'Cálcio',      atomicNumber: 20, atomicMass: 40.078 },
  Mn: { symbol: 'Mn', name: 'Manganês',    atomicNumber: 25, atomicMass: 54.938 },
  Fe: { symbol: 'Fe', name: 'Ferro',       atomicNumber: 26, atomicMass: 55.845 },
  Co: { symbol: 'Co', name: 'Cobalto',     atomicNumber: 27, atomicMass: 58.933 },
  Cu: { symbol: 'Cu', name: 'Cobre',       atomicNumber: 29, atomicMass: 63.546 },
  Zn: { symbol: 'Zn', name: 'Zinco',       atomicNumber: 30, atomicMass: 65.38 },
  Se: { symbol: 'Se', name: 'Selênio',     atomicNumber: 34, atomicMass: 78.971 },
  Br: { symbol: 'Br', name: 'Bromo',       atomicNumber: 35, atomicMass: 79.904 },
  I:  { symbol: 'I',  name: 'Iodo',        atomicNumber: 53, atomicMass: 126.90 },
  Pt: { symbol: 'Pt', name: 'Platina',     atomicNumber: 78, atomicMass: 195.08 },
  Hg: { symbol: 'Hg', name: 'Mercúrio',    atomicNumber: 80, atomicMass: 200.59 },
  Pb: { symbol: 'Pb', name: 'Chumbo',      atomicNumber: 82, atomicMass: 207.2 },
};

const SUBSCRIPT_DIGITS: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
};

export function getElement(symbol: string): ElementInfo | undefined {
  return ELEMENTS[symbol];
}

export interface ElementCount extends ElementInfo {
  count: number;
}

/**
 * Converte uma fórmula (ex.: "C₂₈H₃₅NO₉") em contagem por elemento.
 * Aceita subscritos Unicode e dígitos normais. Elementos desconhecidos são ignorados.
 */
export function parseFormula(formula: string): ElementCount[] {
  const normalized = formula.replace(/[₀-₉]/g, (d) => SUBSCRIPT_DIGITS[d]);
  const counts = new Map<string, number>();

  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(normalized)) !== null) {
    const symbol = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    if (!ELEMENTS[symbol]) continue;
    counts.set(symbol, (counts.get(symbol) ?? 0) + count);
  }

  return Array.from(counts.entries())
    .map(([symbol, count]) => ({ ...ELEMENTS[symbol], count }))
    .sort((a, b) => a.atomicNumber - b.atomicNumber);
}
