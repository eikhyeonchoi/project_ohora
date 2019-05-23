/*
 *  faq 
 *  view javascript
 * 
 */
var faqTypeSrc = $('#faq-type-template').html(),
    faqTypeGenerator = Handlebars.compile(faqTypeSrc);

var typeNo = 0;

$(document).ready(function(){
  $.get('/bitcamp-team-project/app/json/faq/list', function(obj){
    $(faqTypeGenerator(obj)).appendTo('.dropdown-menu');
    
    $('.dropdown-item').click(function(e) {
      $('.dropdown-toggle').text($(e.target).attr('data-type-name'));
      typeNo = $(e.target).attr('data-no');
    }) // click
    
    
    $(document.body).trigger({
      type: 'loaded-type'
    });
  }) // get
  
}); // ready


$(document.body).bind('loaded-type', function() {
  $('#faq-add-btn').click(function() {
    $.post('/bitcamp-team-project/app/json/faq/add',{
      title: $('.faq-title').val(),
      contents: $('.faq-contents').val(),
      qcNo: typeNo
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if(data.status == 'success'){
      location.href='index.html';
    } else alert("필수 입력값을 입력하지 않았습니다");
    }) // post  
  });

  $('#faq-cancel-btn').click(function() {
    location.href = 'index.html';
  });
  
}) // bind 


