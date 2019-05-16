var tbody = $('tbody'),
    templateSrc = $('#select-template').html();
var trGenerator = Handlebars.compile(templateSrc);
var detailNo = getQuerystring('no');
var productName = decodeURIComponent(getQuerystring('name'));

($.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo, (obj) => {
  console.log(obj);
  console.log(detailNo);
  
  $('#product-name').append(productName)
  
  $(trGenerator(obj)).appendTo(tbody);
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
