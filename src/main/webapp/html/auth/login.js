var searchName = $('#pwd-search-name'),
searchemail = $('#pwd-search-email'),
searchName2,
searchemail2;
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
    searchName2 = searchName.val();
    searchemail2 = searchemail.val();
    $.getJSON('/bitcamp-team-project/app/json/member/forgetPassword?name='
        + searchName.val() + "&email=" + searchemail.val(),
        function(data) {
          if (data.status == 'success') {
            alert('메일을 확인해주세요.');
            $.getJSON('/bitcamp-team-project/app/json/member/forgetPasswordEmailSend?name='
                + searchName2 + "&email=" + searchemail2,
                function(data) {
                });
            location.reload();
          } else {
            alert(data.error);
            searchName.val("");
            searchemail.val("");
          }
        }); //getJSON
  }); //('#password-search-btn').click
}); //('#password-search').click

