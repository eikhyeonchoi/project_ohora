/*
 *  manual
 *  add javascript
 * 
 */
var productNo = getQuerystring('no'),
    productName = decodeURIComponent(getQuerystring('name')),
    productSrc = $('#product-template').html(),
    basicContentSrc = $('#basic-additional-template').html(),
    componentContentSrc = $('#component-additional-template').html(),
    cautionContentSrc = $('#caution-additional-template').html(),
    videoContentSrc = $('#video-additional-template').html();

var productGenerator = Handlebars.compile(productSrc),
    addContentGenerator = Handlebars.compile(basicContentSrc),
    componentContentGenerator = Handlebars.compile(componentContentSrc),
    cautionContentGenerator = Handlebars.compile(cautionContentSrc),
    videoContentGenerator = Handlebars.compile(videoContentSrc);


var slide = [
  {
    id: $('#s1')
  },
  {
    id: $('#s2')
  },
  {
    id: $('#s3')
  },
  {
    id: $('#s4')
  }
]; // 슬라이드 객체화


$(document).ready(function() {
  if(productNo == '' || productName == '') {
    $.get('/bitcamp-team-project/app/json/manual/allProductName', function(obj) {
      console.log(obj);
      $(productGenerator(obj)).appendTo($('.modal-body'));
    }); // get

    //{backdrop: 'static', keyboard: false}
    $('#manual-add-intro').modal();
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
    anchors: ['firstPage'],
    onSlideLeave: function( section, origin, destination, direction){
      var leavingSlide = this;
      
      if(section.index == 0 && origin.index == 0 && direction == 'right'){
        swal({
          title: "추가 사항 입력",
          text: "구성품, 주의사항, 동영상 링크 등 추가사항을 입력하시겠습니까?",
          icon: "info",
          buttons: {
            no: {
              text: '아니오',
              value: 'no'
            },
            yes: {
              text: '등록',
              value: 'yes'
            }
          },
        })
        .then((value) => {
          switch(value){
            case 'yes': 
              swal("구성품 파일 업로드", "구성품의 대한 이미지, 설명을 업로드하는 페이지 입니다", "info");
              break;
              
            case  'no':
              fullpage_api.moveSlideLeft();
              $('.next-page-btn').replaceWith($('#add-btn'));
              break;
            
            default:
              fullpage_api.moveSlideLeft();
              $('.next-page-btn').replaceWith($('#add-btn'));
              break;
          }
        });
      }

      if(section.index == 0 && origin.index == 1 && direction == 'right'){
        swal("주의사항 이미지 업로드", "주의사항 대한 이미지, 설명을 업로드하는 페이지 입니다", "info");
      }
      
      if(section.index == 0 && origin.index == 2 && direction == 'right'){
        swal("동영상 링크 업로드", "동영상 링크, 설명을 업로드하는 페이지 입니다", "info");
      }
    }
  });

  $.fn.fullpage.setAllowScrolling(false);
  
  $(document.body).trigger('loaded-required')
});




