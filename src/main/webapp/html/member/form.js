var randomNo = 0;
var SetTime, // 이메일인증 할때 뜨는 시간초(3분)
msg,
tid;
var email = $("#email"),
ep = $("#email-p"),
epp = $("#email-pp"),
password = $("#password"),
pp = $("#password-p"),
password2 = $("#password2"),
p2p = $("#password2-p"),
namee = $("#name"),
np = $("#name-p"),
nickName = $("#nickName"),
nnp = $("#nickName-p"),
ranNo = $("#ranNo"),
tel,
tel1 = $("#tel1"),
tel2 = $("#tel2"),
tel3 = $("#tel3");

var emailCk = false;
var passwordCk = false;
var password2Ck = false;
var nameCk = false;
var telCk = false;
var nickNameCk = false;
var nNameOverlap = false;
var type;
var ranNoCk = false;
var who;
var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

$(document).ready(function() {
  who = window.localStorage.getItem('who')
  if (who == "company") {
    $('#add-btn').html("다음");
    type = "2";
  } else {
    type = "1";
  }
  $("#email-btn").attr("disabled","disabled");
  ranNo.hide();
  $("#ranNo-btn").hide();
})

email.keyup(function() {
  epp.html("");
  ranNo.val("");
  clearInterval(tid);
  ranNo.hide();
  $("#ranNo-btn").hide();
  $("#email-btn").html("인증번호 받기");
  $("#email-btn").attr("disabled","disabled");
  email.addClass("is-invalid");
  email.removeClass("is-valid");
  ranNoCk = false;
  emailCk = false;
  $("#email-btn").show();
  if (email.val() == "") {
    ep.html("이메일을 입력해주세요.");
    email.addClass("is-invalid");
    email.removeClass("is-valid");
    emailCk = false;
  } else {
    if (!email.val().match(regExp)) {
      ep.html("이메일 형식으로 입력해주세요.")
      emailCk = false;
    } else {
      $.getJSON('../../app/json/member/emailCk?email=' + email.val(),
          function(data) {
        if (data.emailNo == 0) {
          ep.html("이메일 인증을 해주세요.");
          $("#email-btn").removeAttr("disabled");
          emailCk = true;
        } else {
          ep.html("이미 가입된 이메일입니다.");
          emailCk = false;
        }
      }, "json");
    }
  }
});

password.keyup(function() {
  passwordCheck()
});

password2.keyup(function() {
  password2Check()
});

namee.keyup(function() {
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

nickName.keyup(function() {
  if (nickName.val() == "") {
    nnp.html("닉네임을 입력해주세요.");
    nickName.addClass("is-invalid");
    nickName.removeClass("is-valid");
    nNameOverlap = false;
  } else {
    nnp.html("중복 검사를 해주세요.");
    nickName.addClass("is-invalid");
    nickName.removeClass("is-valid");
    nNameOverlap = false;
  }
});

function passwordCheck() {
  if (password.val() == ""){
    password.addClass("is-invalid");
    password.removeClass("is-valid");
    pp.html("비밀번호를 입력해 주세요.");
    passwordCk = false;
  } else if (password.val().length < 8) {
    pp.html("8자리 이상의 비밀번호를 입력해 주세요.");
    password.addClass("is-invalid");
    password.removeClass("is-valid");
    passwordCk = false;
  } else {
    password.addClass("is-valid");
    password.removeClass("is-invalid");
    pp.html("");
    passwordCk = true;
  }
  password2Check();
};

function password2Check() {
  if (password2.val() == "") {
    password2.removeClass("is-valid");
    password2.removeClass("is-invalid");
    p2p.html("비밀번호를 한번더 입력해주세요.");
  } else if (password2.val() == password.val()){
    p2p.html("");
    password2.addClass("is-valid");
    password2.removeClass("is-invalid");
    password2Ck = true;
  } else {
    p2p.html("비밀번호가 일치하지 않습니다.");
    password2.removeClass("is-valid");
    password2.addClass("is-invalid");
    password2Ck = false;
  };
};

function nameCheck() {
  if (namee.val() == ""){
    np.html("회원명을 입력해 주세요.");
    namee.removeClass("is-valid");
    namee.addClass("is-invalid");
    nameCk = false;
  } else {
    namee.addClass("is-valid");
    namee.removeClass("is-invalid");
    np.html("");
    nameCk = true;
  }
};

function telCheck() {
  if(tel2.val() != "" && tel3.val() != ""){
    telCk = true;
    tel = tel1.val() + "-" + tel2.val() + "-" + tel3.val();
  } else {
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
        nickName.addClass("is-invalid");
        nickName.removeClass("is-valid");
        nickNameCk = false;
      } else {
        nnp.html("사용할수 있는 닉네임 입니다.");
        nickName.addClass("is-valid");
        nickName.removeClass("is-invalid");
        nickNameCk = true;
        nNameOverlap = true;
      }
    });
  };
});

