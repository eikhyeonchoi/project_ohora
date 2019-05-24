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
    pageGenerator = Handlebars.compile(pageSrc);

$(document).ready(function(){
  $('#fboard-search-btn').prop('disabled', true);
  
  $.get('/bitcamp-team-project/app/json/fboard/list', function(obj){
    console.log(obj);
    $(trGenerator(obj)).appendTo(tbody);
    
    var pageObj = {pageList: []};
    for (var page = 1; page <= obj.totalPage; page++) {
      pageObj.pageList.push({
        no: page
      });
    }
    
    $(pageGenerator(pageObj)).appendTo('.pagination');
    
    $('.page-link').click(function(e) {
      e.preventDefault();
      console.log('asd');
    });
    
    $(document.body).trigger('loaded-list');
  }) //get

  $.get('/bitcamp-team-project/app/json/auth/user', function(obj) {
    console.log(obj);
    
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


$(document.body).bind('loaded-user', function(obj){
}) // bind



$(document.body).bind('loaded-list', function(obj){
  $('.fboard-detail').off().click(function() {
    location.href = 'view.html?no=' + $(this).attr('data-no');
  }) // click
  
  $('.dropdown-item').click(function(e) {
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
      // 검색조건 + 검색어 
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
  
})





