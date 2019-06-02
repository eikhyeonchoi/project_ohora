var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
    nickName = sessionStorage.getItem('nickName'),
    category = $('.categoryItem'),
    section = $('.innerForm');


var scrollEvent = false;
var count = 0;

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
      console.log(data.manual[0]);
      //for (var i = 0; i < data)
      category.text(data.manual[0].product.productSmallCategory.productLargeCategory.name + ' > '
          + data.manual[0].product.productSmallCategory.name + ' > '
          + data.manual[0].name);
    } else {
      alert('실패했습니다\n' + data.error);
    }
  });
});

$("html, body").on('mousewheel', function (e) {
  var m = e.originalEvent.wheelDelta;
  var sb = $("#conts1").height();
  
  if (m > 1 && scrollEvent == false && count >= 1) {
    scrollEvent = true;
    count--;
     $("html, body").stop().animate(
         {scrollTop: sb*count},
         {duration:300, 
          complete: function() {
            scrollEvent = false;
         }
      });
  } else if (m < 1 && scrollEvent == false && count < 3) {
    scrollEvent = true;
    count++;
     $("html, body").stop().animate(
         {scrollTop: sb*count},
         {duration:300,
          complete: function () {
          scrollEvent = false;
          }});
  }
});
