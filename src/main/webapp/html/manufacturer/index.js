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

$('#search-btn').click(() => {
  $.post( '../../app/json/notice/search?keyword=' + $('#keyword').val(), {
    keyword: $('keyword').val()
  },
  function(data) {
    if(data.status == 'fail'){
      alert('검색 실패입니다!\n' + data.message);
    } else {
      location.href = "index.html";
    }
  })
});

loadList(1);


