var pageNo = 1,
pageSize = 10,
totalPage = 0,
keyword = $('keyword'),
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage'),
currSpan = $('#currPage > span'),
templateSrc = $('#tr-template').html(); 

var trGenerator = Handlebars.compile(templateSrc);

function loadList(pn) {

  $.getJSON('../../app/json/notice/list?pageNo=' + pn + 
          '&pageSize=' + pageSize + 
          '&keyword=' + $('#keyword').val() + 
          '&searchType=' + $('#searchType').val(), 
          function (obj){
    console.log(obj);

    pageNo = obj.pageNo;
    totalPage = obj.totalPage;
    
    tbody.html('');
    $(trGenerator(obj)).appendTo(tbody);

    currSpan.html(String(pageNo));

    var currpage = pageNo % 5

    if (currpage == 1) {
      $('#1stPage').addClass('active');
    } else {
      $('#1stPage').removeClass('active');
    }

    if (currpage == 2) {
      $('#2ndPage').addClass('active');
    } else {
      $('#2ndPage').removeClass('active');
    }

    if (currpage == 3) {
      $('#3thPage').addClass('active');
    } else {
      $('#3thPage').removeClass('active');
    }

    if (currpage == 4) {
      $('#4thPage').addClass('active');
    } else {
      $('#4thPage').removeClass('active');
    }

    if (currpage == 0) {
      $('#5thPage').addClass('active');
    } else {
      $('#5thPage').removeClass('active');
    }

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

    $(document.body).trigger('loaded-list', ['pageNo', pageNo, 'totalPage', totalPage, 'obj', obj]);
  });
} // loadList()

var currPage = $(document.body).bind('loaded-list', ()=> {
  currPage = pageNo;
});

var endPage = $(document.body).bind('loaded-list', ()=> {
  endPage = totalPage % 5;
});

$('#1stPage > a').click((e) => {
  e.preventDefault();
  loadList(endPage);
});

$('#2ndPage > a').click((e) => {
  e.preventDefault();
  loadList(endPage + 1);
});

$('#3thPage > a').click((e) => {
  e.preventDefault();
  loadList(endPage + 2);
});

$('#4thPage > a').click((e) => {
  e.preventDefault();
  loadList(endPage + 3);
});

$('#5thPage > a').click((e) => {
  e.preventDefault();
  loadList(endPage + 4);
});

$('#prevPage > a').click((e) => {
  e.preventDefault();
  $('#1stPage > a').text()
  console.log($('#1stPage > a').html());
  loadList(pageNo - 1);
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  var pagecnt = $('#1stPage > a').text(6)
  loadList(pagecnt);
});

loadList(1);

$(document.body).bind('loaded-list', () => {

  $('.bit-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
    $(e.target).attr('data-no');
  });
});

//검색

$('#search-btn').click((e) => {
  loadList(1);
});









