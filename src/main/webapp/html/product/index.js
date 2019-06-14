var searchSpan = $('#seachSpan'),
tbody = $('tbody'),
page = $('#pagination-container'),
largeSrc = $('#large-category-template').html(),
smallSrc = $('#small-category-template').html(),
formInline = $('.formInline'),
basicSrc = $('#basic-list-form-template').html(),
cardSrc = $('#card-template').html();

var largeCategoryGenerator = Handlebars.compile(largeSrc),
smallCategoryGenerator = Handlebars.compile(smallSrc),
cardGenerator = Handlebars.compile(cardSrc),
listGenerator = Handlebars.compile(basicSrc);

var type;

$(document).ready(function() {
  $(document.body).bind('loaded.header', function() {
    $('#insert-btn').off().click(function() {
      window.type = Number(sessionStorage.getItem('type'));
      if (type == 0){
        location.href = '/bitcamp-team-project/html/auth/login.html';
      } else {
        if(type == 1){
          swal("등록 제한", "기업회원 또는 관리자만 등록할 수 있습니다", "error");
        } else {
          location.href = 'add.html';
        }
      }
    }); // click
  }); // bind

  loadList();
  $.getJSON('/bitcamp-team-project/app/json/product/ctgList', (obj) => {
    $(largeCategoryGenerator(obj)).appendTo($('#category-div'));
    $(smallCategoryGenerator(obj)).appendTo($('#category-div'));

    formInline
    .append("<div class='ml-sm-1'><input id='searchWord' type='text' class='form-control'>")
    .append("<button id='search-btn' type='button' class='btn btn-success btn-sm'>검색</button></div>");

    $(document.body).trigger('loaded-category');
  });
})
  
$(document.body).bind('loaded-category', function(){
  $('#lageCtgSelect').off().change(function() {
    var state = $('#lageCtgSelect option:selected').val();

    for (var i=1; i <= 16; i++)
      $('#smallCtgSelect').find('[value='+i+']').show();

    if (state.includes('1')){
      for(var i=5; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }

    } else if (state.includes('2')){
      for(var i=1; i<=4; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=9; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }

    } else if(state.includes('3')){
      for(var i=1; i<=8; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=13; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }

    } else if(state.includes('4')) {
      for(var i=1; i<=12; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); } 
    }
  }) // change

  $('#search-btn').off().click(function(){
    searchSrc();
  }) // click


}); // loaded-category

$(document.body).bind('loaded', ()=>{
  $('#searchWord').keydown((e) => {
    if (event.keyCode == 13) {
      e.preventDefault();
      searchSrc();
    }
  })
}) // bind


function loadList() {
  $.get('/bitcamp-team-project/app/json/product/list?largeNo=' + 0
      + '&smallNo=' + 0 
      + '&productName=' + 'undefined', function(obj){
    console.log(obj);
    paging(obj);
  }) // get
} // loadList


function paging(obj) {
  page.pagination({
    dataSource: obj.list,
    showGoInput: true,
    pageSize: 9,
    showGoButton: true,
    callback: function(data, pagination) {
      $('#product-div').children().remove();
      var pageSrc = {list : data};
      // $(listGenerator(pageSrc)).appendTo(tbody);
      $(cardGenerator(pageSrc)).appendTo($('#product-div'));
      $(document.body).trigger('loaded');


      afterLoadedClickEvent();
    }
  })
}; // paging


function searchSrc() {
  $.get('/bitcamp-team-project/app/json/product/list?largeNo=' 
      + $('#lageCtgSelect option:selected').val()
      + '&smallNo=' + $('#smallCtgSelect option:selected').val() 
      + '&productName=' 
      + $('#searchWord').val() , function(obj){
        console.log(obj);
        if (obj.list.length == 0) {
          swal("검색 결과", "등록된 제품이 존재하지 않습니다", "error").then(function(){
            location.reload();
          })
        }

        paging(obj);
        $(document.body).trigger('loaded-search-list');
      }) // get
} // searchSrc


function afterLoadedClickEvent(){
  $('.product-view-btn').off().click((e) => {
    location.href= 'newView2.html?no=' + $(e.target).attr('data-no') + '&name=' + $(e.target).attr('data-name'); 
  })
} // afterLoadedClickEvent


