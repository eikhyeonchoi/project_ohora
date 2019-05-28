var tbody = $('tbody'),
addBtn = $('#add-btn'),
dltBtn = $('#delete-btn'),
deleteNo,
qtyNo,
no,
status;
templateSre = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSre);

var typeSrc = $('#questionType-template').html();
var questionTypeGenerator = Handlebars.compile(typeSrc);
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

        $("#answer-ck").change(function(){
          no = $('#question-type option:selected').val();
          if($("#answer-ck").is(":checked")) {
            $.getJSON('/bitcamp-team-project/app/json/question/typeList?no=' + no + "&check=true", function(data) {
              $('tbody').html("");
              $(trGenerator(data)).appendTo(tbody);

              $(document.body).trigger('loaded-list');
            })
          } else {
            $.getJSON('/bitcamp-team-project/app/json/question/typeList?no=' + no + "&check=false", function(data) {
              $('tbody').html("");
              $(trGenerator(data)).appendTo(tbody);

              $(document.body).trigger('loaded-list');
            })
          }
        });

        $.get('/bitcamp-team-project/app/json/question/questionList', function(data){
          $(questionTypeGenerator(data)).appendTo('#qtype-p');

          $('#question-type').off().change(function() {
            qtyNo = $(this).val()
            if($("#answer-ck").is(":checked")) {
              $.getJSON('/bitcamp-team-project/app/json/question/typeList?no=' + qtyNo + "&check=true", function(data) {
                $('tbody').html("");
                $(trGenerator(data)).appendTo(tbody);

                $(document.body).trigger('loaded-list');
              })
            } else {
              $.getJSON('/bitcamp-team-project/app/json/question/typeList?no=' + qtyNo + "&check=false", function(data) {
                $('tbody').html("");
                $(trGenerator(data)).appendTo(tbody);

                $(document.body).trigger('loaded-list');
              })
            }
          });
        }) // get

        $(document.body).trigger('loaded-list');
      }) //getJSON

    } // else 
  }); //get(user)

}) //ready

$(document.body).bind('loaded-list', () => {


  if (memberType == 1 || memberType == 2) {
    $('#master-option').hide();
    $('#my-question-title').html('나의 문의내역');
    $('.my-question').hide();
  } else {
    addBtn.hide();
    dltBtn.hide();
    $('.question-ck').hide();
  }

  $('.bit-view-link').off().click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });

}); //bind(loaded-list)

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


