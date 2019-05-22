var pageNo = 1,
    pageSize = 10,
    prevPageLi = $('#prevPage'),
    nextPageLi = $('#nextPage'),
    currSpan = $('#currPage > span'),
    tbody = $('tbody'),
    templateSrc = $('#tr-template').html();

var trGenerator = Handlebars.compile(templateSrc);

function loadList(pn) {
  $.getJSON('../../app/json/tip/list?pageNo=' + pn + "&pageSize=" + pageSize, 
      function(obj) {
    
    pageNo = obj.pageNo;
    tbody.html(''); 
    $(trGenerator(obj)).appendTo(tbody);
    
    currSpan.html(String(pageNo));
    
    if (pageNo == 1) {
      prevPageLi.addClass('diabled');
    } else {
      prevPageLi.removeClass('disabled');
    }
    
    if (pageNo == obj.totalPage) {
      nextPageLi.addClass('disabled');
    } else {
      nextPageLi.removeClass('disabled');
    }
    
    $(document.body).trigger('loaded-list');
  });
}

$('#prevPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo - 1);
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo + 1);
});

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
  $.getJSON('/bitcamp-team-project/app/json/tip/search?searchType=' 
      + cond + '&keyword=' + val
      , function(data) {
        if (data.status == 'success') {
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


