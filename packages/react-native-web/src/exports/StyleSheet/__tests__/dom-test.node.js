/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSheet } from '../dom';

describe('createSheet', () => {
  test('creates a sheet on the server', () => {
    const sheet = createSheet();
    expect(typeof sheet.insert).toBe('function');
    expect(sheet.id).toMatchInlineSnapshot(`"react-native-stylesheet"`);
    expect(sheet.getTextContent()).toMatchInlineSnapshot(`
     "[stylesheet-group="0"]{}
     @supports (color:accentcolor){:host,:root{--rnw-accentcolor:accentcolor;}}
     @supports (color:accentcolortext){:host,:root{--rnw-accentcolortext:accentcolortext;}}
     @supports (color:buttonborder){:host,:root{--rnw-buttonborder:buttonborder;}}
     @supports (color:mark){:host,:root{--rnw-mark:mark;}}
     @supports (color:marktext){:host,:root{--rnw-marktext:marktext;}}
     @supports (color:selecteditem){:host,:root{--rnw-selecteditem:selecteditem;}}
     @supports (color:selecteditemtext){:host,:root{--rnw-selecteditemtext:selecteditemtext;}}
     body{margin:0;}
     button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
     html{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
     input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}"
    `);

    sheet.insert('.test { opacity: 0 }', 1);
    expect(sheet.getTextContent()).toMatchInlineSnapshot(`
     "[stylesheet-group="0"]{}
     @supports (color:accentcolor){:host,:root{--rnw-accentcolor:accentcolor;}}
     @supports (color:accentcolortext){:host,:root{--rnw-accentcolortext:accentcolortext;}}
     @supports (color:buttonborder){:host,:root{--rnw-buttonborder:buttonborder;}}
     @supports (color:mark){:host,:root{--rnw-mark:mark;}}
     @supports (color:marktext){:host,:root{--rnw-marktext:marktext;}}
     @supports (color:selecteditem){:host,:root{--rnw-selecteditem:selecteditem;}}
     @supports (color:selecteditemtext){:host,:root{--rnw-selecteditemtext:selecteditemtext;}}
     body{margin:0;}
     button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
     html{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
     input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
     [stylesheet-group="1"]{}
     .test { opacity: 0 }"
    `);
  });
});
