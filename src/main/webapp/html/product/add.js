/**
 * 
 *  product
 *  add javascript
 */

var smallSrc = $('#small-category-template').html(),
manuSrc = $('#manufacturor-template').html(),
div = $('#selectDiv');

var smallCategoryGenerator = Handlebars.compile(smallSrc),
manufacturerGenerator = Handlebars.compile(manuSrc);

$(document).ready(function() {
  $.get('/bitcamp-team-project/app/json/product/manuList', function(obj){
    $(manufacturerGenerator(obj)).appendTo(div);
    $(div).append('<br>');
  }) // get

  $.get('/bitcamp-team-project/app/json/product/ctgList', function(obj){
    $(smallCategoryGenerator(obj)).appendTo(div);
    $(document.body).trigger('loaded-select');
  }) // get
}) // ready

$(document.body).bind('loaded-select', function() {
  $('#product-add-btn').click(function() {
    $.post('/bitcamp-team-project/app/json/product/add',{
      name: $('#productName').val(),
      smallCategoryNo: $('#smallCtgSelect option:selected').val(),
      manufacturerNo: $('#manufacturerSelect option:selected').val(),
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if(data.status == 'success'){
      location.href='index.html';
    } else alert("필수 입력값을 입력하지 않았습니다");
    }) // post
  }) // click

  $('#product-cancel-btn').click(function() {
    location.href = 'index.html';
  }) // click

}) // bind












