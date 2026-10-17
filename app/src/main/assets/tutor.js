/* Révise+ V4 — Tuteur pédagogique
   Deux modes :
   - MODE DÉMONSTRATION : base de connaissances locale (aucune IA). Étiqueté clairement.
   - MODE IA : passerelle vers un worker Cloudflare configuré par un parent.
   La clé API n'est JAMAIS stockée dans l'application. */

var Tutor = (function () {
  var gatewayURL = localStorage.getItem('reviseplus_gateway') || '';
  var isDemo = !gatewayURL;
  var history = [];

  // ------- Base de connaissances locale (mode démo) -------
  var KB = [
    { re: ['fraction'], a: "Une fraction, c'est un partage en parts égales. Dans 3/4, on coupe quelque chose en 4 parts égales et on en prend 3. Le nombre du haut (3) s'appelle le numérateur, celui du bas (4) le dénominateur. Astuce : pour comparer deux fractions, mets-les au même dénominateur. Exercice : compare 1/2 et 3/4. (Réponse : 2/4 < 3/4.)" },
    { re: ['pythagore'], a: "Le théorème de Pythagore s'applique dans un triangle rectangle : le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés (a² + b² = c²). L'hypoténuse est le côté opposé à l'angle droit. Exemple : petits côtés 3 et 4 → c² = 9 + 16 = 25 → c = 5." },
    { re: ['atome'], a: "Un atome est constitué d'un noyau (protons + neutrons) autour duquel tournent des électrons. Protons : charge +, neutrons : neutres, électrons : charge −. Un atome est électriquement neutre : autant de protons que d'électrons. Exemple : le carbone 12 a 6 protons, 6 neutrons et 6 électrons." },
    { re: ['1789', 'révolution'], a: "La Révolution française commence en 1789 : États généraux (mai), serment du Jeu de paume (20 juin), prise de la Bastille (14 juillet), Déclaration des droits de l'homme et du citoyen (26 août). En 1792, la Première République est proclamée ; Louis XVI est exécuté en 1793." },
    { re: ['équation', 'equation'], a: "Pour résoudre une équation, on isole l'inconnue. Règle d'or : ce que tu fais d'un côté, fais-le aussi de l'autre. Exemple : 2x + 3 = 11. On retire 3 des deux côtés : 2x = 8. On divise par 2 : x = 4. Vérification : 2×4 + 3 = 11. C'est bon !" },
    { re: ['dérivé', 'derivative', 'fonction'], a: "Une fonction f associe à chaque nombre x une seule image f(x). Lire l'image de 2 sur un graphique : partir de x = 2, monter jusqu'à la courbe, lire l'ordonnée. f(x) = ax + b est une fonction affine : sa courbe est une droite de coefficient directeur a." },
    { re: ['1914', '1918', 'grande guerre'], a: "La Grande Guerre (1914-1918) commence après l'attentat de Sarajevo. C'est d'abord une guerre de mouvement, puis les tranchées figent le front (Verdun, 1916). 1917 : entrée en guerre des États-Unis. 11 novembre 1918 : armistice. Environ 10 millions de morts." },
    { re: ['eau'], a: "L'eau existe en trois états : solide (glace), liquide, gazeux (vapeur). Changements d'état : fusion, solidification, vaporisation, condensation. L'eau pure bout à 100 °C et gèle à 0 °C. Attention : moins de 3 % de l'eau de la Terre est douce, il faut l'économiser !" },
    { re: ['liberté', 'liberte'], a: "En philosophie, être libre peut vouloir dire faire ce qu'on veut (liberté d'action) ou agir selon sa propre volonté raisonnée (autonomie, chez Kant). Sartre dit que « l'homme est condamné à être libre » : impossible de fuir nos choix et notre responsabilité. Bonne question : la responsabilité suppose-t-elle la liberté ?" },
    { re: ['féodal', 'feodal', 'seigneur', 'château'], a: "La société féodale (après l'an Mil) se divise en trois ordres : ceux qui prient (clergé), ceux qui combattent (seigneurs), ceux qui travaillent (paysans, plus de 90 % des gens). Le seigneur dirige un fief, rend la justice et perçoit des taxes ; le vassal lui prête hommage en échange d'un fief." }
  ];

  function findLocal(text) {
    var t = text.toLowerCase();
    var best = null;
    for (var i = 0; i < KB.length; i++) {
      var score = 0;
      for (var j = 0; j < KB[i].re.length; j++) {
        if (t.indexOf(KB[i].re[j]) !== -1) score++;
      }
      if (score > 0 && (!best || score > best.score)) best = { score: score, a: KB[i].a };
    }
    return best ? best.a : null;
  }

  function demoAnswer(text) {
    var a = findLocal(text);
    if (a) return a;
    return "Je suis en mode démonstration : je connais quelques notions (fractions, Pythagore, atome, équations, Révolution française, Grande Guerre, liberté...). " +
      "Pose-moi une question sur l'une d'elles ! Pour des réponses complètes, un parent peut activer le mode IA dans les Réglages (voir le README du projet). " +
      "Entre-temps, les fiches de cours contiennent l'essentiel de chaque chapitre.";
  }

  // ------- Interface -------
  function mode() { return isDemo ? 'DÉMO' : 'IA'; }

  function setGateway(url) {
    gatewayURL = (url || '').trim();
    isDemo = !gatewayURL;
    if (gatewayURL) localStorage.setItem('reviseplus_gateway', gatewayURL);
    else localStorage.removeItem('reviseplus_gateway');
  }

  function send(text, cb) {
    history.push({ role: 'user', text: text });
    if (isDemo) {
      var a = demoAnswer(text);
      history.push({ role: 'bot', text: a });
      cb(a);
      return;
    }
    fetch(gatewayURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text, profile: localStorage.getItem('reviseplus_currentProfile') || 'eleve' })
    }).then(function (r) { return r.json(); })
      .then(function (d) {
        var a = d.answer || "Je n'ai pas compris la réponse du serveur. Réessaie dans un instant.";
        history.push({ role: 'bot', text: a });
        cb(a);
      })
      .catch(function () {
        var msg = "Je n'arrive pas à joindre le service IA. Vérifie la connexion internet ou repasse en mode démonstration dans les Réglages.";
        history.push({ role: 'bot', text: msg });
        cb(msg);
      });
  }

  return { mode: mode, setGateway: setGateway, send: send, history: history };
})();
