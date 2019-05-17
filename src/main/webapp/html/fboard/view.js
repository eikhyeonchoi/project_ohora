
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
    replySrc = $('#reply-template').html(),
    commentListGenerator = Handlebars.compile(commentListSrc),
    replyGenerator = Handlebars.compile(replySrc);

var userNo = 0,
    userNickName = '';

$(document).ready(function() {
  $.get('../../app/json/fboard/detail?no=' + boardNo, function(obj) {
    $('#memberNo').val(obj.member.nickName);
    $('#title').val(obj.title);
    $('#contents').val(obj.contents);
    $('#createdDate').val(obj.createdDate);
    $('#viewCount').val(obj.viewCount);
    
    $(document.body).trigger({
      type: 'loaded-detail',
      mNo: obj.memberNo
    }) // trigger
  }); //get 
  
}); // ready

$(document.body).bind('loaded-detail', function(data){
  
  callUserInform(data);
  
  $.get('/bitcamp-team-project/app/json/fboard/commentList?no=' + boardNo ,function(obj) {
    console.log('댓글obj');
    console.log(obj);
    $(commentListGenerator(obj)).appendTo($('.comment-child'));
    
    
    $(document.body).trigger('loaded-comment-list');
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
  
  updateBtn.click(() => {
    $.post('/bitcamp-team-project/app/json/fboard/update?no=' + boardNo, {
      title: $('#title').val(),
      contents: $('#contents').val()
    }, function(obj) {
      if (obj.status == 'success') {
      } else {
        alert('변경 실패 입니다.\n' +  obj.message);
      }
    }, "json") 
  }); // update click
  
  
  $('#comment-add-btn').click(function() {
    ajaxAddComment();
  })

}) // loaded-detail bind


$(document.body).bind('loaded-comment-list', function() {
  authViewBtn();
  ajaxDeleteComment();
}) // loaded-comment-list bind




function authViewBtn(){
  $('.p-member-no').each(function(index, item) {
    if ($(item).attr('data-member-no') != window.userNo) {
      $(item).next().next().next().hide();
      $(item).next().next().next().next().hide();
    }
  })
} // authViewBtn

function ajaxDeleteComment(){
    $('.comment-delete-btn').click(function(e) {
      $(e.target).closest('div').prev().remove();
      $(e.target).closest('div').next().remove();
      $(e.target).closest('div').remove();
      
      $.getJSON('../../app/json/fboard/deleteComment?no=' + $(e.target).attr('data-no'), function(obj) {
        if (obj.status == 'success') {
          return;
        } else {
          alert('삭제 실패 입니다.\n' +  obj.message);
        }
      }) // get
    }) // click
} // deleteBtnActivate

function ajaxAddComment(){
  window.count = 0;
  if (count == 0) {
    count++;
    var obj = {
        list: [
          {
            contents: $('#comment-contents').val(),
            createdDate: getCurrentTime,
            member: {nickName: userNickName}
          }]}
    
    if($('#comment-contents').val().length == 0){
      alert('내용을 입력해주세요');
      return;
    }
    
    $(commentListGenerator(obj)).appendTo($('.comment-child'));
    requestAddComment();
    $('#comment-contents').val('');
  } else {
    
    var userClone = $('.fboard-comment-list-form').children().first().clone();
    var commentClone = $('.fboard-comment-list-form').children().eq(1).clone();
    userClone.find('.user-nickname').text(userNickName);
    userClone.find('.created-date').text(getCurrentTime);
    commentClone.find('input').val($('#comment-contents').val());
    
    if($('#comment-contents').val().length == 0){
      alert('내용을 입력해주세요');
      return;
    }
    
    $('.fboard-comment-list-form').append(userClone).append(commentClone).append('<br>');
    requestAddComment();
    $('#comment-contents').val('');
  }
  
  $(document.body).trigger('commentAddComplete');
} // ajaxAddComment

function requestAddComment(){
  $.post('/bitcamp-team-project/app/json/fboard/addComment' , {
    memberNo: userNo,
    fboardNo: boardNo,
    contents: $('#comment-contents').val(),
    depth: 0,
    parentId: 0
  }, function(obj) {
    if (obj.status == 'success') {
    } else {
      alert('등록 실패 입니다.\n' +  obj.message);
    }
  }, "json") // post
  
} // requestAddComment



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


function callUserInform(data){
  $.get('/bitcamp-team-project/app/json/auth/user' ,function(obj) {
    userNickName = obj.user.nickName;
    userNo = obj.user.no;
    if(obj.user.no != data.mNo){
      deleteBtn.hide();
      updateBtn.hide();
      $('#title').prop('readonly', true);
      $('#contents').prop('readonly', true);
    } 
  }); // get
} // callUserInform


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