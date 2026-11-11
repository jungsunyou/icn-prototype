/* 레이스 기록 상세 (race_records.html 전용) · 그래프와 기록 값은 예시 */
var OPENA={},VIDS=['액션캠 원본 영상','MSS 편집 영상','오버레이 원본 영상','오버레이 편집 영상'],VSEL=0,PUB=true,CURR=null;
function series(n,f){var a=[];for(var i=0;i<n;i++)a.push(f(i/n,i));return a;}
function lineChart(sets,legend){var W=620,H=300,L=44,Rr=50,T=12,B=40,w=W-L-Rr,h=H-T-B;var g='<svg class="chart" viewBox="0 0 '+W+' '+H+'">';
  for(var k=0;k<=8;k++){var y=T+h*k/8;g+='<line x1="'+L+'" x2="'+(L+w)+'" y1="'+y+'" y2="'+y+'" stroke="#F0F0F0"/>';}
  g+='<rect x="'+L+'" y="'+T+'" width="'+w+'" height="'+h+'" fill="none" stroke="#E6E6E6"/>';
  sets.forEach(function(st){var mn=st.min,mx=st.max;var pts=st.d.map(function(v,i){var vv=Math.max(mn,Math.min(mx,v));return (L+w*i/(st.d.length-1)).toFixed(1)+','+(T+h*(1-(vv-mn)/(mx-mn))).toFixed(1)}).join(' ');
    g+='<polyline fill="none" stroke="'+st.c+'" stroke-width="1.2" points="'+pts+'"/>';
    for(var k=0;k<=8;k++){var v=mx-(mx-mn)*k/8,y=T+h*k/8;g+='<text x="'+(st.side==='r'?L+w+6:L-6)+'" y="'+(y+4)+'" font-size="10" fill="'+st.c+'" text-anchor="'+(st.side==='r'?'start':'end')+'">'+(Math.abs(mx-mn)<3?v.toFixed(4):Math.round(v))+'</text>';}});
  for(var k=0;k<8;k++){var x=L+w*k/7;g+='<text x="'+x+'" y="'+(T+h+16)+'" font-size="10" fill="#485056" transform="rotate(45 '+x+' '+(T+h+16)+')">05:2'+(k<3?7:8)+'</text>';}
  var ly=T+14;legend.forEach(function(l){g+='<circle cx="'+(L+w-60)+'" cy="'+ly+'" r="5" fill="'+l[1]+'"/><text x="'+(L+w-50)+'" y="'+(ly+4)+'" font-size="11" fill="#212529">'+l[0]+'</text>';ly+=18;});
  return g+'</svg>';}
function gpsChart(){var W=620,H=560,L=60,T=10,B=30,w=W-L-14,h=H-T-B;var g='<svg class="chart" viewBox="0 0 '+W+' '+H+'"><rect x="'+L+'" y="'+T+'" width="'+w+'" height="'+h+'" fill="none" stroke="#E6E6E6"/>';
  for(var k=0;k<=12;k++){var y=T+h*k/12;g+='<line x1="'+L+'" x2="'+(L+w)+'" y1="'+y+'" y2="'+y+'" stroke="#F3F3F3"/>';if(k%2===0)g+='<text x="'+(L-6)+'" y="'+(y+4)+'" font-size="10" text-anchor="end" fill="#485056">'+(126.6658-k*0.0003).toFixed(4)+'</text>';}
  for(var k=0;k<=4;k++){var x=L+w*k/4;g+='<text x="'+x+'" y="'+(T+h+18)+'" font-size="10" text-anchor="middle" fill="#485056">'+(37.4892+k*0.0003).toFixed(4)+'</text>';}
  for(var i=0;i<=320;i++){var t=i/320;var x=0.5+0.42*Math.sin(t*Math.PI*4.2+0.6)*(0.6+0.4*Math.cos(t*3));var y=0.02+t*0.96;g+='<circle cx="'+(L+w*x).toFixed(1)+'" cy="'+(T+h*y).toFixed(1)+'" r="5" fill="#64B5F6" fill-opacity=".55" stroke="#42A5F5" stroke-opacity=".5"/>';}
  g+='<circle cx="'+(L+w-60)+'" cy="'+(T+16)+'" r="5" fill="#2196F3"/><text x="'+(L+w-50)+'" y="'+(T+20)+'" font-size="11">위경도</text>';return g+'</svg>';}
