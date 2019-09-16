$(function(){

	// 商品价格数量加减
	$(".cart_num span").click(function(){
		var $spanNum = parseFloat($(this).parents('tr').find(".cart_pic").text());//单价
		var $spanVal =  parseInt($(this).siblings('input').val()); //数量Val值
		if($(this).is(".cart_num_add")){ //判断点击的按钮
			$spanVal++; //value自加

		}else{
			$spanVal--; //value自减
			if($spanVal < 1){
				$spanVal = 1;
				return;
			}
		}
		var $num = $spanVal*$spanNum;
		var $pic = $num.toFixed(2);
		$(this).siblings('input').val($spanVal);
		$(this).parents('tr').find(".item_sum").text($pic);
		allPic();
	});

	// 全选
	$(".s_all_slave").click(function(){
		if($(this).is(':checked')){
			$(".tr_checkmr").prop('checked',true);
			$(".cart_thcheck").prop('checked',true);
			$(".s_all_slave").prop('checked',true);
		}else{
			$(".tr_checkmr").prop('checked',false);
			$(".cart_thcheck").prop('checked',false);
			$(".s_all_slave").prop('checked',false);
		}
		allPic();
	});

	// 店铺按钮
	$(".s_shopall").click(function(){
		var $goodsTh = $(this).parents("tbody").find('.cart_thcheck');
		console.log($goodsTh);
		if($(this).is(':checked')){
			$goodsTh.prop('checked',true);
		}else{
			$goodsTh.prop('checked',false);
		}	
		if($(".s_shopall").length == $(".s_shopall:checked").length){
			allPic();
			$(".s_all_slave").prop('checked',true);
		}else{
			$(".s_all_slave").prop('checked',false);
		}
		allPic();
	});



	// 商品按钮
	$(".cart_thcheck").click(function(){
		var $totalCheck = $(this).parents('tbody').find(".cart_thcheck");
		var $totalChecked = $(this).parents('tbody').find(".cart_thcheck:checked");
		var $checkAll = $(".s_all_slave");
		var $trCheck = $(this).parents('tbody').find(".s_shopall");
		allPic();
		if($totalCheck.length == $totalChecked.length){
			$trCheck.prop('checked',true);
			allPic();
			if($(".s_shopall").length == $(".s_shopall:checked").length){
				allPic();
				$checkAll.prop('checked',true);
			}else{
				$checkAll.prop('checked',false);
			}
		}else{
			$checkAll.prop('checked',false);
			$trCheck.prop('checked',false);
		}
	});

	//删除单件商品
	$(".del_tr").click(function(){
		var $goods = $(this).parents(".cart_mitem");
		var $goodsLen = $(this).parents("tbody").find('.cart_mitem').length;
		var $trShop = $(this).parents("tbody").find('.shop_tr');
		$goods.remove();
		if($goodsLen == 1){
			$trShop.remove();
		}
		allPic();
		if($(".cart_mitem").length == 0){
			$(".cart_page").show();
		}
	});

	//删除选中商品
	$(".all_del").click(function(){
		$(".cart_thcheck").each(function(){
			var $goodsItem = $(this).parents("tbody").find('.cart_mitem').length;
			if($(this).is(':checked')){
				if($goodsItem == 1){
					$(this).parents("tbody").find('.shop_tr').remove();
				}
				$(this).parents(".cart_mitem").remove();
				 allPic();
			}
		})
		if($(".cart_mitem").length == 0){
			$(".cart_page").show();
		}
	});



	// 总价计算
	function allPic(){
		var $goodsPic = 0; // 选中的商品总价格
		var $goodscount = 0; //选中的商品总数
		$(".cart_thcheck").each(function(){
			var $goodsNum = parseInt($(this).parents('tr').find(".cart_num_input").val());
			var $picAll = parseFloat($(this).parents('tr').find(".item_sum").text());
			var $allCount = parseFloat($(".cart_paybar_info_cost em").text());
			if($(this).is(':checked')){
				$goodsPic += $picAll;
				$goodscount += $goodsNum
				$(this).parents(".cart_mitem").css("background","#fff2ed");
			}else{
				$(this).parents(".cart_mitem").css("background","#fff");
			}
		});
		$(".goodsNum").text($goodscount);
		$(".cart_paybar_info_cost em").text($goodsPic.toFixed(2));
	}

})