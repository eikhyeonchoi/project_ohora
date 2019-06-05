/*
 *  manual
 *  add javascript
 * 
 */
var productNo = getQuerystring('no'),
    productName = '';
    productSrc = $('#product-template').html(),
    addContentSrc = $('#additional-template').html();
    

var productGenerator = Handlebars.compile(productSrc),
    contentGenerator = Handlebars.compile(addContentSrc);

var checkList = [];

var fileCountCheck = 0,
    pdfCheck = 0;

var slide = [
  {
    id: $('#s1')
  },
  {
    id: $('#s2')
  },
  {
    id: $('#s3')
  }
]; 



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
    scrollOverflow: true,
    loopHorizontal: false,
    controlArrows: false,
    anchors: ['firstPage']
  });

  $.fn.fullpage.setAllowScrolling(false);
});


$('#add-content').click(function(e) {
  e.preventDefault();
  $(contentGenerator()).appendTo($('#content-div'));
  fullpage_api.reBuild();
});


manualFileUpload('manual-file-input-01');



$('.next-page-btn').click(function() {
  fullpage_api.moveSlideRight();
}); // click

$('.prev-page-btn').click(function() {
  fullpage_api.moveSlideLeft();
}); // click




function manualFileUpload(id, obj) {
  $('#' + id).fileupload({
    url: '/bitcamp-team-project/app/json/manual/tempAdd',
    dataType: 'json',
    sequentialUploads: true,
    singleFileUploads: false,
    autoUpload: false,
    previewMaxWidth: 200,
    previewMaxHeight: 111, 
    previewCrop: true,
    processalways: function(e, data) {
      window.fileCount++;
      for (var i = 0; i < data.files.length; i++) {
        checkList.push(data.files[i].type);
        try {
          if (data.files[i].type.includes('pdf')) {
            window.pdfCheck++;
            $("<img>").attr('src', '/bitcamp-team-project/upload/manualfile/pdf.jpg').css('width', '192px').css('height', '111px').appendTo($('.img-div'));
          }
          if (data.files[i].preview.toDataURL) {
            // console.log(data.files[i].preview.toDataURL());
            $("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '192px').css('height', '111px').appendTo($('.img-div'));
          }
        } catch (err) {
        }
      }
      $('#manual-add-btn').unbind("click");
      $('#manual-add-btn').click(function() {
          data.submit();
      });
    }, 
    done: function (e, data) {
      console.log(data);
    }
  });
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




















