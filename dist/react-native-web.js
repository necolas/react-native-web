module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	// components

	var _componentsImage = __webpack_require__(3);

	var _componentsImage2 = _interopRequireDefault(_componentsImage);

	var _componentsListView = __webpack_require__(59);

	var _componentsListView2 = _interopRequireDefault(_componentsListView);

	var _componentsScrollView = __webpack_require__(60);

	var _componentsScrollView2 = _interopRequireDefault(_componentsScrollView);

	var _componentsSwipeable = __webpack_require__(61);

	var _componentsSwipeable2 = _interopRequireDefault(_componentsSwipeable);

	var _componentsText = __webpack_require__(63);

	var _componentsText2 = _interopRequireDefault(_componentsText);

	var _componentsTextInput = __webpack_require__(65);

	var _componentsTextInput2 = _interopRequireDefault(_componentsTextInput);

	var _componentsTouchable = __webpack_require__(67);

	var _componentsTouchable2 = _interopRequireDefault(_componentsTouchable);

	var _componentsView = __webpack_require__(57);

	var _componentsView2 = _interopRequireDefault(_componentsView);

	exports['default'] = _react2['default'];
	exports.Image = _componentsImage2['default'];
	exports.ListView = _componentsListView2['default'];
	exports.ScrollView = _componentsScrollView2['default'];
	exports.Swipeable = _componentsSwipeable2['default'];
	exports.Text = _componentsText2['default'];
	exports.TextInput = _componentsTextInput2['default'];
	exports.Touchable = _componentsTouchable2['default'];
	exports.View = _componentsView2['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* global window */
	'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _extends = __webpack_require__(33)['default'];

	var _Object$keys = __webpack_require__(40)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesFilterObjectProps = __webpack_require__(43);

	var _CoreComponent = __webpack_require__(44);

	var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

	var _ImageStylePropTypes = __webpack_require__(56);

	var _ImageStylePropTypes2 = _interopRequireDefault(_ImageStylePropTypes);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _View = __webpack_require__(57);

	var _View2 = _interopRequireDefault(_View);

	var STATUS_ERRORED = 'ERRORED';
	var STATUS_LOADED = 'LOADED';
	var STATUS_LOADING = 'LOADING';
	var STATUS_PENDING = 'PENDING';
	var STATUS_IDLE = 'IDLE';

	var styles = {
	  initial: {
	    alignSelf: 'flex-start',
	    backgroundRepeat: 'no-repeat',
	    backgroundPosition: 'center',
	    backgroundSize: 'cover'
	  },
	  img: {
	    borderWidth: 0,
	    height: 'auto',
	    maxHeight: '100%',
	    maxWidth: '100%',
	    opacity: 0
	  },
	  children: {
	    bottom: 0,
	    left: 0,
	    position: 'absolute',
	    right: 0,
	    top: 0
	  },
	  resizeMode: {
	    clip: {
	      backgroundSize: 'auto'
	    },
	    contain: {
	      backgroundSize: 'contain'
	    },
	    cover: {
	      backgroundSize: 'cover'
	    },
	    stretch: {
	      backgroundSize: '100% 100%'
	    }
	  }
	};

	var Image = (function (_React$Component) {
	  _inherits(Image, _React$Component);

	  function Image(props, context) {
	    _classCallCheck(this, Image);

	    _get(Object.getPrototypeOf(Image.prototype), 'constructor', this).call(this, props, context);

	    // state
	    this.state = { status: props.source.uri ? STATUS_PENDING : STATUS_IDLE };

	    // autobinding
	    this._onError = this._onError.bind(this);
	    this._onLoad = this._onLoad.bind(this);
	  }

	  _createClass(Image, [{
	    key: '_cancelEvent',
	    value: function _cancelEvent(event) {
	      event.preventDefault();
	      event.stopPropagation();
	    }
	  }, {
	    key: '_createImageLoader',
	    value: function _createImageLoader() {
	      var source = this.props.source;

	      this._destroyImageLoader();
	      this.image = new window.Image();
	      this.image.onerror = this._onError;
	      this.image.onload = this._onLoad;
	      this.image.src = source.uri;
	      this._onLoadStart();
	    }
	  }, {
	    key: '_destroyImageLoader',
	    value: function _destroyImageLoader() {
	      if (this.image) {
	        this.image.onload = null;
	        this.image.onerror = null;
	        this.image = null;
	      }
	    }
	  }, {
	    key: '_onError',
	    value: function _onError(e) {
	      var onError = this.props.onError;

	      var event = { nativeEvent: e };

	      this._destroyImageLoader();
	      this.setState({ status: STATUS_ERRORED });
	      if (onError) onError(event);
	      this._onLoadEnd();
	    }
	  }, {
	    key: '_onLoad',
	    value: function _onLoad(e) {
	      var onLoad = this.props.onLoad;

	      var event = { nativeEvent: e };

	      this._destroyImageLoader();
	      this.setState({ status: STATUS_LOADED });
	      if (onLoad) onLoad(event);
	      this._onLoadEnd();
	    }
	  }, {
	    key: '_onLoadEnd',
	    value: function _onLoadEnd() {
	      var onLoadEnd = this.props.onLoadEnd;

	      if (onLoadEnd) onLoadEnd();
	    }
	  }, {
	    key: '_onLoadStart',
	    value: function _onLoadStart() {
	      var onLoadStart = this.props.onLoadStart;

	      this.setState({ status: STATUS_LOADING });
	      if (onLoadStart) onLoadStart();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.state.status === STATUS_PENDING) {
	        this._createImageLoader();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.state.status === STATUS_PENDING && !this.image) {
	        this._createImageLoader();
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.source.uri !== nextProps.source.uri) {
	        this.setState({
	          status: nextProps.source.uri ? STATUS_PENDING : STATUS_IDLE
	        });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._destroyImageLoader();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var accessibilityLabel = _props.accessibilityLabel;
	      var children = _props.children;
	      var defaultSource = _props.defaultSource;
	      var resizeMode = _props.resizeMode;
	      var source = _props.source;
	      var style = _props.style;
	      var testID = _props.testID;

	      var isLoaded = this.state.status === STATUS_LOADED;
	      var defaultImage = defaultSource.uri || null;
	      var displayImage = !isLoaded ? defaultImage : source.uri;
	      var resolvedStyle = (0, _modulesFilterObjectProps.pickProps)(style, _Object$keys(_ImageStylePropTypes2['default']));
	      var backgroundImage = displayImage ? 'url("' + displayImage + '")' : null;

	      /**
	       * Image is a non-stretching View. The image is displayed as a background
	       * image to support `resizeMode`. The HTML image is hidden but used to
	       * provide the correct responsive image dimensions, and to support the
	       * image context menu. Child content is rendered into an element absolutely
	       * positioned over the image.
	       */
	      return _react2['default'].createElement(
	        _View2['default'],
	        {
	          accessibilityLabel: accessibilityLabel,
	          'aria-role': 'img',
	          className: 'Image',
	          component: 'div',
	          style: _extends({}, styles.initial, resolvedStyle, backgroundImage && { backgroundImage: backgroundImage }, styles.resizeMode[resizeMode]),
	          testID: testID
	        },
	        _react2['default'].createElement('img', {
	          src: displayImage,
	          style: styles.img
	        }),
	        children ? _react2['default'].createElement(_View2['default'], { children: children, pointerEvents: 'box-none', style: styles.children }) : null
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      accessibilityLabel: _react.PropTypes.string,
	      children: _react.PropTypes.any,
	      defaultSource: _react.PropTypes.object,
	      onError: _react.PropTypes.func,
	      onLoad: _react.PropTypes.func,
	      onLoadEnd: _react.PropTypes.func,
	      onLoadStart: _react.PropTypes.func,
	      resizeMode: _react.PropTypes.oneOf(['clip', 'contain', 'cover', 'stretch']),
	      source: _react.PropTypes.object,
	      style: _react.PropTypes.shape(_ImageStylePropTypes2['default']),
	      testID: _CoreComponent2['default'].propTypes.testID
	    },
	    enumerable: true
	  }, {
	    key: 'stylePropTypes',
	    value: _ImageStylePropTypes2['default'],
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      defaultSource: {},
	      resizeMode: 'cover',
	      source: {},
	      style: styles.initial
	    },
	    enumerable: true
	  }]);

	  return Image;
	})(_react2['default'].Component);

	exports['default'] = Image;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(5)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	__webpack_require__(8);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(9);

	__webpack_require__(13)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(10)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(11);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(14)
	    , fn   = (__webpack_require__(16).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(17)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(19)["default"];

	var _Object$setPrototypeOf = __webpack_require__(21)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	module.exports = __webpack_require__(16).Object.setPrototypeOf;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(14);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(24).set});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(7).getDesc
	  , isObject = __webpack_require__(25)
	  , anObject = __webpack_require__(26);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(27)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(28);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(30)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(34)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(35), __esModule: true };

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(14);
	$def($def.S, 'Object', {assign: __webpack_require__(37)});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(38)
	  , IObject  = __webpack_require__(10)
	  , enumKeys = __webpack_require__(39);
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(7);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	module.exports = __webpack_require__(16).Object.keys;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(38);

	__webpack_require__(13)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.pickProps = pickProps;
	exports.omitProps = omitProps;
	function filterProps(obj, props) {
	  var excluded = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	  if (!Array.isArray(props)) {
	    throw new TypeError('props is not an Array');
	  }

	  var filtered = {};
	  for (var prop in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	      var isMatch = props.indexOf(prop) > -1;
	      if (excluded && isMatch) {
	        continue;
	      } else if (!excluded && !isMatch) {
	        continue;
	      }

	      filtered[prop] = obj[prop];
	    }
	  }

	  return filtered;
	}

	function pickProps(obj, props) {
	  return filterProps(obj, props);
	}

	function omitProps(obj, props) {
	  return filterProps(obj, props, true);
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesCoreComponent = __webpack_require__(45);

	var _modulesCoreComponent2 = _interopRequireDefault(_modulesCoreComponent);

	exports['default'] = _modulesCoreComponent2['default'];
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _objectWithoutProperties = __webpack_require__(47)['default'];

	var _extends = __webpack_require__(33)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _restyle = __webpack_require__(48);

	var _restyle2 = _interopRequireDefault(_restyle);

	var _stylePropTypes = __webpack_require__(55);

	var _stylePropTypes2 = _interopRequireDefault(_stylePropTypes);

	var CoreComponent = (function (_React$Component) {
	  _inherits(CoreComponent, _React$Component);

	  function CoreComponent() {
	    _classCallCheck(this, CoreComponent);

	    _get(Object.getPrototypeOf(CoreComponent.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(CoreComponent, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var className = _props.className;
	      var Component = _props.component;
	      var style = _props.style;
	      var testID = _props.testID;

	      var other = _objectWithoutProperties(_props, ['className', 'component', 'style', 'testID']);

	      return _react2['default'].createElement(Component, _extends({}, other, (0, _restyle2['default'])({ className: className, style: style }), {
	        'data-testid': process.env.NODE_ENV === 'production' ? null : testID
	      }));
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      className: _react.PropTypes.string,
	      component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	      style: _react.PropTypes.object,
	      testID: _react.PropTypes.string
	    },
	    enumerable: true
	  }, {
	    key: 'stylePropTypes',
	    value: _stylePropTypes2['default'],
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      className: '',
	      component: 'div'
	    },
	    enumerable: true
	  }]);

	  return CoreComponent;
	})(_react2['default'].Component);

	exports['default'] = CoreComponent;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46)))

