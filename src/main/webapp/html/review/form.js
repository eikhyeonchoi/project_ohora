var productNo = location.href.split('?')[1].split('=')[1],
no = sessionStorage.getItem('no');

$(document).ready(function() {
  $(document.body).trigger('loaded-user');
}) // ready

$(document.body).bind('loaded-user', function(obj){
  $('#add-btn').click(function() {
    $.post('/bitcamp-team-project/app/json/review/add', {
      productNo: productNo,
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

//목록
$('#list-btn').click(() => {
  location.href = document.referrer;
})


//글자수 세기
$(function(){
  $('input.form-control-plaintext').keyup(function(){
    bytesHandler(this);
  });
});

function getTextLength(str) {
  var len = 0;
  for (var i of str) {
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