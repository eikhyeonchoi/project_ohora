var tbody = $('tbody'),
    templateSrc = $('#select-template').html();
var detailNo = location.href.split('?')[1];
var trGenerator = Handlebars.compile(templateSrc);

var total = 0,
    satisAver = 0,
    price = 0;

($.getJSON('/bitcamp-team-project/app/json/satisfy/detail?no=' + detailNo.split('=')[1], (obj) => {
  console.log(obj);
  console.log(detailNo);
  
  $(trGenerator(obj)).appendTo(tbody);
  for (var el of obj.list) {
    total += el.asStf + el.design + el.level + el.priceStf + el.understand + el.useful;
    price += el.priceStf;
    // price = price + el.priceStf;
  }
  satisAver = total / (obj.totalColumn * 6);
  price = price / (obj.totalColumn);
  
  console.log('총 만족도 => ' + satisAver.toFixed(2));
  console.log('가격 만족도 => ' + price.toFixed(2));
  
  // add.html로 제품번호(detailNo) 넘기기
  $('.satisfy-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'add.html?' +  detailNo;
  });
}));


/*
($.getJSON('/bitcamp-team-project/app/json/satisfy/detail?no=' + addNo.split('=')[1], (obj2) => {
  console.log(obj2);
});
($.getJSON('/bitcamp-team-project/app/json/satisfy/list', (obj) => {
  $(document.body).trigger('loaded-list');
}));


$(document.body).bind('loaded-list', () => {
  $('.satisfy-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'add.html?no=' + 
      $(e.target).attr('data-no');
  });
});
*/


/*

$(document.body).bind('loaded-list', () => {
  $('.satisfy-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
      $(e.target).attr('data-no');
  });
});
*/