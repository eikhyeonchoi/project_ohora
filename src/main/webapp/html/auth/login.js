var searchName = $('#pwd-search-name'),
searchemail = $('#pwd-search-email');
$(document).ready(function() {

  if (window.localStorage.getItem('email')) {
    $('#email').val(localStorage.email);
  }
});

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
      var prevLoc = document.referrer;
      location.href = prevLoc;
    } else {
      alert('로그인 실패입니다!\n' + data.message);
    }
  })
});


$('#password-search').click(function(e) {
  e.preventDefault();
  $('.pwd-search-moadl').modal();
  $('#password-search-btn').click(function() {
    $.getJSON('/bitcamp-team-project/app/json/member/forgetPassword?name='
        + searchName.val() + "&email=" + searchemail.val(),
        function(data) {
          if (data.status == 'success') {
            alert('성공')
          } else {
            alert('실패')
          }
        }); //getJSON
  }); //('#password-search-btn').click
}); //('#password-search').click