var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
nickName = sessionStorage.getItem('nickName');
general = $('#generalContents'),
config  = $('#configureContents'),
warning = $('#warningContents'),
reply   = $('#replyContents'),
category = $('.categoryItem');

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
      for (var i of data.manual[0].manualFile) {
        switch (i.manualType.no) {
        case 1:
//        console.log($(i.contents).length);
//        $(article).appendTo('.inner1'); break;
//        case 2: $(article).appendTo('.inner2');  break;
//        case 3: $(article).appendTo('.inner3');  break;
//        case 4: $(article).appendTo('.inner4');  break;
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
  $(carousel).each(function (index) {
    $('#carouselExam').on("wheel mousewheel DOMMouseScroll", function(e) {
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail)
        delta = -event.detail / 3;
      var moveTop = $(window).scrollTop();
      var car = $(carousel).eq(index);
      if (delta < 0) {
        if ($(car).next() != undefined) {
          try {
            moveTop = $(car).next().offset().top;
          } catch (e) {
          }
        } else {
          if ($(car).prev() != undefined) {
            try {
              moveTop = $(car).prev().offset().top;
            } catch (e) {
            }
          }
        }
        $('html.body').stop().animate({
          scrollTop: moveTop + 'px'
        }, {
          duration: 800, complete: function () {

          }
        })
      }
    })
  })
  /*$('body').on('wheel mousewheel DOMMouseScroll', function(event) {
    var delta = event.wheelDelta || -event.detail || event.originalEvent.wheelDelta || -event.originalEvent.detail;
    if (delta) {
      $(this).carousel((delta > 0 ? 'prev' : 'next'));
    }
  });*/
});



