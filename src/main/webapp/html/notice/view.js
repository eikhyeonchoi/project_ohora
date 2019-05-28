var h1 = $('h1'),
el1 = $('.bit-new-item'),
el2 = $('.bit-view-item');

$(document).ready(function() {
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    console.log(obj);
    var loginUser = obj.user.type;
    if(loginUser == 3) {
      $('#update-btn').show();
      $('#delete-btn').show();
    }
})});


$(document).bind('load-file', function() {
  $.getJSON('/bitcamp-team-project/app/json/notice/files?no=' + param.split('=')[1], 
      function(data) {
    console.log(data.files.noticeFile)
    if (data.status == 'success') {
      if (typeof data.files.noticeFile != "undefind") {
        for (var i = 0; i < data.files.noticeFile.length; i++) {
          $('<img>').attr('src', '/bitcamp-team-project/upload/notice/' + data.files.noticeFile[i].filePath).appendTo($('#images-div'));
        }
      } else {
        $('#img-div').hide();
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });
}) //load-file

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
  location.href = 'form.html?no=' + $('#no').val();
});

function loadData(no) {

  $.getJSON('../../app/json/notice/detail?no=' + no, function(data) {
    $('#no').val(data.no),
    $('#title').val(data.title),
    $('#contents').val(data.contents),
    $('#createdDate').val(data.createdDate),
    $('#viewCount').val(data.viewCount);
  });
  $(document).trigger('load-file');
}

