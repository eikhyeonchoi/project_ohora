var productNo = location.href.split('?')[1].split('=')[1];
var tbody = $('tbody');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);
var type = sessionStorage.getItem('type'),
    nickName = sessionStorage.getItem('nickName');

$(document).ready(function() {
  loadData(productNo);
  loadList(productNo);
  $('.history').hide();
  
  $(document.body).bind('loaded.loginuser', () => {
    type = sessionStorage.getItem('type');
    if (type < 1) {
      $('#update-btn').hide();
      
    } else if (type == 3) {
      $('.history').show();
      
    }
  });
  
  new WOW().init();
});

function loadList(no) {
  $.getJSON('../../app/json/tiphistory/list?no=' + no, 
      function(obj) {
    tbody.html(''); 
    $(trGenerator(obj)).appendTo(tbody);
    $(document.body).trigger('loaded-list');
  }); 
}

$(document.body).bind('loaded-list', () => {
  $('.rollback-btn').click(function(e) {
    $.getJSON('/bitcamp-team-project/app/json/tiphistory/detail?no=' + $(e.target).attr('data-no'),
        function(data) {
      var hisNo = data.history.no;
      if (data.status == "success") {
        $.post('/bitcamp-team-project/app/json/tip/rollback?no=' + productNo, {
          name: $('.productName').html(),
          productNo: productNo,
          hisNo: hisNo,
          contents: data.history.contents
        }, function(obj) {
          if (obj.status == 'success') {
            location.href = "view.html?no=" + productNo;
          } else {
            swal('오류', '롤백에 실패했습니다.\n' + data.message, 'warning');
          }
        }, "json");
      }
    });
  });
});

function loadData(no) {
  $.getJSON('../../app/json/tip/detail?no=' + no, function(data) {
    $('.memberName').html(data.member.nickName);
    $('.productName').html(data.product.name);
    $('#contents').html(data.contents);
    $('.createdDate').html(data.createdDate);
    if (data.product.productFiles[0].img != null) {
      var psrc = '/bitcamp-team-project/upload/productfile/' + data.product.productFiles[0].img + '_thumb';
    } else {
      var psrc = '/bitcamp-team-project/upload/productfile/default.png';
    }
    $('.productImg').attr('src', psrc);
  });

  $('#update-btn').click((e) => {
    e.preventDefault();
    location.href = 'form.html?no=' + productNo;
  });
};
