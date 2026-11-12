/* 파크 운영 관리 · 재고 관리 공통 (예시 데이터) */
function $(i){return document.getElementById(i);}
function toast(m){var e=$('toast');if(!e)return;e.innerHTML=m;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('show')},2600);}
function tTop(msg){var e=$('ttop');if(!e){e=document.createElement('div');e.id='ttop';e.className='ttop';document.body.appendChild(e);}var d=new Date(),h=d.getHours();
  e.innerHTML='<span class="ic">i</span><div><div>'+msg+'</div><div class="muted" style="font-size:12px">2026년 11월 12일 '+(h<12?'오전 ':'오후 ')+((h%12)||12)+':'+('0'+d.getMinutes()).slice(-2)+'</div></div><button class="x" onclick="this.parentNode.hidden=true">✕</button>';e.hidden=false;clearTimeout(tTop._t);tTop._t=setTimeout(function(){e.hidden=true},3000);}
function nowStr(){var d=new Date();return '2026-11-12 목 '+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);}
function pager(n,rpp){return '<div class="dspager"><span>총 '+n+'개 항목</span><span>1 페이지 중 1 페이지</span><span class="rpp">페이지당 행 수 : '+(rpp||20)+' ▾</span><span class="sp"></span><div class="pgs"><span>«</span><span>‹</span><span class="on">1</span><span>›</span><span>»</span></div></div>';}
function pop(h,w){var m=$('mw');if(!m){m=document.createElement('div');m.id='mw';m.className='mw';m.onclick=function(e){if(e.target===m)closeM();};document.body.appendChild(m);}m.innerHTML='<div class="pb" style="width:min('+(w||340)+'px,94vw)">'+h+'</div>';m.hidden=false;}
function closeM(){var m=$('mw');if(m)m.hidden=true;}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});}
/* 재고 공유 저장소 (재고 관리 · 재고 변경 이력 · 입고 이력) */
var SKEY='icnStock2';
var LOCS=['A창고','B창고','정비고'];
function seedStock(){return {parts:[
  {no:'F00108',name:'2.0 클러치 보드',cat:'F 제어장치',maker:'메이커A',price:85000,min:2,max:20,loc:{'A창고':6,'B창고':2,'정비고':0},chk:'2026-10-07 17:31',mgr:'크루 바다'},
  {no:'A00031',name:'GR1 전면 사이드 범퍼',cat:'A 프레임',maker:'메이커B',price:42000,min:4,max:30,loc:{'A창고':8,'B창고':0,'정비고':2},chk:'2026-11-06 14:47',mgr:'크루 바다'},
  {no:'C00072',name:'2.1 브레이크 호스(M)',cat:'C 제동부',maker:'메이커C',price:18000,min:5,max:40,loc:{'A창고':15,'B창고':5,'정비고':0},chk:'2026-11-05 17:25',mgr:'크루 산'},
  {no:'J00126',name:'앞전장 메인 하네스 1',cat:'J 케이블류',maker:'메이커A',price:26000,min:5,max:40,loc:{'A창고':20,'B창고':9,'정비고':0},chk:'2026-11-11 12:15',mgr:'크루 산'},
  {no:'D00110',name:'GR2 구동모터 샤프트',cat:'D 구동부',maker:'메이커D',price:132000,min:4,max:12,loc:{'A창고':2,'B창고':0,'정비고':1},chk:'2026-11-05 14:00',mgr:'크루 하늘'},
  {no:'D00109',name:'GR1 구동모터 샤프트',cat:'D 구동부',maker:'메이커D',price:128000,min:4,max:12,loc:{'A창고':3,'B창고':0,'정비고':0},chk:'2026-11-05 12:38',mgr:'크루 하늘'},
  {no:'F00107',name:'2.0 VMU IF 보드',cat:'F 제어장치',maker:'메이커A',price:96000,min:3,max:15,loc:{'A창고':8,'B창고':2,'정비고':0},chk:'2026-11-05 12:03',mgr:'크루 바다'},
  {no:'J00132',name:'메인 하네스 커넥터(수)',cat:'J 케이블류',maker:'메이커E',price:7000,min:4,max:30,loc:{'A창고':2,'B창고':0,'정비고':0},chk:'2026-10-07 09:17',mgr:'크루 산'},
  {no:'J00131',name:'메인 하네스 커넥터(암)',cat:'J 케이블류',maker:'메이커E',price:7000,min:4,max:30,loc:{'A창고':5,'B창고':0,'정비고':0},chk:'2026-11-05 09:21',mgr:'크루 산'},
  {no:'A00010',name:'전륜부 프레임 보수 KIT R',cat:'A 프레임',maker:'메이커B',price:64000,min:1,max:10,loc:{'A창고':3,'B창고':0,'정비고':0},chk:'2026-11-03 11:10',mgr:'크루 바다'},
  {no:'B00015',name:'엔드볼 조인트(RBLD10 /ZBL10B M10-1.5P)',cat:'B 조향부',maker:'메이커F',price:9000,min:4,max:30,loc:{'A창고':12,'B창고':0,'정비고':2},chk:'2026-11-03 11:20',mgr:'크루 산'},
  {no:'D00010',name:'GR1-V0.9 스프로킷 축',cat:'D 구동부',maker:'메이커D',price:47000,min:2,max:10,loc:{'A창고':4,'B창고':0,'정비고':0},chk:'2026-11-04 15:02',mgr:'크루 하늘'},
  {no:'B00044',name:'XGR 앞범퍼',cat:'B 외장',maker:'메이커B',price:58000,min:2,max:10,loc:{'A창고':1,'B창고':0,'정비고':0},chk:'2026-11-10 10:02',mgr:'크루 바다'}],
 moves:[{no:'A00031',name:'GR1 전면 사이드 범퍼',from:'A창고',to:'정비고',qty:2,sys:'보관장소 이동',why:'정비고 비치',at:'2026-11-10 화 15:20',type:'이동'},
        {no:'C00072',name:'2.1 브레이크 호스(M)',from:'정비고',to:'-',qty:1,sys:'정비 사용',why:'GR1-147 브레이크 호스 교체',at:'2026-11-11 수 10:05',type:'사용'}],
 ins:[{name:'앞전장 메인 하네스 1',no:'J00126',vendor:'구매처A',price:26000,qty:10,at:'2026-11-11 수 12:15',by:'크루 산'},
      {name:'2.1 브레이크 호스(M)',no:'C00072',vendor:'구매처B',price:18000,qty:20,at:'2026-11-05 목 17:25',by:'크루 산'}]};}
function sLoad(){try{var v=JSON.parse(localStorage.getItem(SKEY)||'null');if(v&&v.parts)return v;}catch(e){}var s=seedStock();sSave(s);return s;}
function sSave(s){try{localStorage.setItem(SKEY,JSON.stringify(s));}catch(e){}}
function qty(p){return Object.keys(p.loc).reduce(function(a,k){return a+(+p.loc[k]||0)},0);}
function won(n){return '₩ '+Number(n).toLocaleString('ko-KR');}
