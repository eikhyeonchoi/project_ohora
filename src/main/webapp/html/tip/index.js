var pageNo = 1,
pageSize = 10,
totalPage = 1,
currSpan = $('#currPage > span'),
tbody = $('tbody'),
templateSrc = $('#tr-template').html(),
pageNavSrc = $('#tr-pageNav').html(); 

var trGenerator = Handlebars.compile(templateSrc),
pageGenerator = Handlebars.compile(pageNavSrc);

function loadList(pn) {
  console.log(pageNo);
  $.getJSON('../../app/json/tip/list?pageNo=' + pn + "&pageSize=" + pageSize, 
      function(obj) {

    pageNo = obj.pageNo;
    totalPage = obj.totalPage;
    var currpage = pageNo % 5;

    tbody.html(''); 
    $(trGenerator(obj)).appendTo(tbody);

    if ($(document).find('#pageUI').find('#prevPage').val() != 0) {
      $(pageGenerator(obj)).appendTo($('#pageUI'));
    }

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

    var maxPage = ((obj.totalPage / 5).toFixed(0) * 5) % 5 == 0 
    ? ((obj.totalPage / 5).toFixed(0) * 5) - 5 
        : ((obj.totalPage / 5).toFixed(0) * 5) * 5;

    if (pageNo > maxPage) {
      $('#nextPage').addClass('disabled');
    } else {
      $('#nextPage').removeClass('disabled');
    }

    //$(document.body).trigger('loaded-list');
  });
} // loadList

var currPage = $(document.body).bind('loaded-list', () => {
  currPage = pageNo;
})

var endPage = $(document.body).bind('loaded-list', () => {
  endPage = totalPage;
})

$(document).on('click', '.ohr-page', function (e) {
  e.preventDefault();
  loadList($(e.target).html());
});

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

$(document.body).bind('loaded-list', () => {
  var alist = $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });
});

$('#search-btn').click((e) => {
  e.preventDefault();
  search($('select#searchTag').val(), $('#search').val());
});

function search(cond, val) {
  $.getJSON('/bitcamp-team-project/app/json/tip/search?searchType=' 
      + cond + '&keyword=' + val
      , function(data) {
        if (data.status == 'success') {
          console.log(data.searchList);
          tbody.html('');
          $(trGenerator(data)).appendTo(tbody);

          $(document.body).trigger('loaded-list');
        } else {
          alert('오류입니다!\n' + data.error);
        }
      });
}
loadList(1);


