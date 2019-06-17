var prodNo = getQuerystring('no');

inputTextValidCheck('productName');

$('#fileupload').fileupload({
  url: '/bitcamp-team-project/app/json/product/update',
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
  previewMaxWidth: 100,   // 미리보기 이미지 너비
  previewMaxHeight: 100,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  processalways: function(e, data) {
    $(e.target).next().text(data.files[0].name + ' 이 선택되었습니다');
    
    if (data.files[0].type.indexOf('image')) {
      swal('파일 선택 오류', '이미지 파일만 가능합니다', 'warning');
      $(e.target).val('');
      $(e.target).next().text("파일 선택 오류: 이미지 파일만 가능합니다");
      $(e.target).removeClass('is-valid');
      $(e.target).addClass('is-invalid');
      $('#update-btn').prop('disabled', true);
      return;
    }
    
    $(e.target).removeClass('is-invalid');
    $(e.target).addClass('is-valid');
    $('#update-btn').prop('disabled', false);
    
    var imagesDiv = $('#images-div');
    imagesDiv.html("");
    for (var i = 0; i < data.files.length; i++) {
      try {
        if (data.files[i].preview.toDataURL) {
          // console.log(data.files[i].preview.toDataURL());
          $("<img>").attr('src', data.files[i].preview.toDataURL())
          .css('width', '100px')
          .appendTo(imagesDiv);
        }
      } catch (err) {
      }
    }
    $('#update-btn').unbind("click");
    $('#update-btn').off().click(function() {
      data.formData = {
          no: prodNo,
          name: $('#productName').val()
      };
      data.submit();
    });
  }, 
  done: function(e, data) {
    if(data.result.status == 'success'){
      location.href = 'newView2.html?no=' + prodNo + '&name=' + $('#productName').val();
    } else { 
      alert("필수 입력값을 입력하지 않았습니다\n" + data.error);
    }
  }
}); // fileupload

$('#cancel-btn').click(function() {
  window.history.back();
}) // click


function inputTextValidCheck(id) {
  $('#' + id).off().keyup(function(e) {
    if($(e.target).val() != '') {
      $(e.target).removeClass('is-invalid');
      $(e.target).addClass('is-valid');
    } else {
      $(e.target).removeClass('is-valid');
      $(e.target).addClass('is-invalid');
    }
  });
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