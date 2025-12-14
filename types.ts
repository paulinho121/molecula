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

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  category: MoleculeCategory;
  searchQuery: string; // The query sent to Google to trigger AR
  modelPath: string; // Path to GLB/GLTF 3D model file
  description?: string; // Short static description
  modelVariants?: ModelVariants; // Alternative visualization styles
}

export interface GeminiExplanation {
  funFact: string;
  structure: string;
  usage: string;
}
