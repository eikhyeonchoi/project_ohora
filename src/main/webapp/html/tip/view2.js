var historyNo = location.href.split('?')[1].split('=')[1];
var tbody = $('tbody');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);

$(document).ready(function() {
  $.getJSON('/bitcamp-team-project/app/json/tiphistory/detail?no=' + historyNo,
      function (data) {
    console.log(data.history);
    $('.memberName').html(data.history.nickName);
    $('.productName').html(data.history.tip.product.name);
    $('#contents').html(data.history.contents);
    $('.createdDate').html(data.history.updateDate);
    $('.rollback-btn').attr('data-src', data.history.no);
    if (data.history.tip.product.productFiles[0].img != null) {
      var psrc = '/bitcamp-team-project/upload/productfile/' + data.history.tip.product.productFiles[0].img + '_thumb';
    } else {
      var psrc = '/bitcamp-team-project/upload/productfile/default.png';
    }
    $('.productImg').attr('src', psrc);
    loadList(data.history.tip.product.no);
  
    $('.rollback-btn').click(function() {
      $.post('/bitcamp-team-project/app/json/tip/rollback?no=' + data.history.tip.product.no, {
        name: data.history.tip.product.name,
        productNo: data.history.tip.product.no,
        hisNo: historyNo,
        contents: data.history.contents
      }, function(obj) {
        if (obj.status == 'success') {
          swal('변경 완료!', '해당 게시물로 롤백 되었습니다!', 'success');
          location.href = "view.html?no=" + data.history.tip.product.no;
        } else {
          swal('오류', '롤백에 실패했습니다.\n' + data.message, 'warning');
        }
      }, "json");
    });
  });
  
  new WOW().init();
});

function loadList(no) {
  $.getJSON('../../app/json/tiphistory/list?no=' + no, 
      function(obj) {
    tbody.html(''); 
    $(trGenerator(obj)).appendTo(tbody);
    $(document.body).trigger('loaded-data');
  }); 
}

$(document.body).bind('loaded-data', () => {
  $('.cont').click((e) => {
    e.preventDefault();
    location.href = 'view2.html?no=' + $(e.target).attr('data-no');
  })
})

