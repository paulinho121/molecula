export enum MoleculeCategory {
  ORGANIC = 'Orgânica',
  INORGANIC = 'Inorgânica',
  BIOLOGICAL = 'Biológica',
  DRUG = 'Farmacêutica'
}

export interface ModelVariants {
  cpk?: string; // CPK (Corey-Pauling-Koltun) color scheme
  bas?: string; // Ball-and-stick model
  sticks?: string; // Stick model
}

export interface ExternalLinks {
  pubchem?: string | null;
  wikipedia?: string | null;
}

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  category: MoleculeCategory;
  searchQuery: string; // The query sent to Google to trigger AR
  modelPath: string; // Path to GLB/GLTF 3D model file
  description?: string; // Short static description
  modelVariants?: ModelVariants; // Alternative visualization styles
  molecularWeight?: number | null; // Molecular weight in g/mol
  meltingPoint?: number | null; // Melting point in °C
  boilingPoint?: number | null; // Boiling point in °C
  externalLinks?: ExternalLinks; // Links to external resources
}

export interface GeminiExplanation {
  funFact: string;
  structure: string;
  usage: string;
}
