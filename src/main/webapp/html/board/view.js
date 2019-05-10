/**
 *  board
 *  view javascript
 */
var param = location.href.split('?')[1]; // no=10

($.getJSON('/bitcamp-team-project/app/json/board/detail?no=' + param.split('=')[1], (obj) => {
  console.log(obj);
  $('#title').val(obj.list.title);
  $('#contents').val(obj.list.contents);

  $(document.body).trigger('loaded-list');
}));

$(document.body).bind('loaded-list', () => {
  $('#return-indext-btn').click(function(){
    location.href = 'index.html';
  });
  
  $('#update-btn').click(function(){
    $.post('/bitcamp-team-project/app/json/board/update', {
      no: param.split('=')[1],
      title: $('#title').val(),
      contents: $('#contents').val()
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
      console.log(data);
      if(data.status == 'success'){
        location.href='index.html';
      } else alert("수정 실패\n" + data.message);
    }) // post
  });
  
  $('#delete-btn').click(function(){
    
  });
});
