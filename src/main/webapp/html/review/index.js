var tr = $('#ohr-card-tr').html(),
cardDiv = $('#card-div'),
trGenerator = Handlebars.compile(tr);


$(document).ready(function(){
})

function loadList() {
  $.getJSON('../../app/json/review/list?keyword=' + $('#keyword').val(), 
          function (obj){
    console.log(obj)

    cardDiv.html('');
    $(trGenerator(obj)).appendTo(cardDiv);

    cardDiv.slick({
      infinite: false,
      autoplay: false, 
      slidesToShow: 5,
      slidesToScroll: 3,
      arrows: true
    });
    

  });
  $(document.body).trigger('loaded-list');
};


//detail 링크
$(document.body).bind('loaded-list', () => {

  $('.bit-view-link').click((e) => {
    window.location.href = 'prodView.html?no=' + 
    $(e.target).attr('data-no');
  });
});


$('#keyword').keydown((e) => {
  if (event.keyCode == 13) {
    e.preventDefault();
    cardDiv.slick('unslick');
    loadList();
  }
});

//검색
$('#search-btn').click((e) => {
  cardDiv.slick('unslick');
  loadList();
});

loadList();