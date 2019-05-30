var smallSrc = $('#small-category-template').html(),
    manuSrc = $('#manufacturor-template').html(),
    div = $('#selectDiv');

var smallCategoryGenerator = Handlebars.compile(smallSrc),
    manufacturerGenerator = Handlebars.compile(manuSrc);

$(document).ready(function() {
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
    url: '/bitcamp-team-project/app/json/product/add',        // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.   
    add: function (e, data) {
      $('#product-add-btn').off().click(function() {
        data.formData = {
            name: $('#productName').val(),
            smallCategoryNo: $('#smallCtgSelect option:selected').val(),
            manufacturerNo: $('#manufacturerSelect option:selected').val(),
        };
        data.submit();
      });
    },
    done: function(e, data) {
      if(data.result.status == 'success'){
        location.href='index.html';
      } else { 
        alert("필수 입력값을 입력하지 않았습니다\n" + data.error);
      }
      $('#product-cancel-btn').click(function() {
        location.href = 'index.html';
      }) // click
    }
  });
});