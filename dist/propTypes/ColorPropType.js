var _react=require('react');












var _ReactPropTypeLocationNames=require('react/lib/ReactPropTypeLocationNames');var _ReactPropTypeLocationNames2=_interopRequireDefault(_ReactPropTypeLocationNames);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/* eslint-disable *//**
  * Copyright (c) 2015-present, Facebook, Inc.
  * All rights reserved.
  *
  * This source code is licensed under the BSD-style license found in the
  * LICENSE file in the root directory of this source tree. An additional grant
  * of patent rights can be found in the PATENTS file in the same directory.
  *
  * @providesModule ColorPropType
  */var normalizeColor=require('../modules/normalizeColor');var colorPropType=function colorPropType(isRequired,props,propName,componentName,location,propFullName){var color=props[propName];if(color===undefined||color===null){if(isRequired){var locationName=_ReactPropTypeLocationNames2.default[location];return new Error(
'Required '+locationName+' `'+(propFullName||propName)+
'` was not specified in `'+componentName+'`.');}


return;}


if(typeof color==='number'){
// Developers should not use a number, but we are using the prop type
// both for user provided colors and for transformed ones. This isn't ideal
// and should be fixed but will do for now...
return;}


if(normalizeColor(color)===null){
var locationName=_ReactPropTypeLocationNames2.default[location];
return new Error(
'Invalid '+locationName+' `'+(propFullName||propName)+
'` supplied to `'+componentName+'`: '+color+'\n'+'Valid color formats are\n  - \'#f0f\' (#rgb)\n  - \'#f0fc\' (#rgba)\n  - \'#ff00ff\' (#rrggbb)\n  - \'#ff00ff00\' (#rrggbbaa)\n  - \'rgb(255, 255, 255)\'\n  - \'rgba(255, 255, 255, 1.0)\'\n  - \'hsl(360, 100%, 100%)\'\n  - \'hsla(360, 100%, 100%, 1.0)\'\n  - \'transparent\'\n  - \'red\'\n  - 0xff00ff00 (0xrrggbbaa)\n');}};
















var ColorPropType=colorPropType.bind(null,false/* isRequired */);
ColorPropType.isRequired=colorPropType.bind(null,true/* isRequired */);

module.exports=ColorPropType;