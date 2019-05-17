var tbody = $('tbody'),
    templateSrc = $('#select-template').html();
var trGenerator = Handlebars.compile(templateSrc);
var detailNo = getQuerystring('no');
var productName = decodeURIComponent(getQuerystring('name'));

($.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo, (obj) => {
  console.log(obj);
  
  $('#product-name').append(productName)
  
  $(trGenerator(obj)).appendTo(tbody);
  
  $('.review-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'view2.html?no=' +  $(e.target).attr('data-no');
  });
  
}));

($.getJSON('/bitcamp-team-project/app/json/auth/user', function(obj){
    if(obj.status == 'fail') {
      $('#add-btn').hide();
    } else {
      $('#add-btn').show();
    }
}));
    


function getQuerystring(key, default_)
{
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
