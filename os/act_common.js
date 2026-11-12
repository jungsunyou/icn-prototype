/* 인천 액티비티 공통 (운영 관리 · 통합 장비 관리)
   공간·액티비티·장비 수 = 사용자 제공(2026-11-12). 장비 번호 형식·기구 이름은 예시(정하는 중) */
var SPACES=[
  {s:'FG 레이스',acts:[{id:'fgdr',n:'FG 디지털레이스',code:'FGDR',cnt:4,rec:'race',parts:['차량','핸들']}]},
  {s:'T행성',acts:[{id:'vecto',n:'벡토',code:'VECTO',cnt:30,parts:['차체','조이스틱']},{id:'harena',n:'하레나: 비바리움',code:'HARENA',cnt:56,gun:true,rec:'kd',parts:['총기','조끼']},{id:'nova',n:'노바슬론',code:'NOVA',cnt:30,parts:['센서','화면']},{id:'tdr',n:'디지털레이스',code:'DR',cnt:7,rec:'race',parts:['차량','핸들']}]},
  {s:'한판',acts:[{id:'nolli',n:'놀이판',code:'NOLLI',cnt:11,parts:['센서','화면']}]},
  {s:'큐브',acts:[{id:'cvecto',n:'큐브 벡토',code:'CVECTO',cnt:8,parts:['차체','조이스틱']},{id:'chigh',n:'큐브높은콘텐츠',code:'CHIGH',cnt:2,parts:['기구']},{id:'cvision',n:'큐브비전',code:'CVISION',cnt:9,parts:['센서','화면']},{id:'chex',n:'큐브 육각형',code:'CHEX',cnt:6,parts:['발판','화면']},{id:'cave',n:'왕의동굴',code:'CAVE',cnt:24,gun:true,rec:'kd',parts:['총기','조끼']}]}
];
function allActs(){var a=[];SPACES.forEach(function(s){s.acts.forEach(function(x){a.push(x)})});return a;}
function actById(id){return allActs().filter(function(a){return a.id===id})[0];}
function eqNo(a,i){return a.code+'-'+String(i).padStart(2,'0');}
function nowStr(){var d=new Date();return '2026-11-12 목 '+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);}

/* 수리 요청 기록 — 두 화면이 같은 브라우저 저장소로 공유(예시) */
var RKEY='icnActRepair';
function seedRepairs(){var r=[],id=1;allActs().forEach(function(a){for(var i=1;i<=a.cnt;i++){if(i%11===2)r.push({id:id++,act:a.id,no:eqNo(a,i),part:a.parts[0],memo:'',rp:'ing',reqBy:'크루 하늘',req:'2026-11-12 목 10:'+String(10+i%40).padStart(2,'0'),accBy:'크루 바다',acc:'2026-11-12 목 11:'+String(5+i%40).padStart(2,'0'),doneBy:'',done:''});}});
  r.push({id:id++,act:'harena',no:'HARENA-06',part:'총기',memo:'2판 1번 게임 끝나고 꺼짐',rp:'done',reqBy:'크루 하늘',req:'2026-11-10 화 12:50',accBy:'크루 바다',acc:'2026-11-11 수 15:51',doneBy:'크루 바다',done:'2026-11-11 수 15:51'});
  r.push({id:id++,act:'vecto',no:'VECTO-03',part:'차체',memo:'',rp:'done',reqBy:'크루 산',req:'2026-11-11 수 16:21',accBy:'크루 산',acc:'2026-11-11 수 16:21',doneBy:'크루 산',done:'2026-11-12 목 09:12'});
  r.push({id:id++,act:'cave',no:'CAVE-09',part:'-',memo:'',rp:'req',reqBy:'크루 하늘',req:'2026-11-12 목 13:40',accBy:'',acc:'',doneBy:'',done:''});
  return r;}
function rLoad(){try{var v=JSON.parse(localStorage.getItem(RKEY)||'null');if(Array.isArray(v))return v;}catch(e){}var s=seedRepairs();rSave(s);return s;}
function rSave(a){try{localStorage.setItem(RKEY,JSON.stringify(a));}catch(e){}}
/* 장비별 최신 수리 상태 */
function repairOf(list,act,no){var x=null;list.forEach(function(r){if(r.act===act&&r.no===no&&(!x||r.id>x.id))x=r;});return x;}
