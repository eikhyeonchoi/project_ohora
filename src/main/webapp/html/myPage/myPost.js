var memberNo
page = $('.page-container');
var fboardBody = $('#handle-bars-fboad-body'),
fboardTemplateSrc = $('#fboard-template').html(),
fbiardGenerator = Handlebars.compile(fboardTemplateSrc);

$(document).ready(function() {
  $(document.body).bind('loaded.loginuser', function() {
    memberNo = sessionStorage.getItem('no');
    loadFboard(memberNo);
  });
});

function loadFboard(memberNo) {
  $.getJSON('/bitcamp-team-project/app/json/fboard/myPost?no=' + memberNo , function(data) {
    $('#fboard-length').html(data.list.length);
    page.pagination({
      dataSource: data,
      locator: 'list',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        fboardBody.children().remove();
        var pageObj = {list: data};
        $(fbiardGenerator(pageObj)).appendTo(fboardBody);

      } 
    }); //page.pagination
  }) //getJSON

}; //loadFboard