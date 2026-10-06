import { SimulationParameters, GeophysicalAttribute } from './types';

export const GEOPHYSICAL_ATTRIBUTES_INFO: GeophysicalAttribute[] = [
  {
    id: 'g',
    name: 'Anomalie de Bouguer (g)',
    fullName: 'Anomalie gravimétrique de Bouguer',
    unit: 'mGal',
    definition: 'Champ de gravité résiduel après corrections topographiques, de latitude et de Bouguer.',
    role: 'Révèle la distribution sous-jacente des contrastes de masse et des sous-bassins.',
    exampleValue: '+14.2 mGal'
  },
  {
    id: 'dg_dx',
    name: 'dG / dX',
    fullName: 'Dérivée horizontale X',
    unit: 'mGal/km',
    definition: 'Taux de variation spatiale du champ gravimétrique selon la direction Est-Ouest.',
    role: 'Localise les changements latéraux brusques de densité orientés Nord-Sud.',
    exampleValue: '4.8 mGal/km'
  },
  {
    id: 'dg_dy',
    name: 'dG / dY',
    fullName: 'Dérivée horizontale Y',
    unit: 'mGal/km',
    definition: 'Taux de variation spatiale du champ gravimétrique selon la direction Nord-Sud.',
    role: 'Localise les discontinuités de densité orientées Est-Ouest.',
    exampleValue: '3.1 mGal/km'
  },
  {
    id: 'vdr',
    name: 'VDR',
    fullName: 'Vertical Derivative (Dérivée Verticale dG/dZ)',
    unit: 'mGal/km',
    definition: 'Calculée par transformée de Fourier (FFT) dans le domaine fréquentiel.',
    role: 'Améliore la résolution spectrale des structures superficielles et des bordures de failles.',
    exampleValue: '6.4 mGal/km'
  },
  {
    id: 'thdr',
    name: 'THDR',
    fullName: 'Total Horizontal Derivative Gradient',
    unit: 'mGal/km',
    definition: 'Amp = sqrt( (dG/dX)^2 + (dG/dY)^2 )',
    role: 'Focalise les crêtes directement au-dessus des contacts verticaux ou sous-verticaux de failles.',
    exampleValue: '8.9 mGal/km'
  },
  {
    id: 'tilt',
    name: 'Tilt Angle',
    fullName: 'Angle d\'inclinaison du gradient (TA)',
    unit: 'Degré (°)',
    definition: 'TA = arctan( VDR / THDR )',
    role: 'Normalise l\'amplitude: la ligne d\'isovaleur 0° correspond exactement à la bordure de la faille.',
    exampleValue: '+28.4°'
  },
  {
    id: 'theta',
    name: 'Theta Map',
    fullName: 'Carte d\'angle d\'amplitude normalisée',
    unit: 'Rad',
    definition: 'cos(Theta) = THDR / Total Gradient Amplitude',
    role: 'Distingue très nettement les failles sub-verticales des intrusions profondes sans distorsion.',
    exampleValue: '0.74 rad'
  }
];

export interface GridPoint {
  x: number; // km
  y: number; // km
  g: number; // mGal
  thdr: number;
  vdr: number;
  tilt: number;
  theta: number;
  faultProb: number; // 0 to 1
  isFaultZone: boolean;
}

