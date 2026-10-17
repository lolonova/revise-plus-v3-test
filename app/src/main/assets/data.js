/* Révise+ V4.1 — Base de contenu pédagogique (collège : 5e, 4e, 3e)
   21 chapitres complets : 7 matières × 3 niveaux. Tous rédigés et vérifiés. */

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
    }
  ]
};
