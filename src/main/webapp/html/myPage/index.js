var nickName = '',
email = '',
tel = '',
name = '',
oldPwd = $('#oldPwd'),
oldPwdP = $('#oldPwd-p'),
oldPwdStatus = false,
newPwd = $('#newPwd'),
newPwdP = $('#newPwd-p'),
newPwdStatus = false,
newPwdAgree = $('#newPwd-agree'),
newPwdAgreeP = $('#newPwd-agree-p'),
newPwdAgreeStatus = false;
var tels = null,
regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
getName= RegExp(/^[가-힣]+$/);
var nameStatus = false;

$(document.body).ready(function() {
	$(document.body).bind('loaded.loginuser', function() {
		nickName = sessionStorage.getItem('nickName');
		email = sessionStorage.getItem('email');
		tel = sessionStorage.getItem('tel');
		name = sessionStorage.getItem('name');
		pwdUpdateDate = sessionStorage.getItem('pwdUpdateDate');
		window.memberNo = sessionStorage.getItem('no');

		$('#user-nickName').html(nickName);
		$('#user-email').html(email);
		$('#user-tel').html(tel);
		if (pwdUpdateDate.length == 4) {
			$('#date-dd').html("변경하신적이 없습니다.");
		} else {
			$('#date-dd').html(pwdUpdateDate);
		}
		$(document).trigger("loaded-user");
	});
});

$(document).bind('loaded-user', function() {
	$('#psw-update-btn').click(function() {
		$('.pwd-moadl').modal();

		$(document).trigger("view-modal");
	});

	$('#update-btn').click(function() {
		$('.member-moadl').modal();

		$(document).trigger("member-view-modal");
	});
});

$(document).bind('view-modal', function() {
	newPwd.attr('disabled',true);
	newPwdAgree.attr('disabled',true);
	$('#password-udt-btn').attr('disabled',true);

	oldPwd.keyup(function() {
		if (oldPwd.val() == "") {
			oldPwdP.html('');
			oldPwd.removeClass('is-invalid');
			oldPwd.removeClass('is-valid');
			oldPwdStatus = false;
			udtBtnCk();
		} else {
			$.getJSON("/bitcamp-team-project/app/json/member/password?email=" + email + "&&password=" + oldPwd.val(), 
					function(data) {
				if (data.status == "success"){
					oldPwdP.html('');
					oldPwd.removeClass('is-invalid');
					oldPwd.addClass('is-valid');
					newPwd.attr('disabled',false);
					newPwdAgree.attr('disabled',false);
					oldPwdStatus = true;
					udtBtnCk();
				} else {
					oldPwd.removeClass('is-valid');
					oldPwd.addClass(' is-invalid');
					newPwd.attr('disabled',true);
					newPwd.val("");
					newPwdAgree.attr('disabled',true);
					newPwdAgree.val("");
					newPwd.removeClass('is-invalid');
					newPwd.removeClass('is-valid');
					newPwdP.html("")
					newPwdAgree.removeClass('is-invalid');
					newPwdAgree.removeClass('is-valid');
					newPwdAgreeP.html("")
					oldPwdP.html('올바른 비밀번호를 입력해주세요.');
					oldPwdStatus = false;
					udtBtnCk();
				}
			}, "json");
		}
	}); //oldPwd.keyup

	newPwd.keyup(function() {
		if (newPwd.val() == "") {
			newPwdP.html('');
			newPwd.removeClass('is-invalid');
			newPwd.removeClass('is-valid');
			newPwdStatus = false;
			udtBtnCk();
		} else {
			if (!regex.test(newPwd.val())) {
				newPwdP.html('영문 대소문자, 숫자, 특수문자를 혼용하여 8~15자를 입력해주세요.');
				newPwd.removeClass('is-valid');
				newPwd.addClass(' is-invalid');
				newPwdStatus = false;
				udtBtnCk();
			} else if (newPwd.val() == oldPwd.val()) {
				newPwdP.html('이전과 같은 비밀번호를 사용하실 수 없습니다.');
				newPwd.removeClass('is-valid');
				newPwd.addClass(' is-invalid');
				newPwdStatus = false;
				udtBtnCk();
			} else {
				newPwdP.html("");
				newPwd.removeClass('is-invalid');
				newPwd.addClass('is-valid');
				newPwdStatus = true;
				udtBtnCk();
			}
		}
	}) //newPwd.keyup

	newPwdAgree.keyup(function() {
		if (newPwdAgree.val() == "") {
			newPwdAgreeP.html('');
			newPwdAgree.removeClass('is-invalid');
			newPwdAgree.removeClass('is-valid');
			newPwdAgreeStatus = false;
			udtBtnCk();
		} else {
			if (newPwdAgree.val() != newPwd.val()) {
				newPwdAgreeP.html("비밀번호를 확인해주세요.");
				newPwdAgree.removeClass('is-valid');
				newPwdAgree.addClass(' is-invalid');
				newPwdAgreeStatus = false;
				udtBtnCk();
			} else {
				newPwdAgreeP.html("");
				newPwdAgree.removeClass('is-invalid');
				newPwdAgree.addClass('is-valid');
				newPwdAgreeStatus = true;
				udtBtnCk();
			}
		}
	}) //newPwdAgree.keyup

}); //bind('view-modal')

