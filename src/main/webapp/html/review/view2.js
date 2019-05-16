
var detailNo = getQuerystring('no');

($.getJSON('bitcamp-team-project/app/json/review/detail?no=' + detailNo, function(data) {
  
    console.log(detailNo);
    
    $('#no').val(data.no),
    $('#title').val(data.title),
    $('#contents').val(data.contents),
    $('#createdDate').val(data.createdDate),
    $('#viewCount').val(data.viewCount);
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

