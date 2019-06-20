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


$(document).ready(function(){
  loadList();
  
}) // ready


$('#search-btn').click(function() {
  console.log($('#searchType option:selected').val());
  loadList($('#searchType option:selected').val(),  $('#keyword').val())
}); // click


$('#fboard-add-btn').click(function(){
  if(sessionStorage.getItem('no') != null) {
    location.href = 'form.html';
  } else {
    location.href = '../auth/login.html';
  }
}); // click



//trigger 3개 받는 bind
$(document.body).bind('loaded-list', function(obj){
  $('.fboard-detail').off().click(function() {
    location.href = 'view.html?no=' + $(this).attr('data-no');
  }) // click

}) // bind


function loadList(type, keyword) {
  $.getJSON('/bitcamp-team-project/app/json/fboard/list?type=' + type + "&keyword=" + keyword,  function(obj) {
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
} // loadList

