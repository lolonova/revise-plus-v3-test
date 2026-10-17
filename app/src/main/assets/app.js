/* Révise+ V6 — Logique applicative (design "dashboard" inspiré des maquettes)
   Progression par profil dans localStorage (reviseplus_<profil>). */

var App = (function () {
  var state = { profile: null, niveau: '5e', mat: null, chap: null, tab: 'accueil' };
  var quiz = null;
  var MASCOT = { Gabriel: '🚀', Emma: '🐱' };
  var BADGES = [
    { id: 'premier', nom: 'Premier pas', ic: '🥇', test: function (p) { return p.xp >= 10; } },
    { id: 'cent', nom: 'Cent XP', ic: '💯', test: function (p) { return p.xp >= 100; } },
    { id: 'serie', nom: 'Série de 5', ic: '🔥', test: function (p) { return (p.bestStreak || 0) >= 5; } },
    { id: 'parfait', nom: 'Sans faute', ic: '✨', test: function (p) { return p.perfect >= 1; } },
    { id: 'explorateur', nom: 'Explorateur', ic: '🧭', test: function (p) { return Object.keys(p.maitrise || {}).length >= 5; } },
    { id: 'maitre', nom: 'Maître du chapitre', ic: '🎓', test: function (p) { return Object.values(p.maitrise || {}).some(function (m) { return m >= 90; }); } }
  ];
  var TIPS = [
    'Relis ta fiche express juste avant de dormir : le cerveau consolide la nuit !',
    'Explique le chapitre à quelqu\'un (ou à ton chat) : si tu sais l\'expliquer, c\'est gagné.',
    'Fais des quiz courts mais souvent : mieux vaut 10 minutes chaque jour qu\'1 heure le dimanche.',
    'Écris les formules importantes de mémoire, puis vérifie : c\'est le meilleur test.',
    'Après une erreur, relis l\'explication à voix haute : tu la retiendras mieux.',
    'Levé tôt ? 5 minutes de quiz avant le petit-déjeuner, et ta journée est déjà gagnée !'
  ];

  function key() { return 'reviseplus_' + state.profile; }
  function load() {
    try { return JSON.parse(localStorage.getItem(key())) || fresh(); }
    catch (e) { return fresh(); }
  }
  function fresh() {
    return { xp: 0, niveau: 1, streak: 0, bestStreak: 0, perfect: 0, dailyDate: '', dailyChap: '', badges: [], maitrise: {}, erreurs: {}, derniers: [] };
  }
  function save(p) { localStorage.setItem(key(), JSON.stringify(p)); }

  function addXP(n) {
    var p = load();
    p.xp += n;
    while (p.xp >= p.niveau * 100) { p.xp -= p.niveau * 100; p.niveau++; }
    BADGES.forEach(function (b) {
      if (p.badges.indexOf(b.id) === -1 && b.test(p)) p.badges.push(b.id);
    });
    save(p);
    return p;
  }

  function setMaitrise(chapId, delta) {
    var p = load();
    p.maitrise[chapId] = Math.max(0, Math.min(100, (p.maitrise[chapId] || 0) + delta));
    save(p);
  }
  function pushRecent(chapId) {
    var p = load();
    p.derniers = [chapId].concat((p.derniers || []).filter(function (c) { return c !== chapId; })).slice(0, 3);
    save(p);
  }
  function recordError(chapId, q) {
    var p = load();
    p.erreurs[chapId] = p.erreurs[chapId] || [];
    if (p.erreurs[chapId].indexOf(q) === -1) p.erreurs[chapId].push(q);
    save(p);
  }
  function clearError(chapId, q) {
    var p = load();
    if (p.erreurs[chapId]) {
      var i = p.erreurs[chapId].indexOf(q);
      if (i !== -1) { p.erreurs[chapId].splice(i, 1); save(p); }
    }
  }
  function overallPct(p) {
    var ids = Object.keys(p.maitrise);
    if (!ids.length) return 0;
    var s = ids.reduce(function (a, id) { return a + p.maitrise[id]; }, 0);
    return Math.round(s / ids.length);
  }

  function chaptersFor(mat, niveau) {
    return REVISE_DATA.chapitres.filter(function (c) { return c.mat === mat && c.niveau === niveau; });
  }
  function chapById(id) {
    return REVISE_DATA.chapitres.filter(function (x) { return x.id === id; })[0];
  }

  function render(html) { document.getElementById('view').innerHTML = html; window.scrollTo(0, 0); }
  function setTab(t) {
    state.tab = t;
    document.querySelectorAll('#drawer nav button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.tab === t);
    });
  }
  function openDrawer() {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('overlay').classList.add('open');
  }
  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
  }
  function needProfile() {
    if (state.profile) return false;
    viewAccueil();
    return true;
  }
  function updateChip() {
    var who = document.getElementById('drawerName');
    var sub = document.getElementById('drawerSub');
    var mas = document.getElementById('drawerMascot');
    if (state.profile) {
      var p = load();
      who.textContent = state.profile;
      sub.textContent = 'Classe de ' + state.niveau + ' · ' + overallPct(p) + ' %';
      mas.textContent = MASCOT[state.profile];
    } else {
      who.textContent = 'Révise+';
      sub.textContent = 'Choisir un profil';
      mas.textContent = '🚀';
    }
  }
  function switchProfile() {
    closeDrawer();
    state.profile = null; state.mat = null; state.chap = null;
    localStorage.removeItem('reviseplus_currentProfile');
    viewWelcome();
  }
  function myMatieres() {
    var ids = [];
    try { ids = JSON.parse(localStorage.getItem('reviseplus_matieres_' + state.profile)) || []; } catch (e) { ids = []; }
    if (!ids.length) ids = REVISE_DATA.matieres.map(function (m) { return m.id; });
    return REVISE_DATA.matieres.filter(function (m) { return ids.indexOf(m.id) !== -1; });
  }
  function statutFor(p) {
    if (p.niveau >= 15 || p.xp >= 1500) return { nom: 'Expert', ic: '⭐' };
    if (p.niveau >= 8) return { nom: 'Champion', ic: '🏅' };
    if (p.niveau >= 4) return { nom: 'Apprenti', ic: '💪' };
    return { nom: 'Débutant', ic: '🐣' };
  }
  function onboardingMats() {
    var ids = [];
    try { ids = JSON.parse(localStorage.getItem('reviseplus_matieres_' + state.profile)) || []; } catch (e) { ids = []; }
    if (!ids.length) ids = REVISE_DATA.matieres.map(function (m) { return m.id; });
    return ids;
  }
  function toggleMatiere(id) {
    var ids = onboardingMats();
    var i = ids.indexOf(id);
    if (i === -1) ids.push(id); else ids.splice(i, 1);
    localStorage.setItem('reviseplus_matieres_' + state.profile, JSON.stringify(ids));
    var el = document.getElementById('mats-' + id);
    if (el) el.classList.toggle('sel', i === -1);
    var n = ids.length;
    var btn = document.getElementById('obGo');
    if (btn) { btn.textContent = n ? 'C\'est parti ! (' + n + ' matière' + (n > 1 ? 's' : '') + ') 🚀' : 'Choisis au moins une matière !'; btn.disabled = !n; }
  }
  function finishOnboarding() {
    if (!onboardingMats().length) return;
    viewAccueil();
  }

  // ================= ACCUEIL =================
  function viewAccueil() {
    setTab('accueil');
    if (!state.profile) { viewWelcome(); return; }
    var p = load();
    var pct = overallPct(p);
    var st = statutFor(p);
    var html = '';
    // ===== Mon espace (façon maquette) =====
    html += '<div class="hero espace">'
      + '<div class="avatar">' + MASCOT[state.profile] + '</div>'
      + '<div class="who"><div class="name">Mon espace — ' + state.profile + ' ' + st.ic + '</div>'
      + '<div class="cls">Classe de ' + state.niveau + ' · ' + st.nom + ' · +' + p.xp + ' XP</div>'
      + '<div class="hero-bar"><div style="width:' + pct + '%"></div></div>'
      + '<div class="cls">' + pct + ' % de progression</div></div>'
      + '<div class="ring" style="--p:' + pct + '%"><span>' + pct + '%</span></div></div>';
    html += '<button class="big-cta" onclick="goTab(\'cours\')">Reprendre mes révisions ➜</button>';
    // Derniers chapitres
    html += '<div class="card"><h3><span class="em">🕐</span>Mes derniers chapitres</h3>';
    if (p.derniers && p.derniers.length) {
      html += '<ul class="lastchaps">';
      p.derniers.forEach(function (id) {
        var c = chapById(id);
        if (!c) return;
        var m = p.maitrise[id] || 0;
        var s = m >= 80 ? '<span class="st ok">✔️ Révision terminée</span>' : (m > 0 ? '<span class="st mid">⏳ En cours</span>' : '<span class="st">📖 À étudier</span>');
        html += '<li><b>' + c.titre + '</b> ' + s + '</li>';
      });
      html += '</ul>';
    } else {
      html += '<p style="font-size:0.85rem;opacity:0.75">Commence un chapitre pour remplir ton espace !</p>';
    }
    html += '</div>';
    // ===== Toutes mes fonctions =====
    html += '<div class="section-title">Toutes mes fonctions</div>';
    html += '<div class="grid2 fn-grid">'
      + '<div class="item fn" onclick="goTab(\'cours\')"><span class="ic">📖</span><span class="nm">Apprendre</span><div class="sub">Mes révisions</div></div>'
      + '<div class="item fn" onclick="goTab(\'jeux\')"><span class="ic">🎮</span><span class="nm">Jouer</span><div class="sub">Quiz & défis</div></div>'
      + '<div class="item fn" onclick="goTab(\'plus\');viewProgres()"><span class="ic">📊</span><span class="nm">Progresser</span><div class="sub">Mes progrès</div></div>'
      + '<div class="item fn" onclick="goTab(\'jeux\')"><span class="ic">🏆</span><span class="nm">Réussir</span><div class="sub">Défi du jour</div></div>'
      + '<div class="item fn" onclick="goTab(\'tuteur\')"><span class="ic">🤖</span><span class="nm">Mon tuteur</span><div class="sub">Poser une question</div></div>'
      + '<div class="item fn" onclick="goTab(\'plus\');viewScan()"><span class="ic">📷</span><span class="nm">Scanner</span><div class="sub">Créer une fiche</div></div>'
      + '</div>';
    // Défi + astuce
    html += '<div class="section-title">Chaque jour compte</div>';
    html += '<div class="card">'
      + '<h3><span class="em">🎯</span>Défi du jour</h3>' + dailyChallenge() + ''
      + '<h3 style="margin-top:12px"><span class="em">💡</span>Astuce du jour</h3>'
      + '<div class="tip">' + TIPS[new Date().getDate() % TIPS.length] + '</div>'
      + '</div>';
    render(html);
    updateChip();
  }

  function viewWelcome() {
    var html = '<div class="card"><h3><span class="em">👋</span>Bienvenue sur Révise+ !</h3>'
      + '<p>Réussir pas à pas, du collège au lycée. Choisis ton profil :</p>'
      + '<div class="grid2">'
      + '<div class="item" onclick="chooseProfile(\'Gabriel\')"><span class="ic">🚀</span><span class="nm">Gabriel</span><div class="sub">Univers galaxie</div></div>'
      + '<div class="item" onclick="chooseProfile(\'Emma\')"><span class="ic">🐱</span><span class="nm">Emma</span><div class="sub">Univers kawaii</div></div>'
      + '</div></div>'
      + '<div class="card"><h3><span class="em">✨</span>Comment ça marche ?</h3><ul>'
      + '<li>Choisis ta classe et révise avec des fiches (express et complètes).</li>'
      + '<li>Écoute-les avec le bouton 🔊 si tu préfères.</li>'
      + '<li>Joue aux quiz : ils s\'adaptent à tes erreurs, et tu gagnes XP et badges.</li>'
      + '<li>Chaque profil garde sa progression : Gabriel et Emma ne se mélangent jamais !</li>'
      + '</ul></div>';
    render(html);
    updateChip();
  }

  // ================= ONBOARDING =================
  function viewNiveau() {
    setTab('accueil');
    var html = '<div class="card"><h3><span class="em">' + MASCOT[state.profile] + '</span>Salut ' + state.profile + ' !</h3>'
      + '<p>En quelle classe es-tu cette année ?</p>'
      + '<div class="grid3">';
    REVISE_DATA.niveaux.forEach(function (n) {
      html += '<div class="item' + (state.niveau === n ? ' sel' : '') + '" onclick="obLevel(\'' + n + '\')"><span class="ic">🎓</span><span class="nm" style="font-size:1.1rem">' + n + '</span></div>';
    });
    html += '</div></div>';
    render(html);
    updateChip();
  }
  function obLevel(n) {
    state.niveau = n;
    localStorage.setItem('reviseplus_niveau_' + state.profile, n);
    viewMatiereChoice();
  }
  function viewMatiereChoice() {
    var ids = onboardingMats();
    var n = ids.length;
    var html = '<div class="card"><h3><span class="em">📚</span>Classe de ' + state.niveau + ' — tes matières</h3>'
      + '<p style="font-size:0.88rem">Coche les matières que tu veux réviser avec ' + MASCOT[state.profile] + '</p>'
      + '<div class="grid2">';
    REVISE_DATA.matieres.forEach(function (m) {
      var sel = ids.indexOf(m.id) !== -1;
      html += '<div class="item' + (sel ? ' sel' : '') + '" id="mats-' + m.id + '" onclick="toggleMatiere(\'' + m.id + '\')">'
        + '<span class="ic">' + m.icon + '</span><span class="nm">' + m.nom + '</span>'
        + '<div class="sub">' + (sel ? '✔️ Choisie' : 'Toucher pour choisir') + '</div></div>';
    });
    html += '</div>'
      + '<button class="btn gold" style="width:100%;margin-top:12px" id="obGo" onclick="finishOnboarding()">C\'est parti ! (' + n + ' matière' + (n > 1 ? 's' : '') + ') 🚀</button>'
      + '</div>';
    render(html);
    updateChip();
  }

  // ================= RÉVISIONS =================
  function viewCours() {
    setTab('cours');
    if (needProfile()) return;
    if (state.chap) { viewChapitre(state.chap); return; }
    if (state.mat) { viewMatiere(state.mat); return; }
    var p = load();
    var html = '<div class="card"><h3><span class="em">🎓</span>Ma classe</h3><div class="grid3">';
    REVISE_DATA.niveaux.forEach(function (n) {
      html += '<div class="item' + (state.niveau === n ? ' sel' : '') + '" onclick="setLevel(\'' + n + '\')"><span class="nm" style="font-size:1rem">' + n + '</span></div>';
    });
    html += '</div></div>';
    html += '<div class="card"><h3><span class="em">📚</span>Mes matières — classe de ' + state.niveau + '</h3><div class="grid2">';
    myMatieres().forEach(function (m) {
      var chs = chaptersFor(m.id, state.niveau);
      var done = chs.filter(function (c) { return (p.maitrise[c.id] || 0) >= 50; }).length;
      html += '<div class="item" onclick="selectSubject(\'' + m.id + '\')">'
        + '<span class="ic">' + m.icon + '</span><span class="nm">' + m.nom.split('-')[0] + '</span>'
        + '<div class="sub">' + done + '/' + chs.length + ' validés</div></div>';
    });
    html += '</div></div>';
    render(html);
    updateChip();
  }

  function viewMatiere(mat) {
    var m = REVISE_DATA.matieres.filter(function (x) { return x.id === mat; })[0];
    var chs = chaptersFor(mat, state.niveau);
    var p = load();
    var html = '<span class="back" onclick="backToSubjects()">← Toutes les matières</span>';
    html += '<div class="card"><h3><span class="em">' + m.icon + '</span>' + m.nom + ' — ' + state.niveau + '</h3>';
    chs.forEach(function (c) {
      var mt = p.maitrise[c.id] || 0;
      html += '<div class="item" style="text-align:left;margin:9px 0;display:flex;align-items:center;gap:10px" onclick="openChapter(\'' + c.id + '\')">'
        + '<div style="flex:1"><b>' + c.titre + '</b><div class="progress" style="margin-top:6px"><div style="width:' + mt + '%"></div></div></div>'
        + '<div style="font-weight:800;font-size:0.85rem;color:var(--accent)">' + mt + ' %</div></div>';
    });
    html += '</div>';
    render(html);
  }

  function viewChapitre(id) {
    var c = chapById(id);
    var html = '<span class="back" onclick="backToChapters()">← ' + c.titre + '</span>';
    html += '<div class="card"><h3>' + c.titre + ' <button class="btn small" onclick="readAloud()" id="ttsBtn">🔊 Écouter</button></h3>';
    html += '<h4>Fiche express</h4><ul>' + c.express + '</ul>';
    html += '<button class="btn" onclick="showFull()">📖 Fiche complète</button> '
      + '<button class="btn ghost" onclick="startQuiz(1)">🧭 Découverte</button> '
      + '<button class="btn gold" onclick="startQuiz(2)">⚡ Expert</button>';
    html += '</div><div class="card hidden" id="fullCard"><h4>Fiche complète</h4>' + c.complet + '</div>';
    render(html);
  }

  function readAloud() {
    var c = chapById(state.chap);
    var txt = c.titre + '. ' + c.express.replace(/<li>/g, ' ').replace(/<\/li>/g, '. ');
    stopSpeech();
    if (window.NativeBridge) { window.NativeBridge.speak(txt); }
    else if (window.speechSynthesis) {
      var u = new SpeechSynthesisUtterance(txt); u.lang = 'fr-FR';
      speechSynthesis.speak(u);
    } else { alert('La lecture audio n\'est pas disponible.'); }
    var b = document.getElementById('ttsBtn');
    if (b) { b.textContent = '⏹ Stop'; b.onclick = stopSpeech; }
  }
  function stopSpeech() {
    if (window.NativeBridge) window.NativeBridge.stopSpeak();
    if (window.speechSynthesis) speechSynthesis.cancel();
    var b = document.getElementById('ttsBtn');
    if (b) { b.textContent = '🔊 Écouter'; b.onclick = readAloud; }
  }

  // ================= QUIZ =================
  function poolFor(c, mode) {
    var p = load();
    var all = c.quiz.concat(c.vf.map(function (v) {
      return { q: v.q, choix: ['Vrai', 'Faux'], bon: v.v ? 0 : 1, exp: v.exp, vf: true };
    }));
    var errs = (p.erreurs[c.id] || []).map(function (q) {
      return all.filter(function (x) { return x.q === q; })[0];
    }).filter(Boolean);
    if (errs.length && Math.random() < 0.5) return errs.slice(0, 5);
    if (mode === 1) return shuffle(all).slice(0, Math.ceil(all.length / 2));
    return shuffle(all);
  }
  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function startQuiz(mode) {
    var c = chapById(state.chap);
    quiz = { c: c, mode: mode, qs: poolFor(c, mode), i: 0, score: 0, streak: 0 };
    pushRecent(c.id);
    setTab('jeux');
    showQuestion();
  }

  function showQuestion() {
    var q = quiz.qs[quiz.i];
    var html = '<div class="card"><h3><span class="em">' + quiz.c.icon + '</span>' + quiz.c.titre
      + ' <span style="font-size:0.75rem;opacity:0.7">' + (quiz.i + 1) + '/' + quiz.qs.length + '</span>'
      + (quiz.mode === 1 ? ' <span class="demo-tag">DÉCOUVERTE</span>' : ' <span class="demo-tag">EXPERT</span>') + '</h3>';
    html += '<p style="font-weight:700">' + q.q + '</p>';
    q.choix.forEach(function (ch, idx) {
      html += '<button class="choice" id="ch' + idx + '" onclick="answer(' + idx + ')">' + ch + '</button>';
    });
    html += '<p id="fb" class="hidden"></p></div>';
    render(html);
  }

  function answer(idx) {
    var q = quiz.qs[quiz.i];
    var ok = idx === q.bon;
    var fb = document.getElementById('fb');
    document.getElementById('ch' + q.bon).classList.add('right');
    if (!ok) document.getElementById('ch' + idx).classList.add('wrong');
    fb.classList.remove('hidden');
    fb.innerHTML = ok ? '✅ Bravo ! ' + (q.exp || '') : '❌ ' + (q.exp || 'Réponse : ' + q.choix[q.bon]);
    for (var k = 0; k < q.choix.length; k++) document.getElementById('ch' + k).onclick = null;
    var p = load();
    if (ok) {
      quiz.score++; quiz.streak++;
      p.streak = Math.max(p.streak || 0, quiz.streak);
      p.bestStreak = Math.max(p.bestStreak || 0, quiz.streak);
      setMaitrise(quiz.c.id, quiz.mode === 1 ? 8 : 12);
      clearError(quiz.c.id, q.q);
      addXP(quiz.mode === 1 ? 5 : 10);
    } else {
      quiz.streak = 0;
      p.streak = 0; save(p);
      setMaitrise(quiz.c.id, quiz.mode === 1 ? -8 : -12);
      recordError(quiz.c.id, q.q);
    }
    setTimeout(function () {
      quiz.i++;
      if (quiz.i < quiz.qs.length) showQuestion(); else showResults();
    }, 1500);
  }

  function showResults() {
    var pct = Math.round(100 * quiz.score / quiz.qs.length);
    var p = load();
    if (pct === 100) { p.perfect = (p.perfect || 0) + 1; save(p); }
    p = addXP(20 + Math.round(pct / 5));
    if (quiz.daily) grantDaily(quiz.c.id);
    var html = '<div class="card stat"><h3><span class="em">🏁</span>Résultat — ' + quiz.c.titre + '</h3>'
      + '<span class="n">' + pct + ' %</span>'
      + '<p>' + quiz.score + ' / ' + quiz.qs.length + ' bonnes réponses</p>'
      + '<p>XP total : <b>' + p.xp + '</b> — Niveau ' + p.niveau + '</p>';
    if (pct < 50) html += '<p>💡 Relis la fiche express, puis retente : les questions ratées reviendront !</p>';
    else if (pct < 100) html += '<p>💡 Bien joué ! Passe en mode ⚡ Expert pour viser le sans-faute.</p>';
    else html += '<p>🏆 Sans faute, bravo !</p>';
    html += '<button class="btn" onclick="startQuiz(quizMode())">🔄 Rejouer</button> '
      + '<button class="btn ghost" onclick="goTab(\'plus\');viewProgres()">📊 Mes progrès</button> '
      + '<button class="btn ghost" onclick="backToChapters()">📖 Retour au cours</button></div>';
    render(html);
  }
  function quizMode() { return quiz ? quiz.mode : 1; }

  // ================= DÉFI DU JOUR =================
  function dailyChallenge() {
    var p = load();
    var today = new Date().toISOString().slice(0, 10);
    if (p.dailyDate === today) return '<div class="daily">✅ Défi du jour réussi ! Reviens demain pour un nouveau. +30 XP déjà gagnés.</div>';
    var mats = myMatieres().map(function (m) { return m.id; });
    var pool = REVISE_DATA.chapitres.filter(function (c) { return mats.indexOf(c.mat) !== -1; });
    if (!pool.length) pool = REVISE_DATA.chapitres;
    var seed = new Date().getDate() * 7 + new Date().getMonth() * 3;
    var c = pool[seed % pool.length];
    return '<div class="daily">🎯 Réussir un quiz du chapitre <b>' + c.titre + '</b> (' + c.niveau + '). Bonus : +30 XP !</div>'
      + '<button class="btn small" onclick="doDaily(\'' + c.id + '\')">Relever le défi</button>';
  }
  function doDaily(chapId) {
    state.chap = chapId;
    var c = chapById(chapId);
    quiz = { c: c, mode: 1, qs: poolFor(c, 1), i: 0, score: 0, streak: 0, daily: true };
    pushRecent(chapId);
    setTab('jeux');
    showQuestion();
  }
  function grantDaily(chapId) {
    var p = load();
    var today = new Date().toISOString().slice(0, 10);
    if (p.dailyDate !== today) {
      p.dailyDate = today; save(p);
      addXP(30);
    }
  }

  // ================= PLUS (progrès, scan, réglages) =================
  function viewPlus() {
    setTab('plus');
    if (needProfile()) return;
    var p = load();
    var html = '<div class="grid2">'
      + '<div class="item" onclick="viewProgres()"><span class="ic">📊</span><span class="nm">Mes progrès</span></div>'
      + '<div class="item" onclick="viewScan()"><span class="ic">📷</span><span class="nm">Scanner un cours</span></div>'
      + '</div>';
    html += '<div class="card"><h3><span class="em">🏅</span>Badges</h3><div style="text-align:center">';
    BADGES.forEach(function (b) {
      var got = p.badges.indexOf(b.id) !== -1;
      html += '<span class="badge" style="' + (got ? '' : 'opacity:0.3;filter:grayscale(1)') + '" title="' + b.nom + '">' + b.ic + '</span>';
    });
    html += '</div><p style="text-align:center;font-size:0.78rem;opacity:0.75">' + p.badges.length + ' / ' + BADGES.length + ' obtenus</p></div>';
    render(html);
    updateChip();
  }

  function viewProgres() {
    setTab('plus');
    if (needProfile()) return;
    var p = load();
    var html = '<span class="back" onclick="viewPlus()">← Plus</span>';
    html += '<div class="card"><h3><span class="em">📈</span>Progression de ' + state.profile + '</h3>'
      + '<div class="grid3">'
      + '<div class="stat"><span class="n">' + p.niveau + '</span>niveau</div>'
      + '<div class="stat"><span class="n">' + p.xp + '</span>XP</div>'
      + '<div class="stat"><span class="n">' + overallPct(p) + '%</span>global</div>'
      + '</div></div>';
    html += '<div class="card"><h3><span class="em">🎯</span>Maîtrise par chapitre</h3>';
    var any = false;
    Object.keys(p.maitrise).forEach(function (id) {
      var c = chapById(id);
      if (!c) return;
      any = true;
      html += '<p style="margin:8px 0">' + c.titre + ' (' + c.niveau + ')<div class="progress" style="margin-top:5px"><div style="width:' + p.maitrise[id] + '%"></div></div><small>' + p.maitrise[id] + ' %</small></p>';
    });
    if (!any) html += '<p style="font-size:0.85rem;opacity:0.75">Commence un quiz pour voir ta maîtrise progresser !</p>';
    html += '</div>';
    html += '<div class="card"><h3><span class="em">⚙️</span>Réglages</h3>'
      + '<p>Profil : <b>' + state.profile + '</b></p>'
      + '<button class="btn small ghost" onclick="switchProfile()">🔄 Changer de profil</button> '
      + '<button class="btn small ghost" onclick="resetProgress()">Réinitialiser ma progression</button>'
      + '<h3 style="margin-top:12px"><span class="em">🤖</span>Tuteur</h3>'
      + '<p>Mode actuel : ' + (Tutor.mode() === 'IA' ? '<b>IA</b> (passerelle parentale)' : '<span class="demo-tag">DÉMONSTRATION</span> (base locale, pas une IA)') + '</p>'
      + '<input type="text" id="gwInput" placeholder="URL du worker Cloudflare (parent)" value="' + (localStorage.getItem('reviseplus_gateway') || '').replace(/"/g, '&quot;') + '">'
      + '<button class="btn small" onclick="saveGateway()">Enregistrer</button></div>';
    render(html);
  }

  function viewScan() {
    setTab('plus');
    if (needProfile()) return;
    var html = '<span class="back" onclick="viewPlus()">← Plus</span>';
    html += '<div class="card"><h3><span class="em">📷</span>Scanner un cours</h3>'
      + '<p style="font-size:0.9rem">Prends une photo nette de ta fiche ou de ton cahier. L\'app extrait le texte (OCR), tu vérifies, puis elle génère une fiche express et un mini-quiz.</p>'
      + '<div class="warn">Fiches générées automatiquement : relis-les toujours, elles peuvent contenir des erreurs !</div>'
      + '<button class="btn" onclick="pickImages()">Choisir des photos</button>'
      + '<input type="file" id="scanFiles" accept="image/*" multiple class="hidden" onchange="onFiles(this.files)">'
      + '<div id="scanStatus"></div></div>'
      + '<div class="card hidden" id="scanText"><h3>Texte extrait (à vérifier)</h3><textarea id="scanEdit" rows="6"></textarea><button class="btn small" onclick="makeFromScan()">Générer la fiche et le quiz</button></div>'
      + '<div id="scanOut"></div>';
    render(html);
  }
  function pickImages() { document.getElementById('scanFiles').click(); }
  function onFiles(files) {
    if (!files || !files.length) return;
    var st = document.getElementById('scanStatus');
    st.innerHTML = '<p>⏳ Lecture de la photo (OCR)... 10 à 30 secondes.</p>';
    var all = [];
    var done = 0;
    Array.prototype.forEach.call(files, function (f, i) {
      Scan.runOCR(f,
        function (pr) { st.innerHTML = '<p>⏳ OCR image ' + (i + 1) + ' : ' + Math.round(pr * 100) + ' %</p>'; },
        function (txt) {
          all.push(txt); done++;
          if (done === files.length) {
            Scan.setText(all.join('\n'));
            document.getElementById('scanText').classList.remove('hidden');
            document.getElementById('scanEdit').value = Scan.getText();
            st.innerHTML = '<p>✅ Texte extrait. Vérifie-le et corrige-le ci-dessous.</p>';
          }
        },
        function (err) { done++; st.innerHTML = '<p>❌ ' + err + '</p>'; });
    });
  }
  function makeFromScan() {
    var txt = document.getElementById('scanEdit').value;
    Scan.setText(txt);
    var html = Scan.buildExpress(txt);
    var qs = Scan.buildQuiz(txt, 4);
    html += '<div class="card"><h3><span class="em">❓</span>Mini-quiz généré</h3>';
    if (!qs.length) html += '<p style="font-size:0.88rem">Pas assez de texte pour un quiz. Ajoute des lignes du type « Terme : définition ».</p>';
    qs.forEach(function (q, qi) {
      html += '<p><b>' + q.q + '</b></p>';
      q.choix.forEach(function (c, ci) {
        html += '<button class="choice" onclick="scanAnswer(this,' + qi + ',' + ci + ')">' + c + '</button>';
      });
    });
    html += '</div>';
    document.getElementById('scanOut').innerHTML = html;
    window._scanQuiz = qs;
  }
  function scanAnswer(btn, qi, ci) {
    var q = window._scanQuiz[qi];
    var ok = ci === q.correct;
    btn.classList.add(ok ? 'right' : 'wrong');
    alert(ok ? '✅ Exact !' : '❌ ' + q.explain);
    if (ok) addXP(3);
  }
  function resetProgress() {
    if (confirm('Effacer toute la progression de ' + state.profile + ' ?')) {
      localStorage.removeItem(key());
      alert('Progression réinitialisée.');
      viewAccueil();
    }
  }
  function saveGateway() {
    var v = document.getElementById('gwInput').value;
    Tutor.setGateway(v);
    alert(v ? 'Mode IA activé (si l\'URL est valide).' : 'Retour au mode démonstration.');
    viewProgres();
  }

  // ================= JEUX =================
  function viewJeux() {
    setTab('jeux');
    if (needProfile()) return;
    var p = load();
    var html = '<div class="card"><h3><span class="em">🎮</span>Mes jeux</h3>'
      + '<p style="font-size:0.9rem">Choisis un chapitre dans <b>Mes révisions</b>, puis lance :</p>'
      + '<ul><li><b>🧭 Découverte</b> : la moitié des questions, pour apprendre en douceur.</li>'
      + '<li><b>⚡ Expert</b> : toutes les questions, XP doublés, maîtrise qui grimpe plus vite.</li>'
      + '<li>Les questions ratées reviennent te challenger : c\'est l\'entraînement espacé !</li></ul>'
      + '<div class="grid3">'
      + '<div class="stat"><span class="n">' + p.xp + '</span>XP</div>'
      + '<div class="stat"><span class="n">' + (p.bestStreak || 0) + '</span>record</div>'
      + '<div class="stat"><span class="n">' + p.badges.length + '</span>badges</div>'
      + '</div></div>';
    html += '<div class="card"><h3><span class="em">🎯</span>Défi du jour</h3>' + dailyChallenge() + '</div>';
    // Choix direct d'un chapitre à jouer
    html += '<div class="card"><h3><span class="em">🎯</span>Jouer avec un chapitre</h3>'
      + '<p style="font-size:0.85rem;opacity:0.8">Tes matières — classe de ' + state.niveau + ' :</p>';
    myMatieres().forEach(function (m) {
      var chs = chaptersFor(m.id, state.niveau);
      if (!chs.length) return;
      html += '<p style="margin:10px 0 4px;font-weight:800">' + m.icon + ' ' + m.nom + '</p>';
      chs.forEach(function (c) {
        html += '<button class="choice" onclick="quizFromList(\'' + c.id + '\')">' + c.titre + '</button>';
      });
    });
    html += '</div>';
    render(html);
    updateChip();
  }
  function quizFromList(chapId) {
    state.chap = chapId;
    var c = chapById(chapId);
    quiz = { c: c, mode: 1, qs: poolFor(c, 1), i: 0, score: 0, streak: 0 };
    pushRecent(chapId);
    showQuestion();
  }

  // ================= TUTEUR =================
  function viewTuteur() {
    setTab('tuteur');
    if (needProfile()) return;
    var html = '<div class="card"><h3><span class="em">🤖</span>Mon tuteur ' + (Tutor.mode() === 'IA' ? '' : '<span class="demo-tag">MODE DÉMONSTRATION</span>') + '</h3>';
    if (Tutor.mode() !== 'IA') html += '<p style="font-size:0.8rem;opacity:0.8">En mode démo, je réponds sur quelques notions (fractions, Pythagore, atome, équations, Révolution...). Ce n\'est pas une IA : un parent peut activer le mode IA (voir Réglages).</p>';
    html += '<div id="chatlog"></div>'
      + '<input type="text" id="chatInput" placeholder="Pose ta question de cours..." onkeydown="if(event.key===\'Enter\')askTutor()">'
      + '<button class="btn" onclick="askTutor()">Envoyer</button></div>';
    render(html);
    Tutor.history.forEach(function (m) { appendMsg(m.role, m.text); });
  }
  function appendMsg(role, text) {
    var log = document.getElementById('chatlog');
    if (!log) return;
    var d = document.createElement('div');
    d.className = 'msg ' + (role === 'user' ? 'user' : 'bot');
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  }
  function askTutor() {
    var inp = document.getElementById('chatInput');
    var txt = inp.value.trim();
    if (!txt) return;
    inp.value = '';
    appendMsg('user', txt);
    appendMsg('bot', '...');
    Tutor.send(txt, function (a) {
      var log = document.getElementById('chatlog');
      log.lastChild.textContent = a;
      addXP(2);
    });
  }

  // ================= NAVIGATION =================
  function chooseProfile(name) {
    state.profile = name;
    document.body.className = name === 'Emma' ? 'theme-emma' : 'theme-gabriel';
    document.querySelector('.logo').textContent = name === 'Emma' ? '🐱' : '🚀';
    localStorage.setItem('reviseplus_currentProfile', name);
    state.niveau = localStorage.getItem('reviseplus_niveau_' + name) || '5e';
    state.mat = null; state.chap = null;
    viewNiveau();
  }
  function setLevel(n) {
    state.niveau = n;
    if (state.profile) localStorage.setItem('reviseplus_niveau_' + state.profile, n);
    state.mat = null; state.chap = null; viewCours();
  }
  function selectSubject(m) { state.mat = m; viewMatiere(m); }
  function openChapter(id) { state.chap = id; viewChapitre(id); }
  function backToSubjects() { state.mat = null; state.chap = null; viewCours(); }
  function backToChapters() { state.chap = null; state.mat = null; viewCours(); }
  function goTab(t) {
    closeDrawer();
    if (t === 'accueil') { viewAccueil(); return; }
    if (t === 'cours') { state.mat = null; state.chap = null; viewCours(); return; }
    if (t === 'jeux') { viewJeux(); return; }
    if (t === 'tuteur') { viewTuteur(); return; }
    if (t === 'plus') { viewPlus(); return; }
  }
  function init() {
    document.querySelectorAll('#drawer nav button').forEach(function (b) {
      b.onclick = function () { goTab(b.dataset.tab); };
    });
    document.getElementById('menuBtn').onclick = openDrawer;
    document.getElementById('drawerClose').onclick = closeDrawer;
    document.getElementById('overlay').onclick = closeDrawer;
    document.getElementById('switchProfileBtn').onclick = switchProfile;
    var cur = localStorage.getItem('reviseplus_currentProfile');
    if (cur === 'Gabriel' || cur === 'Emma') {
      state.niveau = localStorage.getItem('reviseplus_niveau_' + cur) || '5e';
      state.profile = cur;
      document.body.className = cur === 'Emma' ? 'theme-emma' : 'theme-gabriel';
      document.querySelector('.logo').textContent = cur === 'Emma' ? '🐱' : '🚀';
      viewAccueil();
    } else {
      viewWelcome();
    }
  }

  var pub = {
    chooseProfile: chooseProfile, setLevel: setLevel, selectSubject: selectSubject,
    openChapter: openChapter, startQuiz: startQuiz, answer: answer, goTab: goTab,
    backToSubjects: backToSubjects, backToChapters: backToChapters, askTutor: askTutor,
    saveGateway: saveGateway, resetProgress: resetProgress, readAloud: readAloud,
    pickImages: pickImages, onFiles: onFiles, makeFromScan: makeFromScan,
    scanAnswer: scanAnswer, showFull: function () { document.getElementById('fullCard').classList.remove('hidden'); },
    doDaily: doDaily, showQuestion: showQuestion, quizMode: quizMode,
    viewProgres: viewProgres, viewScan: viewScan, viewPlus: viewPlus, init: init,
    switchProfile: switchProfile, closeDrawer: closeDrawer,
    obLevel: obLevel, toggleMatiere: toggleMatiere, finishOnboarding: finishOnboarding,
    quizFromList: quizFromList
  };
  ['chooseProfile','setLevel','selectSubject','openChapter','startQuiz','answer','goTab',
   'backToSubjects','backToChapters','askTutor','saveGateway','resetProgress','readAloud',
   'showFull','pickImages','onFiles','makeFromScan','scanAnswer','doDaily','showQuestion',
   'quizMode','viewProgres','viewScan','viewPlus','switchProfile','obLevel','toggleMatiere',
   'finishOnboarding','quizFromList'].forEach(function (f) { window[f] = pub[f]; });
  return pub;
})();

document.addEventListener('DOMContentLoaded', App.init);
