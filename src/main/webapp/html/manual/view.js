var tip_No = location.href.split('?')[1].split('=')[1];
var tbody = $('tbody');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);
var type = sessionStorage.getItem('type'),
    nickName = sessionStorage.getItem('nickName');

$(document).ready(function() {
  loadData(tip_No);
  loadList(tip_No);
  $('.history-list').hide();
  $('#rollback-btn').hide();
  if (type == null) {
    $('#update-btn').hide();
  } 
  if (type == 3) {
    $('.history-list').show();
    $('#rollback-btn').show();
  }
  $(document).ready(function() {
    $('#updateUser').attr('placeholder', nickName);
  });
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
        var r = confirm('롤백 하시겠습니까?');
        if (r == true) {
          $.post('/bitcamp-team-project/app/json/tip/rollback?no=' + tip_No, {
            name: $('#productName').val(),
            hisNo: hisNo
          }, function(obj) {
            if (obj.status == 'success') {
              location.href = "view.html?no=" + tip_No;
            } else {
              alert('롤백에 실패했습니다.\n' + data.message);
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
    $('#no').val(data.no);
    $('#memberName').val(data.member.nickName);
    $('#productName').val(data.product.name);
    $('#contents').val(data.contents);
    $('#createdDate').val(data.createdDate);
  });

  $('#update-btn').click(() => {
    $.post('/bitcamp-team-project/app/json/tip/update?no=' + tip_No, {
      name: $('#productName').val(),
      contents: $('#contents').val()
    }, function(data) {
      if (data.status == 'success') {
        location.href = "view.html?no=" + tip_No;
      } else {
        location.href = '/bitcamp-team-project/html/auth/login.html'; 
      }
    }, "json");

    $.post('/bitcamp-team-project/app/json/tiphistory/add', {
      tipNo: $('#no').val(),
      contents: $('#contents').val(),
    }, function(data) {
      if (data.status == 'success') {
        alert('히스토리 저장중입니다.');
      } else {
        location.href = '/bitcamp-team-project/html/auth/login.html';
      }
    }, "json")
  });
};