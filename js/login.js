
$(function(){

	//登陆方式切换
	$(".moddle_tab div").click(function(){
		if($(this).is('.mod_r')){
			$(".login_phone").hide();
			$(".login_inp").show();
			$(".lg_text").hide();
		}else{
			$(".login_inp").hide();
			$(".login_phone").show();
			$(".lg_text").hide();
		}
		$(this).addClass('tg_on').siblings().removeClass('tg_on');
	})

	//失去焦点时判断为不为空
	$("#text_inp").blur(function(){
		if($("#text_inp").val() == ""){
			$(".lg_text").show();
			$(".lg_text").html("请输入用户名/邮箱/手机号");
		}else{
			$(".lg_text").hide();
		}
	});

	$("#pass_inp").blur(function(){
		if($("#pass_inp").val() == ""){
			$(".lg_text").show();
			$(".lg_text").html("请输入密码");
		}else{
			$(".lg_text").hide();
		}
	});


	//获取动态密码
	var passTime = 60;
	var setTime = null;
	var bool = true;

	//点击时获取时间值
	$(".base_inp a").click(function(){
		if(/^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[678]))\d{8}$/.test($("#phone_inp").val())){
			console.log(1);
			$(".lg_text").hide();
			if(bool){
				bool = false;
				setTime = setInterval(function(){
					if(passTime<1){
						clearInterval(setTime);
						$(".base_inp a").html("获取动态密码");
						passTime=60;
						bool = true;
						return;
					}
					passTime--;
					$(".base_inp a").html(passTime+"秒后重新获取");
				}, 1000)
			}
		}else{
			$(".lg_text").show();
			$(".lg_text").html("您输入的手机号码有误");
		}	
		
	});
	



})