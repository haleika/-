

$(function(){

	var $bigBox = $(".big_box");
	var $smallBox = $(".small_box");
	var $maxBox = $(".max_box");
	var $maxImg = $(".max_box img");

	//鼠标进入显示大小盒子
	$bigBox.hover(function() {
		$smallBox.show();
		$maxBox.show();
	}, function() {
		$smallBox.hide();
		$maxBox.hide();
	});

	//放大镜效果
	$bigBox.mousemove(function(event){

		event = event || window.event;
		var pagex = event.pageX || scroll().left+ event.clientX;
		var pagey = event.pageY || scroll().top  + event.clientY;
		var x = pagex - $bigBox.offset().left - $smallBox.width()/2;
		var y = pagey - $bigBox.offset().top - $smallBox.height()/2;


		if(x<0){
			x=0;
		}
		if(x>$bigBox.width()-$smallBox.width()){
			x=$bigBox.width()-$smallBox.width();
		}
		if(y<0){
			y=0;
		}
		if(y>$bigBox.height()-$smallBox.height()){
			y=$bigBox.height()-$smallBox.height();
		}

		$smallBox.css({"top":y,"left":x}); 


		var bilix = ($maxImg.width()-$maxBox.width())/($bigBox.width()-$smallBox.width());
		var biliy = ($maxImg.height()-$maxBox.height())/($bigBox.height()-$smallBox.height());
		var xx = bilix*x;
		var yy = biliy*y;


		$maxImg.css({"left":-xx,"top":-yy});
	});




	//商品选择
	$(".con_box ul li").click(function(){
		var i = $(this).index()+1; 
		$bigBox.find('img').attr("src","goods/big_0"+(i+5)+".jpg");
		$maxImg.attr("src","goods/big_0"+(i+5)+".jpg");
		$(this).addClass('hover_img').siblings().removeClass('hover_img');
	});

	$(".con_size .size").click(function(){
		$(this).addClass('hover_size').siblings().removeClass('hover_size');
	});


	//鼠标经过更改图片
	$(".list_box ul li").mouseenter(function(){
		var num = $(this).index()+1;
		$(this).addClass('c').siblings().removeClass('c');
		$bigBox.find('img').attr("src","goods/big_0"+num+".jpg");
		$maxImg.attr("src","goods/big_0"+num+".jpg");
	});


	//商品详情小轮播
	var $liWidth = $(".list_box").outerWidth();
	$(".wrap_list a").click(function(){
		if($(this).is(".boxbtn_l")){
			$(".list_box ul").animate({"left":0},500);
		}else{
			$(".list_box ul").animate({"left":-$liWidth},500);
		}

	});


	//数量选择
	$(".goods_inp span").click(function(){
		var val = $(".goods_inp input").val();
		var goods = $(".goods_num em").text();
		var valNum = parseInt(val);
		var goodNum = parseInt(goods);

		if($(this).is(".number_l")){
		 	valNum--;
		}else{
			valNum++;
		}
		if(valNum < 0){
			valNum = 0;
			$(".number_l").css("opacity",0.3);
		}else{
			$(".number_l").css("opacity",1);
		}
		if(valNum > goodNum){
			$(".goods_tip").show();
		}else{
			$(".goods_tip").hide();
		}

		$(".goods_inp input").val(valNum);
	});


	//二维码盒子显示隐藏
	$(".qrcode").hover(function() {
		$(".qrcode_pic").show();
	}, function() {
		$(".qrcode_pic").hide();
	});


	var $divTop = $(".detail_content").offset().top;
	$(window).scroll(function(){
		if($(this).scrollTop()>$divTop){
			$(".module_shop h3").addClass('top_fixed');
			$(".tabbar-box").addClass('top_fixed');
			$(".qrcode").addClass('top_fixed');
			$(".extranav_bd").addClass('top_fixed')
			$(".top_box").show();
			$(".slide_top").show();
		}else{
			$(".module_shop h3").removeClass('top_fixed');
			$(".tabbar-box").removeClass('top_fixed');
			$(".qrcode").removeClass('top_fixed');
			$(".extranav_bd").removeClass('top_fixed');
			$(".top_box").hide();
			$(".slide_top").hide();
		}
		

	});

	$(".extranav_list li").click(function(){
		var liIndex = $(this).index();
		var $scrTop = $(".panel_title").eq(liIndex).offset().top;
		console.log(liIndex);
		console.log($scrTop);
		$(this).addClass('selected').siblings().removeClass('selected');
		$("html,body").animate({scrollTop:$scrTop-23}, 800);
	});
})
