var detailNo = getQuerystring('no');

($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
    $('#review-no').val(data.no),
    $('#review-title').val(data.title),
    $('#review-contents').val(data.contents),
    $('#review-createdDate').val(data.createdDate),
    $('#review-viewCount').val(data.viewCount);
  }));

  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    console.log(obj);
    if(obj.status == 'fail') {
      $('#update-btn').hide();
      $('#delete-btn').hide();
    } else {
      $('#update-btn').show();
      $('#delete-btn').show();
    }
});
  
  
 
  
$('#delete-btn').click(() => {
  $.getJSON('/bitcamp-team-project/app/json/review/delete?no=' + detailNo, function(data) {
    })
    .done(function(data) {window.history.back();})
    .fail(function(data) {
      console.log(data)
      alert('삭제 실패입니다!\n' + data.responseText);
    })
  });

  
  $('#update-btn').click(() => {
    $.post('/bitcamp-team-project/app/json/review/update?no=' + detailNo, {
      title: $('#review-title').val(), 
      contents: $('#review-contents').val()
    }, function(data) {
      if (data.status == 'success') {
        location.href = "index.html";
      } else {
        alert('변경 실패 입니다.\n' +  data.message);
      }
    }, "json")
  });
  
  
  
  
  
  


  function getQuerystring(key, default_)
  {
    if (default_==null) default_=""; 
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if(qs == null)
      return default_;
    else
      return qs[1];
  }

