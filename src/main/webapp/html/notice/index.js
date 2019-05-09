var pageNo = 1,
pageSize = 3,
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage'),
currSpan = $('#currPage > span'),
templateSrc = $('#tr-template').html(); 

var trGenerator = Handlebars.compile(templateSrc);

//JSON 형식의 데이터 목록 가져오기
function loadList(pn) {

  $.getJSON('../../../app/json/notice/list?pageNo=' + pn + '&pageSize=' + pageSize, 
          function (obj){
    
    pageNo = obj.pageNo;

    tbody.html('');
    $(trGenerator(obj)).appendTo(tbody);

    // 현재 페이지의 번호를 갱신한다.
    currSpan.html(String(pageNo));

    // 1페이지일 경우 버튼을 비활성화 한다.
    if (pageNo == 1) {
      prevPageLi.addClass('disabled');
    } else {
      prevPageLi.removeClass('disabled');
    } 

    // 마지막 페이지일 경우 버튼을 비활성화 한다.
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

//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(1);

$(document.body).bind('loaded-list', () => {
  
  $('.bit-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
    $(e.target).attr('data-no');
  });
});











