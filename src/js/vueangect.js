var HEIGHT=0,WIDHT=0,C={},ctx={};
$(function(){
  var c = $('#canContainer');
  HEIGHT = parseInt(c.height()/10)*10;
  WIDHT = parseInt(c.width()/10)*10;

  var can = $('#canvas');
  ctx = can[0].getContext('2d');
  ctx.canvas.height = HEIGHT;
  ctx.canvas.width = WIDHT;

  console.log(can.height()+" - "+can.width());

  setOptionView();

  C = new choasherrscher(WIDHT,HEIGHT,ctx,{neck:4,brain:1,factor:0.5});
  C.goSetup();

});

function setOptionView(tConfig) {
  if(!tConfig||false) {
    tConfig = { art: '5-1/3-0', neck: 4, teil: 1, brain: 1 };
  }

  $("[data-btn]").each(function(i,e){
    for(var c in tConfig) {
      if(c===$(e).data("btn")) {
        if(tConfig[c]===$(e).data("val")) {
          $(e).find(".text-success").show();
          $(e).find(".text-info").hide();
        } else {
          $(e).find(".text-success").hide();
          $(e).find(".text-info").show();  
        }
      }
    }
  });


}