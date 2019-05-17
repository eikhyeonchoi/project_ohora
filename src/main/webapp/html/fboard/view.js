
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
  
  $.get('/bitcamp-team-project/app/json/auth/user' ,function(obj) {
    console.log(obj);
    if(obj.user.no != data.mNo){
      deleteBtn.hide();
      updateBtn.hide();
      $('#title').prop('readonly', true);
      $('#contents').prop('readonly', true);
    } 
  }); // get
  
  
  $.get('/bitcamp-team-project/app/json/fboard/commentList?no=' + boardNo ,function(obj) {
    console.log(obj);
    $(commentListGenerator(obj)).appendTo($('.comment-child'));
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
    addComment();
    console.log(yyyymmdd());
    
    /*
    $.post('/bitcamp-team-project/app/json/fboard/addComment' , {
      memberNo: data.mNo,
      fboardNo: boardNo,
      contents: $('#comment-contents').val(),
      depth: 0,
      parentId: 0
    }, function(obj) {
      if (obj.status == 'success') {
      } else {
        alert('변경 실패 입니다.\n' +  obj.message);
      }
    }, "json")
    */
  }) // comment-add-btn click

}) // bind

function addComment(){
  
  console.log($('.fboard-comment-list-form').children().first().clone());
  console.log($('.fboard-comment-list-form').children().eq(1).clone());
  
  var userInformClone = $('.fboard-comment-list-form').children().first().clone();
  var commentFormClone = $('.fboard-comment-list-form').children().eq(1).clone();
  var br = '<br>';
  
  
  /*
  var userInformDivStart = "<div class='user-inform col-sm-12'>";
  var nameLabel = "<label class for='basic-url'>"+ +"</label>";
  var cdtLabel = "<label class for='basic-url'>"+ +"</label>";
  var endDiv = '</div>';
  var commentDivStart = "<div class='comment-form input-group'>";
  var createInput = "<input type='text' class='form-control col-sm-10 value='"+ +"'>";
  */
}


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


function yyyymmdd(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1
  var day = date.getDate();
  if(month < 10){
      month = "0"+month;
  }
  if(day < 10){
      day = "0"+day;
  }
  return year + "-" + month + "-"+day;
}
