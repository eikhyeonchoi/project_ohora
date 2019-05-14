/*
 * faq 
 * index javascript
 * 
 */
var tbody = $('tbody'),
    templateSrc = $('#tr-template').html();

var trGenerator = Handlebars.compile(templateSrc);

$(document).ready(function() {
  $('#faq-content').hide(); 
  
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    if (obj.user.type == 3) {
      $('#faq-add').show();
    } else {
      $('#faq-add').hide();
    }
  }) // get
  
  $.get('/bitcamp-team-project/app/json/faq/list', function(obj) {
    // list = obj.list;
    $(trGenerator(obj)).appendTo(tbody);
    
    $(document.body).trigger({
        type: 'loaded-list'});
  }) // get
  
}) // ready

// 기존에 '제목' 항목누르면 상세정보 페이지로 넘어가는 것
// window.location.href = 'view.html?no=' + $(e.target).attr('data-no');


$(document.body).bind('loaded-list', function() {
  $('.faq-a-class').on('click', function(e) {
    e.preventDefault();
    console.log($(this));
    // $(this).closest('tr').after(faqContent.show());
    
  }); // on
}); // bind















