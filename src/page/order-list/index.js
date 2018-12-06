require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide           = require('page/common/nav-side/index.js');
var _mm               = require('util/mm.js');
var _order            = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');
var templateOrderList = require('./index.string');

// page 逻辑部分
var page = {
    data : {
        listParam : {
            pageNum  : 1,
            pageSize : 10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载订单列表
        this.loadOrderList();
    },
    // 加载订单列表
    loadOrderList : function(){
        var _this         = this,
            orderListHtml = '',
            $listCon      = $('.order-list-con');
        _order.getOrderList(_this.data.listParam, function(res){
            // 渲染html
            orderListHtml = _mm.renderHtml(templateOrderList, res.data);
            $listCon.html(orderListHtml);
            // 加载分页信息
            _this.loadPagination({
                hasPreviousPage : res.data.hasPreviousPage,
                prePage         : res.data.prePage,
                hasNextPage     : res.data.hasNextPage,
                nextPage        : res.data.nextPage,
                pageNum         : res.data.pageNum,
                pages           : res.data.pages
            });
            
        }, function(err){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新页面</p>');
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
    	var _this = this;
    	this.pagination ? '' : (this.pagination = new Pagination());
    	this.pagination.render($.extend({}, pageInfo, {
    		container : $('.pg-content'),
    		onSelectPage : function(pageNum){
    			_this.data.listParam.pageNum = pageNum;
    			_this.loadOrderList();
    		}
    	}));
    }
};
$(function(){
    page.init();
});