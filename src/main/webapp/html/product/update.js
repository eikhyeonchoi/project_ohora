var prodNo = getQuerystring('no');

$('#fileupload').fileupload({
  url: '/bitcamp-team-project/app/json/product/update',
  dataType: 'json',
  sequentialUploads: true,
  singleFileUploads: false,   
  processalways: function(e, data) {
    console.log('fileuploadprocessalways()...');
    console.log(data.files);
    var imagesDiv = $('#images-div');
    imagesDiv.html("");
    for (var i = 0; i < data.files.length; i++) {
      try {
        if (data.files[i].preview.toDataURL) {
          console.log(data.files[i].preview.toDataURL());
          $("<img>").attr('src', data.files[i].preview.toDataURL())
          .css('width', '200px')
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