/* Révise+ V6 — Logique applicative (design "dashboard" inspiré des maquettes)
   Progression par profil dans localStorage (reviseplus_<profil>). */

var App = (function () {
  // Audio Révise+ : petits sons synthétiques + ambiance musicale facultative
  var AudioFX=(function(){
    var ctx=null, musicOn=localStorage.getItem('rp_music')==='1', timer=null, step=0;
    function audio(){if(!ctx){var C=window.AudioContext||window.webkitAudioContext;if(C)ctx=new C();}if(ctx&&ctx.state==='suspended')ctx.resume();return ctx;}
    function tone(freq,dur,type,vol,delay){var c=audio();if(!c)return;var o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=freq;g.gain.setValueAtTime(.0001,c.currentTime+(delay||0));g.gain.exponentialRampToValueAtTime(vol||.04,c.currentTime+(delay||0)+.025);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+(delay||0)+dur);o.connect(g);g.connect(c.destination);o.start(c.currentTime+(delay||0));o.stop(c.currentTime+(delay||0)+dur+.04);}
    function fx(ok){if(ok){tone(660,.16,'sine',.07);tone(880,.22,'sine',.045,.11);tone(1046,.3,'sine',.035,.22);}else{tone(240,.2,'triangle',.045);tone(190,.25,'triangle',.03,.13);}}
    var notes=[392,494,587,494,440,523,659,523,349,440,523,440];
    function tick(){if(!musicOn)return;var n=notes[step++%notes.length];tone(n,.85,'sine',.012);tone(n/2,.95,'triangle',.008,.02);timer=setTimeout(tick,1250);}
    function set(on){musicOn=!!on;localStorage.setItem('rp_music',musicOn?'1':'0');var b=document.getElementById('musicToggle');if(b){b.textContent=musicOn?'♫':'♪';b.classList.toggle('music-on',musicOn);b.setAttribute('aria-label',musicOn?'Couper la musique':'Activer la musique');}if(timer){clearTimeout(timer);timer=null;}if(musicOn){audio();tick();}}
    function toggle(){set(!musicOn);}
    function init(){var b=document.getElementById('musicToggle');if(b)b.onclick=toggle;set(musicOn);}
    return {fx:fx,init:init,toggle:toggle};
  })();

  var state = { profile: null, niveau: '5e', mat: null, chap: null, tab: 'accueil' };
  var quiz = null;
  var navHistory = [];
  var restoringView = false;
  var MASCOT = { Gabriel: '🚀', Emma: '🐱' };
  var BADGES = [
    { id: 'premier', nom: 'Premier pas', ic: '🥇', test: function (p) { return p.xp >= 10; } },
    { id: 'cent', nom: 'Cent XP', ic: '💯', test: function (p) { return p.xp >= 100; } },
    { id: 'serie', nom: 'Série de 5', ic: '🔥', test: function (p) { return (p.bestStreak || 0) >= 5; } },
    { id: 'parfait', nom: 'Sans faute', ic: '✨', test: function (p) { return p.perfect >= 1; } },
    { id: 'explorateur', nom: 'Explorateur', ic: '🧭', test: function (p) { return Object.keys(p.maitrise || {}).length >= 5; } },
    { id: 'maitre', nom: 'Maître du chapitre', ic: '🎓', test: function (p) { return Object.values(p.maitrise || {}).some(function (m) { return m >= 90; }); } },
    { id: 'chasseur', nom: 'Chasseur de boss', ic: '👾', test: function (p) { return (p.bossWins || 0) >= 1; } }
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
    return { xp: 0, niveau: 1, streak: 0, bestStreak: 0, perfect: 0, bossWins: 0, dailyDate: '', dailyChap: '', badges: [], maitrise: {}, erreurs: {}, derniers: [] };
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

  function saveCurrentView() {
    var el = document.getElementById('view');
    if (!el || !el.innerHTML || restoringView) return;
    navHistory.push({ html: el.innerHTML, state: JSON.parse(JSON.stringify(state)), tab: state.tab, scroll: window.scrollY || 0 });
    if (navHistory.length > 30) navHistory.shift();
  }
  function render(html) {
    saveCurrentView();
    document.getElementById('view').innerHTML = html;
    window.scrollTo(0, 0);
    updateBackButton();
  }
  function updateBackButton() {
    var b = document.getElementById('backBtn');
    if (b) b.classList.toggle('back-ready', navHistory.length > 0 || (state.tab && state.tab !== 'accueil'));
  }
  function handleBack() {
    var drawer = document.getElementById('drawer');
    if (drawer && drawer.classList.contains('open')) { closeDrawer(); return true; }
    if (navHistory.length) {
      var previous = navHistory.pop();
      restoringView = true;
      state = previous.state;
      document.getElementById('view').innerHTML = previous.html;
      setTab(previous.tab || 'accueil');
      updateChip();
      restoringView = false;
      setTimeout(function(){ window.scrollTo(0, previous.scroll || 0); updateBackButton(); }, 0);
      return true;
    }
    if (state.tab && state.tab !== 'accueil') { goTab('accueil'); return true; }
    return false;
  }
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
    navHistory = [];
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
    localStorage.setItem('reviseplus_setup_'+state.profile,'1');
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
      + '<div class="avatar"><img src="' + (state.profile === 'Emma' ? 'images/3d/lumi-fairy-3d.png' : 'images/3d/gabriel-explorer-3d.png') + '" alt=""></div>'
      + '<div class="who"><div class="name">' + (state.profile === 'Emma' ? 'Bienvenue Emma ✨' : 'Prêt pour la mission, Gabriel 🚀') + '</div>'
      + '<div class="cls">' + (state.profile === 'Emma' ? 'Lumi et son chaton sont avec toi !' : 'Nova, ton robot-guide, est prêt !') + '</div>'
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
    var html = '<section class="profile-select">'
      + '<div class="profile-select-head"><div class="eyebrow">Ton aventure commence ici</div><h2>Qui part à la découverte ?</h2><p>Choisis ton univers. Ton compagnon t’attend pour apprendre, jouer et progresser.</p></div>'
      + '<button class="profile-choice gabriel" onclick="chooseProfile(\'Gabriel\')"><img class="profile-art" src="images/3d/gabriel-explorer-3d.png" alt=""><span class="profile-spark">✦</span><span class="profile-copy"><span class="profile-label">Exploration • Galaxie</span><span class="profile-name">Gabriel</span><span class="profile-desc">Cap sur les étoiles avec Nova, ton robot-guide.</span><span class="profile-enter">Entrer dans mon univers <b>↗</b></span></span></button>'
      + '<button class="profile-choice emma" onclick="chooseProfile(\'Emma\')"><img class="profile-art" src="images/3d/lumi-fairy-3d.png" alt=""><span class="profile-spark">✧</span><span class="profile-copy"><span class="profile-label">Magie • Jardin enchanté</span><span class="profile-name">Emma</span><span class="profile-desc">Un monde doux et coloré avec Lumi, ta fée complice.</span><span class="profile-enter">Entrer dans mon univers <b>↗</b></span></span></button>'
      + '<div class="profile-footnote">✨ Deux univers, une aventure à ton rythme</div></section>'
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

  // Lecture pédagogique : texte nettoyé, voix française naturelle si disponible,
  // débit ralenti et ponctuation qui laisse respirer les explications.
  var speechRun = 0;
  function cleanForSpeech(html) {
    var box = document.createElement('div');
    box.innerHTML = html || '';
    var txt = (box.innerText || box.textContent || '').replace(/[→←↑↓↗↘▶►◆★✦✧]/g, ' ');
    return txt
      .replace(/\b(\d+)\s*%/g, '$1 pour cent')
      .replace(/\s+/g, ' ')
      .replace(/\s*([:;])\s*/g, '$1 ')
      .replace(/\s*([.!?])\s*/g, '$1 ')
      .trim();
  }
  function preferredFrenchVoice() {
    if (!window.speechSynthesis) return null;
    var voices = speechSynthesis.getVoices() || [];
    var french = voices.filter(function(v) { return /^fr([-_]|$)/i.test(v.lang || ''); });
    if (!french.length) return null;
    var preferred = french.filter(function(v) {
      return /google|natural|premium|enhanced|neural/i.test(v.name || '');
    });
    return (preferred[0] || french.filter(function(v) {
      return /fr[-_]FR/i.test(v.lang || '');
    })[0] || french[0]);
  }
  function readAloud() {
    var c = chapById(state.chap);
    if (!c) return;
    stopSpeech();
    var txt = cleanForSpeech(c.titre) + '. Petite fiche. ' + cleanForSpeech(c.express);
    var b = document.getElementById('ttsBtn');
    if (window.NativeBridge) {
      // Sur Android, utiliser le moteur natif réglé sur une voix française plus posée.
      window.NativeBridge.speak(txt);
    } else if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
      var run = ++speechRun;
      var u = new SpeechSynthesisUtterance(txt);
      u.lang = 'fr-FR';
      u.rate = 0.84;
      u.pitch = 1.02;
      u.volume = 1;
      var voice = preferredFrenchVoice();
      if (voice) u.voice = voice;
      u.onend = function() { if (run === speechRun && b) { b.textContent = '🔊 Écouter'; b.onclick = readAloud; } };
      speechSynthesis.speak(u);
    } else {
      alert('La lecture audio n\'est pas disponible sur cet appareil.');
    }
    if (b) { b.textContent = '⏹ Arrêter'; b.onclick = stopSpeech; }
  }
  function stopSpeech() {
    speechRun++;
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (window.NativeBridge && window.NativeBridge.stopSpeak) window.NativeBridge.stopSpeak();
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
    var progressPct=Math.round((quiz.i/quiz.qs.length)*100);
    var html = '<div class="quiz-shell '+(quiz.boss?'quiz-boss':'')+'"><div class="quiz-progress-top"><span>'+(quiz.boss?'👾 COMBAT CONTRE LE BOSS':'MISSION EN COURS')+'</span><b>Question '+(quiz.i+1)+' / '+quiz.qs.length+'</b></div><div class="quiz-progress-track"><i style="width:'+progressPct+'%"></i></div><div class="card"><div class="quiz-guardian"><img src="' + (state.profile === 'Emma' ? 'images/3d/lumi-fairy-3d.png' : 'images/3d/gabriel-explorer-3d.png') + '" alt=""><div><b>' + (state.profile === 'Emma' ? 'Lumi te souffle un conseil ✨' : 'Nova est à tes côtés 🤖') + '</b><span>' + (state.profile === 'Emma' ? 'Prends ton temps. Tu as le droit de réfléchir, je reste avec toi !' : 'Analyse les indices. Une erreur est juste une étape vers la réussite !') + '</span></div></div><h3><span class="em">' + quiz.c.icon + '</span>' + quiz.c.titre
      + ' <span style="font-size:0.75rem;opacity:0.7">' + (quiz.i + 1) + '/' + quiz.qs.length + '</span>'
      + (quiz.mode === 1 ? ' <span class="demo-tag">DÉCOUVERTE</span>' : ' <span class="demo-tag">EXPERT</span>') + '</h3>';
    html += '<p style="font-weight:700">' + q.q + '</p>';
    q.choix.forEach(function (ch, idx) {
      html += '<button class="choice" id="ch' + idx + '" onclick="answer(' + idx + ')">' + ch + '</button>';
    });
    html += '<p id="fb" class="hidden"></p></div></div>';
    render(html);
  }

  function answer(idx) {
    var q = quiz.qs[quiz.i];
    var ok = idx === q.bon;
    if (AudioFX) AudioFX.fx(ok);
    var fb = document.getElementById('fb');
    document.getElementById('ch' + q.bon).classList.add('right');
    if (!ok) document.getElementById('ch' + idx).classList.add('wrong');
    fb.classList.remove('hidden');
    fb.innerHTML = '<div class="answer-feedback '+(ok?'feedback-good':'feedback-wrong')+'">'+(ok?'✨ Bien joué !':'💡 On apprend aussi en se trompant !')+'<div class="feedback-explain">'+(q.exp || ('La bonne réponse est : '+q.choix[q.bon]))+'</div><div class="feedback-actions"><button class="btn ghost small" onclick="quizAskWhy()">🤔 Je veux comprendre</button><button class="btn small" onclick="quizNext()">J’ai compris · Suivant →</button></div></div>';
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
    // Le feedback reste affiché jusqu'à ce que l'enfant décide de continuer.
    quiz.waitingNext = true;
  }
  function quizNext(){
    if(!quiz || !quiz.waitingNext)return;
    quiz.waitingNext=false; quiz.i++;
    if(quiz.i<quiz.qs.length)showQuestion();else showResults();
  }
  function quizAskWhy(){
    var q=quiz.qs[quiz.i], txt='Peux-tu m’expliquer simplement cette question : '+q.q+' La correction est : '+(q.exp||q.choix[q.bon]);
    goTab('tuteur');
    setTimeout(function(){var inp=document.getElementById('chatInput');if(inp){inp.value=txt;inp.focus();}},120);
  }

  function showResults() {
    var pct = Math.round(100 * quiz.score / quiz.qs.length);
    var bossWin=!!(quiz.boss && pct>=60);
    var p = load();
    if(bossWin){p.bossWins=(p.bossWins||0)+1;save(p);}
    if (pct === 100) { p.perfect = (p.perfect || 0) + 1; save(p); }
    p = addXP(20 + Math.round(pct / 5) + (bossWin?25:0));
    if (quiz.daily) grantDaily(quiz.c.id);
    var html = '<div class="card stat result-card '+(bossWin?'boss-victory':'')+'"><div class="result-hero">'+(bossWin?'👑':'🏁')+'</div><h3>'+(quiz.boss?(bossWin?'Boss vaincu !':'Le boss résiste encore…'):'Mission terminée')+' — ' + quiz.c.titre + '</h3>'
      + '<span class="n">' + pct + ' %</span>'
      + '<p>' + quiz.score + ' / ' + quiz.qs.length + ' bonnes réponses</p>'
      + '<p>XP total : <b>' + p.xp + '</b> — Niveau ' + p.niveau + '</p>';
    if (pct < 50) html += '<p>💡 Relis la fiche express, puis retente : les questions ratées reviendront !</p>';
    else if (pct < 100) html += '<p>💡 Bien joué ! Passe en mode ⚡ Expert pour viser le sans-faute.</p>';
    else html += '<p>🏆 Sans faute, bravo !</p>';
    if(quiz.boss)html+='<div class="boss-reward">'+(bossWin?'🎉 Boss vaincu : +25 XP bonus et badge Chasseur de boss !':'💪 Tu as déjà appris beaucoup. Reviens défier le boss après une petite révision.')+'</div>';
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
    var emma = state.profile === 'Emma';
    var buddy = emma ? 'Lumi' : 'Nova';
    var html = '<section class="arcade-hero '+(emma?'arcade-emma':'arcade-gabriel')+'">'
      + '<div class="arcade-orb">'+(emma?'<img src="images/3d/lumi-fairy-3d.png" alt="">':'<img src="images/3d/gabriel-explorer-3d.png" alt="">')+'</div><div class="arcade-kicker">TON UNIVERS • ARCADE ÉDUCATIVE</div>'
      + '<h2>Prêt pour la<br><span>mission du jour ?</span></h2>'
      + '<p>'+buddy+' a préparé des défis pour toi. Chaque bonne réponse fait avancer ton aventure !</p>'
      + '<div class="arcade-stats"><span>⚡ '+p.xp+' XP</span><span>🔥 '+(p.bestStreak||0)+' record</span><span>🏅 '+p.badges.length+' badges</span></div></section>';
    html += '<div class="game-mode-grid">'
      + '<button class="game-mode mode-quest" onclick="gamePickChapter(1)"><span class="game-art">🗺️</span><b>Mission découverte</b><small>Apprendre sans pression · questions courtes</small><span class="game-launch">Jouer ↗</span></button>'
      + '<button class="game-mode mode-speed" onclick="gamePickChapter(2)"><span class="game-art">⚡</span><b>Défi éclair</b><small>Enchaîne les bonnes réponses · XP bonus</small><span class="game-launch">Jouer ↗</span></button>'
      + '<button class="game-mode mode-boss" onclick="gamePickChapter(3)"><span class="game-art">👾</span><b>Boss du savoir</b><small>5 questions pour vaincre le boss</small><span class="game-launch">Jouer ↗</span></button>'
      + '<button class="game-mode mode-daily" onclick="doDailyPick()"><span class="game-art">🎯</span><b>Défi quotidien</b><small>Une mission spéciale, chaque jour</small><span class="game-launch">+30 XP ↗</span></button></div>';
    html += '<div class="section-title">Choisis ta planète de connaissances</div><div class="card game-chapter-card"><div id="gameModeStatus" class="game-mode-status">🧭 Mode sélectionné : Mission découverte — choisis une matière pour commencer.</div><p class="game-intro">Chaque matière est une planète. Choisis ton parcours, puis lance ta mission.</p>';
    myMatieres().forEach(function(m){
      var chs=chaptersFor(m.id,state.niveau); if(!chs.length)return;
      html+='<div class="game-subject"><h3>'+m.icon+' '+m.nom+'</h3><div class="game-chapters">';
      chs.forEach(function(c){html+='<button class="game-chapter" onclick="gameStartChapter(\''+c.id+'\',gameModeChosen)">'+c.titre+' <span>▶</span></button>';});
      html+='</div></div>';
    });
    html+='</div><div class="card game-daily">'+dailyChallenge()+'</div>';
    render(html); updateChip();
  }
  var gameModeChosen = 1;
  function gamePickChapter(mode){
    gameModeChosen=mode;
    document.querySelectorAll('.game-mode').forEach(function(b){b.classList.remove('selected');});
    var buttons=document.querySelectorAll('.game-mode');
    if(buttons[mode-1])buttons[mode-1].classList.add('selected');
    var names={1:'Mission découverte — apprendre sans pression',2:'Défi éclair — répondre avec énergie',3:'Boss du savoir — cinq questions pour le boss'};
    var el=document.getElementById('gameModeStatus');
    if(el)el.textContent=(mode===1?'🧭 ':mode===2?'⚡ ':'👾 ')+(names[mode]||'Mission sélectionnée')+'. Choisis ta matière pour commencer.';
    var card=document.querySelector('.game-chapter-card'); if(card)card.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function gameStartChapter(id,mode){ state.chap=id; var c=chapById(id); if(!c)return; var qs=poolFor(c,mode===1?1:2); if(mode===3)qs=qs.slice(0,5); if(!qs.length){alert('Ce chapitre arrive bientôt dans les missions.');return;} quiz={c:c,mode:mode===1?1:2,qs:qs,i:0,score:0,streak:0,boss:mode===3};pushRecent(id);showQuestion(); }
  function doDailyPick(){ var mats=myMatieres().map(function(m){return m.id;});var pool=REVISE_DATA.chapitres.filter(function(c){return mats.indexOf(c.mat)!==-1&&c.niveau===state.niveau;});if(!pool.length)pool=REVISE_DATA.chapitres;var c=pool[Math.floor(Math.random()*pool.length)];doDaily(c.id); }
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
    navHistory = []; state.profile = name;
    document.body.className = name === 'Emma' ? 'theme-emma' : 'theme-gabriel';
    document.querySelector('.logo').textContent = name === 'Emma' ? '🐱' : '🚀';
    localStorage.setItem('reviseplus_currentProfile', name);
    state.niveau = localStorage.getItem('reviseplus_niveau_' + name) || '5e';
    state.mat = null; state.chap = null;
    if(localStorage.getItem('reviseplus_setup_'+name)==='1') viewAccueil(); else viewNiveau();
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
    if (t === 'accueil') { if (window.ReviseHome) window.ReviseHome(); else viewAccueil(); return; }
    if (t === 'cours') { state.mat = null; state.chap = null; viewCours(); return; }
    if (t === 'jeux') { viewJeux(); return; }
    if (t === 'aventure') { if (window.Adventure) Adventure.open(); else viewAccueil(); return; }
    if (t === 'controles') { if (window.Controls) Controls.open(); else viewAccueil(); return; }
    if (t === 'tuteur') { viewTuteur(); return; }
    if (t === 'plus') { viewPlus(); return; }
  }
  function init() {
    document.querySelectorAll('#drawer nav button').forEach(function (b) {
      b.onclick = function () { goTab(b.dataset.tab); };
    });
    document.getElementById('menuBtn').onclick = openDrawer;
    var backBtn = document.getElementById('backBtn'); if (backBtn) backBtn.onclick = handleBack;
    document.getElementById('drawerClose').onclick = closeDrawer;
    document.getElementById('overlay').onclick = closeDrawer;
    document.getElementById('switchProfileBtn').onclick = switchProfile;
    AudioFX.init();
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
    scanAnswer: scanAnswer, handleBack: handleBack, saveCurrentView: saveCurrentView, render: render, setTab: setTab, load: load, addXP: addXP, showFull: function () { document.getElementById('fullCard').classList.remove('hidden'); },
    doDaily: doDaily, showQuestion: showQuestion, quizMode: quizMode,
    viewProgres: viewProgres, viewScan: viewScan, viewPlus: viewPlus, init: init,
    switchProfile: switchProfile, closeDrawer: closeDrawer,
    obLevel: obLevel, toggleMatiere: toggleMatiere, finishOnboarding: finishOnboarding,
    quizFromList: quizFromList
  };
  ['chooseProfile','setLevel','selectSubject','openChapter','startQuiz','answer','goTab','handleBack',
   'backToSubjects','backToChapters','askTutor','saveGateway','resetProgress','readAloud',
   'showFull','pickImages','onFiles','makeFromScan','scanAnswer','doDaily','showQuestion',
   'quizMode','viewProgres','viewScan','viewPlus','switchProfile','obLevel','toggleMatiere',
   'finishOnboarding','quizFromList'].forEach(function (f) { window[f] = pub[f]; });
  return pub;
})();

document.addEventListener('DOMContentLoaded', App.init);
