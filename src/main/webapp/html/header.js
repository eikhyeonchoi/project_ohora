//헤더 가져오기
(function () {
  // 헤더 가져오는 코드
  var xhr = new XMLHttpRequest();

  // 리스너 역할을 선언해준다.
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200)
      return;

    document.querySelector('.bit-main-header').innerHTML = xhr.responseText;

    var e = new Event('loaded.header');
    document.body.dispatchEvent(e)
  };
  xhr.open('GET', '/bitcamp-team-project/html/header.html', true);
  xhr.send()
})();

