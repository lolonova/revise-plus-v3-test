/* Révise+ V7 — monde d'aventure, avatar et récompenses sans hasard ni pénalité. */
(function(){
  var KEY=function(){return 'reviseplus_adventure_'+(localStorage.getItem('reviseplus_currentProfile')||'guest');};
  var gab=[
    {name:'Base orbitale',icon:'🚀',xp:0,color:'linear-gradient(135deg,#253d91,#526fce)',desc:'Ton point de départ dans la galaxie.'},
    {name:'Lune des robots',icon:'🤖',xp:80,color:'linear-gradient(135deg,#34495e,#27aeae)',desc:'Rencontre les petits robots explorateurs.'},
    {name:'Planète cristal',icon:'💎',xp:220,color:'linear-gradient(135deg,#315b9e,#7c6ce0)',desc:'Une planète pleine de cristaux.'},
    {name:'Nébuleuse',icon:'🌌',xp:420,color:'linear-gradient(135deg,#44277c,#b34fa8)',desc:'Traverse les nuages stellaires.'},
    {name:'Station des étoiles',icon:'🛰️',xp:700,color:'linear-gradient(135deg,#174c72,#36a6b2)',desc:'Le grand observatoire t’attend.'},
    {name:'Galaxie légendaire',icon:'🌠',xp:1100,color:'linear-gradient(135deg,#49316e,#d28a36)',desc:'La dernière frontière !'}
  ];
  var em=[
    {name:'Jardin enchanté',icon:'🌷',xp:0,color:'linear-gradient(135deg,#f6a6c7,#d6a8ed)',desc:'Un jardin doux pour commencer.'},
    {name:'Forêt des fées',icon:'🧚',xp:80,color:'linear-gradient(135deg,#70c9ae,#82b9df)',desc:'Les fées préparent une surprise.'},
    {name:'Château nuage',icon:'🏰',xp:220,color:'linear-gradient(135deg,#a98ce8,#f0a9cf)',desc:'Un château perché dans les nuages.'},
    {name:'Lac des étoiles',icon:'🦢',xp:420,color:'linear-gradient(135deg,#78b8df,#a9a2ef)',desc:'Un lac magique et scintillant.'},
    {name:'Vallée des animaux',icon:'🐰',xp:700,color:'linear-gradient(135deg,#75c6a3,#f0b6c8)',desc:'De nouveaux amis à rencontrer.'},
    {name:'Royaume arc-en-ciel',icon:'🌈',xp:1100,color:'linear-gradient(135deg,#e89bc7,#a998ef)',desc:'Le royaume merveilleux !'}
  ];
  var looks=[
    {id:'base',name:'Tenue de départ',icon:'🧑‍🚀',cost:0},
    {id:'star',name:'Cape étoilée',icon:'🦸',cost:35},
    {id:'crown',name:'Couronne',icon:'👑',cost:45},
    {id:'glasses',name:'Lunettes cool',icon:'🕶️',cost:25},
    {id:'flower',name:'Couronne de fleurs',icon:'🌸',cost:35},
    {id:'wizard',name:'Cape magique',icon:'🪄',cost:55}
  ];
  var pets=[{id:'bot',name:'Mini-robot',icon:'🤖',cost:45},{id:'cat',name:'Chaton',icon:'🐱',cost:45},{id:'fox',name:'Petit renard',icon:'🦊',cost:60},{id:'unicorn',name:'Licorne',icon:'🦄',cost:70}];
  function profile(){return localStorage.getItem('reviseplus_currentProfile')||'Gabriel';}
  function data(){try{return JSON.parse(localStorage.getItem(KEY()))||{coins:60,look:'base',pet:'',owned:['base'],claimed:0};}catch(e){return {coins:60,look:'base',pet:'',owned:['base'],claimed:0};}}
  function save(d){localStorage.setItem(KEY(),JSON.stringify(d));}
  function progress(){try{return JSON.parse(localStorage.getItem('reviseplus_'+profile()))||{};}catch(e){return {};}}
  function totalXP(p){return ((Math.max(1,p.niveau||1)-1)*100)+(p.xp||0);}
  function mastered(p){return Object.keys(p.maitrise||{}).filter(function(k){return p.maitrise[k]>=50;}).length;}
  function worlds(){return profile()==='Emma'?em:gab;}
  function collectMilestones(d,p){var n=mastered(p),milestone=Math.floor(n/2);if(milestone>d.claimed){d.coins+=(milestone-d.claimed)*20;d.claimed=milestone;save(d);return (milestone-d.claimed+1)*20;}return 0;}
  function open(){
    var p=progress(),d=data(),xp=totalXP(p),zones=worlds(),unlocked=zones.filter(function(w){return xp>=w.xp;}).length;
    var earned=collectMilestones(d,p);d=data();
    var emma=profile()==='Emma',hero=emma?'🐱':'🧑‍🚀';
    var look=looks.filter(function(x){return x.id===d.look;})[0]||looks[0];
    var pet=pets.filter(function(x){return x.id===d.pet;})[0];
    var html='<div class="adventure-hero"><div style="font-size:.78rem;font-weight:800;letter-spacing:1px">TON MONDE • '+(emma?'ROYAUME KAWAII':'MISSION GALACTIQUE')+'</div><h2 style="margin:6px 0">Bienvenue, '+profile()+' !</h2><div>Chaque petite séance te fait avancer. À ton rythme ✨</div></div>';
    html+='<div class="card"><h3>🧑‍🚀 Mon personnage</h3><div class="avatar-stage"><div class="avatar-big">'+(look.icon||hero)+'</div><div><b>'+look.name+'</b><div style="font-size:.82rem;opacity:.75">'+(pet?'Compagnon : '+pet.icon+' '+pet.name:'Choisis bientôt un compagnon !')+'</div><div class="coin">🪙 '+d.coins+' pièces</div></div></div>';
    html+='<p style="font-size:.85rem">Choisis une tenue que tu as débloquée :</p><div class="avatar-options">';
    looks.forEach(function(x){var owned=d.owned.indexOf(x.id)>=0;html+='<button class="'+(d.look===x.id?'selected':'')+'" onclick="Adventure.look(\''+x.id+'\')">'+x.icon+(owned?'':' 🔒')+'</button>';});
    html+='</div><div class="avatar-options">';
    pets.forEach(function(x){var owned=d.owned.indexOf(x.id)>=0;html+='<button class="'+(d.pet===x.id?'selected':'')+'" onclick="Adventure.pet(\''+x.id+'\')">'+x.icon+(owned?'':' '+x.cost+'🪙')+'</button>';});
    html+='</div><p style="font-size:.75rem;opacity:.7">Les pièces se gagnent en révisant. Rien n’est perdu en cas d’erreur.</p></div>';
    html+='<div class="card"><h3>🗺️ Carte de mon aventure</h3><p style="font-size:.84rem">Zones découvertes : <b>'+unlocked+'/'+zones.length+'</b> · XP cumulés : <b>'+xp+'</b></p><div class="progress"><div style="width:'+(unlocked/zones.length*100)+'%"></div></div><div class="world-map">';
    zones.forEach(function(w,i){var on=xp>=w.xp;html+='<div class="world '+(on?'':'locked')+'" style="background:'+w.color+'"><span>'+(on?w.icon:'🔒')+'</span><strong>'+w.name+'</strong><small>'+(on?'Zone découverte !':'Débloquée à '+w.xp+' XP')+'</small></div>';});
    html+='</div></div>';
    html+='<div class="card"><h3>🎁 Coffre des réussites</h3><div class="reward-box"><div class="chest">🎁</div><b>'+mastered(p)+' chapitre(s) bien avancé(s)</b><p style="font-size:.84rem">Chaque 2 chapitres travaillés à 50 % ou plus donnent automatiquement 20 pièces. Pas de tirage au sort, pas de mauvaise surprise.</p><div class="coin">Solde : '+d.coins+' 🪙</div></div></div>';
    html+='<div class="card"><h3>🌟 Ta prochaine petite mission</h3><p>Une session de 5 à 10 minutes suffit. Termine un quiz ou avance une fiche : ton monde grandira avec tes efforts !</p><button class="big-cta" onclick="goTab(\'cours\')">📖 Je pars réviser</button></div>';
    document.getElementById('view').innerHTML=html;window.scrollTo(0,0);
    var nav=document.querySelector('#drawer nav button[data-tab="aventure"]');if(nav){document.querySelectorAll('#drawer nav button').forEach(function(b){b.classList.toggle('on',b===nav);});}
  }
  function buy(id){var d=data(),x=looks.concat(pets).filter(function(a){return a.id===id;})[0];if(!x)return;if(d.owned.indexOf(id)>=0)return true;if(d.coins<x.cost){alert('Encore un peu de révisions et tu auras assez de pièces !');return false;}d.coins-=x.cost;d.owned.push(id);save(d);return true;}
  window.Adventure={open:open,look:function(id){if(buy(id)){var d=data();d.look=id;save(d);open();}},pet:function(id){if(buy(id)){var d=data();d.pet=id;save(d);open();}}};
})();
