var param = location.href.split('?')[1];
$.getJSON('../../app/json/auth/user', function(data) {
  $(document).ready(function() {
    $('#memberName').attr('placeholder', data.user.nickName);
    console.log(data.user.nickName);
  });
  $.getJSON('../../app/json/tip/productName?no=' + param.split('=')[1], function(obj) {
    console.log(obj.product);
    $('#productName').attr('value', obj.product);
  });
})

$('#add-btn').click(() => {
  $.post('/bitcamp-team-project/app/json/tip/add', {
    name:     $('#productName').val(),
    nickName: $('#memberName').attr('placeholder'),
    contents: $('#contents').val()
  }, function(data) {
    if(data.status == 'success') {
      location.href = "../product/view.html?no=" + param.split('=')[1];
    } else {
      alert('팁 생성 실패입니다.\n' + data.message);
    }
  }, "json")
});

