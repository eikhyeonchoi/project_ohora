var productNo = (location.href.split('?')[1]).split('=')[1],
productName = '',
nonMemberDiv = $('#non-member-div'),
memberDiv = $('#common-member-div'),
managerAndCompanyDiv = $('#company-manager-div'),
fileDiv = $('#images-div'),
no = sessionStorage.getItem('no'),
type = sessionStorage.getItem('type'),
tipBtn = $('#go-tip-btn');

var total = 0,
satisAver = 0,
level = 0,
understand = 0,
design = 0,
asStf = 0,
useful = 0,
price = 0;

$(document.body).bind('loaded.loginuser', () => {
  type = sessionStorage.getItem('type');
  if (type > 1) {
    managerAndCompanyDiv.show();
    memberDiv.show();
  } else if (type == 1) {
    memberDiv.show();
  }
  
  if (type == 3){
    $('#product-delete-btn').show();
  }
});

$.getJSON('/bitcamp-team-project/app/json/product/detail?no=' + productNo
    , function(product) {
  productName = product.productName;
  if (product.status == 'success') {
    $('#product-name').html(productName);
  }
});

$(document).ready(function(){
  $('#product-delete-btn').hide();
  
  $('#product-delete-btn').click(function() {
    console.log('delete start');
    $.get('/bitcamp-team-project/app/json/product/delete?no=' + productNo, function(obj){
      if (obj.status == 'success') {
        location.href = 'index.html';
        
      } else {
        alert('삭제 실패!! \n' + obj.message);
      }
    })
  });
  
  managerAndCompanyDiv.hide();
  memberDiv.hide();

  $.get('/bitcamp-team-project/app/json/satisfy/detail?no=' + productNo, (obj) => {
    $('#product-name').html(productName);

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
    
    var empty = 0;
    
    if (isNaN(satisAver)) {
      console.log('값이 없습니다');
      new Chart($('#pie-div'), {
        type: 'pie',
        data: {
          labels: [
            '이 제품의 총만족도'
            ],
            datasets: [{
              data: [empty ,5-empty],
              backgroundColor: [
                'rgba(77, 86, 86, 1)',
                'rgba(39, 55, 70, 1)'
                ]
            }]
        },
        options: {
          elements: {
            center: {
              text: 0,
              fontStyle: 'Helvetica', //Default Arial
              sidePadding: 15 //Default 20 (as a percentage)
            }
          },
          cutoutPercentage:70,
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI
        } // option
      }); // pie chart
      $('#pie-div').parent().append('<h5>등록된만족도가 없습니다</h5>');
      
    } else {
      new Chart($('#pie-div'), {
        type: 'pie',
        data: {
          labels: [
            '이 제품의 총만족도'
            ],
            datasets: [{
              data: [satisAver, 5-satisAver],
              backgroundColor: [
                'rgba(93, 173, 226, 1)',
                ]
            }]
        },
        options: {
          elements: {
            center: {
              text: satisAver,
              fontStyle: 'Helvetica', //Default Arial
              sidePadding: 15 //Default 20 (as a percentage)
            }
          },
          cutoutPercentage:70,
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI
        } // option
      }); // pie chart
    }
    
    // 만족도 차트
    new Chart($("#horizontalBar"), {
      type: "polarArea",
      data: {
        labels: ["가격 만족도", "사용 난이도", "이해도", "디자인", "a/s만족도", "사용 만족도"],
        datasets: [{
          data: [price, level, understand, design, asStf, useful],
          fill: false,
          backgroundColor: [
            "rgba(77, 86, 86, 0.7)",
            "rgba(21, 67, 96, 0.7)",
            "rgba(123, 125, 125, 0.7)",
            "rgba(11, 83, 69, 0.7)",
            "rgba(120, 66, 18, 0.7)",
            "rgba(23, 32, 42, 0.7)"
          ] //,
          /*
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)"
          ]
          */
        }]
      },
      options: {
        "scales": {
          "xAxes": [{
            "ticks": {
              "min": 0,
              "max": 5,
              "stepSize": 0.5,
              "beginAtZero": true
            }
          }]
        }
      }
    }); // chart

  }) //get

  $.getJSON('/bitcamp-team-project/app/json/product/confirmTip?no=' + productNo, 
      function(obj){
    if (obj.tipCount == 1) {
      tipBtn.show();
      tipBtn.click(function() {
        location.href = '../tip/view.html?no=' + productNo;
      });
    } else {
      if (type < 1) {
        tipBtn.show();
        tipBtn.text('팁 없음');
      } else {
        tipBtn.show();
        tipBtn.text('팁 등록하기');
        tipBtn.click(function() {
          location.href = '/bitcamp-team-project/html/tip/form.html?no=' + productNo;
        });
      }
    }
  }); // get

  $.getJSON('/bitcamp-team-project/app/json/product/files?no=' + productNo, function(data) {
    if (data.status == 'success') {
      for (var i = 0; i < data.pList.productFiles.length; i++) {
        $('<img>').attr('src', '/bitcamp-team-project/upload/productfile/' 
            + data.pList.productFiles[i].img).css('width','300').css('height','300').appendTo(fileDiv);
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });

  $(document.body).trigger('loaded-user');
}); // ready

$(document).bind('loaded-user', function() {
  $('#go-satisfy-add-btn').click(function() {
    $.get('/bitcamp-team-project/app/json/product/findReviewedMember?pNo=' + productNo, function(obj) {
          if (obj.status == 'fail') {
            alert('이미 만족도를 등록하셨습니다');
            $('#go-satisfy-add-btn').prop('disabled',true);
          } else {
            location.href = '../satisfy/add.html?productNo=' + productNo;
          }
        }) // get
  }) // click


  $('#go-reivew-btn').click(function() {
    location.href = '../review/view.html?no=' + productNo + '&name=' + productName;
  })
}) // bind

$('#go-product-update-btn').click(function() {
  location.href = 'update.html?no=' + productNo;
})


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











