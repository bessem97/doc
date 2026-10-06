import { HydroScenario, MLModelMetrics, ResearchMilestone, WellData } from './types';

export const RESEARCH_ROADMAP_PHASES: ResearchMilestone[] = [
  {
    phase: 1,
    title: 'Revue bibliographique & État de l\'Art',
    subtitle: 'Géophysique gravimétrique, apprentissage automatique & hydrogéologie',
    status: 'COMPLETED',
    duration: 'Mois 1 - Mois 6',
    deliverables: [
      'Synthèse des méthodes de dérivées directionnelles et filtres multi-échelles (THDR, VDR, Tilt)',
      'Analyse comparative des algorithmes d\'IA appliqués aux failles géologiques',
      'Cadrage théorique du rôle des failles (conduits vs barrières)'
    ],
    scientificGoal: 'Établir les fondements théoriques de la caractérisation gravimétrique assistée par IA.'
  },
  {
    phase: 2,
    title: 'Modélisation synthétique 3D (Partie A)',
    subtitle: 'Création d\'un univers géologique contrôlé & simulation directes',
    status: 'COMPLETED',
    duration: 'Mois 7 - Mois 12',
    deliverables: [
      'Implémentation du script de forward modelling gravimétrique (Python/Voxels)',
      'Génération de 500 configurations géométriques (variations de pendage, rejet, profondeur, bruit)',
      'Extraction automatisée des 7 attributs gravimétriques majeurs'
    ],
    scientificGoal: 'Construire la base de données d\'entraînement synthétique annotée (Truth labels).'
  },
  {
    phase: 3,
    title: 'Machine Learning & Caractérisation (IA)',
    subtitle: 'Entraînement, optimisation et interprétabilité des modèles',
    status: 'IN_PROGRESS',
    duration: 'Mois 13 - Mois 18',
    deliverables: [
      'Évaluation comparative Random Forest, XGBoost et Réseaux de Neurones Convolutionnels',
      'Optimisation des hyperparamètres et validation croisée K-Fold',
      'Calcul des cartes de probabilité de présence de failles'
    ],
    scientificGoal: 'Obtenir un classificateur robuste capable d\'isoler les linéaments de faille sous couverture.'
  },
  {
    phase: 4,
    title: 'Intégration des données gravimétriques réelles (Partie B)',
    subtitle: 'Application au cas d\'étude d\'une plaine structurée tunisienne',
    status: 'IN_PROGRESS',
    duration: 'Mois 19 - Mois 24',
    deliverables: [
      'Prétraitement de la carte de l\'anomalie de Bouguer tunisienne',
      'Calcul des filtres spectraux et grilles d\'attributs réelles',
      'Prédiction probabiliste des linéaments profonds'
    ],
    scientificGoal: 'Valider la transférabilité de la méthode synthétique sur des données de terrain réelles.'
  },
  {
    phase: 5,
    title: 'Validation géologique & Données de forages',
    subtitle: 'Confrontation des prédictions aux observations de terrain',
    status: 'PLANNED',
    duration: 'Mois 25 - Mois 30',
    deliverables: [
      'Superposition avec les failles géologiques affleurantes et sismiques répertoriées',
      'Validation par coupes stratigraphiques et données de coupes de forages',
      'Calcul de la matrice de confusion de terrain'
    ],
    scientificGoal: 'Confirmer l\'exactitude spatiale des linéaments détectés par l\'IA.'
  },
  {
    phase: 6,
    title: 'Interprétation hydrogéologique & Connectivité aquifère',
    subtitle: 'Évaluation du comportement hydraulique des failles',
    status: 'PLANNED',
    duration: 'Mois 31 - Mois 36',
    deliverables: [
      'Analyse des saut de cartes piézométriques à travers les failles',
      'Corrélations avec la qualité de l\'eau (TDS, signatures hydrochimiques)',
      'Détermination des rôles: barrières hydrauliques vs drains conducteurs'
    ],
    scientificGoal: 'Modéliser la connectivité des compartiments aquifères bordés par les failles.'
  },
  {
    phase: 7,
    title: 'Publications scientifiques & Brevets',
    subtitle: 'Valorisation des résultats dans des revues internationales à haut impact',
    status: 'PLANNED',
    duration: 'Mois 34 - Mois 40',
    deliverables: [
      'Rédaction d\'articles soumis aux revues de rang A (ex: Journal of Applied Geophysics)',
      'Présentations dans des congrès internationaux de géophysique et d\'hydrogéologie'
    ],
    scientificGoal: 'Diffuser la méthodologie automatisée au sein de la communauté scientifique.'
  },
  {
    phase: 8,
    title: 'Soutenance de Thèse de Doctorat',
    subtitle: 'Présentation finale devant le jury universitaire',
    status: 'PLANNED',
    duration: 'Mois 42',
    deliverables: [
      'Rédaction du mémoire de thèse de doctorat',
      'Démonstrateur interactif final présenté au jury de thèse'
    ],
    scientificGoal: 'Obtention du titre de Docteur en Géophysique et Intelligence Artificielle.'
  }
];

