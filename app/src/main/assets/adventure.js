/* Révise+ V8 — univers d'aventure, progression positive et personnalisation */
(function(){
  var worldsG=[
    {name:'Base orbitale',icon:'🚀',xp:0,desc:'Le point de départ de ton odyssée.',scene:'scene-galaxy'},
    {name:'Lune des robots',icon:'🤖',xp:80,desc:'Réveille les petits robots explorateurs.',scene:'scene-galaxy'},
    {name:'Planète cristal',icon:'💎',xp:220,desc:'Explore les grottes de cristaux.',scene:'scene-galaxy'},
    {name:'Nébuleuse',icon:'🌌',xp:420,desc:'Traverse les nuages lumineux.',scene:'scene-galaxy'},
    {name:'Station des étoiles',icon:'🛰️',xp:700,desc:'Construis ton observatoire spatial.',scene:'scene-galaxy'},
    {name:'Galaxie légendaire',icon:'🌠',xp:1100,desc:'La grande frontière t’attend.',scene:'scene-galaxy'}
  ];
  var worldsE=[
    {name:'Jardin enchanté',icon:'🌷',xp:0,desc:'Un jardin fleuri pour commencer.',scene:'scene-magic'},
    {name:'Forêt des fées',icon:'🧚',xp:80,desc:'Rencontre les fées et leurs amis.',scene:'scene-magic'},
    {name:'Château nuage',icon:'🏰',xp:220,desc:'Un château perché dans les nuages.',scene:'scene-magic'},
    {name:'Lac des étoiles',icon:'🦢',xp:420,desc:'Un lac magique et scintillant.',scene:'scene-magic'},
    {name:'Vallée des animaux',icon:'🐰',xp:700,desc:'De nouveaux compagnons à rencontrer.',scene:'scene-magic'},
    {name:'Royaume arc-en-ciel',icon:'🌈',xp:1100,desc:'Le royaume merveilleux !',scene:'scene-magic'}
  ];
  var outfits=[{id:'base',name:'Tenue de départ',icon:'🧑‍🚀',cost:0},{id:'star',name:'Cape étoilée',icon:'🦸',cost:35},{id:'crown',name:'Couronne royale',icon:'👑',cost:45},{id:'glasses',name:'Lunettes cool',icon:'🕶️',cost:25},{id:'flower',name:'Couronne fleurie',icon:'🌸',cost:35},{id:'wizard',name:'Cape magique',icon:'🪄',cost:55}];
  var companions=[{id:'bot',name:'Mini-robot',icon:'🤖',cost:45},{id:'cat',name:'Chaton',icon:'🐱',cost:45},{id:'fox',name:'Petit renard',icon:'🦊',cost:60},{id:'unicorn',name:'Licorne',icon:'🦄',cost:70}];
  function profile(){return localStorage.getItem('reviseplus_currentProfile')||'Gabriel';}
  function key(){return 'reviseplus_adventure_'+profile();}
  function data(){try{return JSON.parse(localStorage.getItem(key()))||{coins:60,look:'base',pet:'',owned:['base'],claimed:0,world:0};}catch(e){return {coins:60,look:'base',pet:'',owned:['base'],claimed:0,world:0};}}
  function save(d){localStorage.setItem(key(),JSON.stringify(d));}
  function prog(){try{return JSON.parse(localStorage.getItem('reviseplus_'+profile()))||{};}catch(e){return {};}}
  function xpTotal(p){return Math.max(0,(Math.max(1,p.niveau||1)-1)*100+(p.xp||0));}
  function mastered(p){return Object.keys(p.maitrise||{}).filter(function(k){return p.maitrise[k]>=50;}).length;}
  function zones(){return profile()==='Emma'?worldsE:worldsG;}
  function reward(d,p){var milestone=Math.floor(mastered(p)/2);if(milestone>d.claimed){var earned=(milestone-d.claimed)*20;d.coins+=earned;d.claimed=milestone;save(d);return earned;}return 0;}
  function open(){
    App.setTab('aventure');
    var p=prog(),d=data(),xp=xpTotal(p),list=zones(),unlocked=list.filter(function(w){return xp>=w.xp;}).length;
    var earned=reward(d,p);d=data();
    var emma=profile()==='Emma',hero=emma?'🐱':'🧑‍🚀';
    var look=outfits.filter(function(x){return x.id===d.look;})[0]||outfits[0];
    var pet=companions.filter(function(x){return x.id===d.pet;})[0];
    var next=list.filter(function(w){return xp<w.xp;})[0];
    var html='<div class="adventure-scene '+(emma?'scene-magic':'scene-galaxy')+'"><div class="scene-copy"><span class="season-pill">'+(emma?'MON ROYAUME MAGIQUE':'MA GALAXIE')+'</span><h2>Bienvenue, '+profile()+' !</h2><p>'+(emma?'Chaque découverte fait fleurir ton royaume.':'Chaque mission fait grandir ta galaxie.')+'</p><b>⭐ '+xp+' XP · 🪙 '+d.coins+' pièces</b></div><div class="scene-art">'+(emma?'🏰':'🪐')+'</div></div>';
    html+='<div class="home-section-head"><div><small>MON HÉROS</small><h3>Mon personnage</h3></div><span class="streak-pill">✨ À personnaliser</span></div>';
    html+='<div class="card"><div class="avatar-display"><div class="avatar-token">'+(look.icon||hero)+'</div><div><b style="font-size:1.05rem">'+look.name+'</b><div style="font-size:.78rem;opacity:.75;margin-top:4px">'+(pet?'Compagnon : '+pet.icon+' '+pet.name:'Choisis un compagnon !')+'</div><div class="coin" style="margin-top:7px">🪙 '+d.coins+' pièces</div></div></div>';
    html+='<h3 style="margin-top:16px">👕 Mes tenues</h3><div class="avatar-options">';
    outfits.forEach(function(x){var own=d.owned.indexOf(x.id)>=0;html+='<button class="'+(d.look===x.id?'selected':'')+'" onclick="Adventure.outfit(\''+x.id+'\')">'+x.icon+(own?'':' '+x.cost+'🪙')+'</button>';});
    html+='</div><h3>🐾 Mes compagnons</h3><div class="avatar-options">';
    companions.forEach(function(x){var own=d.owned.indexOf(x.id)>=0;html+='<button class="'+(d.pet===x.id?'selected':'')+'" onclick="Adventure.companion(\''+x.id+'\')">'+x.icon+(own?'':' '+x.cost+'🪙')+'</button>';});
    html+='</div><small style="opacity:.7">Les pièces se gagnent avec tes efforts. Rien n’est retiré quand tu te trompes.</small></div>';
    html+='<div class="home-section-head"><div><small>CARTE À EXPLORER</small><h3>Les mondes de mon aventure</h3></div><span class="progress-number">'+unlocked+'/'+list.length+'</span></div>';
    html+='<div class="world-map-v8">';
    list.forEach(function(w,i){var on=xp>=w.xp;html+='<button class="world-card '+(on?'':'locked')+'" style="background:'+(emma?'linear-gradient(145deg,#e69bc0,#a68ce0)':'linear-gradient(145deg,#243d83,#5277c8)')+'" onclick="Adventure.visit('+i+')" '+(on?'':'disabled')+'><span class="world-emoji">'+(on?w.icon:'🔒')+'</span><b>'+w.name+'</b><small>'+(on?'Zone découverte ✨':'Débloquée à '+w.xp+' XP')+'</small></button>';});
    html+='</div>';
    html+='<div class="card" style="margin-top:14px"><h3>🎁 Coffre des réussites</h3><div class="reward-box"><div class="chest">🎁</div><b>'+mastered(p)+' chapitre(s) bien avancé(s)</b><p style="font-size:.84rem">Chaque 2 chapitres travaillés à 50 % donnent 20 pièces. Pas de hasard, pas de pénalité.</p><div class="coin">Solde : '+d.coins+' 🪙</div>'+(earned?'<p>🎉 Tu viens de gagner '+earned+' pièces !</p>':'')+'</div></div>';
    html+='<div class="card"><h3>🌟 Ta prochaine mission</h3><p style="font-size:.86rem">'+(next?'Encore '+Math.max(0,next.xp-xp)+' XP pour découvrir <b>'+next.name+'</b> !':'Tu as découvert tous les mondes !')+' Une séance de 5 à 10 minutes suffit.</p><button class="big-cta" onclick="goTab(\'cours\')">📚 Partir en mission de révision</button></div>';
    App.render(html);
  }
  function purchase(id,group){var d=data(),items=group==='outfit'?outfits:companions,x=items.filter(function(a){return a.id===id;})[0];if(!x)return false;if(d.owned.indexOf(id)<0){if(d.coins<x.cost){alert('Encore un peu de révisions et tu auras assez de pièces !');return false;}d.coins-=x.cost;d.owned.push(id);}if(group==='outfit')d.look=id;else d.pet=id;save(d);return true;}
  function visit(i){var w=zones()[i],p=prog();if(!w||xpTotal(p)<w.xp)return;var d=data();d.world=i;save(d);alert('✨ '+w.name+' ! '+w.desc);open();}
  window.Adventure={open:open,outfit:function(id){if(purchase(id,'outfit'))open();},companion:function(id){if(purchase(id,'pet'))open();},visit:visit};
})();