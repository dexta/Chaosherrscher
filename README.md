# Chaosherrscher
### Chaos-Game inspired by Numberphile
[numberphile chaosgame video](https://www.youtube.com/watch?v=kbKtFN71Lfs)


In mathematics, the term chaos game originally referred to a method of creating a fractal, using a polygon and an initial point selected at random inside it. 

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