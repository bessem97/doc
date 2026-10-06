export const PYTHON_COLAB_SCRIPTS = {
  simulation: `# ==============================================================================
# PROTOTYPE SCIENTIFIQUE — SIMULATION GRAVIMÉTRIQUE 3D & IA
# Projet de Thèse: Caractérisation géophysique automatisée par IA
# Candidate: Samar Khlifi | Encadrant: Dr. Hakim Gabtni
# ==============================================================================

import numpy as np
import scipy.ndimage as ndimage
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score

print("[INFO] Initialisation du générateur synthétique de bassin faillé...")

# 1. Grille spatiale et paramètres du modèle géologique (Voxels)
nx, ny, nz = 61, 61, 30
dx, dy, dz = 100.0, 100.0, 50.0  # pas de grille en mètres
x = np.linspace(-3000, 3000, nx)
y = np.linspace(-3000, 3000, ny)
X, Y = np.meshgrid(x, y)

# 2. Modélisation géométrique de la faille (Faille normale à 60° de penchant)
dip_deg = 60.0
rho_contrast = 350.0  # kg/m³
fault_x0 = 0.0

# 3. Calcul direct du champ de gravité synthétique (Forward Modelling)
print("[INFO] Calculation de l'anomalie de Bouguer g(x,y)...")
G_const = 6.67430e-11  # Constante de gravitation universelle SI

# Représentation analytique simplifiée de la réponse gravimétrique d'un marche de faille
z_top, z_bottom = 200.0, 1500.0
dist = X - fault_x0
g_raw = 2 * G_const * rho_contrast * 1e5 * (
    (dist + 500) * np.arctan((dist + 500) / z_top) - 
    (dist - 500) * np.arctan((dist - 500) / z_bottom)
)

# Ajout d'un bruit gaussien réaliste (0.04 mGal)
np.random.seed(42)
noise = np.random.normal(0, 0.04, size=g_raw.shape)
g_obs = g_raw + noise

print(f"[OK] Champ gravimétrique généré: min={g_obs.min():.2f} mGal, max={g_obs.max():.2f} mGal")
`,

  attributes: `# ==============================================================================
# CALCUL DES ATTRIBUTS GÉOPHYSIQUES (FFT & DÉRIVÉES DIRECTIONNELLES)
# ==============================================================================

# 1. Dérivées horizontales directes
dG_dX = np.gradient(g_obs, dx, axis=1)
dG_dY = np.gradient(g_obs, dy, axis=0)

# 2. Gradient Horizontal Total (THDR)
THDR = np.sqrt(dG_dX**2 + dG_dY**2)

# 3. Dérivée Verticale (VDR via domaine fréquentiel 2D FFT)
freq_x = np.fft.fftfreq(nx, d=dx)
freq_y = np.fft.fftfreq(ny, d=dy)
Fx, Fy = np.meshgrid(freq_x, freq_y)
K = 2 * np.pi * np.sqrt(Fx**2 + Fy**2)

G_fft = np.fft.fft2(g_obs)
VDR_fft = G_fft * K
VDR = np.real(np.fft.ifft2(VDR_fft))

# 4. Angle d'inclinaison (Tilt Angle TA)
Tilt = np.arctan2(VDR, np.maximum(THDR, 1e-6)) * (180.0 / np.pi)

# 5. Carte Theta (Theta Map)
Total_Grad = np.sqrt(THDR**2 + VDR**2)
Theta = np.arccos(np.clip(THDR / np.maximum(Total_Grad, 1e-6), -1.0, 1.0))

print(f"[OK] 7 Attributs extraits: g, dG/dX, dG/dY, THDR, VDR, Tilt, Theta")
`,

  ml: `# ==============================================================================
# MACHINE LEARNING — ENTRAÎNEMENT DU RANDOM FOREST
# ==============================================================================

# 1. Construction de la matrice de caractéristiques (Features Matrix X)
features_list = [
    g_obs.ravel(),
    dG_dX.ravel(),
    dG_dY.ravel(),
    VDR.ravel(),
    THDR.ravel(),
    Tilt.ravel(),
    Theta.ravel()
]
X_dataset = np.column_stack(features_list)

# 2. Génération des étiquettes de vérité terrain (Labels Y: 1 = Zone de Faille, 0 = Encaissant)
dist_grid = np.abs(X - fault_x0)
Y_labels = (dist_grid.ravel() < 250.0).astype(int)

# 3. Séparation Train / Test (80% / 20%)
X_train, X_test, y_train, y_test = train_test_split(
    X_dataset, Y_labels, test_size=0.20, random_state=42, stratify=Y_labels
)

# 4. Entraînement du Classificateur Random Forest
clf = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42, n_jobs=-1)
clf.fit(X_train, y_train)

# 5. Évaluation des performances
y_pred = clf.predict(X_test)
y_prob = clf.predict_proba(X_test)[:, 1]
auc_score = roc_auc_score(y_test, y_prob)

print("=== DEFAUT DE DÉTECTION PAR RANDOM FOREST ===")
print(classification_report(y_test, y_pred, target_names=['Encaissant', 'Zone de Faille']))
print(f"--> Score ROC-AUC: {auc_score:.4f}")
`,

  visualization: `# ==============================================================================
# PREDICTIONS & CARTE PROBABILISTE 2D DE FAILLE
# ==============================================================================

# Calcul de la carte complète de probabilité
full_prob = clf.predict_proba(X_dataset)[:, 1].reshape(ny, nx)

# Visualisation des résultats (Synthétique)
print("[OK] Génération de la carte de probabilité de connectivité de faille...")
print(f"Probabilité moyenne sur la grille: {full_prob.mean():.3f}")
print("Simulation terminée avec succès.")
`
};
