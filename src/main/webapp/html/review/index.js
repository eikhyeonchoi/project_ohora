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
    
    //prodView 링크
    $('#ohr-view-link').off().click((e) => {
      window.location.href = 'prodView.html?no=' + 
      $(e.target).attr('data-no');
    });

  });
  $(document.body).trigger('loaded-list');
};


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