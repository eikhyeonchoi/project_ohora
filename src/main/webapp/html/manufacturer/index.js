var tbody = $('tbody');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);
function loadList(pn) {

  $.getJSON('../../app/json/manufacturer/list', 
      function(obj) {
    tbody.html(''); 
    $(trGenerator(obj)).appendTo(tbody);

    $(document.body).trigger('loaded-list');

  }); 
}

$(document.body).bind('loaded-list', () => {
  var alist = $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });
});

loadList(1);

$('#keyword').keydown((e) => {
  if (event.keyCode == 13) {
  e.preventDefault();
  $.getJSON('../../app/json/manufacturer/search?keyword=' + $('#keyword').val()
      , function(data) {
    console.log(data);
    tbody.html(''); 
    $(trGenerator(data)).appendTo(tbody);
    $(document.body).trigger('loaded-list');
  })
  }
});

$('#search-btn').click(() => {
  console.log($('#keyword').val());
  $.getJSON('../../app/json/manufacturer/search?keyword=' + $('#keyword').val()
      , function(data) {
    console.log(data);
    tbody.html(''); 
    $(trGenerator(data)).appendTo(tbody);
    $(document.body).trigger('loaded-list');
  })
});
