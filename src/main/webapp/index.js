/**
 * index
 * javascript 
 * 
 */

/*
var mainSlick = $('#main-slick');

var productSrc = $('#product-template').html(),
     productGenerator = Handlebars.compile(productSrc);
*/

$(document.body).ready(function() {
  loadList(0, 0, 'undefined');
  new WOW().init();
}); // ready


function loadList(largeNo, smallNo, productName) {
  $.get('/bitcamp-team-project/app/json/product/list?largeNo=' + largeNo
      + '&smallNo=' + smallNo 
      + '&productName=' + productName, function(obj){
    console.log(obj);
    
    var prodTrGenerator = Handlebars.compile($('#product-tr').html());

    $('#ohr-index-card').pagination({
        dataSource: obj.list,
        locator: 'list',
        showGoInput: true,
        showGoButton: true,
        pageSize: 9,
        callback: function(data, pagination) {
        	$('#ohr-index-card').children().remove();
          var pageObj = {list: data};
          $(prodTrGenerator(pageObj)).appendTo($('#ohr-index-card'));
        }
      });
    
    /*
    mainSlick.html('');
    $(productGenerator(obj)).appendTo(mainSlick);
    
    mainSlick.slick({
      infinite: true,
      autoplay: true, 
      speed: 5500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false
    });
    
    $('.img-thumbnail').hover(function(e) {
    });
    */
    
  }) // get
  
} // loadList

$(".hover").mouseleave(
		  function () {
		    $(this).removeClass("hover");
		  }
		);
