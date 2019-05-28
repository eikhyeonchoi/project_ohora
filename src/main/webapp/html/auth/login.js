if (window.localStorage.getItem('email')) {
  $('#email').val(localStorage.email);
}

$('#login-btn').click(() => {
  $.post('../../app/json/auth/login', {
    email: $('#email').val(),
    password: $('#password').val()
  }, 
  function(data) {
    if ($('#saveEmail').is(":checked")) {
      window.localStorage.email = $('#email').val();
    } else {
      window.localStorage.removeItem("email");
    }
    if (data.status == 'success') {
      location.href = document.referrer;
    } else {
      alert('로그인 실패입니다!\n' + data.message);
    }
  })
});
