var tbody = $('tbody');
var template = $('#tr-template');
var templateSrc = template.html();
var trGenerator = Handlebars.compile(templateSrc);

function loadList(pn) {
  $.getJSON('../../app/json/tip/list', 
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

$('#search-btn').click((e) => {
  e.preventDefault();
  search($('select#searchTag').val(), $('#search').val());
});

function search(cond, val) {
  console.log(cond);
  console.log(val);
  $.getJSON('/bitcamp-team-project/app/json/tip/search?searchType=' 
      + cond + '&keyword=' + val
      , function(data) {
        if (data.status == 'success') {
          alert('찾았습니다!');
          console.log(data.searchList);
          tbody.html('');
          $(trGenerator(data)).appendTo(tbody);

          $(document.body).trigger('loaded-list');
        } else {
          alert('오류입니다!\n' + data.error);
        }
      });
}
loadList(1);


