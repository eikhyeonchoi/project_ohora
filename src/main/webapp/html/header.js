//헤더 가져오기
$(document.body).ready(function() {
  $('.bit-main-header').load('/bitcamp-team-project/html/header.html',
      function (){
    $(document.body).trigger('loaded.header');
  });
});

//헤더를먼저 로딩한 후 로그인 버튼을 활성화시킨다. (...맞나?)
$(document.body).bind('loaded.header', function(data) {
  // 웹 페이지에 header.html을 삽입했으면 로그인 정보를 가져와 설정한다.
  loadLoginUser();
  // 로그아웃 버튼의 click 리스너를 등록한다.
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








