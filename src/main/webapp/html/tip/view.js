var productNo = location.href.split('?')[1].split('=')[1],
    page = $('#pagination-container');
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
    page.pagination({
      dataSource: obj.list,
      showGoInput: true,
      showGoButton: true,
      pageSize: 5,
      callback: function(data, pagination) {
        tbody.children().remove();
        var pageObj = {list : data}
        $(trGenerator(pageObj)).appendTo(tbody);
        $(document.body).trigger('loaded-data');
      }
    });
  }); 
}

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

$(document.body).bind('loaded-data', () => {
  $('.cont').click((e) => {
    e.preventDefault();
    location.href = 'view2.html?no=' + $(e.target).attr('data-no');
  })
})