export function generateSyntheticGravityData(params: SimulationParameters, gridSize: number = 33): {
  grid: GridPoint[][];
  xCoords: number[];
  yCoords: number[];
  metrics: {
    maxG: number;
    minG: number;
    maxThdr: number;
    avgProb: number;
    faultLengthKm: number;
  };
} {
  const { fault_x0, dip_deg, rho, z_top, noise_mgal, seed } = params;
  
  // Seeded simple pseudorandom generator
  let currentSeed = seed || 42;
  const pseudoRandom = () => {
    const x = Math.sin(currentSeed++) * 10000;
    return x - Math.floor(x);
  };

  const grid: GridPoint[][] = [];
  const xCoords: number[] = [];
  const yCoords: number[] = [];

  const minX = -10; // km
  const maxX = 10;
  const minY = -10;
  const maxY = 10;
  const stepX = (maxX - minX) / (gridSize - 1);
  const stepY = (maxY - minY) / (gridSize - 1);

  for (let i = 0; i < gridSize; i++) {
    xCoords.push(Number((minX + i * stepX).toFixed(2)));
    yCoords.push(Number((minY + i * stepY).toFixed(2)));
  }

  // Dip conversion
  const dipRad = (dip_deg * Math.PI) / 180;
  const faultX0Km = fault_x0 / 1000; // convert to km

  let maxG = -Infinity;
  let minG = Infinity;
  let maxThdr = -Infinity;
  let totalProb = 0;

  for (let j = 0; j < gridSize; j++) {
    const y = yCoords[j];
    const row: GridPoint[] = [];

    for (let i = 0; i < gridSize; i++) {
      const x = xCoords[i];

      // Fault trace equation with a slight curvature along Y
      const localFaultX = faultX0Km + 0.5 * Math.sin(y * 0.3) + (z_top / 1000) * Math.cos(dipRad);
      const distToFault = Math.abs(x - localFaultX);

      // Forward gravity anomaly model of a step/fault contact
      // G(x) ~ 2 * G_const * rho * [ (x-x0)*atan((x-x0)/z) + ... ]
      const contrast = rho / 300; // normalized density contrast
      const depthKm = Math.max(0.2, z_top / 1000);
      
      // Step anomaly profile
      const atanVal = Math.atan((x - localFaultX) / depthKm);
      let gBase = 12 * contrast * (atanVal / (Math.PI / 2)) + 5;
      
      // Secondary regional background trend
      const regional = 0.2 * x - 0.1 * y;
      
      // Random measurement noise
      const noise = (pseudoRandom() - 0.5) * 2 * (noise_mgal || 0.05);

      const g = gBase + regional + noise;

      // Analytical geophysical attributes
      const dg_dx = 12 * contrast * (depthKm / (depthKm * depthKm + Math.pow(x - localFaultX, 2)));
      const dg_dy = 0.15 * Math.cos(y * 0.3);
      const thdr = Math.sqrt(dg_dx * dg_dx + dg_dy * dg_dy);
      
      // Vertical derivative (VDR) peaks where derivative is sharp
      const vdr = (x - localFaultX) < 0 
        ? -10 * contrast / (1 + Math.pow((x - localFaultX)/depthKm, 2))
        : 10 * contrast / (1 + Math.pow((x - localFaultX)/depthKm, 2));

      // Tilt Angle = arctan(VDR / THDR)
      const tilt = (Math.atan2(vdr, Math.max(0.01, thdr)) * 180) / Math.PI;

      // Theta Map
      const theta = Math.acos(Math.min(1, thdr / Math.max(0.01, Math.sqrt(thdr * thdr + vdr * vdr))));

      // Machine Learning simulated Fault Probability (highest at peak THDR & tilt zero-crossing)
      const isFaultZone = distToFault < 0.8;
      const probBase = Math.exp(-Math.pow(distToFault / (0.4 + depthKm * 0.2), 2));
      const faultProb = Math.min(0.99, Math.max(0.01, probBase * (0.85 + 0.15 * pseudoRandom())));

      maxG = Math.max(maxG, g);
      minG = Math.min(minG, g);
      maxThdr = Math.max(maxThdr, thdr);
      totalProb += faultProb;

      row.push({
        x,
        y,
        g: Number(g.toFixed(2)),
        thdr: Number(thdr.toFixed(2)),
        vdr: Number(vdr.toFixed(2)),
        tilt: Number(tilt.toFixed(1)),
        theta: Number(theta.toFixed(2)),
        faultProb: Number(faultProb.toFixed(3)),
        isFaultZone
      });
    }
    grid.push(row);
  }

  const count = gridSize * gridSize;
  const avgProb = Number((totalProb / count).toFixed(3));
  const faultLengthKm = Number((maxY - minY).toFixed(1));

  return {
    grid,
    xCoords,
    yCoords,
    metrics: {
      maxG: Number(maxG.toFixed(2)),
      minG: Number(minG.toFixed(2)),
      maxThdr: Number(maxThdr.toFixed(2)),
      avgProb,
      faultLengthKm
    }
  };
}
