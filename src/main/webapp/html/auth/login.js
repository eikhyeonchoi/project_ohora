var searchName = $('#pwd-search-name'),
searchemail = $('#pwd-search-email'),
searchName2,
searchemail2;
$(document).ready(function() {
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	if (window.localStorage.getItem('email')) {
		$('#email').val(localStorage.email);
	}

	window.fbAsyncInit = function() {
		console.log("window.fbAsyncInit() 호출됨!");
		FB.init({
			appId      : '440057900129999', // 개발자가 등록한 앱 ID
			cookie     : true,  
			xfbml      : true,  
			version    : 'v3.3' 
		});
		FB.AppEvents.logPageView();
	};
});

$('#login-btn').click(() => {
	$.post('../../app/json/auth/login', {
		email: $('#email').val(),
		password: $('#password').val()
	}, 
	function(data) {
		if ($('#saveEmail').is(":checked")) {
			window.localStorage.email = $('#email').val();
		} else {
			window.localStorage.removeItem("email");
		}
		if (data.status == 'success') {
			var prevLoc = document.referrer;
			location.href = prevLoc;
		} else {
			alert('로그인 실패입니다!\n' + data.message);
		}
	})
});


$('#password-search').click(function(e) {
	e.preventDefault();
	$('.pwd-search-moadl').modal();
	$('#password-search-btn').click(function() {
		searchName2 = searchName.val();
		searchemail2 = searchemail.val();
		$.getJSON('/bitcamp-team-project/app/json/member/forgetPassword?name='
				+ searchName.val() + "&email=" + searchemail.val(),
				function(data) {
					if (data.status == 'success') {
						alert('메일을 확인해주세요.');
						$.getJSON('/bitcamp-team-project/app/json/member/forgetPasswordEmailSend?name='
								+ searchName2 + "&email=" + searchemail2,
								function(data) {
								});
						location.reload();
					} else {
						alert(data.error);
						searchName.val("");
						searchemail.val("");
					}
				}); //getJSON
	}); //('#password-search-btn').click
}); //('#password-search').click

function checkLoginState() {
	FB.getLoginStatus(function(response) { 
		console.log(response);
		if (response.status === 'connected') { // 로그인이 정상적으로 되었을 때,
			alert('로그인 됨');
			$.post("/bitcamp-team-project/app/json/member/facebook", {
				fbResponse: response
			}, function(data) {
				if (data.status == 'success') {
					location.replace('/bitcamp-team-project/index.html'); 
				} else {
					alert("오류!");
				}
			}, "json");
		} else { // 로그인이 되지 않았을 때,
			alert("로그인 되지 않았음");
		}
	});
};


