import { Molecule, MoleculeCategory } from './types';

export const MOLECULES: Molecule[] = [
  // Moléculas Orgânicas Complexas (NIH 3D Print Exchange)
  {
    id: '1',
    name: 'Composto 962',
    formula: 'C₂₈H₃₅NO₉',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'molecule 962 3d',
    modelPath: '/models/962-CPK-color-print_NIH3D.glb',
    description: 'Modelo molecular 3D real do NIH 3D Print Exchange. Estrutura orgânica complexa.',
    modelVariants: {
      cpk: '/models/962-CPK-color-print_NIH3D.glb',
      bas: '/models/962-bas-color-print_NIH3D.glb',
      sticks: '/models/962-sticks-color-vis_NIH3D.glb',
    },
    molecularWeight: 513.58,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/962',
      wikipedia: null,
    },
  },
  {
    id: '2',
    name: 'Composto 1004',
    formula: 'C₁₉H₂₄N₂O₆',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'molecule 1004 3d',
    modelPath: '/models/1004-CPK-color-print_NIH3D.glb',
    description: 'Modelo molecular 3D real do NIH 3D Print Exchange. Composto bioativo.',
    modelVariants: {
      cpk: '/models/1004-CPK-color-print_NIH3D.glb',
      bas: '/models/1004-bas-color-print_NIH3D.glb',
      sticks: '/models/1004-sticks-color-vis_NIH3D.glb',
    },
    molecularWeight: 376.4,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/1004',
      wikipedia: null,
    },
  },
  {
    id: '3',
    name: 'Composto 444539',
    formula: 'C₂₃H₃₀N₆O₄S',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'molecule 444539 3d',
    modelPath: '/models/444539-CPK-color-print_NIH3D.glb',
    description: 'Modelo molecular 3D real do NIH 3D Print Exchange. Inibidor de protease.',
    modelVariants: {
      cpk: '/models/444539-CPK-color-print_NIH3D.glb',
      bas: '/models/444539-bas-color-print_NIH3D.glb',
      sticks: '/models/444539-sticks-color-vis_NIH3D.glb',
    },
    molecularWeight: 486.59,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/444539',
      wikipedia: null,
    },
  },
  {
    id: '7',
    name: 'Metano',
    formula: 'CH₄',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'methane molecule 3d',
    modelPath: '/models/Metano-CPK-color-print_NIH3D.glb',
    description: 'O principal componente do gás natural. Hidrocarboneto mais simples.',
    modelVariants: {
      cpk: '/models/Metano-CPK-color-print_NIH3D.glb',
      bas: '/models/Metano-bas-color-print_NIH3D.glb',
      sticks: '/models/Metano-sticks-color-vis_NIH3D.glb',
    },
    molecularWeight: 16.04,
    meltingPoint: -182.5,
    boilingPoint: -161.5,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/297',
      wikipedia: 'https://pt.wikipedia.org/wiki/Metano',
    },
  },
  
  // Moléculas Biológicas
  {
    id: '4',
    name: 'DNA',
    formula: 'Ácido Desoxirribonucleico',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'DNA strand 3d',
    modelPath: '/models/dna.glb',
    description: 'O código genético de todos os organismos vivos. Dupla hélice.',
    molecularWeight: null,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: null,
      wikipedia: 'https://pt.wikipedia.org/wiki/%C3%81cido_desoxirribonucleico',
    },
  },
  {
    id: '8',
    name: 'Hemoglobina',
    formula: 'Hb (C₂₉₅₂H₄₆₆₄N₈₁₂O₈₃₂S₈Fe₄)',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'hemoglobin molecule 3d',
    modelPath: '/models/hemoglobin.glb',
    description: 'Proteína que transporta oxigênio no sangue dos vertebrados.',
    molecularWeight: 64500,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: null,
      wikipedia: 'https://pt.wikipedia.org/wiki/Hemoglobina',
    },
  },
  {
    id: '13',
    name: 'Neurônio',
    formula: 'Célula Nervosa',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'neuron cell 3d',
    modelPath: '/models/neuron.glb',
    description: 'Unidade funcional do sistema nervoso. Transmite impulsos elétricos.',
    molecularWeight: null,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: null,
      wikipedia: 'https://pt.wikipedia.org/wiki/Neur%C3%B4nio',
    },
  },
  {
    id: '14',
    name: 'Vírus da Gripe',
    formula: 'Influenza A',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'influenza virus 3d',
    modelPath: '/models/influenza.glb',
    description: 'Vírus causador da gripe sazonal. Estrutura esférica com espículas.',
    molecularWeight: null,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: null,
      wikipedia: 'https://pt.wikipedia.org/wiki/V%C3%ADrus_da_influenza',
    },
  },
  
  // Moléculas Orgânicas Comuns
  {
    id: '5',
    name: 'Glicose',
    formula: 'C₆H₁₂O₆',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'glucose molecule 3d',
    modelPath: '/models/glucose.glb',
    description: 'Principal fonte de energia para as células. Monossacarídeo essencial.',
    molecularWeight: 180.16,
    meltingPoint: 146,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5793',
      wikipedia: 'https://pt.wikipedia.org/wiki/Glicose',
    },
  },
  {
    id: '11',
    name: 'Benzeno',
    formula: 'C₆H₆',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'benzene molecule 3d',
    modelPath: '/models/benzene.glb',
    description: 'Hidrocarboneto aromático fundamental na química orgânica.',
    molecularWeight: 78.11,
    meltingPoint: 5.5,
    boilingPoint: 80.1,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/241',
      wikipedia: 'https://pt.wikipedia.org/wiki/Benzeno',
    },
  },
  
  // Fármacos
  {
    id: '6',
    name: 'Cafeína',
    formula: 'C₈H₁₀N₄O₂',
    category: MoleculeCategory.DRUG,
    searchQuery: 'caffeine molecule 3d',
    modelPath: '/models/caffeine.glb',
    description: 'Estimulante do sistema nervoso central. Presente no café e chá.',
    molecularWeight: 194.19,
    meltingPoint: 235,
    boilingPoint: 178,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/2519',
      wikipedia: 'https://pt.wikipedia.org/wiki/Cafe%C3%ADna',
    },
  },
  {
    id: '12',
    name: 'Aspirina',
    formula: 'C₉H₈O₄',
    category: MoleculeCategory.DRUG,
    searchQuery: 'aspirin molecule 3d',
    modelPath: '/models/aspirin.glb',
    description: 'Ácido acetilsalicílico. Analgésico, antitérmico e anti-inflamatório.',
    molecularWeight: 180.16,
    meltingPoint: 135,
    boilingPoint: 140,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/2244',
      wikipedia: 'https://pt.wikipedia.org/wiki/%C3%81cido_acetilsalic%C3%ADlico',
    },
  },
  
  // Moléculas Inorgânicas
  {
    id: '9',
    name: 'Dióxido de Carbono',
    formula: 'CO₂',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'carbon dioxide molecule 3d',
    modelPath: '/models/co2.glb',
    description: 'Gás essencial para a fotossíntese. Principal gás do efeito estufa.',
    molecularWeight: 44.01,
    meltingPoint: -78.5,
    boilingPoint: -57,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/280',
      wikipedia: 'https://pt.wikipedia.org/wiki/Di%C3%B3xido_de_carbono',
    },
  },
  {
    id: '10',
    name: 'Ácido Sulfúrico',
    formula: 'H₂SO₄',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'sulfuric acid molecule 3d',
    modelPath: '/models/sulfuric-acid.glb',
    description: 'Ácido mineral forte e corrosivo. Amplamente usado na indústria.',
    molecularWeight: 98.08,
    meltingPoint: 10,
    boilingPoint: 337,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/1118',
      wikipedia: 'https://pt.wikipedia.org/wiki/%C3%81cido_sulf%C3%BArico',
    },
  },
  
  // Conteúdo Educacional Extra
  {
    id: '15',
    name: 'Bulbasaur',
    formula: 'Pokémon #001',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'bulbasaur 3d model',
    modelPath: '/models/bulbasaur.glb',
    description: 'Modelo 3D do Pokémon Bulbasaur - tipo Grama/Veneno.',
    molecularWeight: null,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: null,
      wikipedia: 'https://pt.wikipedia.org/wiki/Bulbasaur',
    },
  },
  
  // Água (essencial)
  {
    id: '16',
    name: 'Água',
    formula: 'H₂O',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'water molecule 3d',
    modelPath: '/models/water.glb',
    description: 'Molécula essencial para a vida. Solvente universal.',
    molecularWeight: 18.015,
    meltingPoint: 0,
    boilingPoint: 100,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/962',
      wikipedia: 'https://pt.wikipedia.org/wiki/%C3%81gua',
    },
  },
  
  // Oxigênio
  {
    id: '17',
    name: 'Oxigênio',
    formula: 'O₂',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'oxygen molecule 3d',
    modelPath: '/models/oxygen.glb',
    description: 'Gás essencial para a respiração celular. 21% da atmosfera.',
    molecularWeight: 32.00,
    meltingPoint: -218.8,
    boilingPoint: -183,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/977',
      wikipedia: 'https://pt.wikipedia.org/wiki/Oxig%C3%AAnio',
    },
  },
  
  // Nitrogênio
  {
    id: '18',
    name: 'Nitrogênio',
    formula: 'N₂',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'nitrogen molecule 3d',
    modelPath: '/models/nitrogen.glb',
    description: 'Gás mais abundante na atmosfera (78%). Essencial para proteínas.',
    molecularWeight: 28.014,
    meltingPoint: -210,
    boilingPoint: -196,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/947',
      wikipedia: 'https://pt.wikipedia.org/wiki/Nitrog%C3%AAnio',
    },
  },
  
  // Etanol
  {
    id: '19',
    name: 'Etanol',
    formula: 'C₂H₅OH',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'ethanol molecule 3d',
    modelPath: '/models/ethanol.glb',
    description: 'Álcool etílico. Usado como combustível, solvente e em bebidas.',
    molecularWeight: 46.07,
    meltingPoint: -114,
    boilingPoint: 78,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/702',
      wikipedia: 'https://pt.wikipedia.org/wiki/Etanol',
    },
  },
  
  // Amônia
  {
    id: '20',
    name: 'Amônia',
    formula: 'NH₃',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'ammonia molecule 3d',
    modelPath: '/models/ammonia.glb',
    description: 'Composto de nitrogênio. Usado em fertilizantes e limpeza.',
    molecularWeight: 17.031,
    meltingPoint: -77.7,
    boilingPoint: -33.3,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/222',
      wikipedia: 'https://pt.wikipedia.org/wiki/Am%C3%B4nia',
    },
  },
  
  // Cloreto de Sódio
  {
    id: '21',
    name: 'Cloreto de Sódio',
    formula: 'NaCl',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'sodium chloride crystal 3d',
    modelPath: '/models/salt.glb',
    description: 'Sal de cozinha. Essencial para funções biológicas.',
    molecularWeight: 58.44,
    meltingPoint: 801,
    boilingPoint: 1465,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5234',
      wikipedia: 'https://pt.wikipedia.org/wiki/Cloreto_de_s%C3%B3dio',
    },
  },
  
  // Glicina (aminoácido)
  {
    id: '22',
    name: 'Glicina',
    formula: 'C₂H₅NO₂',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'glycine amino acid 3d',
    modelPath: '/models/glycine.glb',
    description: 'Aminoácido mais simples. Componente de proteínas.',
    molecularWeight: 75.07,
    meltingPoint: 233,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/750',
      wikipedia: 'https://pt.wikipedia.org/wiki/Glicina',
    },
  },
  
  // Adrenalina
  {
    id: '23',
    name: 'Adrenalina',
    formula: 'C₉H₁₃NO₃',
    category: MoleculeCategory.DRUG,
    searchQuery: 'adrenaline epinephrine molecule 3d',
    modelPath: '/models/adrenaline.glb',
    description: 'Hormônio do estresse. Prepara o corpo para luta ou fuga.',
    molecularWeight: 183.2,
    meltingPoint: 211,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5871',
      wikipedia: 'https://pt.wikipedia.org/wiki/Adrenalina',
    },
  },
  
  // Insulina
  {
    id: '24',
    name: 'Insulina',
    formula: 'C₂₅₇H₃₈₃N₆₅O₇₇S₆',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'insulin protein 3d',
    modelPath: '/models/insulin.glb',
    description: 'Hormônio que regula a glicose no sangue.',
    molecularWeight: 5808,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: null,
      wikipedia: 'https://pt.wikipedia.org/wiki/Insulina',
    },
  },
  
  // Colesterol
  {
    id: '25',
    name: 'Colesterol',
    formula: 'C₂₇H₄₆O',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'cholesterol molecule 3d',
    modelPath: '/models/cholesterol.glb',
    description: 'Lipídio essencial para membranas celulares e hormônios.',
    molecularWeight: 386.65,
    meltingPoint: 148,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5997',
      wikipedia: 'https://pt.wikipedia.org/wiki/Colesterol',
    },
  },
  
  // Vitamina C
  {
    id: '26',
    name: 'Vitamina C',
    formula: 'C₆H₈O₆',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'vitamin C ascorbic acid 3d',
    modelPath: '/models/vitamin-c.glb',
    description: 'Ácido ascórbico. Antioxidante essencial para o sistema imunológico.',
    molecularWeight: 176.12,
    meltingPoint: 190,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5785',
      wikipedia: 'https://pt.wikipedia.org/wiki/%C3%81cido_asc%C3%B3rbico',
    },
  },
  
  // Paracetamol
  {
    id: '27',
    name: 'Paracetamol',
    formula: 'C₈H₉NO₂',
    category: MoleculeCategory.DRUG,
    searchQuery: 'paracetamol acetaminophen molecule 3d',
    modelPath: '/models/paracetamol.glb',
    description: 'Analgésico e antitérmico comum. Seguro quando usado corretamente.',
    molecularWeight: 151.16,
    meltingPoint: 169,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/1983',
      wikipedia: 'https://pt.wikipedia.org/wiki/Paracetamol',
    },
  },
  
  // Ibuprofeno
  {
    id: '28',
    name: 'Ibuprofeno',
    formula: 'C₁₃H₁₈O₂',
    category: MoleculeCategory.DRUG,
    searchQuery: 'ibuprofen molecule 3d',
    modelPath: '/models/ibuprofen.glb',
    description: 'Anti-inflamatório não esteroidal. Alivia dor e inflamação.',
    molecularWeight: 206.28,
    meltingPoint: 75,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/3672',
      wikipedia: 'https://pt.wikipedia.org/wiki/Ibuprofeno',
    },
  },
  
  // Nicotina
  {
    id: '29',
    name: 'Nicotina',
    formula: 'C₁₀H₁₄N₂',
    category: MoleculeCategory.DRUG,
    searchQuery: 'nicotine molecule 3d',
    modelPath: '/models/nicotine.glb',
    description: 'Alcaloide estimulante encontrado no tabaco. Altamente viciante.',
    molecularWeight: 162.23,
    meltingPoint: -79,
    boilingPoint: 247,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/942',
      wikipedia: 'https://pt.wikipedia.org/wiki/Nicotina',
    },
  },
  
  // Serotonina
  {
    id: '30',
    name: 'Serotonina',
    formula: 'C₁₀H₁₂N₂O',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'serotonin neurotransmitter 3d',
    modelPath: '/models/serotonin.glb',
    description: 'Neurotransmissor do bem-estar. Regula humor, sono e apetite.',
    molecularWeight: 176.22,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5202',
      wikipedia: 'https://pt.wikipedia.org/wiki/Serotonina',
    },
  },
  
  // Dopamina
  {
    id: '31',
    name: 'Dopamina',
    formula: 'C₈H₁₁NO₂',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'dopamine neurotransmitter 3d',
    modelPath: '/models/dopamine.glb',
    description: 'Neurotransmissor do prazer. Envolvido em recompensa e motivação.',
    molecularWeight: 153.18,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/681',
      wikipedia: 'https://pt.wikipedia.org/wiki/Dopamina',
    },
  },
  
  // ATP (energia celular)
  {
    id: '32',
    name: 'ATP',
    formula: 'C₁₀H₁₆N₅O₁₃P₃',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'ATP adenosine triphosphate 3d',
    modelPath: '/models/atp.glb',
    description: 'Adenosina trifosfato. Moeda energética das células.',
    molecularWeight: 507.18,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5957',
      wikipedia: 'https://pt.wikipedia.org/wiki/Adenosina_trifosfato',
    },
  },
  
  // Clorofila
  {
    id: '33',
    name: 'Clorofila A',
    formula: 'C₅₅H₇₂O₅N₄Mg',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'chlorophyll molecule 3d',
    modelPath: '/models/chlorophyll.glb',
    description: 'Pigmento verde da fotossíntese. Converte luz em energia.',
    molecularWeight: 893.49,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/10741',
      wikipedia: 'https://pt.wikipedia.org/wiki/Clorofila',
    },
  },
  
  // Testosterona
  {
    id: '34',
    name: 'Testosterona',
    formula: 'C₁₉H₂₈O₂',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'testosterone hormone 3d',
    modelPath: '/models/testosterone.glb',
    description: 'Hormônio sexual masculino. Desenvolve características masculinas.',
    molecularWeight: 288.42,
    meltingPoint: 155,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/6013',
      wikipedia: 'https://pt.wikipedia.org/wiki/Testosterona',
    },
  },
  
  // Estrogênio
  {
    id: '35',
    name: 'Estradiol',
    formula: 'C₁₈H₂₄O₂',
    category: MoleculeCategory.BIOLOGICAL,
    searchQuery: 'estradiol estrogen hormone 3d',
    modelPath: '/models/estradiol.glb',
    description: 'Principal hormônio sexual feminino. Regula ciclo menstrual.',
    molecularWeight: 272.38,
    meltingPoint: 173,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5757',
      wikipedia: 'https://pt.wikipedia.org/wiki/Estradiol',
    },
  },
  
  // Penicilina
  {
    id: '36',
    name: 'Penicilina G',
    formula: 'C₁₆H₁₈N₂O₄S',
    category: MoleculeCategory.DRUG,
    searchQuery: 'penicillin antibiotic 3d',
    modelPath: '/models/penicillin.glb',
    description: 'Primeiro antibiótico descoberto. Revolucionou a medicina.',
    molecularWeight: 334.39,
    meltingPoint: null,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5904',
      wikipedia: 'https://pt.wikipedia.org/wiki/Penicilina',
    },
  },
  
  // Morphina
  {
    id: '37',
    name: 'Morfina',
    formula: 'C₁₇H₁₉NO₃',
    category: MoleculeCategory.DRUG,
    searchQuery: 'morphine opioid 3d',
    modelPath: '/models/morphine.glb',
    description: 'Analgésico opioide potente. Derivado da papoula.',
    molecularWeight: 285.34,
    meltingPoint: 254,
    boilingPoint: null,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/5288826',
      wikipedia: 'https://pt.wikipedia.org/wiki/Morfina',
    },
  },
  
  // THC (cannabis)
  {
    id: '38',
    name: 'THC',
    formula: 'C₂₁H₃₀O₂',
    category: MoleculeCategory.DRUG,
    searchQuery: 'THC tetrahydrocannabinol 3d',
    modelPath: '/models/thc.glb',
    description: 'Tetrahidrocanabinol. Principal composto psicoativo da cannabis.',
    molecularWeight: 314.46,
    meltingPoint: 105,
    boilingPoint: 200,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/16078',
      wikipedia: 'https://pt.wikipedia.org/wiki/Tetraidrocanabinol',
    },
  },
  
  // Ozônio
  {
    id: '39',
    name: 'Ozônio',
    formula: 'O₃',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'ozone molecule 3d',
    modelPath: '/models/ozone.glb',
    description: 'Forma alotrópica do oxigênio. Protege contra radiação UV.',
    molecularWeight: 48.00,
    meltingPoint: -192,
    boilingPoint: -112,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/24823',
      wikipedia: 'https://pt.wikipedia.org/wiki/Oz%C3%B4nio',
    },
  },
  
  // Peróxido de Hidrogênio
  {
    id: '40',
    name: 'Peróxido de Hidrogênio',
    formula: 'H₂O₂',
    category: MoleculeCategory.INORGANIC,
    searchQuery: 'hydrogen peroxide molecule 3d',
    modelPath: '/models/h2o2.glb',
    description: 'Água oxigenada. Antisséptico e agente branqueador.',
    molecularWeight: 34.015,
    meltingPoint: -0.4,
    boilingPoint: 150,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/784',
      wikipedia: 'https://pt.wikipedia.org/wiki/Per%C3%B3xido_de_hidrog%C3%AAnio',
    },
  },
  
  // Metanol
  {
    id: '41',
    name: 'Metanol',
    formula: 'CH₃OH',
    category: MoleculeCategory.ORGANIC,
    searchQuery: 'methanol alcohol 3d',
    modelPath: '/models/methanol.glb',
    description: 'Álcool metílico. Combustível e solvente industrial. Tóxico.',
    molecularWeight: 32.04,
    meltingPoint: -97.6,
    boilingPoint: 64.7,
    externalLinks: {
      pubchem: 'https://pubchem.ncbi.nlm.nih.gov/compound/887',
      wikipedia: 'https://pt.wikipedia.org/wiki/Metanol',
    },
  },
];