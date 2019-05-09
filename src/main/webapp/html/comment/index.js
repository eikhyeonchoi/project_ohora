/*
 *  comment 
 *  javascript
 */
var div = $('#comment-list'),
    templateSrc = $('#comment-template').html();
var trGenerator = Handlebars.compile(templateSrc);

($.getJSON('/bitcamp-team-project/app/json/comment/list', (obj) => {
  console.log(obj);
  $(trGenerator(obj)).appendTo(div);
  
  $(document.body).trigger('loaded-comment');
}));


$(document.body).bind('loaded-comment', () => {
  $('#recomment-btn').one('click',() => {
    $('#comment-li').append('<br>' +
        '<form>' +
        '<textarea rows="2" cols="30"></textarea>' + 
        '<button id="recomment-add-btn" type="button">등록</button>' +
        '<button id="recomment-cancel-btn" type="button">취소</button>' +
        '</form>');
  });
  
  $('#recomment-cancel-btn').click(()=>{
    alert('asd');
  });
});


