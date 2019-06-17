var keyword = decodeURIComponent(getQuerystring('keyword'));

$(document).ready(function() {
  $('#keyword').html('');
  $('#keyword').html(keyword);
}); // ready

(function loadList() {
  $.getJSON('../../app/json/search/list?keyword=' + keyword,
          function (obj){
    console.log(obj);
    console.log(obj.tipList);

    var prodTrGenerator = Handlebars.compile($('#tr-template-product').html());

    $('#pagination-container-prod').pagination({
      dataSource: obj.prodList,
      locator: 'prodList',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        $('#ohr-prod-tbody').children().remove();
        var pageObj = {prodList: data};
        $(prodTrGenerator(pageObj)).appendTo($('#ohr-prod-tbody'));
      }
    });
    
    var manuTrGenerator = Handlebars.compile($('#tr-template-manual').html());
    
    $('#pagination-container-manu').pagination({
      dataSource: obj.manuList,
      locator: 'manuList',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        $('#ohr-manu-tbody').children().remove();
        var pageObj = {manuList: data};
        $(manuTrGenerator(pageObj)).appendTo($('#ohr-manu-tbody'));
      }
    });
    
    $('#pagination-container-review').pagination({
        dataSource: obj.revList,
        locator: 'revList',
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
          $('#ohr-review-tbody').children().remove();
          var pageObj = {revList: data};
          $(manuTrGenerator(pageObj)).appendTo($('#ohr-review-tbody'));
        }
      });
    
    $('#pagination-container-tip').pagination({
        dataSource: obj.tipList,
        locator: 'tipList',
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
          $('#ohr-tip-tbody').children().remove();
          var pageObj = {tipList: data};
          $(manuTrGenerator(pageObj)).appendTo($('#ohr-tip-tbody'));
        }
      });

    $(document.body).trigger('loaded-list');

  });
})();

//detail 링크
$(document.body).bind('loaded-list', () => {

  $('.bit-prod-view-link').click((e) => {
    window.location.href = '/bitcamp-team-project/html/product/newView2.html?no=' + 
    $(e.target).attr('data-no') + '?name=' + $(e.target).attr('data-name');
  });
  
  //링크 수정
  $('.bit-manu-view-link').click((e) => {
	    window.location.href = '/bitcamp-team-project/html/product/newView2.html?no=' + 
	    $(e.target).attr('data-no') + '?name=' + $(e.target).attr('data-name');
	  });
  
  $('.bit-rev-view-link').click((e) => {
	    window.location.href = '/bitcamp-team-project/html/product/newView2.html?no=' + 
	    $(e.target).attr('data-no') + '?name=' + $(e.target).attr('data-name');
	  });
  
  $('.bit-tip-view-link').click((e) => {
	    window.location.href = '/bitcamp-team-project/html/product/newView2.html?no=' + 
	    $(e.target).attr('data-no') + '?name=' + $(e.target).attr('data-name');
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



