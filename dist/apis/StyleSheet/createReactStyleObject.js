var _expandStyle=require('./expandStyle');var _expandStyle2=_interopRequireDefault(_expandStyle);
var _flattenStyle=require('../../modules/flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);
var _static=require('inline-style-prefixer/static');var _static2=_interopRequireDefault(_static);
var _processTransform=require('./processTransform');var _processTransform2=_interopRequireDefault(_processTransform);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var addVendorPrefixes=function addVendorPrefixes(style){
var prefixedStyles=(0,_static2.default)(style);
// React@15 removed undocumented support for fallback values in
// inline-styles. Revert array values to the standard CSS value
for(var prop in prefixedStyles){
var value=prefixedStyles[prop];
if(Array.isArray(value)){
prefixedStyles[prop]=value[value.length-1];}}


return prefixedStyles;};


var _createReactDOMStyleObject=function _createReactDOMStyleObject(reactNativeStyle){return(0,_processTransform2.default)((0,_expandStyle2.default)((0,_flattenStyle2.default)(reactNativeStyle)));};
var createReactDOMStyleObject=function createReactDOMStyleObject(reactNativeStyle){return addVendorPrefixes(_createReactDOMStyleObject(reactNativeStyle));};

module.exports=createReactDOMStyleObject;