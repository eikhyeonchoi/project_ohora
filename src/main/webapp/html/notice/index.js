var pageNo = 1,
pageSize = 10,
totalPage = 1,
keyword = $('keyword'),
tbody = $('tbody'),
currSpan = $('#currPage > span'),
templateSrc = $('#tr-template').html(),
pageNavSrc = $('#tr-pageNav').html(); 

var trGenerator = Handlebars.compile(templateSrc),
pageGenerator = Handlebars.compile(pageNavSrc);

$(document).ready(function() {
  $.get('../../app/json/auth/user', function(obj){
    console.log(obj);
    var loginUser = obj.user.type;
    if(loginUser != 3) {
      $('#add-button').hide();
    } else {
      $('#add-button').show();
    }
})});

function loadList(pn) {

  $.getJSON('../../app/json/notice/list?pageNo=' + pn + 
          '&pageSize=' + pageSize + 
          '&keyword=' + $('#keyword').val() + 
          '&searchType=' + $('#searchType').val(), 
          function (obj){

    //page
    console.log(obj);
    
    pageNo = obj.pageNo;
    totalPage = obj.totalPage;
    var currpage = pageNo % 5

    tbody.html('');
    $(trGenerator(obj)).appendTo(tbody);
    
    //page 버튼이 있을 경우 append 안 함
    if($(document).find('#pageUl').find('#prevPage').val() != 0) {
    $(pageGenerator(obj)).appendTo($('#pageUl'))
    }
    
    for(var no of obj.nos) {
      
      if($('#page-' + no + ' > a').html() > totalPage) {
        $('#page-' + no).hide();
     } else {
       $('#page-' + no).show();
      }
      
      if ($('#page-' + no + ' > a').html() == pageNo) {
        $('#page-' + no + ' > a').parent().addClass('active');
      } else {
        $('#page-' + no + ' > a').parent().removeClass('active');
      }
    } //for
    
    
    if (pageNo < 6) {
      $('#prevPage').addClass('disabled');
    } else {
      $('#prevPage').removeClass('disabled');
    } 
    
    var maxPage = ((obj.totalPage / 5).toFixed(0) * 5) % 5 == 0 
    ? ((obj.totalPage / 5).toFixed(0) * 5) - 5 
    : (obj.totalPage / 5).toFixed(0) * 5;
    
    console.log(maxPage);
    
    if (pageNo > maxPage) {
      $('#nextPage').addClass('disabled');
    } else {
      $('#nextPage').removeClass('disabled');
    }

  });
} // loadList()

var currPage = $(document.body).bind('loaded-list', () => {
  currPage = pageNo;
});

var endPage = $(document.body).bind('loaded-list', () => {
  endPage = totalPage
});

$(document).on('click', '.ohr-page', function (e) {
  e.preventDefault();
  loadList($(e.target).html());
})

loadList(1);

//detail 링크
$(document.body).bind('loaded-list', () => {

  $('.bit-view-link').click((e) => {
    window.location.href = 'view.html?no=' + 
    $(e.target).attr('data-no');
  });
});

$(document).on('click', '#prevPage > a', (e) => {
  e.preventDefault();
  for(var no = 1; no < 6; no++) {
    $('#page-' + no + ' > a').text(Number($('#page-' + no + ' > a').html()) - 5);
  }
  console.log($('.ohr-page > a').html())
  loadList(Number($('.ohr-page > a').html()) + 4);
});

$(document).on('click', '#nextPage > a', (e) => {
  e.preventDefault();
  for(var no = 1; no < 6; no++) {
    $('#page-' + no + ' > a').text(Number($('#page-' + no + ' > a').html()) + 5);
  }
  loadList($('.ohr-page > a').html());
});

//검색

$('#search-btn').click((e) => {
  for(var no = 1; no < 6; no++) {
    $('#page-' + no + ' > a').text(no);
  }
  loadList(1);
});
