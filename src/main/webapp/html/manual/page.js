var scrollEvent = false;
var count = 0;

$("html, body").on('mousewheel', function (e) {
  var m = e.originalEvent.wheelDelta;
  var sb = $("#window1").height();
  
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

$("#bt01").click(function() {
  var position = $("#window1").offset();
  $("body").stop().animate({scrollTop:position.top}, 500);
});
$("#bt02").click(function() {
  var position = $("#window2").offset();
  $("body").stop().animate({scrollTop:position.top}, 500);
});
$("#bt03").click(function() {
  var position = $("#window3").offset();
  $("body").stop().animate({scrollTop:position.top}, 500);
});
$("#bt04").click(function() {
  var position = $("#window4").offset();
  $("body").stop().animate({scrollTop:position.top}, 500);
});
