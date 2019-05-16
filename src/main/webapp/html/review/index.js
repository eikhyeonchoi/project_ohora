var tbody = $('tbody'),
    templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);

($.getJSON('/bitcamp-team-project/app/json/satisfy/list', (obj) => {
  console.log(obj);
  $(trGenerator(obj)).appendTo(tbody);
  $(document.body).trigger('loaded-list');
}));


$(document.body).bind('loaded-list', () => {
  $('.product-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
      $(e.target).attr('data-no');
  });
});

