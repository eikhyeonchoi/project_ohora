//footer 가져오기
$(document.body).ready(function() {
  $('.ohr-footer').load('/bitcamp-team-project/html/footer.html',
      function (){
    $(document.body).trigger('loaded.footer');
  });
});







