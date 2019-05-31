/**
 * 
 */
var produdctNo = getQuerystring('no'),
    type = 0,
    tipNo = 0;

$(document.body).bind('loaded.loginuser', () => {
  window.type = Number(sessionStorage.getItem('type'));

  $(document).ready(function(){
    $.get('/bitcamp-team-project/app/json/product/detail?no=' + produdctNo, function(obj) {
      console.log(obj);
      
      $('#product-thumbnail-img-div').append('<img src="/bitcamp-team-project/upload/productfile/' + obj.product.productFiles[0].img + '_thumb">');
      $('#product-inform-div').append('<h3 style="color: white;">'+ obj.product.name +'</h3>')
      $('#product-inform-div').append('<h5 style="color: white;">'+ obj.product.manufacturer.name +'</h5>')
      
      if (obj.product.tip != null) {
        window.tipNo = obj.product.tip.no;
      }
      
      $(document.body).trigger({
        type: 'loaded-essential',
        obj: obj
      })
    }); // get
  }); // ready
  
}); // bind loaded.loginuser


$(document.body).bind('loaded-essential', function(data){
  console.log(data);
  
  $("#product-div").mouseenter(function() {
    $(this).css('background-color', 'white');
    $(this).children().eq(0).css('display', 'none');
    $(this).children().eq(1).css('display', 'none');
    $('#product-hover-div').css('display', '');
    
  }).mouseleave(function() {
    $(this).css('background-color', 'black');
    $(this).children().eq(0).css('display', '');
    $(this).children().eq(1).css('display', '');
    $('#product-hover-div').css('display', 'none');
  });
}) // bind loaded-essential




function getQuerystring(key, default_){
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} // getQuerystring


