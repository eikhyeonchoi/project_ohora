var searchName = $('#pwd-search-name'),
searchemail = $('#pwd-search-email'),
searchName2,
searchemail2,
facebookId,
facebookName,
facebookPhoto;

$(document).ready(function() {
  if (window.localStorage.getItem('email')) {
    $('#email').val(localStorage.email);
  }

  Kakao.init('2c964d35ffec8240fa4f8147d744e961');
  // 카카오 로그인 버튼을 생성합니다.
  Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn',
    success: function(authObj) {
      Kakao.API.request({
        url: '/v1/user/me',
        success: function(res) {
          $.post('/bitcamp-team-project/app/json/member/kakao', {
            id: res.id,
            nickName: res.properties.nickname,
            thumbnail: res.properties.thumbnail_image
          }, function(obj) {
            if (obj.status == 'success') {
              var kakaoId = res.id + "@kakao.user";
              snsLogin(kakaoId);
              location.replace('/bitcamp-team-project/index.html'); 
            } else {
              swal({
                text: "카카오톡 로그인 오류",
                title: "다시 시도해주세요",
                icon: "error",
                button: "확인",
              });
            }
          });
        },
        fail: function(error) {
          // alert(JSON.stringify(error));
          swal("카카오톡 로그인 오류", "카카오톡 로그인 중 오류가 발생했습니다", "error");
        }
      });
    },
    fail: function(err) {
      // alert(JSON.stringify(err));
      swal("카카오톡 로그인 오류", "카카오톡 로그인 중 오류가 발생했습니다", "error");
    }
  });

  // 페북설정 --------------------------------------------------//
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ko_KR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '440057900129999', // 개발자가 등록한 앱 ID
      cookie     : true,  
      xfbml      : true,  
      version    : 'v3.3' 
    });
    FB.AppEvents.logPageView();

  };
//페북설정 --------------------------------------------------//

}); // ready

function checkLoginState() {
  console.log("checkLoginState");
  FB.getLoginStatus(function(response) { 
    if (response.status === 'connected') { // 로그인이 정상적으로 되었을 때,
      getUserInfo(response.authResponse.accessToken);
    } else { // 로그인이 되지 않았을 때,
      swal({
        text: "페이스북 로그인 오류",
        title: "다시 시도해주세요",
        icon: "error",
        button: "확인",
      });
    }
  });
}; //checkLoginState()

function getUserInfo(accessToken) {
  FB.api('/me?fields=id,name,email,picture', function(response) {
    facebookId = response.id;
    facebookName = response.name;
    facebookPhoto = response.picture.data.url;
    $.post("/bitcamp-team-project/app/json/member/facebook", {
      facebookId: facebookId,
      facebookName: facebookName,
      facebookPhoto: facebookPhoto
    }, function(data) {
      if (data.status == 'success') {
        var fbMemberId = facebookId + "@facebook.user";
        snsLogin(fbMemberId);
        location.replace('/bitcamp-team-project/index.html'); 
      } else {
        swal({
          text: "페이스북 로그인 오류",
          title: "다시 시도해주세요",
          icon: "error",
          button: "확인",
        });
      }
    }, "json");
  });
} //getUserInfo()

function snsLogin(id) {
  $.ajax({
    url     : '/bitcamp-team-project/app/json/auth/login2?email=' + id,
    type    : 'GET',
    sendDataType : 'json',
    async   : false
  })
};

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
            swal({
              title: "메일을 확인해주세요.",
              icon: "success",
              button: "확인",
            });
            $.getJSON('/bitcamp-team-project/app/json/member/forgetPasswordEmailSend?name='
                + searchName2 + "&email=" + searchemail2,
                function(data) {
                });
            location.reload();
          } else {
            swal({
              text: "오류발생.",
              icon: "error",
              button: "확인",
            });
            searchName.val("");
            searchemail.val("");
          }
        }); //getJSON
  }); //('#password-search-btn').click
}); //('#password-search').click

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
      swal({
        title: "오류발생.",
        text: "다시 시도해주세요.",
        icon: "error",
        button: "확인",
      });
    }
  })
});

$('#fbloginBtn').click(function() {
  FB.login(function(response) {
    if (response.authResponse) {
      access_token = response.authResponse.accessToken; //get access token
      user_id = response.authResponse.userID; //get FB UID
      getUserInfo();
    }
  }, {scope: 'email,public_profile,user_birthday',
    return_scopes: true});
});

