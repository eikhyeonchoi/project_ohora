
/*
 * fboard
 * add javascript
 * 
 */

$(document).ready(function() {
 
  
  $.get('/bitcamp-team-project/app/json/auth/user', function(obj){
    $(document.body).trigger({
      type: 'loaded-user',
      userNo: obj.user.no
    }) // trigger
  }) // get
}) // ready

$(document.body).bind('loaded-user', function(obj){
  
  $('#fboard-file-input').fileupload({
    url: '/bitcamp-team-project/app/json/fboard/add', 
    dataType: 'json',
    sequentialUploads: true,
    singleFileUploads: false,
    add: function (e, data) {
      $('#fboard-add-btn').off().click(function() {
        data.formData = {
            title: $('#title').val(),
            contents: $('#contents').val(),
            memberNo: obj.userNo
        };
        data.submit();
      });
    },
    done: function (e, data) {
      console.log(data);
      if(data.result.status == 'success'){
        location.href='index.html';
      } else { 
        alert("필수 입력값을 입력하지 않았습니다\n" + data.result.error);
      }
    }
  }) // fileupload
  
  $('#fboard-add-btn').off().click(function() {
    $.post('/bitcamp-team-project/app/json/fboard/add', {
      title: $('#title').val(),
      contents: $('#contents').val(),
      memberNo: obj.userNo
    }, function(obj) {
      if (obj.status == 'success') {
        location.href = 'index.html';
      } else {
        alert('등록 실패 입니다.\n' +  obj.message);
      }
    }, "json") 
  })
}) // bind


function fileCheckById(id){
  if($('#' + id).val() == ''){
    return false;
  } else {
    return true;
  }
}



/*
    
    $('#fboard-file-input').off().fileupload({
      url: '/bitcamp-team-project/app/json/fboard/add', 
      dataType: 'json',
      sequentialUploads: true,
      singleFileUploads: false,
      add: function (e, data) {
        $('#fboard-add-btn').click(function() {
          data.formData = {
              title: $('#title').val(),
              contents: $('#contents').val(),
              memberNo: obj.userNo
          };
          data.submit();
        });
      },
      done: function (e, data) {
        console.log(data);
        if(data.result.status == 'success'){
          location.href='index.html';
        } else { 
          alert("필수 입력값을 입력하지 않았습니다\n" + data.result.error);
        }
      }
    }) // fileupload


    $('#fboard-add-btn').off().click(function() {
      $.post('../../app/json/fboard/add', {
        title: $('#title').val(),
        contents: $('#contents').val(),
        memberNo: obj.userNo
      },
      function(data) {
        if (data.status == 'success') {
          location.href = "index.html";
        } else {
          alert('등록 실패 입니다.\n' +  data.message);
        }
      }, "json")
    }); // add click
  


 */




