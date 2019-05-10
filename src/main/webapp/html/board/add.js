/**
 * 
 */

$('#return-indext-btn').click(function(){
  location.href = 'index.html';
});

$('#save-btn').click(function(){
  $.post('/bitcamp-team-project/app/json/board/add',{
    title: $('#title').val(),
    contents: $('#contents').val()
  }, function(data) {
    headers: ("Content-Type", "application/x-www-form-urlencoded");
  if(data.status == 'success'){
    location.href='index.html';
  } else alert("필수 입력값을 입력하지 않았습니다");
  }) // post
});