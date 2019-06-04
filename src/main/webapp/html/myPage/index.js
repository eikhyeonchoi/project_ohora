var nickName = '',
email = '',
tel = '',
name = '',
oldPwd = $('#oldPwd'),
oldPwdP = $('#oldPwd-p'),
oldPwdStatus = false,
newPwd = $('#newPwd'),
newPwdP = $('#newPwd-p'),
newPwdStatus = false,
newPwdAgree = $('#newPwd-agree'),
newPwdAgreeP = $('#newPwd-agree-p'),
newPwdAgreeStatus = false,
regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;


$(document.body).ready(function() {
  $(document.body).bind('loaded.loginuser', function() {
    nickName = sessionStorage.getItem('nickName');
    email = sessionStorage.getItem('email');
    tel = sessionStorage.getItem('tel');
    name = sessionStorage.getItem('name');
    pwdUpdateDate = sessionStorage.getItem('pwdUpdateDate');
    window.memberNo = sessionStorage.getItem('no');

    $('#user-nickName').html(nickName);
    $('#user-email').html(email);
    $('#user-tel').html(secretTel(tel));
    if (pwdUpdateDate.length == 4) {
      $('#date-dd').html("변경하신적이 없습니다.");
    } else {
      $('#date-dd').html(pwdUpdateDate);
    }
    $(document).trigger("loaded-user");
  });
});

$(document).bind('loaded-user', function() {
  $('#psw-update-btn').click(function() {
    $('.pwd-moadl').modal();

    $(document).trigger("view-modal");
  });

  $('#update-btn').click(function() {
    $('.member-moadl').modal();

    $(document).trigger("member-view-modal");
  });
});

$(document).bind('view-modal', function() {
  newPwd.attr('disabled',true);
  newPwdAgree.attr('disabled',true);
  $('#password-udt-btn').attr('disabled',true);

  oldPwd.keyup(function() {
    if (oldPwd.val() == "") {
      oldPwdP.html('');
      oldPwd.removeClass('is-invalid');
      oldPwd.removeClass('is-valid');
      oldPwdStatus = false;
      udtBtnCk();
    } else {
      $.getJSON("/bitcamp-team-project/app/json/member/password?email=" + email + "&&password=" + oldPwd.val(), 
          function(data) {
        if (data.status == "success"){
          oldPwdP.html('');
          oldPwd.removeClass('is-invalid');
          oldPwd.addClass('is-valid');
          newPwd.attr('disabled',false);
          newPwdAgree.attr('disabled',false);
          oldPwdStatus = true;
          udtBtnCk();
        } else {
          oldPwd.removeClass('is-valid');
          oldPwd.addClass(' is-invalid');
          newPwd.attr('disabled',true);
          newPwd.val("");
          newPwdAgree.attr('disabled',true);
          newPwdAgree.val("");
          newPwd.removeClass('is-invalid');
          newPwd.removeClass('is-valid');
          newPwdP.html("")
          newPwdAgree.removeClass('is-invalid');
          newPwdAgree.removeClass('is-valid');
          newPwdAgreeP.html("")
          oldPwdP.html('올바른 비밀번호를 입력해주세요.');
          oldPwdStatus = false;
          udtBtnCk();
        }
      }, "json");
    }
  }); //oldPwd.keyup

  newPwd.keyup(function() {
    if (newPwd.val() == "") {
      newPwdP.html('');
      newPwd.removeClass('is-invalid');
      newPwd.removeClass('is-valid');
      newPwdStatus = false;
      udtBtnCk();
    } else {
      if (!regex.test(newPwd.val())) {
        newPwdP.html('영문 대소문자, 숫자, 특수문자를 혼용하여 8~15자를 입력해주세요.');
        newPwd.removeClass('is-valid');
        newPwd.addClass(' is-invalid');
        newPwdStatus = false;
        udtBtnCk();
      } else if (newPwd.val() == oldPwd.val()) {
        newPwdP.html('이전과 같은 비밀번호를 사용하실 수 없습니다.');
        newPwd.removeClass('is-valid');
        newPwd.addClass(' is-invalid');
        newPwdStatus = false;
        udtBtnCk();
      } else {
        newPwdP.html("");
        newPwd.removeClass('is-invalid');
        newPwd.addClass('is-valid');
        newPwdStatus = true;
        udtBtnCk();
      }
    }
  }) //newPwd.keyup

  newPwdAgree.keyup(function() {
    if (newPwdAgree.val() == "") {
      newPwdAgreeP.html('');
      newPwdAgree.removeClass('is-invalid');
      newPwdAgree.removeClass('is-valid');
      newPwdAgreeStatus = false;
      udtBtnCk();
    } else {
      if (newPwdAgree.val() != newPwd.val()) {
        newPwdAgreeP.html("비밀번호를 확인해주세요.");
        newPwdAgree.removeClass('is-valid');
        newPwdAgree.addClass(' is-invalid');
        newPwdAgreeStatus = false;
        udtBtnCk();
      } else {
        newPwdAgreeP.html("");
        newPwdAgree.removeClass('is-invalid');
        newPwdAgree.addClass('is-valid');
        newPwdAgreeStatus = true;
        udtBtnCk();
      }
    }
  }) //newPwdAgree.keyup


}); //bind('view-modal')

function udtBtnCk() {
  if (oldPwdStatus == true && newPwdStatus ==true && newPwdAgreeStatus == true) {
    $('#password-udt-btn').attr('disabled',false);
  } else {
    $('#password-udt-btn').attr('disabled',true);
  }
}

$('#password-udt-btn').click(function() {
  $.post('/bitcamp-team-project/app/json/member/updatePassword',{
    no: window.memberNo,
    password: newPwd.val(),
    pwdUpdateDate: getCurrentTime()
  },function(data) {
    if(data.status == 'success'){
      alert("변경이 완료되었습니다!");
      $.get('/bitcamp-team-project/app/json/auth/logout', () => {
        location.href = "/bitcamp-team-project/index.html";
        sessionStorage.clear();
      });

    } else { 
      alert(data.error);
    }
  }, "json")
})

$('#password-udt-cns-btn').click(function() {
  oldPwd.val("");
  newPwd.val("");
  newPwdAgree.val("");
  $('input').removeClass('is-invalid');
  $('input').removeClass('is-valid');
  $('.pwd-p').html("");
  $('.modal').modal('hide');
  oldPwdStatus = false;
  newPwdStatus = false;
  newPwdAgreeStatus = false;
})

$(document).bind('member-view-modal', function() {
  $('#member-udt-btn').hide();
  $('#name').val(name);
  $('#nickName').val(nickName);
  var tels = tel.split("-");
  $('#tel1').val(tels[0]);
  $('#tel2').val(tels[1]);
  $('#tel3').val(tels[2]);

});







//전화번호를 **로 바꿔주는 함수
function secretTel (tel) {
  var tels = tel.split("-");

  var cutTel1 = tels[1];
  var num = cutTel1.substr(0,2);
  var num2 = cutTel1.replace(num, "**");

  var cutTel2 = tels[2];
  var num3 = cutTel2.substr(1,2);
  var num4 = cutTel2.replace(num3, "**");

  return tels[0] + "-" + num2 + "-" + num4;
}



function getCurrentTime() {
  var d = new Date();
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
} // getCurrentTime

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}
