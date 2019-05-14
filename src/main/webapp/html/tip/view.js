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
  $('h1').html("새 팁");
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

$.getJSON('../../app/json/auth/user', function(data) {
  if (data.status == "fail") {
    $('#update-btn').hide();
  } 
  if (data.user.type == "1" || data.user.type == "2") {
    $('.history-list').hide();
  }
  $(document).ready(function() {
    $('#updateUser').attr('placeholder', data.user.nickName);
  });
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
  var alist = $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });
});

function loadData(no) {
  $.getJSON('../../app/json/tip/detail?no=' + no, function(data) {
    $('#no').val(data.no);
    $('#memberName').val(data.member.nickName);
    $('#productName').val(data.product.name);
    $('#contents').val(data.contents);
    $('#createdDate').val(data.createdDate);
  });
};

$('#update-btn').click(() => {
  console.log($('#updateUser').attr('placeholder'));
  $.post('/bitcamp-team-project/app/json/tip/update?no=' + param.split('=')[1], {
    name: $('#productName').val(),
    nickName: $('#updateUser').attr('placeholder'),
    contents: $('#contents').val()
  },
  function(data) {
    if (data.status == 'success') {
      location.href = "index.html";
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





