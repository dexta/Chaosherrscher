$(function(){
  // 
  // Select the preset
  // 
  $('[data-btn]').on('click',function(e){ 
    // console.log("all Data: ");    
    var alDa = $(this).data();
    // console.dir(alDa);
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
      // C.niceSetup( opts.neck );
      C.setNeck(opts.neck);
      // C.setPick( C.defaultPicks[opts.brain] );
      C.setBrain(opts.brain);
      // if(setSt[0]>=0) {
      //   C.niceSetup( parseInt(setSt[0]) );
      //   console.log("number points set to "+parseInt(setSt[0]));
      // }

      C.setFactor(C.defaultFactor[setSt[1]]);
      // if(setSt[1]!="") {
        // if(setSt[1]==="1/2") {
        //   C.setFactor(0.5);
        //   console.log("Function 1/2 no:0");
        // } else if(setSt[1]==="1/3") {
        //   C.setFactor(0.333);
        //   console.log("Function 1/3 no:1");
        // } else if(setSt[1]==="3/8") {
        //   C.setFactor(0.375);
        //   console.log("Function 3/8 no:2");
        // }
      // }

      setOptionView(opts);
      C.goSetup();
      // if(setSt[2]!='') {
      //   C.setPick(C.defaultPicks[ parseInt(setSt[2]) ]);
      //   console.log("picks set to "+parseInt(setSt[2]));
      // }

      // C.clearCanvas();
      // C.colorStart();

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