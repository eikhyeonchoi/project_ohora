var detailNo = getQuerystring('no');

($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
    console.log(data);
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
    $.getJSON('/bitcamp-team-project/app/json/review/delete?no=' + $('#no').val(), 
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
    $.post('/bitcamp-team-project/app/json/review/update', {
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

