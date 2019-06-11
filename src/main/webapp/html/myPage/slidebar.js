var memberNo,
memberPhoto,
userMail;

$(function(){
  var duration = 300;
  var close = $('<i class="fas fa-chevron-left">');
  var open = $('<i class="fas fa-chevron-right">');

  var $sidebar = $('.sidebar');
  var $sidebarButton = $('#slide-btn').click(function(){
    $sidebar.toggleClass('open'); // 버튼을 클릭했을때 sidebar open이라는 클래스가있으면 제거하고 없으면 생성한다.
    if($sidebar.hasClass('open')){ // open 클래스가 있으면 true 없으면 false
      $sidebar.stop(true).animate({left: '-70px'}, duration, 'easeOutBack');
      $sidebarButton.find('span').empty();
      $sidebarButton.find('span').append(close);
    }else{
      $sidebar.stop(true).animate({left: '-200px'}, duration, 'easeInBack');
      $sidebarButton.find('span').empty();
      $sidebarButton.find('span').append(open);
    };
  });
});

$(document.body).ready(function() {

  $(document.body).bind('loaded.loginuser', function() {
    memberNo = sessionStorage.getItem('no');
    userMail = sessionStorage.getItem('email');
    memberPhoto = sessionStorage.getItem('filePath');

    $('.photo0').attr('src', '/bitcamp-team-project/upload/memberfile/' + memberPhoto);

    $('#photo-icon-back').click(function() {
      $('#profile-fileupload').click();
    });

    $('#Profile-dlt-btn').click(function() {
      $.getJSON("/bitcamp-team-project/app/json/member/deleteFile?no=" + memberNo, 
          function(data) {
        if (data.status == "success") {
          logOut();
          logIn();
          location.reload();
        } else {
          alert("삭제중 오류 발생" + data.error);
        }
      }, "json");
    });

  }); // bind('loaded.loginuser')
}); //(document.body).ready

$('#profile-fileupload').fileupload({
  url: '/bitcamp-team-project/app/json/member/updateFile',
  dataType: 'json',
  add: function (e, data) {
    data.formData = {
        no: memberNo
    };
    data.submit();
  },
  done: function (e, data) {
    if(data.result.status == 'success') {
      logOut();
      logIn();
      location.reload();
    } else { 
      alert(data.result.error);
    }
  }
}) // fileupload

function logOut() {
  $.ajax({
    url     : '/bitcamp-team-project/app/json/auth/logout',
    type    : 'GET',
    sendDataType : 'json',
    async   : false
  })
  .done(function(json) {
    sessionStorage.clear();
  });
}

function logIn() {
  $.ajax({
    url     : '/bitcamp-team-project/app/json/auth/login2?email=' + userMail,
    type    : 'GET',
    sendDataType : 'json',
    async   : false
  })
}


