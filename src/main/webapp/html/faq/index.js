/*
 * faq 
 * index javascript
 * 
 */
/*
if(document.referrer.includes('auth/login')) {
  if (self.name != 'reload') {
    self.name = 'reload';
    self.location.reload(true);
  } else self.name = '';
}
 */
var faqTypeeSrc = $('#faq-type-template').html(),
    faqTypeGenerator = Handlebars.compile(faqTypeeSrc),
    faqSrc = $('#faq-template').html(),
    faqGenerator = Handlebars.compile(faqSrc);

var userType = sessionStorage.getItem('type');

$(document).ready(function(){
  
  $('.faq-add-btn').click(function() {
    location.href='add.html';
  })
  
  $.get('/bitcamp-team-project/app/json/faq/list', function(obj){
    console.log(obj);
    if (obj.faqCtg.length == 0){
      $('.faq-type-div').append('<p>등록된 category 없습니다</p>')
    }
    
    if (obj.list.length == 0) {
      $('#faq-div').append('<p>등록된 FAQ가 없습니다</p>')
    }
    
    $(faqTypeGenerator(obj)).appendTo($('.faq-type-div'));
    $(faqGenerator(obj)).appendTo('.faq-div');
    $('.faq-contents').hide();

    faqTitleClick();
    
    $(document.body).trigger({
      type: 'loaded-type',
      obj: obj
    });
  }) // get
  
}); // ready


// trigger 2개 bind
$(document.body).bind('loaded-type', function(obj) {
  if (window.userType != '3'){
    $('.managerDiv').hide();
    $('.faq-add-btn').hide();
  }

  
  $('.faq-delete-btn').off().click(function(e) {
    $.get('/bitcamp-team-project/app/json/faq/delete?no=' + $(e.target).attr('data-no'), function(obj){
      if(obj.status == 'success') {
        location.reload();
      } else {
        swal('삭제실패', '삭제에 문제가 발생했습니다\n' + obj.message, "warning");
      }
    }) // get
  }) // click
  
  
  $('.faq-update-btn').off().click(function(e) {
    var contents = $(e.target).closest('div').prev().text();
    var title = $(e.target).parents('.faq-contents').prev().children().first().attr('data-title');
    console.log(title);
    $(e.target).closest('div').prev().remove();
    $(e.target).closest('div').before('<textarea id="faq-contents-textarea" rows="5" cols="50">' + contents + '</textarea>');
    $(e.target).before('<button id="faq-add-temp-btn" class="btn btn-primary btn-sm">등록</button>')
    $(e.target).remove();
    
    $('#faq-add-temp-btn').off().click(function(){
      $.post('/bitcamp-team-project/app/json/faq/update', {
        no: $(e.target).attr('data-no'),
        title: title,
        contents: $('#faq-contents-textarea').val(),
        qcNo: $(e.target).attr('data-ctype')
      }, function(data) {
        if(data.status == 'success') {
          location.reload();
        } else {
          alert('변경실패.\n' + data.message);
        }
      }, "json")
    }) // click
  }) // click

  
  $('.faq-type').off().click(function(e) {
    if ($(e.target).attr('data-no') == 5) {
      $(e.target).next().next().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).next().next().next().next().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).next().next().next().next().next().next().css('font-size', '1em').css('font-style', 'normal');
    } else if ($(e.target).attr('data-no') == 6) {
      $(e.target).prev().prev().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).next().next().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).next().next().next().next().css('font-size', '1em').css('font-style', 'normal');
    } else if ($(e.target).attr('data-no') == 7) {
      $(e.target).prev().prev().prev().prev().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).prev().prev().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).next().next().css('font-size', '1em').css('font-style', 'normal');
    } else if ($(e.target).attr('data-no') == 8) {
      $(e.target).prev().prev().prev().prev().prev().prev().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).prev().prev().prev().prev().css('font-size', '1em').css('font-style', 'normal');
      $(e.target).prev().prev().css('font-size', '1em').css('font-style', 'normal');
    }
    $(e.target).css('font-size', '1.5em');
    $(e.target).css('font-style', 'bold');
    
    $('.faq-div').children().remove();
    $.get('/bitcamp-team-project/app/json/faq/categoryList?no=' + $(e.target).attr('data-no'), function(obj) {
      console.log(obj);
      $(faqGenerator(obj)).appendTo('.faq-div');
      $('.faq-contents').hide();
      
      faqTitleClick();
    }); // get
  }) // click
}) // bind



function faqTitleClick() {
  $('.faq-title > p').one('click', function(e) {
    console.log($(e.target));
    //'<i class="fas fa-angle-down"></i>'
    $(e.target).find('i').replaceWith('<i class="fas fa-angle-down mr-sm-2"></i>');
    $(e.target).css('font-size', '1.5em');
    $(e.target).css('font-style', 'bold');
    $(e.target).closest('div').before('<hr class="head-line">');
    $(e.target).closest('div').next().show();
    $(e.target).closest('div').next().after('<hr class="head-line">')
    
    $(document.body).trigger({
      type: 'loaded-type'
    });
  }); // click
}





