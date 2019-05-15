/**
 * 
 *  product
 *  view javascript
 *  
 */
var nonMemberDiv = $('#non-member-div'),
    memberDiv = $('#common-member-div'),
    managerAndCompanyDiv = $('#company-manager-div');

var userNo = 0;

$(document).ready(function(){
  
  
  
  managerAndCompanyDiv.hide();
  memberDiv.hide();
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
    $.get('/bitcamp-team-project/app/json/product/findReviewedMember?uNo=' + userNo + '&pNo=' + location.href.split('?')[1].split('=')[1] ,function(obj) {
      if (obj.status == 'fail')
        alert('이미 만족도를 등록하셨습니다');
      else {
        location.href = '../satisfy/add.html?userNo=' + userNo + '&productNo=' + location.href.split('?')[1].split('=')[1];
      }
    }) // get
  }) // click
  
}) // bind





