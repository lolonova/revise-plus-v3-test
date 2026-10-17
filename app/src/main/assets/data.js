/* Révise+ V5 — Base de contenu pédagogique (collège : 5e, 4e, 3e)
   63 chapitres complets : 7 matières × 3 niveaux × 3 chapitres. Tous rédigés et vérifiés. */

var REVISE_DATA = {
  niveaux: ['5e', '4e', '3e'],
  matieres: [
    { id: 'maths', nom: 'Mathématiques', icon: '📐' },
    { id: 'francais', nom: 'Français', icon: '📚' },
    { id: 'histoire', nom: 'Histoire', icon: '🏛️' },
    { id: 'geo', nom: 'Histoire-Géo', icon: '🌍' },
    { id: 'svt', nom: 'SVT', icon: '🧬' },
    { id: 'physique', nom: 'Physique-Chimie', icon: '⚗️' },
    { id: 'anglais', nom: 'Anglais', icon: '🇬🇧' }
  ],
  chapitres: [
    // ================= MATHS =================
    {
      id: 'm5-fractions', mat: 'maths', niveau: '5e',
      titre: 'Fractions',
      express: '<li>Une fraction représente un partage : 3/4 = 3 parts sur 4 parts égales.</li><li>Le numérateur est en haut, le dénominateur en bas.</li><li>Comparer : même dénominateur → on compare les numérateurs.</li><li>Addition : même dénominateur → on ajoute les numérateurs seulement.</li><li>Simplifier : diviser haut et bas par le même nombre. 6/8 = 3/4.</li>',
      complet: '<h3>1. Vocabulaire</h3><p>Dans 3/4 : 3 est le numérateur, 4 le dénominateur. 3/4 se lit « trois quarts ».</p><h3>2. Fraction et division</h3><p>3/4 = 3 ÷ 4 = 0,75. Une fraction est aussi une division.</p><h3>3. Comparaison</h3><p>Même dénominateur : 3/7 < 5/7. Dénominateurs différents : on met au même dénominateur. 1/2 et 3/4 → 2/4 et 3/4, donc 1/2 < 3/4.</p><h3>4. Addition et soustraction</h3><p>1/3 + 1/4 : dénominateur commun 12 → 4/12 + 3/12 = 7/12. On n\'additionne que les numérateurs !</p><h3>5. Simplification</h3><p>On divise numérateur et dénominateur par un même nombre : 6/8 = (6÷2)/(8÷2) = 3/4.</p><h3>6. Fraction d\'une quantité</h3><p>Prendre 2/3 de 30 : (30 ÷ 3) × 2 = 20.</p>',
      quiz: [
        { q: '1/3 + 1/4 = ?', choix: ['7/12', '2/7', '1/12'], bon: 0, exp: 'Dénominateur commun 12 : 4/12 + 3/12 = 7/12.' },
        { q: '6/8 simplifié donne :', choix: ['3/4', '2/3', '6/4'], bon: 0, exp: 'On divise haut et bas par 2 : 6/8 = 3/4.' },
        { q: 'Le plus grand :', choix: ['3/4', '2/4', '3/8'], bon: 0, exp: '3/4 = 0,75 ; 2/4 = 0,5 ; 3/8 = 0,375.' },
        { q: '2/3 de 30 = ?', choix: ['20', '10', '15'], bon: 0, exp: '(30 ÷ 3) × 2 = 10 × 2 = 20.' },
        { q: '3/4 s\'écrit en décimal :', choix: ['0,75', '0,34', '1,33'], bon: 0, exp: '3 ÷ 4 = 0,75.' }
      ],
      vf: [
        { q: 'Pour additionner deux fractions, on ajoute aussi les dénominateurs.', v: false, exp: 'On met au même dénominateur et on n\'additionne que les numérateurs.' },
        { q: '5/7 > 3/7.', v: true, exp: 'Même dénominateur : on compare les numérateurs, 5 > 3.' },
        { q: 'La moitié d\'une moitié est un quart.', v: true, exp: '1/2 × 1/2 = 1/4.' }
      ]
    },
    {
      id: 'm4-pythagore', mat: 'maths', niveau: '4e',
      titre: 'Théorème de Pythagore',
      express: '<li>Valable seulement dans un triangle rectangle.</li><li>Le carré de l\'hypoténuse = somme des carrés des deux autres côtés : a² + b² = c².</li><li>L\'hypoténuse est le côté opposé à l\'angle droit (le plus long).</li><li>Sert à calculer une longueur inconnue.</li><li>Exemple : côtés 3 et 4 → c² = 9 + 16 = 25 → c = 5.</li>',
      complet: '<h3>1. Énoncé</h3><p>Si un triangle est rectangle, alors le carré de la longueur de l\'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés : BC² = AB² + AC² quand l\'angle droit est en A.</p><h3>2. Reconnaître l\'hypoténuse</h3><p>C\'est le côté opposé à l\'angle droit. Dans un triangle rectangle en A, l\'hypoténuse est BC.</p><h3>3. Calculer l\'hypoténuse</h3><p>Triangle rectangle en A, AB = 6, AC = 8. BC² = 36 + 64 = 100, donc BC = 10.</p><h3>4. Calculer un petit côté</h3><p>Si l\'hypoténuse mesure 13 et un côté 5 : autre côté² = 169 − 25 = 144, donc 12.</p><h3>5. Réciproque</h3><p>Si BC² = AB² + AC², alors le triangle est rectangle (sert à prouver qu\'un triangle est rectangle).</p><h3>6. Méthode de rédaction</h3><p>1) Nommer le triangle et l\'angle droit. 2) Écrire le théorème avec les lettres. 3) Remplacer. 4) Conclure avec la racine carrée.</p>',
      quiz: [
        { q: 'Triangle rectangle en A, AB = 3, AC = 4. BC = ?', choix: ['5', '7', '25'], bon: 0, exp: 'BC² = 9 + 16 = 25, donc BC = 5.' },
        { q: 'Hypoténuse 13, un côté 5. L\'autre côté :', choix: ['12', '8', '18'], bon: 0, exp: '13² − 5² = 169 − 25 = 144 → √144 = 12.' },
        { q: 'L\'hypoténuse est :', choix: ['Le côté opposé à l\'angle droit', 'Le petit côté', 'Un angle'], bon: 0, exp: 'C\'est toujours le côté opposé à l\'angle droit, le plus long.' },
        { q: 'Pythagore s\'applique dans :', choix: ['Tout triangle', 'Tout triangle rectangle', 'Seulement le triangle équilatéral'], bon: 1, exp: 'Le théorème exige un triangle rectangle.' },
        { q: 'Si AB² + AC² = BC², alors :', choix: ['Le triangle est rectangle', 'Le triangle est équilatéral', 'Rien de spécial'], bon: 0, exp: 'C\'est la réciproque : le triangle est rectangle en A.' }
      ],
      vf: [
        { q: 'L\'hypoténuse est toujours le plus long côté.', v: true, exp: 'Oui, côté opposé à l\'angle droit.' },
        { q: 'Le théorème de Pythagore marche dans tous les triangles.', v: false, exp: 'Uniquement dans les triangles rectangles (et avec la réciproque pour le prouver).' },
        { q: 'Si les côtés sont 6, 8 et 10, le triangle est rectangle.', v: true, exp: '36 + 64 = 100 : la réciproque de Pythagore le confirme.' }
      ]
    },
    {
      id: 'm3-dev', mat: 'maths', niveau: '3e',
      titre: 'Développement et factorisation',
      express: '<li>Développer : k(a+b) = ka + kb et (a+b)(c+d) = ac + ad + bc + bd.</li><li>Factoriser : ka + kb = k(a+b) — c\'est le chemin inverse.</li><li>Identités : (a+b)² = a² + 2ab + b² ; (a−b)² = a² − 2ab + b² ; (a−b)(a+b) = a² − b².</li><li>Développer transforme un produit en somme ; factoriser transforme une somme en produit.</li><li>Toujours réduire le résultat : 3x + 5x = 8x.</li>',
      complet: '<h3>1. Développer avec la simple distributivité</h3><p>5(x + 3) = 5x + 15. Le facteur multiplie chaque terme de la parenthèse.</p><h3>2. Double distributivité</h3><p>(x + 2)(x + 4) = x² + 4x + 2x + 8 = x² + 6x + 8. Chaque terme multiplie chaque terme.</p><h3>3. Identités remarquables</h3><p>(a+b)² = a² + 2ab + b². Exemple : (x+3)² = x² + 6x + 9.<br>(a−b)² = a² − 2ab + b². Exemple : (x−5)² = x² − 10x + 25.<br>(a−b)(a+b) = a² − b². Exemple : (x−7)(x+7) = x² − 49.</p><h3>4. Factoriser</h3><p>On cherche un facteur commun : 5x² + 10x = 5x(x + 2). Avec les identités : x² − 9 = (x−3)(x+3).</p><h3>5. Réduire</h3><p>Après développement, on regroupe : x² + 4x + 2x + 8 = x² + 6x + 8.</p><h3>6. Vérification</h3><p>Remplacer x par 1 dans les deux expressions : si les valeurs diffèrent, il y a une erreur.</p>',
      quiz: [
        { q: '(x+2)(x+4) = ?', choix: ['x² + 6x + 8', 'x² + 8x + 8', 'x² + 6x + 6'], bon: 0, exp: 'x² + 4x + 2x + 8 = x² + 6x + 8.' },
        { q: '(x+3)² = ?', choix: ['x² + 6x + 9', 'x² + 9', 'x² + 3x + 9'], bon: 0, exp: 'Identité : a² + 2ab + b² avec a=x, b=3.' },
        { q: 'Factoriser 5x² + 10x :', choix: ['5x(x+2)', '5(x²+10x)', 'x(5x+10x)'], bon: 0, exp: 'Facteur commun 5x : 5x·x + 5x·2.' },
        { q: 'x² − 49 = ?', choix: ['(x−7)(x+7)', '(x−7)²', '(x+7)²'], bon: 0, exp: 'a² − b² = (a−b)(a+b) avec b=7.' },
        { q: '5(x+3) = ?', choix: ['5x + 15', '5x + 3', 'x + 15'], bon: 0, exp: 'Simple distributivité.' }
      ],
      vf: [
        { q: '(a−b)² = a² − b².', v: false, exp: '(a−b)² = a² − 2ab + b² : le double produit ne disparaît pas.' },
        { q: 'Factoriser, c\'est transformer une somme en produit.', v: true, exp: 'Exact : on cherche un facteur commun.' },
        { q: 'Développer (x−5)(x+5) donne x² − 25.', v: true, exp: 'Identité a² − b².' }
      ]
    },
    // ================= FRANÇAIS =================
    {
      id: 'fr5-recit', mat: 'francais', niveau: '5e',
      titre: 'Le récit et ses temps',
      express: '<li>Le récit raconte des événements : le passé simple marque les actions principales.</li><li>L\'imparfait décrit le décor, les habitudes, les personnages.</li><li>Le présent de narration rend le récit vivant.</li><li>Point de vue : narrateur interne (je), externe (il observe), omniscient (il sait tout).</li><li>Le narrateur n\'est pas toujours l\'auteur !</li>',
      complet: '<h3>1. Raconter : les temps du passé</h3><p>Passé simple = actions principales, soudaines : « Il entra dans la salle ». Imparfait = arrière-plan, description, habitude : « Le soleil brûlait les toits ». Plus-que-parfait = action antérieure : « Il avait fini son travail ».</p><h3>2. L\'ordre du récit</h3><p>Schéma quinaire : situation initiale → élément perturbateur → péripéties → élément de résolution → situation finale. La analepse (retour en arrière) et la prolepse (anticipation) brisent la chronologie.</p><h3>3. Le point de vue (focalisation)</h3><p>Interne : on suit un personnage (je). Externe : le narrateur observe sans entrer dans les têtes. Zéro/omnisciente : le narrateur sait tout des personnages.</p><h3>4. Narrateur et auteur</h3><p>L\'auteur écrit le livre ; le narrateur raconte l\'histoire. Un auteur peut inventer un narrateur animal, enfant, méchant...</p><h3>5. Pour bien rédiger</h3><p>Alterner passé simple et imparfait, varier les connecteurs (soudain, ensuite, enfin), donner des détails sensoriels (vue, ouïe, toucher).</p>',
      quiz: [
        { q: 'Quel temps décrit le décor du récit ?', choix: ['L\'imparfait', 'Le passé simple', 'Le futur'], bon: 0, exp: 'L\'imparfait peint l\'arrière-plan : « La nuit tombait ».' },
        { q: '« Il entra dans la pièce » est au :', choix: ['Passé simple', 'Imparfait', 'Présent'], bon: 0, exp: 'Le passé simple marque les actions principales et soudaines.' },
        { q: 'Un narrateur externe :', choix: ['Observe sans entrer dans les pensées', 'Raconte à la 1re personne', 'Sait tout'], bon: 0, exp: 'Il se contente d\'observer, comme une caméra.' },
        { q: 'Le narrateur est :', choix: ['Celui qui raconte', 'Celui qui écrit le livre', 'Toujours le héros'], bon: 0, exp: 'L\'auteur écrit, le narrateur raconte : ce n\'est pas pareil.' },
        { q: 'Une analepse est :', choix: ['Un retour en arrière', 'Une anticipation', 'Une description'], bon: 0, exp: 'Flashback : le récit revient sur un événement passé.' }
      ],
      vf: [
        { q: 'Le passé simple exprime des actions qui durent.', v: false, exp: 'Non, il exprime des actions brèves, ponctuelles : c\'est l\'imparfait qui dure.' },
        { q: 'Le narrateur peut être différent de l\'auteur.', v: true, exp: 'Un auteur peut inventer n\'importe quel narrateur.' },
        { q: 'Le schéma du récit commence par la situation initiale.', v: true, exp: 'Puis élément perturbateur, péripéties, résolution, situation finale.' }
      ]
    },
    {
      id: 'fr4-poesie', mat: 'francais', niveau: '4e',
      titre: 'La poésie',
      express: '<li>Un poème joue avec les mots : vers, strophes, rimes, rythme.</li><li>Rimes suivies (AABB), croisées (ABAB), embrassées (ABBA).</li><li>Vers mesurés en syllabes : alexandrin (12), décasyllabe (10), octosyllabe (8).</li><li>Figures d\'style : comparaison (comme), métaphore (sans comme), personnification.</li><li>La poésie peut raconter, décrire, exprimer des émotions ou critiquer.</li>',
      complet: '<h3>1. La forme</h3><p>Le vers est une ligne ; la strophe est un groupe de vers. Compter les syllabes : « Je-me-sui-sacré-ma-nant-é-ta-vie » = décasyllabe. Attention au e muet : il compte devant une consonne, pas devant une voyelle.</p><h3>2. Les rimes</h3><p>Suivies AABB (Boileau), croisées ABAB (Racine), embrassées ABBA (La Fontaine). La rime peut être pauvre (1 son), suffisante (2 sons), riche (3+ sons).</p><h3>3. Les figures de style</h3><p>Comparaison : « doux comme un agneau » (outil de comparaison). Métaphore : « cette diva de la cour » (sans outil). Personnification : « Le vent se plaignait ». Hyperbole : exagération. Répetition d\'anaphores pour marteler.</p><h3>4. La musicalité</h3><p>Allitération (répétition de consonnes) et assonance (de voyelles) créent des ambiances : « Pour qui sont ces serpents qui sifflent sur vos têtes » (Racine) siffle avec les s !</p><h3>5. Les grands genres</h3><p>Lyrique (émotions), épique (récit héroïque), satirique (critique), engagé (défendre une cause).</p>',
      quiz: [
        { q: 'Un alexandrin compte :', choix: ['12 syllabes', '10 syllabes', '8 syllabes'], bon: 0, exp: 'Alexandrin = 12, décasyllabe = 10, octosyllabe = 8.' },
        { q: 'Rimes embrassées :', choix: ['ABBA', 'AABB', 'ABAB'], bon: 0, exp: 'Les rimes 1 et 4, 2 et 3 s\'enlacent (La Fontaine).' },
        { q: '« Il est doux comme un agneau » est une :', choix: ['Comparaison', 'Métaphore', 'Personnification'], bon: 0, exp: 'L\'outil « comme » signale la comparaison.' },
        { q: 'Une métaphore utilise :', choix: ['Aucun outil de comparaison', 'Toujours « comme »', 'Toujours « tel que »'], bon: 0, exp: 'La métaphore rapproche directement les images.' },
        { q: '« Le vent se plaignait » est une :', choix: ['Personnification', 'Comparaison', 'Hyperbole'], bon: 0, exp: 'Le vent reçoit une qualité humaine : il se plaint.' }
      ],
      vf: [
        { q: 'Une strophe est un groupe de vers.', v: true, exp: 'Comme un paragraphe du poème.' },
        { q: 'La rime pauvre a trois sons communs.', v: false, exp: 'C\'est la rime riche : pauvre = 1 son, suffisante = 2, riche = 3 ou plus.' },
        { q: 'L\'allitération répète des consonnes.', v: true, exp: 'Et l\'assonance répète des voyelles.' }
      ]
    },
    {
      id: 'fr3-argumentation', mat: 'francais', niveau: '3e',
      titre: 'L\'argumentation : convaincre et délibérer',
      express: '<li>Argumenter, c\'est défendre un point de vue (thèse) avec des arguments et des exemples.</li><li>Thèse / antithèse / synthèse : le débat organisé.</li><li>Connecteurs logiques : d\'abord, cependant, donc, enfin.</li><li>Trois modes : convaincre (raisonner), persuader (émouvoir), délibérer (peser le pour et le contre).</li><li>Le discours direct rapporte les paroles ; l\'ironie fait dire le contraire de ce qu\'on pense.</li>',
      complet: '<h3>1. Les bases</h3><p>Thèse = le point de vue défendu. Argument = la raison qui l\'appuie. Exemple = le cas concret qui l\'illustre. Un paragraphe argumenté = argument + exemple + mini-conclusion.</p><h3>2. La délibération</h3><p>On présente la thèse (pour), l\'antithèse (contre), puis on conclut (synthèse). Formule utile : « Certes..., mais..., en revanche..., finalement... ».</p><h3>3. Convaincre, persuader, délibérer</h3><p>Convaincre s\'adresse à la raison (logique, faits) ; persuader joue sur les émotions (images, pathos) ; délibérer explore les deux camps avant de trancher.</p><h3>4. Connecteurs et types d\'arguments</h3><p>Addition : d\'abord, ensuite. Opposition : mais, cependant, en revanche. Cause : car, puisque. Conséquence : donc, par conséquent. Types d\'arguments : logique, d\'autorité (citation d\'expert), d\'expérience (exemple vécu), ad hominem (attaque de la personne : à éviter !).</p><h3>5. Le discours rapporté</h3><p>Direct : « Je viens », dit-il. Indirect : il dit qu\'il vient (attention : « demain » devient « le lendemain »). L\'ironie et l\'antiphrase font comprendre le contraire de ce qui est écrit.</p>',
      quiz: [
        { q: 'La thèse, c\'est :', choix: ['Le point de vue défendu', 'Un exemple précis', 'La conclusion du texte'], bon: 0, exp: 'C\'est l\'opinion que l\'on veut défendre.' },
        { q: '« Cependant » est un connecteur :', choix: ['D\'opposition', 'D\'addition', 'De cause'], bon: 0, exp: 'Il marque le contraste : mais, en revanche, néanmoins.' },
        { q: 'Persuader, c\'est jouer sur :', choix: ['Les émotions', 'La logique', 'Les deux camps'], bon: 0, exp: 'Persuader émeut ; convaincre raisonne.' },
        { q: 'Un argument d\'autorité s\'appuie sur :', choix: ['La parole d\'un expert', 'Un exemple vécu', 'Une insulte'], bon: 0, exp: 'Citer un spécialiste reconnu renforce la thèse.' },
        { q: 'L\'antiphrase consiste à :', choix: ['Dire le contraire de ce qu\'on pense', 'Répéter un mot', 'Citer un expert'], bon: 0, exp: '« Quel temps superbe ! » sous la pluie : c\'est de l\'ironie.' }
      ],
      vf: [
        { q: 'Un bon paragraphe argumenté contient argument et exemple.', v: true, exp: 'La raison + le cas concret, c\'est le duo gagnant.' },
        { q: '« Donc » introduit une cause.', v: false, exp: '« Donc » introduit une conséquence ; « car » introduit une cause.' },
        { q: 'Délibérer, c\'est examiner le pour et le contre.', v: true, exp: 'On pèse les deux thèses avant de conclure.' }
      ]
    },
    // ================= HISTOIRE =================
    {
      id: 'h5-feodalite', mat: 'histoire', niveau: '5e',
      titre: 'La société féodale',
      express: '<li>Après l\'an Mil, la société est divisée en trois ordres : ceux qui prient (clergé), ceux qui combattent (seigneurs), ceux qui travaillent (paysans).</li><li>Le seigneur dirige un fief ; il rend la justice, perçoit des taxes.</li><li>Les paysans sont souvent des serfs, liés à la terre.</li><li>L\'Église est au centre de la vie quotidienne.</li><li>Les châteaux protègent et affirment le pouvoir.</li>',
      complet: '<h3>1. Les trois ordres</h3><p>La société est d\'origine divine : le clergé (prier), la noblesse (combattre, protéger), le tiers état (travailler, nourrir). Presque tout le monde est paysan (plus de 90 %).</p><h3>2. Le seigneur et le fief</h3><p>Le seigneur est le maître d\'un territoire, le fief. Il rend la justice, frappe la monnaie, perçoit le cens et les banalités (payées pour utiliser le moulin, le four, le pressoir).</p><h3>3. L\'hommage vassalique</h3><p>Le vassal prête hommage à son seigneur : il reçoit un fief en échange de fidélité et de service militaire. C\'est la pyramide féodale.</p><h3>4. Les paysans</h3><p>Les serfs sont attachés à la terre, les vilains sont libres mais dépendants. Ils versent de lourdes taxes et travaillent les terres du seigneur (corvées).</p><h3>5. Le rôle de l\'Église</h3><p>Elle rythme l\'année (fêtes religieuses), tient les écoles, aide les pauvres. Les paysans craignent l\'enfer et espèrent le paradis.</p><h3>6. Les châteaux</h3><p>D\'abord en bois (motte féodale), puis en pierre (donjon, murailles). Ils servent de protection, de résidence et de symbole de puissance.</p>',
      quiz: [
        { q: 'Lequel n\'est PAS un des trois ordres ?', choix: ['Ceux qui travaillent', 'Ceux qui vendent', 'Ceux qui prient'], bon: 1, exp: 'Les trois ordres : prient, combattent, travaillent.' },
        { q: 'Un fief est :', choix: ['Une terre dirigée par un seigneur', 'Un impôt', 'Une église'], bon: 0, exp: 'Le fief est le territoire que le vassal reçoit de son seigneur.' },
        { q: 'Les serfs sont :', choix: ['Attachés à la terre', 'Des marchands', 'Des chevaliers'], bon: 0, exp: 'Les serfs ne peuvent pas quitter la terre de leur seigneur.' },
        { q: 'Les banalités sont :', choix: ['Des taxes pour utiliser le four ou le moulin', 'Des fêtes', 'Des combats'], bon: 0, exp: 'Les paysans paient pour utiliser les équipements du seigneur.' },
        { q: 'L\'hommage est :', choix: ['La cérémonie où le vassal jure fidélité', 'Un mariage', 'Un impôt'], bon: 0, exp: 'Le vassal jure fidélité en échange d\'un fief.' }
      ],
      vf: [
        { q: 'La noblesse est l\'ordre de ceux qui combattent.', v: true, exp: 'La société féodale distingue prier, combattre, travailler.' },
        { q: 'Les premiers châteaux étaient en pierre.', v: false, exp: 'Ils étaient d\'abord en bois (mottes féodales), puis en pierre.' },
        { q: 'L\'Église rythme la vie des paysans.', v: true, exp: 'Fêtes religieuses, cloches, écoles : l\'Église est partout.' }
      ]
    },
    {
      id: 'h4-revolution', mat: 'histoire', niveau: '4e',
      titre: 'La Révolution française (1789-1799)',
      express: '<li>1789 : crise financière → convocation des États généraux.</li><li>14 juillet 1789 : prise de la Bastille.</li><li>Août 1789 : fin des privilèges et Déclaration des droits de l\'homme et du citoyen.</li><li>1792 : proclamation de la Première République.</li><li>1793 : exécution de Louis XVI.</li>',
      complet: '<h3>1. Les causes</h3><p>Crise financière du royaume, mauvaises récoltes (pain cher), idées des Lumières (liberté, égalité), indignation face aux privilèges de la noblesse et du clergé.</p><h3>2. 1789, l\'année décisive</h3><p>Le roi convoque les États généraux (mai). Le tiers état se proclame Assemblée nationale et jure de ne pas se séparer (serment du Jeu de paume, 20 juin). Le 14 juillet, le peuple de Paris prend la Bastille.</p><h3>3. L\'abolition des privilèges et les droits</h3><p>Nuit du 4 août : fin des privilèges. 26 août : Déclaration des droits de l\'homme et du citoyen (liberté, égalité, propriété, souveraineté nationale).</p><h3>4. La République</h3><p>1792 : la monarchie est abolie, Première République. 1793 : Louis XVI est guillotiné. Début de la Terreur (Robespierre).</p><h3>5. Conséquences</h3><p>Fin de la société d\'ordres, système métrique, calendrier révolutionnaire, idées républicaines diffusées dans toute l\'Europe. 1799 : Napoléon Bonaparte prend le pouvoir (coup d\'État).</p>',
      quiz: [
        { q: 'Que s\'est-il passé le 14 juillet 1789 ?', choix: ['La prise de la Bastille', 'L\'exécution du roi', 'Le sacre de Napoléon'], bon: 0, exp: 'Le peuple de Paris s\'empare de la prison royale, symbole de l\'arbitraire.' },
        { q: 'Le serment du Jeu de paume :', choix: ['Écrire une constitution', 'Libérer la Bastille', 'Faire la guerre'], bon: 0, exp: 'Le tiers état jure de ne pas se séparer avant d\'avoir une constitution.' },
        { q: 'Louis XVI est exécuté en :', choix: ['1793', '1789', '1799'], bon: 0, exp: 'Guillotiné le 21 janvier 1793.' },
        { q: 'La Déclaration des droits de l\'homme proclame :', choix: ['Liberté et égalité', 'Le retour du roi', 'Les privilèges'], bon: 0, exp: '26 août 1789 : liberté, égalité, propriété, souveraineté nationale.' },
        { q: 'En 1799, qui prend le pouvoir ?', choix: ['Napoléon Bonaparte', 'Robespierre', 'Louis XVIII'], bon: 0, exp: 'Coup d\'État du 18 Brumaire.' }
      ],
      vf: [
        { q: 'La Première République est proclamée en 1792.', v: true, exp: 'La monarchie est abolie le 21 septembre 1792.' },
        { q: 'La Révolution commence par une crise financière.', v: true, exp: 'Le royaume est endetté ; le roi convoque les États généraux.' },
        { q: 'La Terreur précède la prise de la Bastille.', v: false, exp: 'La Terreur vient après, en 1793-1794.' }
      ]
    },
    {
      id: 'h3-1418', mat: 'histoire', niveau: '3e',
      titre: 'La Grande Guerre (1914-1918)',
      express: '<li>1914 : attentat de Sarajevo → guerre entre la Triple Entente et les Empires centraux.</li><li>Guerre de position : tranchées, front figé (Verdun, 1916).</li><li>Violence de masse : armes nouvelles, civils touchés, génocide des Arméniens (1915).</li><li>1917 : entrée en guerre des États-Unis, mutineries, révolution russe.</li><li>11 novembre 1918 : armistice.</li>',
      complet: '<h3>1. Les causes</h3><p>Rivalités entre puissances (colonies, Alsace-Moselle), course aux armements, systèmes d\'alliances (Triple Entente : France, Royaume-Uni, Russie ; Empires centraux : Allemagne, Autriche-Hongrie). L\'attentat de Sarajevo (28 juin 1914) est l\'étincelle.</p><h3>2. 1914-1915 : de la guerre de mouvement aux tranchées</h3><p>Après l\'échec de la Marne, le front se fige : guerre de position. Les soldats vivent dans les tranchées, entre boue, rats et obus. Verdun (1916) : 300 jours, environ 700 000 victimes.</p><h3>3. La violence de masse</h3><p>Armes nouvelles : mitrailleuses, gaz, chars, avions. Génocide des Arméniens par l\'Empire ottoman (1915). Les civils sont mobilisés : femmes dans les usines (obus), économie de guerre, propagande.</p><h3>4. 1917, l\'année charnière</h3><p>Entrée en guerre des États-Unis, révolution russe (retrait de la Russie), mutineries et lassitude.</p><h3>5. 1918 : la fin</h3><p>Offensives allemandes puis alliées ; l\'Allemagne, épuisée, signe l\'armistice le 11 novembre 1918.</p><h3>6. Bilan</h3><p>Environ 10 millions de morts, millions d\'invalides, économies détruites. Traité de Versailles (1919) : l\'Allemagne est tenue pour responsable et paie des réparations.</p>',
      quiz: [
        { q: 'L\'étincelle de la guerre est :', choix: ['L\'attentat de Sarajevo', 'L\'entrée des États-Unis', 'La révolution russe'], bon: 0, exp: '28 juin 1914 : assassinat de l\'archiduc François-Ferdinand.' },
        { q: 'Verdun, c\'est :', choix: ['Une bataille de 1916', 'Un traité de 1919', 'Une arme'], bon: 0, exp: '300 jours de combats, symbole de la guerre des tranchées.' },
        { q: 'L\'armistice est signé :', choix: ['Le 11 novembre 1918', 'Le 28 juin 1914', 'Le 1er mai 1917'], bon: 0, exp: '11 novembre 1918, à 11 heures.' },
        { q: 'Les Empires centraux sont :', choix: ['Allemagne et Autriche-Hongrie', 'France et Royaume-Uni', 'Russie et Serbie'], bon: 0, exp: 'Face à la Triple Entente (France, Royaume-Uni, Russie).' },
        { q: 'En 1917, quel pays entre en guerre ?', choix: ['Les États-Unis', 'La Suisse', 'La Chine'], bon: 0, exp: 'Les États-Unis déclarent la guerre à l\'Allemagne en avril 1917.' }
      ],
      vf: [
        { q: 'La guerre de 1914-1918 fut surtout une guerre de tranchées.', v: true, exp: 'Après la Marne, le front se fige : guerre de position.' },
        { q: 'Le génocide des Arméniens a eu lieu en 1915.', v: true, exp: 'Perpétré par l\'Empire ottoman.' },
        { q: 'Le traité de Versailles fut signé avant l\'armistice.', v: false, exp: 'Il est signé en 1919, après l\'armistice de 1918.' }
      ]
    },
    // ================= GÉOGRAPHIE =================
    {
      id: 'g5-durable', mat: 'geo', niveau: '5e',
      titre: 'Le développement durable',
      express: '<li>Développement durable = concilier économie, société et environnement pour l\'avenir de la planète.</li><li>Ressources renouvelables (eau, vent, soleil) vs épuisables (pétrole, charbon).</li><li>L\'eau douce est inégalement répartie : 1 milliard de personnes manquent d\'eau potable.</li><li>Gestion durable : économiser, recycler, protéger.</li><li>Agenda 21 : plan d\'action local pour le 21e siècle.</li>',
      complet: '<h3>1. Définir le développement durable</h3><p>Satisfaire les besoins d\'aujourd\'hui sans détruire la capacité des générations futures à satisfaire les leurs. Trois piliers : économique (richesse), social (justice), environnemental (nature).</p><h3>2. Des ressources inégales et fragiles</h3><p>Ressources renouvelables : eau, forêts, vent, soleil. Ressources épuisables : pétrole, gaz, charbon, minerais. La consommation mondiale explose : énergies fossiles ≈ 80 % de l\'énergie.</p><h3>3. L\'eau : un exemple concret</h3><p>Moins de 3 % de l\'eau de la Terre est douce. Un milliard d\'humains n\'ont pas accès à l\'eau potable. Gaspillage agricole, pollution, assèchement des nappes.</p><h3>4. Gestions durables</h3><p>À l\'échelle mondiale : accords climat (COP), objectifs de développement durable de l\'ONU (ODD, 17 objectifs). À l\'échelle locale : Agenda 21 des communes (tri, transports propres, économies d\'eau). À l\'échelle individuelle : tri sélectif, sobriété énergétique.</p><h3>5. Les acteurs</h3><p>États, entreprises, associations, citoyens : chacun a un rôle. Le développement durable n\'est pas seulement l\'affaire des scientifiques !</p>',
      quiz: [
        { q: 'Le développement durable associe :', choix: ['Économie, social, environnement', 'Économie uniquement', 'Nature uniquement'], bon: 0, exp: 'Les trois piliers doivent avancer ensemble.' },
        { q: 'Le pétrole est une ressource :', choix: ['Épuisable', 'Renouvelable', 'Inépuisable'], bon: 0, exp: 'Il se forme sur des millions d\'années : une fois brûlé, c\'est fini.' },
        { q: 'Quelle part de l\'eau terrestre est douce ?', choix: ['Moins de 3 %', 'Environ 30 %', 'Environ 50 %'], bon: 0, exp: '97 % de l\'eau est salée ; à peine 3 % est douce.' },
        { q: 'L\'Agenda 21 est :', choix: ['Un plan d\'action local durable', 'Un traité de paix', 'Une entreprise'], bon: 0, exp: 'Chaque collectivité peut adopter son Agenda 21.' },
        { q: 'Les ODD de l\'ONU sont au nombre de :', choix: ['17', '3', '50'], bon: 0, exp: '17 objectifs de développement durable, adoptés en 2015.' }
      ],
      vf: [
        { q: 'Le vent est une ressource renouvelable.', v: true, exp: 'Il ne s\'épuise pas à l\'échelle humaine.' },
        { q: 'Toute l\'humanité a accès à l\'eau potable.', v: false, exp: 'Environ 1 milliard de personnes en manquent.' },
        { q: 'Le développement durable concerne aussi les citoyens.', v: true, exp: 'Tri, économies, transports : chacun agit.' }
      ]
    },
    {
      id: 'g4-mondialisation', mat: 'geo', niveau: '4e',
      titre: 'La mondialisation',
      express: '<li>La mondialisation = mise en relation des parties du monde par les flux (échanges, personnes, informations).</li><li>Les grandes métropoles (New York, Tokyo, Londres, Paris) commandent l\'économie mondiale.</li><li>Les entreprises multinationales produisent partout dans le monde.</li><li>Les transports (conteneurs, avions, câbles internet) accélèrent les échanges.</li><li>La mondialisation crise des inégalités entre les « gagnants » et les « perdants ».</li>',
      complet: '<h3>1. Définir les flux</h3><p>Flux de marchandises (80 % du commerce mondial maritime), flux de personnes (touristes, migrants), flux de capitaux (bourses), flux d\'informations (internet, câbles sous-marins).</p><h3>2. Les acteurs</h3><p>États, organisations internationales (OMC, ONU), FTN (firmes transnationales : Apple, Toyota...), individus (touristes, travailleurs). Les FTN réalisent plus de la moitié du commerce mondial.</p><h3>3. Les espaces de la mondialisation</h3><p>Pôles majeurs : Amérique du Nord, Europe, Asie orientale (la « Triade »). Métropoles mondiales qui concentrent les sièges et les bourses. Les mers et océans : routes stratégiques (détroits, canaux de Suez et Panama). Espaces en marge : pays enclavés, régions oubliées.</p><h3>4. Produire dans un monde globalisé</h3><p>Un smartphone est conçu en Californie, ses composants viennent d\'Asie, il est assemblé en Chine puis vendu partout. C\'est la chaîne de valeur mondiale.</p><h3>5. Débats</h3><p>Richesse créée mais inégalités croissantes, délocalisations, standardisation culturelle, impact environnemental des transports. Les flux illégaux (drogues, contrefaçon) profitent aussi de la mondialisation.</p>',
      quiz: [
        { q: 'Une FTN est :', choix: ['Une firme transnationale', 'Une organisation publique', 'Un type de bateau'], bon: 0, exp: 'Entreprise implantée dans plusieurs pays : Apple, Toyota...' },
        { q: 'La « Triade » regroupe :', choix: ['Amérique du Nord, Europe, Asie orientale', 'France, Allemagne, Italie', 'USA, Russie, Chine'], bon: 0, exp: 'Les trois pôles majeurs de l\'économie mondiale.' },
        { q: 'Les échanges mondiaux passent surtout par :', choix: ['La mer', 'Le train', 'La route'], bon: 0, exp: 'Environ 80 % du commerce mondial est maritime (conteneurs).' },
        { q: 'Un produit mondialisé typique :', choix: ['Le smartphone', 'Le pain de la boulangerie', 'L\'eau du robinet'], bon: 0, exp: 'Conçu, assemblé et vendu dans plusieurs continents.' },
        { q: 'Les espaces en marge sont :', choix: ['Peu connectés aux flux mondiaux', 'Les métropoles', 'Les ports'], bon: 0, exp: 'Pays enclavés, régions isolées : ils profitent peu de la mondialisation.' }
      ],
      vf: [
        { q: 'La mondialisation concerne seulement les marchandises.', v: false, exp: 'Aussi les personnes, les capitaux et les informations.' },
        { q: 'Les métropoles mondiales concentrent les sièges d\'entreprises.', v: true, exp: 'New York, Tokyo, Londres, Paris commandent l\'économie.' },
        { q: 'La mondialisation réduit toutes les inégalités.', v: false, exp: 'Elle en crée aussi, entre régions connectées et marges.' }
      ]
    },
    {
      id: 'g3-france-ue', mat: 'geo', niveau: '3e',
      titre: 'La France et l\'Union européenne',
      express: '<li>La France : 67 millions d\'habitants, puissance économique mondiale (7e puissance).</li><li>Ses atouts : agriculture puissante, tourisme (1er rang mondial), nuclear, TGV, luxe.</li><li>L\'UE : 27 États membres, 450 millions d\'habitants, premier pôle commercial mondial.</li><li>Zone euro : monnaie unique, la BCE gère la politique monétaire.</li><li>L\'UE est une union économique et politique inachevée : défense et étranger restent nationaux.</li>',
      complet: '<h3>1. La France, une puissance</h3><p>Atouts : 7e puissance économique, 1ère destination touristique mondiale (90 millions de visiteurs/an), grande agriculture exportatrice, industrie (aéronautique, luxe, pharmacie), Siège de l\'ONU à Paris. Limites : dépendance énergétique, déséquilibres territoriaux (diagonale du vide).</p><h3>2. L\'Union européenne</h3><p>Née après 1945 pour la paix : CECA (1951), Marché commun (1957), Maastricht (1992 : citoyenneté européenne et euro). Aujourd\'hui 27 États, 450 millions d\'habitants, 24 langues officielles.</p><h3>3. Le fonctionnement</h3><p>Commission européenne (propose), Parlement européen (vote, Strasbourg), Conseil des ministres (décide), Cour de justice (contrôle). 17 pays partagent l\'euro, géré par la Banque centrale européenne (BCE).</p><h3>4. Une puissance mondiale</h3><p>Premier pôle commercial, premier donneur d\'aide au développement, normes qui s\'exportent (environnement, données). Mais : dépendance énergétique, vieillissement, débats sur l\'élargissement.</p><h3>5. Une union inachevée</h3><p>Politique étrangère et défense restent largement nationales. Le Brexit (2020) a montré que l\'union peut reculer. L\'avenir : souveraineté technologique, transition verte.</p>',
      quiz: [
        { q: 'Combien d\'États membres compte l\'UE ?', choix: ['27', '15', '44'], bon: 0, exp: '27 États depuis le Brexit (2020).' },
        { q: 'La France est :', choix: ['1ère destination touristique mondiale', 'Dernière puissance agricole', 'Sans industrie'], bon: 0, exp: 'Environ 90 millions de visiteurs par an.' },
        { q: 'La BCE gère :', choix: ['La politique monétaire de la zone euro', 'Le tourisme', 'Les armées'], bon: 0, exp: 'Banque centrale européenne : elle veille sur l\'euro.' },
        { q: 'Le traité de Maastricht (1992) crée :', choix: ['La citoyenneté européenne et l\'euro', 'Le marché commun', 'L\'ONU'], bon: 0, exp: 'Étape clé : union économique et monétaire.' },
        { q: 'Le Parlement européen siège à :', choix: ['Strasbourg', 'Paris', 'Berlin'], bon: 0, exp: 'Les députés européens se réunissent à Strasbourg.' }
      ],
      vf: [
        { q: 'L\'UE est le premier pôle commercial mondial.', v: true, exp: 'Devant les États-Unis et la Chine.' },
        { q: 'Tous les pays de l\'UE ont l\'euro.', v: false, exp: 'Seulement 20 pays partagent la monnaie unique.' },
        { q: 'La défense de l\'UE est entièrement commune.', v: false, exp: 'Elle reste largement nationale : l\'union est inachevée.' }
      ]
    },
    // ================= SVT =================
    {
      id: 'svt5-eau', mat: 'svt', niveau: '5e',
      titre: 'L\'eau dans notre environnement',
      express: '<li>L\'eau existe en 3 états : solide (glace), liquide, gazeux (vapeur).</li><li>Changements d\'état : fusion, solidification, vaporisation, condensation, sublimation.</li><li>Le cycle de l\'eau : évaporation → nuages → précipitations → rivières → océans.</li><li>L\'eau douce est rare : moins de 3 % de l\'eau de la Terre.</li><li>Mélange vs corps pur : l\'eau salée est un mélange.</li>',
      complet: '<h3>1. Les trois états de l\'eau</h3><p>Solide (glace, 0 °C et moins), liquide (0 à 100 °C), gazeux (vapeur, au-delà de 100 °C à pression normale). L\'eau pure bout à 100 °C et gèle à 0 °C.</p><h3>2. Les changements d\'état</h3><p>Fusion (solide → liquide), solidification (inverse), vaporisation (liquide → gaz), liquéfaction/condensation (gaz → liquide), sublimation (solide → gaz).</p><h3>3. Le cycle de l\'eau</h3><p>Le Soleil fait évaporer l\'eau des océans et des rivières. La vapeur se condense en nuages, l\'eau retombe en pluie ou neige, s\'infiltre dans le sol, rejoint les rivières et les océans. C\'est un cycle fermé, alimenté par l\'énergie solaire.</p><h3>4. Eau douce : une ressource rare</h3><p>97 % de l\'eau est salée (océans). Sur les 3 % d\'eau douce, la majeure partie est gelée (glaciers). L\'eau potable disponible est minuscule : il faut l\'économiser.</p><h3>5. Mélanges</h3><p>Eau + sel = mélange homogène (le sel se dissout). Eau + sable = mélange hétérogène (le sable se dépose). On peut séparer par filtration (sable) ou distillation (sel).</p><h3>6. Test de reconnaissance</h3><p>Le sulfate de cuivre anhydre devient bleu en présence d\'eau.</p>',
      quiz: [
        { q: 'L\'eau pure bout à :', choix: ['100 °C', '0 °C', '50 °C'], bon: 0, exp: 'À pression normale, ébullition à 100 °C.' },
        { q: 'Gaz → liquide s\'appelle :', choix: ['Condensation', 'Fusion', 'Sublimation'], bon: 0, exp: 'La vapeur se condense en gouttelettes.' },
        { q: 'Quelle part de l\'eau terrestre est douce ?', choix: ['Moins de 3 %', 'Environ 30 %', 'Environ 50 %'], bon: 0, exp: '97 % de l\'eau est salée ; à peine 3 % est douce.' },
        { q: 'Eau + sable donne :', choix: ['Un mélange hétérogène', 'Un mélange homogène', 'Un corps pur'], bon: 0, exp: 'Le sable ne se dissout pas : il se dépose.' },
        { q: 'Qu\'est-ce qui fait évaporer l\'eau des océans ?', choix: ['Le Soleil', 'La Lune', 'Le vent uniquement'], bon: 0, exp: 'L\'énergie solaire est le moteur du cycle de l\'eau.' }
      ],
      vf: [
        { q: 'La glace est de l\'eau à l\'état solide.', v: true, exp: 'État solide en dessous de 0 °C.' },
        { q: 'Le sel se dissout dans l\'eau : le mélange est hétérogène.', v: false, exp: 'Il se dissout : le mélange est homogène.' },
        { q: 'La distillation permet de séparer le sel et l\'eau.', v: true, exp: 'L\'eau s\'évapore, le sel reste.' }
      ]
    },
    {
      id: 'svt4-volcans', mat: 'svt', niveau: '4e',
      titre: 'Volcans et tectonique des plaques',
      express: '<li>L\'écorce terrestre est découpée en plaques lithosphériques en mouvement.</li><li>Les plaques s\'écartent (dorsales), se rapprochent (fosses, montagnes) ou coulissent (failles).</li><li>Les séismes et volcans se concentrent aux frontières de plaques.</li><li>Un volcan éruptif : magma, cratère, coulées, projections, cendres.</li><li>Éruptions explosives (visqueux) vs effusives (fluides).</li>',
      complet: '<h3>1. La structure de la Terre</h3><p>En surface : la lithosphère rigide (écorce + haut manteau), découpée en plaques. En dessous : l\'asthénosphère, partiellement fondue, sur laquelle les plaques glissent à quelques cm/an (comme un tapis roulant lent).</p><h3>2. Trois types de frontières</h3><p>Divergente : les plaques s\'écartent, remontée de magma, création de croûte (dorsales océaniques, Islande). Convergente : une plaque plonge sous l\'autre (subduction, fosses, Andes, Japon) ou collision (Himalaya). Transformante : coulissage (faille de San Andreas).</p><h3>3. Volcans et séismes</h3><p>La « ceinture de feu » du Pacifique concentre 75 % des volcans actifs. Un séisme est la libération brutale de contraintes accumulées : ondes sismiques, magnitude (échelle de Richter).</p><h3>4. Anatomie d\'un volcan</h3><p>Chambre magmatique → cheminée → cratère → coulées, bombs, cendres. Éruption effusive : magma fluide, coulées rapides mais prévisibles (Piton de la Fournaise). Éruption explosive : magma visqueux, panaches de cendres dangereux (Mont Saint Helens, Vésuve).</p><h3>5. Prévention</h3><p>Surveillance (sismographes, GPS, gaz), cartes de risque, exercices d\'évacuation : on ne peut pas empêcher une éruption, mais on peut s\'y préparer.</p>',
      quiz: [
        { q: 'Les plaques lithosphériques glissent sur :', choix: ['L\'asthénosphère', 'Le noyau', 'L\'eau des océans'], bon: 0, exp: 'L\'asthénosphère, partiellement fondue, permet le mouvement.' },
        { q: 'Aux dorsales océaniques, les plaques :', choix: ['S\'écartent', 'Se rapprochent', 'Coulissent'], bon: 0, exp: 'Divergence : du magma remonte et crée de la croûte.' },
        { q: 'La faille de San Andreas est une frontière :', choix: ['Transformante', 'Convergente', 'Divergente'], bon: 0, exp: 'Les plaques coulissent l\'une contre l\'autre.' },
        { q: 'Une éruption explosive a un magma :', choix: ['Visqueux', 'Très fluide', 'Froid'], bon: 0, exp: 'Visqueux : les gaz restent piégés puis explosent.' },
        { q: 'La « ceinture de feu » borde :', choix: ['L\'océan Pacifique', 'L\'océan Atlantique', 'L\'Afrique'], bon: 0, exp: 'Environ 75 % des volcans actifs y sont alignés.' }
      ],
      vf: [
        { q: 'Les plaques se déplacent de quelques cm par an.', v: true, exp: 'La vitesse d\'un ongle qui pousse !' },
        { q: 'Les séismes sont répartis au hasard sur Terre.', v: false, exp: 'Ils se concentrent aux frontières de plaques.' },
        { q: 'On peut prévoir les éruptions en surveillant les volcans.', v: true, exp: 'Sismographes, gaz, déformations : la surveillance sauve des vies.' }
      ]
    },
    {
      id: 'svt3-genetique', mat: 'svt', niveau: '3e',
      titre: 'Génétique : l\'ADN et la transmission des caractères',
      express: '<li>L\'ADN est la molécule-support de l\'information génétique, dans le noyau des cellules.</li><li>Un gène est une portion d\'ADN qui détermine un caractère (couleur des yeux...).</li><li>Chaque caractère existe en versions : allèle dominant ou récessif.</li><li>Nous héritons d\'un allèle de chaque parent : le hasard des gamètes.</li><li>Le caryotype humain : 46 chromosomes, dont XX (fille) ou XY (garçon).</li>',
      complet: '<h3>1. L\'ADN, le livre de la vie</h3><p>Double hélice formée de nucléotides (A, T, G, C). L\'ADN est découpé en chromosomes, visibles lors des divisions cellulaires. L\'ensemble = le génome.</p><h3>2. Gènes et allèles</h3><p>Un gène (ex. couleur des yeux) peut exister en plusieurs versions : les allèles. Allèle dominant (s\'exprime dès qu\'il est présent) et récessif (exprimé seulement en double exemplaire).</p><h3>3. La fécondation</h3><p>Chaque parent transmet un allèle par gène via ses gamètes. Le hasard de la fécondation explique la diversité des enfants d\'un même couple. Échiquier de croisement : on prédit les probabilités (ex. 3 chances sur 4 pour un allèle dominant).</p><h3>4. Caryotype et sexe</h3><p>46 chromosomes = 23 paires. La 23e paire détermine le sexe : XX = fille, XY = garçon. C\'est le spermatozoïde (X ou Y) qui décide du sexe de l\'enfant.</p><h3>5. Mutations et diversité</h3><p>Des erreurs de copie (mutations) créent de nouveaux allèles : c\'est le moteur de l\'évolution. Certaines mutations causent des maladies génétiques (drépanocytose, mucoviscidose), d\'autres sont neutres ou utiles.</p>',
      quiz: [
        { q: 'L\'information génétique est portée par :', choix: ['L\'ADN', 'La membrane', 'Les mitochondries'], bon: 0, exp: 'L\'ADN, dans le noyau des cellules.' },
        { q: 'Un allèle récessif s\'exprime :', choix: ['En deux exemplaires', 'Toujours', 'Jamais'], bon: 0, exp: 'Il faut l\'hériter des deux parents.' },
        { q: 'Le caryotype humain compte :', choix: ['46 chromosomes', '23 chromosomes', '64 chromosomes'], bon: 0, exp: '23 paires, dont la paire sexuelle.' },
        { q: 'Qui détermine le sexe de l\'enfant ?', choix: ['Le spermatozoïde (X ou Y)', 'L\'ovule', 'L\'alimentation'], bon: 0, exp: 'L\'ovule porte toujours X ; le spermatozoïde apporte X ou Y.' },
        { q: 'Une mutation est :', choix: ['Une modification de l\'ADN', 'Une maladie obligatoire', 'Une division cellulaire'], bon: 0, exp: 'Erreur de copie : parfois neutre, parfois utile, parfois pathogène.' }
      ],
      vf: [
        { q: 'Un gène peut exister en plusieurs versions (allèles).', v: true, exp: 'Chaque version donne une variation du caractère.' },
        { q: 'Chaque parent transmet ses deux allèles de chaque gène.', v: false, exp: 'Un seul par gène : l\'enfant en reçoit deux au total.' },
        { q: 'Les mutations participent à l\'évolution.', v: true, exp: 'Elles créent la diversité sur laquelle la sélection agit.' }
      ]
    },
    // ================= PHYSIQUE-CHIMIE =================
    {
      id: 'pc5-lumiere', mat: 'physique', niveau: '5e',
      titre: 'La lumière et les ombres',
      express: '<li>On ne voit un objet que s\'il émet ou renvoie de la lumière vers nos yeux.</li><li>La lumière se propage en ligne droite dans un milieu transparent.</li><li>Ombre propre (sur l\'objet) et ombre portée (sur un écran).</li><li>Vitesse de la lumière : 300 000 km/s (la plus rapide de l\'Univers).</li><li>Propagation : source → objet → œil, toujours dans ce sens !</li>',
      complet: '<h3>1. Sources et récepteurs</h3><p>Sources primaires (Soleil, lampe, flamme) : elles produisent la lumière. Objets diffusants (Lune, page d\'un livre) : ils renvoient la lumière reçue. L\'œil et la caméra sont des récepteurs.</p><h3>2. Le modèle du rayon</h3><p>Dans un milieu transparent et homogène, la lumière se propage en ligne droite : on la représente par un rayon fléché. Pour voir un objet, il faut qu\'un rayon va de l\'objet jusqu\'à l\'œil.</p><h3>3. Ombres</h3><p>Ombre propre : partie de l\'objet non éclairée. Cône d\'ombre et ombre portée : zone sombre sur un écran derrière l\'objet. Une éclipse de Soleil se produit quand la Lune projette son ombre sur la Terre.</p><h3>4. La vitesse de la lumière</h3><p>c = 300 000 km/s (3×10⁸ m/s) dans le vide. Le Soleil est à 150 millions de km : sa lumière met 8 min 20 s à nous parvenir. Une année-lumière = distance parcourue en 1 an ≈ 9 500 milliards de km.</p><h3>5. Jour et nuit, saisons</h3><p>La Terre tourne sur elle-même en 24 h (alternance jour/nuit) et autour du Soleil en 365,25 jours (saisons dues à l\'inclinaison de l\'axe).</p>',
      quiz: [
        { q: 'La Lune est :', choix: ['Un objet diffusant', 'Une source primaire', 'Un récepteur'], bon: 0, exp: 'Elle renvoie la lumière du Soleil.' },
        { q: 'La lumière se propage :', choix: ['En ligne droite', 'En courbe', 'En zigzag'], bon: 0, exp: 'Dans un milieu transparent et homogène.' },
        { q: 'La vitesse de la lumière est environ :', choix: ['300 000 km/s', '300 km/s', '1 000 km/s'], bon: 0, exp: 'Rien ne va plus vite dans l\'Univers.' },
        { q: 'La lumière du Soleil met :', choix: ['Environ 8 minutes', '1 seconde', '1 heure'], bon: 0, exp: '8 min 20 s pour 150 millions de km.' },
        { q: 'L\'ombre portée se forme :', choix: ['Sur un écran derrière l\'objet', 'Sur l\'objet lui-même', 'Autour de la source'], bon: 0, exp: 'L\'ombre propre est sur l\'objet ; la portée, sur l\'écran.' }
      ],
      vf: [
        { q: 'On voit un objet qui n\'envoie aucune lumière vers l\'œil.', v: false, exp: 'Impossible : il faut de la lumière entre l\'objet et l\'œil.' },
        { q: 'Une éclipse de Soleil est une ombre portée de la Lune.', v: true, exp: 'La Lune se glisse entre le Soleil et nous.' },
        { q: 'L\'année-lumière est une unité de distance.', v: true, exp: 'Distance parcourue par la lumière en un an.' }
      ]
    },
    {
      id: 'pc4-electricite', mat: 'physique', niveau: '4e',
      titre: 'Le circuit électrique',
      express: '<li>Circuit fermé = le courant circule ; circuit ouvert = rien ne marche.</li><li>Série : une seule boucle ; dérivation : plusieurs branches.</li><li>En série, l\'intensité est la même partout ; en dérivation, la tension est la même aux bornes.</li><li>Un fusible protège : il fond si l\'intensité dépasse la limite.</li><li>Loi des nœuds : l\'intensité qui arrive = l\'intensité qui repart.</li>',
      complet: '<h3>1. Les grandeurs électriques</h3><p>Tension U en volts (V) : mesurée avec un voltmètre branché en dérivation. Intensité I en ampères (A) : mesurée avec un ampèremètre branché en série. Symboles normalisés : pile, lampe, interrupteur, résistance, moteur.</p><h3>2. Circuit en série</h3><p>Une seule boucle : l\'intensité est la même en tout point (I constante). Si une lampe grille ou qu\'on en dévisse une, tout s\'éteint. Plus de récepteurs = tension partagée, lamps moins brillantes.</p><h3>3. Circuit en dérivation</h3><p>Plusieurs branches : la tension est la même aux bornes de chaque branche. Une lampe qui grille n\'éteint pas les autres. Loi des nœuds : I arrivant = I repartant (I = I1 + I2).</p><h3>4. Sécurité</h3><p>Le corps humain conduit l\'électricité : danger dès 20-30 mA. Fusibles et disjoncteurs coupent le circuit en cas de surintensité (court-circuit). Installation domestique : fils phase/neutre/terre.</p><h3>5. Puissance et énergie</h3><p>P = U × I (watts). E = P × t : une lampe de 60 W allumée 2 h consomme 120 Wh. Le compteur électrique mesure les kWh.</p>',
      quiz: [
        { q: 'L\'intensité se mesure en :', choix: ['Ampères (A)', 'Volts (V)', 'Watts (W)'], bon: 0, exp: 'Volt = tension ; watt = puissance ; ampère = intensité.' },
        { q: 'Dans un circuit en série, l\'intensité est :', choix: ['La même partout', 'Divisée en deux', 'Nulle'], bon: 0, exp: 'Une seule boucle : le courant est identique partout.' },
        { q: 'Un ampèremètre se branche :', choix: ['En série', 'En dérivation', 'N\'importe où'], bon: 0, exp: 'Le voltmètre, lui, se branche en dérivation.' },
        { q: 'Loi des nœuds :', choix: ['I arrivant = I repartant', 'U = R × I', 'P = U × I'], bon: 0, exp: 'Le courant qui arrive à un nœud en repart intégralement.' },
        { q: 'Un fusible sert à :', choix: ['Couper en cas de surintensité', 'Éclairer', 'Mesurer la tension'], bon: 0, exp: 'Il fond et ouvre le circuit : protection !' }
      ],
      vf: [
        { q: 'En dérivation, si une lampe grille, les autres restent allumées.', v: true, exp: 'Les branches sont indépendantes.' },
        { q: 'Le corps humain conduit l\'électricité.', v: true, exp: 'D\'où le danger de la maison : 230 V.' },
        { q: 'Le voltmètre se branche en série.', v: false, exp: 'En dérivation, aux bornes du dipôle.' }
      ]
    },
    {
      id: 'pc3-atome', mat: 'physique', niveau: '3e',
      titre: 'L\'atome et les ions',
      express: '<li>Un atome = un noyau (protons + neutrons) + des électrons autour.</li><li>Protons : charge + ; neutrons : neutres ; électrons : charge −.</li><li>Un atome est neutre : autant de protons que d\'électrons.</li><li>Un ion = un atome qui a gagné ou perdu des électrons.</li><li>La matière est essentiellement vide : le noyau est 100 000 fois plus petit que l\'atome.</li>',
      complet: '<h3>1. Structure de l\'atome</h3><p>Noyau central (nucléons : protons +, neutrons 0) et cortège d\'électrons (−e). Le numéro atomique Z = nombre de protons ; A = nombre de nucléons. Exemple : le carbone 12 → 6 protons, 6 neutrons, 6 électrons.</p><h3>2. Neutralité électrique</h3><p>Autant de charges + que de − : l\'atome est neutre. C\'est l\'interaction électrique qui retient les électrons près du noyau.</p><h3>3. Les ions</h3><p>Un atome qui perd des électrons devient un cation (charge +) : Na⁺, Cu²⁺. Un atome qui gagne des électrons devient un anion (charge −) : Cl⁻, O²⁻. Les ions formés se reconnaissent à leur charge entre parenthèses.</p><h3>4. Les formules chimiques</h3><p>Les molécules : H₂O (2 hydrogènes, 1 oxygène), CO₂, O₂. Les tests d\'identification : l\'eau blanchit le sulfate de cuivre anhydre ; le dioxygène ravive une braise ; le dioxyde de carbone trouble l\'eau de chaux.</p><h3>5. Atomes, ions et courant électrique</h3><p>Dans les métaux, les électrons libres se déplacent : c\'est le courant électrique. Dans les solutions, ce sont les ions qui circulent (les liquides conducteurs sont ioniques).</p>',
      quiz: [
        { q: 'Un ion négatif est appelé :', choix: ['Un anion', 'Un cation', 'Un neutron'], bon: 0, exp: 'Anion = charge − ; cation = charge +.' },
        { q: 'Le carbone 12 contient :', choix: ['6 protons, 6 neutrons', '12 protons', '6 protons, 12 neutrons'], bon: 0, exp: 'Z = 6, A = 12 → 6 protons et 6 neutrons.' },
        { q: 'Un atome qui perd un électron devient :', choix: ['Un cation', 'Un anion', 'Un isotope'], bon: 0, exp: 'Il lui reste une charge positive.' },
        { q: 'Qui concentre presque toute la masse de l\'atome ?', choix: ['Le noyau', 'Les électrons', 'Le vide'], bon: 0, exp: 'Protons et neutrons sont ~1836 fois plus lourds que les électrons.' },
        { q: 'Dans un métal, le courant est dû à :', choix: ['Des électrons libres', 'Des ions', 'Des neutrons'], bon: 0, exp: 'Les électrons se déplacent d\'un bout à l\'autre.' }
      ],
      vf: [
        { q: 'Le neutron porte une charge positive.', v: false, exp: 'Il est électriquement neutre.' },
        { q: 'L\'eau de chaux se trouble en présence de CO₂.', v: true, exp: 'C\'est le test du dioxyde de carbone.' },
        { q: 'L\'atome est surtout composé de vide.', v: true, exp: 'Le noyau est 100 000 fois plus petit que l\'atome.' }
      ]
    },
    // ================= ANGLAIS =================
    {
      id: 'ang5-present', mat: 'anglais', niveau: '5e',
      titre: 'Presenting people: BE, HAVE GOT',
      express: '<li>BE = être : I am, you are, he/she is, we are, they are.</li><li>Négation : he is NOT (isn\'t) ; question : Are you...?</li><li>HAVE GOT = avoir : I have got (I\'ve got), he has got (he\'s got).</li><li>Pour présenter : His name is... / He is 12 years old / He has got two sisters.</li><li>Bases : a/an, pluriels (s), his/her.</li>',
      complet: '<h3>1. Le verbe BE (être)</h3><p>Forme affirmative : I am, you are, he/she/it is, we are, you are, they are. Négation : ajout de not (I\'m not, he isn\'t, we aren\'t). Question : inversion (Are you happy? Is she tall?).</p><h3>2. Le verbe HAVE GOT (avoir)</h3><p>I/you/we/they have got ; he/she/it has got. Négation : I haven\'t got, he hasn\'t got. Question : Have you got...? Has she got...?</p><h3>3. Présenter quelqu\'un</h3><p>His name is Tom. He is twelve years old. He is British. He has got one brother and two sisters. He lives in Manchester. He likes football and he doesn\'t like homework.</p><h3>4. Les bases du nom</h3><p>a + consonne (a dog), an + voyelle (an apple). Pluriel : +s (cats), irréguliers (man → men, child → children). His (de lui) / her (d\'elle).</p><h3>5. Questions utiles</h3><p>What\'s your name? How old are you? Where do you live? Have you got any pets?</p>',
      quiz: [
        { q: 'She ___ my best friend.', choix: ['is', 'are', 'am'], bon: 0, exp: 'She → is (3e personne singulier).' },
        { q: 'La bonne forme :', choix: ['He has got two cats.', 'He have got two cats.', 'He is got two cats.'], bon: 0, exp: 'He → has got.' },
        { q: 'Question correcte :', choix: ['Are you ready?', 'You are ready?', 'Do you are ready?'], bon: 0, exp: 'Inversion sujet/verbe : Are you...?' },
        { q: '___ apple a day.', choix: ['An', 'A', 'And'], bon: 0, exp: 'An devant une voyelle : an apple.' },
        { q: 'Le pluriel de child :', choix: ['children', 'childs', 'childes'], bon: 0, exp: 'Pluriel irrégulier : child → children.' }
      ],
      vf: [
        { q: '« I am » se contracte en « I\'m ».', v: true, exp: 'I\'m, you\'re, he\'s, we\'re, they\'re.' },
        { q: 'On dit « he are ».', v: false, exp: 'He is ! (ou he\'s)' },
        { q: 'La question avec have got : « Have you got a pen? »', v: true, exp: 'Have/Has + sujet + got... ?' }
      ]
    },
    {
      id: 'ang4-preterit', mat: 'anglais', niveau: '4e',
      titre: 'Le prétérit (passé simple)',
      express: '<li>Le prétérit raconte le passé : yesterday, last week, in 2010, ago.</li><li>Verbes réguliers : verbe + -ed (played, watched).</li><li>Négation : didn\'t + verbe de base (I didn\'t play).</li><li>Question : Did you play? — Yes, I did / No, I didn\'t.</li><li>Irregulars à connaître : go → went, have → had, see → saw, take → took, be → was/were.</li>',
      complet: '<h3>1. Quand l\'utiliser</h3><p>Action achevée dans le passé, avec un marqueur : yesterday, last month, two days ago, in 1998, when I was young.</p><h3>2. Les verbes réguliers</h3><p>Règle : + ed (work → worked). Orthographe : verbe en -e → +d (like → liked) ; consonne-voyelle-consonne → double (stop → stopped) ; -y après consonne → -ied (study → studied).</p><h3>3. Négation et question</h3><p>Auxiliaire did + base verbale. I didn\'t watch TV. Did she visit London? Yes, she did. / No, she didn\'t. Attention : after didn\'t, pas de -ed !</p><h3>4. Les irréguliers fréquents</h3><p>go → went, have → had, do → did, see → saw, take → took, make → made, get → got, come → came, say → said, buy → bought, eat → ate, write → wrote, be → was/were.</p><h3>5. Raconter une journée</h3><p>Yesterday, I woke up at 7. I had breakfast, then I went to school by bus. In the evening, I did my homework and I watched a film. I went to bed at 10.</p>',
      quiz: [
        { q: 'She ___ to the cinema last week.', choix: ['went', 'goed', 'goes'], bon: 0, exp: 'Go → went : irrégulier.' },
        { q: 'Forme correcte :', choix: ['I didn\'t play football.', 'I didn\'t played football.', 'I not played football.'], bon: 0, exp: 'After didn\'t, verbe de base (pas de -ed).' },
        { q: 'Question :', choix: ['Did you watch the film?', 'Did you watched the film?', 'You watched the film?'], bon: 0, exp: 'Did + sujet + base verbale.' },
        { q: 'Le passé de take :', choix: ['took', 'taked', 'taked'], bon: 0, exp: 'take → took.' },
        { q: 'Study au prétérit :', choix: ['studied', 'studyed', 'study'], bon: 0, exp: 'Consonne + y → -ied.' }
      ],
      vf: [
        { q: '« Ago » signale le prétérit.', v: true, exp: 'Two years ago = il y a deux ans : passé achevé.' },
        { q: 'Au négatif, on met -ed après didn\'t.', v: false, exp: 'Jamais : didn\'t + base verbale.' },
        { q: 'Le passé de be est was/were.', v: true, exp: 'I/he/she/it was ; you/we/they were.' }
      ]
    },
    {
      id: 'ang3-perfect', mat: 'anglais', niveau: '3e',
      titre: 'Present perfect vs prétérit',
      express: '<li>Present perfect : HAVE/HAS + participe passé (gone, seen, done).</li><li>Il relie passé et présent : I have lost my keys (elles sont encore perdues).</li><li>Marqueurs : ever, never, just, already, yet, since, for.</li><li>Prétérit : action datée et achevée (yesterday, in 2010).</li><li>Différence clé : I have been to London (expérience) / I went to London last year (daté).</li>',
      complet: '<h3>1. Formation du present perfect</h3><p>have/has + participe passé : réguliers = -ed (visited), irréguliers à apprendre (go → gone, see → seen, eat → eaten, write → written).</p><h3>2. Les emplois</h3><p>Expérience de vie : Have you ever been to the USA? Bilan du présent : She has just finished her homework. Action qui dure : I have lived here for ten years / since 2014.</p><h3>3. For et since</h3><p>For + durée : for two hours, for ten years. Since + point de départ : since Monday, since 2015, since I was born.</p><h3>4. Present perfect ou prétérit ?</h3><p>Avec yesterday, last week, in 2010, ago → prétérit. Avec ever, never, just, already, yet, since, for → present perfect. Exemples : I have never eaten sushi. / I ate sushi last night.</p><h3>5. Contractions</h3><p>I\'ve been, he\'s done, we haven\'t finished, Has she arrived yet?</p>',
      quiz: [
        { q: 'I ___ never ___ to Japan.', choix: ['have / been', 'did / go', 'am / going'], bon: 0, exp: 'Expérience de vie : have + been.' },
        { q: '___ you ___ your homework yet?', choix: ['Have / finished', 'Did / finished', 'Have / finish'], bon: 0, exp: 'Yet signale le present perfect : Have + participe passé.' },
        { q: 'Choose the right one:', choix: ['I have seen this film last night.', 'I saw this film last night.', 'I have see this film last night.'], bon: 1, exp: 'Last night = daté → prétérit (saw).' },
        { q: 'We have lived here ___ 2015.', choix: ['since', 'for', 'ago'], bon: 0, exp: 'Since + point de départ.' },
        { q: 'Le participe passé de write :', choix: ['written', 'wrote', 'writed'], bon: 0, exp: 'write → wrote (prétérit) → written (participe).' }
      ],
      vf: [
        { q: '« Since » est suivi d\'une durée.', v: false, exp: 'Since + point de départ ; for + durée.' },
        { q: 'Le present perfect utilise have/has.', v: true, exp: 'have/has + participe passé.' },
        { q: '« I have visited Rome yesterday » est correct.', v: false, exp: 'Yesterday exige le prétérit : I visited Rome yesterday.' }
      ]
    },
    {
      id: 'm5-decimaux', mat: 'maths', niveau: '5e',
      titre: 'Nombres décimaux',
      express: '<li>Un décimal a une virgule : 3,14. Le rang après la virgule : dixièmes, centièmes, millièmes.</li><li>Comparer : on compare d\'abord la partie entière, puis chiffre après chiffre.</li><li>Encadrer : 3,1 &lt; 3,14 &lt; 3,2.</li><li>Multiplication par 10 ; 100 ; 1000 : la virgule se déplace vers la droite.</li><li>Division par 10 ; 100 ; 1000 : la virgule se déplace vers la gauche.</li>',
      complet: '<h3>1. Lecture</h3><p>12,345 se lit « douze virgule trois cent quarante-cinq » : 1 dizaine, 2 unités, 3 dixièmes, 4 centièmes, 5 millièmes.</p><h3>2. Comparaison</h3><p>5,7 &gt; 5,32 car 7 dixièmes &gt; 3 dixièmes. Attention : 5,32 n\'est pas plus grand parce qu\'il a plus de chiffres !</p><h3>3. Encadrement</h3><p>Entre deux entiers : 3 &lt; 3,14 &lt; 4. Entre deux dixièmes : 3,1 &lt; 3,14 &lt; 3,2.</p><h3>4. Multiplier par 10, 100, 1000</h3><p>2,5 × 10 = 25 ; 2,5 × 100 = 250 ; 0,7 × 1000 = 700. Chaque multiplication décale la virgule d\'un rang vers la droite.</p><h3>5. Diviser par 10, 100, 1000</h3><p>25 ÷ 10 = 2,5 ; 25 ÷ 100 = 0,25 ; 8 ÷ 1000 = 0,008.</p><h3>6. Unités de mesure</h3><p>1 m = 100 cm, 1 kg = 1000 g, 1 L = 100 cL : convertir, c\'est multiplier ou diviser par 10, 100 ou 1000.</p>',
      quiz: [
        { q: '4,35 × 10 = ?', choix: ['43,5', '4,350', '44,5'], bon: 0, exp: 'La virgule se déplace d\'un rang vers la droite.' },
        { q: 'Le plus grand nombre :', choix: ['5,9', '5,89', '5,099'], bon: 0, exp: '9 dixièmes &gt; 8 dixièmes &gt; 0 dixième.' },
        { q: '7 ÷ 100 = ?', choix: ['0,07', '0,7', '0,007'], bon: 0, exp: '7 ÷ 100 : deux rangs vers la gauche → 0,07.' },
        { q: 'Encadrement de 6,42 entre deux dixièmes :', choix: ['6,4 &lt; 6,42 &lt; 6,5', '6 &lt; 6,42 &lt; 7', '6,42 &lt; 6,5 &lt; 6,6'], bon: 0, exp: '6,42 est entre 6,4 et 6,5.' },
        { q: '3,2 m = ? cm', choix: ['320', '32', '3200'], bon: 0, exp: '1 m = 100 cm donc 3,2 × 100 = 320 cm.' }
      ],
      vf: [
        { q: '5,32 est plus grand que 5,7 car il a plus de chiffres.', v: false, exp: 'On compare les dixièmes : 3 &lt; 7 donc 5,32 &lt; 5,7.' },
        { q: '0,5 = 5 dixièmes.', v: true, exp: 'Le premier rang après la virgule est celui des dixièmes.' },
        { q: 'Diviser par 1000 déplace la virgule de 3 rangs vers la gauche.', v: true, exp: 'Exemple : 5 ÷ 1000 = 0,005.' }
      ]
    },
    {
      id: 'm5-symetrie', mat: 'maths', niveau: '5e',
      titre: 'Symétrie et axes',
      express: '<li>Deux figures sont symétriques par rapport à un axe si elles se superposent quand on plie le long de l\'axe.</li><li>La symétrie conserve : longueurs, angles, alignement.</li><li>L\'axe de symétrie est la médiatrice du segment reliant un point et son image.</li><li>Figures classiques : le carré a 4 axes, le rectangle 2, le cercle une infinité.</li><li>Un point sur l\'axe est son propre symétrique.</li>',
      complet: '<h3>1. Symétrique d\'un point</h3><p>Pour construire le symétrique A\' de A par rapport à l\'axe (d) : on trace la perpendiculaire à (d) passant par A, on mesure la distance de A à (d), et on reporte cette distance de l\'autre côté.</p><h3>2. Propriétés</h3><p>La symétrie axiale conserve les longueurs, les angles, les aires et l\'alignement. Une figure et son image sont superposables.</p><h3>3. Axes des figures usuelles</h3><p>Carré : 4 axes (2 médianes, 2 diagonales). Rectangle : 2 axes (les médianes). Triangle équilatéral : 3 axes. Cercle : tous les diamètres.</p><h3>4. Symétrie et pliage</h3><p>Si on plie la feuille le long de l\'axe, les deux figures coïncident exactement. C\'est un bon test visuel.</p><h3>5. Construction au compas</h3><p>On peut aussi construire le symétrique avec le compas uniquement : le point A\' est à la même distance de deux points de l\'axe que A.</p><h3>6. Pliages et frises</h3><p>Les frises et pavages utilisent des symétries répétées : on retrouve l\'axe entre chaque motif.</p>',
      quiz: [
        { q: 'Combien d\'axes de symétrie a un rectangle ?', choix: ['2', '4', '0'], bon: 0, exp: 'Les deux médianes seulement (les diagonales ne le sont pas).' },
        { q: 'La symétrie conserve :', choix: ['les longueurs', 'l\'orientation des lettres', 'rien'], bon: 0, exp: 'Longueurs, angles et alignement sont conservés.' },
        { q: 'Un point situé sur l\'axe :', choix: ['est son propre symétrique', 'n\'a pas de symétrique', 'double de distance'], bon: 0, exp: 'Il est invariant par la symétrie.' },
        { q: 'Axes de symétrie d\'un carré :', choix: ['4', '2', '8'], bon: 0, exp: '2 médianes + 2 diagonales.' },
        { q: 'Pour tracer le symétrique de A, on trace :', choix: ['la perpendiculaire à l\'axe passant par A', 'la parallèle à l\'axe', 'un cercle'], bon: 0, exp: 'Puis on reporte la distance de l\'autre côté.' }
      ],
      vf: [
        { q: 'Le cercle possède une infinité d\'axes de symétrie.', v: true, exp: 'Chaque diamètre est un axe de symétrie.' },
        { q: 'Les diagonales d\'un rectangle sont des axes de symétrie.', v: false, exp: 'Seules les médiatrices des côtés le sont.' },
        { q: 'Une figure et sa symétrique ont la même aire.', v: true, exp: 'La symétrie conserve les aires.' }
      ]
    },
    {
      id: 'm4-puissances', mat: 'maths', niveau: '4e',
      titre: 'Puissances',
      express: '<li>aⁿ = a multiplié n fois par lui-même. 2³ = 2 × 2 × 2 = 8.</li><li>aᵐ × aⁿ = aᵐ⁺ⁿ (on additionne les exposants).</li><li>aᵐ ÷ aⁿ = aᵐ⁻ⁿ (on soustrait).</li><li>(aᵐ)ⁿ = aᵐˣⁿ. a⁰ = 1.</li><li>10ⁿ : 1 suivi de n zéros. Nombres scientifiques : 3 × 10⁸.</li>',
      complet: '<h3>1. Définition</h3><p>5⁴ = 5 × 5 × 5 × 5 = 625. 5 est la base, 4 l\'exposant. Attention : 2³ ≠ 3² (8 ≠ 9).</p><h3>2. Produit de puissances</h3><p>Même base : on additionne les exposants. 2³ × 2⁵ = 2⁸. On ne multiplie PAS les exposants : 2³ × 2² = 2⁵, pas 2⁶.</p><h3>3. Quotient de puissances</h3><p>Même base : on soustrait. 7⁵ ÷ 7² = 7³.</p><h3>4. Puissance de puissance</h3><p>(3²)⁴ = 3⁸ : on multiplie les exposants.</p><h3>5. Exposants particuliers</h3><p>a⁰ = 1 pour tout a non nul. a¹ = a. a⁻ⁿ = 1/aⁿ (vu en 3e).</p><h3>6. Puissances de 10</h3><p>10³ = 1000, 10⁶ = un million. Écriture scientifique : distance Terre-Soleil ≈ 1,5 × 10⁸ km. La notation raccourcit l\'écriture des très grands et très petits nombres.</p>',
      quiz: [
        { q: '2³ × 2⁴ = ?', choix: ['2⁷', '2¹²', '8⁴'], bon: 0, exp: 'Même base : 3 + 4 = 7.' },
        { q: '5⁰ = ?', choix: ['1', '0', '5'], bon: 0, exp: 'Tout nombre non nul puissance 0 vaut 1.' },
        { q: '3² = ?', choix: ['9', '6', '8'], bon: 0, exp: '3 × 3 = 9.' },
        { q: '10⁵ = ?', choix: ['100 000', '10 000', '50'], bon: 0, exp: '1 suivi de 5 zéros.' },
        { q: '(2³)² = ?', choix: ['2⁶', '2⁵', '2⁹'], bon: 0, exp: 'On multiplie les exposants : 3 × 2 = 6.' }
      ],
      vf: [
        { q: '3² = 2³.', v: false, exp: '3² = 9 et 2³ = 8.' },
        { q: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ.', v: true, exp: 'On soustrait les exposants lors d\'une division de même base.' },
        { q: '2³ × 2² = 2⁶.', v: false, exp: 'On additionne : 2³ × 2² = 2⁵ = 32.' }
      ]
    },
    {
      id: 'm4-cosinus', mat: 'maths', niveau: '4e',
      titre: 'Cosinus et triangle rectangle',
      express: '<li>Dans un triangle rectangle, cos(angle aigu) = côté adjacent ÷ hypoténuse.</li><li>cos s\'écrit aussi « cos », sans exposant ².</li><li>cos 60° = 0,5 ; cos 0° = 1 ; cos 90° = 0.</li><li>Sert à calculer une longueur ou un angle dans un triangle rectangle.</li><li>À la calculatrice : touché cos (et cos⁻¹ pour l\'angle).</li>',
      complet: '<h3>1. Vocabulaire</h3><p>Dans un triangle ABC rectangle en A, pour l\'angle B : le côté adjacent est BA (il touche l\'angle B et n\'est pas l\'hypoténuse), l\'hypoténuse est BC.</p><h3>2. Formule</h3><p>cos B = BA / BC. Toujours « adjacent sur hypoténuse », jamais l\'inverse.</p><h3>3. Calculer un côté</h3><p>BC = 10 cm, angle B = 35°. BA = BC × cos 35° ≈ 10 × 0,819 ≈ 8,2 cm.</p><h3>4. Calculer un angle</h3><p>BA = 4, BC = 5. cos B = 4/5 = 0,8. B = cos⁻¹(0,8) ≈ 37°. On utilise la touche Arccos (ou cos⁻¹) de la calculatrice.</p><h3>5. Valeurs connues</h3><p>cos 0° = 1 ; cos 30° ≈ 0,866 ; cos 45° ≈ 0,707 ; cos 60° = 0,5 ; cos 90° = 0.</p><h3>6. Méthode de rédaction</h3><p>1) Nommer le triangle rectangle et l\'angle. 2) Écrire la formule. 3) Remplacer par les valeurs. 4) Conclure avec l\'arrondi demandé.</p>',
      quiz: [
        { q: 'cos(angle) = ?', choix: ['adjacent ÷ hypoténuse', 'hypoténuse ÷ adjacent', 'opposé ÷ adjacent'], bon: 0, exp: 'Côté adjacent divisé par hypoténuse.' },
        { q: 'cos 60° = ?', choix: ['0,5', '1', '0,866'], bon: 0, exp: 'cos 60° = 0,5 exactement.' },
        { q: 'Hypoténuse 8, angle 30°. Côté adjacent ≈', choix: ['6,9', '4', '9,2'], bon: 0, exp: '8 × cos 30° ≈ 8 × 0,866 ≈ 6,9.' },
        { q: 'Pour trouver l\'angle quand on connaît le cos, on utilise :', choix: ['cos⁻¹ (Arccos)', 'cos × 2', 'la racine carrée'], bon: 0, exp: 'La fonction réciproque Arccos redonne l\'angle.' },
        { q: 'cos 0° = ?', choix: ['1', '0', '0,5'], bon: 0, exp: 'À 0°, adjacent = hypoténuse donc cos = 1.' }
      ],
      vf: [
        { q: 'Le cosinus peut être plus grand que 1.', v: false, exp: 'Le cosinus est toujours entre 0 et 1 dans un triangle rectangle.' },
        { q: 'Le cosinus ne se définit que dans un triangle rectangle.', v: true, exp: 'Il faut un angle droit pour parler d\'hypoténuse.' },
        { q: 'cos 45° ≈ 0,707.', v: true, exp: 'C\'est environ 0,707 (= √2/2).' }
      ]
    },
    {
      id: 'm3-thales', mat: 'maths', niveau: '3e',
      titre: 'Théorème de Thalès',
      express: '<li>Deux droites sécantes coupées par des droites parallèles créent des triangles emboîtés.</li><li>AM/AB = AN/AC = MN/BC (les rapports sont égaux).</li><li>On l\'utilise pour calculer des longueurs.</li><li>Réciproque : si les rapports sont égaux, les droites sont parallèles.</li><li>Attention : on place les longueurs « petit triangle / grand triangle ».</li>',
      complet: '<h3>1. Configuration</h3><p>Deux triangles AMN et ABC : M sur [AB], N sur [AC], (MN) parallèle à (BC). A est le point commun.</p><h3>2. Le théorème</h3><p>Alors AM/AB = AN/AC = MN/BC. On écrit toujours les sommets dans le même ordre : petit sur grand.</p><h3>3. Calculer une longueur</h3><p>AM = 3, AB = 9, BC = 12, MN = ? AM/AB = MN/BC → 3/9 = MN/12 → MN = 12 × 3 ÷ 9 = 4.</p><h3>4. Vérifier un produit en croix</h3><p>Si AN = 5 et AC = 15, alors AN/AC = 1/3 : tous les rapports valent 1/3 (le petit triangle est un agrandissement ×3 du grand… ou l\'inverse : le grand est ×3 du petit).</p><h3>5. Réciproque</h3><p>Si AM/AB = AN/AC (avec les points bien placés), alors (MN) // (BC). Utile pour prouver un parallélisme.</p><h3>6. Pièges classiques</h3><p>Mélanger les côtés, oublier de vérifier que M et N sont sur les bons segments, ou utiliser le théorème sans les droites parallèles.</p>',
      quiz: [
        { q: 'AM = 2, AB = 6, BC = 9. MN = ?', choix: ['3', '4,5', '27'], bon: 0, exp: '2/6 = MN/9 → MN = 9 × 2 ÷ 6 = 3.' },
        { q: 'Si AM/AB = AN/AC, alors (MN) et (BC) sont :', choix: ['parallèles (réciproque)', 'perpendiculaires', 'sécantes'], bon: 0, exp: 'C\'est la réciproque du théorème de Thalès.' },
        { q: 'Thalès s\'applique quand :', choix: ['les droites (MN) et (BC) sont parallèles', 'le triangle est équilatéral', 'il y a un cercle'], bon: 0, exp: 'Le parallélisme est la condition clé.' },
        { q: 'Rapport si AM = 4 et AB = 12 :', choix: ['1/3', '3', '1/4'], bon: 0, exp: '4/12 = 1/3 : tous les rapports valent 1/3.' },
        { q: 'AN = 3, AC = 12, AM = 2. AB = ?', choix: ['8', '18', '6'], bon: 0, exp: 'Rapport 3/12 = 1/4, donc AB = 2 × 4 = 8.' }
      ],
      vf: [
        { q: 'Thalès permet de calculer un angle.', v: false, exp: 'Il permet de calculer des longueurs ; pour les angles, on utilise le cosinus.' },
        { q: 'On peut appliquer Thalès dans une configuration « papillon » (droites sécantes).', v: true, exp: 'Il existe deux configurations : triangle emboîté et papillon.' },
        { q: 'Dans Thalès, AM/AB = MN/BC = AN/AC.', v: true, exp: 'Les trois rapports de côtés correspondants sont égaux.' }
      ]
    },
    {
      id: 'm3-fonctions', mat: 'maths', niveau: '3e',
      titre: 'Fonctions et représentations',
      express: '<li>Une fonction f associe à chaque nombre x un unique nombre noté f(x).</li><li>f(x) se lit « image de x par f » ; x est l\'antécédent.</li><li>Représentation graphique : chaque point a pour coordonnées (x ; f(x)).</li><li>Fonction linéaire : f(x) = ax (droite passant par l\'origine).</li><li>Fonction affine : f(x) = ax + b (droite quelconque).</li>',
      complet: '<h3>1. Vocabulaire</h3><p>Si f(x) = 2x + 3, alors f(4) = 11 : l\'image de 4 est 11, et 4 est un antécédent de 11. Un nombre peut avoir plusieurs antécédents, mais une seule image.</p><h3>2. Calculs</h3><p>Calculer une image : on remplace x. Chercher un antécédent : on résout une équation. Antécédent de 9 par f(x) = 2x + 3 : 2x + 3 = 9 → x = 3.</p><h3>3. Tableau de valeurs</h3><p>On choisit des valeurs de x, on calcule f(x), puis on place les points (x ; f(x)) dans un repère.</p><h3>4. Fonction linéaire</h3><p>f(x) = 5x traduit la proportionnalité : sa droite passe par l\'origine. 5 est le coefficient directeur.</p><h3>5. Fonction affine</h3><p>f(x) = 2x + 3 : droite de coefficient 2, qui coupe l\'axe vertical en 3 (ordonnée à l\'origine).</p><h3>6. Lire un graphique</h3><p>Image : on part de x sur l\'axe horizontal, on monte jusqu\'à la courbe, on lit la hauteur. Antécédent : on part de la hauteur et on lit x.</p>',
      quiz: [
        { q: 'f(x) = 3x − 1. f(2) = ?', choix: ['5', '6', '4'], bon: 0, exp: '3 × 2 − 1 = 5.' },
        { q: 'Antécédent de 7 par f(x) = 2x + 1 :', choix: ['3', '7', '3,5'], bon: 0, exp: '2x + 1 = 7 → 2x = 6 → x = 3.' },
        { q: 'La représentation de f(x) = 4x est :', choix: ['une droite passant par l\'origine', 'une courbe en cloche', 'une droite coupant l\'axe en 4'], bon: 0, exp: 'Fonction linéaire : proportionnalité, droite par O.' },
        { q: 'Un nombre x a :', choix: ['une seule image', 'plusieurs images', 'aucune image'], bon: 0, exp: 'Par définition, f(x) est unique.' },
        { q: 'f(x) = 2x + 3. L\'ordonnée à l\'origine est :', choix: ['3', '2', '0'], bon: 0, exp: 'b = 3 : la droite coupe l\'axe vertical en 3.' }
      ],
      vf: [
        { q: 'Un nombre peut avoir plusieurs images par une même fonction.', v: false, exp: 'Chaque x a une image unique ; mais une valeur peut avoir plusieurs antécédents.' },
        { q: 'f(x) = ax est une fonction linéaire.', v: true, exp: 'Elle traduit une situation de proportionnalité.' },
        { q: 'Chercher un antécédent revient à résoudre une équation.', v: true, exp: 'On résout f(x) = valeur donnée.' }
      ]
    },
    {
      id: 'fr5-phrase', mat: 'francais', niveau: '5e',
      titre: 'Types et formes de phrases',
      express: '<li>4 types : déclaratif, interrogatif, impératif, exclamatif.</li><li>2 formes : affirmative et négative.</li><li>La négation : ne… pas, ne… jamais, ne… plus, ne… rien.</li><li>Une phrase exclamative exprime une émotion : « Quelle chance ! »</li><li>Le type ne change pas le sens de base, la forme le transforme.</li>',
      complet: '<h3>1. Types de phrases</h3><p>Déclaratif : donne une information (« Il pleut. »). Interrogatif : pose une question (« Où vas-tu ? »). Impératif : ordonne ou conseille (« Ferme la porte ! »). Exclamatif : exprime une émotion (« Quelle idée ! »).</p><h3>2. Formes</h3><p>Forme affirmative : « Tu manges. » Forme négative : « Tu ne manges pas. » Une phrase peut être négative et interrogative : « Ne viens-tu pas ? »</p><h3>3. La négation</h3><p>Deux marques : ne devant le verbe, pas/jamais/plus/rien/personne après. Au passé composé, « ne » entoure l\'auxiliaire : « Il n\'a pas compris. »</p><h3>4. Impératif</h3><p>Deux personnes : tu et vous (et nous). Pas de sujet exprimé : « Mangeons ! » Le sujet est sous-entendu.</p><h3>5. Transformer une phrase</h3><p>De déclaratif à interrogatif : « Tu viens. » → « Viens-tu ? » ou « Est-ce que tu viens ? » De affirmative à négative : ajouter ne… pas.</p><h3>6. Piège</h3><p>Ne pas confondre type exclamatif et ponctuation : une phrase avec un point d\'exclamation peut être déclarative (« Je suis content ! » reste déclarative avec émotion marquée).</p>',
      quiz: [
        { q: '« Range ta chambre ! » est une phrase :', choix: ['impérative', 'déclarative', 'interrogative'], bon: 0, exp: 'Ordre donné à la 2e personne, sans sujet exprimé.' },
        { q: '« Ne me parle plus jamais ! » est à la forme :', choix: ['négative', 'affirmative', 'exclamative'], bon: 0, exp: 'ne… plus jamais : double négation.' },
        { q: 'Combien de types de phrases existe-t-il ?', choix: ['4', '2', '3'], bon: 0, exp: 'Déclaratif, interrogatif, impératif, exclamatif.' },
        { q: '« Est-ce que tu viens ? » sert à :', choix: ['poser une question', 'donner un ordre', 's\'exclamer'], bon: 0, exp: 'Type interrogatif avec « est-ce que ».' },
        { q: 'Au passé composé, « ne » se place :', choix: ['devant l\'auxiliaire', 'après l\'auxiliaire', 'devant le sujet'], bon: 0, exp: '« Il n\'a pas compris » : ne + auxiliaire + pas.' }
      ],
      vf: [
        { q: 'Une phrase interrogative peut être négative.', v: true, exp: 'Exemple : « Ne viens-tu pas ce soir ? »' },
        { q: 'L\'impératif a toujours un sujet exprimé.', v: false, exp: 'Le sujet (tu, nous, vous) est sous-entendu.' },
        { q: '« Quelle belle journée ! » est une phrase exclamative.', v: true, exp: 'Elle exprime une émotion avec « Quelle… ! ».' }
      ]
    },
    {
      id: 'fr5-comparaison', mat: 'francais', niveau: '5e',
      titre: 'Comparaison et métaphore',
      express: '<li>Comparaison : elle utilise un outil de comparaison (comme, tel que, semblable à…).</li><li>« Il est rapide comme un éclair » = comparé + outil + comparant.</li><li>Métaphore : comparaison sans outil : « Cet homme est un éclair. »</li><li>Personnification : donner des traits humains : « Le vent murmure. »</li><li>Ces figures rendent le texte vivant et imagé.</li>',
      complet: '<h3>1. Reconnaître une comparaison</h3><p>Trois éléments : le comparé (il), l\'outil (comme), le comparant (un éclair). Si les trois sont là, c\'est une comparaison.</p><h3>2. Outils de comparaison</h3><p>comme, tel que, tel, semblable à, ressembler à, plus… que, aussi… que, moins… que.</p><h3>3. La métaphore</h3><p>Pas d\'outil de comparaison : « Une mer de nuages » (les nuages sont comparés à une mer sans le mot « comme »). La métaphore est plus suggestive.</p><h3>4. Personnification</h3><p>« Le soleil caresse la ville. » Le soleil reçoit une action humaine. Sert souvent en poésie.</p><h3>5. Pourquoi utiliser ces figures ?</h3><p>À l\'écrit : rendre une description vivante, faire imaginer au lecteur, créer une émotion.</p><h3>6. En rédaction</h3><p>Utiliser une image par paragraphe maximum : trop de figures noient le texte. Bien choisir le comparant : il doit être connu du lecteur.</p>',
      quiz: [
        { q: '« Doux comme un agneau » est une :', choix: ['comparaison', 'métaphore', 'personnification'], bon: 0, exp: 'Il y a l\'outil « comme ».' },
        { q: '« Cette femme est un roc » est une :', choix: ['métaphore', 'comparaison', 'exclamation'], bon: 0, exp: 'Pas d\'outil de comparaison : métaphore.' },
        { q: '« Le vent se mit à hurler » est une :', choix: ['personnification', 'comparaison', 'métaphore'], bon: 0, exp: 'Le vent fait une action humaine (hurler).' },
        { q: 'Quel est l\'outil dans « tel un lion » ?', choix: ['tel', 'lion', 'un'], bon: 0, exp: '« tel » sert d\'outil de comparaison.' },
        { q: 'Dans « rapide comme l\'éclair », « l\'éclair » est le :', choix: ['comparant', 'comparé', 'outil'], bon: 0, exp: 'C\'est l\'image à laquelle on compare.' }
      ],
      vf: [
        { q: 'Une métaphore contient toujours le mot « comme ».', v: false, exp: 'C\'est la comparaison qui utilise un outil ; la métaphore non.' },
        { q: 'La personnification donne des caractéristiques humaines à un objet.', v: true, exp: 'Exemple : « Les arbres se lamentent. »' },
        { q: '« Semblable à » est un outil de comparaison.', v: true, exp: 'Il introduit le comparant.' }
      ]
    },
    {
      id: 'fr4-subordonnees', mat: 'francais', niveau: '4e',
      titre: 'Les subordonnées relatives',
      express: '<li>Une subordonnée relative est introduite par un pronom relatif : qui, que, quoi, dont, où.</li><li>Elle complète un nom (l\'antécédent) : « Le livre que je lis ».</li><li>« qui » = sujet ; « que » = complément d\'objet.</li><li>« dont » remplace « de + nom » ; « où » indique le lieu ou le temps.</li><li>La subordonnée ne peut pas exister seule : elle dépend de la principale.</li>',
      complet: '<h3>1. Reconnaître</h3><p>« Le garçon qui court » : « qui court » donne une info sur « le garçon » (antécédent). La relative enrichit le nom.</p><h3>2. Choisir qui ou que</h3><p>Test : si on peut dire « sujet + verbe » après le pronom, c\'est qui (le garçon qui court → il court). Sinon c\'est que (le livre que je lis → je lis le livre).</p><h3>3. Dont</h3><p>Remplace un complément introduit par « de » : « le film dont je parle » (je parle du film).</p><h3>4. Où</h3><p>Lieu : « la ville où je suis né » ; temps : « le jour où tu es arrivé ».</p><h3>5. Pourquoi les utiliser ?</h3><p>Elles permettent d\'enrichir les phrases et d\'éviter des phrases courtes et répétitives : « J\'ai vu une maison. Elle était en ruine. » → « J\'ai vu une maison qui était en ruine. »</p><h3>6. Accords</h3><p>Le verbe de la relative s\'accorde avec l\'antécédent : « les fleurs qui fanent » (les fleurs fanent).</p>',
      quiz: [
        { q: '« La lettre ___ j\'ai reçue » :', choix: ['que', 'qui', 'dont'], bon: 0, exp: '« J\'ai reçu la lettre » : que est COD.' },
        { q: '« Le chien ___ aboie » :', choix: ['qui', 'que', 'où'], bon: 0, exp: '« Le chien aboie » : qui est sujet.' },
        { q: '« Le livre ___ tu m\'as parlé » :', choix: ['dont', 'que', 'qui'], bon: 0, exp: '« Parler de » → dont.' },
        { q: '« L\'année ___ nous nous sommes rencontrés » :', choix: ['où', 'dont', 'que'], bon: 0, exp: '« Où » indique aussi le temps.' },
        { q: 'Une subordonnée relative peut s\'utiliser :', choix: ['seule', 'comme phrase complète', 'avec une principale'], bon: 2, exp: 'Elle dépend toujours de la principale.' }
      ],
      vf: [
        { q: '« qui » est toujours sujet du verbe qui suit.', v: true, exp: 'Test : remplacer par le nom antécédent sujet.' },
        { q: '« dont » traduit un complément en « de ».', v: true, exp: 'Le film dont je parle = je parle du film.' },
        { q: '« La fille que chante » est correct.', v: false, exp: '« La fille chante » : c\'est le sujet, donc « qui chante ».' }
      ]
    },
    {
      id: 'fr4-moliere', mat: 'francais', niveau: '4e',
      titre: 'Le théâtre de Molière',
      express: '<li>Molière (1622-1673) : comédien et auteur français.</li><li>Ses pièces critiquent les défauts des hommes : avarice, hypocrisie, orgueil.</li><li>« L\'Avare » : Harpagon est obsédé par l\'argent.</li><li>« Le Malade imaginaire » : Argan se croit malade.</li><li>Comédie : registre comique (moquerie), mais avec une leçon sérieuse.</li>',
      complet: '<h3>1. Qui est Molière ?</h3><p>Jean-Baptiste Poquelin, dit Molière : comédien, directeur de troupe, auteur. Il écrit pour être joué, et joue lui-même ses rôles.</p><h3>2. Le but : corriger par le rire</h3><p>« Castigat ridendo mores » : il corrige les mœurs en riant. Chaque personnage incarne un défaut.</p><h3>3. Les grands types</h3><p>Harpagon (l\'Avare) : radin jusqu\'à l\'absurde. Tartuffe : hypocrite dévot. Argan (Malade imaginaire) : hypocondriaque. Monsieur Jourdain (Bourgeois gentilhomme) : veut paraître noble.</p><h3>4. Structures comiques</h3><p>Quiproquos, répétitions, apartés, valets plus malins que leurs maîtres, dénouements heureux.</p><h3>5. L\'intrigue type</h3><p>Un vieil homme s\'oppose au mariage des jeunes ; ruse des jeunes et des valets ; tout finit bien.</p><h3>6. Le comique au service du sérieux</h3><p>La comédie aborde des sujets graves : pouvoir de l\'argent, place des femmes, hypocrisie sociale. Molière s\'est fait des ennemis : Tartuffe fut interdit.</p>',
      quiz: [
        { q: 'Harpagon est le personnage principal de :', choix: ['L\'Avare', 'Le Malade imaginaire', 'Tartuffe'], bon: 0, exp: 'Harpagon incarne l\'avarice.' },
        { q: 'Le personnage de Tartuffe est :', choix: ['un hypocrite', 'un valet malin', 'un malade'], bon: 0, exp: 'Faux dévot qui trompe la famille d\'Orgon.' },
        { q: 'Molière visait à :', choix: ['corriger les mœurs par le rire', 'faire pleurer', 'écrire des tragédies'], bon: 0, exp: '« Castigat ridendo mores ».' },
        { q: '« Le Malade imaginaire » met en scène :', choix: ['Argan, qui se croit malade', 'Harpagon, qui compte', 'Dom Juan, séducteur'], bon: 0, exp: 'Argan, hypocondriaque.' },
        { q: 'Dans les pièces de Molière, les valets sont souvent :', choix: ['plus rusés que leurs maîtres', 'muets', 'des nobles'], bon: 0, exp: 'Comme Scapin : ils conduisent l\'intrigue.' }
      ],
      vf: [
        { q: 'Molière écrivait des tragédies.', v: false, exp: 'Il est le maître de la comédie ; les tragédies sont plutôt Racine ou Corneille.' },
        { q: 'Molière était aussi comédien.', v: true, exp: 'Il jouait ses propres pièces avec sa troupe.' },
        { q: 'Tartuffe a été interdit un temps.', v: true, exp: 'La critique de l\'hypocrisie dévote a dérangé.' }
      ]
    },
    {
      id: 'fr3-figstyle', mat: 'francais', niveau: '3e',
      titre: 'Figures de style (niveau lycée)',
      express: '<li>Comparaison : avec « comme ». Métaphore : sans outil. Personnification : traits humains.</li><li>Hyperbole : exagération (« mourir de rire »).</li><li>Anaphore : répétition en début de phrase (« Moi, président… »).</li><li>Oxymore : alliance de mots contradictoires (« une obscure clarté »).</li><li>Antithèse : opposition dans une même phrase.</li>',
      complet: '<h3>1. Images</h3><p>Comparaison, métaphore, personnification : elles font voir autrement. « Cette foule est un océan » (métaphore).</p><h3>2. Intensité</h3><p>Hyperbole (exagération), litote (dire moins pour suggérer plus : « Ce n\'est pas mauvais » pour « c\'est excellent »), euphémisme (atténuer : « il nous a quittés »).</p><h3>3. Répétitions</h3><p>Anaphore : « Rome. L\'unique objet de mon ressentiment ! » (Racine). Gradation : intensité croissante (« va, cours, vole »).</p><h3>4. Oppositions</h3><p>Antithèse : « Et monté sur le faîte, il aspire à descendre » ; oxymore : « un silence assourdissant », « cette obscure clarté » (Corneille).</p><h3>5. Effets produits</h3><p>Émouvoir, frapper l\'esprit, rythmer un texte, faire réfléchir. Toujours se demander : pourquoi l\'auteur a-t-il choisi cette figure ici ?</p><h3>6. Méthode au brevet</h3><p>Citer la figure, la nommer, expliquer l\'effet produit sur le lecteur. Trois étapes = points assurés.</p>',
      quiz: [
        { q: '« Mourir de rire » est une :', choix: ['hyperbole', 'litote', 'métaphore'], bon: 0, exp: 'Exagération classique.' },
        { q: '« Va, cours, vole ! » est une :', choix: ['gradation', 'anaphore', 'oxymore'], bon: 0, exp: 'Intensité croissante de la vitesse.' },
        { q: '« Un silence assourdissant » est un :', choix: ['oxymore', 'euphémisme', 'comparaison'], bon: 0, exp: 'Deux mots contradictoires alliés.' },
        { q: '« Ce n\'est pas mauvais » (pour « excellent ») est une :', choix: ['litote', 'hyperbole', 'anaphore'], bon: 0, exp: 'On dit moins pour suggérer plus.' },
        { q: 'La répétition en début de vers s\'appelle :', choix: ['anaphore', 'antithèse', 'métaphore'], bon: 0, exp: '« Moi, je… Moi, je… » : anaphore.' }
      ],
      vf: [
        { q: 'La litote dit plus qu\'elle ne le laisse entendre.', v: true, exp: 'Elle suggère plus que ce qu\'elle dit.' },
        { q: 'Une métaphore contient le mot « comme ».', v: false, exp: 'C\'est la comparaison ; la métaphore n\'a pas d\'outil.' },
        { q: 'L\'oxymore allie deux mots de sens contraires.', v: true, exp: 'Exemple : « obscure clarté ».' }
      ]
    },
    {
      id: 'fr3-grammaire', mat: 'francais', niveau: '3e',
      titre: 'Voix passive et subordonnées',
      express: '<li>Passif : sujet subit l\'action : « Le chat est nourri par Léa. »</li><li>Transformation : COD devient sujet du passif.</li><li>Question indirecte : « Je me demande si tu viens. »</li><li>Proposition subordonnée conjonctive : que, si, quand, parce que…</li><li>Discours direct → indirect : « Je viens » → il dit qu\'il vient.</li>',
      complet: '<h3>1. Actif → passif</h3><p>Actif : « Léa nourrit le chat. » Passif : « Le chat est nourri par Léa. » Le COD (le chat) devient sujet ; le sujet devient complément d\'agent (par Léa).</p><h3>2. Conjugaison du passif</h3><p>Auxiliaire être + participe passé, accordé avec le sujet : « Les chatons sont nourris. » Temps : ceux de l\'actif (est nourri, a été nourri, sera nourri…).</p><h3>3. Phrase interrogative indirecte</h3><p>« Viens-tu ? » → « Je me demande si tu viens. » Les mots interrogatifs restent : où, quand, pourquoi, ce que.</p><h3>4. Subordonnées conjonctives</h3><p>Introduites par que, si, quand, lorsque, parce que, bien que… : « Bien qu\'il pleuve, il sort. » Elles enrichissent la phrase.</p><h3>5. Discours indirect</h3><p>Changements : je → il/elle, présent → imparfait, hier → la veille. « Je pars demain » → « Il a dit qu\'il partait le lendemain. »</p><h3>6. Au brevet</h3><p>Savoir transformer une phrase de l\'actif au passif et inversement, et reconnaître la nature des propositions.</p>',
      quiz: [
        { q: 'Passif de « Le maître corrige les copies » :', choix: ['Les copies sont corrigées par le maître', 'Le maître est corrigé', 'Les copies corrigent'], bon: 0, exp: 'COD → sujet ; accord du participe : corrigées.' },
        { q: 'Dans le passif, l\'auxiliaire est :', choix: ['être', 'avoir', 'faire'], bon: 0, exp: 'Être + participe passé (accordé).' },
        { q: '« Je me demande si tu viens » contient :', choix: ['une interrogation indirecte', 'un passif', 'une anaphore'], bon: 0, exp: 'La question est rapportée sans inversion.' },
        { q: '« Bien qu\'il pleuve » exprime :', choix: ['une concession', 'une cause', 'un but'], bon: 0, exp: 'Bien que = opposition/concession.' },
        { q: 'Au discours indirect, « demain » devient :', choix: ['le lendemain', 'hier', 'aujourd\'hui'], bon: 0, exp: 'Les repères temporels changent de point de vue.' }
      ],
      vf: [
        { q: 'Au passif, le participe passé s\'accorde avec le sujet.', v: true, exp: '« Les copies sont corrigées » : accord avec copies.' },
        { q: 'Le complément d\'agent est introduit par « par » ou « de ».', v: true, exp: '« connu de tous ».' },
        { q: 'On ne peut mettre au passif que les verbes avec COD.', v: true, exp: 'Sans COD, pas de transformation possible.' }
      ]
    },
    {
      id: 'ang5-questions', mat: 'anglais', niveau: '5e',
      titre: 'Poser des questions (do/does, wh-words)',
      express: '<li>Questions fermées : Do you… ? / Does he… ? (auxiliaire do/does + sujet + verbe).</li><li>Questions ouvertes : mot interrogatif + do/does + sujet + verbe.</li><li>Wh-words : what, where, when, who, why, how.</li><li>Réponse courte : Yes, I do. / No, she doesn\'t.</li><li>Avec be, pas de do : « Where are you ? »</li>',
      complet: '<h3>1. Questions fermées</h3><p>Do you like pizza ? — Yes, I do. / No, I don\'t. À la 3e personne : Does she play tennis ? — Yes, she does.</p><h3>2. Structure</h3><p>Auxiliaire (Do/Does) + sujet + verbe en base verbale : Does he works ? NON → Does he work ? Après do/does, le verbe ne prend jamais de -s.</p><h3>3. Questions ouvertes</h3><p>What do you eat ? Where does she live ? When do they arrive ? Why do you cry ? How do you go to school ?</p><h3>4. Avec le verbe be</h3><p>Pas d\'auxiliaire do : Are you tired ? Where is the station ? Who is she ?</p><h3>5. Who en sujet</h3><p>Who plays football ? (sans do !) : who est déjà le sujet.</p><h3>6. Erreurs classiques</h3><p>Oublier l\'auxiliaire (Where you live ?), garder le -s (Does he likes ?), utiliser do avec be (Do you are happy ?).</p>',
      quiz: [
        { q: 'Choisis la forme correcte :', choix: ['Does she like music ?', 'Does she likes music ?', 'Do she like music ?'], bon: 0, exp: 'Does + base verbale : like.' },
        { q: '« ___ do you live ? » — In Paris.', choix: ['Where', 'What', 'When'], bon: 0, exp: 'La réponse est un lieu → Where.' },
        { q: '« Why are you sad ? » :', choix: ['correct, be n\'utilise pas do', 'incorrect', 'il faut do'], bon: 0, exp: 'Avec be : Why do you sad ? est faux.' },
        { q: 'Réponse courte à « Do you swim ? »', choix: ['Yes, I do.', 'Yes, I swim do.', 'Yes, I does.'], bon: 0, exp: 'Yes, I do. / No, I don\'t.' },
        { q: '« ___ plays the guitar ? » — Tom.', choix: ['Who', 'What', 'Do'], bon: 0, exp: 'Who sujet : pas d\'auxiliaire do.' }
      ],
      vf: [
        { q: 'Après « does », le verbe reste à la base verbale.', v: true, exp: 'Does he work ? (pas works).' },
        { q: 'On utilise « do » avec le verbe be.', v: false, exp: 'Be forme ses questions seul : Are you… ?' },
        { q: '« How » sert à demander la manière.', v: true, exp: 'How do you go to school ? — By bus.' }
      ]
    },
    {
      id: 'ang5-lexique', mat: 'anglais', niveau: '5e',
      titre: 'Vocabulaire : school & daily life',
      express: '<li>School : school, classroom, teacher, homework, breaktime.</li><li>Time : always, usually, often, sometimes, never.</li><li>Mots transparents (cognates) : important, music, sport, restaurant.</li><li>Faux amis : actually (= en fait, pas « actuellement »), library (= bibliothèque, pas librairie).</li><li>Toujours apprendre le mot dans sa phrase.</li>',
      complet: '<h3>1. L\'école</h3><p>school (école), classroom (salle de classe), timetable (emploi du temps), subject (matière), homework (devoirs — toujours au pluriel en français, singulier en anglais !).</p><h3>2. La journée</h3><p>get up (se lever), have breakfast, go to school, have lunch, do my homework, go to bed. Apprendre ces verbes avec les prépositions.</p><h3>3. Fréquence</h3><p>always (toujours), usually (d\'habitude), often (souvent), sometimes (parfois), never (jamais). Place : avant le verbe, après be : « I am always late. »</p><h3>4. Cognats et faux amis</h3><p>Cognats : music, sport, animal. Faux amis : actually (en fait), library (bibliothèque), to attend (assister à = aller à, pas « assister »).</p><h3>5. Méthode</h3><p>Réviser 10 mots par jour en contexte, avec flashcards ou quiz. Dire les phrases à voix haute.</p><h3>6. Erreurs</h3><p>Attention aux mots qui se ressemblent : library (bibliothèque) / bookshop (librairie). Rester vigilant avec les faux amis.</p>',
      quiz: [
        { q: '« library » signifie :', choix: ['bibliothèque', 'librairie', 'lecteur'], bon: 0, exp: 'La librairie se dit « bookshop ».' },
        { q: '« actually » signifie :', choix: ['en fait', 'actuellement', 'réellement'], bon: 0, exp: '« Currently » = actuellement.' },
        { q: '« homework » :', choix: ['les devoirs', 'le travail à la maison en général', 'la maison'], bon: 0, exp: 'On dit « do my homework ».' },
        { q: 'Place de « never » :', choix: ['avant le verbe', 'après le verbe', 'en début de phrase'], bon: 0, exp: 'I never eat meat. Mais : I am never late.' },
        { q: '« get up » signifie :', choix: ['se lever', 'se coucher', 'monter'], bon: 0, exp: 'Se lever le matin.' }
      ],
      vf: [
        { q: '« to attend » signifie « assister à ».', v: false, exp: 'C\'est un faux ami : attend = assister à (un cours), pas « attendre ».' },
        { q: '« sometimes » veut dire « parfois ».', v: true, exp: 'Fréquence moyenne.' },
        { q: 'On dit « do my homework » et pas « make my homework ».', v: true, exp: 'Do one\'s homework est la collocation correcte.' }
      ]
    },
    {
      id: 'ang4-comparatif', mat: 'anglais', niveau: '4e',
      titre: 'Comparatif et superlatif',
      express: '<li>Court : -er than… / the -est. tall → taller → the tallest.</li><li>Long : more… than / the most… : more beautiful.</li><li>Irréguliers : good → better → the best ; bad → worse → the worst.</li><li>Égalité : as… as. Infériorité : less… than.</li><li>Than = que (comparatif), the = le/la (superlatif).</li>',
      complet: '<h3>1. Adjectifs courts</h3><p>1 syllabe : + er / + est. tall → taller than → the tallest. Finale -e : nice → nicer. CVC : big → bigger (on double la consonne).</p><h3>2. Adjectifs longs</h3><p>2 syllabes et plus (ou finissant en -ful, -ing, -ous…) : more + adjectif, the most + adjectif. beautiful → more beautiful than → the most beautiful.</p><h3>3. Irréguliers à connaître</h3><p>good → better → the best ; bad → worse → the worst ; far → further → the furthest.</p><h3>4. Comparer des quantités</h3><p>more money than, less water than, as many books as (comptables), as much water as (indénombrables).</p><h3>5. Égalité et infériorité</h3><p>as tall as (aussi grand que) ; less interesting than (moins intéressant que).</p><h3>6. Phrase modèle</h3><p>Mount Everest is the highest mountain in the world. Paris is bigger than Lyon. My brother is as tall as my father.</p>',
      quiz: [
        { q: 'Comparatif de « good » :', choix: ['better', 'gooder', 'more good'], bon: 0, exp: 'Irrégulier : good → better → the best.' },
        { q: '« the most beautiful » est un :', choix: ['superlatif', 'comparatif', 'présent'], bon: 0, exp: 'The most = superlatif d\'un adjectif long.' },
        { q: 'Complete : « My car is ___ than yours. »', choix: ['faster', 'more fast', 'fast than'], bon: 0, exp: 'Adjectif court : faster than.' },
        { q: '« as tall as » exprime :', choix: ['l\'égalité', 'la supériorité', 'la négation'], bon: 0, exp: 'aussi grand que.' },
        { q: 'Superlatif de « big » :', choix: ['the biggest', 'the bigest', 'the most big'], bon: 0, exp: 'On double le g : big → bigger → the biggest.' }
      ],
      vf: [
        { q: '« worse » est le comparatif de « bad ».', v: true, exp: 'bad → worse → the worst.' },
        { q: 'On dit « more taller than ».', v: false, exp: 'On ne cumule pas : taller than OU more tall (incorrect ici).' },
        { q: '« Than » introduit le second terme de la comparaison.', v: true, exp: 'Er/more… than.' }
      ]
    },
    {
      id: 'ang4-futur', mat: 'anglais', niveau: '4e',
      titre: 'Exprimer le futur (will / be going to)',
      express: '<li>will + base verbale : prédiction, décision spontanée, promesse.</li><li>be going to + base verbale : projet, intention, prédiction fondée sur un indice visible.</li><li>Négation : won\'t (will not), isn\'t going to.</li><li>Question : Will you come ? / Are you going to come ?</li><li>Present continuous peut aussi exprimer un rendez-vous fixé : « I\'m meeting Tom tomorrow. »</li>',
      complet: '<h3>1. Will</h3><p>Prédiction sans preuve : It will rain tomorrow. Décision prise sur le moment : I\'ll help you ! Promesse : I will always love you. En résumé : futur « instantané ».</p><h3>2. Be going to</h3><p>Projet réfléchi : I\'m going to visit London next summer. Prédiction avec indice visible : Look at those clouds — it\'s going to rain !</p><h3>3. Formes</h3><p>Affirmatif : I\'ll go / I\'m going to go. Négatif : I won\'t go / I\'m not going to go. Interrogatif : Will you go ? / Are you going to go ?</p><h3>4. Rendez-vous arrangés</h3><p>Present continuous pour un agenda : We\'re flying to Rome on Monday (billets pris).</p><h3>5. Choix du futur</h3><p>Spontané ou promesse → will. Projet ou intention → be going to. Rendez-vous fixé → présent continuous.</p><h3>6. Marqueurs de temps</h3><p>tomorrow, next week, in 2050, soon, later. Ils accompagnent souvent le futur.</p>',
      quiz: [
        { q: 'Décision immédiate : « The phone is ringing — I ___ answer ! »', choix: ['\'ll', '\'m going to', 'answering'], bon: 0, exp: 'Décision spontanée → will (I\'ll).' },
        { q: 'Projet d\'été réfléchi :', choix: ['I\'m going to travel to Spain.', 'I travel to Spain.', 'I will travel spontaneously.'], bon: 0, exp: 'Intention → be going to.' },
        { q: 'Négation de will :', choix: ['won\'t', 'willn\'t', 'don\'t will'], bon: 0, exp: 'will not → won\'t.' },
        { q: '« Look at the sky — it ___ rain. »', choix: ['\'s going to', 'will', 'rains'], bon: 0, exp: 'Indice visible → be going to.' },
        { q: 'Rendez-vous fixé (billets pris) :', choix: ['We\'re flying to Rome tomorrow.', 'We fly Rome.', 'We will flew.'], bon: 0, exp: 'Present continuous pour l\'agenda.' }
      ],
      vf: [
        { q: '« Won\'t » est la contraction de « will not ».', v: true, exp: 'I won\'t come = I will not come.' },
        { q: '« Be going to » exprime une décision prise à l\'instant.', v: false, exp: 'C\'est will ; be going to = projet/intention.' },
        { q: '« Next week » est un marqueur de futur.', v: true, exp: 'Comme tomorrow, soon, in 2050.' }
      ]
    },
    {
      id: 'ang3-passif', mat: 'anglais', niveau: '3e',
      titre: 'La voix passive',
      express: '<li>Passif : be + participe passé : « The letter was written. »</li><li>Le COD de l\'actif devient sujet du passif.</li><li>Le sujet devient complément d\'agent : by + nom (souvent omis).</li><li>Le temps est porté par « be » : is written, was written, will be written.</li><li>Sert quand l\'action compte plus que l\'auteur.</li>',
      complet: '<h3>1. Formation</h3><p>Actif : Shakespeare wrote Hamlet. Passif : Hamlet was written by Shakespeare. Structure : be (au temps voulu) + participe passé.</p><h3>2. Aux temps usuels</h3><p>Present: is/are written. Past: was/were written. Future: will be written. Present perfect: has been written.</p><h3>3. Le complément d\'agent</h3><p>By + agent si important (by Shakespeare). Sinon omis : My bike has been stolen (on ignore par qui).</p><h3>4. Quand l\'utiliser ?</h3><p>Quand on ignore l\'auteur, quand il est évident, ou quand on veut détacher l\'action : « The school was built in 1900. »</p><h3>5. Verbes à deux objets</h3><p>He gave me a book → I was given a book / A book was given to me.</p><h3>6. Pièges</h3><p>Ne pas oublier « be » : The letter written yesterday est fautif → The letter was written yesterday. Accord du participe : jamais, il est invariable en anglais.</p>',
      quiz: [
        { q: 'Passif de « They clean the room every day » :', choix: ['The room is cleaned every day.', 'The room was clean.', 'The room cleaned.'], bon: 0, exp: 'Present simple passif : is cleaned.' },
        { q: '« The tower ___ built in 1889. »', choix: ['was', 'is', 'were'], bon: 0, exp: 'Passé → was built (sujet singulier).' },
        { q: 'Le complément d\'agent s\'introduit avec :', choix: ['by', 'with of', 'from'], bon: 0, exp: 'by Shakespeare.' },
        { q: 'Futur passif : « The results ___ announced tomorrow. »', choix: ['will be', 'will been', 'are will'], bon: 0, exp: 'will + be + participe passé.' },
        { q: 'On emploie le passif quand :', choix: ['l\'auteur est inconnu ou peu important', 'on veut parler de l\'avenir', 'le verbe est irrégulier'], bon: 0, exp: 'Exemple : My car was stolen.' }
      ],
      vf: [
        { q: 'Au passif anglais, le participe passé s\'accorde en nombre.', v: false, exp: 'Il est invariable : is written / are written.' },
        { q: 'Le passif se forme avec « be » + participe passé.', v: true, exp: 'À tous les temps : be porte le temps.' },
        { q: 'Le complément d\'agent est toujours obligatoire.', v: false, exp: 'On l\'omet souvent, surtout si l\'agent est inconnu.' }
      ]
    },
    {
      id: 'ang3-modaux', mat: 'anglais', niveau: '3e',
      titre: 'Les modaux (can, must, should…)',
      express: '<li>can/could : capacité, permission. must : obligation forte. have to : obligation externe.</li><li>should : conseil. might : possibilité faible. mustn\'t = interdiction !</li><li>Modal + base verbale, jamais de « to » ni de -s : he can swim.</li><li>Pas d\'auxiliaire do avec les modaux : Must I go ? (pas Do must I…).</li><li>don\'t have to = pas obligatoire ; mustn\'t = interdit.</li>',
      complet: '<h3>1. Capacité et permission</h3><p>can : I can swim (capacité), Can I go out ? (permission). could : passé ou demande polie : Could you help me ?</p><h3>2. Obligation</h3><p>must : obligation venant du locuteur : You must wear a seatbelt. have to : règle externe : I have to wear a uniform. mustn\'t : interdiction absolue : You mustn\'t smoke here.</p><h3>3. Absence d\'obligation</h3><p>don\'t have to : You don\'t have to come (pas nécessaire). À ne pas confondre avec mustn\'t (interdit) !</p><h3>4. Conseil et suggestion</h3><p>should / shouldn\'t : You should revise for the test. You shouldn\'t eat so fast.</p><h3>5. Possibilité</h3><p>might / may : It might rain (peut-être). can\'t : déduction négative : He can\'t be at home, his car is gone.</p><h3>6. Règles de forme</h3><p>Modal + base verbale (pas de to, pas de -s à la 3e personne) : She must go (jamais musts ou must to go). Négation directe : can\'t, mustn\'t, shouldn\'t.</p>',
      quiz: [
        { q: '« You ___ smoke at school. » (interdiction)', choix: ['mustn\'t', 'don\'t have to', 'should'], bon: 0, exp: 'mustn\'t = c\'est interdit.' },
        { q: '« It ___ rain tomorrow. » (petite chance)', choix: ['might', 'must', 'can'], bon: 0, exp: 'might exprime une possibilité faible.' },
        { q: 'Conseil à un ami malade :', choix: ['You should see a doctor.', 'You must see a doctor yesterday.', 'You can doctor.'], bon: 0, exp: 'should = conseil.' },
        { q: '« He can ___ fast. »', choix: ['run', 'to run', 'runs'], bon: 0, exp: 'Après un modal : base verbale.' },
        { q: '« ___ I open the window ? » (demande polie)', choix: ['Could', 'Must', 'Might'], bon: 0, exp: 'Could you… / Could I… : demande polie.' }
      ],
      vf: [
        { q: '« don\'t have to » signifie « c\'est interdit ».', v: false, exp: 'C\'est « pas nécessaire » ; l\'interdiction est mustn\'t.' },
        { q: 'Les modaux prennent un -s à la 3e personne.', v: false, exp: 'She can, he must : jamais de -s.' },
        { q: '« Should » sert à donner un conseil.', v: true, exp: 'You should rest.' }
      ]
    },
    {
      id: 'h5-grece', mat: 'histoire', niveau: '5e',
      titre: 'La Grèce antique',
      express: '<li>Grèce antique : vers 800-146 av. J.-C., terre de cités indépendantes.</li><li>Une cité = une ville + sa campagne : Athènes, Sparte, Corinthe.</li><li>Citoyen à Athènes : homme libre, né de parents athéniens, majeur. Femmes et esclaves exclus.</li><li>Démocratie athénienne : Ecclésia (assemblée), tirage au sort, Périclès (Ve siècle).</li><li>Guerres médiques : Grecs contre Perses (Marathon 490, Salamine 480).</li>',
      complet: '<h3>1. Le monde des cités</h3><p>Relief montagneux : les Grecs s\'installent en cités indépendantes, souvent rivales. La mer (Méditerranée) permet le commerce et la colonisation (Marseille, Syracuse).</p><h3>2. Athènes au Ve siècle</h3><p>Après les guerres médiques contre l\'Empire perse, Athènes domine. Périclès renforce la démocratie : l\'Ecclésia (assemblée des citoyens) vote les lois, les magistrats sont tirés au sort, les juges sont payés (misthos).</p><h3>3. Être citoyen</h3><p>Seuls une minorité : ni femmes, ni esclaves, ni métèques (étrangers). Environ 40 000 citoyens pour 300 000 habitants.</p><h3>4. Culture et fêtes</h3><p>Jeux olympiques (776 av. J.-C., en l\'honneur de Zeus), théâtre (tragédies d\'Eschyle, comédies d\'Aristophane), philosophie (Socrate, Platon). La religion est polythéiste : Zeus, Athéna, Poséidon.</p><h3>5. Alexandre et l\'hellénisme</h3><p>Au IVe siècle, Philippe de Macédoine puis son fils Alexandre le Grand conquièrent un immense empire : la culture grecque se diffuse (hellénisme), d\'Égypte jusqu\'en Inde.</p><h3>6. Héritage</h3><p>La démocratie, le théâtre, les Jeux olympiques, la philosophie et les sciences grecques fondent une part de notre culture.</p>',
      quiz: [
        { q: 'La démocratie athénienne repose sur :', choix: ['l\'assemblée des citoyens (Ecclésia)', 'le roi de Perse', 'les prêtres'], bon: 0, exp: 'Les citoyens votent les lois directement.' },
        { q: 'Les guerres médiques opposent :', choix: ['les Grecs aux Perses', 'Athènes à Sparte', 'les Grecs aux Romains'], bon: 0, exp: 'Marathon (490) et Salamine (480) : victoires grecques.' },
        { q: 'Alexandre le Grand était :', choix: ['macédonien', 'athénien', 'perse'], bon: 0, exp: 'Fils de Philippe II de Macédoine.' },
        { q: 'Qui pouvait être citoyen à Athènes ?', choix: ['Un homme libre né de parents athéniens', 'Tous les habitants', 'Les esclaves'], bon: 0, exp: 'Femmes, esclaves et métèques étaient exclus.' },
        { q: 'Les Jeux olympiques étaient dédiés à :', choix: ['Zeus', 'Alexandre', 'Athéna'], bon: 0, exp: 'Fête religieuse à Olympie.' }
      ],
      vf: [
        { q: 'Les femmes athéniennes étaient citoyennes.', v: false, exp: 'Elles étaient exclues de la citoyenneté.' },
        { q: 'Les cités grecques étaient unies en un seul empire.', v: false, exp: 'Chaque cité était indépendante, souvent rivale.' },
        { q: 'Les magistrats athéniens étaient souvent tirés au sort.', v: true, exp: 'Le tirage au sort évitait la prise de pouvoir par les riches.' }
      ]
    },
    {
      id: 'h5-rome', mat: 'histoire', niveau: '5e',
      titre: 'Rome : de la République à l\'Empire',
      express: '<li>Rome fondée (légende) en 753 av. J.-C. ; République en 509 av. J.-C.</li><li>République : le pouvoir au Sénat et à deux consuls élus pour un an.</li><li>Julius César conquiert la Gaule (58-50 av. J.-C.), est assassiné en 44.</li><li>Octave devient Auguste, premier empereur, en 27 av. J.-C.</li><li>Pax Romana : paix et prospérité pendant deux siècles.</li>',
      complet: '<h3>1. La République romaine</h3><p>Après chasser les rois étrusques (509 av. J.-C.), Rome devient une République : pas de roi ! Le Sénat dirige, deux consuls commandent l\'armée pour un an, les tribuns protègent le peuple (plébéiens).</p><h3>2. L\'expansion</h3><p>Rome conquiert l\'Italie, puis Carthage (guerres puniques, Hannibal), la Grèce, la Gaule. « Tous les chemins mènent à Rome » : routes, aqueducs, arènes organisent l\'empire.</p><h3>3. César</h3><p>Général brillant, il conquiert la Gaule (Vercingétorix se rend à Alésia en 52 av. J.-C.) et prend le pouvoir. Assassiné aux Ides de mars en 44 av. J.-C.</p><h3>4. L\'Empire</h3><p>Octave-Auguste règne seul : débute l\'Empire (27 av. J.-C.). Suivent de bons empereurs (Trajan, Hadrien, Marc-Aurèle) : c\'est la Pax Romana, l\'apogée au IIe siècle.</p><h3>5. La société</h3><p>Citoyens, esclaves, affranchis. Le latin, le droit romain et l\'urbanisation (Rome : un million d\'habitants) marquent durablement l\'Europe.</p><h3>6. Héritage</h3><p>Langues latines (français !), droit, calendrier, architecture (aqueducs, voies, arènes, Panthéon).</p>',
      quiz: [
        { q: 'Vercingétorix se rend à :', choix: ['Alésia (52 av. J.-C.)', 'Rome', 'Marathon'], bon: 0, exp: 'César vainc les Gaules à Alésia.' },
        { q: 'Le premier empereur romain fut :', choix: ['Auguste (Octave)', 'Jules César', 'Néron'], bon: 0, exp: 'César est resté dictateur, jamais empereur.' },
        { q: 'La République romaine refuse :', choix: ['la royauté', 'l\'armée', 'les dieux'], bon: 0, exp: 'Les consuls élus remplacent le roi.' },
        { q: 'Les guerres puniques opposent Rome à :', choix: ['Carthage', 'la Grèce', 'les Gaulois'], bon: 0, exp: 'Trois guerres contre Carthage (Hannibal).' },
        { q: 'La Pax Romana, c\'est :', choix: ['une longue paix intérieure', 'une bataille', 'un dieu'], bon: 0, exp: 'Deux siècles de paix et de prospérité.' }
      ],
      vf: [
        { q: 'Jules César fut empereur de Rome.', v: false, exp: 'Il fut dictateur ; le premier empereur est Auguste.' },
        { q: 'Le français vient du latin.', v: true, exp: 'Langue romane, héritière du latin de Rome.' },
        { q: 'Les consuls de la République étaient élus pour un an.', v: true, exp: 'Renvoyés au Sénat ensuite : pas de pouvoir personnel durable.' }
      ]
    },
    {
      id: 'h4-decouvertes', mat: 'histoire', niveau: '4e',
      titre: 'Les grandes découvertes (XVe-XVIe)',
      express: '<li>Européens cherchent une route vers les épices : Asie contournée par mer.</li><li>1492 : Christophe Colomb atteint l\'Amérique ; 1498 : Vasco de Gama aux Indes ; 1522 : tour du monde de Magellan.</li><li>Motifs : richesses (or, épices), religion (évangélisation), gloire.</li><li>Conséquence tragique : conquêtes coloniales et effondrement des empires aztèque (Cortés, 1521) et inca (Pizarro, 1533).</li><li>Le verbe « découvrir » est européen : ces terres étaient habitées !</li>',
      complet: '<h3>1. Pourquoi partir ?</h3><p>La chute de Constantinople (1453) rend les routes de la soie coûteuses. Européens cherchent un accès direct aux épices. Nouvelles techniques : caravelle, boussole, astrolabe.</p><h3>2. Les grands voyages</h3><p>1488 : Dias double le cap de Bonne-Espérance. 1492 : Colomb traverse l\'Atlantique (il croit atteindre les Indes, d\'où « Indiens »). 1498 : de Gama atteint Calicut. 1519-1522 : expédition Magellan-Elcano, premier tour du monde.</p><h3>3. Les conquêtes</h3><p>Cortés s\'empare de l\'empire aztèque (Mexique, 1521) ; Pizarro de l\'empire inca (Pérou, 1533). Causes de la victoire : armes à feu, chevaux, alliés locaux, épidémies de variole.</p><h3>4. L\'échange colombien</h3><p>Plantes et animaux circulent entre les continents : maïs, pomme de terre et tomate arrivent en Europe ; cheval, blé et maladies arrivent en Amérique. Les épidémies tuent des millions d\'Amérindiens.</p><h3>5. Traite atlantique</h3><p>Le commerce triangulaire (Europe → Afrique → Amérique) déporte des millions d\'Africains réduits en esclavage pour les plantations : un crime contre l\'humanité.</p><h3>6. Recul critique</h3><p>« Découverte » est le point de vue européen. Pour les peuples amérindiens, c\'est une invasion. Les historiens parlent aussi de « rencontre » ou de conquête coloniale.</p>',
      quiz: [
        { q: 'En 1492, Colomb atteint :', choix: ['les Caraïbes (Amérique)', 'les Indes', 'l\'Afrique'], bon: 0, exp: 'Il croyait aux Indes, d\'où le nom « Indiens ».' },
        { q: 'Le premier tour du monde est achevé par :', choix: ['l\'expédition Magellan-Elcano (1522)', 'Christophe Colomb', 'Vasco de Gama'], bon: 0, exp: 'Magellan meurt en route ; Elcano rentre en 1522.' },
        { q: 'Cortés conquiert :', choix: ['l\'empire aztèque', 'l\'empire inca', 'le Japon'], bon: 0, exp: 'Mexico tombe en 1521 ; l\'Inca en 1533 (Pizarro).' },
        { q: 'Motif principal des voyages :', choix: ['les épices et l\'or', 'le tourisme', 'la science seule'], bon: 0, exp: 'Richesse, évangélisation et gloire.' },
        { q: 'La variole en Amérique :', choix: ['décime les Amérindiens', 'n\'a aucun effet', 'vient du maïs'], bon: 0, exp: 'Les épidémies sont une cause majeure de l\'effondrement des empires.' }
      ],
      vf: [
        { q: 'L\'Amérique était inhabitée avant 1492.', v: false, exp: 'Des civilisations puissantes y vivaient : Aztèques, Incas, etc.' },
        { q: 'Le commerce triangulaire concernait la traite des Africains.', v: true, exp: 'Europe → Afrique → Amérique : esclavage des plantations.' },
        { q: 'La pomme de terre vient d\'Amérique.', v: true, exp: 'Comme le maïs, la tomate, le cacao (échange colombien).' }
      ]
    },
    {
      id: 'h4-empire', mat: 'histoire', niveau: '4e',
      titre: 'Napoléon et l\'Empire (1804-1815)',
      express: '<li>1799 : coup d\'État de Bonaparte ; 1804 : empereur (Napoléon Ier).</li><li>Réformes durables : Code civil (1804), lycées, franc germinal, préfectures, légion d\'honneur.</li><li>Empire à son maximum en 1812 : presque toute l\'Europe.</li><li>1812 : désastre de la campagne de Russie ; 1815 : défaite de Waterloo.</li><li>Restauration : Louis XVIII, puis les 100 Jours et l\'exil à Sainte-Hélène.</li>',
      complet: '<h3>1. Du général à l\'empereur</h3><p>Jeune général brillant (Toulon, Italie), Bonaparte renverse le Directoire en 1799 (coup d\'État du 18 Brumaire). Consulat, puis Empire : couronnement le 2 décembre 1804 à Notre-Dame.</p><h3>2. Les réformes</h3><p>Code civil (égalité devant la loi — mais femme mariée mineure), lycées, Banque de France, franc, préfectures, Concordat avec l\'Église, Légion d\'honneur. Beaucoup survivent aujourd\'hui.</p><h3>3. L\'Europe napoléonienne</h3><p>Victoires d\'Austerlitz (1805), Iéna (1806) : l\'Empire domine l\'Europe. Mais la Grande Armée s\'enlise en Espagne (guérilla) et surtout en Russie (1812) : la retraite de l\'hiver tue des centaines de milliers de soldats.</p><h3>4. La chute</h3><p>1813 : défaite de Leipzig. Avril 1814 : abdication, exil à l\'île d\'Elbe. 1815 : les Cent-Jours, défaite finale à Waterloo (18 juin 1815), exil à Sainte-Hélène où il meurt en 1821.</p><h3>5. La mémoire</h3><p>Mythe napoléonien (légende), influence du Code civil dans le monde, mais aussi guerres meurtrières (2 à 3 millions de morts) et rétablissement de l\'esclavage en 1802.</p><h3>6. Bilan critique</h3><p>Modernisateur de la France, dictateur pour l\'Europe : les historiens débattent encore.</p>',
      quiz: [
        { q: 'Napoléon devient empereur en :', choix: ['1804', '1789', '1815'], bon: 0, exp: 'Couronnement du 2 décembre 1804.' },
        { q: 'Le Code civil date de :', choix: ['1804', '1799', '1812'], bon: 0, exp: '1804 : égalité devant la loi, réforme majeure.' },
        { q: 'La campagne qui brise l\'Empire :', choix: ['Russie (1812)', 'Égypte', 'Italie'], bon: 0, exp: 'La retraite de Russie anéantit la Grande Armée.' },
        { q: 'Défaite finale en :', choix: ['Waterloo (1815)', 'Austerlitz', 'Leipzig'], bon: 0, exp: '18 juin 1815, fin des Cent-Jours.' },
        { q: 'Les lycées créés par Napoléon existent :', choix: ['encore aujourd\'hui', 'plus du tout', 'seulement à Paris'], bon: 0, exp: 'Le système scolaire impérial a laissé le modèle actuel.' }
      ],
      vf: [
        { q: 'Napoléon a maintenu l\'esclavage dans les colonies.', v: true, exp: 'Rétabli en 1802 : tache grave de son règne.' },
        { q: 'Austerlitz (1805) est une grande victoire napoléonienne.', v: true, exp: 'Contre l\'Autriche et la Russie.' },
        { q: 'Napoléon est mort à l\'île d\'Elbe.', v: false, exp: 'Exil final à Sainte-Hélène (mort en 1821).' }
      ]
    },
    {
      id: 'h3-ww2', mat: 'histoire', niveau: '3e',
      titre: 'La Seconde Guerre mondiale',
      express: '<li>1939-1945 : guerre totale, ~50-60 millions de morts.</li><li>Axe (Allemagne, Italie, Japon) contre Alliés (Royaume-Uni, URSS, États-Unis, France libre).</li><li>1940 : défaite de la France, appel du 18 Juin (De Gaulle), régime de Vichy.</li><li>1941 : attaque de l\'URSS et Pearl Harbor — l\'Holocauste : génocide des Juifs (Shoah, 6 millions) et des Tsiganes.</li><li>1942-45 : Stalingrad, débarquages (Normandie 6 juin 1944), capitulations 1945.</li>',
      complet: '<h3>1. Les phases</h3><p>1939-42 : victoires de l\'Axe (Blitzkrieg, France en 6 semaines, l\'Europe occupée). 1942-45 : bascule — Stalingrad, Midway, Afrique du Nord ; les Alliés reconquièrent. 8 mai 1945 : capitulation allemande ; août 1945 : bombes d\'Hiroshima et Nagasaki.</p><h3>2. La France pendant la guerre</h3><p>Défaite de juin 1940 : Pétain signe l\'armistice, régime de Vichy (collaboration). De Gaulle lance la résistance depuis Londres (appel du 18 Juin 1940). Résistance intérieure, maquis, FFI.</p><h3>3. Guerre totale et civils</h3><p>La majorité des victimes sont civiles : bombardements, famines, déportations. Les femmes participent massivement (usines, résistance).</p><h3>4. Le génocide des Juifs et des Tsiganes</h3><p>Antisémitisme d\'État : lois de Vichy, ghettos, Einsatzgruppen, camps de la mort (Auschwitz-Birkenau). La « solution finale » tue 6 millions de Juifs et des centaines de milliers de Tsiganes : crime contre l\'humanité, jugé à Nuremberg (1945-46).</p><h3>5. La fin et l\'après-guerre</h3><p>Libération de la France (1944), ONU créée en 1945, procès de Nuremberg, Europe en ruines : c\'est le début de la reconstruction et de la guerre froide.</p><h3>6. Mémoire</h3><p>Devoir de mémoire : résistants, Justes (qui sauvèrent des Juifs), déportés. La Shoah est enseignée pour comprendre où mènent le racisme et les dictatures.</p>',
      quiz: [
        { q: 'L\'appel du 18 Juin 1940 est lancé par :', choix: ['De Gaulle depuis Londres', 'Pétain depuis Vichy', 'Roosevelt'], bon: 0, exp: 'Il appelle à continuer le combat.' },
        { q: 'Le débarquement de Normandie a lieu le :', choix: ['6 juin 1944', '8 mai 1945', '11 novembre 1943'], bon: 0, exp: 'Le « Jour J » ouvre le second front.' },
        { q: 'Le génocide des Juifs pendant la guerre s\'appelle :', choix: ['la Shoah', 'la Grande Peur', 'la Traite'], bon: 0, exp: 'Six millions de victimes.' },
        { q: 'Le régime de Vichy dirigé par Pétain :', choix: ['collabore avec l\'Allemagne', 'combat Hitler', 'est neutre'], bon: 0, exp: 'Collaboration d\'État, lois antisémites.' },
        { q: 'La première bombe atomique est lancée sur :', choix: ['Hiroshima (1945)', 'Berlin', 'Stalingrad'], bon: 0, exp: '6 août 1945, puis Nagasaki le 9.' }
      ],
      vf: [
        { q: 'La Seconde Guerre mondiale a fait plus de morts civils que militaires.', v: true, exp: 'Guerre totale : la majorité des victimes sont civiles.' },
        { q: 'Stalingrad est une victoire allemande.', v: false, exp: 'Défaite allemande (1943) : tournant de la guerre en Europe.' },
        { q: 'Les procès de Nuremberg ont jugé les dirigeants nazis.', v: true, exp: '1945-46 : naissance du crime contre l\'humanité.' }
      ]
    },
    {
      id: 'h3-guerrefroide', mat: 'histoire', niveau: '3e',
      titre: 'La guerre froide (1947-1991)',
      express: '<li>Affrontement indirect États-Unis (bloc de l\'Ouest) / URSS (bloc de l\'Est).</li><li>Deux doctrines : Truman (endiguement) et Jdanov ; deux alliances : OTAN (1949) / Pacte de Varsovie (1955).</li><li>Peur nucléaire : équilibre de la terreur, crises de Berlin et de Cuba (1962).</li><li>Guerres périphériques chaudes : Corée, Vietnam, Afghanistan.</li><li>1989 : chute du mur de Berlin ; 1991 : fin de l\'URSS.</li>',
      complet: '<h3>1. Un monde bipolaire</h3><p>Après 1945, deux superpuissances : modèle capitaliste démocratique (USA) contre modèle communiste (URSS). L\'Europe coupée par le rideau de fer.</p><h3>2. Endiguement et alliances</h3><p>Plan Marshall (1947) pour reconstruire l\'Ouest ; doctrine Truman contre l\'expansion du communisme. OTAN face au Pacte de Varsovie : jamais de guerre directe.</p><h3>3. Les grandes crises</h3><p>Blocus de Berlin (1948-49) : pont aérien allié. Mur de Berlin (1961). Crise de Cuba (1962) : le monde au bord de la guerre nucléaire, puis « détente ».</p><h3>4. Les conflits périphériques</h3><p>Corée (1950-53), Vietnam (guerre des USA jusqu\'en 1973), Afghanistan (URSS 1979-89) : les deux blocs s\'affrontent par alliés interposés.</p><h3>5. Propagande et compétition</h3><p>Course aux armements, conquête spatiale (Spoutnik 1957, Apollo 11 en 1969), cinéma et sport (boycotts olympiques) : chaque bloc veut prouver sa supériorité.</p><h3>6. La fin</h3><p>Gorbatchev (glasnost, perestroïka), épuisement soviétique, révolutions de 1989, chute du mur (9 novembre 1989), dissolution de l\'URSS (1991). L\'Allemagne réunifiée en 1990.</p>',
      quiz: [
        { q: 'La crise de Cuba (1962) oppose :', choix: ['les USA et l\'URSS', 'la France et l\'Allemagne', 'la Chine et le Japon'], bon: 0, exp: 'Missiles soviétiques à Cuba : le monde retient son souffle.' },
        { q: 'Le mur de Berlin tombe le :', choix: ['9 novembre 1989', '8 mai 1945', '11 septembre 2001'], bon: 0, exp: 'Symbole de la fin de la guerre froide.' },
        { q: 'L\'OTAN et le Pacte de Varsovie sont :', choix: ['deux alliances rivales', 'la même alliance', 'des entreprises'], bon: 0, exp: 'Ouest contre Est.' },
        { q: 'La conquête spatiale est :', choix: ['un terrain de compétition Est-Ouest', 'un projet commun dès 1950', 'sans enjeu'], bon: 0, exp: 'Spoutnik (URSS) puis Apollo 11 (USA).' },
        { q: 'L\'URSS disparaît en :', choix: ['1991', '1989', '2001'], bon: 0, exp: 'Dissolution officielle en décembre 1991.' }
      ],
      vf: [
        { q: 'USA et URSS se sont fait directement la guerre.', v: false, exp: 'Jamais de conflit armé direct : affrontement indirect.' },
        { q: 'Le plan Marshall visait à reconstruire l\'Europe de l\'Ouest.', v: true, exp: 'Aide américaine de 1947 contre l\'influence soviétique.' },
        { q: 'Gorbatchev a lancé la perestroïka et la glasnost.', v: true, exp: 'Réformes qui précipitent la fin du bloc de l\'Est.' }
      ]
    },
    {
      id: 'g5-population', mat: 'geo', niveau: '5e',
      titre: 'La population mondiale',
      express: '<li>8 milliards d\'humains (2022) : croissance très rapide au XXe siècle.</li><li>Répartition inégale : foyers de peuplement (Asie de l\'Est et du Sud) et déserts humains.</li><li>Facteurs naturels et humains de concentration : climats favorables, littoraux, villes, agriculture.</li><li>Transition démographique : la natalité baisse avec le développement.</li><li>Plus de la moitié de l\'humanité vit en ville.</li>',
      complet: '<h3>1. Une croissance rapide</h3><p>1 milliard vers 1800, 2 milliards en 1927, 8 milliards en 2022. La croissance ralentit mais continue surtout en Afrique.</p><h3>2. Foyers et vides</h3><p>Grands foyers : Asie de l\'Est (Chine), Asie du Sud (Inde), Europe, nord-est des USA. Vides : déserts (Sahara), forêts denses (Amazonie), hautes montagnes, zones froides.</p><h3>3. Pourquoi ces inégalités ?</h3><p>Climat, eau, relief, sols fertiles expliquent les concentrations anciennes. Les hommes ajoutent : villes, ports, industries, politiques d\'aménagement.</p><h3>4. La transition démographique</h3><p>Étape 1 : natalité et mortalité fortes. Étape 2 : la mortalité baisse → forte croissance. Étape 3 : la natalité baisse aussi → population stable et vieillissante (Europe, Japon). L\'Afrique est encore en pleine transition.</p><h3>5. Villes</h3><p>Mégapoles de plus de 10 millions : Tokyo, Delhi, Shanghai, São Paulo. En 2050, deux humains sur trois seront urbains.</p><h3>6. Lire une carte</h3><p>Croissance : les fortes croissances sont africaines ; les déclins (Japon, Allemagne) posent d\'autres problèmes (vieillissement).</p>',
      quiz: [
        { q: 'Le principal foyer de peuplement mondial :', choix: ['l\'Asie', 'l\'Amérique du Nord', 'l\'Europe'], bon: 0, exp: 'Chine et Inde à elles seules : plus d\'un tiers de l\'humanité.' },
        { q: 'Cap de la population mondiale en 2022 :', choix: ['8 milliards', '6 milliards', '10 milliards'], bon: 0, exp: '8 milliards atteints en novembre 2022.' },
        { q: 'La transition démographique s\'achève quand :', choix: ['natalité et mortalité sont basses', 'la mortalité remonte', 'les villes se vident'], bon: 0, exp: 'Régime moderne : croissance faible, population vieillissante.' },
        { q: 'Le Sahara est :', choix: ['un désert humain', 'un foyer de peuplement', 'une mégapole'], bon: 0, exp: 'Conditions naturelles défavorables.' },
        { q: 'En 2050, la population sera surtout :', choix: ['urbaine', 'rurale', 'nomade'], bon: 0, exp: 'Environ deux tiers de citadins.' }
      ],
      vf: [
        { q: 'La population mondiale double environ tous les 40 ans actuellement.', v: false, exp: 'La croissance ralentit : le doublement prend plus de temps.' },
        { q: 'Les littoraux attirent les populations.', v: true, exp: 'Ports, commerce, villes : les hommes se concentrent près des mers.' },
        { q: 'L\'Inde est plus peuplée que la Chine.', v: true, exp: 'Depuis 2023, l\'Inde est le pays le plus peuplé du monde.' }
      ]
    },
    {
      id: 'g5-littoraux', mat: 'geo', niveau: '5e',
      titre: 'Les littoraux, espaces attractifs',
      express: '<li>Un littoral = zone de contact terre/mer, très attractif.</li><li>Activités : ports, pêche, tourisme balnéaire, industries.</li><li>60 % de l\'humanité vit à moins de 100 km des côtes.</li><li>Aménagements : ports de commerce, stations balnéaires, digues.</li><li>Risques : érosion, submersion, pression sur les milieux.</li>',
      complet: '<h3>1. Pourquoi les côtes attirent</h3><p>La mer = transport (80 % du commerce mondial par voie d\'eau), ressources (pêche), loisirs (plages), climat agréable. Les hommes se concentrent sur les littoraux.</p><h3>2. Les ports</h3><p>Mega-ports asiatiques (Shanghai, Singapour), ports européens (Rotterdam). Containers, zones industrielles et logistiques.</p><h3>3. Le tourisme balnéaire</h3><p> Stations du Languedoc (La Grande-Motte), Côte d\'Azur, côtes espagnoles : aménagement complet du littoral, marinas, promenades.</p><h3>4. Conflits d\'usage</h3><p>Le même espace convoité par pêcheurs, touristes, industriels, habitants. Pression sur les milieux : mangroves détruites, côtes bétonnées.</p><h3>5. Risques littoraux</h3><p>Érosion des plages, submersion marine (tempêtes, montée des eaux liée au changement climatique). Solutions : digues, rechargement de sable, recul stratégique.</p><h3>6. Étude de cas : le Mont-Saint-Michel</h3><p>Tourisme massif et sédimentation : des aménagements restaurent le caractère insulaire. Exemple de gestion d\'un littoral patrimonial.</p>',
      quiz: [
        { q: 'Part du commerce mondial transportée par mer :', choix: ['environ 80 %', '20 %', '50 %'], bon: 0, exp: 'Le transport maritime domine le commerce mondial.' },
        { q: 'Un littoral est :', choix: ['une zone de contact terre/mer', 'une montagne', 'un désert'], bon: 0, exp: 'Espace de transition très convoité.' },
        { q: 'La Grande-Motte est :', choix: ['une station balnéaire aménagée', 'un port pétrolier', 'une île'], bon: 0, exp: 'Aménagement touristique du Languedoc-Roussillon.' },
        { q: 'Risque lié au changement climatique sur les côtes :', choix: ['submersion et érosion', 'volcans', 'sécheresse seule'], bon: 0, exp: 'Montée du niveau des mers, tempêtes accrues.' },
        { q: 'Part de l\'humanité vivant près des côtes :', choix: ['environ 60 %', '10 %', '95 %'], bon: 0, exp: 'À moins de 100 km d\'une côte.' }
      ],
      vf: [
        { q: 'Les littoraux concentrent population et activités.', v: true, exp: 'Ports, tourisme, industries : espaces attractifs.' },
        { q: 'L\'érosion des côtes est un phénomène purement naturel.', v: false, exp: 'Aménagements et changement climatique l\'aggravent.' },
        { q: 'Le tourisme balnéaire est une activité littorale majeure.', v: true, exp: 'Il transforme profondément les côtes.' }
      ]
    },
    {
      id: 'g4-oceans', mat: 'geo', niveau: '4e',
      titre: 'Les mers et les océans',
      express: '<li>Les océans couvrent 71 % de la planète : un enjeu mondial.</li><li>Routes maritimes stratégiques : détroits (Ormuz, Malacca), canaux (Suez, Panama).</li><li>Ressources : pêche, énergies fossiles et renouvelables en mer, minerais.</li><li>Pollution : plastiques, surpêche, destruction des milieux.</li><li>Zones économiques exclusives (ZEE) : chaque État côtier a des droits.</li>',
      complet: '<h3>1. Un espace stratégique</h3><p>La mondialisation transite par mer : porte-conteneurs, autoroutes de la mer. Chokepoints : détroit d\'Ormuz (pétrole), de Malacca, canal de Suez (12 % du commerce mondial).</p><h3>2. Les ZEE</h3><p>Convention de Montego Bay : chaque État peut exploiter une bande de 200 milles marins. La France possède la 2e ZEE du monde (outre-mer) : 11 millions de km².</p><h3>3. Les ressources</h3><p>Pêche (mais 30 % des stocks surexploités), hydrocarbures offshore, éoliennes en mer, aquaculture, minerai des grands fonds.</p><h3>4. Les menaces</h3><p>Plastiques (8 millions de tonnes rejetées/an), réchauffement et acidification, destruction des coraux et mangroves, surpêche, piraterie (golfe de Guinée).</p><h3>5. Protection</h3><p>Aires marines protégées (objectif 30 % en 2030), accords internationaux, développement durable des pêches.</p><h3>6. Enjeu géopolitique</h3><p>Revendications en mer de Chine méridionale, course aux ressources arctiques, bataille navale Inde-Pacifique : l\'océan, nouvelle frontière des puissances.</p>',
      quiz: [
        { q: 'La ZEE s\'étend jusqu\'à :', choix: ['200 milles marins des côtes', '12 milles', 'tout l\'océan'], bon: 0, exp: 'Environ 370 km de droits d\'exploitation.' },
        { q: 'Le canal de Suez relie :', choix: ['la Méditerranée et la mer Rouge', 'l\'Atlantique et le Pacifique', 'la Manche et la mer du Nord'], bon: 0, exp: 'Route essentielle Asie-Europe.' },
        { q: 'Classement de la ZEE française :', choix: ['2e du monde', '1re du monde', '40e'], bon: 0, exp: 'Grâce aux territoires ultramarins.' },
        { q: 'Rejets plastiques annuels dans les océans :', choix: ['environ 8 millions de tonnes', '8 000 tonnes', '800 millions de tonnes'], bon: 0, exp: 'Soit un camion-benne par minute.' },
        { q: 'Les océans couvrent :', choix: ['71 % de la Terre', '50 %', '90 %'], bon: 0, exp: 'La planète bleue !' }
      ],
      vf: [
        { q: 'Les océans jouent un rôle mineur dans le commerce mondial.', v: false, exp: '80 % du commerce transite par mer.' },
        { q: 'La surpêche menace les stocks de poissons.', v: true, exp: 'Environ un tiers des stocks sont surexploités.' },
        { q: 'Le détroit d\'Ormuz est stratégique pour le pétrole.', v: true, exp: 'Une grande partie du pétrole mondial y transite.' }
      ]
    },
    {
      id: 'g4-developpement', mat: 'geo', niveau: '4e',
      titre: 'Des inégalités de développement',
      express: '<li> développement = richesse + santé + éducation + conditions de vie (IDH).</li><li>Nord/Sud : schéma simplifié ; réalités plus nuancées (émergents : Brésil, Chine, Inde).</li><li>Indicateurs : PIB/hab., IDH, espérance de vie, taux d\'alphabétisation.</li><li>Inégalités internes aux pays : riches et pauvres partout.</li><li>Aide : ONG, ONU (ODD 2030), commerce équitable.</li>',
      complet: '<h3>1. Mesurer le développement</h3><p>IDH (indice de développement humain, PNUD) combine : santé (espérance de vie), éducation (scolarisation), revenu (PIB/hab.). Un pays riche n\'est pas toujours bien développé.</p><h3>2. Les inégalités mondiales</h3><p>Pays développés (Europe, Amérique du Nord, Japon, Australie) ; pays émergents (Chine, Brésil, Inde : croissance forte mais écarts internes) ; pays les moins avancés (Afrique subsaharienne, une partie de l\'Asie).</p><h3>3. Les inégalités dans un pays</h3><p>Favelas à côté de quartiers modernes à São Paulo, bidonvilles près des quartiers d\'affaires de Mumbai : le PIB moyen masque ces écarts.</p><h3>4. Les causes</h3><p>Histoire (colonisation), géographie, guerres, corruption, dette, dépendance aux matières premières, accès inégal à l\'éducation (souvent des filles).</p><h3>5. Réduire les écarts</h3><p>Objectifs de développement durable (ODD, 2015-2030), aide publique au développement, ONG, microcrédit, commerce équitable.</p><h3>6. Espoirs</h3><p>La pauvreté extrême recule (de 36 % à ~9 % de l\'humanité depuis 1990), mais le changement climatique et les conflits fragilisent les progrès.</p>',
      quiz: [
        { q: 'L\'IDH combine :', choix: ['santé, éducation et revenu', 'surface, population, climat', 'PIB seul'], bon: 0, exp: 'Indice composite du PNUD.' },
        { q: 'Un pays émergent, c\'est :', choix: ['un pays en forte croissance mais aux écarts internes', 'un pays pauvre figé', 'un pays du Nord'], bon: 0, exp: 'Chine, Brésil, Inde, etc.' },
        { q: 'Objectif mondial adopté en 2015 :', choix: ['les ODD pour 2030', 'la conquête de Mars', 'le moratoire sur les OGM'], bon: 0, exp: '17 objectifs de développement durable.' },
        { q: 'Le PIB/hab. seul est :', choix: ['insuffisant pour mesurer le développement', 'parfait', 'un indice de santé'], bon: 0, exp: 'Il ignore santé, éducation, inégalités.' },
        { q: 'La pauvreté extrême depuis 1990 :', choix: ['a fortement reculé', 'a augmenté', 'est inchangée'], bon: 0, exp: '~36 % → ~9 %, mais des régions restent très fragiles.' }
      ],
      vf: [
        { q: 'Tous les habitants d\'un pays émergent s\'enrichissent également.', v: false, exp: 'Écarts énormes : favelas et quartiers d\'affaires coexistent.' },
        { q: 'L\'éducation des filles favorise le développement.', v: true, exp: 'C\'est l\'un des leviers les plus efficaces (ODD 4 et 5).' },
        { q: 'Le classement Nord/Sud suffit à décrire le monde.', v: false, exp: 'Schéma simplifié : pays émergents et inégalités internes le nuancent.' }
      ]
    },
    {
      id: 'g3-metropoles', mat: 'geo', niveau: '3e',
      titre: 'Métropolisation : les grandes villes',
      express: '<li>Une métropole concentre pouvoirs de commandement : politiques, économiques, culturels.</li><li>Les villes mondiales : New York, Londres, Tokyo, Paris…</li><li>Métropolisation : concentration croissante des hommes et des fonctions dans les grandes villes.</li><li>Villes globales du Sud : Dubai, Shanghai, São Paulo.</li><li>Problèmes : ségrégation socio-spatiale, étalement urbain, durabilité.</li>',
      complet: '<h3>1. Qu\'est-ce qu\'une métropole ?</h3><p>Grande ville qui rayonne : quartiers d\'affaires (La Défense, City, Manhattan), universités, sièges sociaux, aéroports, fonctions de commandement politiques et culturels.</p><h3>2. Le réseau des villes mondiales</h3><p>New York, Londres, Tokyo en tête ; Paris, Hong Kong, Singapour. Le classement évolue : les métropoles du Sud montent (Dubai, Shanghai, Mumbai).</p><h3>3. La métropolisation</h3><p>Les métropoles concentrent population, emplois qualifiés, innovations, réseaux de transport (TGV, hubs aériens). Les villes moyennes peuvent perdre des emplois.</p><h3>4. En France</h3><p>Paris, seule ville mondiale ; Lyon, Marseille, Lille, Toulouse, Bordeaux : métropoles régionales. Le Grand Paris : projet de métropole durable.</p><h3>5. Les défis</h3><p>Ségrégation (ghettos riches/pauvres), étalement urbain, pollution, transport quotidien. Villes durables : transports en commun, densité, trames vertes.</p><h3>6. Pour l\'examen</h3><p>Savoir localiser 10 métropoles mondiales, expliquer leurs fonctions et illustrer par un exemple précis de projet urbain.</p>',
      quiz: [
        { q: 'Une métropole est avant tout :', choix: ['un centre de commandement', 'une ville qui mange', 'un village'], bon: 0, exp: 'Elle concentre pouvoirs économiques, politiques et culturels.' },
        { q: 'Quelle ville n\'est PAS une ville mondiale ?', choix: ['Tokyo', 'Londres', 'Auch'], bon: 2, exp: 'Auch est une sous-préfecture !' },
        { q: 'La métropolisation signifie :', choix: ['concentration croissante dans les grandes villes', 'l\'exode rural du XIXe', 'la fin des villes'], bon: 0, exp: 'Hommes et fonctions se concentrent dans les métropoles.' },
        { q: 'La Défense est :', choix: ['un quartier d\'affaires parisien', 'un port', 'une station de ski'], bon: 0, exp: 'Le principal quartier d\'affaires européen.' },
        { q: 'Défi majeur des métropoles :', choix: ['ségrégation et étalement urbain', 'manque de touristes', 'trop peu d\'habitants'], bon: 0, exp: 'Les écarts sociaux se lisent dans l\'espace urbain.' }
      ],
      vf: [
        { q: 'Paris est une ville mondiale.', v: true, exp: 'Fonctions politiques, économiques et culturelles de premier rang.' },
        { q: 'La métropolisation touche seulement les pays riches.', v: false, exp: 'Shanghai, Dubai, São Paulo : le Sud se métropolise aussi.' },
        { q: 'Une métropole doit relever des défis de durabilité.', v: true, exp: 'Transports, densité, pollution, cohésion sociale.' }
      ]
    },
    {
      id: 'g3-energie', mat: 'geo', niveau: '3e',
      titre: 'Énergie et transition',
      express: '<li>Mix énergétique mondial : dominé par les énergies fossiles (pétrole, gaz, charbon, ~80 %).</li><li>Les énergies fossiles émettent du CO₂ et s\'épuiseront.</li><li>Renouvelables : solaire, éolien, hydroélectricité, biomasse — en forte croissance.</li><li>Nucléaire : bas carbone, mais gestion des déchets.</li><li>Transition énergétique : objectif neutralité carbone 2050 (UE, France).</li>',
      complet: '<h3>1. La demande explose</h3><p>Population, urbanisation, numérique : la consommation mondiale double depuis 1990. L\'Asie est le premier consommateur (Chine n°1).</p><h3>2. Les ressources et leur géographie</h3><p>Pétrole : Moyen-Orient, USA, Russie. Gaz : Russie, Qatar, USA. Charbon : Chine, USA. Uranium : Kazakhstan, Canada, Australie. Les ressources sont inégalement réparties : dépendances et géopolitique.</p><h3>3. Le mix énergétique de la France</h3><p>Nucléaire ~ 65 % de l\'électricité, renouvelables ~ 25 % (hydraulique, éolien, solaire), thermique résiduel. La France importe ses énergies fossiles.</p><h3>4. Transition : les leviers</h3><p>Sobriété (consommer moins), efficacité, renouvelables. Coûts du solaire et de l\'éolien en forte baisse : ils deviennent les sources les moins chères.</p><h3>5. Défis</h3><p>Intermittence (stockage), réseaux, métaux stratégiques (lithium, cobalt), acceptabilité locale (éoliennes), dépendance aux fournisseurs (gaz russe).</p><h3>6. Géopolitique</h3><p>Prix du pétrole et guerres, sanctions, OPEP : l\'énergie est un instrument de puissance. La transition redessine les dépendances (batteries, hydrogène).</p>',
      quiz: [
        { q: 'Part des fossiles dans l\'énergie mondiale :', choix: ['environ 80 %', '30 %', '100 %'], bon: 0, exp: 'Pétrole, gaz et charbon dominent encore.' },
        { q: 'Premier consommateur d\'énergie mondial :', choix: ['la Chine', 'la France', 'l\'Islande'], bon: 0, exp: 'Depuis les années 2000, devant les USA.' },
        { q: 'L\'hydroélectricité est :', choix: ['une énergie renouvelable', 'fossile', 'nucléaire'], bon: 0, exp: 'Première source renouvelable mondiale.' },
        { q: 'Objectif climatique de la France/UE :', choix: ['neutralité carbone en 2050', 'zéro énergie en 2030', 'doubler le charbon'], bon: 0, exp: 'Neutralité carbone = émissions compensées.' },
        { q: 'Le lithium est stratégique pour :', choix: ['les batteries électriques', 'les éoliennes', 'le nucléaire'], bon: 0, exp: 'Voitures et stockage : batteries lithium.' }
      ],
      vf: [
        { q: 'Les énergies renouvelables sont en croissance rapide.', v: true, exp: 'Solaire et éolien battent des records d\'installation.' },
        { q: 'Le nucléaire émet beaucoup de CO₂ directement.', v: false, exp: 'Bas carbone, mais déchets à gérer.' },
        { q: 'La France produit tout son pétrole.', v: false, exp: 'Elle importe la quasi-totalité de ses fossiles.' }
      ]
    },
    {
      id: 'svt5-respiration', mat: 'svt', niveau: '5e',
      titre: 'La respiration',
      express: '<li>Respirer = échanger des gaz avec le milieu (O₂ absorbé, CO₂ rejeté).</li><li>Chez l\'Homme : air → trachée → bronches → bronchioles → alvéoles pulmonaires.</li><li>Les alvéoles sont entourées de capillaires sanguins : échange O₂/CO₂.</li><li>Le dioxygène sert aux organes à produire de l\'énergie (respiration cellulaire).</li><li>Le diaphragme et les côtes font entrer et sortir l\'air (inspiration/expiration).</li>',
      complet: '<h3>1. Le trajet de l\'air</h3><p>Bouche/nez → pharynx → trachée → bronches → bronchioles → alvéoles pulmonaires. Des poumons aux organes : le sang transporte les gaz.</p><h3>2. L\'échange alvéolaire</h3><p>Parois très fines des alvéoles, surface échangeuse immense (~100 m²). Le O₂ passe dans le sang, le CO₂ du sang passe dans l\'air expiré. Composition de l\'air : inspiré 21 % O₂ / 0,04 % CO₂ ; expiré ~16 % O₂ / ~4 % CO₂.</p><h3>3. La ventilation</h3><p>Inspiration : diaphragme descend, côtes se soulèvent, les poumons se remplissent. Expiration : retour. Le souffle = ventilation pulmonaire.</p><h3>4. Respiration et énergie</h3><p>Les cellules utilisent le O₂ pour libérer l\'énergie des nutriments : c\'est la respiration cellulaire, qui produit du CO₂ et de l\'eau.</p><h3>5. Adapter l\'effort</h3><p>À l\'effort, ventilation et rythme cardiaque augmentent : plus de O₂ aux muscles. L\'entraînement améliore cette adaptation.</p><h3>6. Autres animaux</h3><p>Poissons : branchies (O₂ dissous dans l\'eau). Insectes : trachées. Vers de terre : peau humide. Chaque milieu impose ses organes.</p>',
      quiz: [
        { q: 'Les échanges de gaz se font dans :', choix: ['les alvéoles pulmonaires', 'la trachée', 'le nez'], bon: 0, exp: 'Parois fines + capillaires : surface d\'échange.' },
        { q: 'L\'air expiré contient :', choix: ['moins de O₂ et plus de CO₂', 'plus de O₂', 'du méthane'], bon: 0, exp: 'O₂ ~16 %, CO₂ ~4 %.' },
        { q: 'Le dioxygène sert à :', choix: ['libérer l\'énergie des nutriments', 'fabriquer du sang', 'digérer'], bon: 0, exp: 'Respiration cellulaire dans les organes.' },
        { q: 'À l\'effort, la ventilation :', choix: ['augmente', 'diminue', 's\'arrête'], bon: 0, exp: 'Les muscles demandent plus de O₂.' },
        { q: 'Les poissons respirent grâce à :', choix: ['des branchies', 'des poumons', 'la peau'], bon: 0, exp: 'Ils extraient le O₂ dissous dans l\'eau.' }
      ],
      vf: [
        { q: 'Le diaphragme participe à la respiration.', v: true, exp: 'Sa descente agraisse la cage thoracique : inspiration.' },
        { q: 'L\'air expiré est composé uniquement de CO₂.', v: false, exp: 'Il contient encore ~16 % de O₂ et de l\'azote.' },
        { q: 'La surface d\'échange des poumons est très grande.', v: true, exp: 'Environ 100 m² d\'alvéoles.' }
      ]
    },
    {
      id: 'svt5-digestion', mat: 'svt', niveau: '5e',
      titre: 'La digestion et les nutriments',
      express: '<li>Tube digestif : bouche → œsophage → estomac → intestin grêle → gros intestin.</li><li>Les aliments sont transformés en nutriments par digestion mécanique + chimique (enzymes).</li><li>Les nutriments passent dans le sang au niveau de l\'intestin grêle (villosités).</li><li>Glandes digestives : salivaires, foie (bile), pancréas.</li><li>Le sang distribue les nutriments aux organes.</li>',
      complet: '<h3>1. Le trajet des aliments</h3><p>Bouche (dents, salive) → œsophage → estomac (gastrique acide, brassage) → intestin grêle (digestion terminée, absorption) → gros intestin (eau, selles).</p><h3>2. La digestion, une transformation</h3><p>Mécanique : dents, brassage de l\'estomac. Chimique : enzymes (salive, suc gastrique, pancréatique) découpent les molécules : amidon → glucose ; protéines → acides aminés ; lipides → acides gras + glycérol.</p><h3>3. L\'absorption intestinale</h3><p>L\'intestin grêle est tapissé de villosités : surface d\'absorption énorme (~200 m²). Les nutriments passent dans les capillaires sanguins (et lymphatiques pour les graisses).</p><h3>4. Distribution</h3><p>Le sang transporte les nutriments vers les organes, qui les utilisent pour grandir, se réparer et produire de l\'énergie.</p><h3>5. Rôle des glandes</h3><p>Salivaires : amylase. Foie : bile (émulsionne les graisses). Pancréas : enzymes puissantes + hormones.</p><h3>6. Hygiène alimentaire</h3><p>Équilibre : fruits/légumes, féculents, protéines, eau ; limiter sucres rapides et graisses. Les fibres facilitent le transit.</p>',
      quiz: [
        { q: 'Les nutriments passent dans le sang au niveau :', choix: ['de l\'intestin grêle', 'de l\'estomac', 'de la bouche'], bon: 0, exp: 'Villosités intestinales = surface d\'absorption.' },
        { q: 'L\'amidon est découpé en :', choix: ['glucose', 'acides aminés', 'acides gras'], bon: 0, exp: 'Enzymes digestives : glucide complexe → glucose.' },
        { q: 'La bile, produite par le foie, sert à :', choix: ['émulsionner les graisses', 'digérer le pain', 'fabriquer du sang'], bon: 0, exp: 'Elle facilite la découpe des lipides.' },
        { q: 'La digestion est :', choix: ['mécanique et chimique', 'uniquement mécanique', 'uniquement chimique'], bon: 0, exp: 'Brassage + enzymes.' },
        { q: 'Les protéines sont découpées en :', choix: ['acides aminés', 'glucides', 'vitamines'], bon: 0, exp: 'Les enzymes découpent les grosses molécules.' }
      ],
      vf: [
        { q: 'L\'estomac absorbe les nutriments.', v: false, exp: 'C\'est l\'intestin grêle qui les absorbe.' },
        { q: 'Les enzymes découpent les aliments en petites molécules.', v: true, exp: 'Ce sont des ciseaux moléculaires.' },
        { q: 'Le gros intestin absorbe de l\'eau.', v: true, exp: 'Il achève la formation des selles.' }
      ]
    },
    {
      id: 'svt4-reproduction', mat: 'svt', niveau: '4e',
      titre: 'La reproduction humaine',
      express: '<li>Puberté : hormones (testostérone, œstrogènes) rendent capable de se reproduire.</li><li>Appareils : testicules (spermatozoïdes) / ovaires (ovules).</li><li>Fécondation : noyau du spermatozoïde + noyau de l\'ovule = cellule-œuf.</li><li>Gestation : 9 mois, développement de l\'embryon puis du fœtus, placenta.</li><li>Contraception : moyens de éviter une grossesse (préservatif aussi contre les IST).</li>',
      complet: '<h3>1. La puberté</h3><p>Déclenchée par le cerveau (hypophyse) : hormones qui activent les gonades. Modifications physiques et capacité de reproduire. Elle arrive vers 10-14 ans, à des moments différents pour chacun.</p><h3>2. Production des gamètes</h3><p>Homme : spermatozoïdes produits en continu dès la puberté (sperme). Femme : un ovule par cycle (~28 jours, ovulation) ; les règles correspondent à la destruction de la muqueuse utérine si pas de fécondation.</p><h3>3. La fécondation</h3><p>Dans les trompes de Fallope : fusion des noyaux d\'un spermatozoïde et d\'un ovule → cellule-œuf (23 + 23 chromosomes = 46). La cellule-œuf se divise et s\'implante dans l\'utérus.</p><h3>4. La grossesse</h3><p>Embryon → fœtus ; le placenta échange nutriments, O₂ et déchets avec le sang maternel. Accouchement ~9 mois après fécondation.</p><h3>5. Contraception et santé</h3><p>Préservatif : seule protection contre les IST en plus de la contraception. Consentement, respect, information : sujets essentiels.</p><h3>6. Aide à la reproduction</h3><p>Procréation médicalement assistée (FIV) : fécondation en laboratoire pour des couples infertiles.</p>',
      quiz: [
        { q: 'La fécondation a lieu :', choix: ['dans les trompes de Fallope', 'dans l\'utérus', 'dans l\'ovaire'], bon: 0, exp: 'Fusion des noyaux des gamètes dans la trompe.' },
        { q: 'Les hormones de la puberté sont produites d\'abord par :', choix: ['le cerveau (hypophyse)', 'les ovaires seuls', 'la peau'], bon: 0, exp: 'L\'hypophyse commande les gonades.' },
        { q: 'Le placenta permet :', choix: ['les échanges entre mère et fœtus', 'la respiration du père', 'la digestion du fœtus'], bon: 0, exp: 'Nutriments, O₂ et déchets transitent par lui.' },
        { q: 'Seul contraceptif protégeant des IST :', choix: ['le préservatif', 'la pilule', 'le stérilet'], bon: 0, exp: 'Barrière physique obligatoire.' },
        { q: 'La cellule-œuf possède :', choix: ['46 chromosomes', '23 chromosomes', '92 chromosomes'], bon: 0, exp: '23 du père + 23 de la mère.' }
      ],
      vf: [
        { q: 'Un seul ovule est libéré par cycle en général.', v: true, exp: 'Ovulation mensuelle ; deux parfois (jumeaux).' },
        { q: 'La pilule protège des IST.', v: false, exp: 'Seul le préservatif protège.' },
        { q: 'Les règles indiquent l\'absence de grossesse.', v: true, exp: 'La muqueuse utérine non utilisée est éliminée.' }
      ]
    },
    {
      id: 'svt4-relief', mat: 'svt', niveau: '4e',
      titre: 'La formation du relief',
      express: '<li>Deux moteurs : les forces internes (plaques, volcans) et externes (érosion, transport, sédimentation).</li><li>Divergence : les plaques s\'écartent (dorsales). Convergence : elles se rapprochent (montagnes, fosses).</li><li>Érosion = usure par l\'eau, le vent, le gel.</li><li>Les roches érodées forment des sédiments qui se déposent (sédimentation).</li><li>Le relief = conflit permanent entre soulèvement et érosion.</li>',
      complet: '<h3>1. Convergences et divergences</h3><p>Aux dorsales (divergence), du magma remonte : croûte océanique neuve. En convergence, une plaque peut plonger (subduction, fosses, volcans) ou chevaucher (collision, chaînes de montagnes : Himalaya, Alpes).</p><h3>2. Roches et déformation</h3><p>Sous les contraintes, les roches se cassent (failles) ou se plissent (plis). Les indices : strates plissées, failles actives.</p><h3>3. L\'érosion</h3><p>Les agents : eau (rivières, pluie), gel (la roche éclate), vent, vagues, glaciers. L\'eau est le principal sculpteur du paysage.</p><h3>4. Transport et dépôts</h3><p>Les particules arrachées sont transportées puis déposées : galets, sable, argile. Les couches sédimentaires racontent l\'histoire du paysage.</p><h3>5. Équilibre du relief</h3><p>Si le soulèvement gagne : hautes montagnes. Si l\'érosion gagne : plaines. Le lit d\'un fleuve évolue : méandres, deltas.</p><h3>6. Risques</h3><p>Failles actives (séismes), volcans (éruptions), glissements de terrain, tsunamis : la géologie façonne aussi les risques.</p>',
      quiz: [
        { q: 'L\'Himalaya résulte d\'une :', choix: ['collision de deux plaques continentales', 'divergence', 'érosion marine'], bon: 0, exp: 'Inde contre Asie : les plaques se chevauchent.' },
        { q: 'Une fosse océanique se forme par :', choix: ['subduction (plaque qui plonge)', 'divergence', 'sédimentation'], bon: 0, exp: 'Ex. fosse des Mariannes.' },
        { q: 'Le principal agent d\'érosion :', choix: ['l\'eau', 'la lumière', 'le son'], bon: 0, exp: 'Rivières, pluie, vagues.' },
        { q: 'Les sédiments se déposent généralement :', choix: ['en couches (strates)', 'en cercles', 'aléatoirement'], bon: 0, exp: 'Les strates racontent le passé.' },
        { q: 'Une faille est une roche :', choix: ['cassée', 'fondue', 'plissée'], bon: 0, exp: 'La cassure = faille ; le pli = déformation continue.' }
      ],
      vf: [
        { q: 'Les dorsales océaniques sont des zones de divergence.', v: true, exp: 'Les plaques s\'écartent, le magma remonte.' },
        { q: 'L\'érosion construit des montagnes.', v: false, exp: 'Elle les use ; c\'est la tectonique qui les construit.' },
        { q: 'Le gel peut briser des roches.', v: true, exp: 'L\'eau gèle et dilate les fissures (gélifraction).' }
      ]
    },
    {
      id: 'svt3-immunite', mat: 'svt', niveau: '3e',
      titre: 'Immunité et vaccins',
      express: '<li>Des microbes (virus, bactéries) nous entourent : l\'immunité nous protège.</li><li>Barrières naturelles : peau, muqueuses, larmes, acidité gastrique.</li><li>Immunité innée : phagocytes (globules blancs qui mangent les microbes).</li><li>Immunité adaptative : lymphocytes B (anticorps) et T (tueurs).</li><li>Vaccin : entraînement sans risque pour l\'immunité adaptative → mémoire.</li>',
      complet: '<h3>1. Entrée des microbes</h3><p>Voies : respiration, digestion, plaies. Les barrières cutanéo-muqueuses bloquent la plupart des agressions.</p><h3>2. Réaction innée</h3><p>Inflammation (rougeur, chaleur, gonflement) : phagocytes qui engloutissent les microbes. Rapide mais non spécifique.</p><h3>3. Réaction adaptative</h3><p>Lymphocytes B produisent des anticorps qui marquent les microbes ; lymphocytes T détruisent les cellules infectées. Spécifiques de chaque microbe, avec mémoire.</p><h3>4. La vaccination</h3><p>Version inoffensive du microbe injectée : le système immunitaire fabrique anticorps et mémoire. En cas de vraie infection, réponse est rapide : on ne tombe pas malade (ou moins gravement). Exemples : rougeole, tétanos, COVID.</p><h3>5. Antibiotiques et résistance</h3><p>Antibiotiques agissent sur les bactéries (jamais les virus !). Usage excessif → résistances : un enjeu mondial de santé publique.</p><h3>6. VIH/SIDA</h3><p>Le VIH détruit les lymphocytes T : le système immunitaire s\'effondre. Traitements (trithérapies) permettent aujourd\'hui une vie quasi normale, mais pas de guérison ; la prévention reste essentielle.</p>',
      quiz: [
        { q: 'Les anticorps sont produits par :', choix: ['les lymphocytes B', 'les globules rouges', 'le foie'], bon: 0, exp: 'Ils marquent les microbes pour la destruction.' },
        { q: 'Un vaccin :', choix: ['entraîne le système immunitaire', 'donne la maladie', 'tue les virus'], bon: 0, exp: 'Version inoffensive → mémoire immunitaire.' },
        { q: 'Les antibiotiques agissent sur :', choix: ['les bactéries', 'les virus', 'les champignons seuls'], bon: 0, exp: 'Inutiles contre la grippe ou le COVID (virus).' },
        { q: 'La phagocytose, c\'est :', choix: ['des globules blancs qui mangent les microbes', 'la fabrication d\'anticorps', 'la coagulation'], bon: 0, exp: 'Immunité innée.' },
        { q: 'Le VIH attaque :', choix: ['les lymphocytes T', 'les os', 'l\'estomac'], bon: 0, exp: 'D\'où l\'effondrement immunitaire (SIDA).' }
      ],
      vf: [
        { q: 'La peau est une barrière naturelle contre les microbes.', v: true, exp: 'Première barrière cutanéo-muqueuse.' },
        { q: 'Les antibiotiques guérissent la grippe.', v: false, exp: 'La grippe est virale : antibiotiques inutiles.' },
        { q: 'L\'immunité adaptative garde une mémoire.', v: true, exp: 'D\'où l\'efficacité des vaccins et des rappels.' }
      ]
    },
    {
      id: 'svt3-evolution', mat: 'svt', niveau: '3e',
      titre: 'L\'évolution des espèces',
      express: '<li>Tous les êtres vivants ont un ancêtre commun : c\'est l\'évolution.</li><li>Darwin : sélection naturelle — les variants les mieux adaptés survivent et se reproduisent.</li><li>Preuves : fossiles (formes intermédiaires), anatomie comparée, embryologie, ADN.</li><li>Mutations aléatoires créent la diversité ; l\'environnement sélectionne.</li><li>Exemple classique : les pinsons de Darwin aux Galápagos.</li>',
      complet: '<h3>1. L\'idée d\'évolution</h3><p>Les espèces ne sont pas fixes : elles se transforment au fil des générations. Darwin (1859, « L\'Origine des espèces ») propose le mécanisme : la sélection naturelle.</p><h3>2. La sélection naturelle</h3><p>1) Des variations existent entre individus (mutations). 2) L\'environnement exerce une pression : certains variantes survivent mieux. 3) Ils se reproduisent davantage → leurs caractères se répandent.</p><h3>3. Exemple des pinsons</h3><p>Aux Galápagos, la taille des becs des pinsons varie selon la nourriture disponible : en période de sécheresse, les becs adaptés aux graines dures sont sélectionnés.</p><h3>4. Les preuves</h3><p>Fossiles (Archaeopteryx, entre dinosaures et oiseaux), membres homologues (membres antérieurs communs), embryologie, et surtout comparaison des ADN : plus les génomes sont proches, plus les espèces sont apparentées.</p><h3>5. Spéciation</h3><p>Des populations isolées (îles, montagnes) divergent jusqu\'à ne plus pouvoir se reproduire ensemble : nouvelles espèces.</p><h3>6. Évolution et société</h3><p>L\'évolution est un fait scientifique solidement établi. Elle explique aussi la résistance des bactéries aux antibiotiques : une évolution en temps réel.</p>',
      quiz: [
        { q: 'Le mécanisme de l\'évolution selon Darwin :', choix: ['la sélection naturelle', 'l\'héritage des caractères acquis', 'le hasard seul'], bon: 0, exp: 'Variation + pression du milieu + reproduction différentielle.' },
        { q: 'Les mutations sont :', choix: ['aléatoires', 'voulu par l\'individu', 'toujours néfastes'], bon: 0, exp: 'C\'est l\'environnement qui sélectionne ensuite.' },
        { q: 'Deux espèces au génome très proche sont :', choix: ['très apparentées', 'sans lien', 'des bactéries'], bon: 0, exp: 'L\'ADN est la preuve la plus solide.' },
        { q: 'L\'Archaeopteryx est :', choix: ['un fossile intermédiaire dinosaures/oiseaux', 'un mammifère marin', 'une plante'], bon: 0, exp: 'Fossile à plumes avec dents et queue.' },
        { q: 'La résistance aux antibiotiques illustre :', choix: ['l\'évolution en action', 'la génétique humaine', 'la photosynthèse'], bon: 0, exp: 'Sélection des bactéries résistantes.' }
      ],
      vf: [
        { q: 'Les espèces sont apparues toutes en même temps et n\'ont pas changé.', v: false, exp: 'Les espèces évoluent : preuves fossiles et génétiques.' },
        { q: 'L\'Homme descend du chimpanzé actuel.', v: false, exp: 'Homme et chimpanzé ont un ancêtre commun, l\'un ne descend pas de l\'autre.' },
        { q: 'Les fossiles constituent des preuves de l\'évolution.', v: true, exp: 'Avec l\'ADN, l\'anatomie et l\'embryologie.' }
      ]
    },
    {
      id: 'pc5-eau', mat: 'physique', niveau: '5e',
      titre: 'L\'eau et les mélanges',
      express: '<li>Eau liquide + solide : mélange homogène (dissous) ou hétérogène (visible).</li><li>Dissolution : le soluté se disperse (sucre dans l\'eau) — l\'eau est un excellent solvant.</li><li>Saturation : quand le solvant ne peut plus dissoudre.</li><li>Séparation : décantation, filtration, distillation (évaporation + condensation).</li><li>L\'eau pure se reconnaît par des tests : tests de chlore, sulfate, calcaire…</li>',
      complet: '<h3>1. Mélange homogène / hétérogène</h3><p>Homogène : on ne distingue pas les constituants (eau + sel dissous). Hétérogène : on voit les morceaux (eau + sable, vinaigrette).</p><h3>2. La dissolution</h3><p>Le soluté (sucre) se disperse dans le solvant (eau) sous forme de particules invisibles. Agiter et chauffer accélèrent la dissolution.</p><h3>3. Saturation</h3><p>À partir d\'une certaine quantité, le soluté ne se dissout plus : le dépôt reste visible. La solubilité augmente avec la température.</p><h3>4. Séparer les constituants</h3><p>Décantation (le plus lourd se dépose), filtration (sépare liquide/solide avec du papier filtre), distillation (on vaporise l\'eau, on la condense : on récupère de l\'eau pure).</p><h3>5. Reconnaître l\'eau pure</h3><p>Tests chimiques : nitrate d\'argent → précipité blanc si chlorures ; chlorure de baryum → précipité blanc si sulfates. L\'eau distillée ne donne aucun précipité.</p><h3>6. Eau potable et traitement</h3><p>Du fleuve au robinet : décantation, filtration, ozonation/chloration. L\'eau potable est limpide, sans germes ni excès de sels.</p>',
      quiz: [
        { q: 'Eau + sable est un mélange :', choix: ['hétérogène', 'homogène', 'pur'], bon: 0, exp: 'On distingue le sable.' },
        { q: 'La dissolution est accélérée par :', choix: ['agitation et chaleur', 'le froid', 'le repos'], bon: 0, exp: 'Les particules se dispersent plus vite.' },
        { q: 'La filtration sépare :', choix: ['un solide d\'un liquide', 'deux gaz', 'deux liquides miscibles'], bon: 0, exp: 'Le papier filtre retient le solide.' },
        { q: 'Un précipité blanc avec le nitrate d\'argent indique :', choix: ['des chlorures', 'du sucre', 'des vitamines'], bon: 0, exp: 'Test des ions chlorure dans l\'eau.' },
        { q: 'La distillation récupère :', choix: ['de l\'eau pure', 'du sable', 'du sel pur'], bon: 0, exp: 'Évaporation puis condensation de l\'eau.' }
      ],
      vf: [
        { q: 'L\'eau salée est un mélange homogène.', v: true, exp: 'Le sel dissous est invisible.' },
        { q: 'La décantation fonctionne pour un mélange homogène.', v: false, exp: 'Il faut un mélange hétérogène (le dépôt se dépose).' },
        { q: 'On peut dissoudre une quantité infinie de sucre dans l\'eau.', v: false, exp: 'Il y a saturation au-delà de la solubilité.' }
      ]
    },
    {
      id: 'pc5-circuit', mat: 'physique', niveau: '5e',
      titre: 'Circuits électriques simples',
      express: '<li>Circuit fermé = le courant circule ; ouvert = rien (interrupteur).</li><li>Série : une seule boucle ; si une ampoule claque, tout s\'éteint.</li><li>Dérivation (parallèle) : plusieurs branches ; les lampes sont indépendantes.</li><li>Court-circuit : danger, courant excessif.</li><li>Symboles normalisés : pile, lampe, interrupteur, fil.</li>',
      complet: '<h3>1. Le circuit</h3><p>Générateur (pile) + fils + récepteurs (lampe, moteur) + interrupteur. Le courant circule du + vers le − à l\'extérieur du générateur.</p><h3>2. Circuit en série</h3><p>Les récepteurs sont sur une même boucle. Plus il y a de lampes, moins elles brillent : l\'intensité est partagée. Une seule lampe HS → tout s\'éteint.</p><h3>3. Circuit en dérivation</h3><p>Chaque lampe a sa branche. Elles brillent normalement et indépendamment : c\'est le montage domestique (si une pièce s\'éteint, le reste marche).</p><h3>4. Le court-circuit</h3><p>Un fil relie directement les deux bornes du récepteur : le courant prend le chemin le plus facile, intensité excessive → surchauffe, danger.</p><h3>5. Schématiser</h3><p>Symboles normalisés : trait long/court pour la pile, cercle barré d\'une croix pour la lampe. Le schéma doit être en angles droits, fermé.</p><h3>6. Sécurité</h3><p>Disjoncteur et fusibles coupent le courant en cas de surintensité. Ne jamais jouer avec le secteur (230 V : danger de mort).</p>',
      quiz: [
        { q: 'Dans un circuit en série, si une lampe claque :', choix: ['tout s\'éteint', 'les autres brillent', 'la pile explose'], bon: 0, exp: 'La boucle est interrompue.' },
        { q: 'Le montage qui rend les lampes indépendantes :', choix: ['la dérivation', 'la série', 'le court-circuit'], bon: 0, exp: 'Chaque lampe a sa branche.' },
        { q: 'Un court-circuit provoque :', choix: ['une surintensité dangereuse', 'une économie d\'énergie', 'rien'], bon: 0, exp: 'Surchauffe, risque d\'incendie.' },
        { q: 'Pour qu\'un courant circule, le circuit doit être :', choix: ['fermé', 'ouvert', 'en plastique'], bon: 0, exp: 'Interrupteur fermé = boucle complète.' },
        { q: 'Le fusible sert à :', choix: ['couper en cas de surintensité', 'éclairer', 'stocker l\'électricité'], bon: 0, exp: 'Il fond et ouvre le circuit.' }
      ],
      vf: [
        { q: 'Dans un circuit en série, les lampes brillent moins quand elles sont nombreuses.', v: true, exp: 'L\'énergie est partagée.' },
        { q: 'Un interrupteur ouvert laisse passer le courant.', v: false, exp: 'Ouvert = circuit interrompu.' },
        { q: 'Les installations domestiques sont en dérivation.', v: true, exp: 'Pour que chaque appareil fonctionne indépendamment.' }
      ]
    },
    {
      id: 'pc4-melanges', mat: 'physique', niveau: '4e',
      titre: 'Atomes, molécules et ions',
      express: '<li>Toute matière est faite d\'atomes : noyau (protons + neutrons) + électrons.</li><li>Les atomes se lient en molécules : H₂O, CO₂, O₂.</li><li>Un ion = atome ou groupe chargé : Na⁺, Cl⁻, SO₄²⁻.</li><li>La charge vient d\'électrons gagnés ou perdus.</li><li>Formules et équations traduisent les transformations.</li>',
      complet: '<h3>1. L\'atome</h3><p>Minuscule : 0,1 nm de diamètre. Noyau (protons +, neutrons 0) entouré d\'électrons (−). Il est électriquement neutre : autant de protons que d\'électrons.</p><h3>2. Molécules</h3><p>Des atomes partagent des électrons : H₂O (2 H + 1 O), CO₂, dioxygène O₂. La formule indique la nature et le nombre d\'atomes.</p><h3>3. Les ions</h3><p>Atome qui perd des électrons → cation (Na⁺). Qui en gagne → anion (Cl⁻). Les ions se déplacent dans les solutions et conduisent l\'électricité.</p><h3>4. Tests d\'identification</h3><p>Chlorure Cl⁻ : nitrate d\'argent → précipité blanc. Sulfate SO₄²⁻ : chlorure de baryum → précipité blanc. Fer Fe²⁺ : soude → précipité vert.</p><h3>5. Équation de réaction</h3><p>Réactifs → produits. Fer + soufre → sulfure de fer : Fe + S → FeS. Conservation des atomes : rien ne se perd.</p><h3>6. Pourquoi ça compte</h3><p>Comprendre la chimie de l\'eau, de l\'air, des matériaux ; interpréter les tests de pollution (nitrates NO₃⁻ dans l\'eau).</p>',
      quiz: [
        { q: 'Le noyau d\'un atome contient :', choix: ['des protons et des neutrons', 'des électrons', 'des molécules'], bon: 0, exp: 'Les électrons tournent autour.' },
        { q: 'H₂O contient :', choix: ['2 atomes d\'hydrogène et 1 d\'oxygène', '1 H et 2 O', '3 oxygènes'], bon: 0, exp: 'L\'indice compte les atomes.' },
        { q: 'Un ion négatif s\'appelle :', choix: ['anion', 'cation', 'atome'], bon: 0, exp: 'Il a gagné des électrons (Cl⁻).' },
        { q: 'Test des ions sulfate :', choix: ['chlorure de baryum → précipité blanc', 'nitrate d\'argent', 'soude'], bon: 0, exp: 'BaCl₂ + SO₄²⁻ → précipité blanc.' },
        { q: 'Dans une équation chimique :', choix: ['les atomes se conservent', 'tout disparaît', 'les électrons disparaissent'], bon: 0, exp: 'Conservation des atomes.' }
      ],
      vf: [
        { q: 'Un atome est électriquement neutre.', v: true, exp: 'Autant de + que de −.' },
        { q: 'Les ions conducteurs expliquent que l\'eau salée conduise le courant.', v: true, exp: 'Les ions migrent vers les électrodes.' },
        { q: 'O₂ est une molécule d\'un seul atome.', v: false, exp: 'Deux atomes d\'oxygène liés.' }
      ]
    },
    {
      id: 'pc4-son', mat: 'physique', niveau: '4e',
      titre: 'Le son et la lumière',
      express: '<li>Le son est une vibration qui se propage dans un milieu matériel (pas dans le vide !).</li><li>Vitesse : ~340 m/s dans l\'air, 1 500 m/s dans l\'eau.</li><li>La lumière : 300 000 km/s — tout va plus vite que le son.</li><li>Le son a besoin d\'un support ; la lumière se propage même dans le vide.</li><li>Écho et audition : l\'oreille traduit les vibrations en signal nerveux.</li>',
      complet: '<h3>1. Émission et propagation</h3><p>Une source vibre (corde, membrane) ; la vibration se transmet de proche en proche dans l\'air, l\'eau, le métal. Sans milieu (vide de l\'espace) : aucun son.</p><h3>2. Vitesse du son</h3><p>Dans l\'air ~340 m/s. La foudre : on voit l\'éclair avant d\'entendre le tonnerre (lumière quasi instantanée). Distance de l\'orage ≈ 3 s × 340 m.</p><h3>3. La lumière</h3><p>Onde qui se propage en ligne droite à 300 000 km/s, même dans le vide. Ombres, éclipses, fibres optiques illustrent cette propagation.</p><h3>4. Réception</h3><p>Oreille : tympan vibré → signal nerveux. Œil : la lumière entre par la pupille, image sur la rétine. Nos sens traduisent des signaux physiques.</p><h3>5. Nuisances</h3><p>Seuil de danger : ~85 dB en exposition prolongée. Isolation phonique : matériaux qui absorbent.</p><h3>6. Applications</h3><p>Échographie (sons dans le corps), sonar (profondeur de la mer), radars (ondes réfléchies).</p>',
      quiz: [
        { q: 'Le son se propage :', choix: ['dans les milieux matériels', 'dans le vide', 'instantanément'], bon: 0, exp: 'Il faut un support : air, eau, métal.' },
        { q: 'Vitesse du son dans l\'air :', choix: ['environ 340 m/s', '3 000 m/s', '300 000 km/s'], bon: 0, exp: 'La lumière est un million de fois plus rapide.' },
        { q: 'On voit l\'éclair avant d\'entendre le tonnerre car :', choix: ['la lumière va plus vite', 'le son va plus vite', 'le tonnerre est loin'], bon: 0, exp: '300 000 km/s contre 340 m/s.' },
        { q: 'L\'échographie utilise :', choix: ['des ultrasons', 'des rayons X', 'un laser'], bon: 0, exp: 'Sons de très haute fréquence.' },
        { q: 'Seuil de danger du bruit (exposition prolongée) :', choix: ['~85 dB', '~40 dB', '~120 dB'], bon: 0, exp: 'Au-delà : risque de surdité.' }
      ],
      vf: [
        { q: 'Dans l\'espace, on entend les explosions.', v: false, exp: 'Pas de milieu matériel : aucun son.' },
        { q: 'Le son va plus vite dans l\'acier que dans l\'air.', v: true, exp: '~5 000 m/s : le métal conduit bien.' },
        { q: 'La lumière peut se propager dans le vide.', v: true, exp: '300 000 km/s dans le vide.' }
      ]
    },
    {
      id: 'pc3-ohm', mat: 'physique', niveau: '3e',
      titre: 'Tension, intensité et loi d\'Ohm',
      express: '<li>Intensité I (ampères, A) : débit de charges électriques.</li><li>Tension U (volts, V) : différence de « niveau électrique » entre deux points.</li><li>Loi d\'Ohm : U = R × I (résistance en ohms).</li><li>Série : I identique partout, U se partage. Dérivation : U identique, I se partage.</li><li>Puissance : P = U × I (watts).</li>',
      complet: '<h3>1. Mesurer</h3><p>Ampèremètre en série (intensité) ; voltmètre en dérivation (tension). Symboles : A et V.</p><h3>2. La loi d\'Ohm</h3><p>Pour un dipôle ohmique (résistance) : U = R × I. Exemple : R = 100 Ω, I = 0,02 A → U = 2 V. À l\'inverse, I = U/R.</p><h3>3. Caractéristique</h3><p>Graphique U en fonction de I : droite qui passe par l\'origine pour une résistance. La pente = R.</p><h3>4. Loi des nœuds et mailles</h3><p>Série : la tension du générateur est la somme des tensions (loi des mailles) ; l\'intensité est la même. Dérivation : les intensités s\'additionnent au nœud, la tension est commune.</p><h3>5. Puissance et énergie</h3><p>P = U × I. Énergie = P × temps (kWh sur les factures) : un radiateur de 2 000 W pendant 3 h consomme 6 kWh.</p><h3>6. Sécurité domestique</h3><p>Intensité maximale d\'un circuit : disjoncteur 16 A, sections de fils adaptées, prises de terre : trop d\'appareils branchés → surintensité → protection.</p>',
      quiz: [
        { q: 'La loi d\'Ohm s\'écrit :', choix: ['U = R × I', 'U = R / I', 'I = U × R'], bon: 0, exp: 'Tension = résistance × intensité.' },
        { q: 'R = 50 Ω et I = 0,2 A. U = ?', choix: ['10 V', '250 V', '0,004 V'], bon: 0, exp: '50 × 0,2 = 10 V.' },
        { q: 'L\'ampèremètre se branche :', choix: ['en série', 'en dérivation', 'n\'importe où'], bon: 0, exp: 'Pour que le courant le traverse.' },
        { q: 'En série, l\'intensité est :', choix: ['la même partout', 'divisée par deux', 'nulle'], bon: 0, exp: 'Un seul chemin : même débit.' },
        { q: 'Un 2 000 W pendant 3 h consomme :', choix: ['6 kWh', '2 kWh', '600 kWh'], bon: 0, exp: '2 kW × 3 h = 6 kWh.' }
      ],
      vf: [
        { q: 'Le voltmètre se branche en série.', v: false, exp: 'En dérivation, aux bornes du dipôle.' },
        { q: 'En dérivation, la tension est la même aux bornes de chaque branche.', v: true, exp: 'C\'est l\'intensité qui se partage.' },
        { q: 'L\'unité de résistance est l\'ohm (Ω).', v: true, exp: 'Ω = V/A.' }
      ]
    },
    {
      id: 'pc3-mecanique', mat: 'physique', niveau: '3e',
      titre: 'Masse, poids et mouvement',
      express: '<li>Masse (kg) : quantité de matière, invariable. Poids (N) : attraction gravitationnelle, variable.</li><li>Relation : P = m × g (g ≈ 9,8 N/kg sur Terre).</li><li>Le poids est une force, direction verticale, vers le bas.</li><li>Sur la Lune, la masse reste la même, le poids est 6 fois plus faible.</li><li>Gravitation : attraction entre tous les corps (Newton).</li>',
      complet: '<h3>1. Masse et poids</h3><p>Un cosmonaute de 70 kg pèse ~686 N sur Terre, ~113 N sur la Lune. La balance mesure une force et affiche une masse (calibrée pour la Terre !).</p><h3>2. La formule</h3><p>P = m × g. g dépend de l\'astre : 9,8 N/kg (Terre), 1,6 N/kg (Lune), 25 N/kg (Jupiter). Exemple : m = 5 kg → P = 49 N.</p><h3>3. La gravitation</h3><p>Newton : deux corps s\'attirent proportionnellement à leurs masses, inversement au carré de la distance. La gravitation maintient les planètes en orbite, forme les galaxies.</p><h3>4. Le mouvement</h3><p>Décrire un mouvement : trajectoire (ligne, cercle) et vitesse v = d/t. Système de référence : un objet « immobile » dans un train est mobile pour l\'observateur au sol.</p><h3>5. Forces et mouvement</h3><p>Si la somme des forces est nulle : repos ou mouvement rectiligne uniforme. Sinon : le mouvement change (accélération, virage).</p><h3>6. Applications</h3><p>Satellites, chute libre, sécurité routière (distances de freinage) : la mécanique newtonienne décrit le monde courant.</p>',
      quiz: [
        { q: 'Poids de 10 kg sur Terre (g ≈ 9,8) :', choix: ['environ 98 N', '10 N', '980 N'], bon: 0, exp: 'P = 10 × 9,8 = 98 N.' },
        { q: 'Sur la Lune, la masse d\'un astronaute :', choix: ['reste la même', 'est divisée par 6', 'est nulle'], bon: 0, exp: 'C\'est le poids qui change (g plus faible).' },
        { q: 'L\'unité du poids :', choix: ['le newton (N)', 'le kilogramme', 'le watt'], bon: 0, exp: 'Le poids est une force.' },
        { q: 'v = d/t signifie :', choix: ['vitesse = distance ÷ temps', 'volume = densité × temps', 'poids = masse'], bon: 0, exp: 'v en m/s si d en m et t en s.' },
        { q: 'La gravitation est :', choix: ['une attraction entre tous les corps', 'une répulsion', 'un aimant'], bon: 0, exp: 'Elle dépend des masses et de la distance.' }
      ],
      vf: [
        { q: 'La balance mesure directement la masse.', v: false, exp: 'Elle mesure le poids (une force) et convertit en masse.' },
        { q: 'Sur Jupiter, on pèse plus lourd que sur Terre.', v: true, exp: 'g ≈ 25 N/kg : poids bien plus grand.' },
        { q: 'Un mouvement peut être décrit différemment selon l\'observateur.', v: true, exp: 'Tout est relatif au référentiel.' }
      ]
    },
  ]
};
