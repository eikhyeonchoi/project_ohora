var tbody = $('tbody'),
addBtn = $('#add-btn'),
dltBtn = $('#delete-btn'),
deleteNo,
qtyNo,
no,
status,
page = $('.page-container');
templateSre = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSre);

var typeSrc = $('#questionType-template').html();
var questionTypeGenerator = Handlebars.compile(typeSrc);
var memberType;

var typeList = function(no, check) {
  $.getJSON('/bitcamp-team-project/app/json/question/typeList?no=' + no + "&check=" + check, function(data) {
    page.pagination({
      dataSource: data,
      locator: 'list',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        tbody.children().remove();
        var pageObj = {list: data};
        $(trGenerator(pageObj)).appendTo(tbody);

        $(document.body).trigger('loaded-list');
      } //callback
    }); //page.pagination
  }) //getJSON

}; //typeList

$(document).ready(function() {
  new WOW().init();

  $.get('/bitcamp-team-project/app/json/auth/user' ,function(data) {
    if(data.status == 'fail') {
      location.href = '/bitcamp-team-project/html/auth/login.html';
    } else {
      memberType = data.user.type;

      $.getJSON('/bitcamp-team-project/app/json/question/list?type=' + memberType, function(data) {
        
        
        if (data.list[0] == null) {
          $('#noDataP').html("등록된 질문이 없습니다.");
        }
        page.pagination({
          dataSource: data,
          locator: 'list',
          showGoInput: true,
          showGoButton: true,
          callback: function(data, pagination) {
            tbody.children().remove();
            var pageObj = {list: data};
            $(trGenerator(pageObj)).appendTo(tbody);

            $(document.body).trigger('loaded-list');
          } //callback
        }); //page.pagination
      }) //getJSON

      $("#answer-ck").change(function(){
        no = $('#question-type option:selected').val();
        if($("#answer-ck").is(":checked")) {
          typeList(no, true);
        } else {
          typeList(no, false);
        }
      });

      $.get('/bitcamp-team-project/app/json/question/questionList', function(data){
        $(questionTypeGenerator(data)).appendTo('#qtype-p');

        $('#question-type').off().change(function() {
          qtyNo = $(this).val()
          if($("#answer-ck").is(":checked")) {
            typeList(qtyNo, true);
          } else {
            typeList(qtyNo, false);
          }
        });
      }) // get

      $(document.body).trigger('loaded-list');

    } // else 
  }); //get(user)

}) //ready

$(document.body).bind('loaded-list', () => {
  
  $('.bit-view-link').click(function (e) {
    location.href = 'view.html?no=' + $(this).attr('data-no');
  });

  if (memberType == 1 || memberType == 2) {
    $('#master-option').hide();
    $('.my-question').hide();
  } else {
    addBtn.hide();
    dltBtn.hide();
    $('.question-ck').hide();
  }

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
              swal({
                title: "삭제 되었습니다",
                icon: "success",
                button: "확인",
              });
              location.reload();
            }
          } else {
            swal({
              title: "오류가 발생했습니다",
              text: "다시 시도해주세요",
              icon: "error",
              button: "확인",
            });
          }
        });
      }); // each
    } else {
      return; // alert창에서 아니오를 누르면 지우지않는다.
    } 
  } else {
    swal({
      title: "삭제할 문의를 선택해주세요",
      icon: "error",
      button: "확인",
    });
  }
}) // delete.click

