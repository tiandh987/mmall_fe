require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateBanner  = require('./banner.string');
var templateFloor   = require('./floor.string');
var _mm = require('util/mm.js');

var floorList = {
    floor1List : [
        {categoryId : "", floorImg : require('../../image/floor/floor1-1.jpg'), descText : "商品描述1-1", price : "169"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-1.jpg'), descText : "商品描述1-1", price : "169"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-1.jpg'), descText : "商品描述1-1", price : "169"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-1.jpg'), descText : "商品描述1-1", price : "169"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-1.jpg'), descText : "商品描述1-1", price : "169"}
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
    
//     var floor2Html = _mm.renderHtml(templateFloor, {
//         floorList : floor2List
//     });
//     $('#floor2').html(floor2Html);
//     
//     var floor3Html = _mm.renderHtml(templateFloor, {
//         floorList : floor3List
//     });
//     $('#floor3').html(floor3Html);
//     
//     var floor4Html = _mm.renderHtml(templateFloor, {
//         floorList : floor4List
//     });
//     $('#floor4').html(floor4Html);
//     
//     var floor5Html = _mm.renderHtml(templateFloor, {
//         floorList : floor5List
//     });
//     $('#floor5').html(floor5Html);
});