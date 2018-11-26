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
	data : {
		username : '',
		question : '',
		answer   : '',
		token    : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		//输入用户名下一步按钮点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res.data;
					_this.loadStepQuestion();
				},function(err){
					formError.show(err.msg);
				});
			}else{
				formError.show('请输入用户名');
			}
		});
		//输入密码问题提示答案下一步按钮点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if (answer) {
				// 检查密码问题提示答案
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token  = res.data;
					_this.loadStepPassword();
				},function(err){
					formError.show(err.msg);
				});
			}else{
				formError.show('请输入问题的答案');
			}
		});
		//输入新密码下一步按钮点击
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				// 重置密码
				_user.resetPassword({
					username 	  : _this.data.username,
					passwordNew   : password,
					forgetToken   : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(err){
					formError.show(er.msg);
				});
			}else{
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	// 加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
	// 加载输入密码提示问题的一步
	loadStepQuestion : function(){
		formError.hide();
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	// 加载输入新密码的一步
	loadStepPassword : function(){
		formError.hide();
		$('.step-question').hide()
			.siblings('.step-password').show();
	}
	
};

$(function(){
	page.init();
});