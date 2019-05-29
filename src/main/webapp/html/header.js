$(document.body).ready(function() {
  loadLoginUser();
  $('.bit-main-header').load('/bitcamp-team-project/html/header.html',
      function (){
    $(document.body).trigger('loaded.header');
  });
});

$(document.body).bind('loaded.header', function(data) {
  loadLoginUser();
  $('#logout-menu').click(function(e) {
    e.preventDefault();
    $.get('/bitcamp-team-project/app/json/auth/logout', () => {
      location.href = "index.html";
      sessionStorage.clear();
    });
  });
});

function loadLoginUser() {
  $.getJSON('/bitcamp-team-project/app/json/auth/user', function(data) {
    if (data.status == 'success') {
      $("#bit-auth").hide();
      $('#bit-login-state').show();
      $('#login-username').html(data.user.name);
      sessionStorage.setItem('no', data.user.no);
      sessionStorage.setItem('type', data.user.type);
      sessionStorage.setItem('nickName', data.user.nickName);
      sessionStorage.setItem('name', data.user.name);
      sessionStorage.setItem('email', data.user.email);
      sessionStorage.setItem('tel', data.user.tel);
      
      $(document.body).trigger('loaded.loginuser');
      
    } else {
      $('#bit-not-login-state').show();
    }
  });
}

