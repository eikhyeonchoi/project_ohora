var h1 = $('h1'),
el1 = $('.bit-new-item'),
el2 = $('.bit-view-item');

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
    if(data.status == 'fail'){
      alert('등록 실패입니다!\n' + data.message);
    } else {
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
    $('#no').val(data.notice.no),
    $('#title').val(data.notice.title),
    $('#contents').val(data.notice.contents),
    $('#createdDate').val(data.notice.createdDate),
    $('#viewCount').val(data.notice.viewCount);

    //관리자 필터
    var loginUser = data.loginUser.type;
    if(loginUser != 3) {
      $('#update-btn').css('display', 'none');
      $('#delete-btn').css('display', 'none');
    } else {
      $('#update-btn').css('display', '');
      $('#delete-btn').css('display', '');
    }
  });

}

