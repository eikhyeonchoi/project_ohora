/*
 * faq 
 * index javascript
 * 
 */
var tbody = $('tbody'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc)

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


$(document.body).bind('loaded-list', function() {
  $('.faq-component').on('click', function(e) {
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  }); // on
}); // bind



/*
var childTag = $(this).find('.faq-component-child');
$.getJSON('/bitcamp-team-project/app/json/faq/detail?no=' + $(this).find('a').attr('data-no'), function(obj) {
  childTag.html('');
  $(trChildGenerator(obj)).appendTo(childTag);
});
*/











