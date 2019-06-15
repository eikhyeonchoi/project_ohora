var divRow = $('div.tableRow'),
    page = $('#pagination-container'),
    template = $('#pagination-template').html();
var pageGenerator = Handlebars.compile(template);

$(document).ready(() => {
  new WOW().init();
})

function loadList() {
  $.getJSON('/bitcamp-team-project/app/json/tip/list?searchType=' 
      + $('select#searchTag').val() + '&keyword=' + $('#search').val()
      , function(obj) {
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