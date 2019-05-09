var pageNo = 1,
pageSize = 3,
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage'),
currSpan = $('#currPage > span'),
templateSrc = $('#tr-template').html(); 

var trGenerator = Handlebars.compile(templateSrc);

function loadList(pn) {

  $.getJSON('../../app/json/notice/list?pageNo=' + pn + '&pageSize=' + pageSize, 
          function (obj){
    
    pageNo = obj.pageNo;

    tbody.html('');
    $(trGenerator(obj)).appendTo(tbody);

    currSpan.html(String(pageNo));

    if (pageNo == 1) {
      prevPageLi.addClass('disabled');
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

} // loadList()

$('#prevPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo - 1);
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo + 1);
});

loadList(1);

$(document.body).bind('loaded-list', () => {
  
  $('.bit-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
    $(e.target).attr('data-no');
  });
});











