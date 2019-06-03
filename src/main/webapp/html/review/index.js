var tr = $('#ohr-card-tr').html(),
cardDiv = $('#card-div'),
trGenerator = Handlebars.compile(tr);

$(document).ready(function(){
  $('.multiple-items').slick({
    infinite: true,
    autoplay: false, 
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true
  });
})

function loadList() {
  $.getJSON('../../app/json/review/list?keyword=' + $('#keyword').val(), 
          function (obj){
    console.log(obj)
    
    cardDiv.html('');
    $(trGenerator(obj)).appendTo(cardDiv);
    
    });
    $(document.body).trigger('loaded-list');
  };


//detail 링크
$(document.body).bind('loaded-list', () => {

  $('.bit-view-link').click((e) => {
    window.location.href = 'proView.html?no=' + 
    $(e.target).attr('data-no');
  });
});


$('#keyword').keydown((e) => {
  if (event.keyCode == 13) {
    e.preventDefault();
    loadList();
  }
});

//검색
$('#search-btn').click((e) => {
  loadList();
});

loadList();