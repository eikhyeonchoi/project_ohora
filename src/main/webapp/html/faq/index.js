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
var userType = 0;

$('#faq-add-btn').hide();

$(document).ready(function() {
  new WOW().init();
  
  $(document.body).bind('loaded.loginuser', function() {
    window.userType = sessionStorage.getItem('type');
    if (userType == 3){
      $('#faq-add-btn').show();
    } 
  }); // bind

  
  
  $('#faq-add-btn').click(function() {
    location.href='add.html';
  })

  $.get('/bitcamp-team-project/app/json/faq/list', function(obj){
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


$(document.body).bind('loaded-type', function(obj) {
  if (userType != 3) {
    $('.managerDiv').hide();
  } else {
    $('.managerDiv').show();
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
    var title = $(e.target).parents('.faq-contents').prev().prev().children().first().attr('data-title');
    
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
    console.log($('.faq-type-div a').length);
    
    $(e.target).css({
      'font-size': '1.6em',
      'font-style': 'bold'
    });
    
    $('.faq-type-div a').each(function(index, item) {
      $(item).not($(e.target)).css({
        'font-size': '1em',
        'font-style': 'normal'
        });
    }); // each
    
    
    
    $('.faq-div').children().remove();
    
    $.get('/bitcamp-team-project/app/json/faq/categoryList?no=' + $(e.target).attr('data-no'), function(obj) {
      console.log(obj);
      $('.faq-div').append('<h3>'+ obj.list[0].faqType.name +'</h3>');
      
      $(faqGenerator(obj)).appendTo('.faq-div');
      $('.faq-contents').hide();

      faqTitleClick();
    }); // get
    
    
  }) // click
}) // bind


function faqTitleClick() {
  $('.faq-title > p').on('click', function(e) {
    if ($(e.target).attr('data-check') == 'true') {
      $(e.target).find('i').replaceWith('<i class="fas fa-angle-down mr-sm-2"></i>');
      $(e.target).css('font-size', '1.5em');
      $(e.target).css('font-style', 'bold');
      $(e.target).closest('div').next().next().show();
      $(e.target).attr('data-check', false);
      
      $(document.body).trigger({
        type: 'loaded-type'
      });
      
    } else {
      $(e.target).find('i').replaceWith('<i class="fas fa-angle-right"></i>');
      $(e.target).css('font-size', '1em');
      $(e.target).css('font-style', 'normal');
      $(e.target).closest('div').next().next().hide();
      
      $(e.target).attr('data-check', true);
    }
  }); // click
} // faqTitleClick





