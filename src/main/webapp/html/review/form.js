var productNo = getQuerystring('no'),
    userNo;

var h1 = $('h1'),
el1 = $('.bit-new-item'),
el2 = $('.bit-view-item');
var param = location.href.split('?')[1];
if (param) {
  $('h1').html("리뷰 쓰기"); 
  loadData(param.split('=')[1]);
  for (e of el1) {
    e.style.display = 'none';
  }
} else {
  $('h1').html("리뷰 수정")
  for (e of el2) {
    e.style.display = 'none';
  }
}

$(document).ready(function() {
  $(document.body).bind('loaded.header', function(){
    userNo = sessionStorage.getItem('no');
    $(document.body).trigger('loaded-user');
  })
}); // ready

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
            url: '', // server url. If the url is empty then the base64 returns
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

$(document.body).bind('loaded-user', function(obj){
  $('#add-btn').click(function() {
    $.post('/bitcamp-team-project/app/json/review/add', {
      memberNo: userNo,
      productNo: productNo,
      title: $('#review-title').val(),
      contents: $('#review-contents').val()
    },
    function(data) {
      if (data.status == 'success') {
        window.history.back();
      } else {
        alert('등록 실패 입니다.\n' +  data.message);
      }
    }, "json")
  }); // add click

}) // bind

//목록
$('#list-btn').click(() => {
  location.href = document.referrer;
})


//글자수 세기
$(function(){
  $('input.form-control-plaintext').keyup(function(){
    bytesHandler(this);
  });
});

function getTextLength(str) {
  var len = 0;
  for (var i of str) {
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

function loadData(no) {

  $.getJSON('../../app/json/review/detail?no=' + no, function(data) {
    $('#no').val(data.no),
    $('#title').val(data.title),
    $(".ql-editor").html(data.contents)
  });
  $(document).trigger('load-file');
}
