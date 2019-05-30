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

    $('#user-nickName-span').html(nickName);

  });
});