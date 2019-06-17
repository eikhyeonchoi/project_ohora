var tip_No = location.href.split('?')[1].split('=')[1];
var tbody = $('tbody');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);
var type = sessionStorage.getItem('type'),
    nickName = sessionStorage.getItem('nickName');

$(document).ready(function() {
  loadData(tip_No);
  loadList(tip_No);
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
        var r = swal({
          title: "Are you sure?",
          text: '롤백 하시겠습니까?',
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
        if (r == true) {
          $.post('/bitcamp-team-project/app/json/tip/rollback?no=' + tip_No, {
            name: $('#productName').val(),
            hisNo: hisNo
          }, function(obj) {
            if (obj.status == 'success') {
              location.href = "view.html?no=" + tip_No;
            } else {
              swal('오류', '롤백에 실패했습니다.\n' + data.message, 'warning');
            }
          }, "json")
        } else {
          location.href = "view.html?no=" + tip_No;
        }
      } else {
      }
    });
  })
});

function loadData(no) {
  $.getJSON('../../app/json/tip/detail?no=' + no, function(data) {
    $('.memberName').html(data.member.nickName);
    $('.productName').html(data.product.name);
    $('#contents').val(data.contents);
    $('.createdDate').html(data.createdDate);
    var psrc = '/bitcamp-team-project/upload/productfile/' + data.product.productFiles[0].img + '_thumb';
    $('.productImg').attr('src', psrc);
  });

  $('#update-btn').click((e) => {
    e.preventDefault();
    location.href = 'form.html?no=' + tip_No;
  });
};
