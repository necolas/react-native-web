var _NativeMethodsMixin=require('../NativeMethodsMixin');var _NativeMethodsMixin2=_interopRequireDefault(_NativeMethodsMixin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}








var applyNativeMethods=function applyNativeMethods(Component){
Object.keys(_NativeMethodsMixin2.default).forEach(function(method){
if(!Component.prototype[method]){
Component.prototype[method]=_NativeMethodsMixin2.default[method];}});


return Component;};/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * 
 */module.exports=applyNativeMethods;