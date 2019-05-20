var randomNo = 0;
var SetTime, // 이메일인증 할때 뜨는 시간초(3분)
msg,
tid;
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
ranNo = $("#ranNo"),
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
var type;
var ranNoCk = false;
var who;
var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

$(document).ready(function() {
  who = window.localStorage.getItem('who')
  if (who == "company") {
    $('#add-btn').html("다음");
    type = "기업 회원";
  } else {
    type = "일반 회원";
  }
  ranNo.hide();
  $("#ranNo-btn").hide();
})

email.change(function() {
  clearInterval(tid);
  ranNoCk = false;
  $("#email-btn").show();
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
  } else if (!email.val().match(regExp)) {
    ep.html("email 형식으로 입력해 주세요.");
    emailCk = false;
  } else {
    ep.html("");
    ep.html("email 을 인증해 주세요.");
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
  if (ranNoCk == true &&
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
    alert("회원 정보를 모두 입력하세여~")
    return;
  }
});

function msg_time() { // 카운트 다운 함수.
  m = Math.floor(SetTime / 60) + "분 " + (SetTime % 60) + "초"; // 남은 시간 계산
  msg = "현재 남은 시간은 " + m + " 입니다.";

  if (SetTime < 0) {      // 시간이 종료 되었으면..\
    alert('시간이 만료되었습니다.');
    location.href = '/bitcamp-team-project/html/index.html'; 
    clearInterval(tid);   // 타이머 해제
  }
  ep.html(msg);
  SetTime--;  // 1초씩 감소
}

$("#email-btn").click(function() {
  ranNoCk = false;
  randomNo = 0;
  if (emailCk) {
    SetTime = 180;
    $.getJSON('../../app/json/member/email?email=' + email.val(),
        function(data) {
      if (data.nop != 0) {
        if (data.status == 'success') {
          clearInterval(tid);
          randomNo = data.ranNo;
          alert("이메일을 확인해 주세요.\n 제한시간은 3분입니다.");
          ranNo.show();
          $("#ranNo-btn").show();
          $("#email-btn").html("인증번호 다시 받기");
          tid = setInterval('msg_time()', 1000);
          $("#ranNo-btn").off("click").on("click", function(e) {
            if (randomNo == ranNo.val()) {
              alert("인증성공!");
              clearInterval(tid);
              ep.html("");
              console.log("호출")
              ranNo.hide();
              $("#email-btn").hide();
              $("#ranNo-btn").hide();
              ranNoCk = true;
            } else {
              alert("인증번호를 다시 확인해주세요.\n" + data.error);
            }
          })
        } else {
          alert("이메일 인증에 실패했습니다.");
        }
      } else {
        alert("이미 가입된 이메일입니다.");
      }
    }, "json");

  } else {
    alert("이메일을 제대로 입력해 주세요.")
  };
});


