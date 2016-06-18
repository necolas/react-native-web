'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Copyright (c) 2015-present, Nicolas Gallagher.
                    * Copyright (c) 2015-present, Facebook, Inc.
                    * All rights reserved.
                    *
                    * 
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders static content efficiently by allowing React to short-circuit the
 * reconciliation process. This component should be used when you know that a
 * subtree of components will never need to be updated.
 *
 *   const someValue = ...; // We know for certain this value will never change.
 *   return (
 *     <StaticContainer>
 *       <MyComponent value={someValue} />
 *     </StaticContainer>
 *   );
 *
 * Typically, you will not need to use this component and should opt for normal
 * React reconciliation.
 */
var StaticContainer = (_temp = _class = function (_Component) {
  _inherits(StaticContainer, _Component);

  function StaticContainer() {
    _classCallCheck(this, StaticContainer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StaticContainer).apply(this, arguments));
  }

  _createClass(StaticContainer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.shouldUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      var child = this.props.children;
      return child === null || child === false ? null : _react2.default.Children.only(child);
    }
  }]);

  return StaticContainer;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.any.isRequired,
  shouldUpdate: _react.PropTypes.bool.isRequired
}, _temp);


module.exports = StaticContainer;