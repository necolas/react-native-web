import React from 'react';

export default () =>
  <style
    dangerouslySetInnerHTML={{ __html: `
      .rnw-Image {
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .rnw-Image-center {
        backgroundSize: auto;
        backgroundPosition: center;
      }
      .rnw-Image-contain {
        background-size: contain;
      }
      .rnw-Image-cover {
        background-size: cover;
      }
      .rnw-Image-none {
        background-size: auto;
      }
      .rnw-Image-repeat {
        backgroundSize: auto;
        backgroundRepeat: repeat;
      }
      .rnw-Image-stretch {
        background-size: 100% 100%;
      }
      
      .rnw-Text {
        display: inline;
        padding: 0;
        margin: 0;
        color: inherit;
        font: inherit;
        text-decoration-line: none;
        word-wrap: break-word;
      }
      .rnw-Text-singleLineStyle {
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .rnw-View {
        align-items: stretch;
        border-width: 0;
        border-style: solid;
        box-sizing: border-box;
        display: flex;
        flex-basis: auto;
        flex-direction: column;
        margin: 0;
        padding: 0;
        position: relative;
        
        /* button and anchor reset */
        background-color: transparent;
        color: inherit;
        font: inherit;
        text-align: inherit;
        text-decoration-line: none;
        
        /* list reset */
        list-style: none;
        
        /* fix flexbox bugs */
        min-height: 0;
        min-width: 0;
      }
      .rnw-View-flexReset {
        flex-shrink: 0;
      }
      .rnw-TextInput-wrapper {
        flex-grow: 1;
      }
      .rnw-TextInput {
        appearance: none;
        flex-grow: 1;
        padding: 0;
        border-width: 0;
        outline: none;
        box-sizing: border-box;
        color: inherit;
        font: inherit;
        z-index: 1;
        background-color: transparent;
      }
      .rnw-TextInput-placeholder {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        justify-content: center;
      }
      .rnw-TextInput-placeholderText {
        color: darkgray;
        overflow: hidden;
        white-space: pre;
      }
    ` }}
  />;
