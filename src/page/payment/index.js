require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _payment        = require('service/payment-service.js');
var templatePayment = require('./payment.string');

// page 逻辑部分
var page = {
    
	data: {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
    
	init: function() {
		this.onLoad();
	},
    
	onLoad: function() {
		// 加载支付信息
        this.loadPaymentInfo();
	},
    
    // 加载支付信息
    loadPaymentInfo : function(){
        var _this           = this,
            paymentInfoHtml = '',
            $paymentInfo    = $('.payment-info');
        $paymentInfo.html('<div class="loading"></div>');   
        _payment.getPaymentInfo(_this.data.orderNumber, function(res){
            // 渲染Html
            paymentInfoHtml = _mm.renderHtml(templatePayment, res.data);
            $paymentInfo.html(paymentInfoHtml);
            
            // 轮询监听订单状态
            _this.listenOrderStatus();
            
        }, function(err){
            $paymentInfo.html('<p class="err-tip">' + err.msg + '</p>');
        });
    },
    
    // 轮询监听订单状态
    listenOrderStatus : function(){
        var _this = this;
        // 每5秒执行一次监听
        this.paymentTimer = window.setInterval(function(){
            
            _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                if(res.data == true){
                    window.location.href = 
                        './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
            
        }, 5e3);
    }
};

$(function() {
	page.init();
});
