/**
 * 
 */
var productNo = getQuerystring('no'),
type = 0,
tipNo = 0;

var total = 0,
satisAver = 0,
level = 0,
understand = 0,
design = 0,
asStf = 0,
useful = 0,
price = 0;

var productName = '';

var tipBtn = $('#tip-btn'),
manualBtn = $('#manual-btn'),
reviewBtn = $('#review-btn'),
satisfyBtn = $('#satisfy-btn'),
productUpdateBtn = $('#product-update-btn'),
productDeleteBtn = $('#product-delete-btn');

$(document.body).bind('loaded.loginuser', () => {
  window.type = Number(sessionStorage.getItem('type'));
  satisfyBtn.hide();
  productUpdateBtn.hide();
  productDeleteBtn.hide();
  
  if(window.type != 0){
    satisfyBtn.show();
  }
  
  if(window.type >= 2){
    productUpdateBtn.show();
  }
  
  if(window.type == 3){
    productDeleteBtn.show();
  }
}); // bind loaded.loginuser



$(document).ready(function(){
  $.get('/bitcamp-team-project/app/json/satisfy/detail?no=' + productNo, function(obj) {
    console.log(obj);
    if (obj.totalColumn != 0) {
      window.productName = obj.list[0].product.name;
    }
    for (var el of obj.list) {
      total += el.asStf + el.design + el.level + el.priceStf + el.understand + el.useful,
      price += el.priceStf,
      level += el.level,
      understand += el.understand,
      design += el.design,
      asStf += el.asStf, 
      useful += el.useful;
    }
    satisAver = (total / (obj.totalColumn * 6)).toFixed(2);
    price = (price / (obj.totalColumn)).toFixed(2);
    level = (level / (obj.totalColumn)).toFixed(2);
    understand = (understand / (obj.totalColumn)).toFixed(2);
    design = (design / (obj.totalColumn)).toFixed(2);
    asStf = (asStf / (obj.totalColumn)).toFixed(2);
    useful = (useful / (obj.totalColumn)).toFixed(2);

    $(document.body).trigger({
      type: 'loaded-satisfy',
      totalColumn: obj.totalColumn
    });
  });


  $.get('/bitcamp-team-project/app/json/product/detail?no=' + productNo, function(obj) {
    console.log(obj);

    $('#product-inform-div').prepend('<hr class="head-line">');
    $('#product-inform-div').prepend('<h5>'+ obj.product.manufacturer.name +'</h5>');
    $('#product-inform-div').prepend('<h3>'+ obj.product.name +'</h3>');
    $('#product-inform-div').prepend('<hr class="head-line">');

    var largeCategory = obj.product.productSmallCategory.productLargeCategory.name;
    if (largeCategory.includes('태블릿')) {
      $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_pad.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-mobile-alt" style="font-size: 5em;"></i>');
    } else if(largeCategory.includes('카메라')) {
      $('#img-div-by-large-category').append("<imgcountAll src='/bitcamp-team-project/upload/productfile/lc_camera.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-camera" style="font-size: 5em;"></i>');
    } else if(largeCategory.includes('노트북')) {
      $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_notebook.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-laptop" style="font-size: 5em;"></i>');
    } else if(largeCategory.includes('가전')) {
      $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_appliances.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-plug" style="font-size: 5em;"></i>');
    }

    // hover 시 썸네일 사진
    $('#product-thumbnail-img-div').append('<img src="/bitcamp-team-project/upload/productfile/' + obj.product.productFiles[0].img + '_thumb" style="width: 100%; height: auto;">');


    if (obj.product.tip != null) {
      window.tipNo = obj.product.tip.no;
    }

    $(document.body).trigger({
      type: 'loaded-product',
      obj: obj
    })
  }); // get
}); // ready




$(document.body).bind('loaded-product', function(data){
  $("#product-div").mouseenter(function() {
    $(this).css('background-color', 'white');
    $(this).children().eq(0).fadeOut('fast');
    $(this).children().eq(1).fadeIn('fast');

  }).mouseleave(function() {
    $(this).css('background-color', 'black');
    $(this).children().eq(0).fadeIn('fast');
    $(this).children().eq(1).fadeOut('fast');
  });

  reviewBtn.click(function() {
    location.href = '../review/view.html?no=' + productNo + '&name=' + productName;
  })
  
  manualBtn.click(function() {
    
    // location.href = '../manual/add.html?no=' + productNo + '&name=' + productName;
  })

  satisfyBtn.click(function() {
    $.get('/bitcamp-team-project/app/json/product/findReviewedMember?pNo=' + productNo, function(obj) {
      if (obj.status == 'fail') {
        swal("만족도 평가 오류", "이미 만족도를 등록하셨습니다", "warning");
        $('#go-satisfy-add-btn').prop('disabled',true);
      } else {
        location.href = '../satisfy/add.html?productNo=' + productNo;
      }
    }) // get
  }) // click


  tipBtn.click(function() {
    $.getJSON('/bitcamp-team-project/app/json/product/confirmTip?no=' + productNo, function(obj){
      if (obj.tipCount == 1){
        location.href = '../tip/view.html?no=' + productNo;
      } else {
        if (window.type < 1){
          alert('이 제품의 대한 팁이 존재하지 않습니다');
        } else {
          swal("팁 보기 오류", "등록된 팁이 존재하지 않습니다\n 팁을 등록해주세요", "info");
          tipBtn.text('팁등록');
          tipBtn.click(function() {
            location.href = '/bitcamp-team-project/html/tip/form.html?no=' + productNo;
          });
        }
      }
    });
  });

  productUpdateBtn.click(function() {
    location.href = 'update.html?no=' + productNo;
  })

  productDeleteBtn.click(function() {
    $.get('/bitcamp-team-project/app/json/product/delete?no=' + productNo + '&tipNo=' + window.tipNo, function(obj){
      if (obj.status == 'success') {
        location.href = 'index.html';

      } else {
        alert('삭제 실패!! \n' + obj.message);
      }
    })
  });

}) // bind loaded-product

$(document.body).bind('loaded-satisfy', function(data){
  var obj = {
      name01: '가격 만족도',
      name02: '사용 난이도',
      name03: '이해도',
      name04: '디자인 만족도',
      name05: 'A/S 만족도',
      name06: '사용 만족도',
      score01: price,
      score02: level,
      score03: understand,
      score04: design,
      score05: asStf,
      score06: useful
  }

  if (isValidScore(satisAver) == true) { 
    // $('#user-evaluation-div').append('<h3>' + window.productName + '</h3>');
    $('#user-evaluation-div').append('<h3>사용자들의</h3>');
    $('#user-evaluation-div').append('<h3>평균만족도는 ?</h3>');
    
    if (satisAver >= 4.00) {
      $('#user-evaluation-div').append('<i class="far fa-smile-beam" style="font-size: 5em; color: green;"></i>');
      $('#user-evaluation-div').append('<h3>good</h3>');
    } else if (satisAver >= 2.00 ||satisAver < 4.00) {
      $('#user-evaluation-div').append('<i class="far fa-meh" style="font-size: 5em; color: black;"></i>');
      $('#user-evaluation-div').append('<h3>soso</h3>');
    } else {
      $('#user-evaluation-div').append('<i class="far fa-frown" style="font-size: 5em; color: red;"></i>');
      $('#user-evaluation-div').append('<h3>bad</h3>');
    }
    $('#user-evaluation-div').append('<button type="button" class="btn btn-info">만족도 평가 수<span class="badge badge-light">'+ data.totalColumn +'</span></button>');
    generatePieChart('pie-canvas', satisAver);
    generateBarChart('bar-canvas', obj);
  } else {
    $('#user-evaluation-div').append('<br><br><h3>아직 등록된 만족도 정보가 없습니다</h3>');
    generatePieChart('pie-canvas', 0);
    generateBarChart('bar-canvas', obj);
  }


  $("#fixed-background-div").mouseenter(function() {
    //$(this).children().eq(0).css('display', 'none');
    $(this).children().eq(0).fadeOut('fast');
    $(this).children().eq(1).fadeIn('fast');
  }).mouseleave(function() {
    $(this).children().eq(0).fadeIn('fast');
    $(this).children().eq(1).fadeOut('fast');

  });  
});





function isValidScore(value) { 
  if (isNaN(value) || value == null || value == 0){
    return false;
  } else {
    return true;
  }
} // checkScore


function generateBarChart(id, obj) {
  new Chart($('#' + id), {
    type: "bar",
    data: {
      labels: [obj.name01, obj.name02, obj.name03, obj.name04, obj.name05, obj.name06],
      datasets: [{
        label: window.productName + '의 대한 만족도',
        data: [obj.score01, obj.score02, obj.score03, obj.score04, obj.score05, obj.score06],
        fill: false,
        backgroundColor: [
          "rgba(77, 86, 86, 0.7)",
          "rgba(21, 67, 96, 0.7)",
          "rgba(123, 125, 125, 0.7)",
          "rgba(11, 83, 69, 0.7)",
          "rgba(120, 66, 18, 0.7)",
          "rgba(23, 32, 42, 0.7)"
          ]
      }]
    },
    options: {
      scales: {
        xAxes: [{
          barThickness: 40,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 5,
            stepSize: 0.5,
            beginAtZero: true
          }
        }]
      }
    }
  }); // chart
}


function generatePieChart(id, value){
  new Chart($('#' + id), {
    type: 'pie',
    data: {
      labels: [
        '이 제품의 총만족도'
        ],
        datasets: [{
          data: [value, 5-value],
          backgroundColor: [
            'rgba(93, 173, 226, 1)',
            ]
        }]
    },
    options: {
      elements: {
        center: {
          text: value,
          fontStyle: 'Helvetica', //Default Arial
          sidePadding: 15 //Default 20 (as a percentage)
        }
      },
      cutoutPercentage:70,
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI
    } // option
  }); // pie chart
} // generatePieChart


function getQuerystring(key, default_){
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} // getQuerystring


//도넛 차트에서 필요한 plugin
Chart.plugins.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontSize = centerConfig.fontSize || '50';
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      //Start with a base font of 30px
      ctx.font = fontSize + "px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 0.7);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.6);
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});


