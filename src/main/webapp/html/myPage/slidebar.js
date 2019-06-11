var nickName,
    memberNo;

$(function(){
  var duration = 300;
  var close = $('<i class="fas fa-chevron-left">');
  var open = $('<i class="fas fa-chevron-right">');

  var $sidebar = $('.sidebar');
  var $sidebarButton = $sidebar.find('button').on('click', function(){
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
    nickName = sessionStorage.getItem('nickName');
    memberNo = sessionStorage.getItem('no');
    
    $('#user-nickName-span').html(nickName);

    $('.photo0').click(function() {
      $('#profile-fileupload').click();
    });

    $('#profile-fileupload').fileupload({
      url: '/bitcamp-team-project/app/json/member/updateFile', // 서버에 요청할 URL
      dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
      fromData: {no: memberNo},
      done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
        if(data.result.status == 'success'){
          alert('사진을 업로드 하였습니다.')
        } else {
          alert(data.result.error);
        }
      }
    }) // fileupload

  });
});