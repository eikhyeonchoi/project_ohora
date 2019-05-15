
var qs = location.href.split('?')[1],
    values = qs.split('&'),
    userNo = values[0].split('=')[1],
    productNo = values[1].split('=')[1];

console.log(userNo);
console.log(productNo);

// 등록버튼 클릭시
  $('#satisfy-add-btn').click(() => {
    $.post('/bitcamp-team-project/app/json/satisfy/add',{
      pdNo: productNo,
      mNo: userNo,
      level: $('#satisfy-level').val(),
      understand: $('#satisfy-understand').val(),
      design: $('#satisfy-design').val(),
      asStf: $('#satisfy-asStf').val(),
      useful: $('#satisfy-useful').val(),
      priceStf: $('#satisfy-priceStf').val(),
      
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    
     
    if(data.status == 'success'){
      location.href='../product/view.html?no=' + productNo;
    } else alert("등록 실패!\n" + data.message);
    })
    
  }); 