$('#add-btn').click(function() {
  console.log("ranNoCk");
  console.log(ranNoCk);
  console.log("passwordCk");
  console.log(passwordCk);
  console.log("password2Ck");
  console.log(password2Ck);
  console.log("nameCk");
  console.log(nameCk);
  console.log("telCk");
  console.log(telCk);
  console.log("nickNameCk");
  console.log(nickNameCk);
  console.log("nNameOverlap");
  console.log(nNameOverlap);
  console.log("ranNoCk");
  console.log(ranNoCk);
  if (passwordCk == true && 
      password2Ck == true && 
      nameCk == true &&
      telCk == true && 
      nickNameCk == true &&
      nNameOverlap == true &&
      ranNoCk == true &&
      emailCk == true) {
    $.post("../../app/json/member/add", {
      email: email.val(),
      password: password.val(),
      name: namee.val(),
      nickName: nickName.val(),
      tel: tel,
      type: type
    }, function(data) {
      if (data.status == 'success') {
        if (who == "company") {
          window.localStorage.tel = tel;
          location.href = 'form2.html'; 
        } else {
          alert(namee.val() + "님 Ohora에 가입해 주셔서 감사합니다.")
          location.replace("../auth/login.html");
        }
      } else {
        alert('등록 실패 입니다.\n' +  data.message);
      }
    }, "json");

  } else {
    if (ranNoCk != true) {
      alert("이메일을 인증해주세요.")
      return;
    } else if(emailCk != true){
      alert("이메일을 인증해주세요.")
      return;
    } else if(passwordCk != true){
      alert("8자리 이상의 비밀번호를 입력해주세요.")
      return;
    } else if(password2Ck != true){
      alert("비밀번호를 확인해주세요.")
      return;
    } else if(nameCk != true){
      alert("회원명을 입력해주세요.")
      return;
    }  else if(nickNameCk != true){
      alert("닉네임 중복검사를 해주세요.")
      return;
    } else if(nNameOverlap != true){
      alert("닉네임 중복검사를 해주세요.")
      return;
    } else if(telCk != true){
      alert("올바른 전화번호를 입력해주세요.")
      return;
    } else {
      return;
      alert("회원 정보를 모두 입력해주세요.")
    }
  }
});

function msg_time() { // 카운트 다운 함수.
  m = Math.floor(SetTime / 60) + "분 " + (SetTime % 60) + "초"; // 남은 시간 계산
  msg = "현재 남은 시간은 " + m + " 입니다.";

  if (SetTime < 0) {      // 시간이 종료 되었으면..\
    alert('시간이 만료되었습니다.');
    clearInterval(tid);   // 타이머 해제
    location.replace("/bitcamp-team-project/index.html");
  }
  epp.html(msg);
  SetTime--;  // 1초씩 감소
}

$("#email-btn").click(function() {
  ranNo.val("");
  alert("이메일을 확인해 주세요.\n 제한시간은 3분입니다.");
  ranNoCk = false;
  randomNo = 0;
  SetTime = 180;
  ranNo.show();
  clearInterval(tid);
  $("#ranNo-btn").show();
  $("#email-btn").html("인증번호 다시 받기");
  tid = setInterval('msg_time()', 1000);
  $.getJSON('../../app/json/member/email?email=' + email.val(),
      function(data) {
    if (data.status == 'success') {
      randomNo = data.ranNo;
      $("#ranNo-btn").off("click").on("click", function(e) {
        if (randomNo == ranNo.val()) {
          alert("인증성공!");
          email.addClass("is-valid");
          email.removeClass("is-invalid");
          clearInterval(tid);
          ep.html("");
          epp.html("");
          ranNo.hide();
          $("#email-btn").hide();
          $("#ranNo-btn").hide();
          ranNoCk = true;
        } else {
          alert("인증번호를 다시 확인해주세요.");
        }
      })
    } else {
      alert("이메일 인증에 실패했습니다.");
    }
  }, "json");

});

$("#add-cns-btn").click(function() {
  location.replace("/bitcamp-team-project/index.html");
});


