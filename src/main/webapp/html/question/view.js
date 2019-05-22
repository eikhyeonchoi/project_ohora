var param = location.href.split('?')[1];
var questionLabel1 = $('#bit-qes-label1'),
questionLabel3 = $('#bit-qes-label3'),
questionTitle = $('#question-title'),
questionContent = $('#question-content'),
answerLabel1 = $('#bit-ans-label1'),
answerLabel3 = $('#bit-ans-label3'),
answerContent = $('#answer-content');


if (param) {
  $('h3').html("1:1 문의내역 조회");
  loadData(param.split('=')[1])
} else {
  $('h3').html("문의 하기");
}

function loadData(no) {

  $.getJSON('../../app/json/question/detail?no=' + no, function(data) {
    console.log(data)
    questionLabel1.html('작성자: ' + data.member.nickName),
    questionLabel3.html('작성일: ' + data.createdDate),
    questionTitle.val(data.title),
    questionContent.val(data.contents)
    if (data.answer == null) {
      answerContent.val('등록된 답변이 없습니다.'),
      answerLabel3.html('')
    } else {
      answerContent.val(data.answer.content),
      answerLabel3.html('답변일: ' + data.answer.createdDate)
    }
  });

}