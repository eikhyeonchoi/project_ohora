var tbody = $('tbody'),
addBtn = $('#add-btn'),
dltBtn = $('#delete-btn'),
deleteNo,
status;
templateSre = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSre);

var memberType;

$(document).ready(function() {

  $.get('/bitcamp-team-project/app/json/auth/user' ,function(data) {
    if(data.status == 'fail') {
      location.href = '/bitcamp-team-project/html/auth/login.html';
    } else {
      memberType = data.user.type;

      $.getJSON('/bitcamp-team-project/app/json/question/list?no=' + memberType, function(data) {
        if (data.list[0] == null) {
          $('#noDataP').html("등록된 질문이 없습니다.");
        }
        $(trGenerator(data)).appendTo(tbody);

        $(document.body).trigger('loaded-list');
      }) //getJSON

    } // else 
  }); //get(user)

}) //ready

$(document.body).bind('loaded-list', () => {

  if (memberType == 1 || memberType == 2) {
    $('#my-question-title').html('나의 문의내역');
    $('.my-question').hide();
  } else {
    addBtn.hide();
    dltBtn.hide();
    $('.question-ck').hide();
  }

  $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });

});

addBtn.click(function() {
  location.href = 'view.html';
});

$('#delete-btn').click(function() {
  if ($("input:checkbox[name='delete-Ck']").is(":checked")) {
    if (confirm("선택하신 1:1문의를 삭제하시겠 습니까?")) {
      var cnt = $("input[name=delete-Ck]:checked").length;
      $("input[name=delete-Ck]:checked").each(function(index) {
        deleteNo = $(this).attr('data-no');
        status = $(this).attr('data-status')
        $.ajax({
          url:"/bitcamp-team-project/app/json/question/delete?no=" + deleteNo + "&status=" + status,
          type: "GET",
          async: false,
          dataType: "json"
        }).done(function(data) {
          if (data.status == 'success') {
            if ((parseInt(cnt) - 1) == parseInt(index)){
              alert('삭제 되었습니다.');
              location.reload();
            }
          } else {
            alert('삭제 실패했습니다!\n' + data.error);
          }
        });
      }); // each
    } else {
      return; // alert창에서 아니오를 누르면 지우지않는다.
    } 
  } else {
    alert('삭제할 문의를 선택해주세요.')
  }
}) // delete.click


