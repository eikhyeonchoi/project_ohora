/*
 * 
 *  fboard index
 *  javascript
 * 
 */

var tbody = $('tbody'),
    page = $('.page-container'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc);

(function() {
  $.getJSON('/bitcamp-team-project/app/json/fboard/list',  function(obj) {
        page.pagination({
          dataSource: obj,
          locator: 'list',
          showGoInput: true,
          showGoButton: true,
          callback: function(data, pagination) {
            tbody.children().remove();
            var pageObj = {list: data};
            $(trGenerator(pageObj)).appendTo(tbody);
            
            $(document.body).trigger('loaded-list');
          }
        });
      });
})();


$(document).ready(function(){
  $('#fboard-search-btn').prop('disabled', true);
  
  $('#fboard-add-btn').click(function(){
    if(sessionStorage.getItem('no') != null) {
      location.href = 'form.html';
    } else {
      location.href = '../auth/login.html';
    }
  });
  
}) // ready



//trigger 3개 받는 bind
$(document.body).bind('loaded-list', function(obj){
  $('.fboard-detail').off().click(function() {
    location.href = 'view2.html?no=' + $(this).attr('data-no');
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
        // $(trGenerator(obj)).appendTo(tbody);
        page.pagination({
          dataSource: obj,
          locator: 'list',
          showGoInput: true,
          showGoButton: true,
          callback: function(data, pagination) {
            console.log(data);
            var pageObj = {list: data};
            $(trGenerator(pageObj)).appendTo(tbody);
            
            $(document.body).trigger('loaded-list');
          }
        });
        
        $(document.body).trigger({
          type: 'loaded-list'
        }) // trigger
      }) // get
    }
  }) // click

}) // bind


/*
 * 
 *        

          page.pagination({
          dataSource: obj,
          locator: 'list',
          showGoInput: true,
          showGoButton: true,
          callback: function(data, pagination) {
            tbody.children().remove();
            var pageObj = {list: data};
            $(trGenerator(pageObj)).appendTo(tbody);
            
            $(document.body).trigger('loaded-list');
          }
        });
        
        
        
 * 
 * 
 * 
 * 
 */

