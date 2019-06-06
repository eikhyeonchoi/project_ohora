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
  if (m == 1) {
    $('#window1').fadeIn();
  } else if (m == 2) {
    $('#window1').fadeOut();
  }
});
