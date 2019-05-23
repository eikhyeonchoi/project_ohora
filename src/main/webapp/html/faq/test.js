/**
 * 
 */


$(document).ready(function() {
  $('#fullpage').fullpage({
    //options here
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling:true,
    scrollHorizontally: true
  });

  //methods
  $.fn.fullpage.setAllowScrolling(false);
  
  new fullpage('#fullpage', {
    anchors:['firstPage', 'secondPage', 'thirdPage']
  });
});