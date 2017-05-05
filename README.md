# Chaosherrscher
Chaos-Game inspired by Numberphile [video](https://www.youtube.com/watch?v=kbKtFN71Lfs)

[Last Version 0.42](https://dexta.github.io/Chaosherrscher/)

## first idea
Keep it simple, and drop the ES6 support, but plenty of space to be simpler.

```javascript
function nextPoint() {
  var nr = parseInt(Math.random()*6)+1;
  var ot = [0,0];
  if(nr===1||nr===2) { ot = A; } else if(nr===3||nr===4) { ot = B; } else if(nr===5||nr===6) { ot = C; }
  var M = [ (S[0]+ot[0])/2 , (S[1]+ot[1])/2 ];
  S = M;
  drawPoint(M[0],M[1],"#FF0000");
  return nr;
}
```

## object based version
good old prototype this inside, hold state and come with some default presets.
All shapes are a list of Points started with P[1], P[0] represents the last point of destenation.

```javascript

this.next = function() {
  var nePo = this.pick( this.P )
  var dp = this.F( this.P[0], nePo );
  this.drawPoint(dp[0],dp[1]);
  this.P[0] = dp;
};

this.pick=function(tp) {
  if(this.C.state.length>this.brain) {
    this.C.state.splice(0,1);
  }
  var uN = this.uniqRandom(this.C.state,1,tp.length);
  this.C.state.push(uN);
  return tp[uN];
};

this.F=function(b,a) {
  return [
      ( a[0]+ ( (b[0]-a[0])*(this.factor) ) ),
      ( a[1]+ ( (b[1]-a[1])*(this.factor) ) )
    ];
  };
```

### developer branch
##### Bootstrap 4, jQuery 3,font-awesome 4 and gulp 3 [browser-sync,etc]
All Frontend library are copyed to src/../lib and processed by gulp.

#### Browsersync for develop
```bash
npm install
gulp watch-dev
```

#### Build for distribution
```bash
npm install
gulp build-dist-all
```
