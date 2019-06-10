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
    window.productName = obj.product.name;

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
    location.href = '../review/prodView.html?no=' + productNo;
  })
  
  manualBtn.click(function() {
    $.get('/bitcamp-team-project/app/json/product/confirmManual?pNo=' + productNo, function(obj) {
      console.log(obj);
      
      if (obj.manualCount == 1) {
        console.log(obj.manualCount)
        swal('매뉴얼 이미 있음', 'detail 완성되면 링크걸어야함', 'warning');
        //
        // 매뉴얼 detail 경로
        // 매뉴얼 detail 경로
        // 매뉴얼 detail 경로
        //
      } else {
        if (window.type == 1 || window.type == 0){
          swal('매뉴얼 알림', '매뉴얼이 등록되어 있지 않습니다', 'info');
        } else {
          swal({
            title: "매뉴얼 알림",
            text: "매뉴얼이 등록되어있지 않습니다\n 매뉴얼을 등록하러 가시겠습니까?",
            icon: "info",
            buttons: {
              no: {
                text: '아니오',
                value: 'no'
              },
              yes: {
                text: '등록',
                value: 'yes'
              }
            },
          })
          .then((value) => {
            switch(value){
              case 'yes': 
                location.href = '../manual/add.html?no='+ productNo + '&name=' + productName;
                break;
              case  'no':
                swal('매뉴얼 등록 취소', '취소 하셨습니다', 'warning');
                break;
              default:
                swal('매뉴얼 등록 취소', '취소 하셨습니다', 'warning');
                break;
            }
          });
        }
      }
    }) // get
  })

  satisfyBtn.click(function() {
    $.get('/bitcamp-team-project/app/json/product/findReviewedMember?pNo=' + productNo, function(obj) {
      if (obj.satisfyCount == 1) {
        swal("만족도 평가 오류", "이미 만족도를 등록하셨습니다", "warning");
        $('#go-satisfy-add-btn').prop('disabled',true);
        
      } else {
        starGenerator('level-rate');
        starGenerator('understand-rate');
        starGenerator('design-rate');
        starGenerator('as-rate');
        starGenerator('convenience-rate');
        starGenerator('price-rate');
        
        $('#satisfy-add-modal').modal({backdrop: 'static', keyboard: false});
        
        $('#modal-cancel-btn').click(function() {
          $('#satisfy-add-modal').modal('hide');
        }); // click
        
        $('#modal-ok-btn').click(function() {
          $.post('/bitcamp-team-project/app/json/satisfy/add',{
            pdNo: productNo,
            level: Number($('#level-score').text()),
            understand: Number($('#understand-score').text()),
            design: Number($('#design-score').text()),
            asStf: Number($('#as-score').text()),
            useful: Number($('#convenience-score').text()),
            priceStf: Number($('#price-score').text())
          }, function(data) {
            if (data.status == 'success'){
              location.reload();
            } else {
              swal("등록 실패!",'data.message','warning');
            }
          })
        }); // click
      }
    }) // get
  }) // click


  tipBtn.click(function() {
    $.getJSON('/bitcamp-team-project/app/json/product/confirmTip?no=' + productNo, function(obj){
      if (obj.tipCount == 1){
        location.href = '../tip/view.html?no=' + productNo;
      } else {
        if (window.type == 0){
          swal('팁 없음', '등록된 팁이 존재하지 않습니다', 'warning');
        } else {
          swal({
            title: "팁 보기 오류",
            text: "등록된 팁이 존재하지 않습니다\n 팁을 등록하시겠습니까?",
            icon: "info",
            buttons: {
              no: {
                text: '아니오',
                value: 'no'
              },
              yes: {
                text: '등록',
                value: 'yes'
              }
            },
          })
          .then((value) => {
            switch(value){
              case 'yes': 
                location.href = '/bitcamp-team-project/html/tip/form.html?no=' + productNo;
                break;
              case  'no':
                swal('팁 등록 취소', '취소 하셨습니다', 'warning');
                break;
              default:
                swal('팁 등록 취소', '취소 하셨습니다', 'warning');
                break;
            }
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


function starGenerator(id) {
  $('#' + id).bind('rated' ,function(e, value) {
    $(e.target).parent().next().text(value);
    console.log($(e.target).parent().prev().text() + ' => ' + value);
  });
  $('#' + id).bind('over' ,function(e, value) {
    $(this).attr('title', value);
  });}




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


