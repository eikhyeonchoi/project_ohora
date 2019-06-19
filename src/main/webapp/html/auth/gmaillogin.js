/*function onSignIn(googleUser) {
  $.post('/bitcamp-team-project/app/gmailsignin', {
    token: googleUser.getAuthResponse().id_token
  }, function (obj) {
    if (obj.status == "success") {
      var gmailId = googleUser.getBasicProfile().getId() + '@gmail.user';
      snsLogin(gmailId);
      swal('로그인 성공!', 'logged in as: ' + googleUser.getBasicProfile().getName(), 'success');
      location.replace('/bitcamp-team-project/index.html');
    } else {
      swal("로그인 실패!", 'gmail 로그인 오류!', 'warning');
    }
  });
}*/

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    sessionStorage.clear();
  });
  auth2.disconnect();
}

function onSuccess(googleUser) {
  $.post('/bitcamp-team-project/app/gmailsignin', {
    token: googleUser.getAuthResponse().id_token
  }, function (obj) {
    console.log(obj);
    if (obj.status == "success") {
      var gmailId = googleUser.getBasicProfile().getId() + '@gmail.user';
      snsLogin(gmailId);
      swal('로그인 성공!', 'logged in as: ' + googleUser.getBasicProfile().getName(), 'success');
      location.replace('/bitcamp-team-project/index.html');
    } else {
      swal("로그인 실패!", 'gmail 로그인 오류!', 'warning');
    }
  });
}

function onFailure(error) {
    console.log(error)
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile',
      'width': 180,
      'height': 45,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

function snsLogin(id) {
  $.ajax({
    url     : '/bitcamp-team-project/app/json/auth/login2?email=' + id,
    type    : 'GET',
    sendDataType : 'json',
    async   : false
  })
};

