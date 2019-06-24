/**
 * 
 */
var productNo = getQuerystring('no'),
    productName =  decodeURIComponent(getQuerystring('name')),
    type = 0,
    tipNo = 0,
    manualNo = 0;

var total = 0,
    satisAver = 0,
    level = 0,
    understand = 0,
    design = 0,
    asStf = 0,
    useful = 0,
    price = 0;

var satisfyNo = 0,
    productReviews = [];



var tipBtn = $('#tip-btn'),
    manualBtn = $('#manual-btn'),
    reviewBtn = $('#review-btn'),
    satisfyBtn = $('#satisfy-btn'),
    productUpdateBtn = $('#product-update-btn'),
    productDeleteBtn = $('#product-delete-btn');


var scoreTempate = $('#my-score-template').html(),
    satisfyTempate = $('#satisfy-template').html();

var scoreGenerator = Handlebars.compile(scoreTempate),
    satisfyGenerator = Handlebars.compile(satisfyTempate);

var page = $('#page-container');


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
  new WOW().init();
  
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
    
    if (obj.product.reviews != null) {
      for(var i = 0; i < obj.product.reviews.length; i++) {
        window.productReviews.push(obj.product.reviews[i].no);
      } // for
    }
    
    console.log(window.productReviews);
    
    $('#product-inform-div').prepend('<hr class="head-line">');
    $('#product-inform-div').prepend('<h5>'+ obj.product.manufacturer.name +'</h5>');
    $('#product-inform-div').prepend('<h3>'+ obj.product.name +'</h3>');
    $('#product-inform-div').prepend('<hr class="head-line">');

    var largeCategory = obj.product.productSmallCategory.productLargeCategory.name;
    if (largeCategory.includes('태블릿')) {
      $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_pad.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-mobile-alt" style="font-size: 4em;"></i>');
    } else if(largeCategory.includes('카메라')) {
      $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_camera.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-camera" style="font-size: 4em;"></i>');
    } else if(largeCategory.includes('노트북')) {
      $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_notebook.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-laptop" style="font-size: 4em;"></i>');
    } else if(largeCategory.includes('가전')) {
      $('#img-div-by-large-category').append("<img src='/bitcamp-team-project/upload/productfile/lc_appliances.jpg' style='width: 100%; height: 100%;'>");
      $('#product-inform-div').prepend('<i class="fas fa-plug" style="font-size: 4em;"></i>');
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
    $(this).css('background-color', '#F2F3F4');
    $(this).children().eq(0).fadeOut('fast');
    $(this).children().eq(1).fadeIn('fast');

  }).mouseleave(function() {
    $(this).css('background-color', '#02142f');
    $(this).children().eq(0).fadeIn('fast');
    $(this).children().eq(1).fadeOut('fast');
  });

  reviewBtn.click(function() {
    location.href = '../review/prodView.html?no=' + productNo;
  })
  
  manualBtn.click(function() {
    $.get('/bitcamp-team-project/app/json/product/confirmManual?pNo=' + productNo, function(obj) {
      console.log(obj);
      
      if (obj.status == 'success') {
        if (window.type != 3) {
          location.href = '../manual/view.html?no=' + productNo;
        } else {
          swal({
            title: "매뉴얼 매뉴 선택",
            text: "매뉴얼 매뉴를 선택하세요",
            icon: "info",
            buttons: {
              no: {
                text: '삭제',
                value: 'delete'
              },
              yes: {
                text: '보기',
                value: 'view'
              }
            },
          })
          .then((value) => {
            switch(value){
              case 'view': 
                location.href = '../manual/view.html?no=' + productNo;
                break;
              case  'delete':
                $.get('/bitcamp-team-project/app/json/manual/delete?no=' + obj.manual.no, function(obj) {
                  if (obj.status == 'success') {
                    toastr.success('게시물 삭제 완료', '삭제가 성공적으로 수행되었습니다')
                    location.reload();
                  } else {
                    swal('게시물 삭제 오류', '매뉴얼 삭제중 오류발생\n' + obj.message, 'warning');
                  }
                });
                break;
              default:
                toastr.warning('취소하셨습니다');
                break;
            }
          });
          
          
        }
        
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
                toastr.warning('취소하셨습니다')
                break;
              default:
                toastr.warning('취소하셨습니다')
                break;
            }
          });
        }
      }
    }) // get
  })

  
  satisfyBtn.click(function() {
    $('#satisfy-add-modal').modal({backdrop: 'static', keyboard: false});
    satisfyModalInitializer();
    lengthCheck('contents');
    
    $('#a-my-score').click(function(e) {
      e.preventDefault();
      satisfyModalInitializer();
      $('#my-score-modal-footer').show();
      $('#eval-modal-footer').hide();
    })
    
    
    $('#a-eval').click(function(e) {
      e.preventDefault();
      starGenerator('level-rate');
      starGenerator('understand-rate');
      starGenerator('design-rate');
      starGenerator('as-rate');
      starGenerator('convenience-rate');
      starGenerator('price-rate');
      $('#my-score-modal-footer').hide();
      $('#eval-modal-footer').show();
    }) // click
    
    $('#satisfy-delete-btn').click(function() {
      $.get('/bitcamp-team-project/app/json/satisfy/delete?no='+satisfyNo, function(obj) {
        if(obj.status == 'success') {
          toastr.success('게시물 삭제 완료', '게시물 삭제가 성공적으로 수행되었습니다')
          location.reload();
        } else {
          swal('삭제 실패', obj.message, 'warning');
        }
      }); // get
    }) // click
    
    
    $('#satisfy-update-btn').click(function() {
      $('.my-score').each(function(index, item) {
        $(item).rateit('readonly',!$(item).rateit('readonly'))
      }) // each
      
      $('.my-score').bind('rated', function(e, value) {
        $(e.target).parent().next().text(value);
      });
      $('.my-score').bind('reset', function(e, value) {
        $(e.target).parent().next().text('0');
      });
      
      $('#my-score-eval').prop('disabled', false);
      $(this).replaceWith("<button id='new-satisfy-update-btn' type='button' class='btn btn-warning btn-block'>저장</button>");
      
      $('#new-satisfy-update-btn').click(function() {
          var sList = [];
          $('.my-score-next').each(function(index, item) {
            sList.push(Number($(item).text()));
          });
          
          sList.push($('#my-score-eval').val());
          
          $.post('/bitcamp-team-project/app/json/satisfy/update',{
            no: satisfyNo,
            level: sList[0],
            understand: sList[1],
            design: sList[2],
            asStf: sList[3],
            useful: sList[4],
            priceStf: sList[5],
            eval: sList[6]
          }, function(obj) {
            console.log(obj);
            if (obj.status == 'success') {
              toastr.success('게시물 수정 완료', '수정이 성공적으로 수행되었습니다')
              location.reload();
            } else {
              swal('수정 실패!', obj.message, 'warning');
            }
          })
      }); // click
    }) // click
    
    
    $('.modal-cancel-btn').click(function() {
      $('#satisfy-add-modal').modal('hide');
      toastr.warning('취소하셨습니다');
    }); // click
    
    $('#modal-ok-btn').click(function() {
      console.log();
      $.post('/bitcamp-team-project/app/json/satisfy/add',{
        pdNo: productNo,
        level: $('#level-backing').val(),
        understand: $('#understand-backing').val(),
        design: $('#design-backing').val(),
        asStf: $('#as-backing').val(),
        useful: $('#convenience-backing').val(),
        priceStf: $('#price-backing').val(),
        eval: $('#contents').val()
      }, function(data) {
        if (data.status == 'success'){
          toastr.warning('취소하셨습니다')
          location.reload();
        } else {
          swal("등록 실패!", data.message, 'warning');
        }
      })
    }); // click
  }) // click


  
  tipBtn.click(function() {
    $.getJSON('/bitcamp-team-project/app/json/product/confirmTip?no=' + productNo, function(obj){
      if (obj.tipCount == 1){
        location.href = '../tip/view.html?no=' + productNo;
      } else {
        if (window.type == 0){
          toastr.warning('등록된 팁이 존재하지 않습니다')
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
                toastr.warning('취소하셨습니다')
                break;
              default:
                toastr.warning('취소하셨습니다')
                break;
            }
          });
        }
      }
    });
  }); // click

  productUpdateBtn.click(function() {
    location.href = 'update.html?no=' + productNo;
  }); // click

  
  productDeleteBtn.click(function() {
    $.get('/bitcamp-team-project/app/json/product/confirmManual?pNo=' + productNo, function(obj) {
      if (obj.manual != null) {
        window.manualNo = obj.manual.no;
      }
      
      swal({
        title: "제품 삭제 알림",
        text: "제품 정보를 삭제하시겠습니까 ?",
        icon: "info",
        buttons: {
          no: {
            text: '아니오',
            value: 'no'
          },
          yes: {
            text: '삭제',
            value: 'yes'
          }
        },
      }) // swal
      .then((value) => {
        switch(value){
          case 'yes': 
            if (obj.status == 'fail') {
              $.get('/bitcamp-team-project/app/json/product/delete?no=' + productNo + '&tipNo=' + window.tipNo + '&reviews=' + window.productReviews, function(obj){
                if (obj.status == 'success') {
                  location.href = 'index.html';
                } else {
                  alert('삭제 실패!! \n' + obj.message);
                }
              });
              break;
            } else {
              $.get('/bitcamp-team-project/app/json/product/delete?no=' + productNo + '&tipNo=' + window.tipNo + '&manualNo=' + window.manualNo + '&reviews=' + window.productReviews, function(obj){
                if (obj.status == 'success') {
                  location.href = 'index.html';
                } else {
                  alert('삭제 실패!! \n' + obj.message);
                }
              });
              break;
              
            }
          case  'no':
            swal('제품 삭제 취소', '취소 하셨습니다', 'warning');
            break;
          default:
            swal('제품 삭제 취소', '취소 하셨습니다', 'warning');
            break;
        }
      }); // then
    }); // get
    
    
  }); // click

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
    
    // generatePieChart('pie-canvas', satisAver);
    generateBarChart('bar-canvas', obj);
    
    $('#user-evaluation-div').append('<h4>'+ satisAver +'</h4>');
    $('#rateYo').rateYo({
      rating: satisAver,
      readOnly: true,
      halfStar: true
    });
    
    $.get('/bitcamp-team-project/app/json/satisfy/list?productNo=' + productNo, function(obj) {
      
      console.log(productNo);
      console.log(obj);
      
      for (var comp of obj.list) {
        $(comp).attr('aver', (comp.asStf + comp.design + comp.level + comp.priceStf + comp.understand + comp.useful)/6);
      }
      
      $('#check-satisfy').text('총  ' + obj.list.length + '개의 평가');
      
      $('#score-high-sorted').click(function(e) {
        e.preventDefault();
        $(e.target).prev().css('color','red');
        $(e.target).next().css('color','black');
        obj.list.sort(function(a, b) {
          return b.aver - a.aver;
        })
        selectPagination(obj);
      })
      
      $('#score-low-sorted').click(function(e) {
        e.preventDefault();
        $(e.target).prev().css('color','red');
        $(e.target).prev().prev().prev().css('color','black');
        obj.list.sort(function(a, b) {
          return a.aver - b.aver;
        })
        selectPagination(obj);
      })
      
      selectPagination(obj);
      
      
      
    }); // get
    
    
  } else {
    $('#rateYo').rateYo({
      rating: 0,
      readOnly: true
    });
    
    generateBarChart('bar-canvas', obj);
    $('#satisfy-list').append('<h4> 등록된 한줄평이 없습니다 </h4>');
  }


  $("#fixed-background-div").mouseenter(function() {
    $(this).children().eq(0).fadeOut('fast');
    $(this).children().eq(1).fadeIn('fast');
    
  }).mouseleave(function() {
    $(this).children().eq(0).fadeIn('fast');
    $(this).children().eq(1).fadeOut('fast');

  });  
});


