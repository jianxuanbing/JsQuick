/**
 * 快速框架 版本：1.0.0
 * 日期：2015.02.26
 * 作者：简楚恩
 */

/**
 * 快速获取控件类 
 */
var $={
	/**
	 * 根据ID获取对象 $.id("对象名称");
	 * @param {Object} id 对象名称
	 */
	id:function(id){//根据ID获取对象
		return "string" == typeof id ? document.getElementById(id):id;
	},
	/**
	 * 根据标签名返回指定名称的标签集合 $.tag("标签名");
	 * @param {Object} id 标签名
	 */
	tag:function(id){//根据标签名获取对象
		return "string" == typeof id ? document.getElementsByTagName(id):id;
	},
	//获取css名称对象('css名称','查找对象的集合','指定对象内')qj.css('css','div',qj.o('wap'))
	css:function(className,ByTagName,elm){
		className=className.replace(/\-/g,"\\-");
		var testClass=new RegExp("(^|\\s)"+className+"(\\s|$)");
		var tag=tag||"*";
		var elm=elm||document;
		var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
        var returnElements = [];
        if (elements.getElementsByClassName) {
            //ie8以下不支持
            return elements.getElementsByClassName(className);
        } else {
            var current;
            var length = elements.length;
            for (var i = 0; i < length; i++) {
                current = elements[i];
                if (testClass.test(current.className)) {
                    returnElements.push(current);
                }
            }
            return returnElements;//注意，此时返回的是数组，和原生方法返回的对象还是有差别的。
        }
	},
	/**
	 * 根据 class 获取HTML对象
	 * @param {Object} searchClass class
	 * @param {Object} node 节点
	 * @param {Object} tag 标签
	 */
	getElementsByClass:function(searchClass,node,tag){
		var classElements=new Array();
		if(node==null){
			node=document;
		}
		if(tag==null){
			tag="*";
		}
		var els=node.getElementsByTagName(tag);
		var elsLen=els.length;
		var pattern=new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for(i=0,j=0;i<elsLen;i++){
			if(pattern.test(els[i].className)){
				classElements[j]=els[i];
				j++;
			}
		}
		return classElements;
	}
};
/**
 * 基本工具类UtilsBase
 */
