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
		// 验证username
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			// 用户名为空，不做验证
			if (!username) {
				return;
			}
			//异步验证用户名是否存在
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(err){
				formError.show(err.msg);
			});
		});
		//注册按钮点击
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
				username 		: $.trim($('#username').val()),
				password 		: $.trim($('#password').val()),
				passwordConfirm : $.trim($('#password-confirm').val()),
				email    		: $.trim($('#email').val()),
				phone   	    : $.trim($('#phone').val()),
				question 		: $.trim($('#question').val()),
				answer   		: $.trim($('#answer').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formDate);
		if (validateResult.status) {
			//验证成功，提交
			_user.register(formDate,function(res){
				window.location.href = './result.html?type=register';
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
		// 验证用户名是否为空
		if (!_mm.validate(formDate.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		// 验证密码是否为空
		if (!_mm.validate(formDate.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 验证密码长度
		if (formDate.password.length < 6) {
			result.msg = '密码长度不能小于6位';
			return result;
		}
		// 验证两次输入的密码是否一致
		if(formDate.password !== formDate.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		// 验证邮箱地址格式
		if (!_mm.validate(formDate.email,'email')) {
			result.msg = '邮箱地址格式不正确';
			return result;
		}
		// 验证手机号格式
		if (!_mm.validate(formDate.phone,'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证密码提示问题是否为空
		if (!_mm.validate(formDate.question,'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 验证密码提示问题答案是否为空
		if (!_mm.validate(formDate.answer,'require')) {
			result.msg = '密码提示问题答案不能为空';
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