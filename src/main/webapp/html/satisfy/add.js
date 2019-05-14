var addNo = location.href.split('?')[1].split('=')[1];  
console.log(addNo);

document.getElementById('product-no').value = addNo;

  // ($('#product-no').css('dispalay', 'none'));

// 등록버튼 클릭시
  $('#satisfy-add-btn').click(() => {
    $.post('/bitcamp-team-project/app/json/satisfy/add',{
      pdNo: $('#product-no').val(),
      mNo: $('#member-no').val(),
      level: $('#satisfy-level').val(),
      understand: $('#satisfy-understand').val(),
      design: $('#satisfy-design').val(),
      asStf: $('#satisfy-asStf').val(),
      useful: $('#satisfy-useful').val(),
      priceStf: $('#satisfy-priceStf').val(),
      
    }, function(data) {
      headers: ("Content-Type", "application/x-www-form-urlencoded");
    if(data.status == 'success'){
      location.href='index.html';
    } else alert("0 ~ 5 사이 번호 입력");
    })
  }); 













