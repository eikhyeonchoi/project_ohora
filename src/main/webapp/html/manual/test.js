/*
 *  manual
 *  add javascript
 * 
 */
var productNo = getQuerystring('no'),
productName = '';
productSrc = $('#product-template').html();

var productGenerator = Handlebars.compile(productSrc);

$(document).ready(function() {
  if(productNo == '') {
    $.get('/bitcamp-team-project/app/json/manual/allProductName', function(obj) {
      console.log(obj);
      $(productGenerator(obj)).appendTo($('.modal-body'));
    }); // get

    $('#manual-add-intro').modal(/*{backdrop: 'static', keyboard: false}*/);
    $('#modal-cancel-btn').click(function() {
      location.href = '../../index.html';
    }); // click

    $('#modal-product-add-btn').click(function(){
      location.href = '../product/add.html';
    }); // click

    $('#modal-ok-btn').click(function() {
      productNo = $('#productSelector option:selected').val();
      productName = $('#productSelector option:selected').text();

      if (productNo != 0) {
        $('#manual-add-intro').modal('hide');
      } else {
        swal("제품 선택 오류", "제품을 선택해주세요", "warning");
      }
    }); // click
  }

  $('#fullpage').fullpage({
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling: false,
    navigationPosition: 'right',
    scrollHorizontally: false,
    loopHorizontal: false,
    controlArrows: false,
    anchors: ['firstPage']
  });

  $.fn.fullpage.setAllowScrolling(false);
});


manualFileUpload('manual-file-input-01');


$('.next-page-btn').click(function(){
  fullpage_api.moveTo('firstPage', 1);
});

$('.prev-page-btn').click(function(){
  fullpage_api.moveSlideLeft();
});





function manualFileUpload(id, obj) {
  $('#' + id).fileupload({
    url: '/bitcamp-team-project/app/json/manual/tempAdd', 
    dataType: 'json',
    sequentialUploads: true,
    singleFileUploads: false,
    disableImageResize: /Android(?!.*Chrome)|Opera/
      .test(window.navigator && navigator.userAgent),
    previewMaxWidth: 100,
    previewMaxHeight: 100,
    previewCrop: true,
    processalways: function(e, data) {
      console.log('fileuploadprocessalways()...');
      console.log(data.files);
      for (var i = 0; i < data.files.length; i++) {
        try {
          if (data.files[i].preview.toDataURL) {
            console.log(data.files[i].preview.toDataURL());
            $("<img>").attr('src', data.files[i].preview.toDataURL())
            .css('width', '100px')
            .appendTo($('#image-div'));
          }
        } catch (err) {}
      }
    }, 
    add: function (e, data) {
      $('#manual-add-btn').click(function() {
        /* obj로 받은 값 넣으면 됨
      data.formData = {
          title: $('#title').val(),
          contents: $('#contents').val(),
          memberNo: obj.userNo
      };
         */
        data.submit();
      });
    },
    done: function (e, data) {
      console.log(data);
      if(data.result.status == 'success'){
        alert('success');
      } else { 
        alert("fail");
      }
    }
  }); // fileuplaod
} // manualFileUpload


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




