/***/ },
/* 46 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = stylingStrategy;

	var _autoprefix = __webpack_require__(49);

	var _autoprefix2 = _interopRequireDefault(_autoprefix);

	var _modulesStyles = __webpack_require__(50);

	var _modulesStyles2 = _interopRequireDefault(_modulesStyles);

	/**
	 * Get the HTML class that corresponds to a style declaration
	 * @param prop {string} prop name
	 * @param style {Object} style
	 * @return {string} class name
	 */
	function getSinglePurposeClassName(prop, style) {
	  var className = prop + '-' + style[prop];
	  if (style.hasOwnProperty(prop) && _modulesStyles2['default'][className]) {
	    return _modulesStyles2['default'][className];
	  }
	}

	/**
	 * Replace inline styles with single purpose classes where possible
	 * @param props {Object} React Element properties
	 * @return {Object}
	 */

	function stylingStrategy(props) {
	  var className = undefined;
	  var style = {};

	  var classList = [props.className];
	  for (var prop in props.style) {
	    var styleClass = getSinglePurposeClassName(prop, props.style);
	    if (styleClass) {
	      classList.push(styleClass);
	    } else {
	      style[prop] = props.style[prop];
	    }
	  }

	  className = classList.join(' ');
	  style = (0, _autoprefix2['default'])(style);

	  return { className: className, style: style };
	}

	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(33)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = prefixStyles;

	function prefixStyles(style) {
	  if (style.hasOwnProperty('flexBasis')) {
	    style = _extends({
	      WebkitFlexBasis: style.flexBasis,
	      msFlexBasis: style.flexBasis
	    }, style);
	  }

	  if (style.hasOwnProperty('flexGrow')) {
	    style = _extends({
	      WebkitBoxFlex: style.flexGrow,
	      WebkitFlexGrow: style.flexGrow,
	      msFlexPositive: style.flexGrow
	    }, style);
	  }

	  if (style.hasOwnProperty('flexShrink')) {
	    style = _extends({
	      WebkitFlexShrink: style.flexShrink,
	      msFlexNegative: style.flexShrink
	    }, style);
	  }

	  // NOTE: adding `;` to the string value prevents React from automatically
	  // adding a `px` suffix to the unitless value
	  if (style.hasOwnProperty('order')) {
	    style = _extends({
	      WebkitBoxOrdinalGroup: parseInt(style.order, 10) + 1 + ';',
	      WebkitOrder: '' + style.order,
	      msFlexOrder: '' + style.order
	    }, style);
	  }

	  if (style.hasOwnProperty('transform')) {
	    style = _extends({
	      WebkitTransform: style.transform,
	      msTransform: style.transform
	    }, style);
	  }

	  return style;
	}

	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _stylesCss = __webpack_require__(51);

	var _stylesCss2 = _interopRequireDefault(_stylesCss);

	exports['default'] = _stylesCss2['default'];
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(52);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(54)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?module&localIdentName=[hash:base64:5]!!./../../../node_modules/postcss-loader/index.js!./styles.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?module&localIdentName=[hash:base64:5]!!./../../../node_modules/postcss-loader/index.js!./styles.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(53)();
	// imports


	// module
	exports.push([module.id, "/* align-content */\n\n._1-oZw { -webkit-align-content: center; -ms-flex-line-pack: center; align-content: center; }\n._22egn { -webkit-align-content: flex-end; -ms-flex-line-pack: end; align-content: flex-end; }\n.B5K86 { -webkit-align-content: flex-start; -ms-flex-line-pack: start; align-content: flex-start; }\n.jknyI { -webkit-align-content: stretch; -ms-flex-line-pack: stretch; align-content: stretch; }\n.W6Z9i { -webkit-align-content: space-around; -ms-flex-line-pack: distribute; align-content: space-around; }\n._1VJgB { -webkit-align-content: space-between; -ms-flex-line-pack: justify; align-content: space-between; }\n\n/* align-items */\n\n._1urGK { -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n._1MtNz { -webkit-box-align: end; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; }\n.qtfL9 { -webkit-box-align: start; -webkit-align-items: flex-start; -ms-flex-align: start; align-items: flex-start; }\n._28ar6 { -webkit-box-align: stretch; -webkit-align-items: stretch; -ms-flex-align: stretch; align-items: stretch; }\n.PBszb { -webkit-box-align: space-around; -webkit-align-items: space-around; -ms-flex-align: space-around; align-items: space-around; }\n._11CDT { -webkit-box-align: space-between; -webkit-align-items: space-between; -ms-flex-align: space-between; align-items: space-between; }\n\n/* align-self */\n\n._3nieG { -webkit-align-self: auto; -ms-flex-item-align: auto; align-self: auto; }\n._27fhR { -webkit-align-self: baseline; -ms-flex-item-align: baseline; align-self: baseline; }\n.zZtqE { -webkit-align-self: center; -ms-flex-item-align: center; align-self: center; }\n._14v93 { -webkit-align-self: flex-end; -ms-flex-item-align: end; align-self: flex-end; }\n._2WASU { -webkit-align-self: flex-start; -ms-flex-item-align: start; align-self: flex-start; }\n._3dkSK { -webkit-align-self: stretch; -ms-flex-item-align: stretch; align-self: stretch; }\n\n/* appearance */\n\n._2Okhd { -webkit-appearance: none; -moz-appearance: none; appearance: none; }\n\n/* background-attachment */\n\n.pBnuA { background-attachment: fixed; }\n._2a5Hm { background-attachment: inherit; }\n._2_wxt { background-attachment: local; }\n._2F4Xp { background-attachment: scroll; }\n\n/* background-clip */\n\n._3HDY9 { background-clip: border-box; }\n._2NSNh { background-clip: content-box; }\n._2OBMI { background-clip: inherit; }\n.FA6FP { background-clip: padding-box; }\n\n/* background-color */\n\n._3giwT,\n._1cuSy { background-color: black; }\n.UcUhw,\n.HjLi5 { background-color: white; }\n._2n8Ms,\n._3rIe4 { background-color: currentcolor; }\n.P0oR1 { background-color: inherit; }\n._391Fu { background-color: transparent; }\n\n/* background-image */\n\n.pENVt { background-image: none; }\n\n/* background-origin */\n\n._18gSg { background-clip: border-box; }\n._1844N { background-clip: content-box; }\n.dExOa { background-clip: inherit; }\n._2LbEN { background-clip: padding-box; }\n\n/* background-position */\n\n._1y6vh { background-position: bottom; }\n._2znht { background-position: center; }\n._36R1o { background-position: left; }\n._2tTi4 { background-position: right; }\n._2050n { background-position: top; }\n\n/* background-repeat */\n\n._3gtHD { background-repeat: inherit; }\n._1ZHft { background-repeat: no-repeat; }\n._28CZN { background-repeat: repeat; }\n._33cU8 { background-repeat: repeat-x; }\n._2KHZZ { background-repeat: repeat-y; }\n._2tybn { background-repeat: round; }\n._2G8OZ { background-repeat: space; }\n\n/* background-size */\n\n._34gJ2 { background-size: auto; }\n.Q2VS- { background-size: contain; }\n._1eez4 { background-size: cover; }\n._1upuA { background-size: inherit; }\n\n/* border-color */\n\n._3PpCr,\n.ta_g1 { border-color: white; }\n._2_7ob { border-color: currentcolor; }\n._24HI8 { border-color: inherit; }\n.vJyVg { border-color: transparent; }\n\n/* border-bottom-color */\n\n.SSatk,\n.yS2_Q { border-bottom-color: white; }\n._32SsJ { border-bottom-color: currentcolor; }\n._73zwS { border-bottom-color: inherit; }\n._1u1LZ { border-bottom-color: transparent; }\n\n/* border-left-color */\n\n.gSnWd,\n._1wYd2 { border-left-color: white; }\n._2gYIr { border-left-color: currentcolor; }\n.AXAK- { border-left-color: inherit; }\n._2-SY- { border-left-color: transparent; }\n\n/* border-right-color */\n\n._1F7dA,\n._1tzdO { border-right-color: white; }\n._15agV { border-right-color: currentcolor; }\n._3w5dk { border-right-color: inherit; }\n._2V-N5 { border-right-color: transparent; }\n\n/* border-top-color */\n\n._2imR2,\n.VxfEw { border-top-color: white; }\n.RvFd1 { border-top-color: currentcolor; }\n.KORfc { border-top-color: inherit; }\n.nF2gC { border-top-color: transparent; }\n\n/* border-style */\n\n.ufDZ9 { border-style: dashed; }\n.fdic2 { border-style: dotted; }\n._1z_EN { border-style: inherit; }\n._2RhSs { border-style: none; }\n._2iOBE { border-style: solid; }\n\n/* border-bottom-style */\n\n.YDBRl { border-bottom-style: dashed; }\n._FoGl { border-bottom-style: dotted; }\n._3ZUxp { border-bottom-style: inherit; }\n._3E8q7 { border-bottom-style: none; }\n._1tgFO { border-bottom-style: solid; }\n\n/* border-left-style */\n\n._2Ap6R { border-left-style: dashed; }\n._3TxUx { border-left-style: dotted; }\n._1Rusy { border-left-style: inherit; }\n._2Tcih { border-left-style: none; }\n.dogm4 { border-left-style: solid; }\n\n/* border-right-style */\n\n._1oAK9 { border-right-style: dashed; }\n._9U2KS { border-right-style: dotted; }\n.gAmHf { border-right-style: inherit; }\n.M0usW { border-right-style: none; }\n.Fm-YS { border-right-style: solid; }\n\n/* border-top-style */\n\n._3NeqU { border-top-style: dashed; }\n._2b8bM { border-top-style: dotted; }\n.HJeCo { border-top-style: inherit; }\n._1dAOi { border-top-style: none; }\n._256iU { border-top-style: solid; }\n\n/* border-width */\n\n._450XU { border-width: 0; }\n.h-rhS { border-width: 1px; }\n._1FPs9 { border-width: 2px; }\n._3g6BW { border-width: 3px; }\n._1oESH { border-width: 4px; }\n._3e-aV { border-width: 5px; }\n\n/* border-bottom-width */\n\n._3QRPA { border-bottom-width: 0; }\n._1ie6b { border-bottom-width: 1px; }\n.YuMEt { border-bottom-width: 2px; }\n._37SkH { border-bottom-width: 3px; }\n._2O0IP { border-bottom-width: 4px; }\n._1vupL { border-bottom-width: 5px; }\n\n/* border-left-width */\n\n._3iO3J { border-left-width: 0; }\n._3omWv { border-left-width: 1px; }\n._2Axqn { border-left-width: 2px; }\n._3sLER { border-left-width: 3px; }\n._3mqfO { border-left-width: 4px; }\n._1zA_Q { border-left-width: 5px; }\n\n/* border-right-width */\n\n.SuaD- { border-right-width: 0; }\n._3j5Qy { border-right-width: 1px; }\n._38Hdd { border-right-width: 2px; }\n._35Q8Z { border-right-width: 3px; }\n.zQqUC { border-right-width: 4px; }\n._3Uj2M { border-right-width: 5px; }\n\n/* border-top-width */\n\n._1W_MS { border-top-width: 0; }\n._27PZr { border-top-width: 1px; }\n._1sYCi { border-top-width: 2px; }\n.zGz2G { border-top-width: 3px; }\n.iIr8v { border-top-width: 4px; }\n._3UO-T { border-top-width: 5px; }\n\n/* bottom */\n\n.r9R5L { bottom: 0; }\n._1LzTm% { bottom: 50%; }\n._3PJCa% { bottom: 100%; }\n\n/* box-sizing */\n\n._3oKiC { box-sizing: border-box; }\n.EH1yR { box-sizing: content-box; }\n._2oab0 { box-sizing: inherit; }\n._3gaGp { box-sizing: padding-box; }\n\n/* clear */\n\n.p2eLr { clear: both; }\n._2xYlC { clear: inherit; }\n.MqT7B { clear: left; }\n._3yQpD { clear: none; }\n._20x0n { clear: right; }\n\n/* color */\n\n._2RHl0#000,\n._1xWrH { color: black; }\n._1YXJW,\n._2nKNm { color: white; }\n._2oY_U { color: inherit; }\n._1Y-8E { color: transparent; }\n\n/* direction */\n\n._2Lwux { direction: inherit; }\n._3kf4W { direction: ltr; }\n._2d0rT { direction: rtl; }\n\n/* display */\n\n.Y9KhM { display: block; }\n._3GJ99 { display: contents; }\n._1LqFo { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; }\n._20m2G { display: grid; }\n.E3Uua { display: inherit; }\n._144Ck { display: initial; }\n._2EpVJ { display: inline; }\n._1C0Bt { display: inline-block; }\n.Uj9S7 { display: -webkit-inline-box; display: -webkit-inline-flex; display: -ms-inline-flexbox; display: inline-flex; }\n._3DsyN { display: inline-grid; }\n._1p8fM { display: inline-table; }\n.BIoZz { display: list-item; }\n._3PdgM { display: none; }\n._3yvG3 { display: table; }\n.xVHDP { display: table-cell; }\n._1Pi3a { display: table-column; }\n._3GKV2 { display: table-column-group; }\n._1Soj3 { display: table-footer-group; }\n._24fuj { display: table-header-group; }\n.ed9YH { display: table-row; }\n.rCDHq { display: table-row-group; }\n._3v8lz { display: unset; }\n\n/* flex-basis */\n\n._217v6 { -webkit-flex-basis: 0%; -ms-flex-preferred-size: 0%; flex-basis: 0%; }\n._2cWOw { -webkit-flex-basis: auto; -ms-flex-preferred-size: auto; flex-basis: auto; }\n\n/* flex-direction */\n\n._32HlB { -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n._6nim3 { -webkit-box-orient: vertical; -webkit-box-direction: reverse; -webkit-flex-direction: column-reverse; -ms-flex-direction: column-reverse; flex-direction: column-reverse; }\n._14Mvg { -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n._12nj0 { -webkit-box-orient: horizontal; -webkit-box-direction: reverse; -webkit-flex-direction: row-reverse; -ms-flex-direction: row-reverse; flex-direction: row-reverse; }\n\n/* flex-grow */\n\n._2nzpP { -webkit-box-flex: 0; -webkit-flex-grow: 0; -ms-flex-positive: 0; flex-grow: 0; }\n._27R49 { -webkit-box-flex: 1; -webkit-flex-grow: 1; -ms-flex-positive: 1; flex-grow: 1; }\n._-kNgo { -webkit-box-flex: 2; -webkit-flex-grow: 2; -ms-flex-positive: 2; flex-grow: 2; }\n._2zu_z { -webkit-box-flex: 3; -webkit-flex-grow: 3; -ms-flex-positive: 3; flex-grow: 3; }\n._1MoSU { -webkit-box-flex: 4; -webkit-flex-grow: 4; -ms-flex-positive: 4; flex-grow: 4; }\n.cR-wg { -webkit-box-flex: 5; -webkit-flex-grow: 5; -ms-flex-positive: 5; flex-grow: 5; }\n._2TDCp { -webkit-box-flex: 6; -webkit-flex-grow: 6; -ms-flex-positive: 6; flex-grow: 6; }\n._1R0Za { -webkit-box-flex: 7; -webkit-flex-grow: 7; -ms-flex-positive: 7; flex-grow: 7; }\n._3_cuc { -webkit-box-flex: 8; -webkit-flex-grow: 8; -ms-flex-positive: 8; flex-grow: 8; }\n._3ZhsH { -webkit-box-flex: 9; -webkit-flex-grow: 9; -ms-flex-positive: 9; flex-grow: 9; }\n._2GDDh { -webkit-box-flex: 10; -webkit-flex-grow: 10; -ms-flex-positive: 10; flex-grow: 10; }\n._3HEuX { -webkit-box-flex: 11; -webkit-flex-grow: 11; -ms-flex-positive: 11; flex-grow: 11; }\n\n/* flex-shrink */\n\n._1D0n8 { -webkit-flex-shrink: 0; -ms-flex-negative: 0; flex-shrink: 0; }\n.rnJwQ { -webkit-flex-shrink: 1; -ms-flex-negative: 1; flex-shrink: 1; }\n.AeFUC { -webkit-flex-shrink: 2; -ms-flex-negative: 2; flex-shrink: 2; }\n._1rtO7 { -webkit-flex-shrink: 3; -ms-flex-negative: 3; flex-shrink: 3; }\n._2mOIh { -webkit-flex-shrink: 4; -ms-flex-negative: 4; flex-shrink: 4; }\n._1-aKd { -webkit-flex-shrink: 5; -ms-flex-negative: 5; flex-shrink: 5; }\n.vZUKQ { -webkit-flex-shrink: 6; -ms-flex-negative: 6; flex-shrink: 6; }\n._1IAfm { -webkit-flex-shrink: 7; -ms-flex-negative: 7; flex-shrink: 7; }\n._3Tzvu { -webkit-flex-shrink: 8; -ms-flex-negative: 8; flex-shrink: 8; }\n._1Zqgy { -webkit-flex-shrink: 9; -ms-flex-negative: 9; flex-shrink: 9; }\n._2GSWR { -webkit-flex-shrink: 10; -ms-flex-negative: 10; flex-shrink: 10; }\n._17xCW { -webkit-flex-shrink: 11; -ms-flex-negative: 11; flex-shrink: 11; }\n\n/* flex-wrap */\n\n._2HJaq { -webkit-flex-wrap: nowrap; -ms-flex-wrap: nowrap; flex-wrap: nowrap; }\n._15iUY { -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n.ouwPt { -webkit-flex-wrap: wrap-reverse; -ms-flex-wrap: wrap-reverse; flex-wrap: wrap-reverse; }\n\n/* float */\n\n._3DRHo { float: left; }\n._33arc { float: none; }\n.CPRD3 { float: right; }\n\n/* font */\n\n._2e3h9 { font: inherit; }\n\n/* font-family */\n\n._2tZXY { font-family: inherit; }\n._1pmNY { font-family: monospace; }\n._10a09 { font-family: sans-serif; }\n._1pLjt { font-family: serif; }\n\n/* font-size */\n\n._2Wu4c { font-size: 100%; }\n.dV6qB { font-size: inherit; }\n\n/* font-style */\n\n.WqSYA { font-style: inherit; }\n._3eeDt { font-style: italic; }\n._3KQtj { font-style: normal; }\n._1hjGS { font-style: oblique; }\n\n/* font-weight */\n\n._8omea { font-weight: 100; }\n._3QpI8 { font-weight: 200; }\n._2mdEH { font-weight: 300; }\n._2uSu- { font-weight: 400; }\n._2HLQX { font-weight: 500; }\n._2SSVB { font-weight: 600; }\n._62YmN { font-weight: 700; }\n._32a4w { font-weight: 800; }\n._3CTHw { font-weight: 900; }\n._1Mx4n { font-weight: bold; }\n._1S9JQ { font-weight: bolder; }\n._3EDM0 { font-weight: inherit; }\n._7eq2F { font-weight: lighter; }\n._1vINb { font-weight: normal; }\n\n/* height */\n\n.mMh4V { height: 0; }\n._1PERq { height: 10%; }\n.jX1cA { height: 12.5%; }\n._1wW7v { height: 20%; }\n.No0k6 { height: 25%; }\n.bINVJ { height: 30%; }\n._1jgRN { height: 37.5%; }\n._2U76A { height: 40%; }\n._2eZDL { height: 50%; }\n.ClU7H { height: 60%; }\n._23Twu { height: 62.5%; }\n._1h2ll { height: 70%; }\n._3HrJg { height: 75%; }\n._2Q6yh { height: 80%; }\n._3ajOY { height: 87.5%; }\n._2gf9z { height: 90%; }\n._1Az5u { height: 100%; }\n\n/* justify-content */\n\n._1NB_9 { -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n._1oUwl { -webkit-box-pack: end; -webkit-justify-content: flex-end; -ms-flex-pack: end; justify-content: flex-end; }\n._2rMdN { -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; }\n._2tZlm { -webkit-justify-content: space-around; -ms-flex-pack: distribute; justify-content: space-around; }\n._1ne0Z { -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; }\n\n/* left */\n\n._1aQNK { left: 0; }\n.NqEoL% { left: 50%; }\n._2KM0a% { left: 100%; }\n\n/* line-height */\n\n.r1tVT { line-height: inherit; }\n._3o7pb { line-height: normal; }\n\n/* list-style */\n\n._2UKUy { list-style: none; }\n\n/* margin */\n\n._2cvsT { margin: 0; }\n.arCOp { margin: auto; }\n\n/* margin-bottom */\n\n._2zGQM { margin-bottom: auto; }\n._1F_Mk { margin-bottom: 0; }\n._1pLNl { margin-bottom: 1em; }\n.sNhM0 { margin-bottom: 1rem; }\n\n/* margin-left */\n\n.Ev9O8 { margin-left: auto; }\n._331W4 { margin-left: 0; }\n._1boHe { margin-left: 1em; }\n.k6KwL { margin-left: 1rem; }\n\n/* margin-right */\n\n.qHv4h { margin-right: auto; }\n._3zV9x { margin-right: 0; }\n.ENLPO { margin-right: 1em; }\n._3mb7- { margin-right: 1rem; }\n\n/* margin-top */\n\n._3L0mL { margin-top: auto; }\n._3i_hl { margin-top: 0; }\n._2RjYg { margin-top: 1em; }\n.MUANj { margin-top: 1rem; }\n\n/* max-height */\n\n._1sLwx { max-height: 100%; }\n\n/* max-width */\n\n._1m2bn { max-width: 100%; }\n\n/* min-height */\n\n._27gax { min-height: 100%; }\n\n/* min-width */\n\n._1h1wJ { min-width: 100%; }\n\n/* opacity */\n\n._18yCQ { opacity: 0; }\n._1udjx { opacity: 0.1; }\n.V_Q3G { opacity: 0.2; }\n.Vvhte { opacity: 0.25; }\n._2HAI9 { opacity: 0.3; }\n._3ctdM { opacity: 0.4; }\n.lBkzk { opacity: 0.5; }\n._3v2AO { opacity: 0.6; }\n._39GKX { opacity: 0.7; }\n._1-2MZ { opacity: 0.75; }\n._1fc94 { opacity: 0.8; }\n._18qLQ { opacity: 0.9; }\n._2HXa2 { opacity: 1; }\n\n/* order */\n\n.PO_sl { -webkit-box-ordinal-group: 0; -webkit-order: -1; -ms-flex-order: -1; order: -1; }\n._2ZRSD { -webkit-box-ordinal-group: 2; -webkit-order: 1; -ms-flex-order: 1; order: 1; }\n._3NYe9 { -webkit-box-ordinal-group: 3; -webkit-order: 2; -ms-flex-order: 2; order: 2; }\n._3oHwh { -webkit-box-ordinal-group: 4; -webkit-order: 3; -ms-flex-order: 3; order: 3; }\n._2ME_u { -webkit-box-ordinal-group: 5; -webkit-order: 4; -ms-flex-order: 4; order: 4; }\n._3LH8W { -webkit-box-ordinal-group: 6; -webkit-order: 5; -ms-flex-order: 5; order: 5; }\n._2_07V { -webkit-box-ordinal-group: 7; -webkit-order: 6; -ms-flex-order: 6; order: 6; }\n._3j2pn { -webkit-box-ordinal-group: 8; -webkit-order: 7; -ms-flex-order: 7; order: 7; }\n._37tkx { -webkit-box-ordinal-group: 9; -webkit-order: 8; -ms-flex-order: 8; order: 8; }\n.DWLGh { -webkit-box-ordinal-group: 10; -webkit-order: 9; -ms-flex-order: 9; order: 9; }\n._3SJvh { -webkit-box-ordinal-group: 11; -webkit-order: 10; -ms-flex-order: 10; order: 10; }\n.qNcQx { -webkit-box-ordinal-group: 12; -webkit-order: 11; -ms-flex-order: 11; order: 11; }\n\n/* overflow */\n\n._2rkvT { overflow: auto; }\n._2Oxt_ { overflow: hidden; }\n.ZTGLs { overflow: inherit; }\n._3NS-u { overflow: scroll; }\n._3oUK- { overflow: visible; }\n\n/* overflow-x */\n\n._2BMqr { overflow-x: auto; }\n._1TsCZ { overflow-x: hidden; }\n._1qlt7 { overflow-x: inherit; }\n.laMS2 { overflow-x: scroll; }\n._2ajLQ { overflow-x: visible; }\n\n/* overflow-y */\n\n._2_EyR { overflow-y: auto; }\n._1dTrh { overflow-y: hidden; }\n._2mj4J { overflow-y: inherit; }\n._3Ec0P { overflow-y: scroll; }\n._3Zh3R { overflow-y: visible; }\n\n/* padding */\n\n.ktUqk { padding: 0; }\n._1t1zN { padding: 1em; }\n._1aZOn { padding: 1rem; }\n\n/* padding-bottom */\n\n._1pvzu { padding-bottom: 0; }\n._20Bm9 { padding-bottom: 1em; }\n._3Es8b { padding-bottom: 1rem; }\n\n/* padding-left */\n\n.gs79y { padding-left: 0; }\n._1iu1i { padding-left: 1em; }\n._3LUYc { padding-left: 1rem; }\n\n/* padding-right */\n\n.Y6Y8a { padding-right: 0; }\n._24CSk { padding-right: 1em; }\n._2jbkg { padding-right: 1rem; }\n\n/* padding-top */\n\n.DcBjR { padding-top: 0; }\n._18D1k { padding-top: 1em; }\n._2s0Z0 { padding-top: 1rem; }\n\n/* pointer-events */\n\n._2-AIP { pointer-events: auto; }\n._1-hci { pointer-events: none; }\n._1I3f3 { pointer-events: none; }\n._1I3f3 * { pointer-events: auto;}\n._1BVaV { pointer-events: auto; }\n._1BVaV * { pointer-events: none; }\n\n/* position */\n\n._1c_0S { position: absolute; }\n.Z_EKh { position: fixed; }\n._1JpQV { position: relative; }\n\n/* right */\n\n._1pDJK { right: 0; }\n._3YsPs% { right: 50%; }\n.Qqclr% { right: 100%; }\n\n/* text-align */\n\n._1nr90 { text-align: center; }\n._2dwRb { text-align: end; }\n._3X1N9 { text-align: inherit; }\n.LHkfK { text-align: left; }\n._3oTt9 { text-align: right; }\n._1Zktz { text-align: justify; }\n._17c7P { text-align: start; }\n\n/* text-decoration */\n\n._2RaZH { text-decoration: inherit; }\n._1DYgE { text-decoration: none; }\n._3FCsp { text-decoration: underline; }\n\n/* text-overflow */\n\n._1OtdW { text-overflow: clip; }\n.UONXP { text-overflow: ellipsis; }\n\n/* text-rendering */\n\n._1WKRB { text-rendering: auto; }\n._2yVKX { text-rendering: geometricPrecision; }\n._2rIAm { text-rendering: inherit; }\n.f2lL4 { text-rendering: optimizeLegibility; }\n._19RQq { text-rendering: optimizeSpeed; }\n\n/* text-transform */\n\n._10Fet { text-transform: capitalize; }\n._1PWJe { text-transform: lowercase; }\n.whG3f { text-transform: none; }\n.Msmvf { text-transform: uppercase; }\n\n/* top */\n\n._1DcqY { top: 0; }\n.AOBb8% { top: 50%; }\n._3Yy1D% { top: 100%; }\n\n/* unicode-bidi */\n\n._9rLSO { unicode-bidi: bidi-override; }\n.TiWK6 { unicode-bidi: embed; }\n._1tRRf { unicode-bidi: inherit; }\n._2SCzg { unicode-bidi: isolate; }\n._3Kx0r { unicode-bidi: isolate-override; }\n._1ANUn { unicode-bidi: normal; }\n.KINgC { unicode-bidi: plaintext; }\n\n/* user-select */\n\n._2Gg7e { -webkit-user-select: all; -moz-user-select: all; -ms-user-select: all; user-select: all; }\n._1_abN { -webkit-user-select: inherit; -moz-user-select: inherit; -ms-user-select: inherit; user-select: inherit; }\n._1PNXd { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n._3dmR5 { -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text; }\n\n/* visibility */\n\n._1yMWS { visibility: collapse; }\n._2bW1R { visibility: hidden; }\n.R28Cu { visibility: inherit; }\n.MTnfI { visibility: visible; }\n\n/* white-space */\n\n._35e5k { white-space: normal; }\n._3sO9U { white-space: nowrap; }\n._3451w { white-space: pre; }\n._1-LZy { white-space: pre-line; }\n._2HqfR { white-space: pre-wrap; }\n\n/* width */\n\n.A91a2 { width: 0; }\n._3tCoJ { width: 10%; }\n.IpFKM { width: 12.5%; }\n._1oH7H { width: 20%; }\n._3DzPc { width: 25%; }\n._2b9Gj { width: 30%; }\n._2Y68g { width: 37.5%; }\n._-0geS { width: 40%; }\n._2evLB { width: 50%; }\n._2leCT { width: 60%; }\n._3GJVx { width: 62.5%; }\n._3P-N5 { width: 70%; }\n.YRieP { width: 75%; }\n.QqwK2 { width: 80%; }\n._29djP { width: 87.5%; }\n._2oqvm { width: 90%; }\n._3tmvP { width: 100%; }\n\n/* word-wrap */\n\n._2xfiT { word-wrap: break-word; }\n._3fRTD { word-wrap: normal; }\n\n/* z-index */\n\n._2Tg0P { z-index: -1; }\n._15ULt { z-index: 0; }\n._3f7OC { z-index: 1; }\n._2aejB { z-index: 2; }\n._1CRJo { z-index: 3; }\n._3qbuC { z-index: 4; }\n._2H2zz { z-index: 5; }\n.GSzKs { z-index: 6; }\n._1srWa { z-index: 7; }\n._3Juhg { z-index: 8; }\n._11gqb { z-index: 9; }\n._376KA { z-index: 10; }\n", ""]);

	// exports
	exports.locals = {
		"alignContent-center": "_1-oZw",
		"alignContent-flex-end": "_22egn",
		"alignContent-flex-start": "B5K86",
		"alignContent-stretch": "jknyI",
		"alignContent-space-around": "W6Z9i",
		"alignContent-space-between": "_1VJgB",
		"alignItems-center": "_1urGK",
		"alignItems-flex-end": "_1MtNz",
		"alignItems-flex-start": "qtfL9",
		"alignItems-stretch": "_28ar6",
		"alignItems-space-around": "PBszb",
		"alignItems-space-between": "_11CDT",
		"alignSelf-auto": "_3nieG",
		"alignSelf-baseline": "_27fhR",
		"alignSelf-center": "zZtqE",
		"alignSelf-flex-end": "_14v93",
		"alignSelf-flex-start": "_2WASU",
		"alignSelf-stretch": "_3dkSK",
		"appearance-none": "_2Okhd",
		"backgroundAttachment-fixed": "pBnuA",
		"backgroundAttachment-inherit": "_2a5Hm",
		"backgroundAttachment-local": "_2_wxt",
		"backgroundAttachment-scroll": "_2F4Xp",
		"backgroundClip-border-box": "_3HDY9",
		"backgroundClip-content-box": "_2NSNh",
		"backgroundClip-inherit": "_2OBMI",
		"backgroundClip-padding-box": "FA6FP",
		"backgroundColor-#000": "_3giwT",
		"backgroundColor-black": "_1cuSy",
		"backgroundColor-#fff": "UcUhw",
		"backgroundColor-white": "HjLi5",
		"backgroundColor-currentcolor": "_2n8Ms",
		"backgroundColor-currentColor": "_3rIe4",
		"backgroundColor-inherit": "P0oR1",
		"backgroundColor-transparent": "_391Fu",
		"backgroundImage": "pENVt",
		"backgroundOrigin-border-box": "_18gSg",
		"backgroundOrigin-content-box": "_1844N",
		"backgroundOrigin-inherit": "dExOa",
		"backgroundOrigin-padding-box": "_2LbEN",
		"backgroundPosition-bottom": "_1y6vh",
		"backgroundPosition-center": "_2znht",
		"backgroundPosition-left": "_36R1o",
		"backgroundPosition-right": "_2tTi4",
		"backgroundPosition-top": "_2050n",
		"backgroundRepeat-inherit": "_3gtHD",
		"backgroundRepeat-no-repeat": "_1ZHft",
		"backgroundRepeat-repeat": "_28CZN",
		"backgroundRepeat-repeat-x": "_33cU8",
		"backgroundRepeat-repeat-y": "_2KHZZ",
		"backgroundRepeat-round": "_2tybn",
		"backgroundRepeat-space": "_2G8OZ",
		"backgroundSize-auto": "_34gJ2",
		"backgroundSize-contain": "Q2VS-",
		"backgroundSize-cover": "_1eez4",
		"backgroundSize-inherit": "_1upuA",
		"borderColor-#fff": "_3PpCr",
		"borderColor-white": "ta_g1",
		"borderColor-currentcolor": "_2_7ob",
		"borderColor-inherit": "_24HI8",
		"borderColor-transparent": "vJyVg",
		"borderBottomColor-#fff": "SSatk",
		"borderBottomColor-white": "yS2_Q",
		"borderBottomColor-currentcolor": "_32SsJ",
		"borderBottomColor-inherit": "_73zwS",
		"borderBottomColor-transparent": "_1u1LZ",
		"borderLeftColor-#fff": "gSnWd",
		"borderLeftColor-white": "_1wYd2",
		"borderLeftColor-currentcolor": "_2gYIr",
		"borderLeftColor-inherit": "AXAK-",
		"borderLeftColor-transparent": "_2-SY-",
		"borderRightColor-#fff": "_1F7dA",
		"borderRightColor-white": "_1tzdO",
		"borderRightColor-currentcolor": "_15agV",
		"borderRightColor-inherit": "_3w5dk",
		"borderRightColor-transparent": "_2V-N5",
		"borderTopColor-#fff": "_2imR2",
		"borderTopColor-white": "VxfEw",
		"borderTopColor-currentcolor": "RvFd1",
		"borderTopColor-inherit": "KORfc",
		"borderTopColor-transparent": "nF2gC",
		"borderStyle-dashed": "ufDZ9",
		"borderStyle-dotted": "fdic2",
		"borderStyle-inherit": "_1z_EN",
		"borderStyle-none": "_2RhSs",
		"borderStyle-solid": "_2iOBE",
		"borderBottomStyle-dashed": "YDBRl",
		"borderBottomStyle-dotted": "_FoGl",
		"borderBottomStyle-inherit": "_3ZUxp",
		"borderBottomStyle-none": "_3E8q7",
		"borderBottomStyle-solid": "_1tgFO",
		"borderLeftStyle-dashed": "_2Ap6R",
		"borderLeftStyle-dotted": "_3TxUx",
		"borderLeftStyle-inherit": "_1Rusy",
		"borderLeftStyle-none": "_2Tcih",
		"borderLeftStyle-solid": "dogm4",
		"borderRightStyle-dashed": "_1oAK9",
		"borderRightStyle-dotted": "_9U2KS",
		"borderRightStyle-inherit": "gAmHf",
		"borderRightStyle-none": "M0usW",
		"borderRightStyle-solid": "Fm-YS",
		"borderTopStyle-dashed": "_3NeqU",
		"borderTopStyle-dotted": "_2b8bM",
		"borderTopStyle-inherit": "HJeCo",
		"borderTopStyle-none": "_1dAOi",
		"borderTopStyle-solid": "_256iU",
		"borderWidth-0": "_450XU",
		"borderWidth-1px": "h-rhS",
		"borderWidth-2px": "_1FPs9",
		"borderWidth-3px": "_3g6BW",
		"borderWidth-4px": "_1oESH",
		"borderWidth-5px": "_3e-aV",
		"borderBottomWidth-0": "_3QRPA",
		"borderBottomWidth-1px": "_1ie6b",
		"borderBottomWidth-2px": "YuMEt",
		"borderBottomWidth-3px": "_37SkH",
		"borderBottomWidth-4px": "_2O0IP",
		"borderBottomWidth-5px": "_1vupL",
		"borderLeftWidth-0": "_3iO3J",
		"borderLeftWidth-1px": "_3omWv",
		"borderLeftWidth-2px": "_2Axqn",
		"borderLeftWidth-3px": "_3sLER",
		"borderLeftWidth-4px": "_3mqfO",
		"borderLeftWidth-5px": "_1zA_Q",
		"borderRightWidth-0": "SuaD-",
		"borderRightWidth-1px": "_3j5Qy",
		"borderRightWidth-2px": "_38Hdd",
		"borderRightWidth-3px": "_35Q8Z",
		"borderRightWidth-4px": "zQqUC",
		"borderRightWidth-5px": "_3Uj2M",
		"borderTopWidth-0": "_1W_MS",
		"borderTopWidth-1px": "_27PZr",
		"borderTopWidth-2px": "_1sYCi",
		"borderTopWidth-3px": "zGz2G",
		"borderTopWidth-4px": "iIr8v",
		"borderTopWidth-5px": "_3UO-T",
		"bottom-0": "r9R5L",
		"bottom-50": "_1LzTm",
		"bottom-100": "_3PJCa",
		"boxSizing-border-box": "_3oKiC",
		"boxSizing-content-box": "EH1yR",
		"boxSizing-inherit": "_2oab0",
		"boxSizing-padding-box": "_3gaGp",
		"clear-both": "p2eLr",
		"clear-inherit": "_2xYlC",
		"clear-left": "MqT7B",
		"clear-none": "_3yQpD",
		"clear-right": "_20x0n",
		"color-": "_2RHl0",
		"color-black": "_1xWrH",
		"color-#fff": "_1YXJW",
		"color-white": "_2nKNm",
		"color-inherit": "_2oY_U",
		"color-transparent": "_1Y-8E",
		"direction-inherit": "_2Lwux",
		"direction-ltr": "_3kf4W",
		"direction-rtl": "_2d0rT",
		"display-block": "Y9KhM",
		"display-contents": "_3GJ99",
		"display-flex": "_1LqFo",
		"display-grid": "_20m2G",
		"display-inherit": "E3Uua",
		"display-initial": "_144Ck",
		"display-inline": "_2EpVJ",
		"display-inline-block": "_1C0Bt",
		"display-inline-flex": "Uj9S7",
		"display-inline-grid": "_3DsyN",
		"display-inline-table": "_1p8fM",
		"display-list-item": "BIoZz",
		"display-none": "_3PdgM",
		"display-table": "_3yvG3",
		"display-table-cell": "xVHDP",
		"display-table-column": "_1Pi3a",
		"display-table-column-group": "_3GKV2",
		"display-table-footer-group": "_1Soj3",
		"display-table-header-group": "_24fuj",
		"display-table-row": "ed9YH",
		"display-table-row-group": "rCDHq",
		"display-unset": "_3v8lz",
		"flexBasis-0": "_217v6",
		"flexBasis-auto": "_2cWOw",
		"flexDirection-column": "_32HlB",
		"flexDirection-column-reverse": "_6nim3",
		"flexDirection-row": "_14Mvg",
		"flexDirection-row-reverse": "_12nj0",
		"flexGrow-0": "_2nzpP",
		"flexGrow-1": "_27R49",
		"flexGrow-2": "_-kNgo",
		"flexGrow-3": "_2zu_z",
		"flexGrow-4": "_1MoSU",
		"flexGrow-5": "cR-wg",
		"flexGrow-6": "_2TDCp",
		"flexGrow-7": "_1R0Za",
		"flexGrow-8": "_3_cuc",
		"flexGrow-9": "_3ZhsH",
		"flexGrow-10": "_2GDDh",
		"flexGrow-11": "_3HEuX",
		"flexShrink-0": "_1D0n8",
		"flexShrink-1": "rnJwQ",
		"flexShrink-2": "AeFUC",
		"flexShrink-3": "_1rtO7",
		"flexShrink-4": "_2mOIh",
		"flexShrink-5": "_1-aKd",
		"flexShrink-6": "vZUKQ",
		"flexShrink-7": "_1IAfm",
		"flexShrink-8": "_3Tzvu",
		"flexShrink-9": "_1Zqgy",
		"flexShrink-10": "_2GSWR",
		"flexShrink-11": "_17xCW",
		"flexWrap-nowrap": "_2HJaq",
		"flexWrap-wrap": "_15iUY",
		"flexWrap-wrap-reverse": "ouwPt",
		"float-left": "_3DRHo",
		"float-none": "_33arc",
		"float-right": "CPRD3",
		"font-inherit": "_2e3h9",
		"fontFamily-inherit": "_2tZXY",
		"fontFamily-monospace": "_1pmNY",
		"fontFamily-sans-serif": "_10a09",
		"fontFamily-serif": "_1pLjt",
		"fontSize-100%": "_2Wu4c",
		"fontSize-inherit": "dV6qB",
		"fontStyle-inherit": "WqSYA",
		"fontStyle-italic": "_3eeDt",
		"fontStyle-normal": "_3KQtj",
		"fontStyle-oblique": "_1hjGS",
		"fontWeight-100": "_8omea",
		"fontWeight-200": "_3QpI8",
		"fontWeight-300": "_2mdEH",
		"fontWeight-400": "_2uSu-",
		"fontWeight-500": "_2HLQX",
		"fontWeight-600": "_2SSVB",
		"fontWeight-700": "_62YmN",
		"fontWeight-800": "_32a4w",
		"fontWeight-900": "_3CTHw",
		"fontWeight-bold": "_1Mx4n",
		"fontWeight-bolder": "_1S9JQ",
		"fontWeight-inherit": "_3EDM0",
		"fontWeight-lighter": "_7eq2F",
		"fontWeight-normal": "_1vINb",
		"height-0": "mMh4V",
		"height-10%": "_1PERq",
		"height-12.5%": "jX1cA",
		"height-20%": "_1wW7v",
		"height-25%": "No0k6",
		"height-30%": "bINVJ",
		"height-37.5%": "_1jgRN",
		"height-40%": "_2U76A",
		"height-50%": "_2eZDL",
		"height-60%": "ClU7H",
		"height-62.5%": "_23Twu",
		"height-70%": "_1h2ll",
		"height-75%": "_3HrJg",
		"height-80%": "_2Q6yh",
		"height-87.5%": "_3ajOY",
		"height-90%": "_2gf9z",
		"height-100%": "_1Az5u",
		"justifyContent-center": "_1NB_9",
		"justifyContent-flex-end": "_1oUwl",
		"justifyContent-flex-start": "_2rMdN",
		"justifyContent-space-around": "_2tZlm",
		"justifyContent-space-between": "_1ne0Z",
		"left-0": "_1aQNK",
		"left-50": "NqEoL",
		"left-100": "_2KM0a",
		"lineHeight-inherit": "r1tVT",
		"lineHeight-normal": "_3o7pb",
		"listStyle-none": "_2UKUy",
		"margin-0": "_2cvsT",
		"margin-auto": "arCOp",
		"marginBottom-auto": "_2zGQM",
		"marginBottom-0": "_1F_Mk",
		"marginBottom-1em": "_1pLNl",
		"marginBottom-1rem": "sNhM0",
		"marginLeft-auto": "Ev9O8",
		"marginLeft-0": "_331W4",
		"marginLeft-1em": "_1boHe",
		"marginLeft-1rem": "k6KwL",
		"marginRight-auto": "qHv4h",
		"marginRight-0": "_3zV9x",
		"marginRight-1em": "ENLPO",
		"marginRight-1rem": "_3mb7-",
		"marginTop-auto": "_3L0mL",
		"marginTop-0": "_3i_hl",
		"marginTop-1em": "_2RjYg",
		"marginTop-1rem": "MUANj",
		"maxHeight-100%": "_1sLwx",
		"maxWidth-100%": "_1m2bn",
		"minHeight-100%": "_27gax",
		"minWidth-100%": "_1h1wJ",
		"opacity-0": "_18yCQ",
		"opacity-0.1": "_1udjx",
		"opacity-0.2": "V_Q3G",
		"opacity-0.25": "Vvhte",
		"opacity-0.3": "_2HAI9",
		"opacity-0.4": "_3ctdM",
		"opacity-0.5": "lBkzk",
		"opacity-0.6": "_3v2AO",
		"opacity-0.7": "_39GKX",
		"opacity-0.75": "_1-2MZ",
		"opacity-0.8": "_1fc94",
		"opacity-0.9": "_18qLQ",
		"opacity-1": "_2HXa2",
		"order--1": "PO_sl",
		"order-1": "_2ZRSD",
		"order-2": "_3NYe9",
		"order-3": "_3oHwh",
		"order-4": "_2ME_u",
		"order-5": "_3LH8W",
		"order-6": "_2_07V",
		"order-7": "_3j2pn",
		"order-8": "_37tkx",
		"order-9": "DWLGh",
		"order-10": "_3SJvh",
		"order-11": "qNcQx",
		"overflow-auto": "_2rkvT",
		"overflow-hidden": "_2Oxt_",
		"overflow-inherit": "ZTGLs",
		"overflow-scroll": "_3NS-u",
		"overflow-visible": "_3oUK-",
		"overflowX-auto": "_2BMqr",
		"overflowX-hidden": "_1TsCZ",
		"overflowX-inherit": "_1qlt7",
		"overflowX-scroll": "laMS2",
		"overflowX-visible": "_2ajLQ",
		"overflowY-auto": "_2_EyR",
		"overflowY-hidden": "_1dTrh",
		"overflowY-inherit": "_2mj4J",
		"overflowY-scroll": "_3Ec0P",
		"overflowY-visible": "_3Zh3R",
		"padding-0": "ktUqk",
		"padding-1em": "_1t1zN",
		"padding-1rem": "_1aZOn",
		"paddingBottom-0": "_1pvzu",
		"paddingBottom-1em": "_20Bm9",
		"paddingBottom-1rem": "_3Es8b",
		"paddingLeft-0": "gs79y",
		"paddingLeft-1em": "_1iu1i",
		"paddingLeft-1rem": "_3LUYc",
		"paddingRight-0": "Y6Y8a",
		"paddingRight-1em": "_24CSk",
		"paddingRight-1rem": "_2jbkg",
		"paddingTop-0": "DcBjR",
		"paddingTop-1em": "_18D1k",
		"paddingTop-1rem": "_2s0Z0",
		"pointerEvents-auto": "_2-AIP",
		"pointerEvents-none": "_1-hci",
		"pointerEvents-box-none": "_1I3f3",
		"pointerEvents-box-only": "_1BVaV",
		"position-absolute": "_1c_0S",
		"position-fixed": "Z_EKh",
		"position-relative": "_1JpQV",
		"right-0": "_1pDJK",
		"right-50": "_3YsPs",
		"right-100": "Qqclr",
		"textAlign-center": "_1nr90",
		"textAlign-end": "_2dwRb",
		"textAlign-inherit": "_3X1N9",
		"textAlign-left": "LHkfK",
		"textAlign-right": "_3oTt9",
		"textAlign-justify": "_1Zktz",
		"textAlign-start": "_17c7P",
		"textDecoration-inherit": "_2RaZH",
		"textDecoration-none": "_1DYgE",
		"textDecoration-underline": "_3FCsp",
		"textOverflow-clip": "_1OtdW",
		"textOverflow-ellipsis": "UONXP",
		"textRendering-auto": "_1WKRB",
		"textRendering-geometricPrecision": "_2yVKX",
		"textRendering-inherit": "_2rIAm",
		"textRendering-optimizeLegibility": "f2lL4",
		"textRendering-optimizeSpeed": "_19RQq",
		"textTransform-capitalize": "_10Fet",
		"textTransform-lowercase": "_1PWJe",
		"textTransform-none": "whG3f",
		"textTransform-uppercase": "Msmvf",
		"top-0": "_1DcqY",
		"top-50": "AOBb8",
		"top-100": "_3Yy1D",
		"unicodeBidi-bidi-override": "_9rLSO",
		"unicodeBidi-embed": "TiWK6",
		"unicodeBidi-inherit": "_1tRRf",
		"unicodeBidi-isolate": "_2SCzg",
		"unicodeBidi-isolate-override": "_3Kx0r",
		"unicodeBidi-normal": "_1ANUn",
		"unicodeBidi-plaintext": "KINgC",
		"userSelect-all": "_2Gg7e",
		"userSelect-inherit": "_1_abN",
		"userSelect-none": "_1PNXd",
		"userSelect-text": "_3dmR5",
		"visibility-collapse": "_1yMWS",
		"visibility-hidden": "_2bW1R",
		"visibility-inherit": "R28Cu",
		"visibility-visible": "MTnfI",
		"whiteSpace-normal": "_35e5k",
		"whiteSpace-nowrap": "_3sO9U",
		"whiteSpace-pre": "_3451w",
		"whiteSpace-pre-line": "_1-LZy",
		"whiteSpace-pre-wrap": "_2HqfR",
		"width-0": "A91a2",
		"width-10%": "_3tCoJ",
		"width-12.5%": "IpFKM",
		"width-20%": "_1oH7H",
		"width-25%": "_3DzPc",
		"width-30%": "_2b9Gj",
		"width-37.5%": "_2Y68g",
		"width-40%": "_-0geS",
		"width-50%": "_2evLB",
		"width-60%": "_2leCT",
		"width-62.5%": "_3GJVx",
		"width-70%": "_3P-N5",
		"width-75%": "YRieP",
		"width-80%": "QqwK2",
		"width-87.5%": "_29djP",
		"width-90%": "_2oqvm",
		"width-100%": "_3tmvP",
		"wordWrap-break-word": "_2xfiT",
		"wordWrap-normal": "_3fRTD",
		"zIndex--1": "_2Tg0P",
		"zIndex-0": "_15ULt",
		"zIndex-1": "_3f7OC",
		"zIndex-2": "_2aejB",
		"zIndex-3": "_1CRJo",
		"zIndex-4": "_3qbuC",
		"zIndex-5": "_2H2zz",
		"zIndex-6": "GSzKs",
		"zIndex-7": "_1srWa",
		"zIndex-8": "_3Juhg",
		"zIndex-9": "_11gqb",
		"zIndex-10": "_376KA"
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(2);

	var numberOrString = _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]);

	var string = _react.PropTypes.string;
	exports['default'] = {
	  alignContent: string,
	  alignItems: string,
	  alignSelf: string,
	  backfaceVisibility: string,
	  // background
	  backgroundAttachment: string,
	  backgroundClip: string,
	  backgroundColor: string,
	  backgroundImage: string,
	  backgroundOrigin: string,
	  backgroundPosition: string,
	  backgroundRepeat: string,
	  backgroundSize: string,
	  // border color
	  borderColor: numberOrString,
	  borderBottomColor: numberOrString,
	  borderLeftColor: numberOrString,
	  borderRightColor: numberOrString,
	  borderTopColor: numberOrString,
	  // border-radius
	  borderRadius: numberOrString,
	  borderTopLeftRadius: numberOrString,
	  borderTopRightRadius: numberOrString,
	  borderBottomLeftRadius: numberOrString,
	  borderBottomRightRadius: numberOrString,
	  // border style
	  borderStyle: numberOrString,
	  borderBottomStyle: numberOrString,
	  borderLeftStyle: numberOrString,
	  borderRightStyle: numberOrString,
	  borderTopStyle: numberOrString,
	  // border width
	  borderWidth: numberOrString,
	  borderBottomWidth: numberOrString,
	  borderLeftWidth: numberOrString,
	  borderRightWidth: numberOrString,
	  borderTopWidth: numberOrString,
	  bottom: numberOrString,
	  boxSizing: string,
	  clear: string,
	  color: string,
	  direction: string,
	  display: string,
	  flexBasis: string,
	  flexDirection: string,
	  flexGrow: numberOrString,
	  flexShrink: numberOrString,
	  flexWrap: string,
	  float: string,
	  font: string,
	  fontFamily: string,
	  fontSize: string,
	  fontStyle: string,
	  fontWeight: string,
	  height: numberOrString,
	  justifyContent: string,
	  left: numberOrString,
	  letterSpacing: string,
	  lineHeight: numberOrString,
	  // margin
	  margin: numberOrString,
	  marginBottom: numberOrString,
	  marginLeft: numberOrString,
	  marginRight: numberOrString,
	  marginTop: numberOrString,
	  // min/max
	  maxHeight: numberOrString,
	  maxWidth: numberOrString,
	  minHeight: numberOrString,
	  minWidth: numberOrString,
	  opacity: numberOrString,
	  order: numberOrString,
	  overflow: string,
	  overflowX: string,
	  overflowY: string,
	  // padding
	  padding: numberOrString,
	  paddingBottom: numberOrString,
	  paddingLeft: numberOrString,
	  paddingRight: numberOrString,
	  paddingTop: numberOrString,
	  position: string,
	  right: numberOrString,
	  textAlign: string,
	  textDecoration: string,
	  textTransform: string,
	  top: numberOrString,
	  userSelect: string,
	  visibility: string,
	  whiteSpace: string,
	  width: numberOrString,
	  wordWrap: string,
	  zIndex: numberOrString
	};
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(33)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _View = __webpack_require__(57);

	var _View2 = _interopRequireDefault(_View);

	exports['default'] = _extends({}, _View2['default'].stylePropTypes);
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _extends = __webpack_require__(33)['default'];

	var _objectWithoutProperties = __webpack_require__(47)['default'];

	var _Object$keys = __webpack_require__(40)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesFilterObjectProps = __webpack_require__(43);

	var _CoreComponent = __webpack_require__(44);

	var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ViewStylePropTypes = __webpack_require__(58);

	var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

	var styles = {
	  // https://github.com/facebook/css-layout#default-values
	  initial: {
	    alignItems: 'stretch',
	    borderWidth: 0,
	    borderStyle: 'solid',
	    boxSizing: 'border-box',
	    display: 'flex',
	    flexBasis: 'auto',
	    flexDirection: 'column',
	    flexShrink: 0,
	    listStyle: 'none',
	    margin: 0,
	    padding: 0,
	    position: 'relative',
	    // button reset
	    backgroundColor: 'transparent',
	    color: 'inherit',
	    font: 'inherit',
	    textAlign: 'inherit'
	  }
	};

	var View = (function (_React$Component) {
	  _inherits(View, _React$Component);

	  function View() {
	    _classCallCheck(this, View);

	    _get(Object.getPrototypeOf(View.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(View, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var accessibilityLabel = _props.accessibilityLabel;
	      var pointerEvents = _props.pointerEvents;
	      var style = _props.style;
	      var testID = _props.testID;

	      var other = _objectWithoutProperties(_props, ['accessibilityLabel', 'pointerEvents', 'style', 'testID']);

	      var pointerEventsStyle = pointerEvents && { pointerEvents: pointerEvents };
	      var resolvedStyle = (0, _modulesFilterObjectProps.pickProps)(style, _Object$keys(_ViewStylePropTypes2['default']));

	      return _react2['default'].createElement(_CoreComponent2['default'], _extends({}, other, {
	        'aria-label': accessibilityLabel,
	        className: 'View',
	        style: _extends({}, styles.initial, resolvedStyle, pointerEventsStyle),
	        testID: testID
	      }));
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      accessibilityLabel: _react.PropTypes.string,
	      children: _react.PropTypes.any,
	      component: _CoreComponent2['default'].propTypes.component,
	      pointerEvents: _react.PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
	      style: _react.PropTypes.shape(_ViewStylePropTypes2['default']),
	      testID: _CoreComponent2['default'].propTypes.testID
	    },
	    enumerable: true
	  }, {
	    key: 'stylePropTypes',
	    value: _ViewStylePropTypes2['default'],
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      component: 'div',
	      style: styles.initial
	    },
	    enumerable: true
	  }]);

	  return View;
	})(_react2['default'].Component);

	exports['default'] = View;
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(33)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesFilterObjectProps = __webpack_require__(43);

	var _CoreComponent = __webpack_require__(44);

	var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

	exports['default'] = _extends({}, (0, _modulesFilterObjectProps.pickProps)(_CoreComponent2['default'].stylePropTypes, ['alignContent', 'alignItems', 'alignSelf', 'backfaceVisibility',
	// background
	'backgroundAttachment', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundPosition', 'backgroundOrigin', 'backgroundRepeat', 'backgroundSize',
	// border-color
	'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
	// border-radius
	'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
	// border style
	'borderStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderRightStyle', 'borderTopStyle',
	// border width
	'borderWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'bottom', 'boxShadow', 'boxSizing', 'flexBasis', 'flexDirection', 'flexGrow', 'flexShrink', 'flexWrap', 'height', 'justifyContent', 'left',
	// margin
	'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop',
	// max/min
	'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'opacity', 'order', 'overflow', 'overflowX', 'overflowY',
	// padding
	'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'position', 'right', 'top', 'transform', 'userSelect', 'visibility', 'width', 'zIndex']));
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ScrollView = __webpack_require__(60);

	var _ScrollView2 = _interopRequireDefault(_ScrollView);

	var ListView = (function (_React$Component) {
	  _inherits(ListView, _React$Component);

	  function ListView() {
	    _classCallCheck(this, ListView);

	    _get(Object.getPrototypeOf(ListView.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ListView, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_ScrollView2['default'], this.props);
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      children: _react.PropTypes.any
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      className: ''
	    },
	    enumerable: true
	  }]);

	  return ListView;
	})(_react2['default'].Component);

	exports['default'] = ListView;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _View = __webpack_require__(57);

	var _View2 = _interopRequireDefault(_View);

	var ScrollView = (function (_React$Component) {
	  _inherits(ScrollView, _React$Component);

	  function ScrollView() {
	    _classCallCheck(this, ScrollView);

	    _get(Object.getPrototypeOf(ScrollView.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ScrollView, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_View2['default'], this.props);
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      children: _react.PropTypes.any
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      className: ''
	    },
	    enumerable: true
	  }]);

	  return ScrollView;
	})(_react2['default'].Component);

	exports['default'] = ScrollView;
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _reactSwipeable = __webpack_require__(62);

	var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

	exports['default'] = _reactSwipeable2['default'];
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2)

	var Swipeable = React.createClass({displayName: "Swipeable",
	  propTypes: {
	    onSwiped: React.PropTypes.func,
	    onSwipingUp: React.PropTypes.func,
	    onSwipingRight: React.PropTypes.func,
	    onSwipingDown: React.PropTypes.func,
	    onSwipingLeft: React.PropTypes.func,
	    onSwipedUp: React.PropTypes.func,
	    onSwipedRight: React.PropTypes.func,
	    onSwipedDown: React.PropTypes.func,
	    onSwipedLeft: React.PropTypes.func,
	    flickThreshold: React.PropTypes.number,
	    delta: React.PropTypes.number
	  },

	  getInitialState: function () {
	    return {
	      x: null,
	      y: null,
	      swiping: false,
	      start: 0
	    }
	  },

	  getDefaultProps: function () {
	    return {
	      flickThreshold: 0.6,
	      delta: 10
	    }
	  },

	  calculatePos: function (e) {
	    var x = e.changedTouches[0].clientX
	    var y = e.changedTouches[0].clientY

	    var xd = this.state.x - x
	    var yd = this.state.y - y

	    var axd = Math.abs(xd)
	    var ayd = Math.abs(yd)

	    return {
	      deltaX: xd,
	      deltaY: yd,
	      absX: axd,
	      absY: ayd
	    }
	  },

	  touchStart: function (e) {
	    if (e.touches.length > 1) {
	      return
	    }
	    this.setState({
	      start: Date.now(),
	      x: e.touches[0].clientX,
	      y: e.touches[0].clientY,
	      swiping: false
	    })
	  },

	  touchMove: function (e) {
	    if (!this.state.x || !this.state.y || e.touches.length > 1) {
	      return
	    }

	    var cancelPageSwipe = false
	    var pos = this.calculatePos(e)

	    if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
	      return
	    }

	    if (pos.absX > pos.absY) {
	      if (pos.deltaX > 0) {
	        if (this.props.onSwipingLeft) {
	          this.props.onSwipingLeft(e, pos.absX)
	          cancelPageSwipe = true
	        }
	      } else {
	        if (this.props.onSwipingRight) {
	          this.props.onSwipingRight(e, pos.absX)
	          cancelPageSwipe = true
	        }
	      }
	    } else {
	      if (pos.deltaY > 0) {
	        if (this.props.onSwipingUp) {
	          this.props.onSwipingUp(e, pos.absY)
	          cancelPageSwipe = true
	        }
	      } else {
	        if (this.props.onSwipingDown) {
	          this.props.onSwipingDown(e, pos.absY)
	          cancelPageSwipe = true
	        }
	      }
	    }

	    this.setState({ swiping: true })

	    if (cancelPageSwipe) {
	      e.preventDefault()
	    }
	  },

	  touchEnd: function (ev) {
	    if (this.state.swiping) {
	      var pos = this.calculatePos(ev)

	      var time = Date.now() - this.state.start
	      var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time
	      var isFlick = velocity > this.props.flickThreshold

	      this.props.onSwiped && this.props.onSwiped(
	        ev,
	        pos.deltaX,
	        pos.deltaY,
	        isFlick
	      )
	      
	      if (pos.absX > pos.absY) {
	        if (pos.deltaX > 0) {
	          this.props.onSwipedLeft && this.props.onSwipedLeft(ev, pos.deltaX)
	        } else {
	          this.props.onSwipedRight && this.props.onSwipedRight(ev, pos.deltaX)
	        }
	      } else {
	        if (pos.deltaY > 0) {
	          this.props.onSwipedUp && this.props.onSwipedUp(ev, pos.deltaY)
	        } else {
	          this.props.onSwipedDown && this.props.onSwipedDown(ev, pos.deltaY)
	        }
	      }
	    }
	    
	    this.setState(this.getInitialState())
	  },

	  render: function () {
	    return (
	      React.createElement("div", React.__spread({},  this.props, 
	        {onTouchStart: this.touchStart, 
	        onTouchMove: this.touchMove, 
	        onTouchEnd: this.touchEnd}), 
	          this.props.children
	      )  
	    )
	  }
	})

	module.exports = Swipeable


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _extends = __webpack_require__(33)['default'];

	var _Object$keys = __webpack_require__(40)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesFilterObjectProps = __webpack_require__(43);

	var _CoreComponent = __webpack_require__(44);

	var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _TextStylePropTypes = __webpack_require__(64);

	var _TextStylePropTypes2 = _interopRequireDefault(_TextStylePropTypes);

	var styles = {
	  initial: {
	    color: 'inherit',
	    display: 'inline-block',
	    font: 'inherit',
	    margin: 0,
	    padding: 0,
	    wordWrap: 'break-word'
	  },
	  singleLineStyle: {
	    maxWidth: '100%',
	    overflow: 'hidden',
	    textOverflow: 'ellipsis',
	    whiteSpace: 'nowrap'
	  }
	};

	var Text = (function (_React$Component) {
	  _inherits(Text, _React$Component);

	  function Text() {
	    _classCallCheck(this, Text);

	    _get(Object.getPrototypeOf(Text.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Text, [{
	    key: '_onPress',
	    value: function _onPress(e) {
	      if (this.props.onPress) this.props.onPress(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	      var component = _props.component;
	      var numberOfLines = _props.numberOfLines;
	      var style = _props.style;
	      var testID = _props.testID;

	      var resolvedStyle = (0, _modulesFilterObjectProps.pickProps)(style, _Object$keys(_TextStylePropTypes2['default']));

	      return _react2['default'].createElement(_CoreComponent2['default'], {
	        children: children,
	        className: 'Text',
	        component: component,
	        onClick: this._onPress.bind(this),
	        style: _extends({}, styles.initial, resolvedStyle, numberOfLines === 1 && styles.singleLineStyle),
	        testID: testID
	      });
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      children: _react.PropTypes.any,
	      component: _CoreComponent2['default'].propTypes.component,
	      numberOfLines: _react.PropTypes.number,
	      onPress: _react.PropTypes.func,
	      style: _react.PropTypes.shape(_TextStylePropTypes2['default']),
	      testID: _CoreComponent2['default'].propTypes.testID
	    },
	    enumerable: true
	  }, {
	    key: 'stylePropTypes',
	    value: _TextStylePropTypes2['default'],
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      component: 'span',
	      style: styles.initial
	    },
	    enumerable: true
	  }]);

	  return Text;
	})(_react2['default'].Component);

	exports['default'] = Text;
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(33)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesFilterObjectProps = __webpack_require__(43);

	var _CoreComponent = __webpack_require__(44);

	var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

	exports['default'] = _extends({}, (0, _modulesFilterObjectProps.pickProps)(_CoreComponent2['default'].stylePropTypes, ['backgroundColor', 'color', 'direction', 'font', 'fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'textAlign', 'textDecoration', 'textTransform', 'whiteSpace', 'wordWrap']));
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _extends = __webpack_require__(33)['default'];

	var _Object$keys = __webpack_require__(40)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesFilterObjectProps = __webpack_require__(43);

	var _CoreComponent = __webpack_require__(44);

	var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _TextInputStylePropTypes = __webpack_require__(66);

	var _TextInputStylePropTypes2 = _interopRequireDefault(_TextInputStylePropTypes);

	var styles = {
	  initial: {
	    appearance: 'none',
	    backgroundColor: 'transparent',
	    borderWidth: '1px',
	    color: 'inherit',
	    font: 'inherit'
	  }
	};

	var TextInput = (function (_React$Component) {
	  _inherits(TextInput, _React$Component);

	  function TextInput() {
	    _classCallCheck(this, TextInput);

	    _get(Object.getPrototypeOf(TextInput.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(TextInput, [{
	    key: '_onBlur',
	    value: function _onBlur(e) {
	      if (this.props.onBlur) this.props.onBlur(e);
	    }
	  }, {
	    key: '_onChange',
	    value: function _onChange(e) {
	      if (this.props.onChangeText) this.props.onChangeText(e.target.value);
	      if (this.props.onChange) this.props.onChange(e);
	    }
	  }, {
	    key: '_onFocus',
	    value: function _onFocus(e) {
	      if (this.props.onFocus) this.props.onFocus(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var autoComplete = _props.autoComplete;
	      var autoFocus = _props.autoFocus;
	      var defaultValue = _props.defaultValue;
	      var editable = _props.editable;
	      var keyboardType = _props.keyboardType;
	      var multiline = _props.multiline;
	      var placeholder = _props.placeholder;
	      var secureTextEntry = _props.secureTextEntry;
	      var style = _props.style;
	      var testID = _props.testID;

	      var resolvedStyle = (0, _modulesFilterObjectProps.pickProps)(style, _Object$keys(_TextInputStylePropTypes2['default']));
	      var type = secureTextEntry && 'password' || (keyboardType === 'default' ? '' : keyboardType);

	      return _react2['default'].createElement(_CoreComponent2['default'], {
	        autoComplete: autoComplete,
	        autoFocus: autoFocus,
	        className: 'TextInput',
	        component: multiline ? 'textarea' : 'input',
	        defaultValue: defaultValue || placeholder,
	        onBlur: this._onBlur.bind(this),
	        onChange: this._onChange.bind(this),
	        onFocus: this._onFocus.bind(this),
	        readOnly: !editable,
	        style: _extends({}, styles.initial, resolvedStyle),
	        testID: testID,
	        type: multiline ? type : undefined
	      });
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      autoComplete: _react.PropTypes.bool,
	      autoFocus: _react.PropTypes.bool,
	      defaultValue: _react.PropTypes.string,
	      editable: _react.PropTypes.bool,
	      keyboardType: _react.PropTypes.oneOf(['default', 'email', 'numeric', 'search', 'tel', 'url']),
	      multiline: _react.PropTypes.bool,
	      onBlur: _react.PropTypes.func,
	      onChange: _react.PropTypes.func,
	      onChangeText: _react.PropTypes.func,
	      onFocus: _react.PropTypes.func,
	      placeholder: _react.PropTypes.string,
	      secureTextEntry: _react.PropTypes.bool,
	      style: _react.PropTypes.shape(_TextInputStylePropTypes2['default']),
	      testID: _CoreComponent2['default'].propTypes.testID
	    },
	    enumerable: true
	  }, {
	    key: 'stylePropTypes',
	    value: _TextInputStylePropTypes2['default'],
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      autoComplete: false,
	      autoFocus: false,
	      editable: true,
	      keyboardType: 'default',
	      multiline: false,
	      secureTextEntry: false,
	      style: styles.initial
	    },
	    enumerable: true
	  }]);

	  return TextInput;
	})(_react2['default'].Component);

	exports['default'] = TextInput;
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(33)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modulesFilterObjectProps = __webpack_require__(43);

	var _View = __webpack_require__(57);

	var _View2 = _interopRequireDefault(_View);

	var _CoreComponent = __webpack_require__(44);

	var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

	exports['default'] = _extends({}, _View2['default'].stylePropTypes, (0, _modulesFilterObjectProps.pickProps)(_CoreComponent2['default'].stylePropTypes, ['color', 'direction', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'lineHeight', 'textAlign', 'textDecoration', 'textTransform']));
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)['default'];

	var _inherits = __webpack_require__(18)['default'];

	var _createClass = __webpack_require__(29)['default'];

	var _classCallCheck = __webpack_require__(32)['default'];

	var _extends = __webpack_require__(33)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactTappable = __webpack_require__(68);

	var _reactTappable2 = _interopRequireDefault(_reactTappable);

	var Touchable = (function (_React$Component) {
	  _inherits(Touchable, _React$Component);

	  function Touchable(props, context) {
	    _classCallCheck(this, Touchable);

	    _get(Object.getPrototypeOf(Touchable.prototype), 'constructor', this).call(this, props, context);
	    this.state = {
	      isActive: false
	    };
	  }

	  _createClass(Touchable, [{
	    key: '_onLongPress',
	    value: function _onLongPress(e) {
	      if (this.props.onLongPress) this.props.onLongPress(e);
	    }
	  }, {
	    key: '_onPress',
	    value: function _onPress(e) {
	      if (this.props.onPress) this.props.onPress(e);
	    }
	  }, {
	    key: '_onPressIn',
	    value: function _onPressIn(e) {
	      this.setState({ isActive: true });
	      if (this.props.onPressIn) this.props.onPressIn(e);
	    }
	  }, {
	    key: '_onPressOut',
	    value: function _onPressOut(e) {
	      this.setState({ isActive: false });
	      if (this.props.onPressOut) this.props.onPressOut(e);
	    }
	  }, {
	    key: '_getChildren',
	    value: function _getChildren() {
	      var _props = this.props;
	      var activeOpacity = _props.activeOpacity;
	      var children = _props.children;

	      return _react2['default'].cloneElement(_react2['default'].Children.only(children), {
	        style: _extends({}, children.props.style, this.state.isActive ? { opacity: activeOpacity } : {})
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var activeHighlight = _props2.activeHighlight;
	      var component = _props2.component;
	      var delayLongPress = _props2.delayLongPress;

	      return _react2['default'].createElement(_reactTappable2['default'], {
	        children: this._getChildren(),
	        component: component,
	        onMouseDown: this._onPressIn.bind(this),
	        onMouseUp: this._onPressOut.bind(this),
	        onPress: this._onLongPress.bind(this),
	        onTap: this._onPress.bind(this),
	        onTouchEnd: this._onPressOut.bind(this),
	        onTouchStart: this._onPressIn.bind(this),
	        pressDelay: delayLongPress,
	        pressMoveThreshold: 5,
	        style: { backgroundColor: this.state.isActive ? activeHighlight : null }
	      });
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      activeHighlight: _react.PropTypes.string,
	      activeOpacity: _react.PropTypes.number,
	      children: _react.PropTypes.element,
	      component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	      delayLongPress: _react.PropTypes.number,
	      delayPressIn: _react.PropTypes.number,
	      delayPressOut: _react.PropTypes.number,
	      onLongPress: _react.PropTypes.func,
	      onPress: _react.PropTypes.func,
	      onPressIn: _react.PropTypes.func,
	      onPressOut: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      activeHighlight: 'transparent',
	      activeOpacity: 1,
	      component: 'div',
	      delayLongPress: 1000,
	      delayPressIn: 0,
	      delayPressOut: 0
	    },
	    enumerable: true
	  }]);

	  return Touchable;
	})(_react2['default'].Component);

	exports['default'] = Touchable;
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var TappableMixin = __webpack_require__(69);
	var PinchableMixin = __webpack_require__(70);
	var getComponent = __webpack_require__(71);
	var touchStyles = __webpack_require__(72);

	var Component = getComponent([TappableMixin, PinchableMixin]);

	module.exports = Component;
	module.exports.touchStyles = touchStyles;
	module.exports.Mixin = _extends({}, TappableMixin, {
	  onPinchStart: PinchableMixin.onPinchStart,
	  onPinchMove: PinchableMixin.onPinchMove,
	  onPinchEnd: PinchableMixin.onPinchEnd
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	function getTouchProps(touch) {
		if (!touch) return {};
		return {
			pageX: touch.pageX,
			pageY: touch.pageY,
			clientX: touch.clientX,
			clientY: touch.clientY
		};
	}

	var Mixin = {
		propTypes: {
			moveThreshold: React.PropTypes.number, // pixels to move before cancelling tap
			activeDelay: React.PropTypes.number, // ms to wait before adding the `-active` class
			pressDelay: React.PropTypes.number, // ms to wait before detecting a press
			pressMoveThreshold: React.PropTypes.number, // pixels to move before cancelling press
			preventDefault: React.PropTypes.bool, // whether to preventDefault on all events
			stopPropagation: React.PropTypes.bool, // whether to stopPropagation on all events

			onTap: React.PropTypes.func, // fires when a tap is detected
			onPress: React.PropTypes.func, // fires when a press is detected
			onTouchStart: React.PropTypes.func, // pass-through touch event
			onTouchMove: React.PropTypes.func, // pass-through touch event
			onTouchEnd: React.PropTypes.func, // pass-through touch event
			onMouseDown: React.PropTypes.func, // pass-through mouse event
			onMouseUp: React.PropTypes.func, // pass-through mouse event
			onMouseMove: React.PropTypes.func, // pass-through mouse event
			onMouseOut: React.PropTypes.func // pass-through mouse event
		},

		getDefaultProps: function getDefaultProps() {
			return {
				activeDelay: 0,
				moveThreshold: 100,
				pressDelay: 1000,
				pressMoveThreshold: 5
			};
		},

		getInitialState: function getInitialState() {
			return {
				isActive: false,
				touchActive: false,
				pinchActive: false
			};
		},

		componentWillUnmount: function componentWillUnmount() {
			this.cleanupScrollDetection();
			this.cancelPressDetection();
			this.clearActiveTimeout();
		},

		processEvent: function processEvent(event) {
			if (this.props.preventDefault) event.preventDefault();
			if (this.props.stopPropagation) event.stopPropagation();
		},

		onTouchStart: function onTouchStart(event) {
			if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
			this.processEvent(event);
			window._blockMouseEvents = true;
			if (event.touches.length === 1) {
				this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
				this.initScrollDetection();
				this.initPressDetection(event, this.endTouch);
				this._activeTimeout = setTimeout(this.makeActive, this.props.activeDelay);
			} else if (this.onPinchStart && (this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
				this.onPinchStart(event);
			}
		},

		makeActive: function makeActive() {
			if (!this.isMounted()) return;
			this.clearActiveTimeout();
			this.setState({
				isActive: true
			});
		},

		clearActiveTimeout: function clearActiveTimeout() {
			clearTimeout(this._activeTimeout);
			this._activeTimeout = false;
		},

		initScrollDetection: function initScrollDetection() {
			this._scrollPos = { top: 0, left: 0 };
			this._scrollParents = [];
			this._scrollParentPos = [];
			var node = this.getDOMNode();
			while (node) {
				if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
					this._scrollParents.push(node);
					this._scrollParentPos.push(node.scrollTop + node.scrollLeft);
					this._scrollPos.top += node.scrollTop;
					this._scrollPos.left += node.scrollLeft;
				}
				node = node.parentNode;
			}
		},

		calculateMovement: function calculateMovement(touch) {
			return {
				x: Math.abs(touch.clientX - this._initialTouch.clientX),
				y: Math.abs(touch.clientY - this._initialTouch.clientY)
			};
		},

		detectScroll: function detectScroll() {
			var currentScrollPos = { top: 0, left: 0 };
			for (var i = 0; i < this._scrollParents.length; i++) {
				currentScrollPos.top += this._scrollParents[i].scrollTop;
				currentScrollPos.left += this._scrollParents[i].scrollLeft;
			}
			return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
		},

		cleanupScrollDetection: function cleanupScrollDetection() {
			this._scrollParents = undefined;
			this._scrollPos = undefined;
		},

		initPressDetection: function initPressDetection(event, callback) {
			if (!this.props.onPress) return;
			this._pressTimeout = setTimeout((function () {
				this.props.onPress(event);
				callback();
			}).bind(this), this.props.pressDelay);
		},

		cancelPressDetection: function cancelPressDetection() {
			clearTimeout(this._pressTimeout);
		},

		onTouchMove: function onTouchMove(event) {
			if (this._initialTouch) {
				this.processEvent(event);

				if (this.detectScroll()) return this.endTouch(event);

				this.props.onTouchMove && this.props.onTouchMove(event);
				this._lastTouch = getTouchProps(event.touches[0]);
				var movement = this.calculateMovement(this._lastTouch);
				if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
					this.cancelPressDetection();
				}
				if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
					if (this.state.isActive) {
						this.setState({
							isActive: false
						});
					} else if (this._activeTimeout) {
						this.clearActiveTimeout();
					}
				} else {
					if (!this.state.isActive && !this._activeTimeout) {
						this.setState({
							isActive: true
						});
					}
				}
			} else if (this._initialPinch && event.touches.length === 2 && this.onPinchMove) {
				this.onPinchMove(event);
				event.preventDefault();
			}
		},

		onTouchEnd: function onTouchEnd(event) {
			var _this = this;

			if (this._initialTouch) {
				this.processEvent(event);
				var afterEndTouch;
				var movement = this.calculateMovement(this._lastTouch);
				if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
					event.preventDefault();
					afterEndTouch = function () {
						var finalParentScrollPos = _this._scrollParents.map(function (node) {
							return node.scrollTop + node.scrollLeft;
						});
						var stoppedMomentumScroll = _this._scrollParentPos.some(function (end, i) {
							return end !== finalParentScrollPos[i];
						});
						if (!stoppedMomentumScroll) {
							_this.props.onTap(event);
						}
					};
				}
				this.endTouch(event, afterEndTouch);
			} else if (this.onPinchEnd && this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
				this.onPinchEnd(event);
				event.preventDefault();
			}
		},

		endTouch: function endTouch(event, callback) {
			this.cancelPressDetection();
			this.clearActiveTimeout();
			if (event && this.props.onTouchEnd) {
				this.props.onTouchEnd(event);
			}
			this._initialTouch = null;
			this._lastTouch = null;
			if (callback) {
				callback();
			}
			if (this.state.isActive) {
				this.setState({
					isActive: false
				});
			}
		},

		onMouseDown: function onMouseDown(event) {
			if (window._blockMouseEvents) {
				window._blockMouseEvents = false;
				return;
			}
			if (this.props.onMouseDown && this.props.onMouseDown(event) === false) return;
			this.processEvent(event);
			this.initPressDetection(event, this.endMouseEvent);
			this._mouseDown = true;
			this.setState({
				isActive: true
			});
		},

		onMouseMove: function onMouseMove(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseMove && this.props.onMouseMove(event);
		},

		onMouseUp: function onMouseUp(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseUp && this.props.onMouseUp(event);
			this.props.onTap && this.props.onTap(event);
			this.endMouseEvent();
		},

		onMouseOut: function onMouseOut(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseOut && this.props.onMouseOut(event);
			this.endMouseEvent();
		},

		endMouseEvent: function endMouseEvent() {
			this.cancelPressDetection();
			this._mouseDown = false;
			this.setState({
				isActive: false
			});
		},

		cancelTap: function cancelTap() {
			this.endTouch();
			this._mouseDown = false;
		},

		handlers: function handlers() {
			return {
				onTouchStart: this.onTouchStart,
				onTouchMove: this.onTouchMove,
				onTouchEnd: this.onTouchEnd,
				onMouseDown: this.onMouseDown,
				onMouseUp: this.onMouseUp,
				onMouseMove: this.onMouseMove,
				onMouseOut: this.onMouseOut
			};
		}
	};

	module.exports = Mixin;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);

	function getPinchProps(touches) {
		return {
			touches: Array.prototype.map.call(touches, function copyTouch(touch) {
				return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
			}),
			center: { x: (touches[0].pageX + touches[1].pageX) / 2, y: (touches[0].pageY + touches[1].pageY) / 2 },
			angle: Math.atan() * (touches[1].pageY - touches[0].pageY) / (touches[1].pageX - touches[0].pageX) * 180 / Math.PI,
			distance: Math.sqrt(Math.pow(Math.abs(touches[1].pageX - touches[0].pageX), 2) + Math.pow(Math.abs(touches[1].pageY - touches[0].pageY), 2))
		};
	}

	var Mixin = {
		propTypes: {
			onPinchStart: React.PropTypes.func, // fires when a pinch gesture is started
			onPinchMove: React.PropTypes.func, // fires on every touch-move when a pinch action is active
			onPinchEnd: React.PropTypes.func // fires when a pinch action ends
		},

		onPinchStart: function onPinchStart(event) {
			// in case the two touches didn't start exactly at the same time
			if (this._initialTouch) {
				this.endTouch();
			}
			var touches = event.touches;
			this._initialPinch = getPinchProps(touches);
			this._initialPinch = _extends(this._initialPinch, {
				displacement: { x: 0, y: 0 },
				displacementVelocity: { x: 0, y: 0 },
				rotation: 0,
				rotationVelocity: 0,
				zoom: 1,
				zoomVelocity: 0,
				time: Date.now()
			});
			this._lastPinch = this._initialPinch;
			this.props.onPinchStart && this.props.onPinchStart(this._initialPinch, event);
		},

		onPinchMove: function onPinchMove(event) {
			if (this._initialTouch) {
				this.endTouch();
			}
			var touches = event.touches;
			if (touches.length !== 2) {
				return this.onPinchEnd(event); // bail out before disaster
			}

			var currentPinch = touches[0].identifier === this._initialPinch.touches[0].identifier && touches[1].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches) // the touches are in the correct order
			: touches[1].identifier === this._initialPinch.touches[0].identifier && touches[0].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches.reverse()) // the touches have somehow changed order
			: getPinchProps(touches); // something is wrong, but we still have two touch-points, so we try not to fail

			currentPinch.displacement = {
				x: currentPinch.center.x - this._initialPinch.center.x,
				y: currentPinch.center.y - this._initialPinch.center.y
			};

			currentPinch.time = Date.now();
			var timeSinceLastPinch = currentPinch.time - this._lastPinch.time;

			currentPinch.displacementVelocity = {
				x: (currentPinch.displacement.x - this._lastPinch.displacement.x) / timeSinceLastPinch,
				y: (currentPinch.displacement.y - this._lastPinch.displacement.y) / timeSinceLastPinch
			};

			currentPinch.rotation = currentPinch.angle - this._initialPinch.angle;
			currentPinch.rotationVelocity = currentPinch.rotation - this._lastPinch.rotation / timeSinceLastPinch;

			currentPinch.zoom = currentPinch.distance / this._initialPinch.distance;
			currentPinch.zoomVelocity = (currentPinch.zoom - this._lastPinch.zoom) / timeSinceLastPinch;

			this.props.onPinchMove && this.props.onPinchMove(currentPinch, event);

			this._lastPinch = currentPinch;
		},

		onPinchEnd: function onPinchEnd(event) {
			// TODO use helper to order touches by identifier and use actual values on touchEnd.
			var currentPinch = _extends({}, this._lastPinch);
			currentPinch.time = Date.now();

			if (currentPinch.time - this._lastPinch.time > 16) {
				currentPinch.displacementVelocity = 0;
				currentPinch.rotationVelocity = 0;
				currentPinch.zoomVelocity = 0;
			}

			this.props.onPinchEnd && this.props.onPinchEnd(currentPinch, event);

			this._initialPinch = this._lastPinch = null;

			// If one finger is still on screen, it should start a new touch event for swiping etc
			// But it should never fire an onTap or onPress event.
			// Since there is no support swipes yet, this should be disregarded for now
			// if (event.touches.length === 1) {
			// 	this.onTouchStart(event);
			// }
		}
	};

	module.exports = Mixin;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var touchStyles = __webpack_require__(72);

	/**
	 * Tappable Component
	 * ==================
	 */
	module.exports = function (mixins) {
		return React.createClass({
			displayName: 'Tappable',

			mixins: mixins,

			propTypes: {
				component: React.PropTypes.any, // component to create
				className: React.PropTypes.string, // optional className
				classBase: React.PropTypes.string, // base for generated classNames
				style: React.PropTypes.object, // additional style properties for the component
				disabled: React.PropTypes.bool // only applies to buttons
			},

			getDefaultProps: function getDefaultProps() {
				return {
					component: 'span',
					classBase: 'Tappable'
				};
			},

			render: function render() {
				var props = this.props;
				var className = props.classBase + (this.state.isActive ? '-active' : '-inactive');

				if (props.className) {
					className += ' ' + props.className;
				}

				var style = {};
				_extends(style, touchStyles, props.style);

				var newComponentProps = _extends({}, props, {
					style: style,
					className: className,
					disabled: props.disabled,
					handlers: this.handlers
				}, this.handlers());

				delete newComponentProps.onTap;
				delete newComponentProps.onPress;
				delete newComponentProps.onPinchStart;
				delete newComponentProps.onPinchMove;
				delete newComponentProps.onPinchEnd;
				delete newComponentProps.moveThreshold;
				delete newComponentProps.pressDelay;
				delete newComponentProps.pressMoveThreshold;
				delete newComponentProps.preventDefault;
				delete newComponentProps.stopPropagation;
				delete newComponentProps.component;

				return React.createElement(props.component, newComponentProps, props.children);
			}
		});
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	var touchStyles = {
	  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	  WebkitTouchCallout: 'none',
	  WebkitUserSelect: 'none',
	  KhtmlUserSelect: 'none',
	  MozUserSelect: 'none',
	  msUserSelect: 'none',
	  userSelect: 'none',
	  cursor: 'pointer'
	};

	module.exports = touchStyles;

/***/ }
/******/ ]);