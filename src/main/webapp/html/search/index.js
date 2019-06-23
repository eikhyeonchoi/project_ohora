var keyword = decodeURIComponent(getQuerystring('keyword'));

$(document).ready(function() {
  $('#keyword').html('');
  $('#keyword').html(keyword);
}); // ready

(function loadList() {
  $.getJSON('../../app/json/search/list?keyword=' + keyword,
          function (obj){
    console.log(obj);
    console.log(obj.prodList.length);


    if(obj.prodList.length > 0) {
      var prodTrGenerator = Handlebars.compile($('#tr-template-product').html());

      $('#pagination-container-prod').pagination({
        dataSource: obj.prodList,
        locator: 'prodList',
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
          $('.ohr-prod-tbody').children().remove();
          var pageObj = {prodList: data};
          $(prodTrGenerator(pageObj)).appendTo($('.ohr-prod-tbody'));
        }
      });
    } else {
    	$('#nav-product-tab').addClass('disabled');
      $('#prod-table-list').remove();
      $('#ohr-search-prod').remove();
      $('#ohr-search-a-prod').append('<p class="ohr-search-nolist">검색 결과가 없습니다.</p>');
    }


    if(obj.manuList.length > 0) {
      var manuTrGenerator = Handlebars.compile($('#tr-template-manual').html());

      $('#pagination-container-manu').pagination({
        dataSource: obj.manuList,
        locator: 'manuList',
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
          $('.ohr-manu-tbody').children().remove();
          var pageObj = {manuList: data};
          $(manuTrGenerator(pageObj)).appendTo($('.ohr-manu-tbody'));
        }
      });
    } else {
    	$('#nav-manual-tab').addClass('disabled');
      $('#manu-table-list').remove();
      $('#ohr-search-manu').remove();
      $('#ohr-search-a-manu').append('<p class="ohr-search-nolist">검색 결과가 없습니다.</p>');
    }

    if(obj.revList.length > 0) {
      var revTrGenerator = Handlebars.compile($('#tr-template-review').html());

      $('#pagination-container-review').pagination({
        dataSource: obj.revList,
        locator: 'revList',
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
          $('.ohr-review-tbody').children().remove();
          var pageObj = {revList: data};
          $(revTrGenerator(pageObj)).appendTo($('.ohr-review-tbody'));
        }
      });
    } else {
    	$('#nav-review-tab').addClass('disabled');
      $('#rev-table-list').remove();
      $('#ohr-search-rev').remove();
      $('#ohr-search-a-rev').append('<p class="ohr-search-nolist">검색 결과가 없습니다.</p>');
    }

    if(obj.tipList.length > 0) {
      var tipTrGenerator = Handlebars.compile($('#tr-template-tip').html());

      $('#pagination-container-tip').pagination({
        dataSource: obj.tipList,
        locator: 'tipList',
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
          $('.ohr-tip-tbody').children().remove();
          var pageObj = {tipList: data};
          $(tipTrGenerator(pageObj)).appendTo($('.ohr-tip-tbody'));
        }
      });
    } else {
    	$('#nav-tip-tab').addClass('disabled');
      $('#tip-table-list').remove();
      $('#ohr-search-tip').remove();
      $('#ohr-search-a-tip').append('<p class="ohr-search-nolist">검색 결과가 없습니다.</p>');
    }

    $(document.body).trigger('loaded-list');

  });
})();

//detail 링크
$(document.body).bind('loaded-list', () => {

  $('.bit-prod-view-link').click((e) => {
    window.location.href = '/bitcamp-team-project/html/product/newView2.html?no=' + 
    $(e.target).parent().attr('data-no') + '&name=' + $(e.target).parent().attr('data-name');
  });

  $('.bit-manu-view-link').click((e) => {
    window.location.href = '/bitcamp-team-project/html/manual/view.html?no=' + 
    $(e.target).parent().attr('data-no');
  });

  $('.bit-rev-view-link').click((e) => {
    window.location.href = '/bitcamp-team-project/html/review/view.html?no=' + 
    $(e.target).parent().attr('data-no');
  });

  $('.bit-tip-view-link').click((e) => {
    window.location.href = '/bitcamp-team-project/html/tip/view.html?no=' + 
    $(e.target).parent().attr('data-no');
  });
});

$(document.body).bind('loaded-list', () => {
  
  $('#ohr-search-prod').click((e) => {
    $('#nav-all-tab').removeClass('active');
    $('#nav-product-tab').addClass('active');
  });

  $('#ohr-search-manu').click((e) => {
    $('#nav-all-tab').removeClass('active');
    $('#nav-manual-tab').addClass('active');
  });

  $('#ohr-search-rev').click((e) => {
    $('#nav-all-tab').removeClass('active');
    $('#nav-review-tab').addClass('active');
  });

  $('#ohr-search-tip').click((e) => {
    $('#nav-all-tab').removeClass('active');
    $('#nav-tip-tab').addClass('active');
  });
});

function getQuerystring(key, default_){
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} // getQuerystring



