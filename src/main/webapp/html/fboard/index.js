/*
 * 
 *  fboard index
 *  javascript
 * 
 */

var tbody = $('tbody'),
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc),
pageSrc = $('#page-template').html(),
pageGenerator = Handlebars.compile(pageSrc),
rowCount,
pageNo=1;

$(document).ready(function(){
  $('#fboard-search-btn').prop('disabled', true);
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj) {
    $('#fboard-add-btn').click(function(){
      if(obj.status == 'success') {
        location.href = 'add.html';
      } else {
        location.href = '../auth/login.html';
      }
    })
    $(document.body).trigger({
      type: 'loaded-user'
    }); // trigger
  }) // get
}) // ready


loadList(1);


$(document.body).bind('loaded-user', function(obj){
}) // bind


//trigger 3개 받는 bind
$(document.body).bind('loaded-list', function(obj){

  $('.li-page > a').off().on('click', function(e) {
    e.preventDefault();
    $(e.target).parent().addClass('active');
    $('.li-page').not($(e.target).parent()).removeClass('active');
    loadList($(e.target).attr('data-no'));
  });


  $('.fboard-detail').off().click(function() {
    location.href = 'view.html?no=' + $(this).attr('data-no');
  }) // click

  $('.dropdown-item').off().click(function(e) {
    e.preventDefault();
    $(e.target).closest('div').prev().text($(e.target).text());
    $(document.body).trigger({
      type: 'condition-selected',
      condition: $(e.target).attr('data-condition')
    })
  }) // click
}) // bind

$(document.body).bind('condition-selected', function(obj){
  $('#fboard-search-btn').prop('disabled', false);
  // 검색조건
  var condition = obj.condition;
  console.log(condition);

  $('#fboard-search-btn').off().click(function() {
    if($(this).prev().children().eq(1).val() == '') {
      swal('검색어오류', '내용을 입력해주세요', "warning");
      return;

    } else {
      tbody.children().remove();
      // 검색조건 + 검색어 tValue = "undefined" ,required = false) String search) throws Exception {
      var search = $(this).prev().children().eq(1).val();

      if (condition == 'title') {
        search = 't.' + search;
      } else if (condition == 'contents') {
        search = 'c.' + search;
      } else {
        search = 'n.' + search;
      }

      $.get('/bitcamp-team-project/app/json/fboard/list?search=' + search , function(obj) {
        $(trGenerator(obj)).appendTo(tbody);
        $(document.body).trigger({
          type: 'loaded-list'
        }) // trigger
      }) // get
    }
  }) // click


}) // bind

$(document).on('click', '#prevPage > a', function(e) {
  e.preventDefault();
  window.pageNo--;
  for(var i = 1; i <= 5; i++) {
    $('.fboard-page-' + i).text(Number($('.fboard-page-' + i).html())-5);
    $('.fboard-page-' + i).attr('data-no', Number($('.fboard-page-' + i).html()));
  } // for
  loadList($('.li-page > a').html());
})  // click

  
$(document).on('click', '#nextPage > a', function(e) {
  e.preventDefault();
  window.pageNo++;
  for(var i = 1; i <= 5; i++) {
    $('.fboard-page-' + i).text(Number($('.fboard-page-' + i).html())+5);
    $('.fboard-page-' + i).attr('data-no', Number($('.fboard-page-' + i).html()));
  } // for
  loadList($('.li-page > a').html());
})  // click

function loadList(no) {
  $.get('/bitcamp-team-project/app/json/fboard/list?pageNo= ' + no, function(obj){
    console.log(obj);
    
    tbody.children().remove();
    $(trGenerator(obj)).appendTo(tbody);
    
    var nos2 = 6;
    
    
    var maxPage = (obj.rowCount / (nos2 * obj.pageSize)).toFixed();
    
    if(obj.rowCount % (nos2 * obj.pageSize) > 0){
      maxPage++;
    }
    
    
    
    var nos = [1,2,3,4,5];
    var pageObj = {
        nos: nos
    };

    if ($('#prevPage').length == 0) {
      $(pageGenerator(pageObj)).appendTo('.pagination');
    }


    for (var no of nos){
      if($('#page-' + no + ' > a').html() > obj.totalPage) {
        $('#page-' + no).hide();
        
      } else {
        $('#page-' + no).show();
      }
    }

    console.log(maxPage, window.pageNo)
    if (maxPage == window.pageNo) {
      $('#nextPage').addClass('disabled');
    } else {
      $('#nextPage').removeClass('disabled');
    }
    
    
    if (obj.pageNo < 6) {
      $('#prevPage').addClass('disabled');
    } else {
      $('#prevPage').removeClass('disabled');
    } 
    

    $(document.body).trigger('loaded-list');

  }) // get
} // loadedList(no)




