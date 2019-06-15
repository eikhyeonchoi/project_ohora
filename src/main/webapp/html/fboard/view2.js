
/*
 *  fboard
 *  view javascript
 * 
 */

var boardNo = getQuerystring('no'),
    deleteBtn = $('#delete-btn'),
    updateBtn = $('#update-btn'),
    tbody = $('tbody'),
    commentListSrc = $('#comment-list').html(),
    commentListGenerator = Handlebars.compile(commentListSrc);

var userNo = sessionStorage.getItem('no'), // 로그인한 사람
    userNickName = sessionStorage.getItem('nickName'),
    memberNo = 0; // 글을 쓴 사람

$(document).ready(function() {
  
  $.get('../../app/json/fboard/detail?no=' + boardNo, function(obj) {
    console.log(obj);
    
    $('#fboard-id-img').attr('src', '/bitcamp-team-project/upload/memberfile/' + obj.board.member.filePath + "_thumb");
    $('#fboard-title').text(obj.board.title);
    $('#contents').html(obj.board.contents);
    
    
    $('#fboard-id').html(obj.board.member.nickName);
    $('#fboard-createdDate').html(obj.board.createdDate + "   |");
    $('#fboard-viewCount').html(obj.board.viewCount + " 읽음");
    
    memberNo = obj.board.memberNo;

    $(document.body).trigger({
      type: 'loaded-detail'
    }) // trigger
  }); // get
}); // ready


$(document.body).bind('loaded-detail', function(data){
  $.get('/bitcamp-team-project/app/json/fboard/commentList?no=' + boardNo ,function(obj) {
    console.log(obj);
    
    $('#total-comment').text('총 댓글  ' + obj.list.length + ' 개');
    $(commentListGenerator(obj)).appendTo($('.comment-child'));

    $(document.body).trigger({
      type: 'loaded-comment-list'
    });
  }); // get


  deleteBtn.click(() => {
    $.getJSON('../../app/json/fboard/delete?no=' + boardNo, function(obj) {
      if (obj.status == 'success') {
        location.href = "index.html";
      } else {
        alert('삭제 실패 입니다.\n' +  obj.message);
      }
    }) // get
  }); // delete click


  updateBtn.off().click(function(){
    location.href = 'form.html?no=' + boardNo;
  }); // update click
  
}) // loaded-detail bind



$(document.body).bind('loaded-comment-list', function() {
  callUserInform();
  
  $('#comment-add-btn').click(function() {
    $.post('/bitcamp-team-project/app/json/fboard/addComment' , {
      fboardNo: boardNo,
      contents: $('#comment-contents').val(),
      depth: 0,
      parentId: 0
    }, function(obj) {
      if (obj.status == 'success') {
        location.reload();
      } else {
        alert('등록 실패 입니다.\n' +  obj.message);
      }
    }, "json") // post
  }) // click


  $('.comment-delete-btn').click(function(e) {
    $.get('/bitcamp-team-project/app/json/fboard/deleteComment?no=' + $(e.target).attr('data-no') , function(obj) {
      if (obj.status == 'success') {
        location.reload();
      } else {
        alert('삭제 실패 입니다.\n' +  obj.message);
      }
    }, "json");

  }); // click
  

  $('.comment-update-btn').click(function(e) {
    $.post('/bitcamp-team-project/app/json/fboard/updateComment', {
      no: $(e.target).attr('data-no'),
      updateDate: getCurrentTime(),
      contents: $(e.target).prev().val()
    }, function(obj) {
      if (obj.status == 'success') {
        location.reload();
      } else {
        alert('변경 실패 입니다.\n' +  obj.message);
      }
    }, "json")
  }) // click
}) // loaded-comment-list bind



function callUserInform(){
  if(sessionStorage.getItem('no') == null) {
    $('#fboard-comment-add-form').remove();
    $('.reply-add-btn').remove();
  }
  
  if(userNo == memberNo) {
    deleteBtn.css('visibility', 'visible');
    updateBtn.css('visibility', 'visible');
  }
  
  $('.p-member-no').each(function(index, item) {
    if($(item).attr('data-member-no') != userNo){
      $(item).next().prop('disabled', true);
      $(item).next().next().hide();
      $(item).next().next().next().hide();
    }
  }) // each
} // callUserInform


function getQuerystring(key, default_){
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} // getQuerystring


function getCurrentTime() {
  var d = new Date();
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
} // getCurrentTime


function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}