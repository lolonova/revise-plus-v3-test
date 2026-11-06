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
  function avatarSVG(emma,id){
    if(emma){
      var colors={base:['#ff8fbd','#a67be8'],princess:['#f6a9d0','#d57be7'],flower:['#8ed9ad','#45b8a1'],unicorn:['#b6a4ff','#f08fc5'],star:['#7bc8f5','#a68bff'],ice:['#a7e7f4','#8aa9ed']};
      var c=colors[id]||colors.base;
      return '<svg class="hero-3d-svg" viewBox="0 0 180 205" role="img" aria-label="Personnage féerique"><defs><linearGradient id="fairyDress" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient><radialGradient id="fairySkin"><stop stop-color="#ffe6d6"/><stop offset="1" stop-color="#eeb9a7"/></radialGradient><linearGradient id="fairyWing"><stop stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#b6eaff" stop-opacity=".35"/></linearGradient></defs><ellipse cx="90" cy="191" rx="48" ry="8" fill="#65427b" opacity=".2"/><path d="M72 91Q24 35 25 89Q27 121 76 125M108 91Q156 35 155 89Q153 121 104 125" fill="url(#fairyWing)" stroke="#fff" stroke-width="3"/><path d="M58 62Q48 15 91 13Q135 15 122 65L115 83H65Z" fill="#75456d"/><path d="M62 52Q64 22 91 22Q119 22 120 55L115 83Q91 105 66 82Z" fill="url(#fairySkin)"/><path d="M70 59Q78 52 84 60M99 60Q107 52 113 59" fill="none" stroke="#513a60" stroke-width="4" stroke-linecap="round"/><circle cx="77" cy="63" r="3" fill="#49334f"/><circle cx="105" cy="63" r="3" fill="#49334f"/><path d="M86 76Q91 82 97 76" fill="none" stroke="#d56e9b" stroke-width="3" stroke-linecap="round"/><circle cx="67" cy="72" r="6" fill="#f49db5" opacity=".65"/><circle cx="115" cy="72" r="6" fill="#f49db5" opacity=".65"/><path d="M73 91Q90 82 107 91L117 108L146 164Q91 190 34 164L63 108Z" fill="url(#fairyDress)" stroke="#fff" stroke-width="3"/><path d="M63 108Q90 125 117 108L127 150Q91 166 53 150Z" fill="#fff" opacity=".2"/><path d="M77 93L90 108L103 93" fill="none" stroke="#fff" stroke-width="3"/><path d="M81 161L77 181M99 161L103 181" stroke="#e9b59e" stroke-width="9" stroke-linecap="round"/><path d="M70 182Q80 176 86 185M94 185Q102 176 112 182" fill="none" stroke="#8d5cba" stroke-width="8" stroke-linecap="round"/><path d="M78 30L91 8L104 30L91 25Z" fill="#ffd86e" stroke="#fff3c5" stroke-width="2"/><circle cx="91" cy="8" r="4" fill="#fff4b0"/></svg>';
    }
    var suit={base:['#f7fbff','#79a8ee'],pilot:['#f8f5ed','#e0a64f'],armor:['#b5c9e9','#526b9d'],neon:['#7cf0e0','#4278d8'],captain:['#fff0c8','#d7a34d'],robot:['#c5e7ef','#6e9eaf']}[id]||['#f7fbff','#79a8ee'];
    return '<svg class="hero-3d-svg" viewBox="0 0 180 205" role="img" aria-label="Explorateur spatial"><defs><linearGradient id="spaceSuit" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+suit[0]+'"/><stop offset="1" stop-color="'+suit[1]+'"/></linearGradient><linearGradient id="spaceGlass"><stop stop-color="#8af2ff"/><stop offset=".55" stop-color="#387bd2"/><stop offset="1" stop-color="#26336e"/></linearGradient></defs><ellipse cx="90" cy="192" rx="49" ry="8" fill="#06132d" opacity=".35"/><path d="M52 65Q42 16 90 12Q138 16 128 65L120 93H60Z" fill="#dceaff" stroke="#789fe0" stroke-width="5"/><path d="M57 45Q90 19 123 45L120 76Q90 94 60 76Z" fill="url(#spaceGlass)" stroke="#f5fdff" stroke-width="5"/><path d="M67 48Q88 32 109 42" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/><circle cx="114" cy="61" r="4" fill="#a8ffff"/><path d="M47 102Q90 83 133 102L151 166Q90 190 29 166Z" fill="url(#spaceSuit)" stroke="#759bd6" stroke-width="5"/><path d="M72 100L90 119L108 100" fill="none" stroke="#fff" stroke-width="4"/><rect x="72" y="122" width="36" height="34" rx="11" fill="#243e8b" stroke="#d9efff" stroke-width="4"/><path d="M82 139H98M90 131V147" stroke="#7ef3ff" stroke-width="4" stroke-linecap="round"/><path d="M47 111L24 143M133 111L156 143" stroke="#d9e9ff" stroke-width="16" stroke-linecap="round"/><path d="M65 163L58 185M115 163L122 185" stroke="#d9e9ff" stroke-width="17" stroke-linecap="round"/><path d="M48 143L58 149M132 143L122 149" stroke="#ffcf66" stroke-width="5" stroke-linecap="round"/><circle cx="90" cy="18" r="5" fill="#ffd56b"/></svg>';
  }
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
    html+='<div class="guardian-card"><div class="guardian-face">'+(emma?'🧚‍♀️':'🤖')+'</div><div class="guardian-talk"><small>'+(emma?'LUMI, TON ANGE GARDIEN':'NOVA, TON COMPAGNON')+'</small><span id="guardianLine">'+(emma?'Tu avances à ton rythme, et chaque petit effort compte 🌷':'Mission du jour : apprendre sans pression. Chaque essai te rend plus fort ! 🚀')+'</span><div class="guardian-actions"><button onclick="Adventure.speak()">🔊 Me parler</button><button onclick="Adventure.calm()">💜 Pause zen</button><button onclick="Adventure.encourage()">✨ Encouragement</button></div></div></div>';
    html+='<div class="mission-launch"><button class="mission-tile" onclick="goTab(\'jeux\')"><span>'+(emma?'🦄':'🎯')+'</span><b>Mini-jeux éducatifs</b><small>Une mission de 5 minutes</small></button><button class="mission-tile" onclick="Adventure.calm()"><span>🌬️</span><b>Pause anti-stress</b><small>On souffle ensemble</small></button></div>';
    html+='<div class="home-section-head"><div><small>MON HÉROS</small><h3>Mon personnage</h3></div><span class="streak-pill">✨ À personnaliser</span></div>';
    html+='<div class="card hero-custom-card '+(emma?'hero-custom-emma':'hero-custom-space')+'"><div class="hero-stage"><div class="hero-orbit"></div><div class="hero-figure">'+avatarSVG(emma,look.id)+'</div><span class="hero-look-badge">'+look.icon+'</span>'+(pet?'<div class="hero-pet">'+pet.icon+'</div>':'')+'<span class="hero-spark spark-one">✦</span><span class="hero-spark spark-two">✧</span></div><div class="hero-meta"><small>MON AVATAR</small><b>'+look.name+'</b><span>'+(pet?'Avec '+pet.name:'Choisis un compagnon !')+'</span><div class="coin" style="margin-top:8px">🪙 '+d.coins+' pièces</div></div></div>';
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
  var guardianMessagesG=['Tu n’as pas besoin de tout réussir du premier coup. Les essais font partie de la mission !','Bien joué pilote ! Tu progresses grâce à tes efforts, pas à la perfection.','On fait une petite pause ? Ton cerveau apprend aussi quand il se repose.','Respire doucement. Une question à la fois, tu peux y arriver.'];
  var guardianMessagesE=['Tu es merveilleuse même quand tu te trompes. On réessaie ensemble ? 🌸','Bravo pour tes efforts ! Chaque petite étoile compte.','On souffle comme une fleur qui s’ouvre… tout doucement.','Tu peux être fière de toi : tu as osé essayer ! ✨'];
  function say(text){try{if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.88;u.pitch=profile()==='Emma'?1.18:.92;window.speechSynthesis.speak(u);}catch(e){}}
  function line(text){var el=document.getElementById('guardianLine');if(el)el.textContent=text;say(text);}
  function encourage(){var a=profile()==='Emma'?guardianMessagesE:guardianMessagesG;line(a[Math.floor(Math.random()*a.length)]);}
  function calm(){var text='Pose les épaules. Inspire doucement pendant 4 secondes… puis expire lentement pendant 6 secondes. Tu peux recommencer deux fois. Rien ne presse.';line(text);}
  function speak(){var el=document.getElementById('guardianLine');say(el?el.textContent:(profile()==='Emma'?'Coucou Emma, je suis là avec toi !':'Salut Gabriel, prêt pour une mission tranquille ?'));}
  window.Adventure={open:open,speak:speak,calm:calm,encourage:encourage,outfit:function(id){if(purchase(id,'outfit'))open();},companion:function(id){if(purchase(id,'pet'))open();},visit:visit};
})();