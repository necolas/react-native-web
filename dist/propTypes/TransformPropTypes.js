var _react=require('react');var








arrayOf=_react.PropTypes.arrayOf;/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */var number=_react.PropTypes.number;var oneOfType=_react.PropTypes.oneOfType;var shape=_react.PropTypes.shape;var string=_react.PropTypes.string;var ArrayOfNumberPropType=arrayOf(number);var numberOrString=oneOfType([number,string]);var TransformMatrixPropType=function TransformMatrixPropType(props,
propName,
componentName)
{
if(props.transform&&props.transformMatrix){
return new Error(
'transformMatrix and transform styles cannot be used on the same '+
'component');}


return ArrayOfNumberPropType(props,propName,componentName);};


var TransformPropTypes={
transform:arrayOf(
oneOfType([
shape({perspective:numberOrString}),
shape({rotate:string}),
shape({rotateX:string}),
shape({rotateY:string}),
shape({rotateZ:string}),
shape({scale:number}),
shape({scaleX:number}),
shape({scaleY:number}),
shape({skewX:string}),
shape({skewY:string}),
shape({translateX:numberOrString}),
shape({translateY:numberOrString}),
shape({translateZ:numberOrString}),
shape({translate3d:string})])),


transformMatrix:TransformMatrixPropType};


module.exports=TransformPropTypes;