require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateBanner  = require('./banner.string');
var templateFloor   = require('./floor.string');
var _mm = require('util/mm.js');

var floorList = {
    floor1List : [
        {categoryId : "100048", floorImg : require('../../image/floor/floor1-1.jpg'), descText : "华为P20 128GB官网直降300元", price : "4999"},
        {categoryId : "100049", floorImg : require('../../image/floor/floor1-2.jpg'), descText : "小米8 黑色 8GB内存 128GB", price : "2899"},
        {categoryId : "100046", floorImg : require('../../image/floor/floor1-3.jpg'), descText : "Apple iPhone X 64GB 深空灰", price : "6088"},
        {categoryId : "100046", floorImg : require('../../image/floor/floor1-4.jpg'), descText : "Apple iPhone XS Max 64GB 金色", price : "8699"},
        {categoryId : "100080", floorImg : require('../../image/floor/floor1-5.jpg'), descText : "SAMSUNG/三星 Galaxy S9 6GB+128GB", price : "5799"}
    ],
    floor2List : [
        {categoryId : "100069", floorImg : require('../../image/floor/floor2-1.jpg'), descText : "阿迪达斯官方RUGBY SWEAT男子卫衣", price : "799"},
        {categoryId : "100069", floorImg : require('../../image/floor/floor2-2.jpg'), descText : "阿迪达斯官方男子运动型格针织长裤", price : "549"},
        {categoryId : "100069", floorImg : require('../../image/floor/floor2-3.jpg'), descText : "阿迪达斯PureBOOST男女跑步鞋", price : "1099"},
        {categoryId : "100069", floorImg : require('../../image/floor/floor2-4.jpg'), descText : "阿迪达斯官方男子训练短袖上衣", price : "299"},
        {categoryId : "100069", floorImg : require('../../image/floor/floor2-5.jpg'), descText : "耐克秋冬上衣外套连帽休闲运动服", price : "680"}
    ],
    floor3List : [
        {categoryId : "100072", floorImg : require('../../image/floor/floor3-1.jpg'), descText : "【酒鬼官方】52度珍藏特酿500ml*2", price : "596"},
        {categoryId : "100072", floorImg : require('../../image/floor/floor3-2.jpg'), descText : "中国梦 52度浓香型纯粮食酒", price : "98"},
        {categoryId : "100072", floorImg : require('../../image/floor/floor3-3.jpg'), descText : "青岛啤酒经典啤酒500ml*24听", price : "109"},
        {categoryId : "100072", floorImg : require('../../image/floor/floor3-4.jpg'), descText : "Budweiser/百威啤酒500ml*18听", price : "109"},
        {categoryId : "100072", floorImg : require('../../image/floor/floor3-5.jpg'), descText : "SNOW/雪花冰酷9度330ml*24", price : "45"}
    ]
};
    


$(function() {
	// 渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    
    var floor1Html = _mm.renderHtml(templateFloor, {
        floorList : floorList.floor1List
    });
    $("#floor1").html(floor1Html);
    
    var floor2Html = _mm.renderHtml(templateFloor, {
        floorList : floorList.floor2List
    });
    $('#floor2').html(floor2Html);
    
    var floor3Html = _mm.renderHtml(templateFloor, {
        floorList : floorList.floor3List
    });
    $('#floor3').html(floor3Html);
});