function lengthCheck(id) {
  $('#' + id).keyup(function(e) {
    var target = $(e.target);
    
    target.next().text(target.val().length + '/100')
    if(target.val().length > 99) {
     target.val(target.val().substring(0, 99));
      swal('글자수 제한', '100자 이상 작성할 수 없습니다', 'warning');
    }
  }) // keyup
  
} // lengthCheck

function rateYoGenerator(obj) {
  $('.rateYo').each(function(index, item) {
    $(item).parent().append('<h5>&nbsp&nbsp' + obj.list[index].aver.toFixed(2) + '</h5>');
    $(item).rateYo({
      rating: obj.list[index].aver,
      halfStar: true,
      readOnly: true,
      ratedFill: "#E74C3C",
      starWidth: "15px"
    })
  }); // each
}

function selectPagination(obj) {
  page.pagination({
    dataSource: obj,
    locator: 'list',
    pageSize: 6,
    showGoInput: true,
    showGoButton: true,
    callback: function(data, pagination) {
      $('#satisfy-list').html('');
      var pageObj = {list: data};
      $(satisfyGenerator(pageObj)).appendTo($('#satisfy-list'));
      rateYoGenerator(obj);
    }
  });
}

function satisfyModalInitializer() {
  $.get('/bitcamp-team-project/app/json/product/findReviewedMember?pNo=' + productNo, function(obj) {
    console.log(obj);
    
    if(obj.satisfy != null) {
      window.satisfyNo = obj.satisfy.no;
    }
    
    if(obj.status == 'success') {
      $('#my-score-div').html('');
      

      var scoreList = [
        {name: '난이도', score: obj.satisfy.level},
        {name: '이해도', score: obj.satisfy.understand},
        {name: '디자인', score: obj.satisfy.design},
        {name: 'A/S', score: obj.satisfy.asStf},
        {name: '편의성', score: obj.satisfy.useful},
        {name: '가격', score: obj.satisfy.priceStf}];
      
      var scoreObj = {
          scoreList: scoreList,
          eval: obj.satisfy.eval};
      
      $(scoreGenerator(scoreObj)).appendTo($('#my-score-div'));
      
      lengthCheck('my-score-eval');
      ReloadScripts('rateit');
      
      $('#a-eval').hide();
      
      /*
      $('#eval, #modal-ok-btn').hover(function() {
        $(this).css('opacity', '0.2');
        $('#modal-ok-btn').parent()
                          .removeClass('col-4')
                          .addClass('col-5')
                          .append('<p>이미 만족도를 등록했습니다</p>');
        $('#modal-ok-btn').remove();
      })
      */
      
    } else {
      $('#my-score-div').html('');
      $('#satisfy-delete-btn').hide();
      $('#satisfy-update-btn').hide();
      $('#my-score-div').addClass('mt-sm-5').css('text-align', 'center').css('font-size', '5em')
      .append('<i class="far fa-dizzy" style="color: red;"></i>')
      .append('<h5>아직 만족도 등록을 하지 않았습니다</h5>');
      
    }
  }) // get
} // satisfyModalInitializer



