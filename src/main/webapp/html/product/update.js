var prodNo = location.href.split('?')[1].split('=')[1];

$('#fileupload').fileupload({
  url: '/bitcamp-team-project/app/json/product/update',
  dataType: 'json',
  sequentialUploads: true,
  singleFileUploads: false,   
  add: function (e, data) {
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
      location.href = 'view.html?no='
          + prodNo;
    } else { 
      alert("필수 입력값을 입력하지 않았습니다\n" + data.error);
    }
  }
}); // fileupload

$('#cancel-btn').click(function() {
  history.back();
}) // click