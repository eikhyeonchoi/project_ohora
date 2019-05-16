var tbody = $('tbody');
var addBtn = $('#add-btn');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);

var count=180;
var counter = setInterval(timer, 1000); //1000 will  run it every 1 second


function loadList(pn) {

  $.getJSON('../../app/json/fboard/list', 
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

$.getJSON('../../app/json/auth/user', function(data) {
  if (data.status == "fail") {
    addBtn.hide();
  }
});

addBtn.click(() => {
  location.href = 'view.html';
});

loadList(1);


