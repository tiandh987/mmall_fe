var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _cities  = require('util/cities/index.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
    // 将添加/修改地址模态框html填充到.modal-wrap
	show : function(option) {
        // option的绑定
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        // 渲染页面
        this.loadAddressModal();
        // 绑定事件
        this.bindEvent();
	},
    // 关闭弹窗
    hide : function(){
        $('#closeModal').click();
    },
    // 渲染页面
    loadAddressModal : function(){
        var _this = this;
        if(_this.option.isUpdate){
            // 更新收件人地址
            var addressModalHtml = _mm.renderHtml(templateAddressModal, {
                isUpdate : this.option.isUpdate,
                data     : this.option.data
            });
            this.$modalWrap.html(addressModalHtml);
            // 加载省份
            this.loadProvince();
            // 显示模态框
            $('#showModal').click();
        }
        else{
            // 添加收件人地址
            var addressModalHtml = _mm.renderHtml(templateAddressModal, _this.option);
            this.$modalWrap.html(addressModalHtml);
            // 加载省份
            this.loadProvince();
            // 加载城市
            this.loadCities();
            $('#showModal').click();
        }
    },
    // 加载省份
    loadProvince : function(){
        var provinces         = _cities.getProvinces() || [],
            $provinceSelected = this.$modalWrap.find('#receiver-province');
        $provinceSelected.html(this.getSelectOption(provinces));
        // 如果是更新收件人地址，并且有省份信息，做省份的回填操作
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelected.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    // 加载城市
    loadCities : function(province){
        var cities     = _cities.getCities(province) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        // 如果是更新收件人地址，并且有城市信息，做城市的回填操作
        if(this.option.isUpdate && this.option.data.receiverCity){
        	$citySelect.val(this.option.data.receiverCity);
        }
    },
    // 获取select框的选项 输入：array, 输出：HTML
    getSelectOption : function(optionArray){
        var optionHtml = '<option value="">请选择</option>';
        for(var i = 0, length = optionArray.length; i < length; i++){
            optionHtml += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return optionHtml;
    },
    
    // 事件绑定
    bindEvent : function(){
        var _this = this;
        // 省份和城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
            
        });
        
        // 保存新的收货地址
        this.$modalWrap.find('.address-btn').click(function(){
        	var receiverInfo = _this.getReceiverInfo(),
                isUpdate     = _this.option.isUpdate;
            
        	if(!isUpdate && receiverInfo.status){
                // 添加新地址操作，且所有字段验证通过
                _address.save(receiverInfo.data, function(res){
                    _mm.successTips('收件人地址添加成功');
                    _this.hide();
                   typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
                }, function(err){
                    _mm.errorTips(err.msg);
                });
            }
            else if(isUpdate && receiverInfo.status){
                // 更新地址操作，且所有字段验证通过
                _address.update(receiverInfo.data, function(res){
                    _mm.successTips('收件人地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
                }, function(err){
                    _mm.errorTips(err.msg);
                });
            }
            else{
                // 验证不通过
                _mm.errorTips(receiverInfo.msg || '哪里不对了吧~~~');
            }
        });
    },
    
    // 获取新添加的收货地址信息
    getReceiverInfo : function(){
        var receiverInfo = {},
            result       = {
                status : false
            };
        // 从页面获取值
        receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity     = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverDistrict = $.trim(this.$modalWrap.find('#receiver-district').val());
        receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone    = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){
            receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
        }
        // 验证获取的值
        if(!receiverInfo.receiverName){
            result.msg = '请输入收件人姓名';
        }
        else if(!receiverInfo.receiverProvince){
            result.msg = '请选择收件人所在省份';
        }
        else if(!receiverInfo.receiverCity){
            result.msg = '请选择收件人所在城市';
        }
        else if(!receiverInfo.receiverDistrict){
            result.msg = '请输入收件人所在地区';
        }
        else if(!receiverInfo.receiverAddress){
            result.msg = '请输入收件人详细地址';
        }
        else if(!_mm.validate(receiverInfo.receiverPhone,'phone')){
            result.msg = '请输入11位手机号';
        }
        else{
            // 全部验证通过
            result.status = true;
            result.data   = receiverInfo;
        }
        
        return result;
    }
};

module.exports = addressModal;
