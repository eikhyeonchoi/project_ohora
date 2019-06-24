var smallSrc = $('#small-category-template').html(),
    manuSrc = $('#manufacturor-template').html(),
    div = $('#selectDiv');

var smallCategoryGenerator = Handlebars.compile(smallSrc),
    manufacturerGenerator = Handlebars.compile(manuSrc);

$(document).ready(function() {
  
  inputTextValidCheck('productName');
  
  
  $('#product-cancel-btn').click(function() {
    location.href = 'index.html';
  }) // click
  
  $.get('/bitcamp-team-project/app/json/product/manuList', 
      function(obj){
    console.log(obj);
    $(manufacturerGenerator(obj)).appendTo(div);
    $(div).append('<br>');
  }) // get

  $.get('/bitcamp-team-project/app/json/product/ctgList', 
      function(obj){
    console.log(obj);
    $(smallCategoryGenerator(obj)).appendTo(div);
    $(document.body).trigger('loaded-select');
  }) // get
}) // ready

$(document.body).bind('loaded-select', function() {
  
  $('#fileupload').fileupload({
    url: '/bitcamp-team-project/app/json/product/add',
    dataType: 'json',
    sequentialUploads: true,
    singleFileUploads: false,
    autoUpload: false,
    disableImageResize: /Android(?!.*Chrome)|Opera/
      .test(window.navigator && navigator.userAgent),
    previewMaxWidth: 155,
    previewMaxHeight: 198.5, 
    previewCrop: true,
    processalways: function (e, data) {
      console.log(data.files);
      
      $('#product-thumnail-div').html('');
      $('#product-name-label').text('');
      $('#fileupload').removeClass('is-invalid');
      $('#fileupload').addClass('is-valid');
      
      try {
        $('<img>').attr('src', data.files[0].preview.toDataURL()).appendTo($('#product-thumnail-div'));
        $('#product-name-label').text(data.files[0].name + '이 선택되었습니다');
      } catch(err){}
      
      $('#product-add-btn').prop('disabled', false);
      $('#product-add-btn').off().click(function() {
        if($('#productName').val() == '' ||
            $('#smallCtgSelect option:selected').val() == 0 ||
            $('#manufacturerSelect option:selected').val() == 0) {
          swal("필수 입력값 오류", "모든 항목은 필수 입력입니다\n 입력해주세요", "warning");
          return;
        }
        
        data.formData = {
            name: $('#productName').val(),
            smallCategoryNo: $('#smallCtgSelect option:selected').val(),
            manufacturerNo: $('#manufacturerSelect option:selected').val(),
        };
        data.submit();
      });
    }, // processalways
    done: function(e, data) {
      if(data.result.status == 'success'){
        location.href='index.html';
      } else { 
        alert("필수 입력값을 입력하지 않았습니다\n" + data.error);
      }
    } // done
    
  }); // fileupload
}); // bind

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

function selectValidCheck(target) {
  if($(target).val() != 0) {
    $(target).removeClass('is-invalid');
    $(target).addClass('is-valid');
  } else {
    $(target).removeClass('is-valid');
    $(target).addClass('is-invalid');
  }
} // selectValidCheck













