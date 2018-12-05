var _mm = require('util/mm.js');

var _address = {
    // 获取收件人地址列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 根据shippingId获取单条收件人地址
    getAddress : function(shippingId, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/shipping/select.do'),
    		data    : {
                shippingId : shippingId
            },
    		success : resolve,
    		error   : reject
    	});
    },
    // 添加新的收件人地址
    save : function(addressInfo, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/shipping/add.do'),
    		data    : addressInfo,
    		success : resolve,
    		error   : reject
    	});
    },
    // 更新收件人地址
    update : function(addressInfo, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/shipping/update.do'),
    		data    : addressInfo,
    		success : resolve,
    		error   : reject
    	});
    },
    // 删除收件人地址
    deleteAddress : function(shippingId, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/shipping/delete.do'),
    		data    : {
                shippingId : shippingId
            },
    		success : resolve,
    		error   : reject
    	});
    }
}
module.exports = _address;