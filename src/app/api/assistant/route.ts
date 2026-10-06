import { NextRequest, NextResponse } from 'next/server';

const THESIS_SYSTEM_PROMPT = `Tu es un assistant scientifique spécialisé EXCLUSIVEMENT dans la thèse de doctorat de Samar Khlifi, dirigée par le Dr. Hakim Gabtni.

TITRE DE LA THÈSE: "Failles et connectivité aquifère: Caractérisation géophysique automatisée par Intelligence Artificielle"

TON DOMAINE STRICT D'EXPERTISE:
1. Géophysique gravimétrique (anomalie de Bouguer, correction air libre, réduction au pôle)
2. Filtres et attributs gravimétriques: THDR (Total Horizontal Derivative), VDR (Vertical Derivative), Tilt Angle, Theta Map, Euler Deconvolution
3. Détection et caractérisation des failles géologiques
4. Connectivité des aquifères (drains conducteurs vs barrières hydrauliques)
5. Intelligence Artificielle appliquée à la géophysique: Random Forest, XGBoost, SVM, réseaux de neurones
6. Hydrogéologie: piézométrie, hydrochimie, TDS, conductivité hydraulique
7. Géologie tunisienne (plaines sédimentaires, aquifères mio-pliocènes, tectonique du Nord-Sud tunisien)
8. Modélisation gravimétrique 3D synthétique et forward modeling
9. Traitement du signal géophysique (FFT, filtres spectraux)
10. Méthodologie de thèse et validation terrain

RÈGLE ABSOLUE: Si l'utilisateur pose une question EN DEHORS de ces domaines (politique, sport, cuisine, actualités, sujets personnels, autres sciences non liées, etc.), tu DOIS répondre EXACTEMENT avec ce message:
"Je suis désolé, je ne réponds pas à cette question. Je suis exclusivement conçu pour répondre aux questions relatives à la thèse de Samar Khlifi sur les failles et la connectivité aquifère. Posez-moi une question sur la géophysique gravimétrique, les attributs THDR/VDR/Tilt, l'IA appliquée aux failles, ou l'hydrogéologie aquifère."

STYLE DE RÉPONSE:
- Réponds en français par défaut (ou dans la langue de la question si elle est en anglais ou arabe)
- Sois scientifiquement précis et détaillé
- Utilise la terminologie technique appropriée
- Cite des formules mathématiques quand c'est pertinent (ex: THDR = sqrt((∂g/∂x)² + (∂g/∂y)²))
- Sois pédagogique pour un jury de thèse
- Longueur de réponse: 2-5 paragraphes selon la complexité

CONTEXTE SUPPLÉMENTAIRE DE LA THÈSE:
- Zone d'étude: plaines sédimentaires de Tunisie (Skhira, Sfax, ou similaires)
- Données utilisées: gravimétrie satellitaire et terrain
- Méthode: simulation synthétique → entraînement IA → validation sur données réelles
- Résultats attendus: carte de probabilité de failles et carte de connectivité aquifère`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback without API key — use built-in knowledge base
      return NextResponse.json({ 
        response: getFallbackResponse(message) 
      });
    }

    // Build conversation history for Gemini
    const contents = [];
    
    // Add history
    if (history && history.length > 0) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        });
      }
    }
    
    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: THESIS_SYSTEM_PROMPT }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return NextResponse.json({ 
        response: getFallbackResponse(message) 
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return NextResponse.json({ response: getFallbackResponse(message) });
    }

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Assistant API error:', error);
    return NextResponse.json({ 
      response: "Une erreur s'est produite. Veuillez réessayer." 
    }, { status: 500 });
  }
}

