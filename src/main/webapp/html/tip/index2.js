var tbody = $('tbody'),
    templateSrc = $('#tr-template').html();
var page = $('#pagination-container');
var rowCount = 0;
var template = Handlebars.compile(templateSrc);

(function() {
  $.getJSON('/bitcamp-team-project/app/json/tip/list?searchType=' 
      + $('select#searchTag').val() + '&keyword=' + $('#search').val()
      ,  function(obj) {
        rowCount = obj.rowCount;
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
      });
})();