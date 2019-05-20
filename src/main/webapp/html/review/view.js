var tbody = $('tbody'),
    templateSrc = $('#select-template').html();
var trGenerator = Handlebars.compile(templateSrc);
var detailNo = getQuerystring('no');
var productName = decodeURIComponent(getQuerystring('name'));
var pageNo = 1,
pageSize = 10,
totalPage = 1,
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage');

function loadList(pn) {
$.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo + 
    '&pageSize=' + pageSize +
    '&pageNo=' + pn, (obj) => {
      
      console.log(detailNo);
      //page
      pageNo = obj.pageNo;
      totalPage = obj.totalPage;
      
      var currpage = pageNo % 5
      
      if($('#2ndPage > a').html() > totalPage) {
        $('#2ndPage').css('display', 'none');
      } else {
        $('#2ndPage').css('display', '');
      }

      if($('#3thPage > a').html() > totalPage) {
        $('#3thPage').css('display', 'none');
      } else {
        $('#3thPage').css('display', '');
      }

      if($('#4thPage > a').html() > totalPage) {
        $('#4thPage').css('display', 'none');
      } else {
        $('#4thPage').css('display', '');
      }

      if($('#5thPage > a').html() > totalPage) {
        $('#5thPage').css('display', 'none');
      } else {
        $('#5thPage').css('display', '');
      }
      

      if (currpage == 1) {
        $('#1stPage').addClass('active');
      } else {
        $('#1stPage').removeClass('active');
      }

      if (currpage == 2) {
        $('#2ndPage').addClass('active');
      } else {
        $('#2ndPage').removeClass('active');
      }

      if (currpage == 3) {
        $('#3thPage').addClass('active');
      } else {
        $('#3thPage').removeClass('active');
      }

      if (currpage == 4) {
        $('#4thPage').addClass('active');
      } else {
        $('#4thPage').removeClass('active');
      }

      if (currpage == 0) {
        $('#5thPage').addClass('active');
      } else {
        $('#5thPage').removeClass('active');
      } 
      if (pageNo < 6) {
        prevPageLi.addClass('disabled');
      } else {
        prevPageLi.removeClass('disabled');
      } 

      var maxPage = (obj.totalPage / 5).toFixed(0) * 5
      
      if (pageNo > maxPage) {
        nextPageLi.addClass('disabled');
      } else {
        nextPageLi.removeClass('disabled');
      }
  
  console.log(obj);
  
  
  
  tbody.html('');
  $(trGenerator(obj)).appendTo(tbody);
  $('#product-name').html('');
  $('#product-name').append(productName);
  
  
  $('.review-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'view2.html?no=' +  $(e.target).attr('data-no');
  });
  
  $(document.body).trigger('loaded-list', ['pageNo', pageNo, 'totalPage', totalPage]);
  
})};

var currPage = $(document.body).bind('loaded-list', ()=> {
  currPage = pageNo;
});

var endPage = $(document.body).bind('loaded-list', ()=> {
  endPage = totalPage
});

$('#1stPage > a').click((e) => {
  e.preventDefault();
  loadList($('#1stPage > a').html());
});

$('#2ndPage > a').click((e) => {
  e.preventDefault();
  loadList($('#2ndPage > a').html());
});

$('#3thPage > a').click((e) => {
  e.preventDefault();
  loadList($('#3thPage > a').html());
});

$('#4thPage > a').click((e) => {
  e.preventDefault();
  loadList($('#4thPage > a').html());
});

$('#5thPage > a').click((e) => {
  e.preventDefault();
  loadList($('#5thPage > a').html());
});

$('#prevPage > a').click((e) => {
  e.preventDefault();
  $('#1stPage > a').text(Number($('#1stPage > a').html()) - 5);
  $('#2ndPage > a').text(Number($('#2ndPage > a').html()) - 5);
  $('#3thPage > a').text(Number($('#3thPage > a').html()) - 5);
  $('#4thPage > a').text(Number($('#4thPage > a').html()) - 5);
  $('#5thPage > a').text(Number($('#5thPage > a').html()) - 5);
  var pagecnt = $('#5thPage > a').html()
  loadList(pagecnt);
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  $('#1stPage > a').text(Number($('#1stPage > a').html()) + 5);
  $('#2ndPage > a').text(Number($('#2ndPage > a').html()) + 5);
  $('#3thPage > a').text(Number($('#3thPage > a').html()) + 5);
  $('#4thPage > a').text(Number($('#4thPage > a').html()) + 5);
  $('#5thPage > a').text(Number($('#5thPage > a').html()) + 5);
  var pagecnt = $('#1stPage > a').html()
  loadList(pagecnt);
});

loadList(1);



($.getJSON('/bitcamp-team-project/app/json/auth/user', function(obj){
    if(obj.status == 'fail') {
      $('#add-btn').hide();
    } else {
      $('#add-btn').show();
    }
}));
    

function getQuerystring(key, default_)
{
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
