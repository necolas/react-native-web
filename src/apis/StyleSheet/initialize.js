import injector from './injector';
import StyleRegistry from './registry';

const initialize = () => {
  injector.addRule(
    'html-reset',
    'html{' +
      'font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;' +
      '-webkit-tap-highlight-color:rgba(0,0,0,0)' +
    '}'
  );

  injector.addRule(
    'body-reset',
    'body{margin:0}'
  );

  injector.addRule(
    'button-reset',
    'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}'
  );

  injector.addRule(
    'input-reset',
    'input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,' +
    'input::-webkit-search-cancel-button,input::-webkit-search-decoration,' +
    'input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none}'
  );

  injector.addRule(
    'pointer-events',
    '.rn_pointerEvents\\:auto, .rn_pointerEvents\\:box-only, .rn_pointerEvents\\:box-none * {pointer-events:auto}' +
    '.rn_pointerEvents\\:none, .rn_pointerEvents\\:box-only *, .rn_pointerEvents\\:box-none {pointer-events:none}'
  );

  StyleRegistry.initialize();
};

export default initialize;
