var noticeNo = getQuerystring('no');



$(document).ready(function() {
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    console.log(obj);
    var loginUser = obj.user.type;
    if(loginUser == 3) {
      $('#update-btn').show();
      $('#delete-btn').show();
    }
})});

loadData(noticeNo);



$('#delete-btn').click(function() {
  $.getJSON('../../app/json/notice/delete?no=' + noticeNo, function(data) {
    if (data.status == 'success') {
      location.href = "index.html";
    } else {
      alert('삭제실패');
    }
  })
});


$('#update-btn').click(() => {
  location.href = 'form.html?no=' + noticeNo;
});


function loadData(no) {
  $.getJSON('../../app/json/notice/detail?no=' + no, function(data) {
    console.log(data);
    $('#title').html(data.title),
    $('#contents').html(data.contents),
    $('#createdDate').html(data.createdDate),
    $('#viewCount').html(data.viewCount + ' 읽음');
  });
}

function getQuerystring(key, default_){
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} // getQuerystring



