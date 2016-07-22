var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
var mapTransform=function mapTransform(transform){
var type=Object.keys(transform)[0];
var value=(0,_normalizeValue2.default)(type,transform[type]);
return type+'('+value+')';};


// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
var convertTransformMatrix=function convertTransformMatrix(transformMatrix){
var matrix=transformMatrix.join(',');
return'matrix3d('+matrix+')';};


var processTransform=function processTransform(style){
if(style){
if(style.transform){
style.transform=style.transform.map(mapTransform).join(' ');}else
if(style.transformMatrix){
style.transform=convertTransformMatrix(style.transformMatrix);
delete style.transformMatrix;}}


return style;};


module.exports=processTransform;