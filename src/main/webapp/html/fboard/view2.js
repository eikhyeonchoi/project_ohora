
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
replySrc = $('#reply-list').html(),
commentListGenerator = Handlebars.compile(commentListSrc),
replyGenerator = Handlebars.compile(replySrc);

var userNo = 0,
userNickName = '';

$(document).ready(function() {
  $.get('../../app/json/fboard/detail?no=' + boardNo, function(obj) {
    console.log(obj);
    $('#memberNo').val(obj.board.member.nickName);
    $('#title').val(obj.board.title);
    $('#contents').val(obj.board.contents);
    $('#createdDate').val(obj.board.createdDate);
    $('#viewCount').val(obj.board.viewCount);
    var path = obj.path;
    for(var file of obj.board.fboardFiles) {
      $('#img-div').append("<img src='/bitcamp-team-project/upload/fboardfile/" + file.filepath + "' width='auto' height='auto'>");
    }


    $(document.body).trigger({
      type: 'loaded-detail',
      mNo: obj.board.memberNo
    }) // trigger
  }); // get
}); // ready


$(document.body).bind('loaded-detail', function(data){
  callUserInform(data);

  $.get('/bitcamp-team-project/app/json/fboard/commentList?no=' + boardNo ,function(obj) {
    console.log(obj);
    for(var pEl of obj.list){
      var con = String(pEl.contents);
      if(con.includes('삭제')) {
        $(pEl).attr('deletedComment', true);
      }
      for (var cEl of obj.clist){
        if(pEl.no == cEl.parentId){
          $(pEl).attr('hasChild', true);
          break;
        } // if
      } // for
    } // for

    $(commentListGenerator(obj)).appendTo($('.comment-child'));

    $('.find-reply-a').one('click', function(e) {
      e.preventDefault();
      $.get('/bitcamp-team-project/app/json/fboard/findReply?fboardNo='
          + boardNo + '&parentNo=' + $(e.target).attr('data-commtnet-no'), function(replyObj) {
            console.log(replyObj);
            $(replyGenerator(replyObj)).appendTo($(e.target).next())
            $(document.body).trigger({
              type: 'loaded-comment-list'
            });
          }) // get
          $(e.target).hide();
    }); // click


    $(document.body).trigger({
      type: 'loaded-comment-list'
    });

    $(document.body).trigger({
      type: 'activated-comment-update-delete-btn'
    });
  }); // get


  deleteBtn.click(() => {
    $.getJSON('../../app/json/fboard/delete?no=' + boardNo, function(obj) {
      if (obj.status == 'success') {
        alert('삭제완료');
        location.href = "index.html";
      } else {
        alert('삭제 실패 입니다.\n' +  obj.message);
      }
    }) // get
  }); // delete click

  updateBtn.click(() => {
    $.post('/bitcamp-team-project/app/json/fboard/update', {
      no: boardNo,
      title: $('#title').val(),
      contents: $('#contents').val()
    }, function(obj) {
      if (obj.status == 'success') {
        alert('변경완료');
      } else {
        alert('변경 실패 입니다.\n' +  obj.message);
      }
    }, "json") 
  }); // update click

}) // loaded-detail bind



$(document.body).bind('loaded-comment-list', function() {
  authViewBtn();

  $('.reply-add-btn').one('click', function(e){
    e.preventDefault();
    replyFormGenerator(e);
  }); // click

  $('.reply-update-btn').one('click', function(e) {
    e.preventDefault();
    console.log($(e.target).attr('data-reply-no'));
    $.post('/bitcamp-team-project/app/json/fboard/updateComment', {
      no: $(e.target).attr('data-reply-no'),
      contents: $(e.target).prev().val(),
      updateDate: getCurrentTime()
    }, function(obj) {
      if (obj.status == 'success') {
        location.reload();
      } else {
        alert('변경 실패 입니다.\n' +  obj.message);
      }
    }, "json")
  })

  $('.reply-delete-btn').one('click', function(e) {
    e.preventDefault();
    
    if ($(e.target).parent().prev().prev().length == 0 && 
        $(e.target).parent().prev().parent().parent().parent().children().eq(1).children().eq(1).val().includes('삭제된')){
      $.get('../../app/json/fboard/deleteComment?no='
          + $(e.target).parent().prev().parent().parent().parent().children().eq(1).children().first().attr('data-no'), function(obj) {
        })
    } // if
    
    $.get('../../app/json/fboard/deleteComment?no=' + $(e.target).attr('data-reply-no'), function(obj) {
      if (obj.status == 'success') {
        location.reload();
      } else {
        alert('삭제 실패 입니다.\n' +  obj.message);
      }
    }) // get
  })

  $('#comment-add-btn').click(function() {
    ajaxAddComment();
  })
}) // loaded-comment-list bind


$(document.body).bind('activated-comment-update-delete-btn', function() {
  ajaxDeleteComment();
  ajaxUpdateComment();
}) // activated-comment-update-delete-btn bind


function callUserInform(data){
  $.get('/bitcamp-team-project/app/json/auth/user' ,function(obj) {
    console.log(obj);
    if(obj.status == 'fail') {
      $('#fboard-comment-add-form').remove();
      $('.reply-add-btn').remove();
    }

    userNickName = obj.user.nickName;
    userNo = obj.user.no;
    if(obj.user.no != data.mNo){
      deleteBtn.hide();
      updateBtn.hide();
      $('#title').prop('disabled', true);
      $('#contents').prop('disabled', true);
    } 
  }); // get
} // callUserInform


