$(document.body).ready(function() {
  $(document.body).bind('loaded.loginuser', function() {
    email = sessionStorage.getItem('email');
    $('#email').val(secretEmail(email));

    $(document).trigger('loaded-user');
  });
});

$(document.body).bind('loaded-user', function() {

});

$('#cancel-btn').click(function() { 
  location.replace('/bitcamp-team-project/index.html');
});

$('#confirm-btn').click(function() {
  $.getJSON("/bitcamp-team-project/app/json/member/password?email=" + email + "&&password=" + $('#password').val(), 
      function(data) {
    if (data.status == "success"){
      swal({
        title: "인증 성공!",
        icon: "success",
      });
      location.replace('index.html');
    } else {
      swal({
        title: "비밀번호를 다시 입력해주세요",
        icon: "error",
      });
      $('#password').val("")
    }
  }, "json");
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