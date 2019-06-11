var detailNo = location.href.split('?')[1].split('=')[1],
type = sessionStorage.getItem('type'),
name = sessionStorage.getItem('name');

($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
	console.log(data)
	$('#review-prod-no').val(data.productNo),
  $('#review-no').val(data.no),
  $('#review-id').html(data.member.nickName),
  $('#review-title').html(data.title),
  $('#review-contents').html(data.contents),
  $('#review-createdDate').html(data.createdDate + '   |'),
  $('#review-viewCount').html(data.viewCount + ' 읽음');
}));


($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
  if (name == data.member.name || type == 3) {
    $('#update-btn').show();
    $('#delete-btn').show();
  }

}));

//삭제
$('#delete-btn').click(() => {
  $.getJSON('/bitcamp-team-project/app/json/review/delete?no=' + detailNo, function(data) {
  })
  .done(function(data) {
	  location.href = 'prodView.html?no=' + $('#review-prod-no').val();
    }
  ).fail(function(data) {
    alert('삭제 실패입니다!\n' + data.responseText);
  })
});

//수정
$('#update-btn').click(() => {
	location.href = 'form.html?no=' + $('#review-prod-no').val() + '&rNo=' + $('#review-no').val();
});

//목록
$('#list-btn').click(() => {
  location.href = 'prodView.html?no=' + $('#review-prod-no').val();
})

//글자수 세기
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