function udtBtnCk() {
	if (oldPwdStatus == true && newPwdStatus ==true && newPwdAgreeStatus == true) {
		$('#password-udt-btn').attr('disabled',false);
	} else {
		$('#password-udt-btn').attr('disabled',true);
	}
}

$('#password-udt-btn').click(function() {
	$.post('/bitcamp-team-project/app/json/member/updatePassword',{
		no: window.memberNo,
		password: newPwd.val(),
		pwdUpdateDate: getCurrentTime()
	},function(data) {
		if(data.status == 'success'){
		  swal({
        title: "변경이 완료되었습니다.",
        icon: "success",
      });
			$.get('/bitcamp-team-project/app/json/auth/logout', () => {
				location.href = "/bitcamp-team-project/index.html";
				sessionStorage.clear();
			});

		} else { 
		  swal({
        title: "변경중 오류가 발생했습니다.",
        icon: "error",
      });
		  location.reload();
		}
	}, "json")
})

$('#password-udt-cns-btn').click(function() {
	oldPwd.val("");
	newPwd.val("");
	newPwdAgree.val("");
	$('input').removeClass('is-invalid');
	$('input').removeClass('is-valid');
	$('.pwd-p').html("");
	$('.modal').modal('hide');
	oldPwdStatus = false;
	newPwdStatus = false;
	newPwdAgreeStatus = false;
})

$(document).bind('member-view-modal', function() {
	$('#name-udt-cn-btn').hide();
	$('#name-real-udt-btn').hide();
	$('#nickName-udt-cn-btn').hide();
	$('#nickName-real-udt-btn').hide();
	$('#tel-udt-cn-btn').hide();
	$('#tel-real-udt-btn').hide();
	$('#name').val(name);
	$('#nickName').val(nickName);
	tels = tel.split("-");
	$('#tel1').val(tels[0]);
	$('#tel2').val(tels[1]);
	$('#tel3').val(tels[2]);
	$("#tel1").css("background-color","#e9ecef");
	$("#tel1").attr("onFocus", "this.initialSelect = this.selectedIndex");
	$("#tel1").attr("onChange", "this.selectedIndex = this.initialSelect");

	$('#name-udt-btn').click(function() {
		$('#name-udt-btn').hide();
		$('#name-udt-cn-btn').show();
		$('#name-real-udt-btn').show();
		$('#name').val("");
		$('#name').removeAttr("readonly");
		$('#name-real-udt-btn').attr('disabled',true);
		$(document).trigger("udt-name");
	})

	$('#nickName-udt-btn').click(function() {
		$('#nickName-udt-btn').hide();
		$('#nickName-udt-cn-btn').show();
		$('#nickName-real-udt-btn').show();
		$('#nickName').val("");
		$('#nickName').removeAttr("readonly");
		$('#nickName-real-udt-btn').attr('disabled',true);
		$(document).trigger("udt-nickName");
	});

	$('#tel-udt-btn').click(function() {
		$('#tel-udt-btn').hide();
		$('#tel-udt-cn-btn').show();
		$('#tel-real-udt-btn').show();
		$('#tel2').val("");
		$('#tel3').val("");
		$('#tel1').removeAttr("style");
		$('#tel1').removeAttr("onChange");
		$('#tel1').removeAttr("onFocus");
		$('#tel2').removeAttr("readonly");
		$('#tel3').removeAttr("readonly");
		$(document).trigger("udt-tel");
	});

	$("#member-udt-cns-btn").click(function() {
		location.reload();
	})

}); // bind(member-view-modal)

