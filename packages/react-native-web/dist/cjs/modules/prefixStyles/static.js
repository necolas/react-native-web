"use strict";

exports.__esModule = true;
exports.default = void 0;

var _backgroundClip = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/backgroundClip"));

var _crossFade = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/crossFade"));

var _cursor = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/cursor"));

var _filter = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/filter"));

var _flex = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/flex"));

var _flexboxIE = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/flexboxIE"));

var _flexboxOld = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/flexboxOld"));

var _gradient = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/gradient"));

var _grid = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/grid"));

var _imageSet = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/imageSet"));

var _logical = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/logical"));

var _position = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/position"));

var _sizing = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/sizing"));

var _transition = _interopRequireDefault(require("inline-style-prefixer/lib/plugins/transition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var w = ['Webkit'];
var m = ['Moz'];
var ms = ['ms'];
var wm = ['Webkit', 'Moz'];
var wms = ['Webkit', 'ms'];
var wmms = ['Webkit', 'Moz', 'ms'];
var _default = {
  plugins: [_backgroundClip.default, _crossFade.default, _cursor.default, _filter.default, _flex.default, _flexboxIE.default, _flexboxOld.default, _gradient.default, _grid.default, _imageSet.default, _logical.default, _position.default, _sizing.default, _transition.default],
  prefixMap: {
    animation: w,
    animationDelay: w,
    animationDirection: w,
    animationFillMode: w,
    animationDuration: w,
    animationIterationCount: w,
    animationName: w,
    animationPlayState: w,
    animationTimingFunction: w,
    appearance: wm,
    userSelect: wmms,
    textEmphasisPosition: w,
    textEmphasis: w,
    textEmphasisStyle: w,
    textEmphasisColor: w,
    boxDecorationBreak: w,
    clipPath: w,
    maskImage: w,
    maskMode: w,
    maskRepeat: w,
    maskPosition: w,
    maskClip: w,
    maskOrigin: w,
    maskSize: w,
    maskComposite: w,
    mask: w,
    maskBorderSource: w,
    maskBorderMode: w,
    maskBorderSlice: w,
    maskBorderWidth: w,
    maskBorderOutset: w,
    maskBorderRepeat: w,
    maskBorder: w,
    maskType: w,
    textDecorationStyle: w,
    textDecorationSkip: w,
    textDecorationLine: w,
    textDecorationColor: w,
    filter: w,
    fontFeatureSettings: w,
    breakAfter: wmms,
    breakBefore: wmms,
    breakInside: wmms,
    columnCount: wm,
    columnFill: wm,
    columnGap: wm,
    columnRule: wm,
    columnRuleColor: wm,
    columnRuleStyle: wm,
    columnRuleWidth: wm,
    columns: wm,
    columnSpan: wm,
    columnWidth: wm,
    writingMode: wms,
    flex: wms,
    flexBasis: w,
    flexDirection: wms,
    flexGrow: w,
    flexFlow: wms,
    flexShrink: w,
    flexWrap: wms,
    alignContent: w,
    alignItems: w,
    alignSelf: w,
    justifyContent: w,
    order: w,
    transform: w,
    transformOrigin: w,
    transformOriginX: w,
    transformOriginY: w,
    backfaceVisibility: w,
    perspective: w,
    perspectiveOrigin: w,
    transformStyle: w,
    transformOriginZ: w,
    backdropFilter: w,
    fontKerning: w,
    scrollSnapType: wms,
    scrollSnapPointsX: wms,
    scrollSnapPointsY: wms,
    scrollSnapDestination: wms,
    scrollSnapCoordinate: wms,
    shapeImageThreshold: w,
    shapeImageMargin: w,
    shapeImageOutside: w,
    hyphens: wmms,
    flowInto: wms,
    flowFrom: wms,
    regionFragment: wms,
    textOrientation: w,
    textAlignLast: m,
    tabSize: m,
    wrapFlow: ms,
    wrapThrough: ms,
    wrapMargin: ms,
    touchAction: ms,
    textSizeAdjust: ['ms', 'Webkit'],
    borderImage: w,
    borderImageOutset: w,
    borderImageRepeat: w,
    borderImageSlice: w,
    borderImageSource: w,
    borderImageWidth: w,
    transitionDelay: w,
    transitionDuration: w,
    transitionProperty: w,
    transitionTimingFunction: w
  }
};
exports.default = _default;
module.exports = exports.default;