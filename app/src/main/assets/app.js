/* Diagnostic ciblé : capturer toute exception pendant la construction du moteur App. */
try {
/* Révise+ V6 — Logique applicative (design "dashboard" inspiré des maquettes)
   Progression par profil dans localStorage (reviseplus_<profil>). */

var App = (function () {
  // Audio Révise+ : petits sons synthétiques + ambiance musicale facultative
  var AudioFX=(function(){
    var ctx=null, musicOn=localStorage.getItem('rp_music')==='1', timer=null, step=0;
    function audio(){if(!ctx){var C=window.AudioContext||window.webkitAudioContext;if(C)ctx=new C();}if(ctx&&ctx.state==='suspended')ctx.resume();return ctx;}
    function tone(freq,dur,type,vol,delay){var c=audio();if(!c)return;var o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=freq;g.gain.setValueAtTime(.0001,c.currentTime+(delay||0));g.gain.exponentialRampToValueAtTime(vol||.04,c.currentTime+(delay||0)+.025);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+(delay||0)+dur);o.connect(g);g.connect(c.destination);o.start(c.currentTime+(delay||0));o.stop(c.currentTime+(delay||0)+dur+.04);}
    function fx(ok){if(ok){tone(660,.16,'sine',.07);tone(880,.22,'sine',.045,.11);tone(1046,.3,'sine',.035,.22);}else{tone(240,.2,'triangle',.045);tone(190,.25,'triangle',.03,.13);}}
    // Ambiance plus solaire : arpèges majeurs, basse légère et petite mélodie ascendante.
    var chords=[[261.63,329.63,392.00],[220.00,261.63,329.63],[174.61,220.00,261.63],[196.00,246.94,293.66]];
    var melody=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,523.25,659.25,783.99,1046.5,783.99,659.25,587.33,523.25];
    function tick(){
      if(!musicOn)return;
      var beat=step++, chord=chords[Math.floor(beat/4)%chords.length], note=melody[beat%melody.length];
      tone(chord[beat%3],.24,'triangle',.018);
      if(beat%4===0)tone(chord[0]/2,.42,'sine',.026,.01);
      tone(note,.20,'sine',.014,.04);
      timer=setTimeout(tick,310);
    }
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
    var p=load(), emma=state.profile==='Emma';
    var buddy=emma?'Lumi':'Nova';
    var art=emma?'images/3d/lumi-fairy-3d.png':'images/3d/gabriel-explorer-3d.png';
    var pct=overallPct(p), ad={};
    try{ad=JSON.parse(localStorage.getItem('reviseplus_adventure_'+state.profile)||'{}');}catch(e){}
    var world=emma?'Jardin enchanté':'Base orbitale';
    var greeting=emma?'Ton royaume a besoin de toi !':'Une nouvelle mission t’attend, explorateur !';
    var html='<style>'
      +'#view{padding:0!important;margin:0!important}.home-world{--accent:'+(emma?'#ff8bbd':'#62d5ff')+';position:relative;isolation:isolate;min-height:calc(100dvh - 118px);height:calc(100dvh - 118px);max-height:900px;overflow:hidden;border-radius:26px;padding:clamp(12px,3vw,22px);box-sizing:border-box;color:#fff;background:'+(emma?'radial-gradient(ellipse at 80% 12%,#ffb9d9 0,transparent 35%),linear-gradient(155deg,#4c2e79,#a84e9a 55%,#f08d9e)':'radial-gradient(ellipse at 80% 10%,#2e8ec0 0,transparent 38%),linear-gradient(155deg,#071b3b,#123c70 58%,#176c8b)')+';display:flex;flex-direction:column;gap:clamp(7px,1.4vh,14px);}'
      +'.home-world:before,.home-world:after{content:"";position:absolute;z-index:-1;border-radius:50%;pointer-events:none}.home-world:before{width:65vw;height:65vw;max-width:390px;max-height:390px;right:-18%;top:15%;background:radial-gradient(circle,#ffffff20,transparent 68%);animation:homePulse 5s ease-in-out infinite}.home-world:after{inset:auto -20% -35% -20%;height:45%;background:linear-gradient(transparent,#07172b55)}'
      +'@keyframes homePulse{50%{transform:scale(1.12);opacity:.65}}@keyframes homeBob{50%{transform:translateY(-8px)}}@keyframes homeTwinkle{50%{opacity:.35;transform:scale(.7)}}'
      +'.hw-top{display:flex;align-items:center;justify-content:space-between;gap:8px}.hw-brand{font-size:clamp(11px,2.8vw,14px);font-weight:900;letter-spacing:1.5px;opacity:.9}.hw-level{font-size:12px;font-weight:800;background:#ffffff20;border:1px solid #ffffff30;padding:7px 11px;border-radius:20px;white-space:nowrap}'
      +'.hw-hero{display:flex;align-items:center;min-height:0;flex:1;gap:2px;position:relative}.hw-copy{flex:1;min-width:0;z-index:2}.hw-kicker{font-size:clamp(10px,2.5vw,13px);font-weight:900;letter-spacing:1px;text-transform:uppercase;color:#fffbd0}.hw-copy h1{font-size:clamp(23px,6.3vw,34px);line-height:1.02;margin:7px 0 8px;font-weight:1000;letter-spacing:-.7px}.hw-copy p{font-size:clamp(12px,3.2vw,15px);line-height:1.35;margin:0;max-width:240px;color:#fffde9}.hw-art{width:48%;max-width:230px;max-height:33vh;object-fit:contain;filter:drop-shadow(0 15px 18px #0005);animation:homeBob 4s ease-in-out infinite;align-self:center}'
      +'.hw-progress{background:#ffffff20;border:1px solid #ffffff25;border-radius:16px;padding:9px 12px}.hw-progline{display:flex;justify-content:space-between;font-size:11px;font-weight:800;margin-bottom:6px}.hw-track{height:7px;border-radius:9px;background:#08152d55;overflow:hidden}.hw-track i{display:block;height:100%;width:'+pct+'%;border-radius:9px;background:linear-gradient(90deg,#fff4a9,var(--accent));box-shadow:0 0 12px var(--accent)}'
      +'.hw-mission{border:1px solid #ffffff50;border-radius:20px;padding:12px;background:linear-gradient(110deg,#ffffff2c,#ffffff12);box-shadow:0 8px 24px #0002;display:flex;align-items:center;gap:10px}.hw-mission-icon{font-size:30px;flex:none}.hw-mission-copy{flex:1;min-width:0}.hw-mission-copy b{display:block;font-size:14px}.hw-mission-copy span{display:block;font-size:11px;opacity:.85;margin-top:3px}.hw-play{border:0;border-radius:14px;padding:12px 14px;background:linear-gradient(135deg,#fff5a8,#ffc95f);color:#3a2854;font-weight:1000;font-size:13px;box-shadow:0 4px 0 #b97c38;white-space:nowrap}'
      +'.hw-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.hw-action{border:1px solid #ffffff35;background:#ffffff18;color:#fff;border-radius:16px;min-height:64px;padding:8px 4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-weight:800;font-size:11px}.hw-action span{font-size:23px;line-height:1}.hw-foot{display:flex;align-items:center;justify-content:space-between;font-size:10px;opacity:.78;padding:0 3px}.hw-spark{position:absolute;font-size:18px;animation:homeTwinkle 2.4s infinite}.hw-s1{top:15%;left:8%}.hw-s2{top:35%;right:7%;animation-delay:.8s}.hw-s3{bottom:25%;left:42%;animation-delay:1.3s}'
      +'@media(max-height:690px){.home-world{gap:6px;padding:10px}.hw-hero{flex:.85}.hw-art{max-height:27vh}.hw-copy h1{font-size:23px}.hw-mission{padding:8px}.hw-action{min-height:55px}.hw-progress{padding:7px 10px}}@media(min-width:600px){.home-world{max-width:620px;margin:0 auto}.hw-copy h1{font-size:38px}}'
      +'</style><section class="home-world '+(emma?'hw-emma':'hw-gabriel')+'">'
      +'<span class="hw-spark hw-s1">✦</span><span class="hw-spark hw-s2">✧</span><span class="hw-spark hw-s3">✦</span>'
      +'<div class="hw-top"><div class="hw-brand">✦ RÉVISE+ • TON MONDE</div><div class="hw-level">NIVEAU '+(p.niveau||1)+' · ⚡ '+(p.xp||0)+' XP</div></div>'
      +'<div class="hw-hero"><div class="hw-copy"><div class="hw-kicker">'+(emma?'✨ Royaume magique':'🚀 Mission spatiale')+'</div><h1>'+(emma?'Bienvenue Emma !':'Salut Gabriel !')+'</h1><p>'+greeting+'<br><b>'+buddy+'</b> est prêt à partir avec toi.</p></div><img class="hw-art" src="'+art+'" alt="'+buddy+'"></div>'
      +'<div class="hw-progress"><div class="hw-progline"><span>🌟 Ton aventure progresse</span><span>'+pct+'%</span></div><div class="hw-track"><i></i></div></div>'
      +'<div class="hw-mission"><div class="hw-mission-icon">'+(emma?'🦋':'🛸')+'</div><div class="hw-mission-copy"><b>Ta prochaine mission</b><span>'+(emma?'Aide les habitants du jardin':'Prépare le prochain décollage')+' · 5 min</span></div><button class="hw-play" onclick="goTab(\'aventure\')">JOUER ▶</button></div>'
      +'<div class="hw-actions"><button class="hw-action" onclick="goTab(\'aventure\')"><span>🗺️</span>Explorer</button><button class="hw-action" onclick="goTab(\'jeux\')"><span>🎮</span>Défis</button><button class="hw-action" onclick="goTab(\'cours\')"><span>📚</span>Apprendre</button></div>'
      +'<div class="hw-foot"><span>💜 À ton rythme, sans pression</span><span onclick="goTab(\'plus\');viewProgres()" style="font-weight:900">Mes progrès ↗</span></div></section>';
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
    html += '<div class="card" style="border:1px solid var(--accent)"><h3>🔎 Un cours manque ?</h3>'
      + '<p style="font-size:.9rem">Recherche ou demande une fiche sur une notion absente de '+m.nom+'. Écris ta demande ou dicte-la.</p>'
      + '<input type="text" id="lessonInput" placeholder="Ex. les fractions, les verbes irréguliers…" style="width:100%;padding:12px;margin:8px 0;border-radius:10px" onkeydown="if(event.key===\'Enter\')askLesson()">'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" onclick="askLesson()">✨ Rechercher / créer la fiche</button><button class="btn ghost" onclick="startLessonVoice()">🎙️ Demander à l’oral</button></div>'
      + '<div id="lessonStatus" style="font-size:.85rem;margin-top:10px"></div>'
      + (Tutor.mode()!=='IA' ? '<div class="control-advice">Mode local sans IA : une fiche repère peut être créée à partir des connaissances intégrées. Pour les notions absentes, complète-la avec ton cours.</div>' : '')
      + '</div>';
    render(html);
  }

  function viewChapitre(id) {
    var c = chapById(id);
    var html = '<span class="back" onclick="backToChapters()">← ' + c.titre + '</span>';
    html += '<div class="card"><h3>' + c.titre + ' <button class="btn small" onclick="readAloud()" id="ttsBtn">🔊 Écouter</button></h3>';
    html += '<h4>Fiche express</h4><ul>' + c.express + '</ul>';
    html += '<button class="btn ghost" onclick="downloadExpress()">⬇️ Télécharger la fiche courte</button>';
    html += '<button class="btn" onclick="showFull()">📖 Fiche complète</button> '
      + '<button class="btn ghost" onclick="startQuiz(1)">🧭 Découverte</button> '
      + '<button class="btn gold" onclick="startQuiz(2)">⚡ Expert</button>';
    html += '</div><div class="card hidden" id="fullCard"><h4>Fiche complète</h4>' + c.complet + '</div>';
    render(html);
  }

  // Export de la fiche express en fichier HTML imprimable/consultable hors ligne.
  function downloadExpress() {
    var c = chapById(state.chap); if (!c) return;
    var title = String(c.titre || 'Fiche express');
    var content = '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width">'
      + '<title>Fiche express - '+escapeHtml(title)+'</title>'
      + '<style>body{font:16px/1.65 Arial,sans-serif;max-width:780px;margin:32px auto;padding:0 20px;color:#202033}h1{color:#5135a8}li{margin:8px 0}@media print{body{margin:0}}</style>'
      + '<h1>'+escapeHtml(title)+'</h1><h2>Fiche express</h2><ul>'+c.express+'</ul>'
      + '<p><small>Révise+ • Fiche de révision</small></p></html>';
    var blob = new Blob([content], {type:'text/html;charset=utf-8'});
    var url = URL.createObjectURL(blob), link=document.createElement('a');
    link.href=url; link.download='Fiche-express-'+title.replace(/[^a-z0-9-]/gi,'-')+'.html';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1500);
  }
  function escapeHtml(v){return String(v).replace(/[&<>"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch];});}

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
    var txt = cleanForSpeech(c.titre) + '. Cours complet. ' + cleanForSpeech(c.complet);
    var b = document.getElementById('ttsBtn');
    if (window.NativeBridge && typeof window.NativeBridge.speakSlow === 'function') {
      window.NativeBridge.speakSlow(txt, 0.84, 1.02);
    } else if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
      var run = ++speechRun;
      var u = new SpeechSynthesisUtterance(txt);
      u.lang = 'fr-FR';
      u.rate = 0.84;
      u.pitch = 1.02;
      u.volume = 1;
      var voice = preferredFrenchVoice();
      if (voice) u.voice = voice;
      u.onend = function() { if (run === speechRun && b) { b.textContent = '🎧 Écouter le cours complet'; b.onclick = readAloud; } };
      speechSynthesis.speak(u);
    } else if (window.NativeBridge) {
      // Secours sur les WebView sans synthèse vocale web.
      window.NativeBridge.speak(txt);
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
    if (b) { b.textContent = '🎧 Écouter le cours complet'; b.onclick = readAloud; }
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
    var qs=poolFor(c,mode===1?1:2);if(mode===3)qs=qs.slice(0,5);
    quiz = { c: c, mode: mode===1?1:2, qs: qs, i: 0, score: 0, streak: 0, boss: mode===3 };
    pushRecent(c.id);
    setTab('jeux');
    showQuestion();
  }

  function showQuestion() {
    var q=quiz.qs[quiz.i], pct=Math.round((quiz.i/quiz.qs.length)*100), type=quiz.gameType||'quiz';
    var emma=state.profile==='Emma',worldIndex=0;
    try{var ad=JSON.parse(localStorage.getItem('reviseplus_adventure_'+state.profile)||'{}');worldIndex=Math.max(0,Math.min(5,ad.world||0));}catch(e){}
    var worlds=emma?[
      ['🌷','Jardin enchanté','🌸','🦋','✨','Les fleurs attendent tes bonnes réponses !'],
      ['🧚','Forêt des fées','🍃','🧚','🌟','Aide les fées à retrouver leur poussière magique !'],
      ['🏰','Château nuage','☁️','👑','💎','Les portes du château brillent à chaque réussite !'],
      ['🌙','Lac des étoiles','🌊','🦢','⭐','Fais remonter les étoiles à la surface !'],
      ['🐰','Vallée des animaux','🌿','🐾','🥕','Les petits habitants comptent sur toi !'],
      ['🌈','Royaume arc-en-ciel','🎠','🦄','💖','Rends toutes ses couleurs au royaume !']
    ]:[
      ['🚀','Base orbitale','🪐','🛰️','⭐','Prépare le décollage avec Nova !'],
      ['🤖','Lune des robots','🌙','⚙️','🔋','Redonne de l’énergie aux robots !'],
      ['💎','Planète cristal','🔮','🪨','💠','Fais briller les cristaux du savoir !'],
      ['🌌','Nébuleuse','☄️','🪐','🌠','Traverse la nébuleuse étoile après étoile !'],
      ['🛰️','Station des étoiles','📡','🌍','✨','Réactive les systèmes de la station !'],
      ['🌠','Galaxie légendaire','🚀','👾','💫','La grande aventure commence !']
    ];
    var w=worlds[worldIndex],title=q._chapter?q._chapter.titre:quiz.c.titre;
    quiz.treasures=quiz.treasures||0;
    var html='<style>@keyframes worldFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}@keyframes worldGlow{0%,100%{filter:drop-shadow(0 0 3px #fff8)}50%{filter:drop-shadow(0 0 12px #fff)}}.immersive-stage{position:relative;overflow:hidden;border-radius:24px;padding:16px;margin-bottom:12px;background:'+(emma?'linear-gradient(145deg,#f9dff0,#c9b5f5 55%,#b5e9d7)':'linear-gradient(145deg,#17295f,#466ec2 60%,#86c8ed)')+';color:'+(emma?'#593d72':'#fff')+';box-shadow:0 12px 26px #253b7730}.immersive-stage:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 15% 15%,#fff9 0 2px,transparent 3px),radial-gradient(circle at 80% 25%,#fff8 0 2px,transparent 3px),radial-gradient(circle at 55% 80%,#fff7 0 2px,transparent 3px);background-size:75px 75px;pointer-events:none}.immersive-world-head{position:relative;display:flex;align-items:center;justify-content:space-between;gap:8px}.immersive-world-head b{font-size:12px;letter-spacing:1px}.immersive-scene-icons{position:relative;display:flex;justify-content:space-around;align-items:center;font-size:30px;padding:12px 0 5px}.immersive-scene-icons span{animation:worldFloat 3s ease-in-out infinite}.immersive-scene-icons span:nth-child(2){animation-delay:.5s}.immersive-scene-icons span:nth-child(3){animation-delay:1s}.immersive-story{position:relative;font-size:12px;font-weight:700;background:#ffffff38;border-radius:13px;padding:9px}.treasure-meter{position:relative;margin-top:10px;font-size:12px;font-weight:900;display:flex;justify-content:space-between}.treasure-meter strong{animation:worldGlow 2s infinite}.quiz-shell{padding-bottom:18px}.quiz-shell .card{border-radius:22px;box-shadow:0 10px 25px #192a4a18}.quiz-progress-track{height:9px;border-radius:9px;background:#d8d8e8;overflow:hidden;margin:8px 0 14px}.quiz-progress-track i{display:block;height:100%;border-radius:9px;background:linear-gradient(90deg,#7ad7b4,#a78bea);transition:width .35s}</style>';
    html+='<div class="immersive-stage"><div class="immersive-world-head"><b>'+w[0]+' '+w[1].toUpperCase()+'</b><span>MISSION '+(quiz.i+1)+'/'+quiz.qs.length+'</span></div><div class="immersive-scene-icons"><span>'+w[2]+'</span><span>'+w[3]+'</span><span>'+w[4]+'</span></div><div class="immersive-story">'+(emma?'Lumi : ':'Nova : ')+w[5]+'</div><div class="treasure-meter"><span>✨ Trésors récoltés</span><strong>'+quiz.treasures+' / '+quiz.qs.length+'</strong></div></div>';
    html+='<div class="quiz-shell"><div class="quiz-progress-top"><span>'+(type==='mega'?'🌟 MÉGA-QUIZ MULTIMATIÈRES':'🎮 AVENTURE · '+(quiz.chapterLevel?'NIVEAU '+quiz.chapterLevel:'MISSION'))+'</span><b>'+pct+' %</b></div>'
      +'<div class="quiz-progress-track"><i style="width:'+pct+'%"></i></div><div class="card"><div class="quiz-guardian"><img src="'+(emma?'images/3d/lumi-fairy-3d.png':'images/3d/nova-robot-3d.png')+'" alt=""><div><b>'+(emma?'Lumi est avec toi ✨':'Nova est à tes côtés 🤖')+'</b><span>Explore à ton rythme. Chaque essai fait avancer ton aventure !</span></div></div>'
      +'<h3>'+title+'</h3><p style="font-weight:700">'+(type==='hangman'?'🔎 Indice : ':'')+q.q+'</p>';
    if(type==='written'){
      html+='<input id="writtenAnswer" type="text" autocomplete="off" placeholder="Écris ta réponse…" onkeydown="if(event.key===\'Enter\')gameAnswerText()">'
        +'<button class="btn" onclick="gameAnswerText()">Valider</button> <button class="btn ghost" id="voiceAnswer" onclick="gameSpeech()">🎙️ Dicter</button>';
    }else if(type==='hangman'){
      var word=String(q.choix[q.bon]), clean=word.toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z ]/g,'');
      quiz.guessed=quiz.guessed||[];quiz.misses=quiz.misses||0;
      html+='<div style="font-size:1.65rem;letter-spacing:5px;text-align:center;padding:16px 4px;font-weight:900">'+clean.split('').map(function(ch){return ch===' '?'　':(quiz.guessed.indexOf(ch)>=0?ch.toUpperCase():'＿');}).join(' ')+'</div>'
        +'<p style="text-align:center">Erreurs : '+quiz.misses+' / 7</p><div class="grid3">';
      'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(ch){html+='<button class="btn small" '+(quiz.guessed.indexOf(ch)>=0?'disabled':'')+' onclick="gameHangmanLetter(\''+ch+'\')">'+ch.toUpperCase()+'</button>';});
      html+='</div>';
      if(quiz.misses>=7){html+='<p>Le mot était : <b>'+word+'</b></p><button class="btn" onclick="answer(-1)">Voir la correction</button>';}
    }else{
      q.choix.forEach(function(ch,idx){html+='<button class="choice" id="ch'+idx+'" onclick="answer('+idx+')">'+ch+'</button>';});
    }
    html+='<p id="fb" class="hidden"></p></div></div>';render(html);
  }

  function answer(idx) {
    var q = quiz.qs[quiz.i];
    if(idx<0)idx=q.bon===0?1:0;
    var ok = idx === q.bon;
    if (AudioFX) AudioFX.fx(ok);
    var fb = document.getElementById('fb');
    var correctBtn=document.getElementById('ch'+q.bon), wrongBtn=document.getElementById('ch'+idx);
    if(correctBtn)correctBtn.classList.add('right');
    if(!ok&&wrongBtn)wrongBtn.classList.add('wrong');
    fb.classList.remove('hidden');
    fb.innerHTML = '<div class="answer-feedback '+(ok?'feedback-good':'feedback-wrong')+'">'+(ok?'✨ Bien joué !':'💡 On apprend aussi en se trompant !')+'<div class="feedback-explain">'+(q.exp || ('La bonne réponse est : '+q.choix[q.bon]))+'</div><div class="feedback-actions"><button class="btn ghost small" onclick="quizAskWhy()">🤔 Je veux comprendre</button><button class="btn small" onclick="gameNext()">J’ai compris · Suivant →</button></div></div>';
    for (var k = 0; k < q.choix.length; k++){var choiceBtn=document.getElementById('ch'+k);if(choiceBtn)choiceBtn.onclick=null;}
    var p = load();
    if (ok) {
      quiz.score++; quiz.streak++; quiz.treasures=(quiz.treasures||0)+1;
      p.streak = Math.max(p.streak || 0, quiz.streak);
      p.bestStreak = Math.max(p.bestStreak || 0, quiz.streak);
      setMaitrise((q._chapter||quiz.c).id, quiz.mode === 1 ? 8 : 12);
      clearError((q._chapter||quiz.c).id, q.q);
      addXP(quiz.mode === 1 ? 5 : 10);
    } else {
      quiz.streak = 0;
      p.streak = 0; save(p);
      setMaitrise((q._chapter||quiz.c).id, quiz.mode === 1 ? -8 : -12);
      recordError((q._chapter||quiz.c).id, q.q);
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
    p = addXP(20 + Math.round(pct / 5) + (bossWin?25:0) + (quiz.gameType==='mega'?50:0));
    if (quiz.daily) grantDaily(quiz.c.id);
    var html = '<div class="card stat result-card '+(bossWin?'boss-victory':'')+'"><div class="result-hero">'+(quiz.gameType==='mega'?'🌟':(bossWin?'👑':'🏁'))+'</div><h3>'+(quiz.gameType==='mega'?'Méga-quiz terminé !':(quiz.boss?(bossWin?'Boss vaincu !':'Le boss résiste encore…'):'Mission terminée'))+' — ' + (quiz.gameType==='mega'?'toutes les matières':quiz.c.titre) + '</h3>'
      + '<span class="n">' + pct + ' %</span>'
      + '<p>' + quiz.score + ' / ' + quiz.qs.length + ' bonnes réponses</p>'
      + '<p>XP total : <b>' + p.xp + '</b> — Niveau ' + p.niveau + '</p>';
    if (pct < 50) html += '<p>💡 Relis la fiche express, puis retente : les questions ratées reviendront !</p>';
    else if (pct < 100) html += '<p>💡 Bien joué ! Passe en mode ⚡ Expert pour viser le sans-faute.</p>';
    else html += '<p>🏆 Sans faute, bravo !</p>';
    if(quiz.gameType==='mega')html+='<p>🌟 Bonus Méga-quiz inclus : +50 XP !</p>';
    if(quiz.boss)html+='<div class="boss-reward">'+(bossWin?'🎉 Boss vaincu : +25 XP bonus et badge Chasseur de boss !':'💪 Tu as déjà appris beaucoup. Reviens défier le boss après une petite révision.')+'</div>';
    html += '<button class="btn" onclick="'+(quiz.gameType==='mega'?'gameStartMega()':'gameStartChapter(\''+quiz.c.id+'\')')+'">🔄 Rejouer</button> '
      + '<button class="btn ghost" onclick="goTab(\'plus\');viewProgres()">📊 Mes progrès</button> '
      + '<button class="btn ghost" onclick="backToChapters()">📖 Retour au cours</button></div>';
    render(html);
  }
  function quizMode() { return quiz ? (quiz.boss ? 3 : quiz.mode) : 1; }

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

  // ================= ARCADE : PARCOURS PAR MATIÈRE ET CHAPITRE =================
  var gameModeChosen = 'quiz', gameSubjectChosen = null;
  function gameModesHtml(){
    return '<div class="game-mode-grid">'
      + '<button class="game-mode mode-quest '+(gameModeChosen==='quiz'?'selected':'')+'" onclick="gamePickMode(\'quiz\')"><span class="game-art">🧠</span><b>Quiz à choix</b><small>Choisis la bonne réponse</small><span class="game-launch">Jouer ↗</span></button>'
      + '<button class="game-mode mode-speed '+(gameModeChosen==='written'?'selected':'')+'" onclick="gamePickMode(\'written\')"><span class="game-art">✍️</span><b>Réponse écrite</b><small>Écris ou dicte ta réponse</small><span class="game-launch">Jouer ↗</span></button>'
      + '<button class="game-mode mode-boss '+(gameModeChosen==='hangman'?'selected':'')+'" onclick="gamePickMode(\'hangman\')"><span class="game-art">🔤</span><b>Le mot mystère</b><small>Pendu pédagogique pour les langues</small><span class="game-launch">Jouer ↗</span></button>'
      + '<button class="game-mode mode-daily '+(gameModeChosen==='mega'?'selected':'')+'" onclick="gamePickMode(\'mega\')"><span class="game-art">🌟</span><b>Méga-quiz</b><small>Toutes les matières · gros bonus XP</small><span class="game-launch">+50 XP ↗</span></button></div>';
  }
  function viewJeux() {
    setTab('jeux');
    if (needProfile()) return;
    var p=load(), emma=state.profile==='Emma', buddy=emma?'Lumi':'Nova';
    var html='<section class="arcade-hero '+(emma?'arcade-emma':'arcade-gabriel')+'">'
      +'<div class="arcade-orb">'+(emma?'<img src="images/3d/lumi-fairy-3d.png" alt="">':'<img src="images/3d/gabriel-explorer-3d.png" alt="">')+'</div>'
      +'<div class="arcade-kicker">TON UNIVERS • ARCADE ÉDUCATIVE</div><h2>À toi de jouer !</h2>'
      +'<p>'+buddy+' te propose 4 façons de progresser. Chaque niveau correspond à un chapitre de ton programme.</p>'
      +'<div class="arcade-stats"><span>⚡ '+p.xp+' XP</span><span>🔥 '+(p.bestStreak||0)+' record</span><span>👾 '+(p.bossWins||0)+' boss</span><span>🏅 '+p.badges.length+' badges</span></div></section>';
    html+='<div class="section-title">① Choisis ton jeu</div><p class="game-intro arcade-step-hint">Puis sélectionne une matière, et enfin le chapitre à jouer. Tu suis toujours ces 3 étapes.</p>'; 
    html+=gameModesHtml();
    html+='<div class="section-title">② Choisis ta matière</div><div class="card game-chapter-card"><p class="game-intro">Sélectionne la matière dans laquelle tu veux jouer. Les chapitres sont adaptés à ta classe ('+state.niveau+').</p><div class="grid2">';
    myMatieres().forEach(function(m){
      var chs=chaptersFor(m.id,state.niveau); if(!chs.length)return;
      var done=chs.filter(function(c){return (p.maitrise[c.id]||0)>=50;}).length;
      html+='<button class="item" style="color:var(--txt);border:2px solid '+(gameSubjectChosen===m.id?'var(--gold)':'transparent')+'" onclick="gamePickSubject(\''+m.id+'\')"><span class="ic">'+m.icon+'</span><span class="nm">'+m.nom+'</span><div class="sub">'+done+'/'+chs.length+' chapitres validés</div></button>';
    });
    html+='</div><div id="gameChapterList"></div></div>';
    render(html); updateChip();
    if(gameSubjectChosen)gamePickSubject(gameSubjectChosen);
  }
  function gamePickMode(mode){
    gameModeChosen=mode;
    if(mode==='mega'){gameStartMega();return;}
    if(mode==='hangman' && gameSubjectChosen && ['anglais','italien','francais'].indexOf(gameSubjectChosen)<0)gameSubjectChosen=null;
    viewJeux();
  }
  function gamePickSubject(mat){
    gameSubjectChosen=mat;
    var m=REVISE_DATA.matieres.filter(function(x){return x.id===mat;})[0], chs=chaptersFor(mat,state.niveau), p=load();
    var box=document.getElementById('gameChapterList'); if(!box)return;
    if(gameModeChosen==='hangman' && ['anglais','italien','francais'].indexOf(mat)<0){
      box.innerHTML='<div class="warn">🔤 Le jeu du mot mystère est réservé au français, à l’anglais et à l’italien. Choisis une de ces matières.</div>';return;
    }
    var html='<div class="game-step-title">③ Choisis ton chapitre</div><div class="game-selected-summary">🎮 '+(gameModeChosen==='quiz'?'Quiz à choix':gameModeChosen==='written'?'Réponse écrite':'Mot mystère')+' <span>→</span> '+m.icon+' '+m.nom+' <span>→</span> '+state.niveau+'</div><p class="game-intro">Appuie sur un chapitre pour lancer la partie. Les suivants se débloquent au fil de ta progression.</p>';
    chs.forEach(function(c,i){
      var pct=p.maitrise[c.id]||0, unlocked=i===0||(p.maitrise[chs[i-1].id]||0)>=50;
      html+='<button class="game-chapter" '+(unlocked?'':'disabled style="opacity:.42;filter:grayscale(1)"')+' onclick="gameStartChapter(\''+c.id+'\')">'
        +(unlocked?'▶ ':'🔒 ')+'<b>Niveau '+(i+1)+' · '+c.titre+'</b><span>'+(pct>=50?'✔ Validé · ':'Progression · ')+pct+' %</span></button>';
    });
    box.innerHTML=html;
  }
  function gameStartChapter(id){
    var c=chapById(id); if(!c)return;
    var chs=chaptersFor(c.mat,c.niveau), idx=chs.map(function(x){return x.id;}).indexOf(id), p=load();
    if(idx>0&&(p.maitrise[chs[idx-1].id]||0)<50){alert('Termine d’abord le niveau précédent pour débloquer ce chapitre.');return;}
    if(gameModeChosen==='hangman'&&['anglais','italien','francais'].indexOf(c.mat)<0){alert('Le mot mystère est réservé aux langues.');return;}
    var all=gameModeChosen==='hangman'?c.quiz.slice():c.quiz.concat(c.vf.map(function(v){return {q:v.q,choix:['Vrai','Faux'],bon:v.v?0:1,exp:v.exp};}));
    if(!all.length){alert('Les questions de ce chapitre arrivent bientôt.');return;}
    quiz={c:c,mode:1,qs:shuffle(all),i:0,score:0,streak:0,boss:false,gameType:gameModeChosen,chapterLevel:idx+1};
    if(gameModeChosen==='hangman')quiz.qs=quiz.qs.filter(function(q){return q.choix&&q.choix[q.bon]&&/[a-zà-ÿ]/i.test(q.choix[q.bon]);});
    if(!quiz.qs.length){alert('Ce chapitre ne contient pas encore de mots à trouver.');return;}
    quiz.qs=quiz.qs.slice(0,gameModeChosen==='mega'?12:8);
    pushRecent(id); showQuestion();
  }
  function gameStartMega(){
    var mats=myMatieres().map(function(m){return m.id;}), chapters=REVISE_DATA.chapitres.filter(function(c){return c.niveau===state.niveau&&mats.indexOf(c.mat)>=0;});
    var p=load(), unlocked=[];
    chapters.forEach(function(c){
      var chs=chaptersFor(c.mat,c.niveau), idx=chs.map(function(x){return x.id;}).indexOf(c.id);
      if(idx===0||(p.maitrise[chs[idx-1].id]||0)>=50)unlocked.push(c);
    });
    var pool=[];
    unlocked.forEach(function(c){c.quiz.forEach(function(q){pool.push(Object.assign({},q,{_chapter:c}));});});
    if(pool.length<3){alert('Débloque quelques chapitres pour lancer le Méga-quiz !');return;}
    var first=unlocked[0]; quiz={c:first,mode:2,qs:shuffle(pool).slice(0,12),i:0,score:0,streak:0,boss:false,gameType:'mega',mega:true};
    showQuestion();
  }
  function gameAnswerText(){
    if(!quiz||quiz.waitingNext)return;
    var q=quiz.qs[quiz.i], input=document.getElementById('writtenAnswer'); if(!input)return;
    var val=normalAnswer(input.value), expected=normalAnswer(q.choix[q.bon]);
    if(!val){input.focus();return;}
    answer(val===expected?q.bon:(q.bon===0?1:0));
  }
  function normalAnswer(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');}
  function gameSpeech(){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert('La dictée vocale n’est pas disponible sur cet appareil.');return;}
    var rec=new SR(); rec.lang=(quiz.c.mat==='anglais'?'en-GB':(quiz.c.mat==='italien'?'it-IT':'fr-FR'));rec.interimResults=false;rec.maxAlternatives=1;
    var b=document.getElementById('voiceAnswer');if(b)b.textContent='🎙️ J’écoute…';
    rec.onresult=function(e){var i=document.getElementById('writtenAnswer');if(i)i.value=e.results[0][0].transcript;if(b)b.textContent='🎙️ Dicter';};
    rec.onerror=function(){if(b)b.textContent='🎙️ Dicter';};
    rec.onend=function(){if(b)b.textContent='🎙️ Dicter';};rec.start();
  }
  function gameHangmanLetter(letter){
    if(!quiz||quiz.waitingNext)return;
    quiz.guessed=quiz.guessed||[];
    if(quiz.guessed.indexOf(letter)>=0)return;
    quiz.guessed.push(letter);
    var q=quiz.qs[quiz.i], word=String(q.choix[q.bon]).toLocaleLowerCase('fr-FR');
    var clean=word.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    var target=clean.replace(/[^a-z]/g,'');
    if(target.split('').indexOf(letter)>=0){
      var found=quiz.guessed.join('');
      var complete=target.split('').every(function(ch){return found.indexOf(ch)>=0;});
      if(complete){answer(q.bon);return;}
    }else{quiz.misses=(quiz.misses||0)+1;}
    showQuestion();
  }
  function gameNext(){
    if(!quiz||!quiz.waitingNext)return;
    quiz.waitingNext=false;quiz.guessed=[];quiz.misses=0;quiz.i++;
    if(quiz.i<quiz.qs.length)showQuestion();else showResults();
  }
  // ================= TUTEUR =================
  function viewTuteur() {
    setTab('tuteur');
    if (needProfile()) return;
    var html = '<div class="card"><h3><span class="em">🤖</span>Mon tuteur ' + (Tutor.mode() === 'IA' ? '' : '<span class="demo-tag">MODE DÉMONSTRATION</span>') + '</h3>';
    html += '<p style="font-size:.84rem;opacity:.82">Une notion manque ? Demande une nouvelle fiche : elle sera ajoutée à tes cours sur cet appareil.</p>';
    html += '<label style="display:block;margin:8px 0 4px">Matière</label><select id="lessonSubject" style="width:100%;padding:11px;border-radius:10px;background:var(--bg2);color:var(--txt);border:1px solid var(--accent)">';
    REVISE_DATA.matieres.forEach(function(m){html+='<option value="'+m.id+'">'+m.nom+'</option>';});
    html += '</select><input type="text" id="lessonInput" placeholder="Ex. les verbes irréguliers anglais" style="width:100%;padding:12px;margin-top:8px;border-radius:10px" onkeydown="if(event.key===\'Enter\')askLesson()">';
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" onclick="askLesson()">✨ Créer ma fiche</button><button class="btn ghost" onclick="startLessonVoice()">🎙️ Dicter</button></div><div id="lessonStatus" style="font-size:.82rem;margin:8px 0"></div>';
    if (Tutor.mode() !== 'IA') html += '<div class="control-advice">📚 Tu peux créer une fiche repère même sans IA ni autorisation parentale. Elle sera enregistrée sur cet appareil ; complète-la avec ton cours si la notion n’est pas dans la base locale.</div>';
    html += '<hr style="opacity:.2;margin:16px 0"><h3>💬 Poser une question</h3><div id="chatlog"></div>'
      + '<input type="text" id="chatInput" placeholder="Pose ta question de cours..." onkeydown="if(event.key===\'Enter\')askTutor()">'
      + '<button class="btn" onclick="askTutor()">Envoyer</button></div>';
    render(html);
    Tutor.history.forEach(function (m) { appendMsg(m.role, m.text); });
  }
  function askLesson() {
    var input=document.getElementById('lessonInput'), topic=input&&input.value.trim();
    if(!topic)return;
    var subject=document.getElementById('lessonSubject');
    var status=document.getElementById('lessonStatus');
    status.textContent=Tutor.mode()==='IA'?'⏳ Préparation de ta fiche avec le tuteur…':'⏳ Création de ta fiche repère locale…';
    Tutor.requestLesson(topic,state.niveau,subject?subject.value:'',function(lesson,error){
      if(error||!lesson){status.textContent='⚠️ '+(error||'Impossible de créer la fiche.');return;}
      var mat=subject?subject.value:(state.mat||'maths');
      var id='custom-'+Date.now();
      var saved={id:id,mat:mat,niveau:state.niveau,titre:lesson.titre,express:lesson.express,complet:lesson.complet,quiz:lesson.quiz||[],vf:lesson.vf||[],demande:topic,creeLe:new Date().toISOString(),origine:'demande-eleve'};
      // Bibliothèque de connaissances persistante : la fiche reste disponible après fermeture/redémarrage.
      var list=[];try{list=JSON.parse(localStorage.getItem('reviseplus_custom_lessons')||'[]');}catch(e){}
      var duplicate=list.findIndex(function(x){return x.mat===mat&&x.niveau===state.niveau&&String(x.demande||x.titre).toLowerCase()===topic.toLowerCase();});
      if(duplicate>=0){saved.id=list[duplicate].id;list[duplicate]=saved;}else{list.push(saved);}
      localStorage.setItem('reviseplus_custom_lessons',JSON.stringify(list));
      if(!REVISE_DATA.chapitres.some(function(x){return x.id===saved.id;}))REVISE_DATA.chapitres.push(saved);
      else {var ci=REVISE_DATA.chapitres.findIndex(function(x){return x.id===saved.id;});REVISE_DATA.chapitres[ci]=saved;}
      status.innerHTML='✅ Fiche « '+String(lesson.titre).replace(/</g,'&lt;')+' » ajoutée à '+state.niveau+'. <button class="btn" onclick="openChapter(\''+id+'\')">Ouvrir la leçon</button>';
      if(input)input.value='';
    });
  }
  function startLessonVoice() {
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){var s=document.getElementById('lessonStatus');if(s)s.textContent='La dictée vocale n’est pas disponible sur cet appareil. Tu peux écrire ta demande.';return;}
    var rec=new SR();rec.lang='fr-FR';rec.interimResults=false;rec.maxAlternatives=1;
    var s=document.getElementById('lessonStatus');if(s)s.textContent='🎙️ Je t’écoute…';
    rec.onresult=function(e){var input=document.getElementById('lessonInput');if(input)input.value=e.results[0][0].transcript;if(s)s.textContent='Demande reconnue. Tu peux lancer la création.';};
    rec.onerror=function(){if(s)s.textContent='Je n’ai pas réussi à reconnaître la demande. Réessaie ou écris-la.';};
    rec.start();
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
    try {
      document.querySelectorAll('#drawer nav button').forEach(function (b) {
        b.onclick = function () { goTab(b.dataset.tab); };
      });
      var menu=document.getElementById('menuBtn'); if(menu) menu.onclick = openDrawer;
      var backBtn = document.getElementById('backBtn'); if (backBtn) backBtn.onclick = handleBack;
      var dc=document.getElementById('drawerClose'); if(dc) dc.onclick = closeDrawer;
      var ov=document.getElementById('overlay'); if(ov) ov.onclick = closeDrawer;
      var sw=document.getElementById('switchProfileBtn'); if(sw) sw.onclick = switchProfile;
      try { AudioFX.init(); } catch(audioError) { console.warn('Audio désactivé au démarrage', audioError); }
      var cur = localStorage.getItem('reviseplus_currentProfile');
      if (cur === 'Gabriel' || cur === 'Emma') {
        state.niveau = localStorage.getItem('reviseplus_niveau_' + cur) || '5e';
        state.profile = cur;
        document.body.className = cur === 'Emma' ? 'theme-emma' : 'theme-gabriel';
        var logo=document.querySelector('.logo'); if(logo) logo.textContent = cur === 'Emma' ? '🐱' : '🚀';
        try { viewAccueil(); } catch(homeError) {
          console.error('Erreur accueil Révise+', homeError);
          state.profile = null;
          viewWelcome();
          var note=document.createElement('div');
          note.className='card'; note.style.cssText='margin:12px;padding:14px;background:#fff3cd;color:#624b00';
          note.textContent='Un élément de ton ancien écran d’accueil pose problème. Tes progrès sont conservés. Choisis ton profil pour continuer.';
          var view=document.getElementById('view'); if(view) view.insertBefore(note,view.firstChild);
        }
      } else {
        viewWelcome();
      }
    } catch (bootError) {
      console.error('Erreur démarrage Révise+', bootError);
      var view=document.getElementById('view');
      if(view) {
        view.innerHTML='<section style="padding:20px;color:#fff"><h2>On relance Révise+ 🚀</h2><p>Le démarrage a rencontré un petit souci. Tes progrès ne sont pas effacés.</p><button id="rpRetry" style="padding:14px;border:0;border-radius:12px;background:#58c7f5;color:#08203c;font-weight:bold">Réessayer</button><button id="rpProfiles" style="padding:14px;margin:8px 0;border:0;border-radius:12px;background:#ffd36b;color:#332400;font-weight:bold">Choisir un profil</button></section>';
        var retry=document.getElementById('rpRetry'); if(retry) retry.onclick=function(){location.reload();};
        var profiles=document.getElementById('rpProfiles'); if(profiles) profiles.onclick=function(){try{state.profile=null;localStorage.removeItem('reviseplus_currentProfile');viewWelcome();}catch(e){location.reload();}};
      }
    }
  }

  var pub = {
    chooseProfile: chooseProfile, setLevel: setLevel, selectSubject: selectSubject,
    openChapter: openChapter, startQuiz: startQuiz, answer: answer, goTab: goTab,
    backToSubjects: backToSubjects, backToChapters: backToChapters, askTutor: askTutor, askLesson: askLesson, startLessonVoice: startLessonVoice,
    saveGateway: saveGateway, resetProgress: resetProgress, readAloud: readAloud,
    pickImages: pickImages, onFiles: onFiles, makeFromScan: makeFromScan,
    scanAnswer: scanAnswer, handleBack: handleBack, saveCurrentView: saveCurrentView, render: render, setTab: setTab, load: load, addXP: addXP, showFull: function () { document.getElementById('fullCard').classList.remove('hidden'); },
    doDaily: doDaily, showQuestion: showQuestion, quizMode: quizMode,
    viewProgres: viewProgres, viewScan: viewScan, viewPlus: viewPlus, init: init,
    switchProfile: switchProfile, closeDrawer: closeDrawer,
    obLevel: obLevel, toggleMatiere: toggleMatiere, finishOnboarding: finishOnboarding,
    gamePickMode:gamePickMode, gamePickSubject:gamePickSubject,
    gameStartChapter:gameStartChapter, openGames:viewJeux, gameAnswerText:gameAnswerText, gameSpeech:gameSpeech,
    gameHangmanLetter:gameHangmanLetter, gameNext:gameNext, gameStartMega:gameStartMega
  };
  ['chooseProfile','setLevel','selectSubject','openChapter','startQuiz','answer','goTab','handleBack',
   'backToSubjects','backToChapters','askTutor','askLesson','startLessonVoice','saveGateway','resetProgress','readAloud',
   'showFull','pickImages','onFiles','makeFromScan','scanAnswer','doDaily','showQuestion',
   'quizMode','viewProgres','viewScan','viewPlus','switchProfile','obLevel','toggleMatiere',
   'finishOnboarding','gamePickMode','gamePickSubject','gameStartChapter','openGames','gameAnswerText','gameSpeech','gameHangmanLetter','gameNext','gameStartMega'].forEach(function (f) { window[f] = pub[f]; });
  return pub;
})();

document.addEventListener('DOMContentLoaded', App.init);

} catch (e) {
  var detail = (e && (e.stack || e.message)) ? (e.stack || e.message) : String(e);
  window.__RP_APP_BOOT_ERROR__ = detail;
  console.error('ERREUR FATALE app.js : ' + detail);
  var panel = document.getElementById('rp-diagnostic');
  if (!panel) { panel = document.createElement('div'); panel.id = 'rp-diagnostic'; panel.style.cssText = 'position:fixed;z-index:999999;inset:150px 10px auto;padding:16px;border-radius:14px;background:#fff1f0;color:#641b16;font:13px/1.45 monospace;max-height:70vh;overflow:auto'; document.body.appendChild(panel); }
  panel.innerHTML = '<b>Erreur précise dans app.js</b><br><pre style="white-space:pre-wrap;overflow-wrap:anywhere"></pre>';
  panel.querySelector('pre').textContent = detail;
}
