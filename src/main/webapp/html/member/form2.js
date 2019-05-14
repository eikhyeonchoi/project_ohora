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

var addMember = function(name, nickName, email, password, tel, type) {
  alert("addMember호출");
  $.post("../../app/json/member/add", { 
    name: name,
    nickName: nickName,
    email: email,
    password: password,
    tel: tel,
    type: type},
    function(data) {
      alert("ssd")
      console.log("호출");
      if (data.status == 'success') {
        location.replace("index.html");
      } else {
        alert('등록 실패 입니다.\n' +  data.message);
      }
    }, "json");
};

$('#add-btn').click(function() {
  var email = $('#email').val();
  if (email == "") {
    alert("email을 입력해 주세요.")
    return;
  } else {
    if (email.indexOf('@') != 1) {
      alert("email 형식으로 입력해 주세요.\n" +
      "ex) dencw6@gmail.com");
      return;
    } else {
      
    }
  } 
  var name = $('#name').val();
  var nickName = $('#nickName').val();
  var password = $('#password').val();
  var tel = $('#tel').val();
  var type = "일반 회원";
  if (name != "" && nickName != "" && email != "" && password != "" && tel != "" && type != "") {
    alert("if호출");
    addMember(name, nickName, email, password, tel, type);
  } else {
    alert("else호출");
    return;
  }
});

