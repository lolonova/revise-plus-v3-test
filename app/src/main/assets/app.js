/* Révise+ V4 — Logique applicative
   Progression sauvegardée par profil dans localStorage (reviseplus_<profil>).
   Pas de serveur : tout reste sur l'appareil. */

var App = (function () {
  var state = { profile: null, niveau: '6e', mat: null, chap: null, tab: 'profil' };
  var quiz = null;
  var BADGES = [
    { id: 'premier', nom: 'Premier pas', ic: '🥇', test: function (p) { return p.xp >= 10; } },
    { id: 'cent', nom: 'Cent XP', ic: '💯', test: function (p) { return p.xp >= 100; } },
    { id: 'serie', nom: 'Série de 5', ic: '🔥', test: function (p) { return (p.bestStreak || 0) >= 5; } },
    { id: 'parfait', nom: 'Sans faute', ic: '✨', test: function (p) { return p.perfect >= 1; } },
    { id: 'explorateur', nom: 'Explorateur', ic: '🧭', test: function (p) { return Object.keys(p.maitrise || {}).length >= 5; } },
    { id: 'maitre', nom: 'Maître du chapitre', ic: '🎓', test: function (p) { return Object.values(p.maitrise || {}).some(function (m) { return m >= 90; }); } }
  ];
  var EASY = [1, 2, 3], MED = [4, 5, 6], HARD = [7, 8, 9];

  function key() { return 'reviseplus_' + state.profile; }
  function load() {
    try { return JSON.parse(localStorage.getItem(key())) || fresh(); }
    catch (e) { return fresh(); }
  }
  function fresh() {
    return { xp: 0, niveau: 1, streak: 0, bestStreak: 0, perfect: 0, dailyDone: '', dailyDate: '', badges: [], maitrise: {}, erreurs: {} };
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
    var m = p.maitrise[chapId] || 0;
    p.maitrise[chapId] = Math.max(0, Math.min(100, m + delta));
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

  function chaptersFor(mat, niveau) {
    return REVISE_DATA.chapitres.filter(function (c) { return c.mat === mat && c.niveau === niveau; });
  }

  function render(html) { document.getElementById('view').innerHTML = html; window.scrollTo(0, 0); }
  function setTab(t) {
    state.tab = t;
    document.querySelectorAll('#tabs button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.tab === t);
    });
  }

  // ---------- Vues ----------
  function viewProfil() {
    setTab('profil');
    var p = state.profile ? load() : null;
    var html = '<div class="card"><h3>Qui révises-tu aujourd\'hui ?</h3>'
      + '<div class="grid2">'
      + '<div class="item' + (state.profile === 'Gabriel' ? ' sel' : '') + '" onclick="chooseProfile(\'Gabriel\')"><span class="ic">🚀</span>Gabriel<br><small>Univers galaxie</small></div>'
      + '<div class="item' + (state.profile === 'Emma' ? ' sel' : '') + '" onclick="chooseProfile(\'Emma\')"><span class="ic">🐱</span>Emma<br><small>Univers kawaii</small></div>'
      + '</div>';
    if (p) {
      html += '<p>Progression de ' + state.profile + ' : niveau ' + p.niveau + ', ' + p.xp + ' XP.</p>';
    }
    html += '</div>';
    if (!state.profile) {
      html += '<div class="card"><h3>Comment ça marche ?</h3><ul>'
        + '<li>Choisis ton profil : Gabriel (galaxie 🚀) ou Emma (kawaii 🐱).</li>'
        + '<li>Sélectionne ta classe, puis une matière et un chapitre.</li>'
        + '<li>Lis la fiche (express ou complète), écoute-la, puis joue au quiz.</li>'
        + '<li>Gagne de l\'XP, des badges et fais monter ta maîtrise !</li>'
        + '</ul></div>';
    }
    render(html);
    updateHeader();
  }

  function viewCours() {
    setTab('cours');
    if (!state.profile) { viewProfil(); return; }
    if (state.chap) { viewChapitre(state.chap); return; }
    if (state.mat) { viewMatiere(state.mat); return; }
    var html = '<div class="card"><h3>Ta classe</h3><div class="grid3">';
    REVISE_DATA.niveaux.forEach(function (n) {
      html += '<div class="item' + (state.niveau === n ? ' sel' : '') + '" onclick="setLevel(\'' + n + '\')">' + n + '</div>';
    });
    html += '</div></div><div class="card"><h3>Matières (classe de ' + state.niveau + ')</h3><div class="grid2">';
    REVISE_DATA.matieres.forEach(function (m) {
      var chs = chaptersFor(m.id, state.niveau);
      var tag = chs.length ? '<span class="tag">' + chs.length + '</span>' : '<span class="tag" style="background:#888">à venir</span>';
      html += '<div class="item" onclick="selectSubject(\'' + m.id + '\')"><span class="ic">' + m.icon + '</span>' + m.nom + tag + '</div>';
    });
    html += '</div><p style="font-size:0.8rem;opacity:0.7">Les matières marquées « à venir » ne sont pas encore rédigées : nous ne te ferons jamais croire le contraire.</p></div>';
    render(html);
    updateHeader();
  }

  function viewMatiere(mat) {
    var m = REVISE_DATA.matieres.filter(function (x) { return x.id === mat; })[0];
    var chs = chaptersFor(mat, state.niveau);
    var html = '<span class="back" onclick="backToSubjects()">← Retour aux matières</span>';
    html += '<div class="card"><h3>' + m.icon + ' ' + m.nom + ' — ' + state.niveau + '</h3>';
    if (!chs.length) {
      html += '<div class="warn">Aucun chapitre rédigé pour cette matière et cette classe pour l\'instant. Il sera ajouté dans une future version !</div>';
    } else {
      var p = load();
      chs.forEach(function (c) {
        var mt = p.maitrise[c.id] || 0;
        html += '<div class="item" style="text-align:left;margin:8px 0" onclick="openChapter(\'' + c.id + '\')">'
          + '<b>' + c.titre + '</b><br><div class="progress"><div style="width:' + mt + '%"></div></div>'
          + '<small>Maîtrise : ' + mt + ' %</small></div>';
      });
    }
    html += '</div>';
    render(html);
  }

  function viewChapitre(id) {
    var c = REVISE_DATA.chapitres.filter(function (x) { return x.id === id; })[0];
    var html = '<span class="back" onclick="backToChapters()">← Retour au chapitre</span>';
    html += '<div class="card"><h3>' + c.titre + ' <button class="btn small" onclick="readAloud()" id="ttsBtn">🔊 Écouter</button></h3>';
    html += '<h4>Fiche express</h4><ul>' + c.express + '</ul>';
    html += '<button class="btn" onclick="showFull()">Fiche complète</button> '
      + '<button class="btn" onclick="startQuiz(1)">Quiz découverte</button> '
      + '<button class="btn" onclick="startQuiz(2)">Quiz expert</button>';
    html += '</div><div class="card hidden" id="fullCard"><h4>Fiche complète</h4>' + c.complet + '</div>';
    render(html);
  }

  function readAloud() {
    var c = REVISE_DATA.chapitres.filter(function (x) { return x.id === state.chap; })[0];
    var txt = c.titre + '. ' + c.express.replace(/<li>/g, '. ').replace(/<\/li>/g, '');
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

  // ---------- Quiz ----------
  function poolFor(c, mode) {
    var p = load();
    var errs = (p.erreurs[c.id] || []).map(function (q) {
      return c.quiz.concat(c.vf.map(function (v) { return { q: v.q, choix: ['Vrai', 'Faux'], bon: v.v ? 0 : 1, exp: v.exp, vf: true }; }))
        .filter(function (x) { return x.q === q; })[0];
    }).filter(Boolean);
    if (errs.length && Math.random() < 0.5) return errs.slice(0, 5);
    var all = c.quiz.concat(c.vf.map(function (v) {
      return { q: v.q, choix: ['Vrai', 'Faux'], bon: v.v ? 0 : 1, exp: v.exp, vf: true };
    }));
    if (mode === 1) {
      // Découverte : moitié des questions, aide à l'explication
      return shuffle(all).slice(0, Math.ceil(all.length / 2));
    }
    return shuffle(all); // Expert : tout
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
    var c = REVISE_DATA.chapitres.filter(function (x) { return x.id === state.chap; })[0];
    quiz = { c: c, mode: mode, qs: poolFor(c, mode), i: 0, score: 0, streak: 0 };
    setTab('jeux');
    showQuestion();
  }

  function showQuestion() {
    var q = quiz.qs[quiz.i];
    var html = '<div class="card"><h3>' + quiz.c.titre + ' — question ' + (quiz.i + 1) + '/' + quiz.qs.length
      + (quiz.mode === 1 ? ' <span class="demo-tag">DÉCOUVERTE</span>' : ' <span class="demo-tag">EXPERT</span>') + '</h3>';
    html += '<p><b>' + q.q.replace(' = ?', ' = ?') + '</b></p>';
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
    }, 1400);
  }

  function showResults() {
    var pct = Math.round(100 * quiz.score / quiz.qs.length);
    var p = load();
    if (pct === 100) { p.perfect = (p.perfect || 0) + 1; save(p); }
    p = addXP(20 + pct / 5);
    var newBadge = '';
    BADGES.forEach(function (b) {
      if (p.badges.indexOf(b.id) !== -1 && !(window['_seen_' + b.id + '_' + state.profile])) {
        window['_seen_' + b.id + '_' + state.profile] = true;
      }
    });
    var html = '<div class="card stat"><h3>Résultat</h3>'
      + '<span class="n">' + pct + ' %</span>'
      + '<p>' + quiz.score + ' / ' + quiz.qs.length + ' bonnes réponses</p>'
      + '<p>XP total : ' + p.xp + ' — Niveau ' + p.niveau + '</p>';
    if (pct < 50) html += '<p>💡 Relis la fiche express, puis retente le quiz : les questions ratées reviendront !</p>';
    else if (pct < 100) html += '<p>💡 Presque parfait ! Retente en mode expert.</p>';
    else html += '<p>🏆 Sans faute, bravo !</p>';
    html += '<button class="btn" onclick="startQuiz(quizMode())">Rejouer</button> '
      + '<button class="btn ghost" onclick="goTab(\'progres\')">Voir mes progrès</button> '
      + '<button class="btn ghost" onclick="backToChapters()">Retour au cours</button></div>';
    render(html);
  }
  function quizMode() { return quiz ? quiz.mode : 1; }

  // ---------- Défi quotidien ----------
  function dailyChallenge() {
    var p = load();
    var today = new Date().toISOString().slice(0, 10);
    if (p.dailyDate === today) return '<p>✅ Défi du jour déjà réussi ! Reviens demain.</p>';
    var c = REVISE_DATA.chapitres[Math.floor(Math.random() * REVISE_DATA.chapitres.length)];
    return '<p>🎯 Défi du jour : réussir le quiz découverte du chapitre <b>' + c.titre + '</b> (' + c.niveau + '). Bonus : +30 XP !</p>'
      + '<button class="btn" onclick="doDaily(\'' + c.id + '\')">Relever le défi</button>';
  }
  function doDaily(chapId) {
    var p = load();
    var today = new Date().toISOString().slice(0, 10);
    state.chap = chapId;
    quiz = { c: REVISE_DATA.chapitres.filter(function (x) { return x.id === chapId; })[0], mode: 1, qs: null, i: 0, score: 0, streak: 0 };
    var c = quiz.c;
    quiz.qs = poolFor(c, 1);
    quiz.daily = true;
    setTab('jeux');
    showQuestion();
  }
  function grantDaily() {
    var p = load();
    var today = new Date().toISOString().slice(0, 10);
    if (p.dailyDate !== today) {
      p.dailyDate = today; save(p);
      addXP(30);
    }
  }

  // ---------- Progrès ----------
  function viewProgres() {
    setTab('progres');
    if (!state.profile) { viewProfil(); return; }
    var p = load();
    var html = '<div class="card"><h3>Progression de ' + state.profile + '</h3>'
      + '<div class="grid3">'
      + '<div class="stat"><span class="n">' + p.niveau + '</span>niveau</div>'
      + '<div class="stat"><span class="n">' + p.xp + '</span>XP</div>'
      + '<div class="stat"><span class="n">' + Object.keys(p.maitrise).length + '</span>chapitres</div>'
      + '</div></div>';
    html += '<div class="card"><h3>Maîtrise par chapitre</h3>';
    var any = false;
    Object.keys(p.maitrise).forEach(function (id) {
      var c = REVISE_DATA.chapitres.filter(function (x) { return x.id === id; })[0];
      if (!c) return;
      any = true;
      html += '<p style="margin:6px 0">' + c.titre + ' (' + c.niveau + ')<br><div class="progress"><div style="width:' + p.maitrise[id] + '%"></div></div><small>' + p.maitrise[id] + ' %</small></p>';
    });
    if (!any) html += '<p>Commence un quiz pour voir ta maîtrise progresser !</p>';
    html += '</div>';
    html += '<div class="card"><h3>Badges</h3>';
    BADGES.forEach(function (b) {
      var got = p.badges.indexOf(b.id) !== -1;
      html += '<span class="badge" style="' + (got ? '' : 'opacity:0.3;filter:grayscale(1)') + '" title="' + b.nom + '">' + b.ic + '</span>';
    });
    html += '<p><small>' + (p.badges.length ? 'Badges obtenus : ' + p.badges.length + '/' + BADGES.length : 'Aucun badge pour l\'instant. Joue des quiz pour les gagner !') + '</small></p></div>';
    html += '<div class="card"><h3>Défi quotidien</h3>' + dailyChallenge() + '</div>';
    render(html);
    updateHeader();
  }

  // ---------- Réglages ----------
  function viewReglages() {
    setTab('reglages');
    var gw = localStorage.getItem('reviseplus_gateway') || '';
    var html = '<div class="card"><h3>Profil</h3><p>Profil actuel : <b>' + (state.profile || 'aucun') + '</b></p>'
      + '<button class="btn ghost small" onclick="resetProgress()">Réinitialiser la progression</button></div>';
    html += '<div class="card"><h3>Tuteur</h3><p>Mode actuel : '
      + (Tutor.mode() === 'IA' ? '<b>IA</b> (via passerelle parentale)' : '<span class="demo-tag">DÉMONSTRATION</span> (base locale, pas une IA)')
      + '</p><p><small>Le mode démonstration n\'est pas une intelligence artificielle : il ne connaît que quelques notions. Un parent peut activer le mode IA (voir le README).</small></p>'
      + '<input type="text" id="gwInput" placeholder="URL du worker Cloudflare (parent)" value="' + gw.replace(/"/g, '&quot;') + '">'
      + '<button class="btn small" onclick="saveGateway()">Enregistrer</button></div>';
    html += '<div class="card"><h3>À propos</h3><p>Révise+ version 4.0 — 11 chapitres rédigés et vérifiés, du collège au lycée.</p>'
      + '<p><small>Contenu : usage familial. Progression stockée uniquement sur cet appareil.</small></p></div>';
    render(html);
  }
  function saveGateway() {
    var v = document.getElementById('gwInput').value;
    Tutor.setGateway(v);
    alert(v ? 'Mode IA activé (si l\'URL est valide).' : 'Retour au mode démonstration.');
    viewReglages();
  }
  function resetProgress() {
    if (confirm('Effacer toute la progression de ' + state.profile + ' ?')) {
      localStorage.removeItem(key());
      alert('Progression réinitialisée.');
      viewProgres();
    }
  }

  // ---------- Scanner ----------
  function viewScan() {
    setTab('scan');
    if (!state.profile) { viewProfil(); return; }
    var html = '<div class="card"><h3>📷 Scanner un cours</h3>'
      + '<p>Prends une photo nette de ta fiche ou de ton cahier. L\'app extrait le texte (OCR), tu vérifies, puis elle génère une fiche express et un mini-quiz.</p>'
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
    st.innerHTML = '<p>⏳ Lecture de la photo (OCR)... peut prendre 10-30 secondes.</p>';
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
        function (err) {
          done++;
          st.innerHTML = '<p>❌ ' + err + '</p>';
        });
    });
  }
  function makeFromScan() {
    var txt = document.getElementById('scanEdit').value;
    Scan.setText(txt);
    var html = Scan.buildExpress(txt);
    var qs = Scan.buildQuiz(txt, 4);
    html += '<div class="card"><h3>Mini-quiz généré</h3>';
    if (!qs.length) html += '<p>Pas assez de texte pour un quiz. Ajoute des lignes du type « Terme : définition ».</p>';
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

  // ---------- Tuteur ----------
  function viewTuteur() {
    setTab('tuteur');
    var html = '<div class="card"><h3>Tuteur ' + (Tutor.mode() === 'IA' ? '' : '<span class="demo-tag">MODE DÉMONSTRATION</span>') + '</h3>';
    if (Tutor.mode() !== 'IA') html += '<p><small>En mode démo, je réponds seulement sur quelques notions (fractions, Pythagore, atome, équations, Révolution...). Ce n\'est pas une IA.</small></p>';
    html += '<div id="chatlog"></div>'
      + '<input type="text" id="chatInput" placeholder="Pose ta question de cours...">'
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

  // ---------- Navigation ----------
  function chooseProfile(name) {
    state.profile = name;
    document.body.className = name === 'Emma' ? 'theme-emma' : 'theme-gabriel';
    localStorage.setItem('reviseplus_currentProfile', name);
    updateHeader();
    viewProfil();
  }
  function setLevel(n) { state.niveau = n; state.mat = null; state.chap = null; viewCours(); }
  function selectSubject(m) { state.mat = m; viewMatiere(m); }
  function openChapter(id) { state.chap = id; viewChapitre(id); }
  function backToSubjects() { state.mat = null; state.chap = null; viewCours(); }
  function backToChapters() { state.chap = null; state.mat = null; viewCours(); }
  function goTab(t) {
    if (t === 'cours') { state.mat = null; state.chap = null; viewCours(); return; }
    if (t === 'jeux') {
      if (!state.profile) { viewProfil(); return; }
      setTab('jeux');
      var html = '<div class="card"><h3>🎮 Jeux</h3><p>Choisis un chapitre dans l\'onglet Cours, puis lance « Quiz découverte » ou « Quiz expert ».</p><p>Le quiz s\'adapte : les questions ratées reviennent plus souvent, les réussites font monter ta maîtrise et ton XP.</p></div>';
      render(html);
      return;
    }
    if (t === 'profil') { viewProfil(); return; }
    if (t === 'progres') { viewProgres(); return; }
    if (t === 'reglages') { viewReglages(); return; }
    if (t === 'scan') { viewScan(); return; }
    if (t === 'tuteur') { viewTuteur(); return; }
  }
  function updateHeader() {
    document.getElementById('hdrSub').textContent = state.profile
      ? state.profile + (state.profile === 'Emma' ? ' 🐱 kawaii' : ' 🚀 galaxie') + ' — niveau ' + load().niveau
      : 'Choisis ton profil pour commencer';
  }

  function init() {
    document.querySelectorAll('#tabs button').forEach(function (b) {
      b.onclick = function () { goTab(b.dataset.tab); };
    });
    var cur = localStorage.getItem('reviseplus_currentProfile');
    if (cur === 'Gabriel' || cur === 'Emma') chooseProfile(cur);
    else viewProfil();
  }

  // Hook résultats quiz pour défi quotidien
  var _origResults = showResults;

  // Exposition publique
  var pub = {
    chooseProfile: chooseProfile, setLevel: setLevel, selectSubject: selectSubject,
    openChapter: openChapter, startQuiz: startQuiz, answer: answer,
    goTab: goTab, backToSubjects: backToSubjects, backToChapters: backToChapters,
    askTutor: askTutor, saveGateway: saveGateway, resetProgress: resetProgress,
    readAloud: readAloud, pickImages: pickImages, onFiles: onFiles,
    makeFromScan: makeFromScan, scanAnswer: scanAnswer, showFull: function () {
      document.getElementById('fullCard').classList.remove('hidden');
    }, doDaily: doDaily, showQuestion: showQuestion, quizMode: quizMode,
    _grantDaily: grantDaily, init: init
  };
  window.chooseProfile = pub.chooseProfile;
  window.setLevel = pub.setLevel;
  window.selectSubject = pub.selectSubject;
  window.openChapter = pub.openChapter;
  window.startQuiz = pub.startQuiz;
  window.answer = pub.answer;
  window.goTab = pub.goTab;
  window.backToSubjects = pub.backToSubjects;
  window.backToChapters = pub.backToChapters;
  window.askTutor = pub.askTutor;
  window.saveGateway = pub.saveGateway;
  window.resetProgress = pub.resetProgress;
  window.readAloud = pub.readAloud;
  window.showFull = pub.showFull;
  window.pickImages = pub.pickImages;
  window.onFiles = pub.onFiles;
  window.makeFromScan = pub.makeFromScan;
  window.scanAnswer = pub.scanAnswer;
  window.doDaily = pub.doDaily;
  window.showQuestion = pub.showQuestion;
  window.quizMode = pub.quizMode;
  return pub;
})();

document.addEventListener('DOMContentLoaded', App.init);
