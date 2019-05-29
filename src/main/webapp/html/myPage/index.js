var nickName = '',
email = '',
tel = '';


$(document.body).ready(function() {
  $(document.body).bind('loaded.loginuser', function() {
    nickName = sessionStorage.getItem('nickName');
    email = sessionStorage.getItem('email');
    tel = sessionStorage.getItem('tel');

    $('#user-nickName').html(nickName);
    $('#user-email').html(secretEmail(email));
    $('#user-tel').html(secretTel(tel));

    $(document).trigger("loaded-user");
  });
});

$(document).bind('loaded-user', function() {
  $('#update-btn').click(function() {
    location.href = "password.html";
  });
});


//email을 **로 바꿔주는 함수
function secretEmail (email) {
  var emails = email.split("@");
  // @앞부분 바꾸기
  var cutEmail = emails[0];
  var str = cutEmail.substr(1, 2);
  var str2 = cutEmail.replace(str, '**');
  // @뒷부분 바꾸기
  var cutEmail2 = emails[1];
  var str3 = cutEmail2.substr(0, 2);
  var str4 = cutEmail2.replace(str3, '**');
  // 합치기
  return str3 = str2 + '@' + str4;
}

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


