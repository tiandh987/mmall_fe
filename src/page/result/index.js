require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type     = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
        
    // 判断type是否为支付成功的类型
    if(type === 'payment'){
        var orderNumber =  _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
	//显示对应的提示元素
	$element.show();
});