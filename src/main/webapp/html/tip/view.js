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
  $.post('/bitcamp-team-project/app/json/tip/update?no=' + param.split('=')[1], {
    name: $('#productName').val(),
    nickName: $('#memberName').val(),
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
    nickName: $('#memberName').val()
  }, function(data) {
    if (data.status == 'success') {
      alert('히스토리 저장중입니다.');
    } else {
      alert('히스토리 추가 실패입니다.\n' + data.message) ;
    }
  }, "json")
});





