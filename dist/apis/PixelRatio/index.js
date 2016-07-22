var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */

var _Dimensions=require('../Dimensions');var _Dimensions2=_interopRequireDefault(_Dimensions);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

/**
 * PixelRatio gives access to the device pixel density.
 */var
PixelRatio=function(){function PixelRatio(){_classCallCheck(this,PixelRatio);}_createClass(PixelRatio,null,[{key:'get',
/**
   * Returns the device pixel density.
   */value:function get()
{
return _Dimensions2.default.get('window').scale;}


/**
   * No equivalent for Web
   */},{key:'getFontScale',value:function getFontScale()
{
return _Dimensions2.default.get('window').fontScale||PixelRatio.get();}


/**
   * Converts a layout size (dp) to pixel size (px).
   * Guaranteed to return an integer number.
   */},{key:'getPixelSizeForLayoutSize',value:function getPixelSizeForLayoutSize(
layoutSize){
return Math.round(layoutSize*PixelRatio.get());}


/**
   * Rounds a layout size (dp) to the nearest layout size that corresponds to
   * an integer number of pixels. For example, on a device with a PixelRatio
   * of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to
   * exactly (8.33 * 3) = 25 pixels.
   */},{key:'roundToNearestPixel',value:function roundToNearestPixel(
layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;}}]);return PixelRatio;}();



module.exports=PixelRatio;