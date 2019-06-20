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
        ['clean'],                                         // remove formatting button
        ], 
        imageResize: {
          modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        },
        imageDrop: true
    },
    placeholder: '내용을 입력해주세요.',
    theme: 'snow',
  });
  $('.ql-picker').next().remove();
})();



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

