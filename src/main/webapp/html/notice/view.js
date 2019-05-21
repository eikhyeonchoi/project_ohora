var h1 = $('h1'),
el1 = $('.bit-new-item'),
el2 = $('.bit-view-item');

$(document).ready(function() {
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    console.log(obj);
    var loginUser = obj.user.type;
    if(loginUser != 3) {
      $('#update-btn').css('display', 'none');
      $('#delete-btn').css('display', 'none');
    } else {
      $('#update-btn').css('display', '');
      $('#delete-btn').css('display', '');
    }
})});

var param = location.href.split('?')[1];
if (param) {
  h1.html("공지사항"); 
  loadData(param.split('=')[1])
  for (e of el1) {
    e.style.display = 'none';
  }
} else {
  h1.html("새 글")
  for (e of el2) {
    e.style.display = 'none';
  }
}

$('#add-btn').click(() => {
  $.post( '../../app/json/notice/add',{
    title: $('#title').val(), 
    contents: $('#contents').val()
  }, function(data) {
    $('.bit-view-item').hide();
    if(data.status == 'fail'){
      alert('등록 실패입니다!\n' + data.message);
    } else {
      $('.bit-view-item').show();
      location.href = "index.html";
    }
  })
});

$('#delete-btn').click(() => {
  $.getJSON('../../app/json/notice/delete?no=' + $('#no').val(), 
          function(data) {
    //$('#no').val()
  })
  .done(function(data) {location.href = "index.html";})
  .fail(function(data) {
    console.log(data)
    alert('삭제 실패입니다!\n' + data.responseText);
  })
});

$('#update-btn').click(() => {
  $.post('../../app/json/notice/update', {
    no: $('#no').val(),
    title: $('#title').val(), 
    contents: $('#contents').val()
  }, function() {
  
  })
  .done(function() {
    location.href = "index.html";
  })
  .fail(function() {
    alert('등록 실패입니다!\n' + data.message)
  })
});

function loadData(no) {

  $.getJSON('../../app/json/notice/detail?no=' + no, function(data) {
    $('#no').val(data.no),
    $('#title').val(data.title),
    $('#contents').val(data.contents),
    $('#createdDate').val(data.createdDate),
    $('#viewCount').val(data.viewCount);
  });

}

