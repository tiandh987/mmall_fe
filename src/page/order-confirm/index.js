require('./index.css');
var nav = require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var addressModal = require('./address-modal.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');

var page = {
	data: {

	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent: function() {
		_this = this;

		// 地址的选择
		$(document).on('click', '.address-item', function() {
			$(this).addClass('active')
				.siblings('.address-item').removeClass('active');
            // 记住选择的收件人地址的Id
			_this.data.selectedAddressId = $(this).data('id');
		});

		// 订单的提交
		$(document).on('click', '.order-submit', function() {
			var shippingId = _this.data.selectedAddressId;
			if (shippingId) {
				_order.createOrder({
					shippingId: shippingId
				}, function(res) {
					window.location.href = './payment.html?orderNumber=' + res.data.orderNo;
				}, function(err) {
					_mm.errorTips(err.msg);
				});
			} else {
				_mm.errorTips('请选择收货地址后再进行提交');
			}
		});

        // 添加收件人地址
        $(document).on('click', '.address-add', function(){
            // 将添加地址模态框html填充到.modal-wrap
            addressModal.show({
            	isUpdate: false,
            	onSuccess: function() {
            		_this.loadAddressList();
            	}
            });
        });
        
		// 修改收件人地址
		$(document).on('click', '.address-update', function(e) {
            e.stopPropagation();//阻止冒泡事件
            var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId, function(res) {
				addressModal.show({
					isUpdate  : true,
					data      : res.data,
					onSuccess : function() {
						_this.loadAddressList();
					}
				});
			}, function(err) {
				_mm.errorTips(err.msg);
			});
		});
        
        // 删除收件人地址
        $(document).on('click', '.address-delete', function(e) {
            e.stopPropagation();//阻止冒泡事件
        	var shippingId = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址？')){
                _address.deleteAddress(shippingId, function(res) {
                	_mm.successTips();
                    _this.loadAddressList();
                }, function(err) {
                	_mm.errorTips(err.msg);
                });
            }
        });
	},
    
	// 加载地址信息
	loadAddressList: function() {
        $('.address-con').html('<div class="loading"></div>');
		var _this = this;
		// 获取地址列表
		_address.getAddressList(function(res) {
            // 处理收件人地址数据（保持收件人地址的选中状态）
            _this.addressFilter(res.data);
            
			var addressListHtml = _mm.renderHtml(templateAddress, {
				addressList: res.data.list
			});
			$('.address-con').html(addressListHtml);
		}, function(err) {
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新</p>');
		})
	},
    
    // 处理收件人地址数据（保持收件人地址的选中状态）
    addressFilter : function(data){
        // 确保已有收件人地址被选中
        if(this.data.selectedAddressId){
            // 判断被选中的地址是否在列表里
            var selectedAddressIdFlag = false;
            // 遍历数据
            for(var i = 0, length = data.list.length; i < length; i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    
	// 加载商品清单
	loadProductList: function() {
        $('.product-con').html('<div class="loading"></div>');
		var _this = this;
		// 获取商品清单
		_order.getProductList(function(res) {
			var productListHtml = _mm.renderHtml(templateProduct, {
				orderItems: res.data
			});
			$('.product-con').html(productListHtml);
		}, function(err) {
			$('.product-con').html('<p class="err-tip">商品清单加载失败，请刷新</p>');
		})
	}
};

$(function() {
	page.init();
})
