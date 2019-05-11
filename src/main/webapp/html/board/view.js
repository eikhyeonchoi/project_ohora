/**
 *  board
 *  view javascript
 */
var tbody = $('tbody'),
    templateSrc = $('#tr-template').html(),
    rereForm = $('#rere-form');

var trGenerator = Handlebars.compile(templateSrc);

var param = location.href.split('?')[1]; // no=10

($.getJSON('/bitcamp-team-project/app/json/board/detail?no=' + param.split('=')[1], (obj) => {
  console.log(obj);
  
  rereForm.hide();
  $(trGenerator(obj)).appendTo(tbody);
  
  $('#title').val(obj.list.title);
  $('#contents').val(obj.list.contents);

  
  // 대댓글 이벤트 구현
  for(var el of obj.replylist) {
    console.log(el.contents);
    $('#rere-add-btn-' + el.no).on('click', function(){
      $(this).closest('tr').after(rereForm.show());
      var parentId = $(this).attr('data-no');
      
      $('#rere-add-btn').click(function(){
        // alert(parentId);
        $.post('/bitcamp-team-project/app/json/board/addReply', {
          boardId: param.split('=')[1],
          parentId: parentId,
          depth: 1,
          contents: $('#rere-content').val()
        }, function(data) {
          headers: ("Content-Type", "application/x-www-form-urlencoded");
        if(data.status == 'success'){
          location.reload();
        } else alert("답글등록 실패\n" + data.message);
        }) // post
        location.reload();
      })
      
      $('#rere-cancel-btn').click(function(){
        rereForm.hide();
      })
    })
  }
  
  $(document.body).trigger('loaded-list');
}));

$(document.body).bind('loaded-list', () => {
  $('#return-indext-btn').click(function(){
    location.href = 'index.html';
  });

  // 게시판 수정
  $('#board-update-btn').click(function(){
    $.post('/bitcamp-team-project/app/json/board/update', {
      no: param.split('=')[1],
      title: $('#title').val(),
      contents: $('#contents').val()
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if(data.status == 'success'){
      location.href='index.html';
    } else alert("수정 실패\n" + data.message);
    }) // post
  }); // click

  // 게시판 삭제
  $('#board-delete-btn').click(function(){
    $.get('/bitcamp-team-project/app/json/board/delete?no=' + param.split('=')[1], (obj) => {
      if(obj.status == 'success'){
        location.href='index.html';
      } else alert('삭제 실패\n' +  obj.message)
    }) // post
  });// click

  // 댓글 등록
  $('#reply-add-btn').click(function(){
    $.post('/bitcamp-team-project/app/json/board/addReply', {
      boardId: param.split('=')[1],
      parentId: 0,
      depth: 0,
      contents: $('#reply-content').val()
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if(data.status == 'success'){
      location.reload();
    } else alert("답글등록 실패\n" + data.message);
    }) // post
  }); // click


}); // bind
