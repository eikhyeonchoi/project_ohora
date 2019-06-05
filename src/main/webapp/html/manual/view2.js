var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
nickName = sessionStorage.getItem('nickName'),
category = $('.categoryItem');

var scrollEvent = false;
var count = 0;

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
      
      for (var i = 0; i < data.mFile.length; i++) {
        if (data.mFile[i].typeNo == 5) {
          var summarize = '<section id="sumconts">' + data.mFile[i].contents + '</section>'
          $(summarize).appendTo($('#contents'));
        }
        var contents = '<section id="conts">'
          + '<span id="textconts">' + data.mFile[i].contents + '</span>'
          + '<span id="textimg"><img src="' + data.mFile[i].file + '"></span>'
          + '</section>';
        $(contents).appendTo($('.innerForm' + data.mFile[i].typeNo));
      }
      mouseWheelAction($('.innerForm1 > section[id=conts]').length);

      $('#general-tab').click(function(e) {
        e.preventDefault();
        mouseWheelAction($('.innerForm1 > section[id=conts]').length);
      });
  
      $('#configure-tab').click(function(e) {
        e.preventDefault();
        mouseWheelAction($('.innerForm2 > section[id=conts]').length);
      });
  
      $('#warning-tab').click(function(e) {
        e.preventDefault();
        mouseWheelAction($('.innerForm3 > section[id=conts]').length);
      });
      
      $('#reply-tab').click(function(e) {
        e.preventDefault();
        mouseWheelAction($('.innerForm4 > section[id=conts]').length);
      });
  
      category.text(data.manual[0].product.productSmallCategory.productLargeCategory.name + ' > '
      + data.manual[0].product.productSmallCategory.name + ' > '
      + data.manual[0].name);
      
    } else {
      alert('실패했습니다\n' + data.error);
    }
  });
});

function mouseWheelAction(cnt) {
  $("html, body").on('mousewheel', function (e) {
    var m = e.originalEvent.wheelDelta;
    var sb = $("#conts").height();

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
    } else if (m < 1 && scrollEvent == false 
        && count < cnt) {
      scrollEvent = true;
      count++;
      $("html, body").stop().animate(
          {scrollTop: sb*count},
          {duration:300,
            complete: function () {
              scrollEvent = false;
            }
          }
      );
    }
  });
}

var info, tab;

$(function() {
  tab = this.getElementById("manual_container");
  info = this.getElementById("info_container");
  winResize();
  $(window).bind({resize: winResize, scroll: winScroll});
});

function winResize() {
  tab.style.top = info.offsetHeight + "px";
}

function winScroll() {
  var op = 1 - (window.pageYOffset / info.offsetHeight);
  info.style.opacity = op;
}