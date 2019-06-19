$(document).ready(function(){

  $(document.body).bind('loaded.loginuser', function() {
    var email = sessionStorage.getItem('email');
    $('#my-email').html(email);
  });
  
  $("#leave-ck").change(function(){
    if($("#leave-ck").is(":checked")){
      $('#leave-btn').removeAttr("disabled");
    }else{
      $('#leave-btn').attr("disabled","true");
    }
  });

  $("#leave-btn").click(function() {
    location.replace("leaveId2.html");
  })
});