Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');
var _ScrollView=require('../ScrollView');var _ScrollView2=_interopRequireDefault(_ScrollView);
var _ListViewDataSource=require('./ListViewDataSource');var _ListViewDataSource2=_interopRequireDefault(_ListViewDataSource);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=_extends({},


_ScrollView2.default.propTypes,{
dataSource:_react.PropTypes.instanceOf(_ListViewDataSource2.default).isRequired,
renderSeparator:_react.PropTypes.func,
renderRow:_react.PropTypes.func.isRequired,
initialListSize:_react.PropTypes.number,
onEndReached:_react.PropTypes.func,
onEndReachedThreshold:_react.PropTypes.number,
pageSize:_react.PropTypes.number,
renderFooter:_react.PropTypes.func,
renderHeader:_react.PropTypes.func,
renderSectionHeader:_react.PropTypes.func,
renderScrollComponent:_react.PropTypes.func.isRequired,
scrollRenderAheadDistance:_react.PropTypes.number,
onChangeVisibleRows:_react.PropTypes.func,
removeClippedSubviews:_react.PropTypes.bool,
stickyHeaderIndices:_react.PropTypes.arrayOf(_react.PropTypes.number)});