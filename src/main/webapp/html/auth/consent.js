var allcb =  $("#all-checkBox"),
agree = $('#agree'),
sercb = $('#service-checkBox'),
memcb = $('#member-checkBox');

$(document).ready(function() {
  allcb.prop("checked", false);
  sercb.prop("checked", false);
  memcb.prop("checked", false);
  $("#ohora1-consent-div").load("ohora1Consent.html");
  $("#ohora2-consent-div").load("ohora2Consent.html");
  $("#ohora3-consent-div").load("ohora3Consent.html");
});

allcb.click(function() {
  setTerms()
});

sercb.click(function() {
  viewTerms()
});

memcb.click(function() {
  viewTerms()
});

agree.click(function() {
  if (allcb.is(":checked")) {
    location.href = '/bitcamp-team-project/html/member/form.html';
  } else {
    swal({
      title: "필수 약관에 모두 동의해주세요.",
      icon: "error",
      button: "확인",
    });
  }
})

$('#cancle').click(function() {
  location.replace('/bitcamp-team-project/index.html');
})

function viewTerms() {
  if (memcb.is(":checked") && sercb.is(":checked")) {
    allcb.prop("checked",true);
  } else {
    allcb.prop("checked",false);
  }
}

function setTerms() {
  if (allcb.is(":checked")){
    sercb.prop("checked", true);
    memcb.prop("checked", true);
  } else {
    sercb.prop("checked", false);
    memcb.prop("checked", false);
  }
}

