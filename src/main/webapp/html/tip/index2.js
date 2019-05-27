var tbody = $('tbody');
var page = $('#pagination-container');

function loadList() {
  $.getJSON('/bitcamp-team-project/app/json/tip/list?searchType=' 
      + $('select#searchTag').val() + '&keyword=' + $('#search').val()
      , function(obj) {
        page.pagination({
          dataSource: obj,
          locator: 'list',
          callback: function(data, pagination) {
            var html = '<tr>';
            for (var i = 0; i < data.length; i++) {
              html += '<th scope="row">' + data[i].no + '</th>' +
              '<td scope="row"><a class="bit-view-link" href="#" data-no=' + data[i].product.no 
              + '>' + data[i].product.name + '</a></td>'
              + '<td scope="row">' + data[i].member.nickName + '</td>'
              + '<td scope="row">' + data[i].createdDate + '</td>';
              html += '</tr>';
            }
            tbody.html(html);
          }
        });
        $(document.body).trigger('loaded-list');
      });
};

$(document.body).bind('loaded-list', () => {
  $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });
});

$('#search').keydown((e) => {
  if (event.keyCode == 13) {
    e.preventDefault();
    loadList();
  }
});

$('#search-btn').click((e) => {
  e.preventDefault();
  loadList();
});