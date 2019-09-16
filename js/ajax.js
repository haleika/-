
window.onload = function(){
	var input = document.getElementsByClassName("search_text")[0];
	var divList = document.getElementsByClassName("history")[0]; 
	var search = document.getElementsByClassName("search_btn")[0];

	var keywords='';

	input.onkeyup=function(){
		keywords=this.value;
		var urls="http://list.mogujie.com/module/mget?code=tips&keyWord="+keywords;
		ajax({
			url:urls,
			dataType:"jsonp",
			jsonCallback:{callback:'?'},
			success:function(data){
				var str = '';
				var tips = data.data.tips;
				var keyName = tips.data;
				var key = eval(keyName);
				str="<ul>";
				for(var i in key){
					var query = key[i].query;
					var tags = key[i].tags;
					str+="<li>";
					str+="<a href=http://list.mogujie.com/s?q="+query+"&ptp=1._mf1_1239_15261.0.0.38VV8z&f=mgjlm class='related'>"+query+"</a>";
					for(var j in tags){
						var tag = tags[j].tag;
						str+="<a href=http://list.mogujie.com/s?q="+tag+"&ptp=1._mf1_1239_15261.0.0.38VV8z&f=mgjlm class='hinge'><span>"+tag+"</span></a>";

					}
					str+="</li>";
				}
				str+="</ul>"
				
				divList.innerHTML=str;
			}	
		})
	}
	search.onclick=function(){
		if (keywords) {
			window.location.href="http://list.mogujie.com/s?q="+keywords+"&ptp=1._mf1_1239_15261.0.0.38VV8z&f=mgjlm"
		};
	}
}





function ajax(option){

	if(!option.url){
		return;
	}
	var type=option.type||'get';
	var asynch=option.asynch==undefined?true:option.asynch;
	var dataType=option.dataType||'text';
	var data='';
	if(typeof option.data=='string'){
		data=option.data;
	}else if(typeof option.data=='object'){
		var str='';
		for(var i in option.data){
			str+=i+'='+option.data[i]+'&';
		}
		data=str.slice(0,-1);
	}

	if(dataType=='jsonp'){ //判断写入的dataType值是不是jsonp
		var callbackKey='callback';
		var callbackVal='J'+new Date().getTime();
		if(!(option.jsonpCallback==undefined)){ //判断jsonCallback属性值是否不为空
			for(var i in option.jsonpCallback){
				callbackKey=i;


				callbackVal= option.jsonpCallback[i]=='?'?callbackVal:option.jsonpCallback[i];//如果给jsonpCallback传入了问号，说明要自动生成函数名
			}
		}
		//回调函数，函数名为callbackVal
		window[callbackVal]=function (data){
			option.success(data);
			delete window[callbackVal];
		}
	
		var spt=document.createElement('script');
		var urls='';
		if(!data){
			if(option.url.indexOf('?')!=-1){
				urls=option.url+'&'+callbackKey+'='+callbackVal;
			}else{
				urls=option.url+'?'+callbackKey+'='+callbackVal;
			}
		}else{
			if(option.url.indexOf('?')!=-1){
				urls=option.url+'&'+data+'&'+callbackKey+'='+callbackVal;
			}else{
				urls=option.url+'?'+data+'&'+callbackKey+'='+callbackVal;
			}
		}
		spt.src=urls; //将urls赋值给script的src属性
		document.getElementsByTagName('head')[0].appendChild(spt);

		return;
	}





	var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(type=='get'){
		xhr.open('get',option.url+'?'+data,asynch);
		xhr.send();
	}else if(type==post){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.open('post',option.url,asynch);
		xhr.send(data);
	}

	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				if(dataType=='text'){
					option.success(xhr.responseText);
				}else if(dataType=='json'){
					var josn=eval('('+xhr.responseText+')');
					option.success(json);
				}else if(dataType=='xml'){
					option.success(xhr.responseXML);
				}
			}
		}
	}

}