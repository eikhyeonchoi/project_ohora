var tbody = $('tbody');
var addBtn = $('#add-btn');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);

function loadList(pn) {

  $.getJSON('../../app/json/fboard/list', 
      function(obj) {
    tbody.html(''); 
    $(trGenerator(obj)).appendTo(tbody);

    $(document.body).trigger('loaded-list');

  }); 
}

$.getJSON('../../app/json/auth/user', function(data) {
  if (data.status == "fail") {
    addBtn.hide();
  }
});

addBtn.click(() => {
  $(document.body).bind('loaded-list', () => {
    var alist = $('.bit-view-link').click((e) => {
      e.preventDefault();
      location.href = 'view.html?no=' + $(e.target).attr('data-no');
    });
  });
});

loadList(1);


