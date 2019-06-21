/**
 * index
 * javascript 
 * 
 */

var mainSlick = $('#main-slick');

var productSrc = $('#product-template').html(),
     productGenerator = Handlebars.compile(productSrc);

$(document.body).ready(function() {
  loadList(0, 0, 'undefined');
}); // ready


function loadList(largeNo, smallNo, productName) {
  $.get('/bitcamp-team-project/app/json/product/list?largeNo=' + largeNo
      + '&smallNo=' + smallNo 
      + '&productName=' + productName, function(obj){
    console.log(obj);
    
    mainSlick.html('');
    $(productGenerator(obj)).appendTo(mainSlick);
    
    mainSlick.slick({
      infinite: true,
      autoplay: true, 
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false
    });
    
    $('.img-thumbnail').hover(function(e) {
    });
    
  }) // get
  
} // loadList