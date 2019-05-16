/**
 * 
 *  product
 *  view javascript
 *  
 */
var nonMemberDiv = $('#non-member-div'),
    memberDiv = $('#common-member-div'),
    managerAndCompanyDiv = $('#company-manager-div');

var tipBtn = $('#go-tip-btn');

var userNo = 0,
productNo = location.href.split('?')[1].split('=')[1];

var total = 0,
satisAver = 0,
level = 0,
understand = 0,
design = 0,
asStf = 0,
useful = 0,
price = 0;

$(document).ready(function(){
  managerAndCompanyDiv.hide();
  memberDiv.hide();

  $.get('/bitcamp-team-project/app/json/satisfy/detail?no=' + productNo, (obj) => {

    $('#product-name').append('<p>'+obj.list[0].product.name+'</p>')


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

    console.log('총 만족도 => ' + satisAver);
    console.log('가격만족도 => ' + price);
    console.log('사용난이도 => ' + level);
    console.log('이해도 => ' + understand);
    console.log('디자인 => ' + design);
    console.log('a/s만족도 => ' + asStf);
    console.log('사용만족도 => ' + useful);


  }) //get

  $.get('/bitcamp-team-project/app/json/product/confirmTip?no=' + productNo, function(obj){
    console.log(obj);
    if (obj.status == 'fail'){
      tipBtn.text('팁보러가기');
      tipBtn.click(function() {
        location.href = '../tip/view.html?no=' + productNo;
      })
    } else {
      if (userNo == 0){
        tipBtn.hide();
      }else {
        tipBtn.text('팁 등록하기');
        tipBtn.click(function() {
        })
      }
    }
  }) // get


  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    userNo = obj.user.no;
    if (obj.user.type == 1) {
      memberDiv.show();
    } else if (obj.user.type == 2 || obj.user.type == 3) {
      memberDiv.show();
      managerAndCompanyDiv.show();
    }
    $(document.body).trigger({
      type: 'loaded-user'
    });
  }) // get


}) // ready


$(document).bind('loaded-user', function() {
  $('#go-satisfy-add-btn').click(function() {
    $.get('/bitcamp-team-project/app/json/product/findReviewedMember?uNo=' + userNo + '&pNo=' + productNo ,function(obj) {
      if (obj.status == 'fail') {
        alert('이미 만족도를 등록하셨습니다');
        $('#go-satisfy-add-btn').prop('disabled',true);
      } else {
        location.href = '../satisfy/add.html?userNo=' + userNo + '&productNo=' + productNo;
      }
    }) // get
  }) // click
}) // bind





