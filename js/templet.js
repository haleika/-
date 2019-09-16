
$(function(){

	$(".loading_fr").click(function(){
		console.log(1);
		$.ajax({
			url:'php/templetphp.php',
			type:'get',
			dataType:'json',
			success:function(data){
				var backObj = {
					items:data
				}

				var resultStr = template('template',backObj);
				$(".single_goods").append(resultStr);
			}
		})

	});
})