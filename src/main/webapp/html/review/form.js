var productNo = getQuerystring('no');

$(document).ready(function() {
  
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    $(document.body).trigger({
      type: 'loaded-user',
      userNo: obj.user.no
    }) // trigger
  }) // get
}) // ready

$(document.body).bind('loaded-user', function(obj){
  
  $('#add-btn').click(function() {
    $.post('/bitcamp-team-project/app/json/review/add', {
      productNo: productNo,
      memberNo: obj.userNo,
      title: $('#review-title').val(),
      contents: $('#review-contents').val()
    },
    function(data) {
      if (data.status == 'success') {
        window.history.back();
      } else {
        alert('등록 실패 입니다.\n' +  data.message);
      }
    }, "json")
  }); // add click
  
}) // bind

// 목록
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