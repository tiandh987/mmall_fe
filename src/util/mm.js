var Hogan = require('hogan.js');

var conf = {
	// serverHost : 'http://192.168.1.71'
    serverHost : 'http://192.168.43.71'
};

// 通用工具类
var _mm = {
    //网络请求
    request : function(params){
        var _this = this;
        $.ajax({
            type      : params.type     || 'POST',
            url       : params.url      || '',
            dataType  : params.dataType || 'json',
            data      : params.data     || '',
            xhrFields : {
                withCredentials : true
            },
            success  : function(res){
                //请求成功
                if(0 === res.status){
                    typeof params.success === 'function' && params.success(res);
                }
                //没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof params.error === 'function' && params.error(res);
                }
            },
            error     : function(err){
                typeof params.error === 'function' && params.error(err);
            }
        });
    },
    
    //统一登录方法
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    
    //跳回主页
	goHome : function(){
		window.location.href = './index.html'
	},
    
    //获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},

	//获取url参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
    
    //渲染html模板  hogan
	renderHtml : function(htmlTemplate,data){
        //先编译后渲染
		var template = Hogan.compile(htmlTemplate),
			result   = template.render(data);
		return result;
	},
    
    	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功');
	},

	//错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了吧~~~');
	},

	//字段的验证,支持非空、手机、邮箱的判断
	validate : function(value,type){
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !!value;
		}
		//验证手机号
		if('phone' === type){
			return /^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/.test(value);
		}
		//邮箱格式验证
		if ('email' === type) {
			return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.com)$/.test(value);
		}
	}
};

module.exports = _mm;