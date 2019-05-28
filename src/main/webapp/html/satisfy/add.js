var productNo = location.href.split('?')[1].split('=')[1];

//등록버튼 클릭시
$('#satisfy-add-btn').click(() => {
  $.post('/bitcamp-team-project/app/json/satisfy/add',{
    pdNo: productNo,
    level: $('#satisfy-level').val(),
    understand: $('#satisfy-understand').val(),
    design: $('#satisfy-design').val(),
    asStf: $('#satisfy-asStf').val(),
    useful: $('#satisfy-useful').val(),
    priceStf: $('#satisfy-priceStf').val(),

  }, function(data) {
    if (data.status == 'success'){
      location.href='../product/view.html?no=' + productNo;
    } else {
      alert("등록 실패!\n" + data.message);
    }
  })
}); 








