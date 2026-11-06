/* Révise+ V8 — écran d'accueil scénarisé */
(function(){
  var oldGo=App.goTab;
  function art(emma){
    if(emma)return '<svg class="hero-character" viewBox="0 0 180 190"><defs><linearGradient id="dress8"><stop stop-color="#ff9ec8"/><stop offset="1" stop-color="#a88cff"/></linearGradient></defs><ellipse cx="90" cy="176" rx="55" ry="9" fill="#553b74" opacity=".2"/><path d="M45 62L37 14Q36 5 47 13L72 39Q90 30 108 39L133 13Q144 5 143 17L135 64" fill="#fff1f7" stroke="#9c72bd" stroke-width="5"/><path d="M48 62Q90 28 132 62L126 102Q90 132 54 102Z" fill="#fff" stroke="#9c72bd" stroke-width="5"/><path d="M62 77Q72 65 81 78M99 78Q108 65 118 77" fill="none" stroke="#493c68" stroke-width="5" stroke-linecap="round"/><path d="M85 92Q90 99 96 92" fill="none" stroke="#e87aa9" stroke-width="4"/><circle cx="57" cy="91" r="7" fill="#ffb1ce"/><circle cx="123" cy="91" r="7" fill="#ffb1ce"/><path d="M50 108Q90 128 130 108L145 163Q90 185 35 163Z" fill="url(#dress8)" stroke="#8f70bd" stroke-width="4"/><path d="M80 40Q90 24 100 40" fill="none" stroke="#ffbf54" stroke-width="7"/></svg>';
    return '<svg class="hero-character" viewBox="0 0 180 190"><defs><linearGradient id="suit8"><stop stop-color="#f7fbff"/><stop offset="1" stop-color="#a9c8ff"/></linearGradient><linearGradient id="visor8"><stop stop-color="#54d9ff"/><stop offset="1" stop-color="#324b9e"/></linearGradient></defs><ellipse cx="90" cy="177" rx="55" ry="9" fill="#07122f" opacity=".4"/><path d="M53 64Q43 29 72 14Q90 4 108 14Q137 29 127 64L119 93Q90 108 61 93Z" fill="#fff" stroke="#8bbdff" stroke-width="5"/><rect x="51" y="36" width="78" height="49" rx="23" fill="url(#visor8)" stroke="#d7f2ff" stroke-width="5"/><path d="M64 48Q82 37 105 45" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/><path d="M43 104Q90 84 137 104L151 163Q90 185 29 163Z" fill="url(#suit8)" stroke="#729de7" stroke-width="5"/><circle cx="90" cy="127" r="17" fill="#263f91" stroke="#d7e8ff" stroke-width="4"/><path d="M82 127h16M90 119v16" stroke="#7cf0ff" stroke-width="4"/><path d="M45 112L22 141M135 112L158 141" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M62 160L54 177M118 160L126 177" stroke="#fff" stroke-width="15" stroke-linecap="round"/></svg>';
  }
  function home(){
    var profile=localStorage.getItem('reviseplus_currentProfile')||'Gabriel';
    var emma=profile==='Emma',p=App.load(),pct=0,vals=Object.keys(p.maitrise||{});
    if(vals.length)pct=Math.round(vals.reduce(function(a,k){return a+(p.maitrise[k]||0);},0)/vals.length);
    var level=p.niveau||1,goal=level*100,progress=Math.min(100,(p.xp||0)/goal*100);
    var last=(p.derniers||[])[0],chapter=last&&REVISE_DATA.chapitres.filter(function(c){return c.id===last;})[0];
    var html='<section class="game-home '+(emma?'home-emma':'home-gabriel')+'"><div class="home-sky"><div class="home-topline"><span class="season-pill">'+(emma?'ROYAUME ENCHANTÉ':'EXPLORATION GALACTIQUE')+'</span><span class="level-pill">NIVEAU '+level+'</span></div><div class="home-greeting"><div><div class="hello-small">SALUT '+profile.toUpperCase()+' !</div><h2>'+(emma?'Prête pour une nouvelle aventure ?':'Prêt pour ta prochaine mission ?')+'</h2><p>Une petite étape aujourd’hui, une grande aventure demain.</p></div>'+art(emma)+'</div><div class="home-xp"><div><b>⭐ '+(p.xp||0)+' XP</b><span> · '+(p.bestStreak||0)+' meilleur enchaînement</span></div><div class="xp-track"><i style="width:'+progress+'%"></i></div><small>Encore un peu pour atteindre le niveau suivant !</small></div></div>';
    html+='<button class="game-primary" onclick="goTab(\'aventure\')"><span class="primary-icon">'+(emma?'🏰':'🚀')+'</span><span><b>Continuer mon aventure</b><small>Explorer, personnaliser et découvrir</small></span><strong>›</strong></button>';
    html+='<div class="home-section-head"><div><small>TON ESPACE</small><h3>Qu’est-ce qu’on fait aujourd’hui ?</h3></div><span class="streak-pill">✨ '+pct+' %</span></div><div class="quest-grid">';
    html+='<button class="quest-card quest-study" onclick="goTab(\'cours\')"><span class="quest-art">📚</span><b>Apprendre</b><small>Mes cours & fiches</small><em>Commencer ›</em></button>';
    html+='<button class="quest-card quest-play" onclick="goTab(\'jeux\')"><span class="quest-art">🎮</span><b>Jouer</b><small>Défis de 5 à 10 min</small><em>À toi de jouer ›</em></button>';
    html+='<button class="quest-card quest-test" onclick="goTab(\'controles\')"><span class="quest-art">📝</span><b>Mes contrôles</b><small>Notes & conseils</small><em>Analyser ›</em></button>';
    html+='<button class="quest-card quest-tutor" onclick="goTab(\'tuteur\')"><span class="quest-art">🤖</span><b>Mon tuteur</b><small>Un coup de main</small><em>Demander ›</em></button></div>';
    html+='<div class="home-section-head"><div><small>TA PROGRESSION</small><h3>Tu avances à ton rythme</h3></div></div><div class="progress-panel"><div class="progress-panel-top"><span>Chapitres travaillés</span><b>'+vals.length+'</b></div><div class="progress"><div style="width:'+pct+'%"></div></div><p>Chaque essai compte. Tu peux recommencer autant que tu veux 💛</p></div>';
    html+='<div class="daily-mission"><div class="mission-icon">'+(emma?'🦋':'🛰️')+'</div><div><small>MISSION DU JOUR</small><b>5 minutes pour faire avancer ton monde</b><span>Un quiz ou une fiche, et c’est déjà une victoire.</span></div></div>';
    if(chapter)html+='<div class="home-section-head"><div><small>REPRENDRE</small><h3>Ton dernier chapitre</h3></div></div><button class="resume-card" onclick="openChapter(\''+chapter.id+'\')"><span>📘</span><div><b>'+chapter.titre+'</b><small>Reprendre là où tu en étais</small></div><strong>›</strong></button>';
    html+='</section>';
    document.getElementById('view').innerHTML=html;
    document.querySelector('.logo').textContent=emma?'🐱':'🚀';
    document.getElementById('drawerName').textContent=profile;
    document.getElementById('drawerMascot').textContent=emma?'🐱':'🚀';
    document.getElementById('drawerSub').textContent='Classe de '+(localStorage.getItem('reviseplus_niveau_'+profile)||'5e')+' · '+pct+' %';
    document.querySelectorAll('#drawer nav button').forEach(function(b){b.classList.toggle('on',b.dataset.tab==='accueil');});
    window.scrollTo(0,0);
  }
  function go(t){
    if(t==='accueil'){
      oldGo('accueil');
      home();
      return;
    }
    oldGo(t);
  }
  App.goTab=go;window.goTab=go;
  var oldFinish=App.finishOnboarding;
  if(oldFinish){App.finishOnboarding=function(){oldFinish();home();};window.finishOnboarding=App.finishOnboarding;}
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if((localStorage.getItem('reviseplus_currentProfile')||'')!=='')home();},80);});
})();