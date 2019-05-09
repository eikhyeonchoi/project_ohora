/*
 * faq 
 * index javascript
 * 
 */
var tbody = $('tbody'),
    templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);

($.getJSON('/bitcamp-team-project/app/json/faq/list', (obj) => {
  console.log(obj);
  $(trGenerator(obj)).appendTo(tbody);
  $(document.body).trigger('loaded-list');
}));


$(document.body).bind('loaded-list', () => {
  $('.faq-a-class').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
      $(e.target).attr('data-no');
  });
});

/*
(function () {
  var xhr = new XMLHttpRequest()
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;
    $(trGenerator(JSON.parse(xhr.responseText))).appendTo(tbody);
    
    console.log(JSON.parse(xhr.responseText));
  };
  
  xhr.open('GET', '/bitcamp-team-project/app/json/faq/list', true)
  xhr.send()
  
})();
*/