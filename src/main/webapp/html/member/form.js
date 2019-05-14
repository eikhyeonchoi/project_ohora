var email = $("#email"),
ep = $("#email-p"),
password = $("#password"),
pp = $("#password-p"),
password2 = $("#password2"),
p2p = $("#password2-p"),
namee = $("#name"),
np = $("#name-p"),
tel1 = $("#tel1"),
tel2 = $("#tel2"),
tel3 = $("#tel3");
tp = $("#tel-p");

email.change(function() {
  emailCheck()
});

password.change(function() {
  passwordCheck()
});

password2.change(function() {
  password2Check()
});

namee.change(function() {
  nameCheck()
});

tel2.keydown(function() {
  if (tel2.val().length > 4) {
    tel2.val(tel2.val().slice(0, 3));
  } 
});

tel2.change(function() {
  telCheck()
});

tel3.keydown(function() {
  if (tel3.val().length > 4) {
    tel3.val(tel3.val().slice(0, 3));
  } 
});

tel3.change(function() {
  telCheck()
});

function emailCheck() {
  if (email.val() == ""){
    ep.html("email을 입력해 주세요.")
  } else if (!email.val().match('@')) {
    ep.html("email 형식으로 입력해 주세요.")
  } else {
    ep.html("");
  }
};

function passwordCheck() {
  if (password.val() == ""){
    pp.html("비밀번호를 입력해 주세요.")
  } else if (password.val().length < 8) {
    pp.html("8자리 이상의 비밀번호를 입력해 주세요.")
  } else {
    pp.html("");
  }
};

function password2Check() {
  if (password2.val() == password.val()){
    p2p.html("")
  } else {
    p2p.html("비밀번호가 일치하지 않습니다.");
    password2.val("")
  };
};

function nameCheck() {
  if (namee.val() == ""){
    np.html("회원명을 입력해 주세요.")
  } else {
    np.html("")
  }
};

function telCheck() {
  console.log(tel2.val());
  console.log(tel3.val());
  if(tel2.val() != "" && tel3.val() != ""){
    tp.html("")
  } else {
    tp.html("전화번호를 입력해 주세요.")
  }
};

//var addMember = function(name, nickName, email, password, tel, type) {
//alert("addMember호출");
//$.post("../../app/json/member/add", { 
//name: name,
//nickName: nickName,
//email: email,
//password: password,
//tel: tel,
//type: type},
//function(data) {
//alert("ssd")
//console.log("호출");
//if (data.status == 'success') {
//location.replace("index.html");
//} else {
//alert('등록 실패 입니다.\n' +  data.message);
//}
//}, "json");
//};

//$('#add-btn').click(function() {
//var email = $('#email').val();
//if (email == "") {
//alert("email을 입력해 주세요.")
//return;
//} else {
//if (email.indexOf('@') != 1) {
//alert("email 형식으로 입력해 주세요.\n" +
//"ex) dencw6@gmail.com");
//return;
//} else {

//}
//} 
//var name = $('#name').val();
//var nickName = $('#nickName').val();
//var password = $('#password').val();
//var tel = $('#tel').val();
//var type = "일반 회원";
//if (name != "" && nickName != "" && email != "" && password != "" && tel != "" && type != "") {
//alert("if호출");
//addMember(name, nickName, email, password, tel, type);
//} else {
//alert("else호출");
//return;
//}
//});

