var nickName = '',
email = '',
tel = '',
lock = $('#lockImg');



$(document.body).ready(function() {
  $('#lock-img').hide();
  $(document.body).bind('loaded.loginuser', function() {
    nickName = sessionStorage.getItem('nickName');
    email = sessionStorage.getItem('email');
    tel = sessionStorage.getItem('tel');

    $('#user-nickName').html(nickName);
    $('#user-email').html(email);
    $('#user-tel').html(secretTel(tel));

    $(document).trigger("loaded-user");
  });
});

$(document).bind('loaded-user', function() {
  $('#psw-update-btn').click(function() {
    lock.addClass('animated ' + 'bounce');
    window.setTimeout( function(){
      lock.removeClass('animated ' + 'bounce');
      alert('가즈아')
    }, 2000);
  });
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


