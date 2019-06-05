var detailNo = location.href.split('?')[1].split('=')[1],
    tbody = $('tbody'),
    page = $('#pagination-container'),
    templateSrc = $('#select-template').html(),
    addBtn = $('#review-add-btn');

var trGenerator = Handlebars.compile(templateSrc);
var type = sessionStorage.getItem('type');
function loadList() {
  $.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo + 
      '&keyword=' + $('#keyword').val() + 
      '&searchType=' + $('#searchType').val(), (obj) => {
        console.log(obj);
        
        var productName = obj.list[0].product.name,
            manuName = obj.list[0].product.manufacturer.name,
            prodImg = obj.list[0].product.productFiles[0].img;
        
        page.pagination({
          dataSource: obj.list,
          showGoInput: true,
          showGoButton: true,
          callback: function(data, pagination) {
            tbody.children().remove();
            var pageSrc = {list: data};
            $(trGenerator(pageSrc)).appendTo(tbody);
          }
        });
        
        $('#ohr-product-img').css('background-image', '');
        $('#ohr-product-img').css('background-image', 'url(/bitcamp-team-project/upload/productfile/' + prodImg + '_thumb)');
        
        $('#ohr-product-name').html('');
        $('#ohr-product-name').append(productName);
        
        $('#ohr-product-manufacturer-name').html('');
        $('#ohr-product-manufacturer-name').append(manuName);

        $('.review-a-class').click((e) => {
          e.preventDefault();
          window.location.href = 'view2.html?no=' +  $(e.target).attr('data-no');
        });
        $(document.body).trigger('loaded-list');
      })
};

loadList();

//검색
$('#keyword').keydown((e) => {
  if (event.keyCode == 13) {
    e.preventDefault();
    loadList();
  }
});

//검색
$('#search-btn').click((e) => {
  loadList();
});

//등록버튼
$(document).ready(() => {
  if(type == null) {
    addBtn.prop('disabled', true);
  } else {
    addBtn.click(function() {
      location.href='form.html?no=' + detailNo;
    })
  }
});

