var allcb =  $("#all-checkBox"),
    agree = $('#agree'),
    sercb = $('#service-checkBox'),
    memcb = $('#member-checkBox');

allcb.prop("checked", false);
sercb.prop("checked", false);
memcb.prop("checked", false);

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
    alert('동의하세요!');
  }
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