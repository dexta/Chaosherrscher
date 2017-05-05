var choasherrscher = function(width,height,ctx,config) {
  this.can = ctx;
  this.C={ color: '#F00', size: 1, width: 1, state: [0] };
  this.P=[[400,300],[400,10],[10,590],[790,590]];
  
  this.W = width; 
  this.H = height;

  this.distRange = (width+height)/30;

  this.defaultFactor = [0.5,0.33333,0.375,0.233];
  this.factor = 0.5;
  this.brain = 0;
  this.neck = 3;

  // overrule with ext config
  for(var x in config) {
    this[x] = config[x];
  }

  this.F=function(b,a) {
    return [
        ( a[0]+ ( (b[0]-a[0])*(this.factor) ) ),
        ( a[1]+ ( (b[1]-a[1])*(this.factor) ) )
      ];
    };

  this.pick=function(tp) {
    if(this.C.state.length>this.brain) {
      this.C.state.splice(0,1);
    }
    var uN = this.uniqRandom(this.C.state,1,tp.length);
    this.C.state.push(uN);
    return tp[uN];
  };

  this.notInIt = function(inN,ItT) {
    return (ItT.indexOf(inN)===-1);
  };

  this.uniqRandom = function(uList,min,max) {
    var neRan = parseInt((Math.random()*(max-min))+min);
    return (this.notInIt(neRan,uList))? neRan : this.uniqRandom(uList,min,max);
  }

  this.niceSetup = function(numberOfPoints) {
    var wh = (this.W<500)? this.W/23 : this.W/10;
    var hh = (this.H<650)? this.H/23 : this.H/10;
    if(numberOfPoints===3) {
      this.P = [[this.W/2,this.H/2],[this.W/2,hh],[wh,this.H-hh],[this.W-(wh*2),this.H-hh]];
    } else if(numberOfPoints===4) {
      var hf = (this.W>this.H)? this.H-(2*hh) : this.W-(2*wh);
      wh = (this.W-hf)/2; hh = (this.H-hf)/2;
      this.P = [[wh+(hf/2),hh+(hf/2)],[wh,hh],[wh+hf,hh],[wh,hh+hf],[wh+hf,hh+hf]];
    } else if(numberOfPoints===5) {
      this.P = [[this.W/2,this.H/2],[this.W/2,hh],[wh*2,this.H/3],[this.W-(wh*2),this.H/3],[wh*3,this.H-hh],[this.W-(wh*3),this.H-hh]];
    } else if(numberOfPoints===6) {
      this.P = [[this.W/2,this.H/2],[this.W/2,hh],[wh*2,this.H/4],[this.W-(wh*2),this.H/4],[wh*2,this.H-(this.H/4)],[this.W-(wh*2),this.H-(this.H/4)],[this.W/2,this.H-hh]];
    }
  };

  this.setFunction = function(nFunc) { this.F = nFunc; };

  this.setPick = function(nPick) { this.pick = nPick; };

  this.setFactor = function(nFac) { this.factor = nFac; };

  this.setBrain = function(nBra) { this.brain = nBra; };

  this.setNeck = function(nEck) { this.neck = nEck; };

  this.getConfig = function() {
    return { neck: this.neck, teil: this.teil, brain: this.brain };
  };

  this.setConfig = function(newConf) {
    for(var nc in newConf) { this[nc] = newConf[nc]; }
    return this.getConfig();
  };

  this.next = function() {
    var nePo = this.pick( this.P )
    var dp = this.F( this.P[0], nePo );
    this.drawPoint(dp[0],dp[1]);
    this.P[0] = dp;
  };

  this.drawMassive = function(no) {
    var s = (new Date()/1);
    for(var i=0;i<no;i++) { this.next();}
    this.lastMassive = (new Date()/1-s);
  };

  this.colorStart = function() {
    this.drawPoint(this.P[0][0],this.P[0][1]);
    for(var i=1,il=this.P.length;i<il;i++) {
      this.drawPoint(this.P[i][0],this.P[i][1],'#0F0',5,5)
    }
  }

  this.drawPoint = function(x,y,color,size,width) {
    this.can.beginPath();
    this.can.lineWidth = (width||false)? width : this.C.width;
    this.can.strokeStyle = (color||false)? color : this.C.color;
    var s = (size||false)? size : this.C.size;
    this.can.arc(x,y,s,0,2*Math.PI);
    this.can.stroke();
  };

  this.goSetup = function(set) {
    if(!set||false) {
      this.niceSetup(this.neck);
    } else if(set==='random') {
      var try1 = this.randomNice([[this.W/2,this.H/2]],0);
      if(try1||false) {
        this.P = try1;
      } else {
        this.distRange -= (this.distRange*.1);
        console.log("let retry it "+this.distRange);
        this.goSetup(set);
      }
    }
    this.clearCanvas();
    this.colorStart();
    console.log("eck:"+this.neck+" factor:"+this.factor+" brain:"+this.brain);
  };

  this.randomNice = function(list,deadman) {
    deadman = ++deadman||1;
    if(deadman>=50) return null;
    var nx = parseInt(Math.random()*this.W);
    var ny = parseInt(Math.random()*this.H);
    for(var l in list) {
      var aqa = ((list[l][0]-nx)>0)? (list[l][0]-nx)*2 : (nx-list[l][0])*2;
      var bqa = ((list[l][1]-ny)>0)? (list[l][1]-ny)*2 : (ny-list[l][1])*2;
      var nd = Math.sqrt( aqa + bqa );
      if(nd<this.distRange) {
        return this.randomNice(list,deadman);
      }
    }
    list.push([nx,ny]);
    if(list.length>this.neck) return list;
    return this.randomNice(list,0);
  };

  this.clearCanvas = function() {
    this.can.clearRect(0, 0, this.W, this.H);
  };
};


// new pick

// var t = function(tp) {
//   var uN = this.uniqRandom(this.C.state,1,tp.length);
//   var lMax = tp.length-2;
//   var pEin = (uN+1>lMax)? 1 : uN+1;
//   var mEin = (uN-1<=0)? lMax : uN-1;
//   this.C.state = [pEin,mEin];
//   return tp[uN];
// }