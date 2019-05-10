var param = location.href.split('?')[1];
if (param) {
  $('h1').html("회원 조회");
  loadData(param.split('=')[1]);
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html("회원 가입");
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

$('#add-btn').click(function() {
  $.post('../../app/json/member/add', {
    name: $('#name').val(),
    nickName: $('#nickName').val(),
    email: $('#email').val(),
    password: $('#password').val(),
    tel: $('#tel').val()
  },
  function(data) {
    headers: ("Content-Type", "application/x-www-form-urlencoded");
  if (data.status == 'success') {
    location.href = "index.html";
  }
  }).fail(function(data) {
    alert('등록 실패 입니다.\n' +  data.message);
  })
})

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