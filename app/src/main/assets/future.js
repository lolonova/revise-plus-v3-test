/* RÉVISE+ 2030 — expérience adaptative, compétences et audio */
(function(){
'use strict';
var profile=function(){return localStorage.getItem('reviseplus_currentProfile')||'Gabriel';};
var emma=function(){return profile()==='Emma';};
var level=function(){return localStorage.getItem('reviseplus_niveau_'+profile())||'5e';};
var storeKey='reviseplus_sound_'+profile();
var soundOn=localStorage.getItem(storeKey)!=='off';
var audioCtx=null;
function ctx(){if(!audioCtx){var C=window.AudioContext||window.webkitAudioContext;if(C)audioCtx=new C();}if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();return audioCtx;}
function tone(freq,dur,type,vol,delay){var c=ctx();if(!c||!soundOn)return;var o=c.createOscillator(),g=c.createGain(),t=c.currentTime+(delay||0);o.type=type||'sine';o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol||.035,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.03);}
function fx(kind){if(!soundOn)return;if(kind==='success'){tone(523,.13,'sine',.055);tone(659,.15,'sine',.05,.11);tone(784,.22,'sine',.045,.23);}else if(kind==='tap'){tone(440,.055,'triangle',.018);}else if(kind==='level'){tone(392,.12,'sine',.04);tone(523,.12,'sine',.04,.12);tone(659,.18,'sine',.04,.24);tone(1046,.28,'sine',.05,.4);}else{tone(220,.1,'sine',.025);}}
function speak(text){try{if(window.NativeBridge&&NativeBridge.speak)NativeBridge.speak(text);else if('speechSynthesis'in window){speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.94;speechSynthesis.speak(u);}}catch(e){}}
function img(){return emma()?'images/lumi-fairy.jpg':'images/nova-robot.jpg';}
function hero(){return emma()?'images/lumi-fairy.jpg':'images/gabriel-explorer.jpg';}
function safe(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function skill(ch){
 var t=(ch.titre||'').toLowerCase(),m=ch.mat;
 var prefix={
 maths:'Raisonner, calculer et communiquer une démarche mathématique',
 francais:'Lire, comprendre et s’exprimer avec précision',
 histoire:'Se repérer dans le temps et construire un raisonnement historique',
 geo:'Se repérer dans l’espace et comprendre les territoires',
 svt:'Observer le vivant et expliquer les phénomènes naturels',
 physique:'Décrire, modéliser et expliquer un phénomène scientifique',
 anglais:'Comprendre et communiquer en anglais dans des situations concrètes',
 italien:'Comprendre et communiquer en italien dans des situations concrètes'
 }[m]||'Comprendre et réinvestir les connaissances';
 var verb=t.match(/fractions?|calcul|équation|puissance|théorème|géométrie|proportion|fonction|conjugaison|grammaire|orthographe|lecture|rédaction|révolution|guerre|monde|carte|corps|cellule|énergie|électricité|atome|matière|présent|prétérit|vocabulaire/);
 return {title:ch.titre,skill:prefix,action:verb?'Maîtriser les notions de « '+ch.titre+' » et les mobiliser dans un exercice.':'Expliquer les idées essentielles et les appliquer à une situation nouvelle.'};
}
function allChapters(lvl,mat){return (REVISE_DATA.chapitres||[]).filter(function(c){return c.niveau===lvl&&(!mat||c.mat===mat);});}
function pctFor(p,id){return Math.max(0,Math.min(100,Number((p.maitrise||{})[id]||0)));}
function soundButton(){return '<button class="fx-toggle" onclick="R2030.toggleSound()" aria-label="Activer ou couper les effets sonores">'+(soundOn?'♫ SON':'♫ MUET')+'</button>';}
function open(){
 if(!window.App||!App.load||!window.REVISE_DATA)return;
 App.setTab('competences');
 var p=App.load(),lvl=level(),mats=REVISE_DATA.matieres||[],chap=allChapters(lvl),mastered=chap.filter(function(c){return pctFor(p,c.id)>=80;}).length,working=chap.filter(function(c){return pctFor(p,c.id)>0&&pctFor(p,c.id)<80;}).length;
 var html='<section class="future-screen"><div class="future-hero '+(emma()?'future-emma':'future-gabriel')+'"><div class="future-orbit"></div><div class="future-top"><span>TON CENTRE DE PROGRESSION</span>'+soundButton()+'</div><div class="future-hero-row"><div><small>CAP SUR TES PROGRÈS</small><h2>Tu construis tes compétences, '+(emma()?'Emma':'Gabriel')+' !</h2><p>Chaque notion comprise devient un pouvoir que tu gardes.</p></div><img src="'+hero()+'" alt="Ton personnage"></div><div class="future-stats"><div><b>'+chap.length+'</b><span>notions au programme</span></div><div><b>'+mastered+'</b><span>bien maîtrisées</span></div><div><b>'+working+'</b><span>en progression</span></div></div></div>';
 html+='<div class="future-level-row"><div><small>TON PARCOURS</small><h3>Choisis ta classe</h3></div><div class="future-levels">'+['5e','4e','3e'].map(function(x){return '<button class="'+(lvl===x?'active':'')+'" onclick="R2030.setLevel(\''+x+'\')">'+x+'</button>';}).join('')+'</div></div>';
 html+='<div class="future-note"><span class="future-note-icon">✦</span><div><b>Pas de course, pas de classement.</b><p>On avance à ton rythme. Une compétence peut être retravaillée autant de fois que nécessaire.</p></div></div>';
 mats.forEach(function(m){
  var list=allChapters(lvl,m.id);if(!list.length)return;
  var done=list.filter(function(c){return pctFor(p,c.id)>=80;}).length;
  html+='<section class="skill-subject"><div class="skill-subject-head"><div class="subject-glyph '+safe(m.id)+'">'+glyph(m.id)+'</div><div><h3>'+safe(m.nom)+'</h3><small>'+list.length+' compétences · '+done+' consolidées</small></div><span class="subject-percent">'+Math.round(done/list.length*100)+'%</span></div><div class="skill-track"><i style="width:'+(done/list.length*100)+'%"></i></div><div class="skill-list">';
  list.forEach(function(c,i){var s=skill(c),v=pctFor(p,c.id),state=v>=80?'acquis':v>0?'en-cours':'à-découvrir';
   html+='<button class="skill-row" onclick="R2030.openChapter(\''+safe(c.id)+'\')"><span class="skill-index">'+String(i+1).padStart(2,'0')+'</span><span class="skill-copy"><b>'+safe(s.title)+'</b><small>'+safe(s.action)+'</small></span><span class="skill-state '+state+'">'+(v>=80?'MAÎTRISÉ':v>0?v+'%':'À FAIRE')+'</span><span class="skill-arrow">›</span></button>';
  });
  html+='</div></section>';
 });
 html+='<div class="future-footer">Révise+ te guide, mais c’est toi qui fais le chemin. ✨</div></section>';
 document.getElementById('view').innerHTML=html;window.scrollTo(0,0);
}
function glyph(id){var paths={maths:'M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h4',francais:'M6 3h12v18H6z M9 8h6 M9 12h6 M9 16h4',histoire:'M4 20h16 M6 20V8l6-4 6 4v12 M9 12h6',geo:'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18 M3 12h18 M12 3c4 4 4 14 0 18 M12 3c-4 4-4 14 0 18',svt:'M9 3h6 M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3 M7 15h10',physique:'M12 3v18 M3 12h18 M5 5l14 14 M19 5L5 19',anglais:'M4 5h16v14H4z M8 9h8 M8 13h5',italien:'M4 5h16v14H4z M8 9h8 M8 13h5'};return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(paths[id]||paths.maths)+'"/></svg>';}
function setLevel(v){localStorage.setItem('reviseplus_niveau_'+profile(),v);open();fx('tap');}
function openChapter(id){fx('tap');if(window.App&&App.openChapter)App.openChapter(id);}
function toggleSound(){soundOn=!soundOn;localStorage.setItem(storeKey,soundOn?'on':'off');if(soundOn)fx('success');var b=document.getElementById('fxGlobal');if(b)b.textContent=soundOn?'♫':'♪';var all=document.querySelectorAll('.fx-toggle');all.forEach(function(x){x.textContent=soundOn?'♫ SON':'♫ MUET';});}
function goTab(t){if(t==='competences'){open();return;}if(t==='jeux'&&window.App&&typeof App.openGames==='function'){App.openGames();return;}if(typeof oldGo==='function'){oldGo(t);}else if(window.App&&typeof window.App.goTab==='function'){window.App.goTab(t);}}
// Ne jamais bloquer le démarrage si le moteur principal n'est pas encore disponible.
var appApi=window.App||null;
var oldGo=appApi&&typeof appApi.goTab==='function'?appApi.goTab:null;
if(appApi){appApi.goTab=goTab;}
window.goTab=goTab;
window.R2030={open:open,setLevel:setLevel,openChapter:openChapter,toggleSound:toggleSound,speak:speak,fx:fx};
document.addEventListener('DOMContentLoaded',function(){
 var nav=document.querySelector('#drawer nav');
 if(nav&&!document.getElementById('futureTab')){var b=document.createElement('button');b.id='futureTab';b.dataset.tab='competences';b.innerHTML='<span class="ic">✧</span>Mes compétences';b.onclick=function(){goTab('competences');};nav.insertBefore(b,nav.querySelector('[data-tab="controles"]'));}
 var logo=document.querySelector('.banner .logo');if(logo){logo.innerHTML='<span class="logo-star">✦</span>';logo.setAttribute('aria-label','Révise plus');}var menu=document.getElementById('menuBtn');if(menu&&!document.getElementById('fxGlobal')){var sb=document.createElement('button');sb.id='fxGlobal';sb.className='fx-global';sb.type='button';sb.textContent=soundOn?'♫':'♪';sb.title='Effets sonores';sb.setAttribute('aria-label','Activer ou couper les sons');sb.onclick=toggleSound;menu.parentNode.insertBefore(sb,menu);}
 document.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(b.classList.contains('fx-toggle'))return;fx('tap');},{passive:true});
 document.addEventListener('click',function(e){var el=e.target.closest('.guardian-home');if(el){var msg=emma()?'Coucou Emma ! Je suis là pour t’aider. On avance tranquillement, une étape à la fois.':'Salut Gabriel ! Prêt pour une petite mission ? Chaque essai te rend plus fort.';speak(msg);}},{passive:true});
});
})();