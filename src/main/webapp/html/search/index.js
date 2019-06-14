var tbody = $('tbody'),
keyword = decodeURIComponent(getQuerystring('keyword')),
templateSrc = $('#tr-template-product').html(),
trGenerator = Handlebars.compile(templateSrc),
page = $('#pagination-container');

$(document).ready(function() {
  $('#keyword').html('');
  $('#keyword').html(keyword);
}); // ready

(function loadList() {
  $.getJSON('../../app/json/search/list?keyword=' + keyword,
          function (obj){
    console.log(obj.prodList)
    page.pagination({
      dataSource: obj.prodList,
      locator: 'prodList',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        tbody.children().remove();
        var pageObj = {prodList: data};
        $(trGenerator(pageObj)).appendTo(tbody);
      }
    });
    $(document.body).trigger('loaded-list');
  });
})();

//detail 링크
$(document.body).bind('loaded-list', () => {

  $('.bit-view-link').click((e) => {
    window.location.href = 'view.html?no=' + 
    $(e.target).attr('data-no');
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



