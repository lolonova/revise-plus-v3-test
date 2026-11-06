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
  var outfitsG=[
    {id:'base',name:'Combinaison d’explorateur',icon:'🧑‍🚀',cost:0},
    {id:'pilot',name:'Pilote stellaire',icon:'🧑‍✈️',cost:35},
    {id:'armor',name:'Armure galactique',icon:'🦾',cost:55},
    {id:'neon',name:'Combinaison néon',icon:'🥽',cost:45},
    {id:'captain',name:'Capitaine des étoiles',icon:'🦸',cost:70},
    {id:'robot',name:'Technicien robot',icon:'🤖',cost:60}
  ];
  var outfitsE=[
    {id:'base',name:'Robe de fée débutante',icon:'🧚‍♀️',cost:0},
    {id:'princess',name:'Robe de princesse',icon:'👸',cost:45},
    {id:'flower',name:'Gardienne des fleurs',icon:'🌸',cost:35},
    {id:'unicorn',name:'Cavalière licorne',icon:'🦄',cost:60},
    {id:'star',name:'Fée des étoiles',icon:'🧚',cost:55},
    {id:'ice',name:'Reine des neiges',icon:'❄️',cost:70}
  ];
  var companionsG=[
    {id:'bot',name:'Mini-robot',icon:'🤖',cost:0},
    {id:'drone',name:'Drone fidèle',icon:'🛸',cost:45},
    {id:'alien',name:'Petit extraterrestre',icon:'👾',cost:55},
    {id:'rover',name:'Rover lunaire',icon:'🚙',cost:65}
  ];
  var companionsE=[
    {id:'cat',name:'Chaton magique',icon:'🐱',cost:0},
    {id:'unicorn',name:'Mini-licorne',icon:'🦄',cost:45},
    {id:'fox',name:'Renard enchanté',icon:'🦊',cost:55},
    {id:'bunny',name:'Lapin des bois',icon:'🐰',cost:45},
    {id:'dragon',name:'Bébé dragon',icon:'🐉',cost:70}
  ];
  function outfits(){return profile()==='Emma'?outfitsE:outfitsG;}
  function companions(){return profile()==='Emma'?companionsE:companionsG;}
  function profile(){return localStorage.getItem('reviseplus_currentProfile')||'Gabriel';}
  function key(){return 'reviseplus_adventure_'+profile();}
  function data(){var emma=profile()==='Emma',starter=emma?'cat':'bot';try{var d=JSON.parse(localStorage.getItem(key()))||{};if(d.coins==null)d.coins=60;if(!d.owned)d.owned=['base'];if(!d.look)d.look='base';if(!d.pet)d.pet=starter;if(d.owned.indexOf(starter)<0)d.owned.push(starter);if(d.claimed==null)d.claimed=0;if(d.world==null)d.world=0;return d;}catch(e){return {coins:60,look:'base',pet:starter,owned:['base',starter],claimed:0,world:0};}}
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
    var emma=profile()==='Emma',hero=emma?'🧚‍♀️':'🧑‍🚀',looks=outfits(),pets=companions();
    var look=looks.filter(function(x){return x.id===d.look;})[0]||looks[0];
    var pet=pets.filter(function(x){return x.id===d.pet;})[0];
    var next=list.filter(function(w){return xp<w.xp;})[0];
    var html='<div class="adventure-scene '+(emma?'scene-magic':'scene-galaxy')+'"><div class="scene-copy"><span class="season-pill">'+(emma?'MON ROYAUME MAGIQUE':'MA GALAXIE')+'</span><h2>Bienvenue, '+profile()+' !</h2><p>'+(emma?'Chaque découverte fait fleurir ton royaume.':'Chaque mission fait grandir ta galaxie.')+'</p><b>⭐ '+xp+' XP · 🪙 '+d.coins+' pièces</b></div><div class="scene-art">'+(emma?'🏰':'🪐')+'</div></div>';
    html+='<div class="home-section-head"><div><small>MON HÉROS</small><h3>Mon personnage</h3></div><span class="streak-pill">✨ À personnaliser</span></div>';
    html+='<div class="card hero-custom-card '+(emma?'hero-custom-emma':'hero-custom-space')+'"><div class="hero-stage"><div class="hero-orbit"></div><div class="hero-figure"><span class="hero-shadow"></span><span class="hero-head">'+(emma?'👧🏻':'🧑🏻‍🚀')+'</span><span class="hero-outfit">'+(look.icon||hero)+'</span></div>'+(pet?'<div class="hero-pet">'+pet.icon+'</div>':'')+'<span class="hero-spark spark-one">✦</span><span class="hero-spark spark-two">✧</span></div><div class="hero-meta"><small>MON AVATAR</small><b>'+look.name+'</b><span>'+(pet?'Avec '+pet.name:'Choisis un compagnon !')+'</span><div class="coin" style="margin-top:8px">🪙 '+d.coins+' pièces</div></div></div>
    html+='<h3 style="margin-top:16px">👕 Mes tenues</h3><div class="avatar-options">';
    looks.forEach(function(x){var own=d.owned.indexOf(x.id)>=0;html+='<button class="'+(d.look===x.id?'selected':'')+'" onclick="Adventure.outfit(\''+x.id+'\')">'+x.icon+(own?'':' '+x.cost+'🪙')+'</button>';});
    html+='</div><h3>🐾 Mes compagnons</h3><div class="avatar-options">';
    pets.forEach(function(x){var own=d.owned.indexOf(x.id)>=0;html+='<button class="'+(d.pet===x.id?'selected':'')+'" onclick="Adventure.companion(\''+x.id+'\')">'+x.icon+(own?'':' '+x.cost+'🪙')+'</button>';});
    html+='</div><small style="opacity:.7">Les pièces se gagnent avec tes efforts. Rien n’est retiré quand tu te trompes.</small></div>';
    html+='<div class="home-section-head"><div><small>CARTE À EXPLORER</small><h3>Les mondes de mon aventure</h3></div><span class="progress-number">'+unlocked+'/'+list.length+'</span></div>';
    html+='<div class="world-map-v8">';
    list.forEach(function(w,i){var on=xp>=w.xp;html+='<button class="world-card '+(on?'':'locked')+'" style="background:'+(emma?'linear-gradient(145deg,#e69bc0,#a68ce0)':'linear-gradient(145deg,#243d83,#5277c8)')+'" onclick="Adventure.visit('+i+')" '+(on?'':'disabled')+'><span class="world-emoji">'+(on?w.icon:'🔒')+'</span><b>'+w.name+'</b><small>'+(on?'Zone découverte ✨':'Débloquée à '+w.xp+' XP')+'</small></button>';});
    html+='</div>';
    html+='<div class="card" style="margin-top:14px"><h3>🎁 Coffre des réussites</h3><div class="reward-box"><div class="chest">🎁</div><b>'+mastered(p)+' chapitre(s) bien avancé(s)</b><p style="font-size:.84rem">Chaque 2 chapitres travaillés à 50 % donnent 20 pièces. Pas de hasard, pas de pénalité.</p><div class="coin">Solde : '+d.coins+' 🪙</div>'+(earned?'<p>🎉 Tu viens de gagner '+earned+' pièces !</p>':'')+'</div></div>';
    html+='<div class="card"><h3>🌟 Ta prochaine mission</h3><p style="font-size:.86rem">'+(next?'Encore '+Math.max(0,next.xp-xp)+' XP pour découvrir <b>'+next.name+'</b> !':'Tu as découvert tous les mondes !')+' Une séance de 5 à 10 minutes suffit.</p><button class="big-cta" onclick="goTab(\'cours\')">📚 Partir en mission de révision</button></div>';
    App.render(html);
  }
  function purchase(id,group){var d=data(),items=group==='outfit'?outfits():companions(),x=items.filter(function(a){return a.id===id;})[0];if(!x)return false;if(d.owned.indexOf(id)<0){if(d.coins<x.cost){alert('Encore un peu de révisions et tu auras assez de pièces !');return false;}d.coins-=x.cost;d.owned.push(id);}if(group==='outfit')d.look=id;else d.pet=id;save(d);return true;}
  function visit(i){var w=zones()[i],p=prog();if(!w||xpTotal(p)<w.xp)return;var d=data();d.world=i;save(d);alert('✨ '+w.name+' ! '+w.desc);open();}
  window.Adventure={open:open,outfit:function(id){if(purchase(id,'outfit'))open();},companion:function(id){if(purchase(id,'pet'))open();},visit:visit};
})();