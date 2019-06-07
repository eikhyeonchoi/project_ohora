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

var basicPartsList = [],
    basicContentsList = [];

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
  $('.next-page-btn').click(function() {
    window.basicContentsList = [];
    $('textarea[name="basicContents"]').each(function(index, item) {
      window.basicContentsList.push($(item).val());
    });
    console.log(basicPartsList);
    console.log(basicContentsList);
    
    // fullpage_api.moveSlideRight();
  }); // click
  
  $('.prev-page-btn').click(function() {
    fullpage_api.moveSlideLeft();
  }); // click
  
  var data = encodeURIComponent(JSON.stringify({
    basicManualFiles: basicPartsList,
    contents: basicContentsList
  }));
  
  $('#temp-btn').click(function() {
    $.post('/bitcamp-team-project/app/json/manual/tempAdd', {
      data: data
    }, function(obj) {
    }, "json")
  });
  
  manualFileUpload('pdf-file-input');
  
  
}); // bind

$('#add-content').click(function(e) {
  e.preventDefault();
  $(contentGenerator()).appendTo($('#content-div'));
  fullpage_api.reBuild();
  $(document.body).trigger('loaded-content');
});

$(document.body).bind('loaded-content', function() {
  manualFileUpload('manual-file-input');
})


function manualFileUpload(clazz, obj) {
  $('.' + clazz).fileupload({
    url: '/bitcamp-team-project/app/json/manual/tempAdd',
    dataType: 'json',
    sequentialUploads: true,
    singleFileUploads: false,
    autoUpload: false,
    previewMaxWidth: 172,
    previewMaxHeight: 110, 
    previewCrop: true,
    processalways: function(e, data) {
      console.log(data);
      $(e.target).parents().eq(2).prev().html('');
      if (data.files[0].type == "image/jpeg") {
        var image = $('<img>').attr('src', data.files[0].preview.toDataURL());
        $(e.target).parents().eq(2).prev().append(image)
        console.log('image ++ ');
      }
      if (data.files[0].type == "application/pdf") {
        window.pdfCheck++;
        $(e.target).parents().eq(2).prev().append('<i class="far fa-file-pdf" style="font-size: 8em;"></i>')
        console.log('pdf ++ ');
      }
      
      basicPartsList.push(data);
      
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

