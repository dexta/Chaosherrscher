$(function(){
  // 
  // Select the preset
  // 
  $('[data-btn]').on('click',function(e){ 
    var alDa = $(this).data();
    e.stopPropagation();

    if(alDa.btn==='runButton') {
      howM = parseInt($("#runCount").val());
      C.drawMassive(howM);
    } else if(alDa.btn==='optionButton') {
      $("#optionz").toggle();
    } else if(alDa.btn==='art') {
      var setSt = alDa.val.split("-");
      var opts = {
        neck: parseInt(setSt[0]),
        teil: parseInt(setSt[1]),
        brain: parseInt(setSt[2]),
        art: alDa.val
      };
      console.dir(opts);
      C.setNeck(opts.neck);
      C.setBrain(opts.brain);

      C.setFactor(C.defaultFactor[setSt[1]]);
      setOptionView(opts);
      C.goSetup();

    } else if(alDa.btn==='neck') {
      C.setNeck(alDa.val);
    } else if(alDa.btn==='teil') {
      C.setFactor(C.defaultFactor[alDa.val]);
    } else if(alDa.btn==='brain') {
      C.setBrain(alDa.val);
    } else if(alDa.btn==='create') {
      if(alDa.val==='nice') {
        C.goSetup();
      } else if(alDa.val==='random') {
        C.goSetup('random');
      }
    }

    var chOpt = {};
        chOpt[alDa.btn] = alDa.val; 

    setOptionView(chOpt);
  });
  // end preset event
});




function menuAction(what,val) {
  if(what==="point") {
    C.niceSetup(val);
    C.clearCanvas();
    C.colorStart();
    $("#menu_points").html(val);
  }

}