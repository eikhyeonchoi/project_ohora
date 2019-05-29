var divRow = $('div.tableRow'),
    page = $('#pagination-container'),
    insert = $('#insert-btn'),
    type = sessionStorage.getItem('type'),
    template = $('#pagination-template').html();
var pageGenerator = Handlebars.compile(template);
insert.hide();
console.log(divRow);
$(document).ready(function() {
  $(document.body).bind('loaded.loginuser', () => {
    type = sessionStorage.getItem('type');
    if (type > 1) {
      insert.show();
      
      insert.click(function() {
        location.href = 'add2.html';
      })
    }
  })
})


function loadList() {
  $.getJSON('/bitcamp-team-project/app/json/manual/list?searchType='
      + $('select#searchTag').val() + '&keyword=' + $('#search').val()
      , function(obj) {
        if (obj.status == "success") {
        console.log(obj);
        page.pagination({
          dataSource: obj.list,
          showGoInput: true,
          showGoButton: true,
          pageSize: 9,
          callback: function(data, pagination) {
            divRow.children().remove();
            var pageObj = {list: data};
            $(pageGenerator(pageObj)).appendTo(divRow);
            $(document.body).trigger('loaded-list');
          }
        });
        } else {
          alert('오류예엽\n' + obj.error)
        }
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

loadList();