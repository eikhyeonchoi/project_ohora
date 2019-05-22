var tbody = $('tbody'),
addBtn = $('#add-btn'),
templateSre = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSre);

$(document).ready(function() {

  $.getJSON('/bitcamp-team-project/app/json/question/list', function(data) {
    console.log(data);
    $(trGenerator(data)).appendTo(tbody);
    $(document.body).trigger('loaded-list');
  }) //getJSON
}) //ready

$(document.body).bind('loaded-list', () => {
  $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });
});

addBtn.click(function() {
  location.href = 'view.html';
});