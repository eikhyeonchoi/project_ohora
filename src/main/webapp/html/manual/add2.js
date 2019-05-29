var nickName = sessionStorage.getItem('nickName');

$('#add-btn').click(() => {
  $.post('/bitcamp-team-project/app/json/product/add', {
    name:     $('#productName').val(),
    contents: $('#contents').val()
  }, function(data) {
    if(data.status == 'success') {
      history.back();
    } else {
      alert('팁 생성 실패입니다.\n' + data.message);
    }
  }, "json")
});

$(document).ready(function() {
  $('#manufacName').attr('placeholder', nickName);
});