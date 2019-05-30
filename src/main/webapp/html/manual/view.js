var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
    nickName = sessionStorage.getItem('nickName');
    general = $('#generalContents'),
    config  = $('#configureContents'),
    warning = $('#warningContents'),
    reply   = $('#replyContents'),
    category = $('.categoryItem');
    
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
      $('#memberName').text(data.manual[0].product.manufacturer.name);
      $('#productName').text(data.manual[0].name);
      for (var i of data.manual[0].manualFile) {
        switch (i.manualType.no) {
        case 1: general.text(i.contents); break;
        case 2: config.text(i.contents); break;
        case 3: warning.text(i.contents); break;
        case 4: reply.text(i.contents); break;
        case 5: $('#contents').text(i.contents); break;
        default: ;
        }
      }
      category.text(data.manual[0].product.productSmallCategory.productLargeCategory.name + ' > '
          + data.manual[0].product.productSmallCategory.name + ' > '
          + data.manual[0].name);
    } else {
      alert('실패했습니다\n' + data.error);
    }
  });
  
});

