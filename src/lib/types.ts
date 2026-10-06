export interface SimulationParameters {
  fault_x0: number; // m
  dip_deg: number; // degrees
  rho: number; // kg/m^3 (density contrast)
  z_top: number; // m
  z_bottom: number; // m
  x_half: number; // m
  y_half: number; // m
  cell: number; // voxel cell size m
  noise_mgal: number; // mGal
  seed: number;
}

export interface GeophysicalAttribute {
  id: 'g' | 'dg_dx' | 'dg_dy' | 'vdr' | 'thdr' | 'tilt' | 'theta';
  name: string;
  fullName: string;
  unit: string;
  definition: string;
  role: string;
  exampleValue: string;
}

export type AttributeType = 'g' | 'thdr' | 'vdr' | 'tilt' | 'theta';

export type DataTypeTag = 'REAL' | 'SYNTHETIC' | 'PROTOTYPE';

export interface GeologicalLayer {
  name: string;
  depthTop: number;
  depthBottom: number;
  density: number;
  color: string;
}

export interface HydroScenario {
  id: 'conductive' | 'barrier' | 'connected';
  title: string;
  subtitle: string;
  description: string;
  piezometricEffect: string;
  hydrochemistryEffect: string;
  flowBehavior: string;
  color: string;
}

export interface MLModelMetrics {
  name: string;
  auc: number;
  precision: number;
  recall: number;
  f1: number;
  trainingTime: string;
  strength: string;
  weakness: string;
  useCase?: string;
  interpretability: 'Haute' | 'Moyenne' | 'Faible';
}


export interface ResearchMilestone {
  phase: number;
  title: string;
  subtitle: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED';
  duration: string;
  deliverables: string[];
  scientificGoal: string;
}

export interface WellData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  depth: number;
  piezoHead: number; // meters
  tds: number; // mg/L total dissolved solids
  aquiferCompartment: string;
  flowRole: 'conduit' | 'barrier_side' | 'recharge_zone';
}
