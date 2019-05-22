var param = location.href.split('?')[1];
var prodNo = param.split('=')[1];
$('#fileupload').fileupload({
  url: '/bitcamp-team-project/app/json/product/update',
  dataType: 'json',
  sequentialUploads: true,
  singleFileUploads: false,   
  add: function (e, data) {
    $.each(data.productFiles, function (index, file) {
      console.log('Added file: ' + file.name);
    });
    $('#update-btn').click(function() {
      data.formData = {
          no: prodNo,
          name: $('#productName').val()
      };
      data.submit();
    });
  },
  done: function(e, data) {
    console.log('done()...');
    console.log(data.result);
    if(data.result.status == 'success'){
      alert("성공했습니다.")
    } else { 
      alert("필수 입력값을 입력하지 않았습니다\n" + data.error);
    }
    $('#cancel').click(function() {
      alert("뒤로가기!");
    }) // click
  }
});
