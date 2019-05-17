
/*
 * fboard
 * add javascript
 * 
 */

$(document).ready(function() {
  
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    $(document.body).trigger({
      type: 'loaded-user',
      userNo: obj.user.no
    }) // trigger
  }) // get
}) // ready

$(document.body).bind('loaded-user', function(obj){
  
  $('#add-btn').click(function() {
    $.post('../../app/json/fboard/add', {
      title: $('#title').val(),
      contents: $('#contents').val(),
      memberNo: obj.userNo
    },
    function(data) {
      if (data.status == 'success') {
        location.href = "index.html";
      } else {
        alert('등록 실패 입니다.\n' +  data.message);
      }
    }, "json")
  }); // add click
  
}) // bind
