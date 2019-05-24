var detailNo = getQuerystring('no');

($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
    $('#review-no').val(data.no),
    $('#review-id').val(data.member.name),
    $('#review-title').val(data.title),
    $('#review-contents').val(data.contents),
    $('#review-createdDate').val(data.createdDate),
    $('#review-viewCount').val(data.viewCount);
  }));


($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
//    console.log(obj.user.name);
//    console.log(data.member.name);
//    console.log(obj.user.type);
    
    
    if((obj.status=='success' && obj.user.name == data.member.name) || obj.user.type==3 ) {
      $('#update-btn').show();
      $('#delete-btn').show();
      $('#review-title' ).prop('readonly', false);
      $('#review-contents').prop('readonly', false);
    } else {
      $('#review-title' ).prop('readonly', true);
      $('#review-contents').prop('readonly', true);
    }
    
  })}));
  
  //삭제
  $('#delete-btn').click(() => {
  $.getJSON('/bitcamp-team-project/app/json/review/delete?no=' + detailNo, function(data) {
    })
    .done(function(data) {window.history.back();})
    .fail(function(data) {
      console.log(data)
      alert('삭제 실패입니다!\n' + data.responseText);
    })
  });

  //수정
  $('#update-btn').click(() => {
    $.post('/bitcamp-team-project/app/json/review/update?no=' + detailNo, {
      title: $('#review-title').val(), 
      contents: $('#review-contents').val()
    }, function(data) {
      if (data.status == 'success') {
//        console.log(data.user);
        window.history.back();
      } else {
        alert('변경 실패 입니다.\n' +  data.message);
      }
    }, "json")
  });
  
  
  //목록
  $('#list-btn').click(() => {
    window.history.back();
  })
  
  
  
  // 글자수 세기
  $(function(){
    $('input.form-control-plaintext').keyup(function(){
    bytesHandler(this);
     });
   });

    function getTextLength(str) {
    var len = 0;

    for (var i = 0; i < str.length; i++) {
    if (encodeURIComponent(str.charAt(i)).length == 6) {
      len++;
    }
      len++;
    }
      return len;
    }

    function bytesHandler(obj){
      var text = $(obj).val(); 
      $('p.bytes').text(getTextLength(text) + '/80');
    }
    

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