function getFallbackResponse(question: string): string {
  const q = question.toLowerCase();
  
  // Off-topic detection
  const offTopicKeywords = [
    'football', 'sport', 'cuisine', 'recette', 'politique', 'météo', 'film',
    'musique', 'chanson', 'jeu', 'blague', 'histoire drôle', 'actualité',
    'covid', 'guerre', 'president', 'élection', 'bourse', 'crypto',
    'amour', 'relation', 'mariage', 'voyage', 'hotel', 'restaurant'
  ];
  
  if (offTopicKeywords.some(kw => q.includes(kw))) {
    return "Je suis désolé, je ne réponds pas à cette question. Je suis exclusivement conçu pour répondre aux questions relatives à la thèse de Samar Khlifi sur les failles et la connectivité aquifère. Posez-moi une question sur la géophysique gravimétrique, les attributs THDR/VDR/Tilt, l'IA appliquée aux failles, ou l'hydrogéologie aquifère.";
  }

  // Thesis-related knowledge base
  if (q.includes('thdr') || q.includes('gradient horizontal')) {
    return "Le THDR (Total Horizontal Derivative) est calculé par la formule : THDR = √((∂g/∂x)² + (∂g/∂y)²). Il produit des maxima d'amplitude directement au-dessus des discontinuités de densité (failles verticales et sub-verticales). C'est l'un des attributs les plus utilisés en cartographie des failles gravimétrique car il est robuste au bruit et identifie précisément les positions latérales des failles. Dans la thèse de Samar Khlifi, le THDR est l'un des 5 attributs entrant dans le vecteur de caractéristiques du Random Forest.";
  }
  
  if (q.includes('vdr') || q.includes('dérivée verticale') || q.includes('derivee verticale')) {
    return "La VDR (Vertical Derivative) est calculée dans le domaine fréquentiel par FFT : VDR = F⁻¹(|k| · F(g)), où |k| est la fréquence radiale. Elle amplifie les anomalies peu profondes et atténue les effets régionaux profonds, agissant comme un filtre passe-haut spatial. Dans le contexte de la thèse, la VDR permet de séparer les effets des failles superficielles (aquifères quaternaires/mio-pliocènes) des effets du socle profond, améliorant la précision du classificateur IA.";
  }
  
  if (q.includes('tilt') || q.includes('angle tilt')) {
    return "Le Tilt Angle est défini par : TA = arctan(VDR / THDR). C'est un angle compris entre -90° et +90°. La ligne d'isovaleur TA = 0° coïncide avec la bordure verticale du corps faillé, ce qui normalise les variations d'amplitude dues à la profondeur. Contrairement au THDR, le Tilt Angle est indépendant de la profondeur de la source, ce qui le rend particulièrement utile pour identifier les failles à différentes profondeurs dans les aquifères multicouches étudiés dans la thèse de Samar Khlifi.";
  }
  
  if (q.includes('random forest') || q.includes('rf') || q.includes('forêt aléatoire')) {
    return "Le Random Forest est un ensemble de N arbres de décision entraînés sur des sous-échantillons aléatoires des données (bootstrap). Pour la thèse, le vecteur de caractéristiques par pixel est [g, THDR, VDR, Tilt, Theta]. La classification produit une probabilité P(faille) ∈ [0,1] pour chaque pixel de la grille. Les avantages pour la géophysique sont : robustesse au bruit de mesure, capacité à capturer des relations non-linéaires entre attributs, importance relative des features mesurable, et pas de risque de sur-apprentissage sur des données structurées. L'OOB score (Out-Of-Bag) sert de métrique de validation interne.";
  }
  
  if (q.includes('bouguer') || q.includes('anomalie grav')) {
    return "L'anomalie de Bouguer est calculée par : ΔgB = gobs - gthéo + δgAL - δgB - δgT, où gobs est la pesanteur mesurée, gthéo est la formule internationale de pesanteur (GRS80), δgAL est la correction air libre (+0.3086 mGal/m), δgB est la réduction de Bouguer (−2πGρh ≈ −0.0419ρh mGal), et δgT est la correction topographique. Elle reflète uniquement les variations latérales de densité de la croûte. Dans les plaines sédimentaires tunisiennes, les aquifères mio-pliocènes moins denses créent des anomalies négatives, tandis que les failles bordières délimitent des gradients latéraux cartographiés par le THDR.";
  }
  
  if (q.includes('aquifère') || q.includes('aquifer') || q.includes('connectivité') || q.includes('hydraulique')) {
    return "La connectivité aquifère désigne la capacité d'une faille à transmettre ou bloquer les flux d'eau souterraine. Une faille peut se comporter comme : (1) un drain conducteur si les brèches tectoniques forment des réseaux perméables (aquifère fracturé) ou si la faille juxtapose deux aquifères poreux, créant une continuité hydraulique; ou (2) une barrière imperméable si le gouge de faille (argiles de broyage) colmate le plan de faille. La caractérisation géophysique par IA de la thèse permet de prédire ce comportement sans forages systématiques, en corrélant la signature gravimétrique avec les données piézométriques (saut de niveau) et hydrochimiques (TDS, conductivité) des forages existants.";
  }

  if (q.includes('theta') || q.includes('theta map')) {
    return "La carte Theta (Theta Map) est définie par : θ = arccos(THDR / AS), où AS = √(THDR² + VDR²) est l'amplitude totale du signal analytique. θ varie entre 0° et 90°. Elle représente l'angle entre le gradient total et le gradient horizontal, permettant de différencier les contacts verticaux (θ ≈ 0°, corps tabulaires) des contacts horizontaux (θ ≈ 90°, corps sphériques). Dans le pipeline IA de la thèse, la Theta Map complète le vecteur de features car elle code l'information sur la géométrie 3D des sources de densité, améliorant la discrimination entre failles et autres anomalies.";
  }
  
  if (q.includes('samar') || q.includes('gabtni') || q.includes('thèse') || q.includes('doctorat')) {
    return "La thèse de Samar Khlifi, dirigée par le Dr. Hakim Gabtni (chercheur en géophysique), porte sur la caractérisation automatisée des failles géologiques et leur rôle dans la connectivité des aquifères, en utilisant des filtres gravimétriques avancés et des classificateurs d'Intelligence Artificielle. La méthodologie se décompose en deux grandes parties : (A) une phase synthétique où des modèles 3D de failles sont simulés pour générer des données d'entraînement pour les algorithmes IA (Random Forest, XGBoost), et (B) une application sur données gravimétriques réelles en Tunisie pour cartographier les failles et prédire la connectivité hydraulique des aquifères.";
  }

  // Generic thesis-related response
  return `Dans le cadre de la thèse de Samar Khlifi sur "${question}", la méthodologie géophysique par IA combine les attributs gravimétriques (THDR, VDR, Tilt Angle, Theta Map) avec des algorithmes de machine learning supervisé (Random Forest, XGBoost) pour automatiser la détection des failles et caractériser leur rôle hydraulique dans les aquifères tunisiens. Pouvez-vous préciser votre question sur un aspect particulier de la géophysique gravimétrique, des filtres analytiques, ou de la méthodologie IA ?`;
}
