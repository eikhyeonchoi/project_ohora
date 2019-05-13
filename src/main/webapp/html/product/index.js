/**
 * 
 */
var searchSpan = $('#seachSpan'),
tbody = $('tbody'),
largeSrc = $('#large-category-template').html(),
smallSrc = $('#small-category-template').html();

var largeCategoryGenerator = Handlebars.compile(largeSrc),
smallCategoryGenerator = Handlebars.compile(smallSrc);

($.getJSON('/bitcamp-team-project/app/json/product/ctgList', (obj) => {
  $(largeCategoryGenerator(obj)).appendTo(searchSpan);
  $(smallCategoryGenerator(obj)).appendTo(searchSpan);

  searchSpan.append("<input id='searchWord' type='text'>")
  .append("<button id='search-btn' type='button'>검색</button>");

  $(document.body).trigger('loaded');
}));

$(document.body).bind('loaded', ()=>{
  $('#search-btn').click(function(){
    $.get('/bitcamp-team-project/app/json/product/list?largeNo='
        + $('#lageCtgSelect option:selected').val()
        + '&smallNo='
        + $('#smallCtgSelect option:selected').val() 
        + '&productName=' 
        + $('#searchWord').val() , function(obj){
          console.log(obj);
        }) // get
  }) // click


}) // bind









