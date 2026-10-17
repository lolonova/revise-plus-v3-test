# Révise+ V4 🚀✨

Application éducative Android pour élèves du collège et du lycée (6e → Terminale), en français.

Deux univers : **Gabriel** (thème galaxie / science-fiction) et **Emma** (thème kawaii pastel), chacun avec sa progression sauvegardée séparément.

## 📱 Récupérer l'APK (depuis un téléphone, sans rien installer)

1. Ouvre https://github.com/lolonova/revise-plus-v3-test dans un navigateur (connecte-toi si besoin).
2. Va dans l'onglet **Actions**.
3. Clique sur **Build APK** dans la liste de gauche.
4. Le push a déjà déclenché un build ; sinon, clique sur **Run workflow** → bouton vert **Run workflow**.
5. Attends que le build passe au **vert ✅** (5 à 10 minutes). Actualise la page si besoin.
6. Ouvre le build vert → descends à **Artifacts** → clique sur **RevisePlus-V4-APK**.
7. Dézippe l'archive téléchargée → tu obtiens `app-debug.apk` → ouvre-le → « Installer quand même » (autoriser les sources inconnues si Android le demande).

## ✨ Fonctionnalités

- Choix du profil (Gabriel 🚀 / Emma 🐱), de la classe (6e → Terminale), matière, chapitre.
- 11 chapitres complets rédigés et vérifiés ; les autres matières sont indiquées « à venir ».
- Fiches **express** et **complètes** par chapitre.
- Quiz à choix multiples et vrai/faux, deux niveaux (Découverte / Expert) ; révision ciblée des questions ratées ; XP, niveaux, badges, défi quotidien.
- Tableau de bord par profil ; progression enregistrée localement (appareil) ; réinitialisation possible.
- Lecture audio des fiches (synthèse vocale Android en français).
- Scanner un cours : photo → OCR → vérification → fiche express + mini-quiz (contenu marqué « à vérifier »).
- Tuteur intégré : **mode démonstration** (base de connaissances locale, étiquetée clairement, pas une IA). Un parent peut activer le **mode IA** (voir ci-dessous).

## 🤖 Activer le tuteur IA (facultatif, à faire par un parent)

1. Crée un compte gratuit sur https://cloudflare.com → **Workers & Pages**.
2. Crée un Worker (par ex. `reviseplus-tutor`) et colle le code de `worker/worker.js`.
3. Dans **Settings → Variables**, ajoute `AI_KEY` de type **Secret** contenant ta clé API Mistral (https://console.mistral.ai).
4. Déploie le Worker et copie son URL (`https://reviseplus-tutor.ton-compte.workers.dev`).
5. Dans l'application : onglet Réglages → champ « URL du worker » → Enregistrer.

La clé API n'est **jamais** dans l'application : elle reste côté Cloudflare. Le prompt du worker limite le tuteur aux questions scolaires et interdit la collecte de données personnelles.

Coûts : Mistral propose un niveau gratuit limité ; au-delà, le tarif dépend du volume (ordre de quelques centimes pour des milliers de questions).

## ⚠️ Limites connues (version 4.0)

- Le contenu couvre 11 chapitres vérifiés ; les autres sont étiquetés « à venir » (l'application ne prétend pas les contenir).
- L'OCR dépend de la qualité des photos ; les fiches générées sont marquées « à vérifier ».
- Le mode démonstration du tuteur n'est pas une IA : il répond sur quelques notions seulement et il est étiqueté comme tel.
- L'APK produit est un APK de débogage : parfait pour un usage familial, non destiné au Play Store.
- Pas de synchronisation en ligne : la progression reste sur l'appareil (stockage local).

## 🗂️ Structure du projet

- `app/src/main/assets/` : interface complète (HTML/CSS/JS) embarquée dans une WebView Android.
- `app/src/main/java/fr/reviseplus/app/MainActivity.java` : coquille Android (WebView, synthèse vocale, sélection de photos).
- `worker/worker.js` : passerelle IA facultative (Cloudflare Worker).
- `.github/workflows/build-apk.yml` : compilation automatique de l'APK sur GitHub Actions (Java 17, Gradle 8.7).
