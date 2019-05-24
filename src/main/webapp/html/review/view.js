var tbody = $('tbody'),
    templateSrc = $('#select-template').html(),
    pageNavSrc = $('#tr-pageNav').html(),
    detailNo = getQuerystring('no'),
    productName = decodeURIComponent(getQuerystring('name')),
    addBtn = $('#review-add-btn');

var trGenerator = Handlebars.compile(templateSrc),
    pageGenerator = Handlebars.compile(pageNavSrc);

var pageNo = 1,
    pageSize = 10,
    totalPage = 1,
    keyword = $('keyword'),
    tbody = $('tbody'),
    currSpan = $('#currPage > span');

function loadList(pn) {
$.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo + 
    '&pageSize=' + pageSize +
    '&pageNo=' + pn +
    '&keyword=' + $('#keyword').val() + 
    '&searchType=' + $('#searchType').val(), (obj) => {
      
//      console.log(detailNo);
//      console.log(obj.list);
//      page
      pageNo = obj.pageNo;
      totalPage = obj.totalPage;
      var currpage = pageNo % 5;
      
      console.log('pageNo : ' + pageNo);
      console.log('totalPage : ' + totalPage);
      
      tbody.html('');
      $(trGenerator(obj)).appendTo(tbody);
      
      //page 버튼이 있을 경우 append 안 함
      if($(document).find('#pageUl').find('#prevPage').val() != 0) {
      $(pageGenerator(obj)).appendTo($('#pageUl'))
      }
      
      console.log(obj);
      
      for(var no of obj.nos) {
        
        if($('#page-' + no + ' > a').html() > totalPage) {
          $('#page-' + no).hide();
       } else {
         $('#page-' + no).show();
        }
        
        if ($('#page-' + no + ' > a').html() == pageNo) {
          $('#page-' + no + ' > a').parent().addClass('active');
        } else {
          $('#page-' + no + ' > a').parent().removeClass('active');
        }
      } //for
      
      if (pageNo < 6) {
        $('#prevPage').addClass('disabled');
      } else {
        $('#prevPage').removeClass('disabled');
      } 
      
      var maxPage = ((totalPage / 5).toFixed(0) * 5) % 5  == 0 && ((totalPage / 5).toFixed(0) * 5) / 5 == 1  
      ? ((totalPage / 5).toFixed(0) * 5) - 5 
      : (totalPage / 5).toFixed(0) * 5;
      
      console.log('maxPage : ' + maxPage);
      
      
      if (pageNo > maxPage) {
        $('#nextPage').addClass('disabled');
      } else {
        $('#nextPage').removeClass('disabled');
      }

  $('#product-name').html('');
  $('#product-name').append(productName);

  
  $('.review-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'view2.html?no=' +  $(e.target).attr('data-no');
  });
  
  $(document.body).trigger('loaded-list', ['pageNo', pageNo, 'totalPage', totalPage]);
  
})};

var currPage = $(document.body).bind('loaded-list', () => {
  currPage = pageNo;
});

var endPage = $(document.body).bind('loaded-list', () => {
  endPage = totalPage
});


$(document).on('click', '.ohr-page', function (e) {
  e.preventDefault();
  loadList($(e.target).html());
})


loadList(1);


$(document).on('click', '#prevPage > a', (e) => {
  e.preventDefault();
  for(var no = 1; no < 6; no++) {
    $('#page-' + no + ' > a').text(Number($('#page-' + no + ' > a').html()) - 5);
  }
  console.log($('.ohr-page > a').html())
  loadList(Number($('.ohr-page > a').html()) + 4);
});

$(document).on('click', '#nextPage > a', (e) => {
  e.preventDefault();
  for(var no = 1; no < 6; no++) {
    $('#page-' + no + ' > a').text(Number($('#page-' + no + ' > a').html()) + 5);
  }
  loadList($('.ohr-page > a').html());
});


// 검색
$('#keyword').keydown((e) => {
  if (event.keyCode == 13) {
  e.preventDefault();
  for(var no = 1; no < 6; no++) {
    $('#page-' + no + ' > a').text(no);
  }
  loadList(1);
  }
});

//검색
$('#search-btn').click((e) => {
  for(var no = 1; no < 6; no++) {
    $('#page-' + no + ' > a').text(no);
  }
  loadList(1);
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



