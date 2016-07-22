var _createStrictShapeTypeChecker=require('./createStrictShapeTypeChecker');var _createStrictShapeTypeChecker2=_interopRequireDefault(_createStrictShapeTypeChecker);







var _flattenStyle=require('../modules/flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */module.exports=function StyleSheetPropType(shape){var shapePropType=(0,_createStrictShapeTypeChecker2.default)(shape);return function(props,propName,componentName,location){var newProps=props;
if(props[propName]){
// Just make a dummy prop object with only the flattened style
newProps={};
newProps[propName]=(0,_flattenStyle2.default)(props[propName]);}

return shapePropType(newProps,propName,componentName,location);};};