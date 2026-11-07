/* Révise+ V8 — écran d'accueil scénarisé */
(function(){
  var oldGo=App.goTab;
  function art(emma){
    var src=emma?'images/3d/lumi-fairy-3d.png':'images/3d/gabriel-explorer-3d.png';
    var alt=emma?'Lumi, la fée gardienne':'Explorateur spatial de Gabriel';
    return '<div class="hero-character-wrap"><img class="hero-character-image" src="'+src+'" alt="'+alt+'"></div>';
  }
  function home(){
    setTimeout(ensureCompanionDock,40);
    var profile=localStorage.getItem('reviseplus_currentProfile')||'Gabriel';
    var emma=profile==='Emma',p=App.load(),pct=0,vals=Object.keys(p.maitrise||{});
    if(vals.length)pct=Math.round(vals.reduce(function(a,k){return a+(p.maitrise[k]||0);},0)/vals.length);
    var level=p.niveau||1,goal=level*100,progress=Math.min(100,(p.xp||0)/goal*100);
    var last=(p.derniers||[])[0],chapter=last&&REVISE_DATA.chapitres.filter(function(c){return c.id===last;})[0];
    var html='<section class="game-home '+(emma?'home-emma':'home-gabriel')+'"><div class="home-sky"><div class="home-topline"><span class="season-pill">'+(emma?'ROYAUME ENCHANTÉ':'EXPLORATION GALACTIQUE')+'</span><span class="level-pill">NIVEAU '+level+'</span></div><div class="home-greeting"><div><div class="hello-small">SALUT '+profile.toUpperCase()+' !</div><h2>'+(emma?'Prête pour une nouvelle aventure ?':'Prêt pour ta prochaine mission ?')+'</h2><p>Une petite étape aujourd’hui, une grande aventure demain.</p></div>'+art(emma)+'</div><div class="home-xp"><div><b>⭐ '+(p.xp||0)+' XP</b><span> · '+(p.bestStreak||0)+' meilleur enchaînement</span></div><div class="xp-track"><i style="width:'+progress+'%"></i></div><small>Encore un peu pour atteindre le niveau suivant !</small></div></div>';
    html+='<section class="guardian-home '+(emma?'guardian-home-emma':'guardian-home-gabriel')+'"><img src="'+(emma?'images/3d/lumi-fairy-3d.png':'images/3d/nova-robot-3d.png')+'" alt="'+(emma?'Lumi':'Nova')+'" class="guardian-home-img"><div class="guardian-home-copy"><small>'+(emma?'LUMI · TON ANGE GARDIEN':'NOVA · TON COMPAGNON DE MISSION')+'</small><b>'+(emma?'Coucou Emma, je suis là avec toi !':'Salut Gabriel, prêt pour une nouvelle mission ?')+'</b><span>'+(emma?'On avance tranquillement, une petite étape à la fois.':'Pas besoin d’être parfait : chaque essai te fait progresser.')+'</span></div></section>';
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
  function welcome(){
    document.getElementById('view').innerHTML='<section class="profile-select"><div class="profile-select-head"><div class="eyebrow">BIENVENUE DANS RÉVISE+</div><h2>Apprendre devient une aventure !</h2><p>Choisis ton univers, rencontre ton compagnon et fais évoluer ton monde à chaque découverte.</p></div><button class="profile-choice gabriel" onclick="chooseProfile(\'Gabriel\')"><img class="profile-art" src="images/3d/gabriel-explorer-3d.png" alt=""><span class="profile-spark">✦</span><span class="profile-copy"><span class="profile-label">Exploration • Galaxie</span><span class="profile-name">Gabriel</span><span class="profile-desc">Robots, planètes et missions avec Nova.</span><span class="profile-enter">Entrer dans mon univers <b>↗</b></span></span></button><button class="profile-choice emma" onclick="chooseProfile(\'Emma\')"><img class="profile-art" src="images/3d/lumi-fairy-3d.png" alt=""><span class="profile-spark">✧</span><span class="profile-copy"><span class="profile-label">Magie • Jardin enchanté</span><span class="profile-name">Emma</span><span class="profile-desc">Fées, château et animaux avec Lumi.</span><span class="profile-enter">Entrer dans mon univers <b>↗</b></span></span></button><div class="profile-footnote">🌟 Ici, pas de punition : chaque essai te fait progresser.</div></section>';
  }
  function ensureCompanionDock(){
    var profile=localStorage.getItem('reviseplus_currentProfile')||'';
    var dock=document.getElementById('companionDock');
    if(!dock){
      dock=document.createElement('button');dock.id='companionDock';dock.type='button';
      dock.className='companion-dock';document.body.appendChild(dock);
    }
    if(!profile){dock.style.display='none';return;}
    var emma=profile==='Emma';
    dock.style.display='flex';
    dock.innerHTML='<img src="'+(emma?'images/3d/lumi-fairy-3d.png':'images/3d/nova-robot-3d.png')+'" alt=""><span>'+(emma?'Lumi':'Nova')+'<small>Je suis là !</small></span><b>✦</b>';
    dock.onclick=function(){go('aventure');setTimeout(function(){if(window.Adventure)Adventure.speak();},260);};
  }
  function go(t){
    if(t==='accueil'){
      App.saveCurrentView(); App.setTab('accueil'); home(); return;
    }
    oldGo(t); setTimeout(ensureCompanionDock,50);
  }
  App.goTab=go;window.goTab=go;window.ReviseHome=home;
  var oldChoose=window.chooseProfile;
  if(oldChoose){window.chooseProfile=function(name){oldChoose(name);setTimeout(ensureCompanionDock,90);};}
  var oldFinish=App.finishOnboarding;
  if(oldFinish){App.finishOnboarding=function(){oldFinish();home();};window.finishOnboarding=App.finishOnboarding;}
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if((localStorage.getItem('reviseplus_currentProfile')||'')!=='')home();else welcome();ensureCompanionDock();},80);});
})();