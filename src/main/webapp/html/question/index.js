var tbody = $('tbody'),
addBtn = $('#add-btn'),
dltBtn = $('#delete-btn'),
templateSre = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSre);

var memberType;

$(document).ready(function() {

  $.get('/bitcamp-team-project/app/json/auth/user' ,function(data) {
    if(data.status == 'fail') {
      location.href = '/bitcamp-team-project/html/auth/login.html';
    } else {
      memberType = data.user.type;

      $.getJSON('/bitcamp-team-project/app/json/question/list?no=' + memberType, function(data) {
        $(trGenerator(data)).appendTo(tbody);

        $(document.body).trigger('loaded-list');
      }) //getJSON

    } // else 
  }); //get(user)

}) //ready

$(document.body).bind('loaded-list', () => {

  if (memberType == 1 || memberType == 2) {
    $('#my-question-title').html('나의 문의내역');
    $('.my-question').hide();
  } else {
    addBtn.hide();
    dltBtn.hide();
    $('.question-ck').hide();
  }

  $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });

});

addBtn.click(function() {
  location.href = 'view.html';
});

