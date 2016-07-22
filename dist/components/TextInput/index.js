var _jsxFileName='src/components/TextInput/index.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _applyNativeMethods=require('../../modules/applyNativeMethods');var _applyNativeMethods2=_interopRequireDefault(_applyNativeMethods);
var _createReactDOMComponent=require('../../modules/createReactDOMComponent');var _createReactDOMComponent2=_interopRequireDefault(_createReactDOMComponent);
var _omit=require('lodash/omit');var _omit2=_interopRequireDefault(_omit);
var _pick=require('lodash/pick');var _pick2=_interopRequireDefault(_pick);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactDom=require('react-dom');var _reactDom2=_interopRequireDefault(_reactDom);
var _StyleSheet=require('../../apis/StyleSheet');var _StyleSheet2=_interopRequireDefault(_StyleSheet);
var _Text=require('../Text');var _Text2=_interopRequireDefault(_Text);
var _reactTextareaAutosize=require('react-textarea-autosize');var _reactTextareaAutosize2=_interopRequireDefault(_reactTextareaAutosize);
var _TextInputState=require('./TextInputState');var _TextInputState2=_interopRequireDefault(_TextInputState);
var _UIManager=require('../../apis/UIManager');var _UIManager2=_interopRequireDefault(_UIManager);
var _View=require('../View');var _View2=_interopRequireDefault(_View);
var _ViewStylePropTypes=require('../View/ViewStylePropTypes');var _ViewStylePropTypes2=_interopRequireDefault(_ViewStylePropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var viewStyleProps=Object.keys(_ViewStylePropTypes2.default);var

TextInput=function(_Component){_inherits(TextInput,_Component);



































function TextInput(props,context){_classCallCheck(this,TextInput);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(TextInput).call(this,
props,context));_this.



































































































































_handleBlur=function(e){var
onBlur=_this.props.onBlur;
var text=e.target.value;
_this.setState({showPlaceholder:text===''});
_this.blur();
if(onBlur)onBlur(e);};_this.


_handleChange=function(e){var _this$props=
_this.props;var onChange=_this$props.onChange;var onChangeText=_this$props.onChangeText;
var text=e.target.value;
_this.setState({showPlaceholder:text===''});
if(onChange)onChange(e);
if(onChangeText)onChangeText(text);
if(!_this.refs.input){
// calling `this.props.onChange` or `this.props.onChangeText`
// may clean up the input itself. Exits here.
return;}};_this.



_handleClick=function(e){
_this.focus();};_this.


_handleFocus=function(e){var _this$props2=
_this.props;var clearTextOnFocus=_this$props2.clearTextOnFocus;var onFocus=_this$props2.onFocus;var selectTextOnFocus=_this$props2.selectTextOnFocus;
var node=_reactDom2.default.findDOMNode(_this.refs.input);
var text=e.target.value;
if(onFocus)onFocus(e);
if(clearTextOnFocus)_this.clear();
if(selectTextOnFocus)node.select();
_this.setState({showPlaceholder:text===''});};_this.


_handleSelectionChange=function(e){var
onSelectionChange=_this.props.onSelectionChange;
try{var _e$target=
e.target;var selectionDirection=_e$target.selectionDirection;var selectionEnd=_e$target.selectionEnd;var selectionStart=_e$target.selectionStart;
var event={
selectionDirection:selectionDirection,
selectionEnd:selectionEnd,
selectionStart:selectionStart,
nativeEvent:e.nativeEvent};

if(onSelectionChange)onSelectionChange(event);}
catch(e){}};_this.state={showPlaceholder:!props.value&&!props.defaultValue};return _this;}_createClass(TextInput,[{key:'blur',value:function blur(){_TextInputState2.default.blurTextInput(_reactDom2.default.findDOMNode(this.refs.input));}},{key:'clear',value:function clear(){this.setNativeProps({text:''});}},{key:'focus',value:function focus(){_TextInputState2.default.focusTextInput(_reactDom2.default.findDOMNode(this.refs.input));}},{key:'setNativeProps',value:function setNativeProps(props){_UIManager2.default.updateView(this.refs.input,props,this);}},{key:'render',value:function render(){var _props=this.props;var accessibilityLabel=_props.accessibilityLabel;var autoComplete=_props.autoComplete;var autoFocus=_props.autoFocus;var defaultValue=_props.defaultValue;var editable=_props.editable;var keyboardType=_props.keyboardType;var maxLength=_props.maxLength;var maxNumberOfLines=_props.maxNumberOfLines;var multiline=_props.multiline;var numberOfLines=_props.numberOfLines;var onLayout=_props.onLayout;var onSelectionChange=_props.onSelectionChange;var placeholder=_props.placeholder;var placeholderTextColor=_props.placeholderTextColor;var secureTextEntry=_props.secureTextEntry;var style=_props.style;var testID=_props.testID;var value=_props.value;var type=void 0;switch(keyboardType){case'email-address':type='email';break;case'numeric':type='number';break;case'phone-pad':type='tel';break;case'search':case'web-search':type='search';break;case'url':type='url';break;}if(secureTextEntry){type='password';}// In order to support 'Text' styles on 'TextInput', we split the 'Text'
// and 'View' styles and apply them to the 'Text' and 'View' components
// used in the implementation
var flattenedStyle=_StyleSheet2.default.flatten(style);var rootStyles=(0,_pick2.default)(flattenedStyle,viewStyleProps);var textStyles=(0,_omit2.default)(flattenedStyle,viewStyleProps);var propsCommon={autoComplete:autoComplete&&'on',autoFocus:autoFocus,defaultValue:defaultValue,maxLength:maxLength,onBlur:this._handleBlur,onChange:this._handleChange,onFocus:this._handleFocus,onSelect:onSelectionChange&&this._handleSelectionChange,readOnly:!editable,style:[styles.input,textStyles,{outline:style.outline}],value:value};var propsMultiline=_extends({},propsCommon,{component:_reactTextareaAutosize2.default,maxRows:maxNumberOfLines||numberOfLines,minRows:numberOfLines});var propsSingleline=_extends({},propsCommon,{component:'input',type:type});var props=multiline?propsMultiline:propsSingleline;var optionalPlaceholder=placeholder&&this.state.showPlaceholder&&_react2.default.createElement(_View2.default,{pointerEvents:'none',style:styles.placeholder,__source:{fileName:_jsxFileName,lineNumber:158}},_react2.default.createElement(_Text2.default,{children:placeholder,style:[styles.placeholderText,textStyles,placeholderTextColor&&{color:placeholderTextColor}],__source:{fileName:_jsxFileName,lineNumber:159}}));return _react2.default.createElement(_View2.default,{accessibilityLabel:accessibilityLabel,onClick:this._handleClick,onLayout:onLayout,style:[styles.initial,rootStyles],testID:testID,__source:{fileName:_jsxFileName,lineNumber:171}},_react2.default.createElement(_View2.default,{style:styles.wrapper,__source:{fileName:_jsxFileName,lineNumber:178}},(0,_createReactDOMComponent2.default)(_extends({},props,{ref:'input'})),optionalPlaceholder));}}]);return TextInput;}(_react.Component);TextInput.propTypes=_extends({},_View2.default.propTypes,{autoComplete:_react.PropTypes.bool,autoFocus:_react.PropTypes.bool,clearTextOnFocus:_react.PropTypes.bool,defaultValue:_react.PropTypes.string,editable:_react.PropTypes.bool,keyboardType:_react.PropTypes.oneOf(['default','email-address','numeric','phone-pad','url']),maxLength:_react.PropTypes.number,maxNumberOfLines:_react.PropTypes.number,multiline:_react.PropTypes.bool,numberOfLines:_react.PropTypes.number,onBlur:_react.PropTypes.func,onChange:_react.PropTypes.func,onChangeText:_react.PropTypes.func,onFocus:_react.PropTypes.func,onSelectionChange:_react.PropTypes.func,placeholder:_react.PropTypes.string,placeholderTextColor:_react.PropTypes.string,secureTextEntry:_react.PropTypes.bool,selectTextOnFocus:_react.PropTypes.bool,style:_Text2.default.propTypes.style,testID:_Text2.default.propTypes.testID,value:_react.PropTypes.string});TextInput.defaultProps={editable:true,keyboardType:'default',multiline:false,numberOfLines:2,secureTextEntry:false,style:{}};
(0,_applyNativeMethods2.default)(TextInput);

var styles=_StyleSheet2.default.create({
initial:{
borderColor:'black'},

wrapper:{
flex:1},

input:{
appearance:'none',
backgroundColor:'transparent',
borderWidth:0,
boxSizing:'border-box',
color:'inherit',
flex:1,
font:'inherit',
minHeight:'100%',// center small inputs (fix #139)
padding:0,
zIndex:1},

placeholder:{
bottom:0,
justifyContent:'center',
left:0,
position:'absolute',
right:0,
top:0},

placeholderText:{
color:'darkgray',
overflow:'hidden',
whiteSpace:'pre'}});



module.exports=TextInput;