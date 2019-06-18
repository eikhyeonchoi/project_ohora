/**
 * 
 */


$('#toast-btn').click(function() {
  $('body').loading({
    stoppable: false,
    theme: 'dark',
    message: '업로드 중 입니다, 잠시만 기다려주세요',
    
  });
});

