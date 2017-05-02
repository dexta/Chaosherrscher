var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');
var C={ color: '#F00', size: 2, width: 2, state: 0 };
var P=[[400,300],[400,10],[10,590],[790,590]];
// var P=[[400,300],[10,590],[790,590],[790,350],[150,320],[160,20],[223,42]];

// 
// new readable version

function randomInt(max) {
  return parseInt(Math.random()*max);
}
function randomCord() {
  return [randomInt(C.WIDTH),randomInt(C.HEIGHT)];
}

// 
// Old short version

var F={
  A: function(a,b) {
    return [
      ( (a[0]+b[0])/2 ),
      ( (a[1]+b[1])/2 )
    ];
  },
  B: function(a,b) {
    return [
      ( (a[0]+b[0])/3 ),
      ( (a[1]+b[1])/3 )
    ];
  }
};
var picks={
  A: function(tp) {
    return tp[parseInt((Math.random()*(tp.length-1))+1)];
  },
  B: function(tp) {
    var be = parseInt((Math.random()*3)+(C.state*3));
    C.state=(C.state)? 0 : 1;
    return tp[be];
  }
}

function next() {
  var dp = F.A(P[0],picks.A(P));
  drawPoint(dp[0],dp[1]);
  P[0] = dp;
}

function rN(f) {
  return parseInt(Math.random()*f);
}

function rC() {
  return [rN(800),rN(600)];
}

function drawMassive(no) {
  let s = new Date()/1;
  for(var i=0;i<no;i++) { next();}
  console.log("time to Draw "+(new Date()/1-s));
}

function randomStart() {
  for(var n in P) {
    P[n] = rC();
  }
}

function colorStart() {
  drawPoint(P[0][0],P[0][1]);
  for(var i=1,il=P.length;i<il;i++) {
    drawPoint(P[i][0],P[i][1],'#0F0',5,5)
  }
}

function drawPoint(x,y,color,size,width) {
  ctx.beginPath();
  ctx.lineWidth = (width||false)? width : C.width;
  ctx.strokeStyle = (color||false)? color : C.color;
  var s = (size||false)? size : C.size;
  ctx.arc(x,y,s,0,2*Math.PI);
  ctx.stroke();
}