function openR(i){OPENA={};VSEL=0;renderR(R[i]);$('ov').classList.add('show');$('dw').classList.add('show');}
function closeR(){$('ov').classList.remove('show');$('dw').classList.remove('show');}
function togA(k){OPENA[k]=!OPENA[k];renderR(CURR);}
function acc(k,title,chip,body){var o=OPENA[k];return '<div class="acc"><div class="ah" onclick="togA(\''+k+'\')">'+title+(chip||'')+'<span class="sp"></span><span class="cv">'+(o?'⌃':'⌄')+'</span></div>'+(o?'<div class="ab">'+body+'</div>':'')+'</div>';}
function renderR(r){CURR=r;var done=r.act==='종료'||r.act==='무효';
  var segs=[24.266,6.548,10.171,6.993,8.95,8.656,6.795,7.625].map(function(v,i){return '<tr><td>'+(i+1)+'</td><td>'+v.toFixed(3)+'</td><td>'+(31.64+i*2.1).toFixed(3)+'</td><td>'+(17.39+i*3.6).toFixed(3)+'</td><td>'+(i<6?(0.78+i*0.05):(-0.22-(i-6)*0.39)).toFixed(3)+'</td></tr>'}).join('');
  var dv=function(v){return done?v:'-'};
  var recBody='<div class="kv2"><div>랩타임</div><div class="num">'+(done?r.lap:'-')+'</div><div>평균 속도</div><div class="num">'+dv('33.400')+'</div><div>최고 속도</div><div class="num">'+dv('46.800')+'</div><div>최고 횡G</div><div class="num">'+dv('1.130')+'</div><div>반응 시간</div><div class="num">'+dv('1.005')+'</div><div>부정 출발</div><div>'+dv('N')+'</div><div>부스터 사용 / 획득</div><div>'+dv('2 / 2')+'</div><div>부스터 웜업</div><div>'+dv('N')+'</div><div>구간별 기록</div><div></div></div>'+
    '<table class="seg2" style="margin-top:8px"><thead><tr><th>구간</th><th>랩타임</th><th>최고속도</th><th>평균속도</th><th>최고횡G</th></tr></thead><tbody>'+(done?segs:'<tr><td colspan="5" class="muted">기록이 없어요</td></tr>')+'</tbody></table>';
  var spd=series(260,function(t){return t<0.12?Math.max(0,3-t*40):Math.min(47,(t-0.12)*95+Math.sin(t*40)*1.5)}),oil=series(260,function(t,i){return t<0.1?800:(i%37<3?400+((i*53)%500):4)});
  var steer=series(260,function(t){return t<0.25?Math.sin(t*90)*1.5:Math.sin(t*55)*10+Math.sin(t*170)*4}),lg=series(260,function(t){return t<0.2?0:Math.sin(t*48)*0.4+Math.sin(t*150)*0.08});
  var thumbs=VIDS.map(function(v,i){return '<div class="th'+(VSEL===i?' on':'')+'" onclick="VSEL='+i+';renderR(CURR)"><span>'+v+'</span></div>'}).join('');
  var segTbl='<table class="seg2" style="margin-top:8px"><thead><tr><th>구간</th><th>랩타임</th><th>최고속도</th><th>평균속도</th><th>최고횡G</th></tr></thead><tbody>'+(done?segs:'<tr><td colspan="5" class="muted">기록이 없어요</td></tr>')+'</tbody></table>';
  var graphs=acc('gps','GPS 좌표 그래프','',done?gpsChart():'<div class="muted">기록이 없어요</div>')+
   acc('spd','속도/브레이크 그래프','',done?lineChart([{d:spd,min:0,max:52,c:'#2196F3'},{d:oil,min:-100,max:977,c:'#43A047',side:'r'}],[['속도','#2196F3'],['유압','#43A047'],['기능','#FFC107']]):'<div class="muted">기록이 없어요</div>')+
   acc('g','횡G 그래프','',done?lineChart([{d:steer,min:-32,max:17,c:'#F44336'},{d:lg,min:-0.449,max:0.551,c:'#43A047',side:'r'}],[['조향','#F44336'],['횡G','#43A047']]):'<div class="muted">기록이 없어요</div>');
  var video='<div class="card"><div class="vh"><b style="font-size:15px;font-weight:600">영상 정보</b><span class="sp"></span><span class="tg'+(PUB?'':' on')+'">숨김</span><span class="sw'+(PUB?' on':'')+'" onclick="PUB=!PUB;renderR(CURR);toast(PUB?\'영상을 공개로 바꿨어요.\':\'영상을 숨김으로 바꿨어요.\')"></span><span class="tg'+(PUB?' on':'')+'">공개</span><button class="btn sm pri" onclick="toast(\'예시 화면이라 파일을 내려받지 않아요.\')">⤓ 다운로드</button></div>'+
   '<div class="vid"><span class="lbl">'+VIDS[VSEL]+' (예시 화면)</span><div class="vc"><div class="pr"></div><div class="rw"><span style="cursor:pointer" onclick="toast(\'예시 화면이라 영상이 재생되지 않아요.\')">▶</span><span>0:00 / 1:33</span><span class="sp"></span><span>1X</span><span>⤓</span><span>⛶</span></div></div></div><div class="thumbs">'+thumbs+'</div></div>';
  if(window.TEST_MODE){if(OPENA.boost===undefined)OPENA.boost=true;
   $('rb').innerHTML='<div class="rgrid"><div class="rcol">'+
    '<div class="card"><h2>테스터 정보</h2><div class="kv2"><div>이름</div><div>'+r.nick+'</div><div>운영자 티켓 No</div><div class="code">'+r.ticket+'</div></div></div>'+
    '<div class="card"><h2>테스트 주행 정보</h2><div class="kv2"><div>주행 일시</div><div class="code">'+r.dt+'</div><div>이용 No</div><div class="code">'+r.use+'</div><div>GR 번호</div><div class="code">'+r.gr+'</div><div>코스/트랙</div><div>'+r.course+' 코스 / <span class="ktxt">'+r.track+' 트랙</span></div>'+
    '<div>부정 출발 여부</div><div>N</div><div>반응 시간</div><div class="num">'+(r.react||'0.000')+'</div><div>랩타임</div><div class="num">'+r.lap+'</div><div>최고 속도</div><div class="num">'+(r.max||'-')+'</div><div>평균 속도</div><div class="num">'+(r.avg||'-')+'</div><div>최고 횡G</div><div class="num">'+(r.g||'-')+'</div></div>'+
    acc('boost','부스터 획득 정보','','<div class="kv2"><div>획득/사용/웜업</div><div>0.0 / 0.0 / N</div><div>구간별 기록</div><div></div></div>'+segTbl)+graphs+'</div>'+
    '</div><div class="rcol">'+video+'</div></div>';return;}
  $('rb').innerHTML='<div class="rgrid"><div class="rcol">'+
   '<div class="card"><h2>사용자 정보</h2><div class="kv2"><div>닉네임</div><div>'+r.nick+'</div><div>티켓 No</div><div class="code">'+r.ticket+'</div><div>상품명</div><div>레이스 포함 패키지</div></div></div>'+
   '<div class="card"><h2>레이싱 정보 <span class="pill '+ACT[r.act]+'">'+r.act+'</span></h2><div class="kv2"><div>이용일시</div><div class="code">'+r.dt+'</div><div>이용 No</div><div class="code">'+r.use+'</div><div>차량번호</div><div class="code">'+r.gr+'</div><div>코스/트랙</div><div>'+r.course+' 코스 / <span class="ktxt">'+r.track+' 트랙</span></div></div>'+
   acc('rec','기록 정보',' <span class="pill '+REC[r.rec]+'">'+r.rec+'</span>',recBody)+
   acc('gps','GPS 좌표 그래프','',done?gpsChart():'<div class="muted">기록이 없어요</div>')+
   acc('spd','속도/브레이크 그래프','',done?lineChart([{d:spd,min:0,max:52,c:'#2196F3'},{d:oil,min:-100,max:977,c:'#43A047',side:'r'}],[['속도','#2196F3'],['유압','#43A047'],['기능','#FFC107']]):'<div class="muted">기록이 없어요</div>')+
   acc('g','횡G 그래프','',done?lineChart([{d:steer,min:-32,max:17,c:'#F44336'},{d:lg,min:-0.449,max:0.551,c:'#43A047',side:'r'}],[['조향','#F44336'],['횡G','#43A047']]):'<div class="muted">기록이 없어요</div>')+'</div>'+
   '</div><div class="rcol"><div class="card"><h2>심사 정보</h2><div class="kv2"><div>상태</div><div>'+(r.judge||'')+'</div><div>요청</div><div>-</div><div>접수</div><div>-</div><div>판정</div><div>-</div></div></div>'+
   '<div class="card"><div class="vh"><b style="font-size:15px;font-weight:600">영상 정보</b><span class="sp"></span><span class="tg'+(PUB?'':' on')+'">숨김</span><span class="sw'+(PUB?' on':'')+'" onclick="PUB=!PUB;renderR(CURR);toast(PUB?\'영상을 공개로 바꿨어요.\':\'영상을 숨김으로 바꿨어요.\')"></span><span class="tg'+(PUB?' on':'')+'">공개</span><button class="btn sm pri" onclick="toast(\'예시 화면이라 파일을 내려받지 않아요.\')">⤓ 다운로드</button></div>'+
   '<div class="vid"><span class="lbl">'+VIDS[VSEL]+' (예시 화면)</span><div class="vc"><div class="pr"></div><div class="rw"><span style="cursor:pointer" onclick="toast(\'예시 화면이라 영상이 재생되지 않아요.\')">▶</span><span>0:00 / 1:33</span><span class="sp"></span><span>1X</span><span>⤓</span><span>⛶</span></div></div></div><div class="thumbs">'+thumbs+'</div></div></div></div>';}
