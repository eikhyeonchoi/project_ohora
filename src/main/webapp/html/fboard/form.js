
/*
 * fboard
 * add javascript
 * 
 */

var userNo = sessionStorage.getItem('no'),
    boardNo = getQuerystring('no');


$(document.body).ready(function() {
  if(boardNo != 0 || boardNo == null || boardNo == undefined) {
    loadOldData();
    $('#fboard-add-btn').hide();
  } else {
    $('#fboard-update-btn').hide();
  }
  
}); // ready



(function quillEditerInit() {
  window.quill = new Quill('#quillEditor', {
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
})();


$('#fboard-cancel-btn').click(function() {
  location.href = 'index.html';
});

$('#fboard-add-btn').off().click(function() {
  $.post('/bitcamp-team-project/app/json/fboard/add', {
    title: $('#title').val(),
    contents: $(".ql-editor").html()
  }, function(obj) {
    if (obj.status == 'success') {
      location.href = 'index.html';
    } else {
      alert('등록 실패 입니다.\n' +  obj.message);
    }
  }, "json") 
}); // click

$('#fboard-update-btn').off().click(function() {
  $.post('/bitcamp-team-project/app/json/fboard/update', {
    no: boardNo,
    title: $('#title').val(),
    contents: $(".ql-editor").html()
  }, function(obj) {
    if (obj.status == 'success') {
      location.href = 'index.html';
    } else {
      alert('등록 실패 입니다.\n' +  obj.message);
    }
  }, "json") 
}); // click


function loadOldData() {
  $.getJSON('../../app/json/fboard/detail?no=' + boardNo, function(obj) {
    $('#title').val(obj.board.title);
    $(".ql-editor").html(obj.board.contents)
  });
} // loadOldData

function fileCheckById(id){
  if($('#' + id).val() == ''){
    return false;
  } else {
    return true;
  }
} // fileCheckById

function getQuerystring(key, default_){
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} // getQuerystring




