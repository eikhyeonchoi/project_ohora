var who = window.localStorage.getItem('who');
if (who == "nomal") {
  $('h1').html("일반회원 가입");
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  };
} else {
  $('h1').html("기업회원 가입");
}

if (who == "nomal") {
  
  $('#add-btn').click(function(e) {
    
    $.post('../../app/json/member/add', {
      name: $('#name').val(),
      nickName: $('#nickName').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      tel: $('#tel').val(),
      type: "일반회원"
    },
    function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if (data.status == 'success') {
      location.href = "index.html";
    }
    }).fail(function(data) {
      alert('등록 실패 입니다.\n' +  data.message);
    });
  })
} else {
  
}

