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
  setOptionView({art:'3-1-0'});

  C = new choasherrscher(WIDHT,HEIGHT,ctx,{neck:3,brain:0,teil:0});
  C.goSetup();

  setOptionView();
});

function setOptionView(tConfig) {
  if(!tConfig||false) {
    tConfig = C.getConfig();
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