/* Révise+ V8 — carnet de contrôles et analyse pédagogique */
var Controls = (function(){
  var currentText = '';
  function key(){ return 'reviseplus_tests_' + (localStorage.getItem('reviseplus_currentProfile') || 'guest'); }
  function records(){ try{return JSON.parse(localStorage.getItem(key()))||[];}catch(e){return [];} }
  function save(list){localStorage.setItem(key(),JSON.stringify(list));}
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function open(){
    App.setTab('controles');
    var list=records(), html='<div class="section-title">TON CARNET DE RÉUSSITES</div>';
    html+='<div class="card"><h2 style="margin:0 0 6px">📝 Mes contrôles</h2><p style="font-size:.85rem;opacity:.78">Note chaque contrôle, photographie ta copie et découvre ce que tu sais déjà faire… et ce que tu peux améliorer.</p>';
    html+='<div class="control-advice">💛 Une note ne te définit pas. Elle nous aide simplement à trouver la prochaine petite étape.</div>';
    html+='<label>Matière</label><select id="testSubject" style="width:100%;padding:12px;border-radius:12px;margin:6px 0;background:var(--bg2);color:var(--txt);border:1px solid var(--accent)">';
    (REVISE_DATA.matieres||[]).forEach(function(m){html+='<option value="'+esc(m.id)+'">'+esc(m.nom)+'</option>';});
    html+='</select><div class="grid2"><div><label>Note obtenue</label><input id="testGrade" type="number" min="0" max="20" step=".25" placeholder="Ex. 14"></div><div><label>Sur combien ?</label><input id="testOutOf" type="number" min="1" max="100" value="20"></div></div>';
    html+='<label>Date du contrôle</label><input id="testDate" type="date" value="'+new Date().toISOString().slice(0,10)+'">';
    html+='<div class="control-drop"><div style="font-size:2.2rem">📸</div><b>Photographier ou choisir le contrôle</b><p style="font-size:.78rem;opacity:.75">Prends une photo nette de la copie corrigée. L’application lit le texte pour préparer l’analyse.</p><input id="testPhotos" type="file" accept="image/*" multiple onchange="Controls.readPhotos(this.files)"></div>';
    html+='<div id="testOcrStatus" style="font-size:.8rem"></div><label>Texte extrait / remarques (tu peux corriger)</label><textarea id="testText" rows="6" placeholder="Le texte reconnu apparaîtra ici. Tu peux aussi écrire les remarques du professeur…">'+esc(currentText)+'</textarea>';
    html+='<button class="btn" style="width:100%" onclick="Controls.saveTest()">💾 Enregistrer mon contrôle</button>';
    html+='<button class="big-cta" style="margin-top:8px" onclick="Controls.analyse()">🤖 Analyser et trouver mes pistes de progrès</button></div>';
    html+='<div class="card"><h3>📚 Mon historique</h3>';
    if(!list.length) html+='<p style="font-size:.82rem;opacity:.7">Ton premier contrôle apparaîtra ici. Chaque résultat te permettra de voir tes progrès.</p>';
    list.slice().reverse().forEach(function(t){html+='<div class="control-record"><div style="display:flex;justify-content:space-between;align-items:center"><b>'+esc(t.subjectName)+'</b><span class="control-score">'+esc(t.grade)+'/'+esc(t.outOf)+'</span></div><small>'+esc(t.date)+' · '+esc(t.pct)+' %</small><p style="font-size:.76rem;opacity:.75;margin:5px 0">'+esc((t.text||'').slice(0,140))+'</p></div>';});
    html+='</div>';
    App.render(html);
  }
  function readPhotos(files){
    if(!files||!files.length)return;
    var status=document.getElementById('testOcrStatus'), textParts=[],done=0;
    status.textContent='⏳ Lecture des photos… garde cette page ouverte.';
    Array.prototype.forEach.call(files,function(file,index){
      Scan.runOCR(file,function(p){status.textContent='⏳ Lecture de la photo '+(index+1)+' : '+Math.round(p*100)+' %';},function(txt){
        textParts[index]=txt;done++;
        if(done===files.length){currentText=textParts.join('\n\n');document.getElementById('testText').value=currentText;status.textContent='✅ Texte extrait. Vérifie-le : une écriture manuscrite peut être mal reconnue.';}
      },function(err){done++;status.textContent='⚠️ '+err;});
    });
  }
  function saveTest(){
    var grade=parseFloat(document.getElementById('testGrade').value),out=parseFloat(document.getElementById('testOutOf').value);
    if(!isFinite(grade)||!isFinite(out)||out<=0||grade<0||grade>out){alert('Vérifie la note et le barème.');return;}
    var subject=document.getElementById('testSubject'),m=REVISE_DATA.matieres.filter(function(x){return x.id===subject.value;})[0];
    var t={id:Date.now(),subject:subject.value,subjectName:m?m.nom:subject.value,grade:grade,outOf:out,pct:Math.round(grade/out*100),date:document.getElementById('testDate').value,text:document.getElementById('testText').value};
    var list=records();list.push(t);save(list);currentText=t.text;alert('Contrôle enregistré ! Bravo d’avoir pris le temps de faire le point.');open();
  }
  function analyse(){
    var grade=document.getElementById('testGrade').value,out=document.getElementById('testOutOf').value;
    var subject=document.getElementById('testSubject'),m=REVISE_DATA.matieres.filter(function(x){return x.id===subject.value;})[0];
    var txt=document.getElementById('testText').value.trim();
    if(!grade){alert('Ajoute d’abord ta note pour contextualiser l’analyse.');return;}
    if(!txt){alert('Ajoute une photo ou quelques remarques sur les erreurs et corrections du contrôle.');return;}
    if(Tutor.mode()!=='IA'){
      var box=document.getElementById('testOcrStatus');
      box.innerHTML='<div class="control-advice">🔒 <b>Analyse IA non activée.</b><br>La note et le texte peuvent être enregistrés sur ce téléphone, mais l’analyse personnalisée nécessite qu’un parent configure la passerelle IA dans Réglages. Aucune analyse IA n’est simulée ici.</div>';
      return;
    }
    var prompt='Tu es un tuteur pédagogique bienveillant pour un collégien. Analyse ce contrôle. Matière : '+(m?m.nom:subject.value)+'. Note : '+grade+'/'+out+'. Date : '+document.getElementById('testDate').value+'. Texte OCR et annotations de la copie :\n'+txt+'\n\nRéponds en français simple, sans jugement : 1) ce qui est réussi, 2) les erreurs ou notions à retravailler en citant les indices du texte, 3) trois conseils concrets et adaptés, 4) un mini-plan de révision de 10 minutes, 5) deux petites questions d’entraînement. Si le texte est incomplet ou illisible, indique-le et ne devine pas.';
    var box=document.getElementById('testOcrStatus');box.textContent='🤖 Analyse en cours…';
    Tutor.send(prompt,function(answer){box.innerHTML='<div class="card"><h3>✨ Ton bilan de contrôle</h3><div style="white-space:pre-wrap;line-height:1.5;font-size:.88rem">'+esc(answer)+'</div><div class="control-advice">À retenir : on cherche à progresser, pas à être parfait. Tu peux refaire un petit exercice quand tu veux.</div></div>';});
  }
  return {open:open,readPhotos:readPhotos,saveTest:saveTest,analyse:analyse};
})();
window.Controls=Controls;
