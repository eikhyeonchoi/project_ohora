/*
 *  comment 
 *  javascript
 */
var boardList = $('#boardList'),
    templateSrc = $('#boardList-template').html();
var trGenerator = Handlebars.compile(templateSrc);

($.getJSON('/bitcamp-team-project/app/json/board/list', (obj) => {
  $(trGenerator(obj)).appendTo(boardList);
  $(document.body).trigger('loaded-list');
}));

$(document.body).bind('loaded-list', () => {
  $('#boardAdd').click(function(){
    location.href = '/bitcamp-team-project/html/board/add.html';
  })
});


$(document).ready(function(){
  
});
