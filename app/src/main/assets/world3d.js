/* Révise+ 3D — prototype WebGL autonome, sans bibliothèque ni service payant */
(function(){
'use strict';
var host,canvas,gl,program,buf,loc={},profile='Gabriel',hero=0,mode='map',pos={x:0,z:0},target=0,raf=0,last=0;
var colors=[[0.18,0.62,0.94],[0.92,0.42,0.28],[0.38,0.78,0.48],[0.72,0.48,0.9]];
var places=[{name:'La Clairière des savoirs',x:-7,z:-5,icon:'🌲',mission:'Découvre les premières notions.'},{name:'Le Village des énigmes',x:7,z:-5,icon:'🏘️',mission:'Résous les défis du village.'},{name:'La Tour des découvertes',x:-7,z:6,icon:'🏰',mission:'Gravis la tour en apprenant.'},{name:'La Grotte des mystères',x:7,z:6,icon:'💎',mission:'Explore et trouve les réponses.'}];
var meshes={},avatarStyle=Number(localStorage.getItem('rp3d_style')||0),avatarNames=['Explorateur','Gardienne','Mage','Aventurière'];
var palettes=[{skin:[.86,.61,.43],cloth:[.12,.35,.78],hair:[.12,.08,.06],trim:[.95,.68,.18]},{skin:[.95,.72,.58],cloth:[.72,.16,.3],hair:[.22,.12,.08],trim:[1,.78,.28]},{skin:[.65,.43,.3],cloth:[.28,.18,.58],hair:[.08,.07,.12],trim:[.35,.85,.9]},{skin:[.9,.68,.48],cloth:[.12,.48,.34],hair:[.42,.19,.08],trim:[.95,.78,.42]}];
var vs='attribute vec3 p; attribute vec3 c; uniform mat4 mvp; varying vec3 v; void main(){gl_Position=mvp*vec4(p,1.0);v=c;}';
var fs='precision mediump float; varying vec3 v; void main(){gl_FragColor=vec4(v,1.0);}';
function shader(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
function matmul(a,b){var o=new Float32Array(16);for(var r=0;r<4;r++)for(var c=0;c<4;c++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o;}
function perspective(f,a,n,far){var t=1/Math.tan(f/2),o=new Float32Array(16);o[0]=t/a;o[5]=t;o[10]=(far+n)/(n-far);o[11]=-1;o[14]=2*far*n/(n-far);return o;}
function look(eye,center,up){var z=norm([eye[0]-center[0],eye[1]-center[1],eye[2]-center[2]]),x=norm(cross(up,z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]);}
function norm(v){var l=Math.hypot(v[0],v[1],v[2])||1;return v.map(x=>x/l);}function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
function model(x,y,z,sx,sy,sz,ry){var c=Math.cos(ry||0),s=Math.sin(ry||0);return new Float32Array([c*sx,0,-s*sx,0,0,sy,0,0,s*sz,0,c*sz,0,x,y,z,1]);}
function mesh(name,verts){var a=new Float32Array(verts);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,a,gl.STATIC_DRAW);meshes[name]={b,count:a.length/6};}
function face(a,b,c,col,out){[a,b,c].forEach(v=>out.push(v[0],v[1],v[2],col[0],col[1],col[2]));}
function cube(){var o=[],p=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],f=[[0,1,2,3],[5,4,7,6],[4,0,3,7],[1,5,6,2],[3,2,6,7],[4,5,1,0]],cols=[[.82,.9,.94],[.65,.78,.86],[.7,.82,.65],[.72,.84,.72],[.9,.9,.75],[.68,.78,.88]];f.forEach((q,i)=>{face(p[q[0]],p[q[1]],p[q[2]],cols[i],o);face(p[q[0]],p[q[2]],p[q[3]],cols[i],o)});return o;}
function cone(){var o=[],n=9;for(var i=0;i<n;i++){var a=i*2*Math.PI/n,b=(i+1)*2*Math.PI/n,p=[Math.cos(a)*.5,-.5,Math.sin(a)*.5],q=[Math.cos(b)*.5,-.5,Math.sin(b)*.5],tip=[0,.5,0];face(p,q,tip,[.16,.46,.25],o);face([0,-.5,0],q,p,[.24,.57,.3],o)}return o;}
function cylinder(){var o=[],n=10;for(var i=0;i<n;i++){var a=i*2*Math.PI/n,b=(i+1)*2*Math.PI/n,p=[Math.cos(a)*.5,-.5,Math.sin(a)*.5],q=[Math.cos(b)*.5,-.5,Math.sin(b)*.5],u=[Math.cos(a)*.5,.5,Math.sin(a)*.5],v=[Math.cos(b)*.5,.5,Math.sin(b)*.5];face(p,q,v,[.47,.3,.16],o);face(p,v,u,[.58,.39,.2],o)}return o;}
function sphere(){var o=[],lat=7,lon=10;for(var i=0;i<lat;i++)for(var j=0;j<lon;j++){function pt(a,b){return [Math.sin(a)*Math.cos(b)*.5,Math.cos(a)*.5,Math.sin(a)*Math.sin(b)*.5]}var a=i*Math.PI/lat,b=(i+1)*Math.PI/lat,c=j*2*Math.PI/lon,d=(j+1)*2*Math.PI/lon,p=pt(a,c),q=pt(b,c),r=pt(b,d),s=pt(a,d);face(p,q,r,[.9,.77,.61],o);face(p,r,s,[.95,.84,.7],o)}return o;}
function cubeColor(col){var o=cube();for(var i=0;i<o.length;i+=6){o[i+3]=col[0];o[i+4]=col[1];o[i+5]=col[2];}return o;}
function sphereColor(col){var o=sphere();for(var i=0;i<o.length;i+=6){o[i+3]=col[0];o[i+4]=col[1];o[i+5]=col[2];}return o;}
function terrain(){var o=[],n=44,step=42/n;function h(x,z){return .24*Math.sin(x*.38)*Math.cos(z*.31)+.14*Math.sin(z*.72+x*.2);}for(var iz=0;iz<n;iz++)for(var ix=0;ix<n;ix++){var x=-21+ix*step,z=-21+iz*step,x2=x+step,z2=z+step;var a=[x,h(x,z),z],b=[x2,h(x2,z),z],c=[x2,h(x2,z2),z2],d=[x,h(x,z2),z2];var v=h(x,z);var col=v>.17?[.28,.48,.27]:[.31,.56,.31];face(a,b,c,col,o);face(a,c,d,col,o);}return o;}
function pathMesh(){var o=[];for(var i=0;i<24;i++){var z=-16+i*1.4,x=Math.sin(i*.24)*1.2;var a=[x-.9,.08,z],b=[x+.9,.08,z],c=[x+.9,.08,z+1.5],d=[x-.9,.08,z+1.5];face(a,b,c,[.63,.49,.32],o);face(a,c,d,[.58,.43,.28],o);}return o;}
function initGL(){gl=canvas.getContext('webgl',{antialias:true,alpha:false});if(!gl)throw Error('WebGL indisponible sur cet appareil');program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Shader WebGL');gl.useProgram(program);loc.p=gl.getAttribLocation(program,'p');loc.c=gl.getAttribLocation(program,'c');loc.mvp=gl.getUniformLocation(program,'mvp');mesh('cube',cube());mesh('tree',cone());mesh('trunk',cylinder());mesh('ball',sphere());mesh('skin',sphereColor([.86,.61,.43]));mesh('cloth0',cubeColor([.12,.35,.78]));mesh('hair0',sphereColor([.12,.08,.06]));mesh('trim0',cubeColor([.95,.68,.18]));mesh('terrain',terrain());mesh('path',pathMesh());gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);}
function drawObj(name,x,y,z,sx,sy,sz,col,ry,vp){var m=model(x,y,z,sx,sy,sz,ry),mvp=matmul(vp,m),me=meshes[name];gl.bindBuffer(gl.ARRAY_BUFFER,me.b);gl.enableVertexAttribArray(loc.p);gl.enableVertexAttribArray(loc.c);gl.vertexAttribPointer(loc.p,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(loc.c,3,gl.FLOAT,false,24,12);gl.uniformMatrix4fv(loc.mvp,false,mvp);gl.drawArrays(gl.TRIANGLES,0,me.count);}
function scene(vp){
drawObj('terrain',0,0,0,1,1,1,0,0,vp);
drawObj('path',0,0,0,1,1,1,0,0,vp);
// rivière sinueuse et berges
for(var w=0;w<15;w++){var wz=-13+w*1.9,wx=8+Math.sin(w*.38)*1.4;drawObj('cube',wx,.12,wz,2.1,.13,2.1,0,.12,vp);}
// montagnes en arrière-plan
for(var m=0;m<9;m++){var mx=-19+m*4.8,mz=-19-(m%2)*2;drawObj('tree',mx,2.8,mz,5.5,7,5.5,0,0,vp);drawObj('tree',mx,6.2,mz,3.4,4.5,3.4,0,0,vp);}
// arbres variés avec feuillages en étages
for(var i=0;i<54;i++){var x=((i*17)%39)-19,z=((i*23)%39)-19;if(Math.abs(x)<4&&Math.abs(z)<4)continue;var sc=.75+(i%4)*.16;drawObj('trunk',x,.65,z,.38,1.8*sc,.38,0,0,vp);drawObj('tree',x,1.8*sc,z,2.1*sc,2.5*sc,2.1*sc,0,0,vp);drawObj('tree',x,2.65*sc,z,1.45*sc,1.8*sc,1.45*sc,0,0,vp);}
// rochers et touffes
for(var r=0;r<18;r++){var rx=((r*11)%35)-17,rz=((r*19)%35)-17;drawObj('ball',rx,.22,rz,.7+(r%3)*.25,.42,.6,0,r*.3,vp);}
// lieux avec architecture différenciée
places.forEach((p,i)=>{var roof=i===0?[.7,1.2,1.8]:[1.2,1.2,1.2];drawObj('cube',p.x,.6,p.z,3.2,1.2,3.2,0,0,vp);drawObj('cube',p.x,1.65,p.z,2.6,1.2,2.6,0,Math.PI/4,vp);drawObj('tree',p.x,2.9,p.z,1.8,2.6,1.8,0,0,vp);drawObj('cube',p.x-1.45,1.6,p.z, .35,2.4,.35,0,0,vp);drawObj('cube',p.x+1.45,1.6,p.z,.35,2.4,.35,0,0,vp);drawObj('ball',p.x,3.9,p.z,.42,.42,.42,0,0,vp);});
// personnage : bottes, jambes, tunique, bras, tête, cheveux, cape et ceinture
var pal=palettes[avatarStyle%palettes.length];
drawObj('cube',pos.x-.22,.22,pos.z,.24,.42,.34,0,0,vp);drawObj('cube',pos.x+.22,.22,pos.z,.24,.42,.34,0,0,vp);
drawObj('cloth0',pos.x,.86,pos.z,.82,.92,.48,0,0,vp);
drawObj('cube',pos.x,.95,pos.z-.27,.72,.18,.12,0,0,vp);
drawObj('skin',pos.x-.52,.98,pos.z,.23,.72,.24,0,0,vp);drawObj('skin',pos.x+.52,.98,pos.z,.23,.72,.24,0,0,vp);
drawObj('skin',pos.x,1.62,pos.z,.58,.62,.56,0,0,vp);
drawObj('hair0',pos.x,1.91,pos.z-.02,.64,.34,.62,0,0,vp);
drawObj('trim0',pos.x,1.68,pos.z-.31,.12,.1,.05,0,0,vp);
drawObj('cube',pos.x,1.18,pos.z+.29,.72,.72,.12,0,0,vp);
if(mode==='place'){var p=places[target];drawObj('cube',p.x,.14,p.z,11,.25,11,0,0,vp);drawObj('cube',p.x,1.8,p.z,3.4,3,3.4,0,.4,vp);drawObj('tree',p.x+3,2.7,p.z+2,2.5,3.2,2.5,0,0,vp);}
}

function frame(t){raf=requestAnimationFrame(frame);if(!gl)return;var dt=Math.min(.04,(t-last)/1000||.016);last=t;var w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==w*devicePixelRatio||canvas.height!==h*devicePixelRatio){canvas.width=w*devicePixelRatio;canvas.height=h*devicePixelRatio;}gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(.48,.72,.88,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);var eye=mode==='map'?[pos.x+13,19,pos.z+18]:[pos.x+5,5.4,pos.z+8],center=mode==='map'?[0,0,0]:[pos.x,1,pos.z-3];var vp=matmul(perspective(.78,w/h,.1,100),look(eye,center,[0,1,0]));scene(vp);}
function move(dx,dz){var k=mode==='map'?1.8:1.1;pos.x=Math.max(-17,Math.min(17,pos.x+dx*k));pos.z=Math.max(-17,Math.min(17,pos.z+dz*k));}
function enter(i){target=i;pos.x=places[i].x;pos.z=places[i].z;mode='place';document.getElementById('rp3d-title').textContent=places[i].name;document.getElementById('rp3d-desc').textContent=places[i].mission;document.getElementById('rp3d-mission').style.display='block';}
function show(){
if(document.getElementById('rp3d')){document.getElementById('rp3d').remove();cancelAnimationFrame(raf);}
var wrap=document.createElement('div');wrap.id='rp3d';
wrap.innerHTML='<div class="rp3d-top"><button id="rp3d-back">‹ Retour</button><b>MON MONDE 3D</b><span id="rp3d-xp">✦ '+(function(){try{return App.load().xp||0}catch(e){return 0}})()+' XP</span></div><canvas id="rp3d-canvas"></canvas><div class="rp3d-hint" id="rp3d-hint">Choisis ton aventurier, puis explore la carte.</div><div class="rp3d-avatar">'+avatarNames.map((n,i)=>'<button data-avatar="'+i+'" class="'+(i===avatarStyle?'sel':'')+'">'+['🧭','🛡️','🔮','🏹'][i]+'<small>'+n+'</small></button>').join('')+'</div><div class="rp3d-nodes">'+places.map((p,i)=>'<button data-place="'+i+'"><i>'+p.icon+'</i><span>'+p.name+'</span></button>').join('')+'</div><div class="rp3d-pad"><button data-move="0,-1">▲</button><div><button data-move="-1,0">◀</button><button data-move="0,1">▼</button><button data-move="1,0">▶</button></div></div><div class="rp3d-mission" id="rp3d-mission" style="display:none"><small>DESTINATION</small><h2 id="rp3d-title"></h2><p id="rp3d-desc"></p><button id="rp3d-return">Retour à la carte</button></div>';
var style=document.createElement('style');style.id='rp3d-style';style.textContent='#rp3d{position:fixed;inset:0;z-index:99999;background:#132d3b;color:#fff;font-family:system-ui;overflow:hidden}#rp3d-canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}.rp3d-top{position:absolute;z-index:3;top:env(safe-area-inset-top,8px);left:10px;right:10px;display:flex;align-items:center;justify-content:space-between;gap:8px}.rp3d-top button,.rp3d-mission button{border:0;border-radius:18px;padding:10px 14px;background:#fff;color:#18334a;font-weight:800}.rp3d-top b{font-size:12px;letter-spacing:1px;text-shadow:0 2px 5px #123}.rp3d-top span{font-weight:800;font-size:12px;text-shadow:0 2px 5px #123}.rp3d-hint{position:absolute;z-index:2;top:62px;left:12px;right:12px;text-align:center;font-size:12px;text-shadow:0 2px 5px #123}.rp3d-avatar{position:absolute;z-index:3;top:105px;right:9px;display:grid;gap:5px}.rp3d-avatar button{border:1px solid #ffffff66;border-radius:12px;background:#173b4dcc;color:#fff;padding:6px;font-size:20px}.rp3d-avatar small{display:block;font-size:9px}.rp3d-avatar button.sel{border:2px solid #ffd66b;background:#285d72}.rp3d-nodes{position:absolute;z-index:3;top:105px;left:9px;display:grid;gap:7px;max-width:47%}.rp3d-nodes button{border:1px solid #ffffff70;background:#173b4dcc;color:#fff;border-radius:13px;padding:8px;text-align:left;display:flex;gap:7px;align-items:center;font-size:11px}.rp3d-nodes i{font-style:normal;font-size:18px}.rp3d-pad{position:absolute;z-index:3;bottom:24px;left:14px;display:grid;gap:5px}.rp3d-pad>button{margin:auto}.rp3d-pad div{display:flex;gap:6px}.rp3d-pad button{width:43px;height:43px;border:1px solid #ffffff80;border-radius:14px;background:#173b4dcc;color:white;font-size:20px}.rp3d-mission{position:absolute;z-index:4;bottom:25px;right:12px;width:52%;box-sizing:border-box;background:#102c3bed;border:1px solid #ffffff55;border-radius:20px;padding:15px;box-shadow:0 10px 30px #0018}.rp3d-mission small{color:#a8f2d0;font-weight:800;font-size:10px}.rp3d-mission h2{font-size:19px;margin:7px 0}.rp3d-mission p{font-size:13px;line-height:1.4}.rp3d-mission button{width:100%}';
document.head.appendChild(style);document.body.appendChild(wrap);host=wrap;canvas=document.getElementById('rp3d-canvas');profile=localStorage.getItem('reviseplus_currentProfile')||'Gabriel';pos={x:0,z:0};mode='map';target=0;
document.getElementById('rp3d-back').onclick=close;document.getElementById('rp3d-return').onclick=function(){mode='map';document.getElementById('rp3d-mission').style.display='none';document.getElementById('rp3d-hint').textContent='Continue ton exploration.';};
wrap.querySelectorAll('[data-avatar]').forEach(b=>b.onclick=()=>{avatarStyle=Number(b.dataset.avatar);localStorage.setItem('rp3d_style',avatarStyle);wrap.querySelectorAll('[data-avatar]').forEach(x=>x.classList.toggle('sel',x===b));});
wrap.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>enter(Number(b.dataset.place)));
wrap.querySelectorAll('[data-move]').forEach(b=>{var v=b.dataset.move.split(',').map(Number);b.addEventListener('pointerdown',e=>{e.preventDefault();move(v[0],v[1]);});});
try{initGL();last=performance.now();frame(last);}catch(e){document.getElementById('rp3d-hint').textContent='La 3D n’est pas disponible : '+e.message;}
}
function close(){cancelAnimationFrame(raf);var e=document.getElementById('rp3d');if(e)e.remove();var s=document.getElementById('rp3d-style');if(s)s.remove();if(window.NW&&NW.home)NW.home();}
window.RP3D={open:show};
})();
