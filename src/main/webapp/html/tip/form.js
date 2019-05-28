var productNo = location.href.split('?')[1].split('=')[1],
    nickName = sessionStorage.getItem('nickName');

$.getJSON('../../app/json/tip/productName?no=' 
    + productNo, function(obj) {
  $('#productName').attr('value', obj.product);
});

$('#add-btn').click(() => {
  $.post('/bitcamp-team-project/app/json/tip/add', {
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