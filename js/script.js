$(function(){

	//拉幕广告
	$(".wrap_top_banner").hover(function() {
		$(".big_topbanner").stop().slideDown(300);
		$(".small_topbanner").stop().slideUp(200);
	}, function() {
		$(".big_topbanner").stop().slideUp(300);
		$(".small_topbanner").stop().slideDown(200);
	});
	$(".close_topbanner").hover(function(){
		$(this).css("opacity","1");
	},function(){
		$(this).css("opacity","0.7");
	});
	//关闭拉幕广告
	$(".close_topbanner").click(function(){
		$(".wrap_top_banner").fadeOut(300);
	});


	//顶部导航隐藏显示
	$(".right_nav .menu_li").hover(function() {
		$(this).find('.hb_menu_list').show();
		$(this).find('.hb_font').addClass('hv_i');
	}, function() {
		$(this).find('.hb_menu_list').hide();
		$(this).find('.hb_font').removeClass('hv_i');
	});

	//搜索条 和 历史记录
	$(".selectbox").hover(function() {
		$(this).find('ol').show();
	}, function() {
		$(this).find('ol').hide();
	});

	$(".search_text").focus(function(){
		if($(this).attr("placeholder")=="请输入关键字"){
			$(".search_history").fadeIn(100);
			$(this).attr("placeholder","");
		}
		
	});
	$(".search_text").blur(function(){
		if($(this).attr("placeholder")==""){
			$(".search_history").fadeOut(100);
			$(this).attr("placeholder","请输入关键字");
		}
		
	});	



	// banner 大轮播
	var num = 0;
	var timer = null;
	var len = $(".lb_banner li").size();
	var bgColor =[
		{"background":"#47aea7"},
		{"background":"#f0d2c6"},
		{"background":"#ffa2ab"},
		{"background":"#cbdaff"},
		{"background":"#fe98b6"},
		{"background":"#ccb0e0"}
	]


	timer = setInterval(move, 3800); //自动轮播

	
	$(".lb_num a").mouseenter(function() {
		num = $(this).index();
		$(".lb_banner li").eq(num).stop().fadeIn(200).siblings().stop().fadeOut(200);
		$(this).addClass('num_show').siblings().removeClass('num_show');
		$(".main_banner").css(bgColor[num]);
	});

	//触摸时左右轮播按钮移入移出
	$(".max_banner").hover(function() {
		clearInterval(timer);
		$(".lb_btn_l").stop().animate({left:0},300);
		$(".lb_btn_r").stop().animate({right:0},300);
	}, function() {
		$(".lb_btn_l").stop().animate({left:-35},300);
		$(".lb_btn_r").stop().animate({right:-35},300);
		timer = setInterval(move, 4000);
	});

	$(".lb_btn a").on("click",function() {
		if($(this).is($(".lb_btn_r"))){
			num++;
		}else{
			num--;
		}
		if(num>len-1){
			num=0;
		}if(num<0){
			num=len-1;
		}
		lbBaner();
	});

	function move(){
		num++;
		if(num>len-1){
			num=0
		}
		lbBaner();
	}
	function lbBaner(){
		$(".lb_banner li").eq(num).stop().fadeIn(300).siblings().stop().fadeOut(300);
		$(".lb_num a").eq(num).addClass('num_show').siblings().removeClass('num_show');
		$(".main_banner").css(bgColor[num]);
	}




	//限时抢购倒计时
	var totalHour = 3;
	var totalSec = 3*60*60;
	var $spanArr =$(".sale_con .sale_time span");

	var countDown = setInterval(function(){

		if(totalSec<=0){
			clearInterval(timeId);

			return;
		}

		totalSec--;

		var hour = Math.floor(totalSec / 3600);
		var minute = Math.floor(totalSec % 3600 / 60);
		var sec = totalSec % 60;

		$spanArr.eq(0).html("0"+hour);
		$spanArr.eq(1).html(minute);
		$spanArr.eq(2).html(sec);


	},1000);






	//热门精选
	var $liSize;
	var hotNum = 0;
	var hotTimer= null;
	var $liWidth = $(".tab_content ul li").width();
	$(".tab_content").eq(0).show();//初始化显示轮播

	//商品特效
	$(".tab_content ul li").hover(function() {
		$(this).find('.good_hede').stop().animate({top:-40},300);
		$(this).find('.good_moddle').stop().animate({marginTop:0},300);
		$(this).find('.layer').stop().animate({bottom:0},300);
	}, function() {
		$(this).find('.good_hede').stop().animate({top:0},300);
		$(this).find('.good_moddle').stop().animate({marginTop:40},300);
		$(this).find('.layer').stop().animate({bottom:-40},300);
	});

	//选择标题 切换轮播ul
	$(".carousel_title ul li").click(function(){
		var liIndex = $(this).index();
		console.log(liIndex);
		hotNum = 0;
		$(".tab_content ul").css("left",0);
		$(this).find('a').addClass('hover_c').parent().siblings().find('a').removeClass('hover_c');
		$(".tab_content").eq(liIndex).show().siblings().hide();
	});

	hotTimer = setInterval(autoPlay, 2000);//自动轮播
	
	//触摸清除定时器 获取li个数
	$(".tab_content").hover(function() {
		clearInterval(hotTimer);
		$liSize = $(this).find("li").size();
	}, function() {
		hotTimer = setInterval(autoPlay, 2000);
	});
	//左右轮播控制
	$(".hot_btn a").click(function(){
		if($(this).is(".hot_btn_l")){
			hotNum--;
		}else{
			hotNum++;
		}
		if(hotNum > $liSize-5){
			hotNum = 0;
		}
		if(hotNum < 0){
			hotNum = $liSize-5;
		}
		$(".tab_content ul").stop().animate({left:-hotNum*$liWidth}, 300);
	})

	//自动轮播
	function autoPlay(){
		hotNum++;
		if(hotNum > 5){
			hotNum = 0;
		}
		$(".tab_content ul").stop().animate({left:-hotNum*$liWidth}, 300);
	}

	//返回顶部
	$(".side_bottom").click(function(){
		$("html body").animate({scrollTop:0},1000);
	});

	//侧边固定栏
	$(".wrap_sidebar").hover(function() {
		$(this).stop().animate({right:0},300);
		$(".my_cart").stop().animate({right:0},300);
	}, function() {
		$(this).stop().animate({right:-30},300);
		$(".my_cart").stop().animate({right:30},300);
	});

	



	



})
	
	