export const HYDRO_SCENARIOS: HydroScenario[] = [
  {
    id: 'conductive',
    title: '1. Faille Conductrice (Drain Hydraulique)',
    subtitle: 'Zone de faille ouverte à forte perméabilité secondaire',
    description: 'La breche de faille et les micro-fractures adjacentes agissent comme des chenaux privilégiés facilitant l\'écoulement rapide des eaux souterraines d\'un compartiment aquifère à l\'autre.',
    piezometricEffect: 'Continuité des courbes isopièzes avec inflexion vers la faille.',
    hydrochemistryEffect: 'Faciès chimique homogène de part et d\'autre du plan de faille.',
    flowBehavior: 'Les particules traversent librement le plan de faille et s\'accélèrent le long du miroir.',
    color: '#10B981' // emerald
  },
  {
    id: 'barrier',
    title: '2. Faille Barrière (Écran Étanche)',
    subtitle: 'Gouge d\'argile (Fault Gouge) ou cataclase imperméable',
    description: 'L\'écrasement tectonique et le colmatage argileux créent une barrière hydraulique étanche. La faille compartimente le bassin et bloque l\'écoulement latéral.',
    piezometricEffect: 'Saut piézométrique abrupt (décrochement important de la nappe).',
    hydrochemistryEffect: 'Contraste salin fort (TDS et faciès hydrochimique très différents).',
    flowBehavior: 'Les particules stoppent net contre la faille et sont déviées le long de sa frontière.',
    color: '#EF4444' // red/amber accent
  },
  {
    id: 'connected',
    title: '3. Réseau de Failles Connectées (Multi-compartiments)',
    subtitle: 'Système complexe d\'interconnexion aquifère',
    description: 'Un réseau de failles conjuguées crée des conduits sélectifs qui connectent plusieurs réservoirs aquifères séparés à des profondeurs différentes.',
    piezometricEffect: 'Transfert de pression et réalimentation verticale entre nappes.',
    hydrochemistryEffect: 'Mélange isotopique et enrichissement minéral progressif.',
    flowBehavior: 'Les particules cheminent à travers un réseau ramifié interconnecté.',
    color: '#06B6D4' // aqua
  }
];

export const ML_MODELS_COMPARISON: MLModelMetrics[] = [
  {
    name: 'Random Forest',
    auc: 0.942,
    precision: 0.918,
    recall: 0.905,
    f1: 0.911,
    trainingTime: '2.8 s',
    strength: 'Excellente robustesse au bruit gravimétrique, calcul d\'importance des attributs direct, pas de sur-apprentissage.',
    weakness: 'Lissage possible des discontinuités très fines sur les petites failles.',
    useCase: 'Recommandé pour la classification robuste des linéaments régionaux.',
    interpretability: 'Haute'
  },
  {
    name: 'XGBoost',
    auc: 0.961,
    precision: 0.934,
    recall: 0.921,
    f1: 0.927,
    trainingTime: '4.1 s',
    strength: 'Précision maximale sur les bordures de failles abruptes, très performant sur les gradients THDR élevés.',
    weakness: 'Sensible au bruit d\'acquisition gravimétrique extrême sans lissage préalable.',
    useCase: 'Idéal pour cartographier les contours de failles fines et complexes.',
    interpretability: 'Moyenne'
  },
  {
    name: 'Neural Network (CNN 2D)',
    auc: 0.954,
    precision: 0.925,
    recall: 0.914,
    f1: 0.919,
    trainingTime: '18.4 s',
    strength: 'Capte les motifs spatiaux 2D complexes sans ingénierie manuelle excessive d\'attributs.',
    weakness: 'Nécessite un grand volume de données synthétiques d\'entraînement, effet "boîte noire".',
    useCase: 'Détection globale sur grilles gravimétriques haute résolution.',
    interpretability: 'Faible'
  }
];

export const MOCK_TUNISIAN_WELLS: WellData[] = [
  {
    id: 'W-01',
    name: 'Forage Oued-01',
    lat: 36.42,
    lng: 9.88,
    depth: 180,
    piezoHead: 142.5,
    tds: 850,
    aquiferCompartment: 'Compartiment Est',
    flowRole: 'conduit'
  },
  {
    id: 'W-02',
    name: 'Puits El-Menaa 04',
    lat: 36.45,
    lng: 9.82,
    depth: 220,
    piezoHead: 178.2,
    tds: 2400,
    aquiferCompartment: 'Compartiment Ouest (Bloc effondré)',
    flowRole: 'barrier_side'
  },
  {
    id: 'W-03',
    name: 'Piezomètre Djebel-02',
    lat: 36.39,
    lng: 9.94,
    depth: 140,
    piezoHead: 139.8,
    tds: 920,
    aquiferCompartment: 'Compartiment Sud',
    flowRole: 'recharge_zone'
  }
];

export const PRESENTATION_DOCUMENTS = {
  ppt1: {
    filename: '1.pptx',
    path: '/documents/1.pptx',
    title: 'Présentation Scientifique Globale du Projet de Thèse',
    subtitle: 'Cadre méthodologique, synergie Géophysique-IA & Connectivité aquifère',
    slideCount: 24,
    author: 'Samar Khlifi (Encadrement: Hakim Gabtni)',
    abstract: 'Présentation générale décrivant les enjeux de la détection automatisée des failles par gravimétrie et leur impact sur la gestion des ressources en eau en milieu aride.'
  },
  ppt2: {
    filename: '2.pptx',
    path: '/documents/2.pptx',
    title: 'Guide Technique & Simulation Gravimétrique 3D',
    subtitle: 'Pipeline détaillé du Forward Modelling aux attributs fréquentiels FFT',
    slideCount: 38,
    author: 'Samar Khlifi',
    abstract: 'Document technique approfondissant la modélisation synthétique par voxels, le calcul analytique du champ gravimétrique et la matrice de caractéristiques pour les algorithmes ML.'
  }
};
