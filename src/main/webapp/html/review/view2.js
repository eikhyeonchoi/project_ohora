var detailNo = getQuerystring('no');

($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
    console.log(data);
    $('#review-no').val(data.no),
    $('#review-title').val(data.title),
    $('#review-contents').val(data.contents),
    $('#review-createdDate').val(data.createdDate),
    $('#review-viewCount').val(data.viewCount);
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

