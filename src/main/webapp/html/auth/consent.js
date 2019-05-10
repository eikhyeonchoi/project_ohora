var allcb =  $("#all-checkBox");
var agree = $('#agree');
var sercb = $('#service-checkBox');
var memcb = $('#member-checkBox');
allcb.prop("checked", false);
sercb.prop("checked", false);
memcb.prop("checked", false);

allcb.click(function() {
  if ( allcb.is(":checked")){
    sercb.prop("checked", true);
    memcb.prop("checked", true);
  } else {
    sercb.prop("checked", false);
    memcb.prop("checked", false);
  }

});

sercb.click(function() {
  viewTerms()
});

memcb.click(function() {
  viewTerms()
});

agree.click(function() {
  if (allcb.is(":checked")) {
    location.href = 'www.naver.com';
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