function authViewBtn(){
  $('.p-member-no').each(function(index, item) {
    if(window.userNo == 0){
      $(item).next().next().hide();
      $(item).next().next().next().hide();
      $(item).next().next().next().next().hide();
      $(item).next().prop('disabled',true);

    }
    if ($(item).attr('data-member-no') != window.userNo) {
      $(item).next().next().next().hide();
      $(item).next().next().next().next().hide();
      $(item).next().prop('disabled',true);
    }
  })

  $('.p-reply-member-no').each(function(index, item) {
    if ($(item).attr('data-reply-member-no') != window.userNo || window.userNo == 0) {
      $(item).next().prop('disabled',true);
      $(item).next().next().hide();
      $(item) .next().next().next().hide();
    }
  })
} // authViewBtn


function ajaxDeleteComment(){
  $('.comment-delete-btn').click(function(e) {
    e.preventDefault();
    var commentNo = 0;
    if(window.newCommentNo == undefined) {
      commentNo = $(e.target).attr('data-no');
    } else {
      commentNo = window.newCommentNo;
    }

    if($(e.target).closest('div').next().is('a')){
      $.post('/bitcamp-team-project/app/json/fboard/updateComment', {
        no: commentNo,
        contents: '삭제된 댓글입니다.',
        updateDate: getCurrentTime()
      }, function(obj) {
        if (obj.status == 'success') {
          location.reload();
        } else {
          alert('삭제 실패 입니다.\n' +  obj.message);
        }
      }, "json");

      $(e.target).prev().prev().prev().text('삭제된 댓글입니다.').prop('disabled', true);
      $(e.target).prev().prev().remove();
      $(e.target).prev().remove();
      $(e.target).remove();
      return;
    } else {
      $(e.target).closest('div').prev().remove();
      $(e.target).closest('div').next().remove();
      $(e.target).closest('div').remove();

      $.get('/bitcamp-team-project/app/json/fboard/deleteComment?no=' +commentNo, function(obj) {
        if (obj.status == 'success') {
          location.reload();
        } else {
          alert('삭제 실패 입니다.\n' +  obj.message);
        }
      }, "json");

    }


    $(e.target).closest('div').prev().remove();
    $(e.target).closest('div').next().remove();
    $(e.target).closest('div').remove();
  });
} // deleteBtnActivate


function ajaxUpdateComment(){
    $.post('/bitcamp-team-project/app/json/fboard/updateComment', {
      no: commentNo,
      contents: $(e.target).prev().prev().val(),
      updateDate: getCurrentTime()
    }, function(obj) {
      if (obj.status == 'success') {
        location.reload();
      } else {
        alert('변경 실패 입니다.\n' +  obj.message);
      }
    }, "json") 
  }) // click
} // ajaxUpdateComment


function ajaxAddComment(){
  $.post('/bitcamp-team-project/app/json/fboard/addComment' , {
    memberNo: userNo,
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

  $(document.body).trigger({
    type: 'activated-comment-update-delete-btn'
  });

  $(document.body).trigger({
    type: 'loaded-comment-list'
  });
} // ajaxAddComment

//////////////////////////////////////////////////////////reply
//////////////////////////////////////////////////////////reply

function replyFormGenerator(e) {
  e.preventDefault();
  var replyObj = {
      replyList: [
        {
          no: $(e.target).attr('data-no'),
          createdDate: getCurrentTime(),
          memberNo: userNo,
          contents: '',
          member: {
            nickName: userNickName
          }
        }
        ]
  };
  
  if($(e.target).closest('div').next().is('a')){
    $(replyGenerator(replyObj)).appendTo($(e.target).closest('div').next().next());
    $(e.target).closest('div').next().next().children().children().eq(1).children().eq(4).remove();
    $(e.target).closest('div').next().next().children().children().eq(1).children().eq(3).remove();
    $(e.target).closest('div').next().next().children().children().eq(1).children().eq(2)
    .after('<button type="button" class="btn btn-primary reply-register-btn" data-no='+'"'+ $(e.target).attr('data-no') +'"'+'>등록</button>');    
  } else {
    $(replyGenerator(replyObj)).appendTo($(e.target).closest('div').next());
    $(e.target).closest('div').next().children().children().eq(1).children().eq(4).remove();
    $(e.target).closest('div').next().children().children().eq(1).children().eq(3).remove();
    $(e.target).closest('div').next().children().children().eq(1).children().eq(2)
    .after('<button type="button" class="btn btn-primary reply-register-btn" data-no='+'"'+ $(e.target).attr('data-no') +'"'+'>등록</button>');    
  }

  $(document.body).trigger({
    type: 'loaded-reply-form',
    event: e,
  });
  
} // replyFormGenerator


$(document.body).bind('loaded-reply-form', function(obj) {
  $('.reply-register-btn').off().click(function(e) {
    var parentId = 0; 
    // parentId = $(e.target).parent().prev().parent().parent().prev().children().first().attr('data-no');
    console.log($(e.target).attr('data-no'));
    
    if($(e.target).attr('data-no') == null) {
      console.log('null');
    }
    /*
    $.post('/bitcamp-team-project/app/json/fboard/addComment' , {
      memberNo: userNo,
      fboardNo: boardNo,
      contents: $(e.target).prev().val(),
      depth: 1,
      parentId: parentId
    }, function(obj) {
      if (obj.status == 'success') {
        location.reload();
      } else {
        alert('등록 실패 입니다.\n' +  obj.message);
      }
    }, "json") // post
    */
  }); // click
}) // loaded-reply-form bind


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