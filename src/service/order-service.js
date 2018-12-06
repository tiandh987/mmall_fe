var _mm = require('util/mm.js');

var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    
    // 提交订单
    createOrder : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            success : resolve,
            error   : reject
        });
    },
    
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/order/list.do'),
    		success : resolve,
    		error   : reject
    	});
    }
}
module.exports = _order;