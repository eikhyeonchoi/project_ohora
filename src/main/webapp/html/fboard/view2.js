
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

var userNo = 0,
    memberNo = 0,
    userNickName = '';

$(document).ready(function() {
  $.get('../../app/json/fboard/detail?no=' + boardNo, function(obj) {
    console.log(obj);
    $('#memberNo').val(obj.board.member.nickName);
    $('#title').val(obj.board.title);
    $('#contents').val(obj.board.contents);
    $('#createdDate').val(obj.board.createdDate);
    $('#viewCount').val(obj.board.viewCount);

    if (obj.board.fboardFiles[0].filepath != null) {
      for(var file of obj.board.fboardFiles) {
        $('#img-div').append("<img src='/bitcamp-team-project/upload/fboardfile/" + file.filepath + "' width='auto' height='auto'>");
      }
    }
    
    memberNo = obj.board.memberNo;

    $(document.body).trigger({
      type: 'loaded-detail'
    }) // trigger
  }); // get
}); // ready


$(document.body).bind('loaded-detail', function(data){
  $.get('/bitcamp-team-project/app/json/fboard/commentList?no=' + boardNo ,function(obj) {
    console.log(obj);
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

  $('#fboard-file-input').fileupload({
    url: '/bitcamp-team-project/app/json/fboard/update', 
    dataType: 'json',
    sequentialUploads: true,
    singleFileUploads: false,
    add: function (e, data) {
      updateBtn.off().click(function() {
        data.formData = {
            no: boardNo,
            title: $('#title').val(),
            contents: $('#contents').val()
        };
        data.submit();
      });
    },
    done: function (e, data) {
      console.log(data);
      if(data.result.status == 'success'){
        location.href='index.html';
      } else { 
        alert("필수 입력값을 입력하지 않았습니다\n" + data.result.error);
      }
    }
  }) // fileupload


  updateBtn.off().click(function(){
    $.post('/bitcamp-team-project/app/json/fboard/update', {
      no: boardNo,
      title: $('#title').val(),
      contents: $('#contents').val()
    }, function(obj) {
      if (obj.status == 'success') {
        location.href = 'index.html';
      } else {
        alert('변경 실패 입니다.\n' +  obj.message);
      }
    }, "json") 
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
  $.get('/bitcamp-team-project/app/json/auth/user' ,function(obj) {
    console.log(obj);
    if(obj.status == 'fail') {
      $('#fboard-comment-add-form').remove();
      $('.reply-add-btn').remove();
    }

    userNickName = obj.user.nickName;
    userNo = obj.user.no;
    if(userNo != memberNo){
      deleteBtn.hide();
      updateBtn.hide();
      $('#fboard-file-div').hide();

      $('#title').prop('disabled', true);
      $('#contents').prop('disabled', true);
    }
    
    
    $('.p-member-no').each(function(index, item) {
      if($(item).attr('data-member-no') != userNo){
        $(item).next().prop('disabled', true);
        $(item).next().next().hide();
        $(item).next().next().next().hide();
      }
    }) // each
    
  }); // get
  
  
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