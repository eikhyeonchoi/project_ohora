var email,
leavePwd = $('#leave-pwd');

$(document.body).ready(function() {
	$(document.body).bind('loaded.loginuser', function() {
		email = sessionStorage.getItem('email');
		window.memberNo = sessionStorage.getItem('no');

		$('#leave-email').val(email);
		$(document).trigger("leaved-user");
	});
});

$(document).bind('leaved-user', function() {

	$("#real-leave-cns-btn").click(function() {
		location.replace("/bitcamp-team-project/index.html");
	});

	leavePwd.keyup(function() {
		$.getJSON("/bitcamp-team-project/app/json/member/password?email=" + email + "&&password=" + leavePwd.val(), 
				function(data) {
			if (data.status == "success"){
				$('#real-leave-btn').removeAttr("disabled");
			} else {
				$('#real-leave-btn').attr("disabled","true");
			}
		}, "json");
	});

	$('#real-leave-btn').click(function() {
		if(confirm("정말 탈퇴하시겠습니까.")) {
			$.getJSON("/bitcamp-team-project/app/json/member/secessionMember?memberNo=" + window.memberNo,
					function(data) {
				if (data.status == "success"){
					$.get('/bitcamp-team-project/app/json/auth/logout', () => {
						location.href = "/bitcamp-team-project/index.html";
						sessionStorage.clear();
					});
				} else {
					alert('실패');
				}
			}, "json");
		} else	{
			alert('아니오를 누르셨습니다');
		};
	});


});


