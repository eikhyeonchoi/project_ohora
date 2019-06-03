/**
 * 
 */
$(document).ready(function() {
  $('#fullpage').fullpage({
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling: false,
    navigationPosition: 'right',
    scrollHorizontally: false,
    loopHorizontal: false,
    controlArrows: false,
  });
  
  $.fn.fullpage.setAllowScrolling(false);
});

$('.next-page-btn').click(function(){
  fullpage_api.moveSlideRight();
  
});

$('.prev-page-btn').click(function(){
  fullpage_api.moveSlideLeft();
});
