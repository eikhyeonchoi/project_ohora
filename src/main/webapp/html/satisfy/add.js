var select = $('#faq-question-category-option'),
templateSrc = $('#select-template').html();
var trGenerator = Handlebars.compile(templateSrc);

var param = location.href.split('?')[1]; // no=10

//파라미터가 있을 경우 detail, update, delete
if(param){ 
  $('.faq-add-item').hide();
  
  // 카테고리목록을 받아오기 위한 쿼리문 ==> handlebars에서 사용함
  ($.getJSON('/bitcamp-team-project/app/json/faq/list', (obj) => {
    $(trGenerator(obj)).appendTo(select);
    $(document.body).trigger('loaded-updateForm');
  }));

  // console.log(param);
  $.getJSON('/bitcamp-team-project/app/json/faq/detail?no=' + param.split('=')[1], function(obj) { // 10
    console.log(obj);
    $('#faq-no').val(obj.faq.no);
    $('#faq-title').val(obj.faq.title);
    $('#faq-contents').val(obj.faq.contents);
  });

//파라미터가 없을 경우 add form으로 사용한다
} else {
  $('.faq-view-item').hide();
  $('h1').html('자주묻는 질문 - add');
  
  // 카테고리목록을 받아오기 위한 쿼리문 ==> handlebars에서 사용함
  ($.getJSON('/bitcamp-team-project/app/json/faq/list', (obj) => {
    // console.log(obj);
    $(trGenerator(obj)).appendTo(select);
    $(document.body).trigger('loaded-addForm');
  }));
}

// 데이터가 로드되고 난 후 add버튼에 리스너추가
$(document.body).bind('loaded-addForm', () => {
  $('#faq-add-btn').click(() =>{
    // console.log($('#faqCtg-no option:selected').val());
    $.post('/bitcamp-team-project/app/json/faq/add',{
      title: $('#faq-title').val(),
      contents: $('#faq-contents').val(),
      qcNo: $('#faqCtg-no option:selected').val()
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if(data.status == 'success'){
      location.href='index.html';
    } else alert("필수 입력값을 입력하지 않았습니다");
    }) // post
  }); // click
}) // bind



$(document.body).bind('loaded-updateForm', () => {
  // update
  $('#faq-update-btn').click(() =>{
    $.post('/bitcamp-team-project/app/json/faq/update', {
      no: param.split('=')[1],
      title: $('#faq-title').val(),
      contents: $('#faq-contents').val(),
      qcNo: $('#faqCtg-no option:selected').val()
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
      console.log(data);
      if(data.status == 'success'){
        location.href='index.html';
      } else alert("수정 실패\n" + data.message);
    }) // post
  }); // click
  
  // delete
  $('#faq-delete-btn').click(() => {
    $.get('/bitcamp-team-project/app/json/faq/delete?no=' + param.split('=')[1], function(obj){
      console.log(obj);
      if(obj.status == 'success'){
        location.href='index.html';
      } else alert('삭제 실패\n' +  obj.message) 
    }) // get
  }); // click
  
  
}) // bind













