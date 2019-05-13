var param = location.href.split('?')[1];
  $('h1').html("회원 조회");
  loadData(param.split('=')[1]);
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }

function loadData(no) {
  $.getJSON('../../app/json/member/detail?no=' + no, function(data) {
    $('#no').val(data.no);
    $('#name').val(data.name);
    $('#nickName').val(data.nickName);
    $('#email').val(data.email);
    $('#password').val(data.password);
    $('#tel').val(data.tel);
    $('#type').val(data.type);
    $('#ban').val(data.ban);
  });
};