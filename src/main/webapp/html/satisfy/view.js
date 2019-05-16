var tbody = $('tbody'),
    templateSrc = $('#select-template').html();
var detailNo = location.href.split('?')[1];
var trGenerator = Handlebars.compile(templateSrc);
var total = 0,
    satisAver = 0,
    level = 0,
    understand = 0,
    design = 0,
    asStf = 0,
    useful = 0,
    price = 0;

();


/*
($.getJSON('/bitcamp-team-project/app/json/satisfy/detail?no=' + addNo.split('=')[1], (obj2) => {
  console.log(obj2);
});
($.getJSON('/bitcamp-team-project/app/json/satisfy/list', (obj) => {
  $(document.body).trigger('loaded-list');
}));


$(document.body).bind('loaded-list', () => {
  $('.satisfy-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'add.html?no=' + 
      $(e.target).attr('data-no');
  });
});
*/


/*

$(document.body).bind('loaded-list', () => {
  $('.satisfy-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
      $(e.target).attr('data-no');
  });
});
*/