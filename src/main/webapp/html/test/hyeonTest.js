/**
 * 
 */

var iframeSrc = $('#ifram-template').html();

var iframeGenerator = Handlebars.compile(iframeSrc);



$(document.body).ready(function() {
  
  var obj = {
      list: [
        {
          src: 'https://www.youtube.com/watch?v=nswaBVp617o'
        },
        {
          src: 'https://www.youtube.com/watch?v=YxkpjwCDWfs'
        },
        {
          src: 'https://www.youtube.com/watch?v=2fU8lHkNhvo'
        }
      ]
  }; 
  
  console.log(obj);
  console.log(obj.list);
  
  $(iframeGenerator(obj)).appendTo($('#ifram-list'));
  
  
});


