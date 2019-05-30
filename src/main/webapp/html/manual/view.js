var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
    nickName = sessionStorage.getItem('nickName');

$(document).ready(() => {
  $.getJSON('/bitcamp-team-project/app/json/product/files?no=' + productNo, function(data) {
    if (data.status == 'success') {
      for (var i = 0; i < data.pList.productFiles.length; i++) {
        $('<img>').attr('src', '/bitcamp-team-project/upload/productfile/' 
            + data.pList.productFiles[i].img).appendTo(fileDiv);
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });
  
  $.getJSON('/bitcamp-team-project/app/json/manual/detail?no=' + productNo, 
      function(data) {
    if (data.status == 'success') {
      console.log(data.manual);
      $('#productName').attr('value', data.manual.name);
    } else {
      alert('실패했습니다\n' + data.error);
    }
  })
});

