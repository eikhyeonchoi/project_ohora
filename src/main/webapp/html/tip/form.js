var productNo = location.href.split('?')[1].split('=')[1],
    nickName = sessionStorage.getItem('nickName');

$.getJSON('../../app/json/tip/productName?no=' 
    + productNo, function(obj) {
  $('#productName').attr('value', obj.product);
});

$('#add-btn').click(() => {
  $.post('/bitcamp-team-project/app/json/tip/add', {
    name:     $('#productName').val(),
    contents: $('#contents').val()
  }, function(data) {
    if(data.status == 'success') {
      history.back();
    } else {
      swal('실패!', '팁 생성 실패입니다.\n' + data.message, 'warning');
    }
  }, "json")
});

//목록
$('#list-btn').click((e) => {
  e.preventDefault();
  location.href = 'view.html?no=' + productNo;
});

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
    theme: 'snow'  // or 'bubble'
  });
  $('.ql-picker').next().remove();
})();