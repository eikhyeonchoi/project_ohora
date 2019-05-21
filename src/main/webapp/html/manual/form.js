/**
 *
 * manual 
 * for javascript
 * 
 */
var productNo = getQuerystring('no'),
    productName = getQuerystring('name');

$('#manualFileUpload').fileupload({
  url: '/bitcamp-team-project/app/json/manual/add',
  sequentialUploads: true,
  singleFileUploads: false,
  dataType: 'json',
  add: function(e, data) {
    $('#manual-add-btn').click(function() {
      data.formData = {
          productNo: productNo,
          contents: $('#manualContents').val(),
          type: 1
      };
      data.submit();
    }) // click
  }, // add
  done: function (e, data) {
    console.log('done()...');
    console.log(data.result);
  } // done
}); // fileupload



function getQuerystring(key, default_) {
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} // getQuerystring


