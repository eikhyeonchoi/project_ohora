var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
nickName = sessionStorage.getItem('nickName'),
category = $('.categoryItem');

$(document).ready(() => {
  
  $.getJSON('/bitcamp-team-project/app/json/product/files?no=' + productNo, function(data) {
    if (data.status == 'success') {
      for (var i = 0; i < data.pList.productFiles.length; i++) {
        $('<img class="row mx-sm-auto contPhoto">')
        .attr('src', '/bitcamp-team-project/upload/productfile/' + data.pList.productFiles[i].img)
            .appendTo(fileDiv);
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
        switch (data.mFile[i].typeNo) {
        case 1:
          content(data.mFile[i].contents, data.mFile[i].file, data.mFile[i].typeNo, i); break;
        case 2:
          content(data.mFile[i].contents, data.mFile[i].file, data.mFile[i].typeNo, i); break; 
        case 3:
          content(data.mFile[i].contents, data.mFile[i].file, data.mFile[i].typeNo, i); break;
        case 4:
          content(data.mFile[i].contents, data.mFile[i].file, data.mFile[i].typeNo, i); break;
        case 5:
          summarize(data.mFile[i].contents); break;
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
  new WOW().init();
});


function content(mconts, mfile, no, i) {
  var cont = '';
  var downbtn = '';
  var src = '';
  if (i == 0) {
    cont = 'pdf-src';
    src = '/bitcamp-team-project/upload/manualfile/pdf-3383632_1280.png';
    downbtn 
    = '<a href="#" class="download btn-sm btn-dark" id="download' + i + '">download</a>';
  } else {
    cont = 'img-src';
    src = '/bitcamp-team-project/upload/manualfile/' + mfile;
    mfile = mfile + '_thumb ';
  }
  
  var contents = '<section class="row mx-sm-1 justify-content-center">'
    + '<div class="row justify-content-center">'
    + '<span class="wow fadeInUp col-sm-2" id="textconts" data-wow-offset="80" data-wow-delay="0.2s">' 
    + mconts + '</span>'
    + '<span class="wow fadeInUp col-sm-2" id="textimg" data-wow-offset="80" data-wow-delay="0.2s">'
    + '<a class="image-popup-no-margins" href="' + src + '">'
    + '<img class="img-responsive" src="' + src + '"'
    + 'id="' + cont + '">'
    + downbtn + '</a></span>';
    + '</div></section>';
    $(contents).appendTo($('.innerForm' + no));
    if (i == 0) {
      $('#download0').click((e) => {
        e.preventDefault();
        location.href = '/bitcamp-team-project/upload/manualfile/' + mfile;
      });
    }
    
    $('.image-popup-no-margins').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom',
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });
    
}

function summarize(mconts) {
  var summarize = '<section>' + mconts + '</section>'
  $(summarize).appendTo($('#contents'));
};

