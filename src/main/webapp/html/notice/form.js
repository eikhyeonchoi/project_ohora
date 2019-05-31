var h1 = $('h1'),
el1 = $('.bit-new-item'),
el2 = $('.bit-view-item');

var param = location.href.split('?')[1];
if (param) {
  h1.html("공지사항 수정"); 
  loadData(param.split('=')[1])
  for (e of el1) {
    e.style.display = 'none';
  }
} else {
  h1.html("새로운 공지사항")
  for (e of el2) {
    e.style.display = 'none';
  }
}

//Initialize QuillEditer 
(function quillEditerInit() {
  var quill = new Quill('#quillEditor', {
    modules: {
      toolbar: [
        ['image', 'code-block'],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
        ],
        imageUpload: {
            url: '../../app/json/notice/upload', // server url. If the url is empty then the base64 returns
            dataType: 'json',
            method: 'POST', // change query method, default 'POST'
            name: 'image', // custom form name
            withCredentials: false, // withCredentials
            headers: {}, // add custom headers, example { token: 'your-token'}
            // personalize successful callback and call next function to insert new url to the editor
            callbackOK: (serverResponse, next) => {
                next(serverResponse);
            },
            // personalize failed callback
            callbackKO: serverError => {
                alert(serverError);
            }
        }
    },
    placeholder: '내용을 입력해주세요.',
    theme: 'snow'  // or 'bubble'
  });
  $('.ql-picker').next().remove();
})();


/*
$(document).ready(function() {
  $.getJSON('/bitcamp-team-project/app/json/notice/files?no=' + param.split('=')[1], 
      function(data) {
    console.log(data.files.noticeFile)
    if (data.status == 'success') {
      if (typeof data.files.noticeFile != "undefind") {
        for (var i = 0; i < data.files.noticeFile.length; i++) {
          $('<img>').attr('src', '/bitcamp-team-project/upload/notice/' + data.files.noticeFile[i].filePath).appendTo($('#images-div'));
        }
      } else {
        $('#img-div').hide();
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });
}); //load-file

$('#fileupload').fileupload({
  url: '../../app/json/notice/add',
  dataType: 'json',         
  sequentialUploads: true,  
  singleFileUploads: false, 
  previewMaxWidth: 100,   // 미리보기 이미지 너비
  previewMaxHeight: 100,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  add: function (e, data) { 
    $('#add-btn').off().click(function() {
      data.formData = {
        title: $('#title').val(), 
        contents: $('#contents').val()
      };
      data.submit(); 
    });
    $('#update-btn').off().click(function() {
      data.formData = {
        no: $('#no').val(),
        title: $('#title').val(), 
        contents: $('#contents').val()
      };
      data.submit(); 
    });
  },
  done: function (e, data) { 
    console.log(data.result.message)
    if(data.result.status == 'success'){
      location.href='index.html';
    } else { 
      alert("필수 입력값을 입력하지 않았습니다\n" + data.result.error);
    }
  }
}) // fileupload
 */

$('#add-btn').off().click(() => {
  $.post( '../../app/json/notice/add',{
    title: $('#title').val(), 
    contents: $(".ql-editor").html()
  }, function(data) {
    if(data.status == 'fail'){
      alert('등록 실패입니다!\n' + data.message);
    } else {
      location.href = "index.html";
    }
  })
});

$('#update-btn').off().click(() => {
  $.post('../../app/json/notice/update', {
    no: $('#no').val(),
    title: $('#title').val(), 
    contents: $(".ql-editor").html()
  }, function() {

  })
  .done(function() {
    location.href = "index.html";
  })
  .fail(function() {
    alert('등록 실패입니다!\n' + data.message)
  })
});

function loadData(no) {

  $.getJSON('../../app/json/notice/detail?no=' + no, function(data) {
    $('#no').val(data.no),
    $('#title').val(data.title),
    $(".ql-editor").html(data.contents)
  });
  $(document).trigger('load-file');
}