$(document).bind('udt-name', function() {

	$('#name-udt-cn-btn').click(function () {
		$('#name').val(name);
		$('#memberName-p').html('');
		$("#name").attr("readonly",true);
		$("#name").removeClass('is-valid');
		$("#name").removeClass('is-invalid');
		$('#name-udt-cn-btn').hide();
		$('#name-real-udt-btn').hide();
		$('#name-udt-btn').show();
	});

	$('#name').keyup(function() {
		if ($('#name').attr("readonly") != null){
			return;
		} else {
			if ($("#name").val() == "") {
				$('#memberName-p').html('');
				$("#name").removeClass('is-valid');
				$("#name").removeClass('is-invalid');
				$('#name-real-udt-btn').attr('disabled',true);
			} else {
				if (!getName.test($("#name").val())) {
					$('#memberName-p').html('이름을 제대로 입력해주세요.');
					$("#name").removeClass('is-valid');
					$("#name").addClass('is-invalid');
					$('#name-real-udt-btn').attr('disabled',true);
				} else {
					$('#memberName-p').html('');
					$("#name").removeClass('is-invalid');
					$("#name").addClass('is-valid');
					$('#name-real-udt-btn').attr('disabled',false);
				}
			}
		}
	});

	$('#name-real-udt-btn').click(function() {
		$.post('/bitcamp-team-project/app/json/member/updateName',{
			no: window.memberNo,
			name: $("#name").val()
		},function(data) {
			if(data.status == 'success'){
				name = $('#name').val();
				$("#name").attr("readonly",true);
				$("#name").removeClass('is-valid');
				$("#name").removeClass('is-invalid');
				$('#name-udt-cn-btn').hide();
				$('#name-real-udt-btn').hide();
				$('#name-udt-btn').show();
				logOut();
				logIn();
			} else {
			  swal({
	        title: "변경중 오류가 발생했습니다.",
	        icon: "error",
	      });
    location.reload();
			}
		}, "json")
	});
}); // bind(udt-name)

$(document).bind('udt-nickName', function() {

	$('#nickName-udt-cn-btn').click(function () {
		$('#nickName').val(nickName);
		$('#memberNickname-p').html('');
		$("#nickName").attr("readonly",true);
		$("#nickName").removeClass('is-valid');
		$("#nickName").removeClass('is-invalid');
		$('#nickName-udt-cn-btn').hide();
		$('#nickName-real-udt-btn').hide();
		$('#nickName-udt-btn').show();
	});

	$('#nickName').keyup(function() {
		if ($('#nickName').attr("readonly") != null){
			return;
		} else {
			if ($("#nickName").val() == "") {
				$('#memberNickname-p').html('');
				$("#nickName").removeClass('is-valid');
				$("#nickName").removeClass('is-invalid');
				$('#nickName-real-udt-btn').attr('disabled',true);
			} else {

				$.getJSON('../../app/json/member/nickName?nickName=' + $("#nickName").val()
						, function(data) {
					if (data != 0) {
						$('#memberNickname-p').html('닉네임 중복 사용할수 없는 닉네임 입니다.');
						$("#nickName").removeClass('is-valid');
						$("#nickName").addClass('is-invalid');
						$('#nickName-real-udt-btn').attr('disabled',true);
					} else {
						$('#memberNickname-p').html('');
						$("#nickName").removeClass('is-invalid');
						$("#nickName").addClass('is-valid');
						$('#nickName-real-udt-btn').attr('disabled',false);
					}
				}, 'json');
			}
		}
	});

	$('#nickName-real-udt-btn').click(function() {
		$.post('/bitcamp-team-project/app/json/member/updateNickname',{
			no: window.memberNo,
			nickName: $("#nickName").val()
		},function(data) {
			if(data.status == 'success'){
				nickName = $('#nickName').val();
				$("#nickName").attr("readonly",true);
				$("#nickName").removeClass('is-valid');
				$("#nickName").removeClass('is-invalid');
				$('#nickName-udt-cn-btn').hide();
				$('#nickName-real-udt-btn').hide();
				$('#nickName-udt-btn').show();
				logOut();
				logIn();
			} else {
			  swal({
	        title: "변경중 오류가 발생했습니다.",
	        icon: "error",
	      });
				location.reload();
			}
		}, "json");
	});
}); // bind(udt-nickName)

