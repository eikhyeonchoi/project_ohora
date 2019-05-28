var tbody = $('tbody'),
    page = $('#pagination-container'),
    rowCount = 0,
    pageSrc = $('#pagination-template').html(),
    pageGenerator = Handlebars.compile(pageSrc);

(function() {
  $.getJSON('/bitcamp-team-project/app/json/tip/list?searchType=' 
      + $('select#searchTag').val() + '&keyword=' + $('#search').val()
      ,  function(obj) {
        rowCount = obj.rowCount;
        page.pagination({
          dataSource: obj,
          locator: 'list',
          callback: function(data, pagination) {
            tbody.children().remove();
            var pageObj = {list: data};
            $(pageGenerator(pageObj)).appendTo(tbody);
          }
        });
      });
})();

/*

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
          
*/
