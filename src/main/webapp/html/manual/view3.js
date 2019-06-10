var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
nickName = sessionStorage.getItem('nickName'),
category = $('.categoryItem');

var scrollEvent = false;
var count = 0;

var scene = [
  {
    id: $('#s1')
  },
  {
    id: $('#s2')
  }
];

$(document).ready(() => {
  
  $('#fullpage').fullpage({
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    scrollOverflow: true,
    scrollHorizontally: false,
    anchors: ['firstPage']
  });
  
  $.fn.fullpage.setAutoScrolling(true);
  
  
  $.getJSON('/bitcamp-team-project/app/json/product/files?no=' + productNo, function(data) {
    if (data.status == 'success') {
      for (var i = 0; i < data.pList.productFiles.length; i++) {
        $('<img class="row mx-sm-auto contPhoto">').attr('src', '/bitcamp-team-project/upload/productfile/' 
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
          var summarize = '<section>' + data.mFile[i].contents + '</section>'
          $(summarize).appendTo($('#contents'));
        }
        var contents = '<section class="row justify-content-between" id="conts">'
          + '<span class="col-sm-4" id="textconts">' + data.mFile[i].contents + '</span>'
          + '<span class="col-sm-4" id="textimg"><img src="' + data.mFile[i].file + '"></span>'
          + '</section>';
        $(contents).appendTo($('.innerForm' + data.mFile[i].typeNo));
      }
      fullpage_api.reBuild();
      category.text(data.manual[0].product.productSmallCategory.productLargeCategory.name + ' > '
      + data.manual[0].product.productSmallCategory.name + ' > '
      + data.manual[0].name);
      
    } else {
      alert('실패했습니다\n' + data.error);
    }
    
    $(document.body).trigger('loaded-slide');
  });
});

$(document.body).bind('loaded-slide', function() {
  $('#general-tab').click(function(e) {
    e.preventDefault();
    fullpage_api.reBuild();
  });

  $('#configure-tab').click(function(e) {
    e.preventDefault();
    fullpage_api.reBuild();
  });

  $('#warning-tab').click(function(e) {
    e.preventDefault();
    fullpage_api.reBuild();
  });
  
  $('#reply-tab').click(function(e) {
    e.preventDefault();
    fullpage_api.reBuild();
  });
})