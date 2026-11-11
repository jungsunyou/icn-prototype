/* ICN 레이스 공통 예시 데이터 · 차량 종류 GR1/GR2/XGR, 코스 1/2/3/ICN-L/ICN-R (2026-11-11 확정)
   코스 구성 확정(2026-11-11): 1·2·3코스 각 트랙 2개, XGR은 ICN-L·ICN-R 2개. 트랙 번호 붙이는 방식·GR1/GR2와 코스의 짝·차량 번호 형식은 정하는 중이라 예시 값 */
var COURSES=[{c:'1',tracks:['1','2']},{c:'2',tracks:['3','4']},{c:'3',tracks:['5','6']},{c:'ICN-L',tracks:['L']},{c:'ICN-R',tracks:['R']}];
var CAR_TYPES=[{t:'GR1',color:'#245EC3',course:['1','2']},{t:'GR2',color:'#FF9800',course:['3']},{t:'XGR',color:'#DA222B',course:['ICN-L','ICN-R']}];
function carNo(t,n){return t+'-'+String(n).padStart(t==='XGR'?2:3,'0');}
function courseOf(track){for(var i=0;i<COURSES.length;i++){if(COURSES[i].tracks.indexOf(track)>=0)return COURSES[i].c;}return '-';}
function $(i){return document.getElementById(i);}
function toast(m){var e=$('toast');if(!e)return;e.innerHTML=m;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('show')},2400);}
function seg(el){el.parentNode.querySelectorAll('span').forEach(function(s){s.classList.toggle('on',s===el)});}
/* 심사 요청 ↔ 심사 목록 공유(같은 브라우저 안에서만, 예시용) */
var JKEY='icnRaceJudge';
function jLoad(){try{var v=JSON.parse(localStorage.getItem(JKEY)||'null');if(Array.isArray(v))return v;}catch(e){}return null;}
function jSave(a){try{localStorage.setItem(JKEY,JSON.stringify(a));}catch(e){}}
function nowFull(){var d=new Date();return '2026-11-14 '+d.toTimeString().slice(0,8);}
function tTop(msg){var e=$('ttop');if(!e){e=document.createElement('div');e.id='ttop';e.className='ttop';document.body.appendChild(e);}
  var d=new Date(),h=d.getHours();e.innerHTML='<span class="ic">i</span><div><div class="m">'+msg+'</div><div class="s">2026년 11월 14일 '+(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+('0'+d.getMinutes()).slice(-2)+'</div></div><button class="x" onclick="this.parentNode.hidden=true">✕</button>';e.hidden=false;clearTimeout(tTop._t);tTop._t=setTimeout(function(){e.hidden=true},3000);}
/* 지금 트랙에서 진행 중인 레이스(예시) */
function liveRaces(){var out=[],mm=55;COURSES.forEach(function(co){var ct=CAR_TYPES.filter(function(x){return x.course.indexOf(co.c)>=0})[0];co.tracks.forEach(function(t,ti){var n=(t==='4'||t==='R')?0:(t==='1'?4:t==='L'?1:2);for(var i=0;i<n;i++){out.push({track:t,course:co.c,gr:carNo(ct.t,(ct.t==='GR2'?200:ct.t==='XGR'?0:100)+(t.charCodeAt(0)%40)*2+i+1),time:'16:'+String(mm-i).padStart(2,'0')});}});});return out;}
