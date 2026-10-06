'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Code, 
  Layers, 
  Cpu, 
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { PPTViewer } from './PPTViewer';
import { PRESENTATION_DOCUMENTS } from '@/lib/mock-data';

interface StepDetail {
  number: string;
  title: string;
  simple: string;
  technical: string;
  code: string;
  whyMatters: string;
}

const STEPS_DATA: StepDetail[] = [
  {
    number: '01',
    title: 'Grille Spatiale (Grid)',
    simple: 'Création du maillage horizontal X-Y sur lequel les mesures de pesanteur seront calculées.',
    technical: 'Matrice régulière 61x61 points avec un pas spatial dx=dy=100m couvrant un domaine de 6km x 6km.',
    code: 'x = np.linspace(-3000, 3000, 61)\nY, X = np.meshgrid(x, x)',
    whyMatters: 'Définit la résolution spatiale maximale pour la détection des failles.'
  },
  {
    number: '02',
    title: 'Sources Géologiques',
    simple: 'Définition des couches sédimentaires et des contrastes de masse.',
    technical: 'Contrastes de densité rho allant de +100 à +450 kg/m³ entre l\'encaissant et les blocs faillés.',
    code: 'rho_contrast = 350.0  # kg/m3',
    whyMatters: 'Sans contraste de densité, une faille ne produit aucune anomalie gravimétrique mesurable.'
  },
  {
    number: '03',
    title: 'Géométrie de Faille',
    simple: 'Modélisation du plan de faille avec son pendage, sa profondeur et son rejet.',
    technical: 'Surface inclinée à dip_deg=60° coupant les couches de z_top=200m à z_bottom=1500m.',
    code: 'dist = X - (fault_x0 + (z_top/1000) * np.cos(np.radians(dip)))',
    whyMatters: 'Permet de tester des failles normales, inverses et sub-verticales.'
  },
  {
    number: '04',
    title: 'Discrétisation par Voxels',
    simple: 'Division du sous-sol en petits cubes 3D élémentaires (voxels).',
    technical: 'Découpage du volume sous-terrain en éléments finis 3D (cell=50m à 100m).',
    code: 'voxels = np.zeros((nx, ny, nz), dtype=float)',
    whyMatters: 'Permet de calculer le champ gravimétrique de n\'importe quelle forme complexe.'
  },
  {
    number: '05',
    title: 'Calcul Gravimétrique Direct (Forward Model)',
    simple: 'Calcul de la pesanteur théorique générée en chaque point de surface.',
    technical: 'Calcul de l\'attraction Newtonienne g(x,y) par intégration analytique du prisme rectangulaire.',
    code: 'g_raw = 2 * G * rho * ( (dist+w)*np.arctan((dist+w)/z) - ... )',
    whyMatters: 'Simule ce qu\'un gravimètre de terrain mesurerait au-dessus du bassin.'
  },
  {
    number: '06',
    title: 'Bruit & Filtre de Lissage',
    simple: 'Ajout d\'un bruit de mesure réaliste et d\'un lissage gaussien léger.',
    technical: 'Injection d\'un bruit blanc gaussien (N(0, 0.04 mGal)) simulant les erreurs d\'acquisition.',
    code: 'noise = np.random.normal(0, 0.04, size=g_raw.shape)\ng_obs = g_raw + noise',
    whyMatters: 'Test la robustesse des algorithmes IA face aux erreurs d\'instruments réels.'
  },
  {
    number: '07',
    title: 'Transformée de Fourier (FFT 2D)',
    simple: 'Passage dans le domaine fréquentiel pour dériver le champ en profondeur.',
    technical: 'Calcul des fréquences spatiales K = 2*pi*sqrt(Fx² + Fy²) par 2D FFT.',
    code: 'G_fft = np.fft.fft2(g_obs)\nVDR_fft = G_fft * K',
    whyMatters: 'Permet d\'obtenir la dérivée verticale VDR indispensable pour amplifier les bordures.'
  },
  {
    number: '08',
    title: 'Extraction des 7 Attributs Géophysiques',
    simple: 'Calcul de la signature multi-filtres (THDR, VDR, Tilt Angle, Theta Map).',
    technical: 'THDR = sqrt(dG/dX² + dG/dY²), Tilt = arctan(VDR/THDR), Theta = arccos(THDR/TotalGrad).',
    code: 'THDR = np.sqrt(dG_dX**2 + dG_dY**2)\nTilt = np.arctan2(VDR, THDR)',
    whyMatters: 'Convertit une seule carte de pesanteur en 7 canaux discriminants pour l\'IA.'
  },
  {
    number: '09',
    title: 'Matrice de Caractéristiques (Feature Matrix)',
    simple: 'Assemblage du tableau de données préparé pour les algorithmes ML.',
    technical: 'Matrice 2D (N_points x 7 features) où chaque ligne est un point spatial X-Y.',
    code: 'X_dataset = np.column_stack([g, dG_dX, dG_dY, VDR, THDR, Tilt, Theta])',
    whyMatters: 'Format standard requis par Scikit-Learn et XGBoost.'
  },
  {
    number: '10',
    title: 'Étiquettes de Vérité Terrain (Labels)',
    simple: 'Marquage automatique des vraies failles dans le modèle synthétique (1 = Faille, 0 = Encaissant).',
    technical: 'Label binaire Y défini par la distance seuil < 250m du plan théorique de faille.',
    code: 'Y_labels = (dist_grid < 250.0).astype(int)',
    whyMatters: 'Fournit la référence absolue (Ground Truth) impossible d\'obtenir avec certitude sur le terrain.'
  },
  {
    number: '11',
    title: 'Séparation Train / Test',
    simple: 'Division des données en 80% pour l\'apprentissage et 20% pour l\'évaluation impartiale.',
    technical: 'Stratified train_test_split garantissant le même ratio de pixels de faille.',
    code: 'X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.20)',
    whyMatters: 'Évite le sur-apprentissage (overfitting) et garantit la généralisation.'
  },
  {
    number: '12',
    title: 'Entraînement Random Forest',
    simple: 'Apprentissage des règles de décision par un ensemble d\'arbres.',
    technical: 'Classificateur de 100 arbres de décision avec calcul d\'importance de Gini par feature.',
    code: 'clf = RandomForestClassifier(n_estimators=100, max_depth=12)\nclf.fit(X_train, y_train)',
    whyMatters: 'Produit un modèle hautement interprétable et robuste au bruit.'
  },
  {
    number: '13',
    title: 'Évaluation des Performances',
    simple: 'Calcul des métriques de précision, rappel, F1-score et courbe ROC-AUC.',
    technical: 'Score ROC-AUC > 0.94 et matrice de confusion sur l\'ensemble de test masqué.',
    code: 'auc_score = roc_auc_score(y_test, clf.predict_proba(X_test)[:, 1])',
    whyMatters: 'Prouve scientifiquement l\'efficacité de la méthode.'
  },
  {
    number: '14',
    title: 'Carte Probabiliste de Faille',
    simple: 'Génération de la carte finale montrant les zones de faille détectées avec leur niveau de confiance.',
    technical: 'Grid 2D des probabilités prédites p(x,y) in [0, 1] prêtes pour l\'interprétation hydrogéologique.',
    code: 'prob_map = clf.predict_proba(X_dataset)[:, 1].reshape(ny, nx)',
    whyMatters: 'Fournit aux géophysiciens et hydrogéologues un outil d\'aide à la décision continu.'
  }
];

