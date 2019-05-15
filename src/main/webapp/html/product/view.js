/**
 * 
 *  product
 *  view javascript
 *  
 */
var nonMemberDiv = $('#non-member-div'),
    memberDiv = $('#common-member-div'),
    managerAndCompanyDiv = $('#company-manager-div');

var userNo = 0,
    productNo = location.href.split('?')[1].split('=')[1];

$(document).ready(function(){
  managerAndCompanyDiv.hide();
  memberDiv.hide();
  
  $.get('/bitcamp-team-project/app/json/product/confirmTip?no=' + productNo, function(obj){
    console.log(obj);
    if (obj.status == 'fail'){
      $('#go-tip-update-btn').text('팁보러가기');
      $('#go-tip-update-btn').click(function() {
        location.href = '../tip/view.html?no=' + productNo;
      })
    } else {
      $('#go-tip-update-btn').text('팁 등록하기');
      $('#go-tip-update-btn').click(function() {
        alert('임시버튼');
      })
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
      if (obj.status == 'fail')
        alert('이미 만족도를 등록하셨습니다');
      else {
        location.href = '../satisfy/add.html?userNo=' + userNo + '&productNo=' + productNo;
      }
    }) // get
  }) // click

}) // bind





