/*
 *  manual
 *  add javascript
 * 
 */
var productNo = getQuerystring('no'),
    productName = '';
    productSrc = $('#product-template').html(),
    basicContentSrc = $('#basic-additional-template').html(),
    componentContentSrc = $('#component-additional-template').html();

var productGenerator = Handlebars.compile(productSrc),
    addContentGenerator = Handlebars.compile(basicContentSrc),
    componentContentGenerator = Handlebars.compile(componentContentSrc);


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
]; // 슬라이드 객체화


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
    navigationPosition: 'right',
    scrollHorizontally: false,
    scrollOverflow: true,
    loopHorizontal: false,
    controlArrows: false,
    anchors: ['firstPage']
  });

  $.fn.fullpage.setAllowScrolling(false);
  
  $(document.body).trigger('loaded-required')
});




$(document.body).bind('loaded-required', function() {
  
  $('.next-page-btn').click(function(e) {
    if($(e.target).closest('.slide').attr('id') == 's1') {
      var length = $('#basic-form input').length;
      for (index = 0; index <= length; index++) {
        if ($("input[name='basicManualFiles']").eq(index).val() == '') {
          swal("파일 입력 오류", "파일이 비어있습니다\n 파일을 입력해주세요(PDF파일은 필수 입니다)", "warning");
          return;
        }
        if ($("textarea[name='basicContents']").eq(index).val() == '') {
          swal("내용 입력오류", "파일추가시, 내용입력을 필수사항 입니다", "warning");
          return;
        }
      }
      // ajaxFileUpload('basic-form');
    }
    
    if($(e.target).closest('.slide').attr('id') == 's2') {
      var length = $('#component-form input').length;
      for (index = 0; index <= length; index++) {
        if ($("input[name='componentManualFiles']").eq(index).val() == '') {
          swal("파일 입력 오류", "파일이 비어있습니다\n필요 없으시면, 왼쪽 x버튼을 눌러 삭제해주세요", "warning");
          return;
        }
        if ($("textarea[name='componentContents']").eq(index).val() == '') {
          swal("내용 입력오류", "파일추가시, 내용입력은 필수사항 입니다", "warning");
          return;
        }
      }
      // ajaxFileUpload('component-form');
    }
    
     fullpage_api.moveSlideRight();
  }); // click
  
  $('.prev-page-btn').click(function() {
    fullpage_api.moveSlideLeft();
  }); // click
}); // bind




$('#basic-add-content').click(function(e) {
  e.preventDefault();
  $(addContentGenerator()).appendTo($('#basic-content-div'));
  fullpage_api.reBuild();
  $(document.body).trigger('loaded-content');
});

$('#component-add-content').click(function(e) {
  e.preventDefault();
  $(componentContentGenerator()).appendTo($('#component-content-div'));
  fullpage_api.reBuild();
  $(document.body).trigger('loaded-content');
});



$(document.body).bind('loaded-content', function() {
  $('.close-contents').off().click(function(e){
    e.preventDefault();
    $(e.target).parents().eq(2).remove();
  });
})







function ajaxFileUpload(formId) {
  var form = $('#' + formId);
  var formdata = false;
  if (window.FormData){
    formdata = new FormData(form[0]);
  }
  formdata.append('productNo', productNo);
  
  var formAction = form.attr('action');
  $.ajax({
    url         : '/bitcamp-team-project/app/json/manual/hyeonTemp',
    data        : formdata ? formdata : form.serialize(),
        cache       : false,
        contentType : false,
        processData : false,
        type        : 'POST',
        success     : function(data, textStatus, jqXHR){
          console.log('전송완료');
        }
  });
}



function settingToImageAndName(value) {
  var target = $(value);
  if(value.files && value.files[0]){
    var fileValue = $(value).val().split("\\");
    var fileName = fileValue[fileValue.length-1];
    
    var strFilePath = target.val();
    var strExt = strFilePath.split('.').pop().toLowerCase();
    if ($.inArray(strExt, ['jpg','jpeg','png']) == -1){
      alert('jpg, jpeg, png 파일만 업로드 가능합니다');
      target.val('');
      return;
    } 
    
    target.prev().text(fileName + ' 이 선택되었습니다');
    
    var reader  = new FileReader();
    reader.onload = function(e) {
      var image = $('<img>').attr('src', e.target.result).css('width', '185px').css('height','140px');
      target.parents().eq(2).prev().html('');
      target.parents().eq(2).prev().append(image)
    }
    reader.readAsDataURL(value.files[0]);
  }
} // loadImg



function CheckuploadFileExt(objFile) {
  var target = $(objFile);
  
  var strFilePath = target.val();
  var strExt = strFilePath.split('.').pop().toLowerCase();
  if ($.inArray(strExt, ["pdf"]) == -1){
    alert('pdf 파일만 업로드 가능합니다');
    target.val('');
    
  } else {
    var fileValue = target.val().split("\\");
    var fileName = fileValue[fileValue.length-1];
    target.prev().text(fileName + ' 이 선택되었습니다');
    target.parents().eq(2).prev().append('<i class="fas fa-file-pdf"></i>')
  }
} // CheckuploadFileExt



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

