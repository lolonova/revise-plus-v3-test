/* Révise+ V4 — Base de contenu pédagogique
   11 chapitres complets, rédigés et vérifiés.
   Les matières sans chapitre sont affichées « à venir » (jamais prétendues prêtes). */

var REVISE_DATA = {
  niveaux: ['6e', '5e', '4e', '3e', '2de', '1re', 'Tle'],
  matieres: [
    { id: 'maths', nom: 'Mathématiques', icon: '📐' },
    { id: 'francais', nom: 'Français', icon: '📚' },
    { id: 'histoire', nom: 'Histoire', icon: '🏛️' },
    { id: 'geo', nom: 'Géographie', icon: '🌍' },
    { id: 'svt', nom: 'SVT', icon: '🧬' },
    { id: 'physique', nom: 'Physique-Chimie', icon: '⚛️' },
    { id: 'anglais', nom: 'Anglais', icon: '🇬🇧' },
    { id: 'philo', nom: 'Philosophie', icon: '🦉' }
  ],
  chapitres: [
    {
      id: 'm6-decimaux', mat: 'maths', niveau: '6e',
      titre: 'Nombres décimaux',
      express: '<li>Un nombre décimal s\'écrit avec une virgule : 3,7 = 3 unités et 7 dixièmes.</li><li>La partie entière est à gauche de la virgule, la partie décimale à droite.</li><li>Multiplier par 10 décale la virgule d\'un rang vers la droite ; diviser par 10 la décale vers la gauche.</li><li>Comparer : on compare d\'abord les parties entières, puis les chiffres après la virgule.</li><li>0,5 = 0,50 : ajouter des zéros à droite ne change pas la valeur.</li>',
      complet: '<h3>1. Écriture décimale</h3><p>Chaque chiffre après la virgule a une valeur : dixièmes (1er rang), centièmes (2e), millièmes (3e). Exemple : 4,275 = 4 + 2/10 + 7/100 + 5/1000.</p><h3>2. Lecture</h3><p>4,275 se lit « quatre virgule deux cent soixante-quinze ».</p><h3>3. Comparaison</h3><p>Pour comparer 5,4 et 5,38 : parties entières égales (5), puis on compare 4 dixièmes et 3 dixièmes → 5,4 > 5,38.</p><h3>4. Multiplication et division par 10, 100, 1000</h3><p>×10 : la virgule part d\'un rang à droite. ÷100 : deux rangs à gauche. Exemple : 3,45 × 10 = 34,5 ; 3,45 ÷ 100 = 0,0345.</p><h3>5. Arrondi</h3><p>Arrondir au dixième : on regarde les centièmes. 7,68 ≈ 7,7 (car 8 ≥ 5). 7,62 ≈ 7,6.</p><h3>6. Addition et soustraction</h3><p>On aligne les virgules avant de calculer. Exemple : 2,4 + 1,75 = 4,15.</p>',
      quiz: [
        { q: 'Combien vaut 3,45 × 10 ?', choix: ['34,5', '3,450', '0,345'], bon: 0, exp: 'Multiplier par 10 décale la virgule d\'un rang vers la droite.' },
        { q: 'Lequel est le plus grand ?', choix: ['5,4', '5,38', '5,399'], bon: 0, exp: '5,4 = 5,400 qui est plus grand que 5,399 et 5,38.' },
        { q: 'Que représente le chiffre 7 dans 4,275 ?', choix: ['Les centièmes', 'Les dixièmes', 'Les millièmes'], bon: 0, exp: '2 est le chiffre des dixièmes, 7 des centièmes, 5 des millièmes.' },
        { q: 'Arrondi au dixième de 7,68 ?', choix: ['7,7', '7,6', '7,68'], bon: 0, exp: 'Les centièmes (8) sont ≥ 5, donc on arrondit au-dessus : 7,7.' },
        { q: '2,4 + 1,75 = ?', choix: ['4,15', '3,15', '4,05'], bon: 0, exp: 'On aligne les virgules : 2,40 + 1,75 = 4,15.' }
      ],
      vf: [
        { q: '0,5 est plus petit que 0,45.', v: false, exp: '0,50 > 0,45 car 5 dixièmes > 4 dixièmes.' },
        { q: 'Ajouter un zéro à droite de la virgule ne change pas le nombre.', v: true, exp: '0,5 = 0,50 : la valeur reste la même.' },
        { q: 'Diviser par 100 décale la virgule de deux rangs vers la gauche.', v: true, exp: 'Exemple : 12,3 ÷ 100 = 0,123.' }
      ]
    },
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
    {
      id: 'm2-fonctions', mat: 'maths', niveau: '2de',
      titre: 'Fonctions : lectures et variations',
      express: '<li>Une fonction f associe à chaque x un seul nombre f(x).</li><li>L\'image de x est f(x) ; un antécédent de y est un x tel que f(x) = y.</li><li>Lire une courbe : à un x, on monte jusqu\'à la courbe pour lire f(x).</li><li>Tableau de variations : flèche montante = croissante, descendante = décroissante.</li><li>Fonction affine : f(x) = ax + b, droite de coefficient directeur a.</li>',
      complet: '<h3>1. Définition</h3><p>Une fonction f est un procédé qui à un nombre x associe une unique image f(x). On note f : x ↦ f(x). Exemple : f(x) = 2x + 1 ; l\'image de 3 est 7.</p><h3>2. Image et antécédent</h3><p>f(3) = 7 : 7 est l\'image de 3, et 3 est un antécédent de 7. Un nombre peut avoir plusieurs antécédents, mais une seule image.</p><h3>3. Lecture graphique</h3><p>Pour lire f(2) : partir de x = 2, monter verticalement à la courbe, lire l\'ordonnée. Pour les antécédents de 4 : tracer la droite y = 4 et lire les abscisses des intersections.</p><h3>4. Tableau de variations</h3><p>On note les intervalles où f croît (flèche ↗) et décroît (flèche ↘), avec les valeurs atteintes aux bornes.</p><h3>5. Fonctions de référence</h3><p>Linéaire f(x) = ax (droite passant par l\'origine). Affine f(x) = ax + b (droite). Carré f(x) = x² (parabole, décroissante puis croissante). Inverse f(x) = 1/x (hyperbole, jamais définie en 0).</p><h3>6. Résolution d\'équation par le graphique</h3><p>f(x) = k : intersections de la courbe avec la droite y = k.</p>',
      quiz: [
        { q: 'f(x) = 2x + 1. L\'image de 3 est :', choix: ['7', '6', '5'], bon: 0, exp: 'f(3) = 2×3 + 1 = 7.' },
        { q: 'Une image d\'un nombre donné est :', choix: ['Unique', 'Souvent double', 'Quelconque'], bon: 0, exp: 'Par définition, chaque x a une seule image.' },
        { q: 'f(x) = x². f(−4) = ?', choix: ['16', '−16', '−8'], bon: 0, exp: '(−4)² = 16, un carré est toujours positif.' },
        { q: 'La courbe de f(x) = 1/x est :', choix: ['Une hyperbole', 'Une droite', 'Une parabole'], bon: 0, exp: 'La fonction inverse donne une hyperbole.' },
        { q: 'f(x) = 3x − 2 est :', choix: ['Affine', 'Carrée', 'Inverse'], bon: 0, exp: 'De la forme ax + b : fonction affine.' }
      ],
      vf: [
        { q: 'Un nombre peut avoir plusieurs antécédents.', v: true, exp: 'Oui : par ex. 4 a deux antécédents (2 et −2) pour f(x) = x².' },
        { q: 'La fonction carré est toujours croissante.', v: false, exp: 'Elle décroît sur ]−∞;0] puis croît sur [0;+∞[.' },
        { q: 'f(x) = 1/x est définie pour tout nombre.', v: false, exp: 'Elle n\'est pas définie en x = 0.' }
      ]
    },
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
      id: 'pc2-atome', mat: 'physique', niveau: '2de',
      titre: 'L\'atome',
      express: '<li>Un atome = un noyau (protons + neutrons) + des électrons qui tournent autour.</li><li>Protons : charge + ; neutrons : neutres ; électrons : charge −.</li><li>Un atome est électriquement neutre : autant de protons que d\'électrons.</li><li>Le numéro atomique Z = nombre de protons ; A = protons + neutrons.</li><li>L\'atome est essentiellement vide : le noyau est 100 000 fois plus petit que l\'atome.</li>',
      complet: '<h3>1. Structure</h3><p>L\'atome est constitué d\'un noyau central (nucléons : protons et neutrons) entouré d\'un cortège d\'électrons. Le noyau concentre presque toute la masse ; l\'électron est environ 1836 fois plus léger qu\'un proton.</p><h3>2. Charges</h3><p>Proton : +e (e = 1,6×10⁻¹⁹ C). Électron : −e. Neutron : 0. Les charges du noyau attirent les électrons : c\'est l\'interaction électrique qui tient l\'atome.</p><h3>3. Neutralité</h3><p>Un atome a autant d\'électrons que de protons : les charges se compensent. S\'il gagne ou perd des électrons, il devient un ion (anion si −, cation si +).</p><h3>4. Notation</h3><p>On note A le nombre de masse (nucléons) et Z le numéro atomique (protons). Exemple : le carbone 12 a 6 protons, 6 neutrons, 6 électrons.</p><h3>5. Vide atomique</h3><p>Le rayon d\'un atome est ~10⁻¹⁰ m ; celui du noyau ~10⁻¹⁵ m. La matière est surtout du vide.</p><h3>6. Isotopes</h3><p>Même Z, A différents : carbone 12 et carbone 14 sont des isotopes (12 et 14 nucléons, 6 protons chacun).</p>',
      quiz: [
        { q: 'La charge d\'un électron est :', choix: ['Négative', 'Positive', 'Nulle'], bon: 0, exp: 'L\'électron porte une charge −e.' },
        { q: 'Un atome est neutre car :', choix: ['Autant de protons que d\'électrons', 'Autant de neutrons que d\'électrons', 'Il n\'a pas de charge'], bon: 0, exp: 'Les charges + et − se compensent.' },
        { q: 'Le carbone 12 contient :', choix: ['6 protons, 6 neutrons', '12 protons', '6 protons, 12 neutrons'], bon: 0, exp: 'Z = 6, A = 12 → 6 protons et 12−6 = 6 neutrons.' },
        { q: 'Qui concentre la masse de l\'atome ?', choix: ['Le noyau', 'Les électrons', 'Le vide'], bon: 0, exp: 'Protons et neutrons sont ~1836 fois plus lourds que les électrons.' },
        { q: 'Un atome qui perd un électron devient :', choix: ['Un cation', 'Un anion', 'Un isotope'], bon: 0, exp: 'Il lui reste une charge positive : cation.' }
      ],
      vf: [
        { q: 'Le neutron porte une charge positive.', v: false, exp: 'Il est électriquement neutre.' },
        { q: 'Deux isotopes ont le même nombre de protons.', v: true, exp: 'Même Z, A différents.' },
        { q: 'L\'atome est surtout composé de vide.', v: true, exp: 'Le noyau est 100 000 fois plus petit que l\'atome.' }
      ]
    },
    {
      id: 'ph-tle-liberte', mat: 'philo', niveau: 'Tle',
      titre: 'La liberté',
      express: '<li>Être libre : faire ce que l\'on veut, ou agir selon sa propre volonté ?</li><li>Liberté d\'action vs liberté de la volonté.</li><li>Déterminisme : nos actes auraient des causes ; la liberté serait-elle une illusion ?</li><li>Liberté et lois : se limiter pour être libre (Rousseau, Kant).</li><li>Sartre : « l\'homme est condamné à être libre » — nous sommes responsables.</li>',
      complet: '<h3>1. Définir la liberté</h3><p>Premier sens : absence d\'obstacle (liberté d\'action, faire ce que je peux). Deuxième sens : autonomie de la volonté (agir selon des raisons que j\'approuve). Spinoza : croire être libre, c\'est ignorer les causes qui nous déterminent.</p><h3>2. Le défi du déterminisme</h3><p>Si tout a une cause, mes « choix » seraient des effets. Laplace : connaître l\'état de l\'univers à un instant permettrait de prédire tout. Réponse possible : la conscience réfléchit et peut suspendre l\'impulsion.</p><h3>3. Liberté et responsabilité</h3><p>Imputer une action à quelqu\'un suppose qu\'il aurait pu agir autrement. La responsabilité suppose donc la liberté.</p><h3>4. La liberté a besoin de la loi</h3><p>Rousseau : l\'obéissance à la loi qu\'on s\'est prescrite est liberté. Kant : l\'autonomie, c\'est se donner à soi-même sa loi (morale), non obéir à ses penchants. La loi ne détruit pas la liberté, elle la rend possible dans la collectivité.</p><h3>5. L\'existentialisme</h3><p>Sartre : sans nature humaine prédéfinie, nous nous choisissons par nos actes. « L\'homme est condamné à être libre » : impossible de fuir la responsabilité. L\'angoisse en est le revers.</p><h3>6. Sujets classiques</h3><p>« Faire ce que l\'on veut, est-ce être libre ? » / « La liberté est-elle une illusion ? » / « Peut-on être libre en société ? »</p>',
      quiz: [
        { q: 'Pour Sartre, l\'homme est :', choix: ['Condamné à être libre', 'Déterminé par ses gènes', 'Libre seulement en société'], bon: 0, exp: 'Nous ne pouvons pas fuir le choix et la responsabilité.' },
        { q: 'Pour Kant, être autonome c\'est :', choix: ['Se donner sa propre loi', 'Faire ce qu\'on veut', 'Suivre la majorité'], bon: 0, exp: 'Autonomie = se prescrire sa loi morale, non obéir à ses penchants.' },
        { q: 'Spinoza pense que :', choix: ['Nous croyons être libres par ignorance des causes', 'La liberté est prouvée', 'Tout est faux'], bon: 0, exp: 'Le sentiment de liberté vient de l\'ignorance du déterminisme.' },
        { q: 'La responsabilité suppose :', choix: ['Qu\'on aurait pu agir autrement', 'La contrainte', 'L\'ignorance'], bon: 0, exp: 'On ne peut blâmer que celui qui avait le choix.' },
        { q: 'Pour Rousseau, obéir à la loi qu\'on s\'est prescrite est :', choix: ['Une forme de liberté', 'Une soumission', 'Une illusion'], bon: 0, exp: 'La loi que le peuple se donne exprime sa volonté générale.' }
      ],
      vf: [
        { q: 'Le déterminisme affirme que tout événement a une cause.', v: true, exp: 'C\'est le défi principal posé à la liberté.' },
        { q: 'Pour Rousseau, la loi détruit forcément la liberté.', v: false, exp: 'Au contraire, la loi que l\'on se prescrit rend la liberté possible.' },
        { q: 'Liberté d\'action et liberté de la volonté sont identiques.', v: false, exp: 'Pouvoir faire ≠ vouloir de manière autonome.' }
      ]
    }
  ]
};
