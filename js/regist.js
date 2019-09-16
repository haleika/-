

$(function(){	

	var remind = {

		"prompt":[
				"2-20位字符，可由中文、英文、数字或字符”_“组成",
				"请填写正确的手机号码，以便接受订单通知，找回密码等",
				"如无法接受验证码，请重启手机并确认短信未被拦截！",
				"6-20个大小写英文字母、符号或数字组合",
				"请次输入密码"
			],
		"hollow":[
				"用户名不能为空",
				"手机号码不允许为空",
				"请输入短信验证码",
				"密码不能为空",
				"请再次确认您的密码"
			]
		}


	
	
	var prompt = remind.prompt;
	var hollow = remind.hollow;

	//label 移出
	$("input.same_input").focus(function(){
		var $inpNum = $("input.same_input").index($(this)); //获取input索引
		var $spanWidth = $(this).siblings('.same_label').width(); //获取span的宽度 用于same_label移出
		var $div = $(this).parent().siblings(".regist_tips"); //获取提醒框

		$(this).siblings('.same_label').animate({"left":-($spanWidth+15)}, 200);
		$div.removeClass('regist_tips_red');
		$(this).parent().parent().addClass('ifocus');
		$(this).parent().siblings(".regist_right").hide();
		$(".tips_keywords").hide();

		setB($(this),prompt[$inpNum]);
	});

	//判断为不为空
	$("input.same_input").blur(function(){
		var $inpNum1 = $("input.same_input").index($(this));
		if($(this).val() === "" ){
			setB($(this),hollow[$inpNum1],"regist_tips_red");
		}
	});


	//用户名
	valiDate("#username",function(){
		if($(this).val() !== "" ){
			if(/^[0-9a-zA-Z\u4e00-\u9fa5]{2,20}$/.test($(this).val())){
				$(this).parent().parent().removeClass('ifocus');
				$(this).parent().siblings(".regist_right").show();

			}else{
				$(this).parent().parent().addClass('ifocus');
				setB($(this),"请输入正确的用户名,用户名应为4-20位字符","regist_tips_red");

			}
		}
	})
	

	//手机号
	valiDate("#phone",function(){
		if($(this).val() !== "" ){
			if(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test($(this).val())){
				$(this).parent().parent().removeClass('ifocus');
				$(this).parent().siblings(".regist_right").show();

			}else{
				$(this).parent().parent().addClass('ifocus');
				setB($(this),"格式错误，请输入正确的手机号码","regist_tips_red");

			}
		}
	})

	//密码
	valiDate("#password",function(){
		if($(this).val() !== "" ){
			if(/^[a-zA-Z0-9_\.\-$]{6,20}$/.test($(this).val())){
				$(this).parent().parent().removeClass('ifocus');

			}else{
				$(".tips_keywords").hide();
				$(this).parent().parent().addClass('ifocus');
				setB($(this),"密码应为6-20位字符","regist_tips_red");

			}
		}
	})

	// 密码强度
	$("#password").keyup(function(){
		$(this).parent().parent().removeClass('ifocus');
		if(/^[a-z0-9]{6,20}/.test($(this).val())){
			$(this).parent().siblings(".strength_l").show().siblings('.tips_keywords').hide();
		}else if(/^[A-Za-z0-9]{7,20}$/.test($(this).val())){
			$(this).parent().siblings(".strength_m").show().siblings('.tips_keywords').hide();
		}else if(/^[a-zA-Z0-9_\.\-$]{8,20}$/.test($(this).val())){
			$(this).parent().siblings(".strength_h").show().siblings('.tips_keywords').hide();
		}



	});


	//确认密码
	$("#password2").keyup(function(){
		if($(this).val() !== "" ){
			if(/^[a-zA-Z0-9_\.\-$]{6,20}$/.test($(this).val()) && $(this).val() === $("#password").val()){
				$(this).parent().parent().removeClass('ifocus');
				$(this).parent().siblings(".regist_right").show();

			}else{
				$(this).parent().siblings(".regist_right").hide();
				$(this).parent().parent().addClass('ifocus');
				setB($(this),"两次密码输入不一致","regist_tips_red");

			}
		}
	})






	function valiDate(ele,fn){
		$(ele).blur(fn);
	}

	function setB(ele,str,className){
		var span = ele.parent().siblings(".regist_tips").find(".tips_words");
		var Div = ele.parent().siblings(".regist_tips");
		ele.parent().siblings(".regist_tips").show();
		span.html(str);
		Div.addClass(className);
	}

})