function starGenerator(id) {
  $('#' + id).bind('rated' ,function(e, value) {
    $(e.target).parent().next().text(value);
    console.log($(e.target).parent().prev().text() + ' => ' + value);
  });
  $('#' + id).bind('over' ,function(e, value) {
    $(this).attr('title', value);
  });
}




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
        label: '"' + window.productName + '"' + ' 의 평가',
        data: [obj.score01, obj.score02, obj.score03, obj.score04, obj.score05, obj.score06],
        fill: false,
        backgroundColor: [
          "rgba(70, 23, 54, 0.8)",
          "rgba(255, 233, 109, 0.8)",
          "rgba(63, 181, 104, 0.8)",
          "rgba(66, 85, 194, 0.8)",
          "rgba(255, 164, 115, 0.8)",
          "rgba(219, 236, 51, 0.8)"
          ]
      }]
    },
    options: {
      maintainAspectRatio: false,
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
} // generateBarChart


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
          fontStyle: 'Helvetica', // Default Arial
          sidePadding: 15 // Default 20 (as a percentage)
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


// 도넛 차트에서 필요한 plugin
Chart.plugins.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      // Get ctx from string
      var ctx = chart.chart.ctx;

      // Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontSize = centerConfig.fontSize || '50';
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      // Start with a base font of 30px
      ctx.font = fontSize + "px " + fontStyle;

      // Get the width of the string and also the width of the element minus 10
      // to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 0.7);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.6);
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      // Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});


function ReloadScripts(value) {
  console.log(value + " reload");
  var scriptTag = $('script[src]');
  var src;
  
  for (var i = 0; i < scriptTag.length; i++) {
    if(scriptTag[i].src.includes(value)) {
      src = scriptTag[i].src;
      scriptTag[i].parentNode.removeChild(scriptTag[i]);
      try {
        var x = document.createElement('script');
        x.type = 'text/javascript';
        x.src = src;
        document.getElementsByTagName('head')[0].appendChild(x);
      }
      catch (e) {}
      break;
    } // for
  }
}; // ReloadScripts​


