var param = location.href.split('?')[1];
var tbody = $('tbody');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);
if (param) {
  $('h1').html("팁 조회");
  loadData(param.split('=')[1]);
  loadList(param.split('=')[1]);
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html("팁 생성");
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

$.getJSON('../../app/json/auth/user', function(data) {
  $('.history-list').hide();
  $('#rollback-btn').hide();
  if (data.status == "fail") {
    $('#update-btn').hide();
    $('#add-btn').hide();
  } 
  if (data.user.type == "3") {
    $('.history-list').show();
    $('#rollback-btn').show();
  }
  $(document).ready(function() {
    $('#updateUser').attr('placeholder', data.user.nickName);
  });
})

$.getJSON('/bitcamp-team-project/app/json/tip/confirm?productName=' + $('productName').val(), 
    function(obj) {
  if (obj.confirm == 'empty') {
    $('#add-btn').show();
    $('#update-btn').hide();
  } else {
    $('#add-btn').hide();
    $('#update-btn').show();
  }
})

function loadList(no) {
  $.getJSON('../../app/json/tiphistory/list?no=' + no, 
      function(obj) {
    console.log(no);
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
          $.post('/bitcamp-team-project/app/json/tip/rollback?no=' + param.split('=')[1], {
            name: $('#productName').val(),
            hisNo: hisNo
          }, function(obj) {
            if (obj.status == 'success') {
              location.href = "view.html?no=" + param.split('=')[1];
            } else {
              alert('롤백에 실패했습니다.\n' + data.message);
            }
          }, "json")
        } else {
          location.href = "view.html?no=" + param.split('=')[1];
        }
      } else {
        alert('안됩니닷!');
      }
    });
  })
});

$('#add-btn').click(() => {
  $.post('/bitcamp-team-project/app/json/tip/add', {
    name:     $('productName').val(),
    nickName: $('#updateUser').attr('placeholder'),
    contents: $('#contents').val()
  }, function(data) {
    if(data.status == 'success') {
      location.href = "index.html";
    } else {
      alert('팁 생성 실패입니다.\n' + data.message);
    }
  }, "json")
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
    console.log($('#updateUser').attr('placeholder'));
    $.post('/bitcamp-team-project/app/json/tip/update?no=' + param.split('=')[1], {
      name: $('#productName').val(),
      nickName: $('#updateUser').attr('placeholder'),
      contents: $('#contents').val()
    }, function(data) {
      if (data.status == 'success') {
        location.href = "view.html?no=" + param.split('=')[1];
      } else {
        alert('변경 실패 입니다.\n' +  data.message);
      }
    }, "json");

    console.log($('#no').val());
    $.post('/bitcamp-team-project/app/json/tiphistory/add', {
      tipNo: $('#no').val(),
      contents: $('#contents').val(),
      nickName: $('#updateUser').attr('placeholder')
    }, function(data) {
      if (data.status == 'success') {
        alert('히스토리 저장중입니다.');
      } else {
        alert('히스토리 추가 실패입니다.\n' + data.message) ;
      }
    }, "json")
  });
};
