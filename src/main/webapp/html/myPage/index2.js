var no,
companyName = $('#companyName'),
homePage = $('#homepage'),
registerNo = $('#registerNo'),
add1 = $('#address1'),
add2 = $('#address2'),
add3 = $('#address3'),
add4 = $('#address4'),
addressS,
address,
adsSerachBtn = $('#postcodify_search_button'),
realUdtBtn = $('#real-udt-btn'),
udtBtn = $('#udt-btn'),
cnBtn = $('#udt-cn-btn');

$(document).ready(function() {
  realUdtBtn.hide();
  adsSerachBtn.css('visibility','hidden');

  $(document.body).bind('loaded.loginuser', function() {
    no = sessionStorage.getItem('no');
    loadData(no);

    $(document).trigger('loaded-data'); 
  });
});

function loadData(no) {
  $.getJSON('/bitcamp-team-project/app/json/manufacturer/findByMemberNo?no=' + no, function(data) {
    companyName.val(data.manufacturer.name);
    homePage.val(data.manufacturer.homePage);
    registerNo.val(data.manufacturer.registerNo);
    addressS = data.manufacturer.address;
    address = addressS.split("/");
    add1.val(address[0]);
    add2.val(address[1]);
    add3.val(address[2]);
    add4.val(address[3]);
  });
};

$(document).bind('loaded-data', function() {

  companyName.keyup(function() {
    realUdtCk();
  });

  homePage.keyup(function() {
    realUdtCk();
  });

  registerNo.keyup(function() {
    if (registerNo.val().length == 10) {
      registerNo.val(registerNo.val().substring(0, 9));
    } 
    realUdtCk();
  });

  function realUdtCk() {
    if (companyName.val() == "" || homePage.val() == "" || registerNo.val() == "") {
      realUdtBtn.attr('disabled',true);
    } else {
      realUdtBtn.attr('disabled',false);
    }
  };

  cnBtn.click(function() {
    location.replace('/bitcamp-team-project/index.html'); 
  });

  udtBtn.click(function() {
    udtBtn.hide();
    realUdtBtn.show();
    adsSerachBtn.css('visibility','visible');
    companyName.removeAttr('readonly');
    homePage.removeAttr('readonly');
    registerNo.removeAttr('readonly');
    add3.removeAttr('readonly');
  });

  realUdtBtn.click(function() {
    $.post('/bitcamp-team-project/app/json/manufacturer/update',{
      memberNo: no,
      name: companyName.val(),
      homePage: homePage.val(),
      registerNo: registerNo.val(),
      address: (add1.val() + "/" + add2.val() + "/" + add3.val() + "/" + add4.val())
    },function(data) {
      if(data.status == 'success'){
        realUdtBtn.hide();
        udtBtn.show();
        adsSerachBtn.css('visibility','hidden');
        companyName.attr('readonly',true);
        homePage.attr('readonly',true);
        registerNo.attr('readonly',true);
        add3.attr('readonly',true);
      } else {
        alert("변경중 오류가 발생했습니다." + data.message);
      }
    }, "json");
  });

}); //bind(loaded-data)




