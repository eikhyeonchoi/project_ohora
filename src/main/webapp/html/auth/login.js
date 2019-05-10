if (window.localStorage.getItem('email')) {
  $('#email').val(localStorage.email);
}

$('#login-btn').click(() => {
  $.post('../../app/json/auth/login', {
    email: $('#email').val(),
    password: $('#password').val()
  }, 
  function(data) {
    headers: ("Content-Type", "application/x-www-form-urlencoded");
  
  if ($('#saveEmail').is(":checked")) {
    window.localStorage.email = $('#email').val();
  } else {
    window.localStorage.removeItem("email");
  }
  
  if (data.status == 'success') {
    location.href = "../index.html"

  } else {
    alert('로그인 실패입니다!\n' + data.message);
  }

  })
});

//var qs = 'email=' + email + '&password=' + password;
//xhr.send(qs);