export const SimulationExplanationView: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const step = STEPS_DATA[selectedStep];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] to-[#083023]">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>GUIDE PÉDAGOGIQUE — ETAPE PAR ETAPE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Explication de la <span className="text-gradient-emerald">Simulation Synthétique</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Comprendre la chaîne de traitement scientifique de A à Z. 14 étapes détaillées de la définition du maillage à la carte de probabilité de faille.
        </p>
      </div>

      {/* 14 Steps Interactive Horizontal Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {STEPS_DATA.map((s, idx) => (
          <button
            key={s.number}
            onClick={() => setSelectedStep(idx)}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              selectedStep === idx
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg scale-105'
                : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-slate-300 border border-emerald-800/40'
            }`}
          >
            <div className="text-[10px] opacity-75 font-mono">ÉTAPE {s.number}</div>
            <div className="text-xs truncate font-semibold">{s.title}</div>
          </button>
        ))}
      </div>

      {/* Selected Step Detailed View Card */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-800/40 bg-[#06241A]/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/50 pb-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xl font-mono border border-emerald-500/30">
              {step.number}
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-100">{step.title}</h2>
              <p className="text-xs text-emerald-400 font-medium">{step.simple}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              disabled={selectedStep === 0}
              onClick={() => setSelectedStep((prev) => prev - 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 disabled:opacity-40"
            >
              Précédent
            </button>
            <button
              disabled={selectedStep === STEPS_DATA.length - 1}
              onClick={() => setSelectedStep((prev) => prev + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Explanations */}
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-1">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Explication Technique Détaillée
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">{step.technical}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Pourquoi cette étape est-elle cruciale ?
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">{step.whyMatters}</p>
            </div>
          </div>

          {/* Right Column: Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1">
                <Code className="w-4 h-4" /> Code Python Correspondant
              </span>
              <span className="text-[10px] text-slate-500">NumPy / SciPy</span>
            </div>
            <div className="bg-[#020D0A] p-4 rounded-2xl border border-emerald-900/60 font-mono text-xs text-cyan-300 overflow-x-auto">
              <code>{step.code}</code>
            </div>
          </div>
        </div>
      </div>

      {/* PowerPoint File 2 Viewer (Requirement #17) */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-amber-400" />
          Présentation Technique Approfondie (Document 2.pptx)
        </h2>

        <PPTViewer
          documentId="2"
          title={PRESENTATION_DOCUMENTS.ppt2.title}
          subtitle={PRESENTATION_DOCUMENTS.ppt2.subtitle}
          path={PRESENTATION_DOCUMENTS.ppt2.path}
          slideCount={PRESENTATION_DOCUMENTS.ppt2.slideCount}
          abstract={PRESENTATION_DOCUMENTS.ppt2.abstract}
        />
      </div>
    </div>
  );
};
