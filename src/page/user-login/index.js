require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.error-msg').text('');
	}
};

var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//登录按钮点击
		$('#submit').click(function(){
			_this.submit();
		});
		//按下回车键也提交
		$('.user-content').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	//提交表单
	submit : function(){
		var formDate = {
				username : $.trim($('#username').val()),
				password : $.trim($('#password').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formDate);
		if (validateResult.status) {
			//验证成功，提交
			_user.login(formDate,function(res){
				// console.log(res);
                //登录成功，跳转到来源页，或者首页
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},function(err){
				formError.show(err.msg);
			});
		}else {
			//验证失败，错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单数据验证
	formValidate : function(formDate){
		var result = {
			status : false,
			msg    : ''
		};
		if (!_mm.validate(formDate.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formDate.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 通过验证
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};

$(function(){
	page.init();
});