/**
 * 
 *  product
 *  index html
 */
var pageNo = 1,
pageSize = 10,
totalPage = 1,
currSpan = $('#currPage > span'),
searchSpan = $('#seachSpan'),
tbody = $('tbody'),
pageNavSrc = $('#tr-pageNav').html(),
largeSrc = $('#large-category-template').html(),
smallSrc = $('#small-category-template').html(),
basicList = $('#basic-list-form-template').html();

var largeCategoryGenerator = Handlebars.compile(largeSrc),
smallCategoryGenerator = Handlebars.compile(smallSrc),
basicListGenerator = Handlebars.compile(basicList),
pageGenerator = Handlebars.compile(pageNavSrc);


$(document).ready(function() {
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    $('#insert-btn').click(function() {
      if (obj.user.type < 2) {
        location.href = '/bitcamp-team-project/html/auth/login.html';
      } else {
        location.href = 'add.html';
      }
    })
  }) // get

  $.getJSON('/bitcamp-team-project/app/json/product/ctgList', (obj) => {
    $(largeCategoryGenerator(obj)).appendTo(searchSpan);
    $(smallCategoryGenerator(obj)).appendTo(searchSpan);

    searchSpan.append("<input id='searchWord' type='text'>")
    .append("<button id='search-btn' type='button'>검색</button>");

  });

  loadList(1);
})
function loadList(pn) {
  $.get('/bitcamp-team-project/app/json/product/list?pageNo=' + pn
      + '&pageSize=' + pageSize
      + '&largeNo=' + 0
      + '&smallNo=' + 0 
      + '&productName=' + 'undefined', function(obj){

    tbody.html('');
    $(basicListGenerator(obj)).appendTo(tbody);
    
    paging(obj);
    
    $(document.body).trigger('loaded');
  }) // get
}

function paging(obj) {
  pageNo = obj.pageNo;
  totalPage = obj.totalPage;
  var currpage = pageNo % 5
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

  if (pageNo > maxPage) {
    $('#nextPage').addClass('disabled');
  } else {
    $('#nextPage').removeClass('disabled');
  }
}

var currPage = $(document.body).bind('loaded-list', () => {
  currPage = pageNo;
});

var endPage = $(document.body).bind('loaded-list', () => {
  endPage = totalPage
});

$(document).on('click', '.ohr-page', function (e) {
  e.preventDefault();
  console.log($(e.target).html())
  loadList($(e.target).html());
})

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

$(document.body).bind('loaded', ()=>{
  $('#lageCtgSelect').change(function() {
    var state = $('#lageCtgSelect option:selected').val();
    // console.log('state => '+ state);
    for(var i=5; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').show(); }
    if (state == '1'){
      for(var i=5; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else if (state == '2'){
      for(var i=1; i<=4; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=9; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else if(state == '3'){
      for(var i=1; i<=8; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=13; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else { for(var i=1; i<=12; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); } }
  })

  // 검색 기능
  $('#search-btn').click(function(){
    /*
    if ($('#lageCtgSelect option:selected').val() == 0 ||
        $('#smallCtgSelect option:selected').val() == 0){
      alert('분류를 선택하세요!!');
      return;
    }
     */

    $.get('/bitcamp-team-project/app/json/product/list?pageNo='
        + 1 + '&pageSize=' + pageSize
        + '&largeNo=' + $('#lageCtgSelect option:selected').val()
        + '&smallNo=' + $('#smallCtgSelect option:selected').val() 
        + '&productName=' 
        + $('#searchWord').val() , function(obj){
          $(tbody).empty();
          $(basicListGenerator(obj)).appendTo(tbody);
          paging(obj);
          $(document.body).trigger('loaded-search-list');
        }) // get
  }) // click
  afterLoadedClickEvent();

}) // bind


$(document.body).bind('loaded-search-list', ()=> {
  afterLoadedClickEvent();
}) // bind



function afterLoadedClickEvent(){
  $('.product-a-class').click((e) => {
    location.href= 'view.html?no=' + $(e.target).attr('data-no') +'&name=' + $(e.target).attr('data-name');
  })
}


