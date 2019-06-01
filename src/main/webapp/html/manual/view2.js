var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
    nickName = sessionStorage.getItem('nickName'),
    category = $('.categoryItem'),
    section = $('.innerForm'),
    template = $('#section-template').html();

var sectionTemp = Handlebars.compile(template);

$(document).ready(() => {
  carousel = $('#carouselExam');
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
      console.log(data.mFile);
      $(data.mFile[0]).attr('actived', true);
      $(sectionTemp(data)).appendTo(section);

      category.text(data.manual[0].product.productSmallCategory.productLargeCategory.name + ' > '
          + data.manual[0].product.productSmallCategory.name + ' > '
          + data.manual[0].name);
    } else {
      alert('실패했습니다\n' + data.error);
    }
  });
  $('body').on('wheel mousewheel DOMMouseScroll', function(event) {
    var delta = event.wheelDelta || -event.detail ||
    event.originalEvent.wheelDelta || -event.originalEvent.detail;
    if (delta) {
      $(this).carousel((delta > 0 ? 'prev' : 'next'));
    }
  });
});



