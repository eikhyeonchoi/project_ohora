/**
 * 
 *  product
 *  index html
 */
var searchSpan = $('#seachSpan'),
    tbody = $('tbody'),
    largeSrc = $('#large-category-template').html(),
    smallSrc = $('#small-category-template').html(),
    basicList = $('#basic-list-form-template').html();

var largeCategoryGenerator = Handlebars.compile(largeSrc),
    smallCategoryGenerator = Handlebars.compile(smallSrc),
    basicListGenerator = Handlebars.compile(basicList);


$(document).ready(function() {
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    if (obj.user.type == 2 || obj.user.type == 3) {
      $('#insert-btn').show();
    } else {
      $('#insert-btn').hide();
    }
  }) // get
  
  $('#insert-btn').click(function() {
    location.href = 'add.html';
  })
  
  $.getJSON('/bitcamp-team-project/app/json/product/ctgList', (obj) => {
    $(largeCategoryGenerator(obj)).appendTo(searchSpan);
    $(smallCategoryGenerator(obj)).appendTo(searchSpan);

    searchSpan.append("<input id='searchWord' type='text'>")
    .append("<button id='search-btn' type='button'>검색</button>");

  });

  $.get('/bitcamp-team-project/app/json/product/list?largeNo='
      + 0
      + '&smallNo='
      + 0 
      + '&productName=' 
      + 'undefined', function(obj){
        $(basicListGenerator(obj)).appendTo(tbody);
        $(document.body).trigger('loaded');
      }) // get
})


$(document.body).bind('loaded', ()=>{
  $('#lageCtgSelect').change(function() {
    var state = $('#lageCtgSelect option:selected').val();
    // console.log('state => '+ state);
    for(var i=5; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').show(); }
    if (state == '1'){
      for(var i=5; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else if (state == '2'){
      for(var i=1; i<=4; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=9; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else if(state == '3'){
      for(var i=1; i<=8; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=13; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else { for(var i=1; i<=12; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); } }
  })

  // 검색 기능
  $('#search-btn').click(function(){
    /*
    if ($('#lageCtgSelect option:selected').val() == 0 ||
        $('#smallCtgSelect option:selected').val() == 0){
      alert('분류를 선택하세요!!');
      return;
    }
     */

    $.get('/bitcamp-team-project/app/json/product/list?largeNo='
        + $('#lageCtgSelect option:selected').val()
        + '&smallNo='
        + $('#smallCtgSelect option:selected').val() 
        + '&productName=' 
        + $('#searchWord').val() , function(obj){
          $(tbody).empty();
          $(basicListGenerator(obj)).appendTo(tbody);
          $(document.body).trigger('loaded-search-list');
        }) // get
  }) // click
  afterLoadedClickEvent();

}) // bind


$(document.body).bind('loaded-search-list', ()=> {
  afterLoadedClickEvent();
}) // bind



function afterLoadedClickEvent(){
  $('.product-a-class').click((e) => {
    location.href= 'view.html?no=' + $(e.target).attr('data-no') +'&name=' + $(e.target).attr('data-name');
  })
}


