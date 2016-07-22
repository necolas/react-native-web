var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/components/ListView/index.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _applyNativeMethods=require('../../modules/applyNativeMethods');var _applyNativeMethods2=_interopRequireDefault(_applyNativeMethods);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _ScrollView=require('../ScrollView');var _ScrollView2=_interopRequireDefault(_ScrollView);
var _ListViewDataSource=require('./ListViewDataSource');var _ListViewDataSource2=_interopRequireDefault(_ListViewDataSource);
var _ListViewPropTypes=require('./ListViewPropTypes');var _ListViewPropTypes2=_interopRequireDefault(_ListViewPropTypes);
var _View=require('../View');var _View2=_interopRequireDefault(_View);
var _pick=require('lodash/pick');var _pick2=_interopRequireDefault(_pick);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var SCROLLVIEW_REF='listviewscroll';var

ListView=function(_Component){_inherits(ListView,_Component);













function ListView(props){_classCallCheck(this,ListView);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(ListView).call(this,
props));
_this.state={
curRenderedRowsCount:_this.props.initialListSize,
highlightedRow:{}};

_this.onRowHighlighted=function(sectionId,rowId){return _this._onRowHighlighted(sectionId,rowId);};return _this;}_createClass(ListView,[{key:'getScrollResponder',value:function getScrollResponder()


{
return this.refs[SCROLLVIEW_REF]&&this.refs[SCROLLVIEW_REF].getScrollResponder();}},{key:'scrollTo',value:function scrollTo()


{var _refs$SCROLLVIEW_REF;
return this.refs[SCROLLVIEW_REF]&&(_refs$SCROLLVIEW_REF=this.refs[SCROLLVIEW_REF]).scrollTo.apply(_refs$SCROLLVIEW_REF,arguments);}},{key:'setNativeProps',value:function setNativeProps(


props){
return this.refs[SCROLLVIEW_REF]&&this.refs[SCROLLVIEW_REF].setNativeProps(props);}},{key:'_onRowHighlighted',value:function _onRowHighlighted(


sectionId,rowId){
this.setState({highlightedRow:{sectionId:sectionId,rowId:rowId}});}},{key:'render',value:function render()


{
var dataSource=this.props.dataSource;
var header=this.props.renderHeader?this.props.renderHeader():undefined;
var footer=this.props.renderFooter?this.props.renderFooter():undefined;

// render sections and rows
var children=[];
var sections=dataSource.rowIdentities;
var renderRow=this.props.renderRow;
var renderSectionHeader=this.props.renderSectionHeader;
var renderSeparator=this.props.renderSeparator;
for(var sectionIdx=0,sectionCnt=sections.length;sectionIdx<sectionCnt;sectionIdx++){
var rows=sections[sectionIdx];
var sectionId=dataSource.sectionIdentities[sectionIdx];

// render optional section header
if(renderSectionHeader){
var section=dataSource.getSectionHeaderData(sectionIdx);
var key='s_'+sectionId;
var child=_react2.default.createElement(_View2.default,{key:key,__source:{fileName:_jsxFileName,lineNumber:69}},renderSectionHeader(section,sectionId));
children.push(child);}


// render rows
for(var rowIdx=0,rowCnt=rows.length;rowIdx<rowCnt;rowIdx++){
var rowId=rows[rowIdx];
var row=dataSource.getRowData(sectionIdx,rowIdx);
var _key='r_'+sectionId+'_'+rowId;
var _child=_react2.default.createElement(_View2.default,{key:_key,__source:{fileName:_jsxFileName,lineNumber:78}},renderRow(row,sectionId,rowId,this.onRowHighlighted));
children.push(_child);

// render optional separator
if(renderSeparator&&(rowIdx!==rows.length-1||sectionIdx===sections.length-1)){
var adjacentRowHighlighted=
this.state.highlightedRow.sectionID===sectionId&&(
this.state.highlightedRow.rowID===rowId||
this.state.highlightedRow.rowID===rows[rowIdx+1]);
var separator=renderSeparator(sectionId,rowId,adjacentRowHighlighted);
children.push(separator);}}}




var props=(0,_pick2.default)(_ScrollView2.default.propTypes,this.props);

return _react2.default.cloneElement(this.props.renderScrollComponent(props),{
ref:SCROLLVIEW_REF},
header,children,footer);}}]);return ListView;}(_react.Component);ListView.propTypes=_ListViewPropTypes2.default;ListView.defaultProps={initialListSize:10,pageSize:1,renderScrollComponent:function renderScrollComponent(props){return _react2.default.createElement(_ScrollView2.default,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:17}}));},scrollRenderAheadDistance:1000,onEndReachedThreshold:1000,stickyHeaderIndices:[]};ListView.DataSource=_ListViewDataSource2.default;



(0,_applyNativeMethods2.default)(ListView);

module.exports=ListView;