$(document.body).bind('loaded-required', function() {
  
  $('.next-page-btn').click(function(e) {
    if($(e.target).closest('.slide').attr('id') == 's1') {
      var length = $('#basic-content-div input').length;
      for (index = 0; index <= length; index++) {
        if ($("input[name='basicManualFiles']").eq(index).val() == '') {
          swal("파일 입력 오류", "파일이 비어있습니다\n 파일을 입력해주세요(PDF파일은 필수 입니다)", "warning");
          return;
        }
        if ($("textarea[name='basicContents']").eq(index).val() == '') {
          swal("내용 입력오류", "파일추가시, 내용입력은 필수사항 입니다", "warning");
          return;
        }
      }
    }
    
    if($(e.target).closest('.slide').attr('id') == 's2') {
      var length = $('#component-content-div input').length;
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
    
    if($(e.target).closest('.slide').attr('id') == 's3') {
      var length = $('#caution-content-div input').length;
      for (index = 0; index <= length; index++) {
        if ($("input[name='cautionManualFiles']").eq(index).val() == '') {
          swal("파일 입력 오류", "파일이 비어있습니다\n필요 없으시면, 왼쪽 x버튼을 눌러 삭제해주세요", "warning");
          return;
        }
        if ($("textarea[name='cautionContents']").eq(index).val() == '') {
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


textareaValidCheck('contents');


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

$('#caution-add-content').click(function(e) {
  e.preventDefault();
  $(cautionContentGenerator()).appendTo($('#caution-content-div'));
  fullpage_api.reBuild();
  $(document.body).trigger('loaded-content');
});

$('#video-add-content').click(function(e) {
  e.preventDefault();
  $(videoContentGenerator()).appendTo($('#video-content-div'));
  fullpage_api.reBuild();
  $(document.body).trigger('loaded-content');
});


$(document.body).bind('loaded-content', function() {
  textareaValidCheck('contents');
  inputTextValidCheck('video-input-text');
  
  $('.fa-times-circle').off().click(function(e){
    $(e.target).parents().eq(1).remove();
  });
})



$('#add-btn').click(function(e) {
  if ($(e.target).closest('.slide').attr('id') == 's1') {
    confirmBeforeRegistration();
  } else {
    var length = $('#video-content-div input').length;
    for (index = 0; index <= length; index++) {
      if ($("input[name='videoLinks']").eq(index).val() == '') {
        swal("동영상 링크 입력 오류", "동영상 링크 목록이 비었습니다\n 필요 없으신 경우, 왼쪽 x버튼을 눌러주세요", "warning");
        return;
      }
      if ($("textarea[name='videoContents']").eq(index).val() == '') {
        swal("내용 입력오류", "비디오 링크 추가시, 설명은 필수입니다", "warning");
        return;
      }
      if($("input[name='videoLinks']").eq(index).val() != '' && $("textarea[name='videoContents']").eq(index).val() != '') {
        confirmBeforeRegistration();
      }
    }
  }
});


function confirmBeforeRegistration() {
  swal({
    title: "게시물 등록확인",
    text: "등록하시겠습니까??",
    icon: "info",
    buttons: true
  })
  .then((value) => {
    if (value) {
      ajaxFileUpload('total-form');
      location.href = 'index.html';
      
    } else {
      swal("등록 취소", "취소되었습니다", "error");
      
    }
  });
}


function inputTextValidCheck(clazz) {
  $('.' + clazz).off().keyup(function(e) {
    if($(e.target).val() != '') {
      $(e.target).removeClass('is-invalid');
      $(e.target).addClass('is-valid');
    } else {
      $(e.target).removeClass('is-valid');
      $(e.target).addClass('is-invalid');
    }
  });
}

function textareaValidCheck(clazz) {
  $('.' + clazz).off().keyup(function(e) {
    if($(e.target).val() != '') {
      $(e.target).removeClass('is-invalid');
      $(e.target).addClass('is-valid');
    } else {
      $(e.target).removeClass('is-valid');
      $(e.target).addClass('is-invalid');
    }
  });
} // textareaValidCheck



function ajaxFileUpload(formId) {
  var form = $('#' + formId);
  var formdata = false;
  if (window.FormData){
    formdata = new FormData(form[0]);
  }
  formdata.append('productNo', productNo);
  formdata.append('productName', productName);
  
  var formAction = form.attr('action');
  $.ajax({
    url         : '/bitcamp-team-project/app/json/manual/add',
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
      swal("파일 선택오류", "이미지파일(JPG, JPEG, PNG) 파일만 선택가능합니다", "warning");
      target.val('');
      return;
    } 
    
    target.removeClass('is-invalid');
    target.addClass('is-valid');
    target.next().text(fileName + ' 이 선택되었습니다');
    
    var reader  = new FileReader();
    reader.onload = function(e) {
      var image = $('<img>').attr('src', e.target.result).css('width', '185px').css('height','140px');
      target.parents().eq(2).prev().html('');
      target.parents().eq(2).prev().append(image)
    }
    reader.readAsDataURL(value.files[0]);
  }
} // loadImg



function checkuploadFileExt(objFile) {
  var target = $(objFile);
  
  var strFilePath = target.val();
  var strExt = strFilePath.split('.').pop().toLowerCase();
  if ($.inArray(strExt, ["pdf"]) == -1){
    swal("파일 선택오류", "PDF 파일만 선택가능합니다", "warning");
    target.val('');
    
  } else {
    var fileValue = target.val().split("\\");
    var fileName = fileValue[fileValue.length-1];
    target.removeClass('is-invalid');
    target.addClass('is-valid');
    target.next().text(fileName + ' 이 선택되었습니다');
    target.parents().eq(2).prev().html('');
    target.parents().eq(2).prev().append('<i class="fas fa-file-pdf"></i>')
  }
} // checkuploadFileExt



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
