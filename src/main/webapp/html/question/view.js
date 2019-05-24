var param = location.href.split('?')[1];
var memberNo,
qNo,
aNo,
memberType;
var questionLabel1 = $('#bit-qes-label1'),
questionLabel3 = $('#bit-qes-label3'),
questionTitle = $('#question-title'),
questionContent = $('#question-content'),
answerLabel1 = $('#bit-ans-label1'),
answerLabel3 = $('#bit-ans-label3'),
answerContent = $('#answer-content'),
fileDiv = $('#images-div'),
ansFileDiv = $('#ans-images-div');

var typeSrc = $('#questionType-template').html();
var questionTypeGenerator = Handlebars.compile(typeSrc);

$(document).ready(function() {
  $('#fileAdd-btn').hide();

  $.get('/bitcamp-team-project/app/json/auth/user' ,function(data) {
    memberType = data.user.type;
    memberNo = data.user.no;

    if (param) {
      $('#file-add-div').hide();
      $("#qtype-p").hide();
      $('.user-qes').attr("readonly",true);

      if (memberType == 1 || memberType == 2) {
        $('h3').html("1:1 문의내역 조회");
        $('#answer-content').attr("readonly",true);
        $('#ans-file-add-div').hide();
        $('.user-add-Btn').hide();

      } else {
        $('h3').html("1:1 문의 답변하기");
        $('#answer-content').val("");
      }

      loadData(param.split('=')[1])

    } else {
      $('h3').html("문의 하기");
      $('#img-div').hide();
      $('#answer-div').hide();

      $.get('/bitcamp-team-project/app/json/question/questionList', function(data){
        $(questionTypeGenerator(data)).appendTo('#qtype-p');
      }) // get
    } // else 
  }); //get 


}) // ready

$(document).bind('load-file', function() {
  $.getJSON('/bitcamp-team-project/app/json/question/files?no=' + param.split('=')[1], 
      function(data) {
    if (data.status == 'success') {
      if (data.files.questionFiles[0].filePath != null) {
        for (var i = 0; i < data.files.questionFiles.length; i++) {
          $('<img>').attr('src', '/bitcamp-team-project/upload/questionfile/' + data.files.questionFiles[i].filePath).appendTo(fileDiv);
        }
      } else {
        $('#img-div').hide();
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });
}) //load-file

$(document).bind('load-ans-file', function() {
  $.getJSON('/bitcamp-team-project/app/json/answer/files?no=' + aNo, 
      function(data) {
    if (data.status == 'success') {
      if (data.files.answerFiles[0].filePath != null) {
        for (var i = 0; i < data.files.answerFiles.length; i++) {
          $('<img>').attr('src', '/bitcamp-team-project/upload/answerfile/' + data.files.answerFiles[i].filePath).appendTo(ansFileDiv);
        }
      } else {
        $('#ans-img-div').hide();
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });
}) //load-file

function loadData(no) {
  $.getJSON('../../app/json/question/detail?no=' + no, function(data) {
    questionLabel1.html('작성자: ' + data.member.nickName),
    questionLabel3.html('작성일: ' + data.createdDate),
    questionTitle.val(data.title),
    questionContent.val(data.contents)
    qNo = data.no
    if (data.answer == null) {
      if (memberType != 3) {
        answerContent.val('등록된 답변이 없습니다.')
      }
      answerLabel3.html('');
      $('#ans-file-pp').hide();

    } else {
      answerContent.val(data.answer.content),
      answerLabel3.html('답변일: ' + data.answer.createdDate)
      console.log(data.answer.no)
      aNo = data.answer.no
      $(document).trigger('load-ans-file');
    }
    $(document).trigger('load-file');

  });
} // loadData()

$('#fileupload').fileupload({ // 질문 파일등록
  url: '/bitcamp-team-project/app/json/question/add', // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기 (add 한번만 호출)..
  add: function (e, data) { // 파일을 모두 업로드한후 호출.
    $('#fileAdd-btn').show();
    $('#add-btn').hide();
    $('#fileAdd-btn').click(function() {
      alert('질문파일등록')
      data.formData = {
        questionNo: $('#question-type option:selected').val(),
        memberNo: memberNo,
        title: $('#question-title').val(),
        contents: $('#question-content').val()
      };
      data.submit(); // submit()을 호출하면, 서버에 데이터를 보내기 전에 submit 이벤트가 발생한다.
    });
  },
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    if(data.result.status == 'success'){
      location.href='index.html';
    } else { 
      alert("필수 입력값을 입력하지 않았습니다\n" + data.result.error);
    }
  }
}) // fileupload

$('#add-btn').click(function() {
  if (memberType != 3) {
    $.post('/bitcamp-team-project/app/json/question/add',{
      questionNo: $('#question-type option:selected').val(),
      memberNo: memberNo,
      title: $('#question-title').val(),
      contents: $('#question-content').val()
    },function(data) {
      if(data.status == 'success'){
        location.href='index.html';
      } else { 
        alert("필수 입력값을 입력하지 않았습니다\n" + data.error);
      }
    }, "json")
  } else {
    $.post('/bitcamp-team-project/app/json/answer/add',{
      questionNo: qNo,
      content: $('#answer-content').val()
    },function(data) {
      if(data.status == 'success') {
        location.href='index.html';
      } else {
        alert("필수 입력값을 입력하지 않았습니다\n" + data.error);
      }
    }, "json") 
  } // else(답변 등록)
}) // click

$('#ans-fileupload').fileupload({ // 답변 파일등록
  url: '/bitcamp-team-project/app/json/answer/add', // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기 (add 한번만 호출)..
  add: function (e, data) { // 파일을 모두 업로드한후 호출.
    $('#fileAdd-btn').show();
    $('#add-btn').hide();
    $('#fileAdd-btn').click(function() {
      alert('답변 파일등록')
      data.formData = {
        questionNo: qNo,
        content: $('#answer-content').val()
      };
      data.submit(); // submit()을 호출하면, 서버에 데이터를 보내기 전에 submit 이벤트가 발생한다.
    });
  },
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    if(data.result.status == 'success'){
      location.href='index.html';
    } else { 
      alert("필수 입력값을 입력하지 않았습니다\n" + data.result.error);
    }
  }
}) // fileupload





