

$(document.body).ready(function() {
  $(document.body).bind('loaded.loginuser', function() {
    email = sessionStorage.getItem('email');
    $('#email').val(email);

    $(document).trigger('loaded-user');
  });
});

$(document.body).bind('loaded-user', function() {
  
});

$('#cancel-btn').click(function() { 
  location.replace('/bitcamp-team-project/index.html');
});

$('#confirm-btn').click(function() {
  $.getJSON("/bitcamp-team-project/app/json", function(data) {
    
  }, "json");
});