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
        teil: setSt[1],
        brain: parseInt(setSt[2]),
        art: alDa.val
      };
      C.niceSetup( opts.neck );
      C.setPick( C.defaultPicks[opts.brain] );
      // if(setSt[0]>=0) {
      //   C.niceSetup( parseInt(setSt[0]) );
      //   console.log("number points set to "+parseInt(setSt[0]));
      // }
      if(setSt[1]!="") {
        if(setSt[1]==="1/2") {
          C.setFunction(C.defaultF[0]);
          console.log("Function 1/2 no:0");
        } else if(setSt[1]==="1/3") {
          C.setFunction(C.defaultF[1]);
          console.log("Function 1/3 no:1");
        } else if(setSt[1]==="3/8") {
          C.setFunction(C.defaultF[2]);
          console.log("Function 3/8 no:2");
        }
      }

      setOptionView(opts);

      // if(setSt[2]!='') {
      //   C.setPick(C.defaultPicks[ parseInt(setSt[2]) ]);
      //   console.log("picks set to "+parseInt(setSt[2]));
      // }

      C.clearCanvas();
      C.colorStart();

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