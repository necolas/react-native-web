import * as css from './css';
import createReactStyleObject from './createReactStyleObject';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import flattenStyle from '../../modules/flattenStyle';
import React from 'react';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';

let styleElement;
let shouldInsertStyleSheet = ExecutionEnvironment.canUseDOM;

const STYLE_SHEET_ID = 'react-native-style__';

const absoluteFillObject = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };

const defaultStyleSheet = css.getDefaultStyleSheet();

const insertStyleSheet = () => {
  // check if the server rendered the style sheet
  styleElement = document.getElementById(STYLE_SHEET_ID);
  // if not, inject the style sheet
  if (!styleElement) {
    document.head.insertAdjacentHTML(
      'afterbegin',
      `<style id="${STYLE_SHEET_ID}">${defaultStyleSheet}</style>`
    );
    shouldInsertStyleSheet = false;
  }
};

module.exports = {
  /**
   * For testing
   * @private
   */
  _reset() {
    if (styleElement) {
      document.head.removeChild(styleElement);
      styleElement = null;
      shouldInsertStyleSheet = true;
    }
  },

  absoluteFill: ReactNativePropRegistry.register(absoluteFillObject),

  absoluteFillObject,

  create(styles) {
    if (shouldInsertStyleSheet) {
      insertStyleSheet();
    }

    const result = {};
    for (const key in styles) {
      if (process.env.NODE_ENV !== 'production') {
        require('./StyleSheetValidation').validateStyle(key, styles);
      }
      result[key] = ReactNativePropRegistry.register(styles[key]);
    }
    return result;
  },

  hairlineWidth: 1,

  flatten: flattenStyle,

  /* @platform web */
  render() {
    return <style dangerouslySetInnerHTML={{ __html: defaultStyleSheet }} id={STYLE_SHEET_ID} />;
  },

  /**
   * Accepts React props and converts style declarations to classNames when necessary
   * @platform web
   */
  resolve(props) {
    let className = props.className || '';
    const style = createReactStyleObject(props.style);
    for (const prop in style) {
      const value = style[prop];
      const replacementClassName = css.getStyleAsHelperClassName(prop, value);
      if (replacementClassName) {
        className += ` ${replacementClassName}`;
        style[prop] = null;
      }
    }

    return { className, style };
  }
};
