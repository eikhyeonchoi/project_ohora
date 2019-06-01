/**
 * 
 */
var produdctNo = getQuerystring('no'),
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

$(document.body).bind('loaded.loginuser', () => {
  window.type = Number(sessionStorage.getItem('type'));
  $(document).ready(function(){
    
    $.get('/bitcamp-team-project/app/json/satisfy/detail?no=' + produdctNo, function(obj) {
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
      
      $(document.body).trigger('loaded-satisfy');
    });
    
    
    
    $.get('/bitcamp-team-project/app/json/product/detail?no=' + produdctNo, function(obj) {
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
        $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_camera.jpg' style='width: 100%; height: 100%;'>");
        $('#product-inform-div').prepend('<i class="fas fa-camera" style="font-size: 5em;"></i>');
      } else if(largeCategory.includes('노트북')) {
        $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_notebook.png' style='width: 100%; height: 100%;'>");
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
  
}); // bind loaded.loginuser


$(document.body).bind('loaded-product', function(data){
  $("#product-div").mouseenter(function() {
    $(this).css('background-color', 'white');
    $(this).children().eq(0).css('display', 'none');
    $(this).children().eq(1).css('display', '');
    
  }).mouseleave(function() {
    $(this).css('background-color', 'black');
    $(this).children().eq(0).css('display', '');
    $(this).children().eq(1).css('display', 'none');
    
  });
}) // bind loaded-essential

$(document.body).bind('loaded-satisfy', function(){
  
  if (isValidScore(satisAver) == true) { 
    generatePieChart('pie-canvas', satisAver);
  } else {
    $('#chart-div').append('<h4>아직 등록된 만족도 정보가 없습니다</h4>');
    generatePieChart('pie-canvas', 0);
  }
  
  
  $("#fixed-background-div").mouseenter(function() {
    //$(this).css('background-color', 'white');
    //$(this).children().eq(0).css('display', 'none');
    //$(this).children().eq(1).css('display', '');
    
  }).mouseleave(function() {
    //$(this).children().eq(0).css('display', '');
    //$(this).children().eq(1).css('display', 'none');
  });  
});


function isValidScore(value) { 
  if (isNaN(value) || value == null || value == 0){
    return false;
  } else {
    return true;
  }
} // checkScore


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


