var choasherrscher = function(width,height,ctx,config) {
  this.can = ctx;
  this.C={ color: '#F00', size: 1, width: 1, state: [0] };
  this.P=[[400,300],[400,10],[10,590],[790,590]];
  this.F=function(){return 'dummy function one'};
  this.pick=function(){return 'dummy pick function one'};
  this.W = width; 
  this.H = height;

  this.defaultF=[
    function(a,b) {
      return [
        ( (a[0]+b[0])/2 ),
        ( (a[1]+b[1])/2 )
      ];
    },
    function(b,a) {
      return [
        ( a[0]+ ( (b[0]-a[0])*(1/3) ) ),
        ( a[1]+ ( (b[1]-a[1])*(1/3) ) )
      ];
    },
    function(b,a) {
      return [
        ( a[0]+ ( (b[0]-a[0])*(3/8) ) ),
        ( a[1]+ ( (b[1]-a[1])*(3/8) ) )
      ];
    }
  ];

  this.defaultPicks=[
    function(tp) {
      return tp[parseInt((Math.random()*(tp.length-1))+1)];
    },
    function(tp) {
      var uN = this.uniqRandom(this.C.state,1,tp.length);
      if(this.C.state.length>=1) {
        this.C.state.splice(0,1);
      }
      this.C.state.push(uN);
      return tp[uN];
    },
    function(tp) {
      var uN = this.uniqRandom(this.C.state,1,tp.length);
      if(this.C.state.length>=2) {
        this.C.state.splice(0,1);
      }
      this.C.state.push(uN);
      return tp[uN];
    }
  ];

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
      this.P = [];
      this.P[0] = [this.W/2,this.H/2];
      this.P[1] = [this.W/2,hh];
      this.P[2] = [wh,this.H-hh];
      this.P[3] = [this.W-(wh*2),this.H-hh];
    } else if(numberOfPoints===4) {
      this.P = [];
      this.P[0] = [(this.H-hh)/2,this.H/2];
      this.P[1] = [wh,hh];
      this.P[2] = [this.H-(hh*2),hh];
      this.P[3] = [wh,this.H-(hh*2)];
      this.P[4] = [this.H-(hh*2),this.H-(hh*2)];
    } else if(numberOfPoints===5) {
      this.P = [];
      this.P[0] = [this.W/2,this.H/2];
      this.P[1] = [this.W/2,hh];
      this.P[2] = [wh*2,this.H/3];
      this.P[3] = [this.W-(wh*2),this.H/3];
      this.P[4] = [wh*3,this.H-hh];
      this.P[5] = [this.W-(wh*3),this.H-hh];
      this.setFunction(this.defaultF.A);
    } else if(numberOfPoints===6) {
      this.P = [];
      this.P[0] = [this.W/2,this.H/2];
      this.P[1] = [this.W/2,hh];
      this.P[2] = [wh*2,this.H/4];
      this.P[3] = [this.W-(wh*2),this.H/4];
      this.P[4] = [wh*2,this.H-(this.H/4)];
      this.P[5] = [this.W-(wh*2),this.H-(this.H/4)];

      this.P[6] = [this.W/2,this.H-hh];
    }
  };

  this.setFunction = function(nFunc) {
    this.F = nFunc;
  };

  this.setPick = function(nPick) {
    this.pick = nPick;
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
    console.log("time to Draw "+(new Date()/1-s));
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

  this.clearCanvas = function() {
    this.can.clearRect(0, 0, this.W, this.H);
  };
};