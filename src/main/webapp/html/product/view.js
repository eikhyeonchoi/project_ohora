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
});

$.getJSON('/bitcamp-team-project/app/json/product/detail?no=' + productNo
    , function(product) {
  productName = product.productName;
  if (product.status == 'success') {
    $('#product-name').html(productName);
  }
});

$(document).ready(function(){
  managerAndCompanyDiv.hide();
  memberDiv.hide();
  
  $.get('/bitcamp-team-project/app/json/satisfy/detail?no=' + productNo, (obj) => {
    $('#product-name').append('<p>' + productName + '</p>');

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

    // 만족도 차트
    new Chart($("horizontalBar"), {
      "type": "horizontalBar",
      "data": {
        "labels": ["총 만족도", "가격 만족도", "사용 난이도", "이해도", "디자인", "a/s만족도", "사용 만족도"],
        "datasets": [{
          "label": "만족도 그래프",
          "data": [satisAver, price, level, understand, design, asStf, useful],
          "fill": false,
          "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
            ],
            "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
              "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
              ],
              "borderWidth": 1
        }]
      },
      "options": {
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
    });
  }) //get

  $.getJSON('/bitcamp-team-project/app/json/product/confirmTip?no=' + productNo, 
      function(obj){
    if (obj.tipCount == 1) {
      tipBtn.show();
      tipBtn.text('팁 보러가기');
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
            + data.pList.productFiles[i].img).appendTo(fileDiv);
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });
  
  $(document.body).trigger('loaded-user');
}); // ready

$(document).bind('loaded-user', function() {
  $('#go-satisfy-add-btn').click(function() {
    $.get('/bitcamp-team-project/app/json/product/findReviewedMember?uNo=' 
        + no + '&pNo=' + productNo , function(obj) {
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
