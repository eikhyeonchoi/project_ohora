var tbody = $('tbody'),
     addBtn = $('add-btn')
     
$.getJSON('/bitcamp-team-project/app/json/question/list', function(data) {
  console.log(data);
})