var tbody = $('tbody'),
    addBtn = $('#fboard-add-btn'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc);

$(document).ready(function(){

  $.get('/bitcamp-team-project/app/json/fboard/list', function(obj){
    $(trGenerator(obj)).appendTo(tbody);
    $(document.body).trigger('loaded-list');
  }) //get

  $.get('/bitcamp-team-project/app/json/auth/user', function(obj) {
    $(document.body).trigger({
      type: 'loaded-user',
      userType: obj.user.type,
      status: obj.status
    }); // trigger
  }) // get
}) // ready



$(document.body).bind('loaded-user', function(obj){
  if (obj.status != 'success'){
    addBtn.hide();
  } 
  addBtn.click(function() {
    location.href='add.html';
  }) // click
}) // bind

$(document.body).bind('loaded-list', function(obj){
  $('.fboard-detail').click(function(e) {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  }) // click
  
}) // bind












