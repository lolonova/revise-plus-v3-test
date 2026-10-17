/* Révise+ V4.1 — Scanner de cours (OCR + génération de fiche et quiz)
   Flux : photos -> OCR (Tesseract.js depuis CDN) -> vérification du texte
   -> fiche express + mini-quiz. Contenu toujours marqué « à vérifier ». */

var Scan = (function () {
  var extracted = '';

  function initOCR(cb, errCb) {
    if (window.Tesseract) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    s.onload = function () { cb(); };
    s.onerror = function () { errCb('Impossible de charger le module OCR. Vérifie ta connexion internet.'); };
    document.head.appendChild(s);
  }

  function runOCR(file, progressCb, doneCb, errCb) {
    initOCR(function () {
      window.Tesseract.recognize(file, 'fra', {
        logger: function (m) { if (m && m.progress) progressCb(m.progress); }
      }).then(function (res) {
        doneCb((res && res.data && res.data.text) || '');
      }).catch(function () {
        errCb("L'OCR a échoué sur cette image. Essaie une photo plus nette, bien éclairée.");
      });
    }, errCb);
  }

  function buildExpress(text) {
    var lines = text.split(/\r?\n/).map(function (l) { return l.trim(); })
      .filter(function (l) { return l.length > 2; });
    var defs = [], keys = [], dates = [], formulas = [], notes = [];
    lines.forEach(function (l) {
      var isDate = /\b(1[0-9]{3}|20[0-9]{2})\b/.test(l);
      var isFormula = l.indexOf('=') !== -1;
      var isDef = l.indexOf(' : ') !== -1;
      if (isDate && l.length < 120) dates.push(l);
      else if (isFormula && l.length < 120) formulas.push(l);
      else if (isDef && l.length < 160) defs.push(l);
      else notes.push(l);
      var words = l.match(/[A-Za-zÀ-ÿ]{6,}/g);
      if (words) keys = keys.concat(words.slice(0, 2));
    });
    keys = keys.filter(function (w, i) { return keys.indexOf(w) === i; }).slice(0, 10);
    var html = '<div class="warn">Fiche générée automatiquement : relis et corrige avant de réviser !</div>';
    if (defs.length) html += '<h4>Définitions</h4><ul>' + defs.slice(0, 8).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
    if (dates.length) html += '<h4>Dates importantes</h4><ul>' + dates.slice(0, 8).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
    if (formulas.length) html += '<h4>Formules</h4><ul>' + formulas.slice(0, 6).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
    if (notes.length) html += '<h4>À retenir</h4><ul>' + notes.slice(0, 8).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
    if (keys.length) html += '<h4>Mots-clés</h4><p>' + keys.map(function (k) { return esc(k); }).join(' · ') + '</p>';
    if (!defs.length && !notes.length) html += '<p>Aucun texte exploitable détecté. Vérifie la qualité de la photo (lumière, netteté).</p>';
    return html;
  }

  function buildQuiz(text, count) {
    var lines = text.split(/\r?\n/).map(function (l) { return l.trim(); })
      .filter(function (l) { return l.length > 15 && l.length < 160; });
    var qs = [];
    for (var i = 0; i < lines.length && qs.length < (count || 5); i++) {
      var m = lines[i].match(/^(.{4,60}) : (.+)$/);
      if (m) {
        var answer = m[2].trim();
        var hint = answer.length > 0 ? answer[0] + '...' : '...';
        qs.push({
          q: 'Complète : ' + m[1] + ' : ?',
          choices: [answer, hint, 'aucune idée'],
          correct: 0,
          explain: 'D\'après ton cours : ' + lines[i]
        });
      }
    }
    return qs;
  }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function setText(t) { extracted = t; }
  function getText() { return extracted; }

  return { runOCR: runOCR, buildExpress: buildExpress, buildQuiz: buildQuiz, setText: setText, getText: getText };
})();