$(document).bind('udt-tel', function() {
	$('#tel-udt-cn-btn').click(function () {
		tels = tel.split("-");
		$('#tel1').val(tels[0]);
		$('#tel2').val(tels[1]);
		$('#tel3').val(tels[2]);
		$("#tel1").css("background-color","#e9ecef");
		$("#tel1").attr("onFocus", "this.initialSelect = this.selectedIndex");
		$("#tel1").attr("onChange", "this.selectedIndex = this.initialSelect");
		$("#tel2").attr("readonly",true);
		$("#tel3").attr("readonly",true);
		$('#tel-udt-cn-btn').hide();
		$('#tel-real-udt-btn').hide();
		$('#tel-udt-btn').show();
	});

	$("#tel2").keydown(function() {
		if ($("#tel2").val().length == 4) {
			$("#tel2").val($("#tel2").val().substring(0, 3));
		} 
	});

	$("#tel3").keydown(function() {
		if ($("#tel3").val().length == 4) {
			$("#tel3").val($("#tel3").val().substring(0, 3));
		} 
	});

	$('#tel-real-udt-btn').click(function() {
		var telNo = $("#tel1").val() +"-"+ $("#tel2").val() +"-"+ $("#tel3").val();
		console.log(telNo);
		$.post('/bitcamp-team-project/app/json/member/updateTel',{
			no: window.memberNo,
			tel: telNo
		},function(data) {
			if(data.status == 'success'){
				tel = telNo;
				$("#tel1").css("background-color","#e9ecef");
				$("#tel1").attr("onFocus", "this.initialSelect = this.selectedIndex");
				$("#tel1").attr("onChange", "this.selectedIndex = this.initialSelect");
				$("#tel2").attr("readonly",true);
				$("#tel3").attr("readonly",true);
				$('#tel-udt-cn-btn').hide();
				$('#tel-real-udt-btn').hide();
				$('#tel-udt-btn').show();
				logOut();
				logIn();
			} else {
			  swal({
          title: "변경중 오류가 발생했습니다.",
          icon: "error",
        });
			  location.reload();
			}
		}, "json")
	});
});

//전화번호를 **로 바꿔주는 함수
function secretTel (tel) {
	var tels = tel.split("-");

	var cutTel1 = tels[1];
	var num = cutTel1.substr(0,2);
	var num2 = cutTel1.replace(num, "**");

	var cutTel2 = tels[2];
	var num3 = cutTel2.substr(1,2);
	var num4 = cutTel2.replace(num3, "**");

	return tels[0] + "-" + num2 + "-" + num4;
}

//현재시간 뽑는 함수
function getCurrentTime() {
	var d = new Date();
	var s =
		leadingZeros(d.getFullYear(), 4) + '-' +
		leadingZeros(d.getMonth() + 1, 2) + '-' +
		leadingZeros(d.getDate(), 2) + ' ' +

		leadingZeros(d.getHours(), 2) + ':' +
		leadingZeros(d.getMinutes(), 2) + ':' +
		leadingZeros(d.getSeconds(), 2);

	return s;
} // getCurrentTime

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

function logOut() {
	$.ajax({
		url     : '/bitcamp-team-project/app/json/auth/logout',
		type    : 'GET',
		sendDataType : 'json',
		async   : false
	})
	.done(function(json) {
		sessionStorage.clear();
	});
}

function logIn() {
	$.ajax({
		url     : '/bitcamp-team-project/app/json/auth/login2?email=' + email,
		type    : 'GET',
		sendDataType : 'json',
		async   : false
	})
}

