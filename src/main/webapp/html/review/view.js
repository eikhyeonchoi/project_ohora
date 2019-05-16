var tbody = $('tbody'),
    templateSrc = $('#select-template').html();
var detailNo = location.href.split('?')[1];
var trGenerator = Handlebars.compile(templateSrc);

($.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo.split('=')[1], (obj) => {
  console.log(obj);
  console.log(detailNo);
  
  $(trGenerator(obj)).appendTo(tbody);

}));
   
  
  
//  $.getJSON('/bitcamp-team-project/app/json/auth/user', function(obj) {
//    if(obj.status == "fail") {
//      $('.satisfy-a-class').hide();
//    }
//  })
      
  
  // add.html로 제품번호(detailNo) 넘기기
//  $('.satisfy-a-class').click((e) => {
//    e.preventDefault();
//    window.location.href = 'add.html?' +  detailNo;
//  });
//}));