var qutil={
	/**
	 * 身份证号校验
	 * @param {Object} cardId 身份证号
	 */
	isIdCard:function(cardId){
		//身份证正则表达式（18位）
		var isIdCardReg=/^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
		var lastId="10X98765432";//最后一位身份证的号码
		var first=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];//1-17系数
		var sum=0;		
		if(!isIdCardReg.test(cardId)){//校验身份证，失败则返回false
			return false;
		}		
		var year=cardId.substr(6,4);//年
		var month=cardId.substr(10,2);//月
		var day=cardId.substr(12,2);//日
		var birthday=cardId.substr(6,8);//出生年月日		
		if(birthday!=qutil.dateToString(new Date(year+'/'+month+'/'+day))){//校验日期是否合法
			return false;
		}
		for(var i=0;i<cardId.length-1;i++){
			sum+=cardId[i]*first[i];
		}
		var result=sum%11;
		var last=lastId[result];//计算出来的最后一位身份证号码
		if(cardId[cardId.length-1].toUpperCase()==last){
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 日期转字符串，返回日期格式20150303
	 * @param {Object} date 日期
	 */
	dateToString:function(date){		
		if(date instanceof Date){	
			console.log(date);
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			month=month<10?'0'+month:month;//判断月份是否小于10，小于10则补'0'
			var day=date.getDate();
			day=day<10?'0'+day:day;//判断日期是否小于10，小于10则补'0'
			console.log(year+month+day);
			return year+month+day;
		}
		return '';
	},
	/**
	 * 获取鼠标绝对位置，通过加载鼠标移动事件进行获取事件
	 * @param {Object} e 事件
	 */
	getMouseAbsolutePosition:function(e){
		var posX=0;
		var posY=0;
		if(!e){
			var e=window.event;
		}
		posX=(e.pageX)?e.pageX:window.event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
		posY=(e.pageY)?e.pageY:window.event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
		return {
			x:posX,
			y:posY
		};
	}
};
/**
 * 检测工具类，基于正则表达式：check
 */
var ck={
	/**
	 * 判断是否日期格式，返回bool
	 * @param {Object} sDate 日期字符串
	 */
	isDate:function(sDate){
		var reg=/^(\d{4})-(\d{2})-(\d{2})$/;//正则表达式
		var result=sDate.match(reg);//检索指定正则表达式
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断字符串是否为空，返回bool
	 * @param {Object} sNullOrEmpty 空字符串
	 */
	isNullEmpty:function(sNullOrEmpty){
		if(sNullOrEmpty.length==""||sNullOrEmpty.length<=0){
			return false;	
		}else{
			return true;
		}
	},
	/**
	 * 判断是否货币，返回bool
	 * @param {Object} sCurrent 货币字符串
	 */
	isCurrent:function(sCurrent){
		var bResult1=sCurrent.match("[^0-9.-]");
		var bResult2=sCurrent.match("[[0-9]*[.][0-9]*[.][0-9]*");  
        var bResult3=sCurrent.match("[[0-9]*[-][0-9]*[-][0-9]");  
        var bResult4=sCurrent.match("(^([-]|[.]|[-.]|[0-9])[0-9]*[.]*[0-9]+$)|(^([-]|[0-9])[0-9]*$)"); 
        if(bResult1!=null||bResult2!=null||bResult3!=null||bResult4!=null){
        	return false;
        }else{
        	return true;
        }
	},
	/**
	 * 判断是否数字，返回bool
	 * @param {Object} sNum 数字字符串
	 */
	isNumeric:function(sNum){
		var result=sNum.match("^(-|\\+)?\\d+(\\.\\d+)?$");		
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否URL，返回bool
	 * @param {Object} sUrl URL字符串
	 */
	isUrl:function(sUrl){
		var result=sUrl.match("http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?");
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否Email，返回bool
	 * @param {Object} sMail 邮箱字符串
	 */
	isMail:function(sMail){
		var result=sMail.match("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否邮编，返回bool
	 * @param {Object} sPostCode 邮编字符串
	 */
	isPostCode:function(sPostCode){
		var result=sPostCode.match("^\\d{6}$");
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否电话号码，返回bool
	 * @param {Object} sTelephone 电话号码字符串
	 */
	isTelephone:function(sTelephone){
		var result=sTelephone.match("^(\\(\\d{3}\\)|\\d{3}-)?\\d{8}$");
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否手机号码，返回bool
	 * @param {Object} sMobilePhone 手机号码字符串
	 */
	isMobilePhone:function(sMobilePhone){
		var result=sMobilePhone.match("^\\d{11}$");
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否身份证，校验位数（15||18），返回bool
	 * @param {Object} sIdCard 身份证字符串
	 */
	isIdCard:function(sIdCard){
		var result=sIdCard.match("^\\d{15}|\\d{18}$");
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否中英表达式，返回bool
	 * @param {Object} sCE 中英文表达式字符串
	 */
	isCE:function(sCE){
		var result=sCE.watch("^[a-zA-Z\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$");
		if(result==null){
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 校验电话号码和传真号码，返回bool
	 * @param {Object} sTel 传真或固话
	 */
	isTel:function(sTel){		
		var patrn=/^[+]{0,1}(d){1,3}[ ]?([-]?((d)|[ ]){1,12})+$/;
		if(!patrn.exec(sTel)){
			return false;
		}
		return true;
	},
	/**
	 * 校验Mac地址
	 * @param {Object} macaddr Mac地址
	 */
	isMacAddress:function(macaddr){
		var reg1 = /^[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}$/;
   		var reg2 = /^[A-Fa-f0-9]{1,2}\:[A-Fa-f0-9]{1,2}\:[A-Fa-f0-9]{1,2}\:[A-Fa-f0-9]{1,2}\:[A-Fa-f0-9]{1,2}\:[A-Fa-f0-9]{1,2}$/;
   		if(reg1.test(macaddr)){
   			return true;
   		}else if(reg2.test(macaddr)){
   			return true;
   		}else{
   			return false;
   		}
	}
};
/**
 * 浏览器操作工具类：browse
 */
var  browse={
	/**
	 * 返回浏览器所有信息
	 */
	getBrowserInfo:function(){
		//保存浏览器信息
		var browserInfo={
			appName:navigator.appName,//浏览器类型名
			appVersion:navigator.appVersion,//浏览器的平台和版本信息
			appLangulage:navigator.browserLanguage,//浏览器语言
			cpuClass:navigator.cpuClass,//浏览器系统的CPU等级
			system:navigator.platform,//操作系统，浏览器的操作系统平台
			systemLangulage:navigator.systemLanguage,//系统语言
			userLangulage:navigator.userLanguage,//用户语言
			onLine:navigator.onLine,//在线情况，系统是否处于脱机模式
			dpi:{//屏幕分辨率
				"width":window.screen.width,
				"height":window.screen.height
			},
			color:window.screen.colorDepth+"位",//颜色
			fontSmoothing:window.screen.fontSmoothingEnabled,//字体平滑
			appMinorVersion:navigator.appMinorVersion,//浏览器次级版本
			appCodeName:navigator.appCodeName,//浏览器代码名
			cookieEnabled:navigator.cookieEnabled,//cookie是否开启
			userAgent:navigator.userAgent,//浏览器的用户代理报头
			javaEnabled:navigator.javaEnabled,//浏览器是否启用Java
			taintEnabled:navigator.taintEnabled//浏览器是否启用数据污点
		};
        return browserInfo;
	},
	setDefault:function(url){
		
	},
	/**
	 * 获取浏览器URL
	 */
	getUrl:function(){
		return location.href;
	},
	/**
	 * 获取URL参数
	 */
	getUrlParam:function(){
		return location.search;
	},
	/**
	 * 获取页面来源
	 */
	getFrom:function(){
		return document.referrer;
	},
	/**
	 * 获取指定的URL参数值
	 * @param {Object} name 参数名
	 */
	request:function(name){
		var url=this.getUrl();
		var pList=new Array();
		if(url.indexOf("?")>0){//匹配？
			pList=url.split("?")[1].split("&");
		}else if(url.indexOf("#")>0){//匹配#
			pList=url.split("#")[1].split("&");
		}
		if(url.length>0){
			for(var i=0;i<pList.length;i++){
				var getValue=pList[i].split("=");
				if(getValue[0].toUpperCase()==name.toUpperCase()){
					return getValue[1];
					break;
				}
			}
			return "";
		}
	},
	/**
	 * 获取浏览器窗口大小
	 */
	getBrowserWindowSize:function(){
		var bWidth=0,bHeight=0;
		if(typeof(window.innerWidth)=="number"){
			//非IE浏览器
			bWidth=window.innerWidth;
			bHeight=window.innerHeight;
		}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
			//IE 6+的 标准兼容模式
			bWidth=document.documentElement.clientWidth;
			bHeight=document.documentElement.clientHeight;
		}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
			//兼容 IE4
			bWidth=document.body.clientWidth;
			bHeight=document.body.clientHeight;
		}
		return {
			width:bWidth,
			height:bHeight
		};
	},
	/**
	 * 打开一个新的浏览器窗口
	 * @param {Object} url 地址
	 * @param {Object} name 窗口名
	 * @param {Object} width 窗口宽度
	 * @param {Object} height 窗口高度
	 */
	openBrowserWindow:function(url,name,width,height){
		if(!name){
			name="browserWin";
		}
		var top=(screen.availHeight/2)-(height/2);
		var left=(screen.availWidth/2)-(width/2);
		var features="top="+top+",left="+left+",resizable=yes,scrollbars=1,width="+width+",height="+height+"location=0,toolbar=0,status=0,menubar=0";
		var newWindow=window.open(url,name,features);
		newWindow.focus();
	}
};

/**
 * Cookies操作类:cookies
 */
var cookies={
	/**
	 * 设置Cookies
	 * @param {Object} name 名称
	 * @param {Object} value 值
	 * @param {Object} expiresHours Cookie过期时间 0=不设置
	 * @param {Object} path 域
	 */
	setCookie:function(name,value,expiresHours,path){
		try{
			var cookieString=escape(name)+"="+escape(value);//存储编码
			//判断是否设置过期时间
			if(expiresHours>0){
				var date=new Date();
				date.setTime(date.getTime()+expiresHours*3600*1000);//以小时计算
				cookieString=cookieString+";expires="+date.toGMTString();
			}
			//是否设置域
			path=path==""?"":";path="+path;
			document.cookie=cookieString;
			return true;
		}catch(e){
			return false;
		}
	}
};

/**
 * 动态加载类，Load
 */
var load={
	/**
	 * 动态加载Js或css文件
	 * @param {Object} fileName 文件名
	 * @param {Object} fileType 文件类型 js or css
	 * @param {Object} fileUrl 文件路径
	 */
	loadJsCssFile:function(fileName,fileType,fileUrl){
		if(fileType=="js"){//如果文件名是一个外部的JavaScript文件
			var fileRef=document.createElement("script");
			fileRef.setAttribute("type","text/javascript");
			fileRef.setAttribute("src",fileUrl+fileName);
		}else if(fileType=="css"){//如果文件名是一个外部的CSS文件
			var fileRef=document.createElement("link");
			fileRef.setAttribute("rel","stylesheet");
			fileRef.setAttribute("type","text/css");
			fileRef.setAttribute("href",fileUrl+fileName);
		}
		if(typeof fileRef!="undefined"){
			document.getElementsByTagName("head")[0].appendChild(fileRef);
		}
	}
};

/**
 * 页面工具类：page
 */
var page={
	/**
	 * 刷新页面
	 */
	refresh:function(){
		location.replace(location.href);
	},
	/**
	 * 后退，服务端控件禁止调用
	 */
	goBack:function(){
		window.history.go(-1);
	},
	/**
	 * 前进，服务端控件禁止调用
	 */
	goForward:function(){
		window.history.forward();
	},
	/**
	 * 关闭页面
	 */
	close:function(){
		window.close();
	},
	/**
	 * 打印当前页面，调用浏览器打印方法
	 */
	print:function(){
		window.print();
	},
	/**
	 * 重新加载页面
	 */
	reload:function(){
		window.location.reload();
	},
	/**
	 * 加入收藏夹1，Firefox需添加 rel="sidebar"
	 */
	addFavorite1:function(){
		var title=document.title;//网页标题
		var URL=document.URL;//网页地址
		try{
			window.external.AddFavorite(URL,title);//IE
		}catch(e){
			try{
				window.sidebar.addPanel(title,URL,"");//Firefox-火狐
			}catch(e){
				alert("您的浏览器不支持，请使用Ctrl+D手动收藏！");//chrome  opera  safari
			}
		}
	},
	/**
	 * 加入收藏夹2，Firefox需添加 rel="sidebar"
	 * @param {Object} url 网址
	 * @param {Object} title 标题
	 */
	addFavorite2:function(url,title){
		try{
			window.external.AddFavorite(URL,title);//IE
		}catch(e){
			try{
				window.sidebar.addPanel(title,URL,"");//Firefox-火狐
			}catch(e){
				alert("您的浏览器不支持，请使用Ctrl+D手动收藏！");//chrome  opera  safari
			}
		}
	}
	
	
};

/**
 * 正则表达式库：RegLib
 */
var RegLib={
	"非负整数":"^d+$",
	"正整数":"^[0-9]*[1-9][0-9]*$",
	"非正整数":"^((-d+)|(0+))$",
	"负整数":"^-[0-9]*[1-9][0-9]*$",
	"整数":"^-?d+$",
	"非负浮点数":"^d+(.d+)?$",
	"正浮点数":"^(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*))$",
	"非正浮点数":"^((-d+(.d+)?)|(0+(.0+)?))$",
	"负浮点数":"^(-(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*)))$",
	"浮点数":"^(-?d+)(.d+)?$",
	"字母":"^[A-Za-z]+$",
	"大写字母":"^[A-Z]+$",
	"小写字母":"^[a-z]+$",
	"数字字母":"^[A-Za-z0-9]+$",
	"数字_字母":"^w+$",
	"Email":"^[w-]+(.[w-]+)*@[w-]+(.[w-]+)+$",
	"url":"^[a-zA-z]+://(w+(-w+)*)(.(w+(-w+)*))*(?S*)?$"
}








































