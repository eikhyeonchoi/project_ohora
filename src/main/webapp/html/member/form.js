var email = $("#email"),
ep = $("#email-p"),
password = $("#password"),
pp = $("#password-p"),
password2 = $("#password2"),
p2p = $("#password2-p"),
namee = $("#name"),
np = $("#name-p"),
nickName = $("#nickName"),
nnp = $("#nickName-p"),
tel,
tel1 = $("#tel1"),
tel2 = $("#tel2"),
tel3 = $("#tel3"),
tp = $("#tel-p");

var emailCk = false;
var passwordCk = false;
var password2Ck = false;
var nameCk = false;
var telCk = false;
var nickNameCk = false;
var nNameOverlap = false;
var type = "일반 회원";

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
  if (tel2.val().length == 4) {
    tel2.val(tel2.val().substring(0, 3));
  } 
});

tel2.change(function() {
  telCheck()
});

tel3.keydown(function() {
  if (tel3.val().length == 4) {
    tel3.val(tel3.val().slice(0, 3));
  } 
});

tel3.change(function() {
  telCheck()
});

nickName.keydown(function() {
  nnp.html("중복 검사를 해주세요.");
  nNameOverlap = false;
});

function emailCheck() {
  if (email.val() == ""){
    ep.html("email을 입력해 주세요.");
    emailCk = false;
  } else if (!email.val().match('@')) {
    ep.html("email 형식으로 입력해 주세요.");
    emailCk = false;
  } else {
    ep.html("");
    emailCk = true;
  }
};

function passwordCheck() {
  if (password.val() == ""){
    pp.html("비밀번호를 입력해 주세요.");
    passwordCk = false;
  } else if (password.val().length < 8) {
    pp.html("8자리 이상의 비밀번호를 입력해 주세요.");
    passwordCk = false;
  } else {
    pp.html("");
    passwordCk = true;
  }
  password2Check();
};

function password2Check() {
  if (password2.val() == password.val()){
    p2p.html("");
    password2Ck = true;
  } else {
    p2p.html("비밀번호가 일치하지 않습니다.");
    password2.val("");
    password2Ck = false;
  };
};

function nameCheck() {
  if (namee.val() == ""){
    np.html("회원명을 입력해 주세요.");
    nameCk = false;
  } else {
    np.html("");
    nameCk = true;
  }
};

function telCheck() {
  if(tel2.val() != "" && tel3.val() != ""){
    tp.html("");
    telCk = true;
    tel = tel1.val() + tel2.val() + tel3.val();
    console.log(tel);
  } else {
    tp.html("전화번호를 입력해 주세요.");
    telCk = false;
  }
};

$("#n-name-btn").click(function() {
  if (nickName.val() == "") {
    alert("닉네임을 입력하세요.")
  } else {
    $.getJSON('../../app/json/member/nickName?nickName=' + nickName.val()
        , function(data) {
      if (data != 0) {
        nickName.val("");
        alert("닉네임 중복\n 사용할수 없는 닉네임 입니다.");
        nnp.html("닉네임을 입력해 주세요.");
        nickNameCk = false;
      } else {
        nnp.html("사용할수 있는 닉네임 입니다.");
        nickNameCk = true;
        nNameOverlap = true;
      }
    });
  };
});

$('#add-btn').click(function() {
  if (emailCk == true &&
      passwordCk == true && 
      password2Ck == true && 
      nameCk == true &&
      telCk == true && 
      nickNameCk == true &&
      nNameOverlap == true) {
    $.post("../../app/json/member/add", {
      email: email.val(),
      password: password.val(),
      name: namee.val(),
      nickName: nickName.val(),
      tel: tel,
      type: type
    }, function(data) {
      if (data.status == 'success') {
        location.replace("../auth/login.html");
        alert(namee.val() + "님 Ohora에 가입해 주셔서 감사합니다.")
      } else {
        alert('등록 실패 입니다.\n' +  data.message);
      }
    }, "json");

  } else {
    alert("회원 정보를 모두 입력하세여~")
    return;
  }

});


