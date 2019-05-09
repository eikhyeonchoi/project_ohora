var param = location.href.split('?')[1];
if (param) {
  $('h1').html("게시물 조회");
  loadData(param.split('=')[1]);
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html("새 글");
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

function loadData(no) {
  $.getJSON('../../app/json/fboard/detail?no=' + no, function(data) {
    $('#no').val(data.no);
    $('#memberNo').val(data.member.nickName);
    $('#title').val(data.title);
    $('#contents').val(data.contents);
    $('#createdDate').val(data.createdDate);
    $('#viewCount').val(data.viewCount);
  });
};

$('#add-btn').click(() => {
  $.post('../../app/json/fboard/add', {
    memberNo: $('#memberNo').val(),
    title: $('#title').val(),
    contents: $('#contents').val()
  },
  function(data) {
    headers: ("Content-Type", "application/x-www-form-urlencoded");
  if (data.status == 'success') 
    location.href = "index.html";

  }).fail (function (data) {
    alert('등록 실패 입니다.\n' +  data.message);

  })
});

$('#delete-btn').click() => {
  $.post('../../app/json/fboard/delete?no=')
};






