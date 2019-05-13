var param = location.href.split('?')[1];
if (param) {
  $('h1').html('제조사 조회');
  loadData(param.split('=')[1]);
  var el = $('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  $('h1').html('제조사 추가');
  var el = $('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

$('#add-btn').click(function() {
  $.post('../../app/json/manufacturer/add', {
    name: $('#name').val(),
    tel: $('#tel').val(),
    homePage: $('#homepage').val(),
    registerNo: $('#reg_no').val()
  },
  function(data) {
    if (data.status == 'success') {
      location.href = "index.html";
    } else {
      alert('등록 실패 입니다.\n' +  data.message);
    }
  })
});

$('#delete-btn').click(() => {
  $.getJSON('../../app/json/manufacturer/delete?no=' + param.split('=')[1], function(data) {
    if (data.status == 'success') {
      location.href = "index.html";
    } else {
      alert('삭제 실패 입니다.\n' +  data.message);
    }
  }) 
});

$('#update-btn').click(function() {
  $.post('../../app/json/manufacturer/update?no=' + param.split('=')[1], {
    name: $('#name').val(),
    tel: $('#tel').val(),
    homePage: $('#homepage').val(),
    registerNo: $('#reg_no').val()
  },
  function(data) {
    if (data.status == 'success') {
      location.href = "index.html";
    } else {
      alert('변경 실패 입니다.\n' +  data.message);
    }
  })
});

function loadData(no) {
  $.getJSON('../../app/json/manufacturer/detail?no=' + no, function(data) {
    $('#no').val(data.no);
    $('#name').val(data.name);
    $('#tel').val(data.tel);
    $('#homepage').val(data.homePage);
    $('#reg_no').val(data.reg_no);
  });
};