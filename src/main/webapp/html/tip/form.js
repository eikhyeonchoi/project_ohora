var productNo = location.href.split('?')[1].split('=')[1],
    nickName = sessionStorage.getItem('nickName'),
    productName = '';


$(document).ready(function() {
  $(document.body).bind('loaded.header', function(){
    userNo = sessionStorage.getItem('no');
    
    $.getJSON('../../app/json/tip/productName?no=' 
        + productNo, function(obj) {
          console.log(obj.product);
      $('#h1-title').html(obj.product);
    });
    
    $.getJSON('/bitcamp-team-project/app/json/tip/detail?no=' + productNo
        , function(data) {
      $(".ql-editor").html(data.contents);
    });
    
    $('#add-btn').click(() => {
      $.getJSON('/bitcamp-team-project/app/json/tip/confirm?name=' 
          + $('#h1-title').html()
          , function (data) {
        if (data.status == 'success') {
          if (data.confirm == 'exist') {
            tipfunc(false);
          } else {
            tipfunc(true);
          }
          $(document.body).trigger('historyAdd');
          
        } else {
          swal('예외 발생', '문제가 발생했습니다./n' + data.error, 'warning');
          
        } // if ~ else
      })
    });
  })
}); // ready

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
        imageDrop: true,
    },
    theme: 'snow'  // or 'bubble'
  });
  $('.ql-picker').next().remove();
})();

function tipfunc(state) {
  var src = '';
  if (state) {
    src = 'add';
  } else {
    src = 'update';
  }

  // tip add
  $.post('/bitcamp-team-project/app/json/tip/' + src, {
    name:     $('#h1-title').html(),
    contents: $(".ql-editor").html()
  }, function(data) {
    if(data.status == 'success') {
      location.href = 'view.html?no=' + productNo;
    } else {
      swal('실패!', '팁 생성 실패입니다.\n' + data.message, 'warning');
    }
  }, "json");
  // --tip add
}

$(document.body).bind('historyAdd', function(data) {
  //tiphistory update
  $.post('/bitcamp-team-project/app/json/tiphistory/add', {
    no: productNo,
    contents: $('.ql-editor').html()
  }, function(data) {
    console.log(data.status);
    if (data.status == 'success') {
      swal('저장중','히스토리 저장중입니다.','info');
      location.href = 'view.html?no=' + productNo;
    } else {
      /*location.href = '/bitcamp-team-project/html/auth/login.html';*/
    }
  }, "json") 
  //--tiphistory update
});
