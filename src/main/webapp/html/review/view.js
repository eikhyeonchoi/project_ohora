var detailNo = location.href.split('?')[1].split('=')[1],
    tbody = $('tbody'),
    page = $('#pagination-container'),
    templateSrc = $('#select-template').html(),
    productName = '',
    addBtn = $('#review-add-btn');
var trGenerator = Handlebars.compile(templateSrc);

function loadList() {
  $.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo + 
      '&keyword=' + $('#keyword').val() + 
      '&searchType=' + $('#searchType').val(), (obj) => {
        productName = obj.productName;
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
        $('#product-name').html('');
        $('#product-name').append(productName);

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
($.getJSON('/bitcamp-team-project/app/json/auth/user', function(obj){
  if(obj.status == 'fail') {
    addBtn.prop('disabled', true);
  } else {
    addBtn.click(function() {
      location.href='form.html?no=' + detailNo;
    })
  }
}));

