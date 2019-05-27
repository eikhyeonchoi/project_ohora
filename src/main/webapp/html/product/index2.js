var searchSpan = $('#seachSpan'),
    tbody = $('tbody'),
    page = $('#pagination-container'),
    largeSrc = $('#large-category-template').html(),
    smallSrc = $('#small-category-template').html(),
    formInline = $('.formInline');
var largeCategoryGenerator = Handlebars.compile(largeSrc),
    smallCategoryGenerator = Handlebars.compile(smallSrc);


$(document).ready(function() {
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    console.log(obj);
    $('#insert-btn').click(function() {
      if (obj.user.type < 2) {
        location.href = '/bitcamp-team-project/html/auth/login.html';
      } else {
        location.href = 'add.html';
      }
    })
  }) // get

  $.getJSON('/bitcamp-team-project/app/json/product/ctgList', (obj) => {
    $(largeCategoryGenerator(obj)).appendTo(searchSpan);
    $(smallCategoryGenerator(obj)).appendTo($('.input-group'));

    formInline
      .append("<input id='searchWord' type='text' class='form-control'>")
      .append("<button id='search-btn' type='button' class='btn btn-success btn-sm'>검색</button>");

  });

  loadList();
})
function loadList() {
  $.get('/bitcamp-team-project/app/json/product/list?largeNo=' + 0
      + '&smallNo=' + 0 
      + '&productName=' + 'undefined', function(obj){
    paging(obj);
    $(document.body).trigger('loaded');
  }) // get
}

function paging(obj) {
  page.pagination({
    dataSource: obj.list,
    callback: function(data, pagination) {
      var html = '<tr>';
      for (var i = 0; i < data.length; i++) {
        html += '<th scope="row">' + data[i].no + '</th>'
              + '<td scope="row"><a class="product-a-class" href="#" data-no=' 
              + data[i].no + ' data-name=' + data[i].name + '>' + data[i].name + '</a></td>'
              + '<td scope="row">' + data[i].manufacturer.name + '</td>';
        html += '</tr>';
      }
      tbody.html(html);
    }
  })
};

$(document.body).bind('loaded', ()=>{
  $('#lageCtgSelect').change(function() {
    var state = $('#lageCtgSelect option:selected').val();
    // console.log('state => '+ state);
    for(var i=5; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').show(); }
    if (state == '1'){
      for(var i=5; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else if (state == '2'){
      for(var i=1; i<=4; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=9; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else if(state == '3'){
      for(var i=1; i<=8; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
      for(var i=13; i<=16; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); }
    } else { for(var i=1; i<=12; i++){ $('#smallCtgSelect').find('[value='+i+']').hide(); } }
  })

  // 검색 기능
  $('#search-btn').click(function(){
    $.get('/bitcamp-team-project/app/json/product/list?largeNo=' 
        + $('#lageCtgSelect option:selected').val()
        + '&smallNo=' + $('#smallCtgSelect option:selected').val() 
        + '&productName=' 
        + $('#searchWord').val() , function(obj){
          $(tbody).empty();
          paging(obj);
          $(document.body).trigger('loaded-search-list');
        }) // get
  }) // click
  afterLoadedClickEvent();

}) // bind


$(document.body).bind('loaded-search-list', ()=> {
  afterLoadedClickEvent();
}) // bind



function afterLoadedClickEvent(){
  $('.product-a-class').click((e) => {
    location.href= 'view.html?no=' + $(e.target).attr('data-no') +'&name=' + $(e.target).attr('data-name');
  })
}


