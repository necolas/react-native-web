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
        borderWidth: 0;
        color: inherit;
        display: inline;
        font: inherit;
        margin: 0;
        padding: 0;
        textDecorationLine: none;
        wordWrap: break-word;
      },
      .rnw-Text-notSelectable {
        userSelect: none;
      },
      .rnw-Text-singleLineStyle {
        maxWidth: 100%;
        overflow: hidden;
        textOverflow: ellipsis;
        whiteSpace: nowrap;
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
      
      .rnw-TextInput {
        appearance: none;
        backgroundColor: transparent;
        borderColor: black;
        borderRadius: 0;
        borderWidth: 0;
        boxSizing: border-box;
        color: inherit;
        flex: 1;
        font: inherit;
        padding: 0;
      }
    ` }}
  />;
