var tbody = $('tbody'),
    templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);

($.getJSON('/bitcamp-team-project/app/json/satisfy/list', (obj) => {
  $(trGenerator(obj)).appendTo(tbody);
  $(document.body).trigger('loaded-list');
}));


$(document.body).bind('loaded-list', () => {
  $('.product-a-class').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + 
      $(e.target).attr('data-no');
  });
});

