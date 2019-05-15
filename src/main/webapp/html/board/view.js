/**
 *  board
 *  view javascript
 */
var tbody = $('tbody'),
templateSrc = $('#tr-template').html(),
childSrc = $('#tr-template-child').html(),
rereForm = $('#rere-form');

var trGenerator = Handlebars.compile(templateSrc),
childGenerator = Handlebars.compile(childSrc);

var param = location.href.split('?')[1],
no = param.split('=')[1];

($.getJSON('/bitcamp-team-project/app/json/board/detail?no=' + no, (obj) => {
  console.log(obj);
  console.log(obj.replylist);

  rereForm.hide();
  $(trGenerator(obj)).appendTo(tbody);

  $('#title').val(obj.list.title);
  $('#contents').val(obj.list.contents);
  
  
  $('.test-update-btn').click(function(e) {
    var rNo = $(e.target).attr('data-no')
    var td = $(this).parents('.rere-tr').find('.rere-td');
    if($('#rere-delete-btn-' + rNo).css('display') != 'none') {
      $('#rere-delete-btn-' + rNo).hide();
      $('#rere-add-btn-' + rNo).hide();
      // 뺴오는거
      // $(this).parents('.rere-tr').find('.rere-td').attr('data-contents')
      td.text('');
      td.append($(childGenerator({contents: td.attr('data-contents')})));
    } else {
      // 바뀐값 가져오기
      console.log(td.find('textarea').val());
      // 기존값 가져오기
      console.log(td.find('textarea').attr('data-contents'));
      
      console.log(td.find('.rere-rd'));
      
      $.post('/bitcamp-team-project/app/json/board/updateReply', {
        no: rNo,
        contents: td.find('textarea').val()
      }, function() {
        $('#rere-delete-btn-' + rNo).show();
        $('#rere-add-btn-' + rNo).show();
      })
      location.href='view.html?no=' + no;
    } // else
  })
  
  
  /*
  // 댓글 업데이트
  for(var a of obj.replylist) {
    $('#rere-update-btn-' + a.no).on('click', function(){
      var rNo = $(this).attr('data-no')
      var td = $(this).parents('.rere-tr').find('.rere-td');
      if($('#rere-delete-btn-' + rNo).css('display') != 'none') {
        $('#rere-delete-btn-' + rNo).hide();
        $('#rere-add-btn-' + rNo).hide();


        // 뺴오는거
        // $(this).parents('.rere-tr').find('.rere-td').attr('data-contents')
        td.text('');
        td.append($(childGenerator({contents: td.attr('data-contents')})));
      } else {
        // 바뀐값 가져오기
        console.log(td.find('textarea').val());
        // 기존값 가져오기
        console.log(td.find('textarea').attr('data-contents'));
        $.post('/bitcamp-team-project/app/json/board/updateReply', {
          no: rNo,
          contents: td.find('textarea').val()
        }, function() {
          $('#rere-delete-btn-' + rNo).show();
          $('#rere-add-btn-' + rNo).show();
        })
        $('#rere-content-' + rNo).attr("readonly", true);
        location.href='view.html?no=' + no;
      } // else
    } // on -> function
    ) // on
  } // for
*/
  
  
  $('.test-delete-btn').click((e) => {
    $.get('/bitcamp-team-project/app/json/board/deleteReply?no=' + $(e.target).attr('data-no'), (obj) => {
//      console.log($(e.target).val())
      if(obj.status == 'success'){
        location.href='view.html?no=' + no;
      } else alert('삭제 실패 \n' +  obj.message)
    })
  })
  
  /*
//댓글 삭제
  for(var a of obj.replylist) {
    $('#rere-delete-btn-' + a.no).on('click', function(){
      $.get('/bitcamp-team-project/app/json/board/deleteReply?no=' + $(this).attr('data-no'), (obj) => {
        console.log(obj)
        if(obj.status == 'success'){
          location.href='view.html?no=' + no;
        } else alert('삭제 실패 \n' +  obj.message)
      })
    });// click
  }
  
  
  
  $('.test-add-btn').click(function(e){
    if($(e.target).attr('depth') == 1) {
      
    }
    
  })
   */
  
  // 대댓글 이벤트 구현
  
  console.log(obj.replylist)
  for(var el of obj.replylist) {
    if (el.depth != 0){
      $('#rere-add-btn-' + el.no).hide();
    }
} // for
    $('.test-add-btn').on('click', function(){
      $(this).closest('tr').after(rereForm.show());
      var parentId = $(this).attr('data-no');
      $('#rere-add-btn').click(function(e){
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
      }) // click

      $('#rere-cancel-btn').click(function(){
        rereForm.hide();
      }) // click
      
    }) // on
  
  
  
  $(document.body).trigger('loaded-list');
}));


$(document.body).bind('loaded-list', () => {
  $('#return-indext-btn').click(function(){
    location.href = 'index.html';
  });

  // 게시판 수정
  $('#board-update-btn').click(function(){
    $.post('/bitcamp-team-project/app/json/board/update', {
      no: no,
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
      } else alert('삭제 실패 \n' +  obj.message)
    }) // post
  });// click

  // 댓글 등록
  $('#reply-add-btn').click(function(){
    $.post('/bitcamp-team-project/app/json/board/addReply', {
      boardId: no,
      parentId: 0,
      depth: 0,
      contents: $('#reply-content').val()
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if(data.status == 'success'){
      location.reload();
    } else alert("답글 등록 실패\n" + data.message);
    }) // post
  }); // click


}); // bind
