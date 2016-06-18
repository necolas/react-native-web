'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Copyright 2015-present, Nicolas Gallagher
                    * Copyright 2004-present, Facebook Inc.
                    * All Rights Reserved.
                    *
                    * 
                    */

var _Platform = require('../../apis/Platform');

var _Platform2 = _interopRequireDefault(_Platform);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleSheet = require('../../apis/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _portalRef = void 0;
// unique identifiers for modals
var lastUsedTag = 0;

/**
 * A container that renders all the modals on top of everything else in the application.
 */
var Portal = (_temp = _class = function (_Component) {
  _inherits(Portal, _Component);

  _createClass(Portal, null, [{
    key: 'allocateTag',


    /**
     * Create a new unique tag.
     */
    value: function allocateTag() {
      return '__modal_' + ++lastUsedTag;
    }

    /**
     * Render a new modal.
     */

  }, {
    key: 'showModal',
    value: function showModal(tag, component) {
      if (!_portalRef) {
        console.error('Calling showModal but no "Portal" has been rendered.');
        return;
      }
      _portalRef._showModal(tag, component);
    }

    /**
     * Remove a modal from the collection of modals to be rendered.
     */

  }, {
    key: 'closeModal',
    value: function closeModal(tag) {
      if (!_portalRef) {
        console.error('Calling closeModal but no "Portal" has been rendered.');
        return;
      }
      _portalRef._closeModal(tag);
    }

    /**
     * Get an array of all the open modals, as identified by their tag string.
     */

  }, {
    key: 'getOpenModals',
    value: function getOpenModals() {
      if (!_portalRef) {
        console.error('Calling getOpenModals but no "Portal" has been rendered.');
        return [];
      }
      return _portalRef._getOpenModals();
    }
  }, {
    key: 'notifyAccessibilityService',
    value: function notifyAccessibilityService() {
      if (!_portalRef) {
        console.error('Calling closeModal but no "Portal" has been rendered.');
        return;
      }
      _portalRef._notifyAccessibilityService();
    }
  }]);

  function Portal(props) {
    _classCallCheck(this, Portal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Portal).call(this, props));

    _this.state = { modals: {} };
    _this._closeModal = _this._closeModal.bind(_this);
    _this._getOpenModals = _this._getOpenModals.bind(_this);
    _this._showModal = _this._showModal.bind(_this);
    return _this;
  }

  _createClass(Portal, [{
    key: 'render',
    value: function render() {
      _portalRef = this;
      if (!this.state.modals) {
        return null;
      }
      var modals = [];
      for (var tag in this.state.modals) {
        modals.push(this.state.modals[tag]);
      }
      if (modals.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        _View2.default,
        { style: styles.root },
        modals
      );
    }
  }, {
    key: '_closeModal',
    value: function _closeModal(tag) {
      if (!this.state.modals.hasOwnProperty(tag)) {
        return;
      }
      // We are about to close last modal, so Portal will disappear.
      // Let's enable accessibility for application view.
      if (this._getOpenModals().length === 1) {
        this.props.onModalVisibilityChanged(false);
      }
      // This way state is chained through multiple calls to
      // _showModal, _closeModal correctly.
      this.setState(function (state) {
        var modals = state.modals;
        delete modals[tag];
        return { modals: modals };
      });
    }
  }, {
    key: '_getOpenModals',
    value: function _getOpenModals() {
      return Object.keys(this.state.modals);
    }
  }, {
    key: '_notifyAccessibilityService',
    value: function _notifyAccessibilityService() {
      if (_Platform2.default.OS === 'web') {
        // We need to send accessibility event in a new batch, as otherwise
        // TextViews have no text set at the moment of populating event.
      }
    }
  }, {
    key: '_showModal',
    value: function _showModal(tag, component) {
      // We are about to open first modal, so Portal will appear.
      // Let's disable accessibility for background view on Android.
      if (this._getOpenModals().length === 0) {
        this.props.onModalVisibilityChanged(true);
      }
      // This way state is chained through multiple calls to
      // _showModal, _closeModal correctly.
      this.setState(function (state) {
        var modals = state.modals;
        modals[tag] = component;
        return { modals: modals };
      });
    }
  }]);

  return Portal;
}(_react.Component), _class.propTypes = {
  onModalVisibilityChanged: _react.PropTypes.func.isRequired
}, _temp);


var styles = _StyleSheet2.default.create({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

module.exports = Portal;