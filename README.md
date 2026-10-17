# Révise+ V5 🚀✨ — « Réussir pas à pas »

Application éducative Android pour le collège (5e, 4e, 3e), en français.

Deux univers : **Gabriel** (thème galaxie 🚀) et **Emma** (thème kawaii 🐱), chacun avec sa progression séparée.

## ✨ Contenu

- **63 chapitres complets** : 7 matières × 3 niveaux × 3 chapitres — Maths, Français, Histoire, Géo, SVT, Physique-Chimie, Anglais.
- Fiches **express** et **complètes** par chapitre, lecture audio 🔊 (synthèse vocale).
- Quiz Découverte / Expert adaptatifs : les questions ratées reviennent ; XP, niveaux, badges, défi quotidien (+30 XP), astuce du jour.
- Tableau de bord par profil : % de progression, derniers chapitres, maîtrise par chapitre.
- Scanner de cours : photo → OCR → vérification → fiche + mini-quiz (marqué « à vérifier »).
- Tuteur : **mode démonstration** par défaut (base locale, pas une IA, étiqueté) ; mode IA facultatif via Cloudflare (ci-dessous).

## 📱 Récupérer l'APK (depuis un téléphone)

1. Ouvre https://github.com/lolonova/revise-plus-v3-test → onglet **Actions**.
2. Le dernier push déclenche automatiquement le build ; attends le **vert ✅** (5-10 min).
3. Ouvre le build vert → **Artifacts** → **RevisePlus-V4-APK** → télécharge.
4. Dézippe → installe `app-debug.apk` (autoriser les sources inconnues si demandé).

## 🤖 Activer le tuteur IA (facultatif, parent)

1. Compte gratuit sur https://cloudflare.com → Workers & Pages.
2. Créer un Worker et coller le code de `worker/worker.js`.
3. Settings → Variables → `AI_KEY` (type Secret) = clé API Mistral (https://console.mistral.ai).
4. Déployer, copier l'URL du Worker.
5. Dans l'app : onglet **Plus** → Réglages → coller l'URL.

La clé API n'est **jamais** dans l'application. Le prompt du worker limite le tuteur aux questions scolaires.

## ⚠️ Limites connues

- Contenu limité au collège (5e, 4e, 3e) ; un chapitre par matière et par niveau (21 au total).
- L'OCR dépend de la qualité des photos ; fiches générées marquées « à vérifier ».
- Le mode démonstration du tuteur n'est pas une IA (étiqueté comme tel).
- APK de débogage : usage familial, non destiné au Play Store.
- Progression stockée localement (aucune donnée envoyée en ligne).

## 🗂️ Structure

- `app/src/main/assets/` : interface complète (HTML/CSS/JS) dans une WebView.
- `app/src/main/java/fr/reviseplus/app/MainActivity.java` : coquille Android (WebView, TTS, photos).
- `worker/worker.js` : passerelle IA facultative (Cloudflare Worker).
- `.github/workflows/build-apk.yml` : compilation automatique (Java 17, Gradle 8.7).
