/**
 * 
 */


$('.basic-manual-input').change(function(e) {
  var fileValue = $(e.target).val().split("\\");
  var fileName = fileValue[fileValue.length-1];
  console.log(fileName);
  if (fileName.includes('pdf')){
    $(e.target).prev().text(fileName + ' 이 선택되었습니다');
  }
});


$('#btn').on('click', function() {
  var form = $('#basic-form');
  var formdata = false;
  if (window.FormData){
    formdata = new FormData(form[0]);
  }

  var formAction = form.attr('action');
  $.ajax({
    url         : '/bitcamp-team-project/app/json/manual/hyeonTemp',
    data        : formdata ? formdata : form.serialize(),
        cache       : false,
        contentType : false,
        processData : false,
        type        : 'POST',
        success     : function(data, textStatus, jqXHR){
          console.log(formdata);
          console.log(form.serialize());
          console.log('전송완료');
        }
  });
});

function loadImg(value) {
  if(value.files && value.files[0]){
    console.log('true');
    var reader  = new FileReader();
    reader.onload = function(e) {
      var image = $('<img>').attr('src', e.target.result).css('width', '240px').css('height','140px');
      $(value).parents().eq(2).prev().html('');
      $(value).parents().eq(2).prev().append(image)
    }
    reader.readAsDataURL(value.files[0]);
  }
}


function CheckuploadFileExt(objFile) {
  var strFilePath = objFile.value;

  var RegExtFilter = /\.(pdf)$/i;
  if (strFilePath.match(RegExtFilter) == null){
    alert('pdf 파일만 업로드 가능합니다');
    return;
  }

  if (RegExtFilter.test(strFilePath) == false) {
    alert('pdf 파일만 업로드 가능합니다');
    return
  }

  var strExt = strFilePath.split('.').pop().toLowerCase();
  if ($.inArray(strExt, ["pdf"]) == -1){
    alert('pdf 파일만 업로드 가능합니다');
    objFile.outerHTML = objFile.outerHTML;
  }
};



