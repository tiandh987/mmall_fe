require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateOrderDetail = require('./index.string');

// page 逻辑部分
var page = {
	data: {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});
		// 加载订单详细信息
		this.loadOrderDetail();
	},
	bindEvent: function() {
        var _this = this;
        // 取消订单
        $(document).on('click', '.order-cancel', function() {
            if(window.confirm('确定要取消订单吗？')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                	_mm.successTips("该订单取消成功");
                	_this.loadOrderDetail();
                }, function(err){
                	_mm.errorTips(err.msg);
                });
            }
        });
	},

	// 加载订单详细信息
	loadOrderDetail: function() {
		var _this = this,
			orderDetailHtml = '',
			$content = $('.content');
        $content.html(orderDetailHtml);
		_order.getOrderDetail(this.data.orderNumber, function(res) {
            // 数据的适配
            _this.dataFilter(res.data);
			// 渲染页面
			orderDetailHtml = _mm.renderHtml(templateOrderDetail, res.data);
			$content.html(orderDetailHtml);
		}, function(err) {
			content.html('<p class="err-tip">' + err.msg + '</p>');
		});
	},
    
    // 数据的适配
    dataFilter : function(data){
        data.needPay      = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function() {
	page.init();
});
