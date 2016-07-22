var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}












var emptyObject={};/**
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different in
 * giving precedence to the more specific styles. For example, the value of
 * `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutally exclusive style declarations by expanding all of
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longfrom equivalents.
 */var styleShortFormProperties={borderColor:['borderTopColor','borderRightColor','borderBottomColor','borderLeftColor'],borderRadius:['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'],borderStyle:['borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle'],borderWidth:['borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth'],margin:['marginTop','marginRight','marginBottom','marginLeft'],marginHorizontal:['marginRight','marginLeft'],marginVertical:['marginTop','marginBottom'],overflow:['overflowX','overflowY'],
padding:['paddingTop','paddingRight','paddingBottom','paddingLeft'],
paddingHorizontal:['paddingRight','paddingLeft'],
paddingVertical:['paddingTop','paddingBottom'],
textDecorationLine:['textDecoration'],
writingDirection:['direction']};


var alphaSort=function alphaSort(arr){return arr.sort(function(a,b){
if(a<b){return-1;}
if(a>b){return 1;}
return 0;});};


var createStyleReducer=function createStyleReducer(originalStyle){
var originalStyleProps=Object.keys(originalStyle);

return function(style,prop){
var value=(0,_normalizeValue2.default)(prop,originalStyle[prop]);
var longFormProperties=styleShortFormProperties[prop];

// React Native treats `flex:1` like `flex:1 1 auto`
if(prop==='flex'){
style.flexGrow=value;
style.flexShrink=1;
style.flexBasis='auto';
// React Native accepts 'center' as a value
}else if(prop==='textAlignVertical'){
style.verticalAlign=value==='center'?'middle':value;}else
if(longFormProperties){
longFormProperties.forEach(function(longForm,i){
// the value of any longform property in the original styles takes
// precedence over the shortform's value
if(originalStyleProps.indexOf(longForm)===-1){
style[longForm]=value;}});}else


{
style[prop]=value;}

return style;};};



var expandStyle=function expandStyle(){var style=arguments.length<=0||arguments[0]===undefined?emptyObject:arguments[0];
var sortedStyleProps=alphaSort(Object.keys(style));
var styleReducer=createStyleReducer(style);
return sortedStyleProps.reduce(styleReducer,{});};


module.exports=expandStyle;