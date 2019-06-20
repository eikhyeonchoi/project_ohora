var email,
leavePwd = $('#leave-pwd');

$(document.body).ready(function() {
  $(document.body).bind('loaded.loginuser', function() {
    email = sessionStorage.getItem('email');
    window.memberNo = sessionStorage.getItem('no');

    $('#leave-email').val(email);
    $(document).trigger("leaved-user");
  });
});

$(document).bind('leaved-user', function() {

  leavePwd.keyup(function() {
    $.getJSON("/bitcamp-team-project/app/json/member/password?email=" + email + "&&password=" + leavePwd.val(), 
        function(data) {
      if (data.status == "success"){
        $('#real-leave-btn').removeAttr("disabled");
      } else {
        $('#real-leave-btn').attr("disabled","true");
      }
    }, "json");
  });

  $('#real-leave-btn').click(function() {
    swal({
      title: "정말 탈퇴하시겠습니까?",
      icon: "info",
      buttons: {
        no: {
          text: '취소',
          value: 'no'
        },
        yes: {
          text: '탈퇴하기',
          value: 'yes'
        }
      },
    })
    .then((value) => {
      switch(value){
      case 'yes': 
        $.getJSON("/bitcamp-team-project/app/json/member/secessionMember?memberNo=" + window.memberNo,
            function(data) {
          if (data.status == "success"){
            $.get('/bitcamp-team-project/app/json/auth/logout', () => {
              location.href = "/bitcamp-team-project/index.html";
              sessionStorage.clear();
            });
          } else {
            swal({
              title: "탈퇴중 오류가 발생했습니다.",
              text: "다시 시도해 주세요.",
              icon: "info",
            });
          }
        }, "json");
        break;

      case  'no':
        swal({
          title: "취소되었습니다.",
          icon: "info",
        });
        break;

      default:
        break;
      }
    });

  });
});



