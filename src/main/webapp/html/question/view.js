
var param = location.href.split('?')[1];
if (param) {
  $('h3').html("1:1 문의");
} else {
  $('h3').html("문의 하기");
}