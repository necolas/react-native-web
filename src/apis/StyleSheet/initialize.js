import injector from './injector';
import StyleRegistry from './registry';

const initialize = () => {
  injector.addRule(
    'reset',
    '/* React Native StyleSheet*/\n' +
    'html{' +
      'font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;' +
      '-webkit-tap-highlight-color:rgba(0,0,0,0)' +
    '}\n' +
    'body{margin:0}\n' +
    'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}\n' +
    'input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,' +
    'input::-webkit-search-cancel-button,input::-webkit-search-decoration,' +
    'input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none}'
  );
  injector.addRule(
    'keyframes',
    '@keyframes rn-ActivityIndicator-animation{' +
      '0%{-webkit-transform: rotate(0deg); transform: rotate(0deg);}' +
      '100%{-webkit-transform: rotate(360deg); transform: rotate(360deg);}' +
    '}\n' +
    '@keyframes rn-ProgressBar-animation{' +
      '0%{-webkit-transform: translateX(-100%); transform: translateX(-100%);}' +
      '100%{-webkit-transform: translateX(400%); transform: translateX(400%);}' +
    '}'
  );
  injector.addRule(
    'pointer-events',
    '.rn-pointerEvents\\:auto,.rn-pointerEvents\\:box-only,.rn-pointerEvents\\:box-none *{pointer-events:auto}' +
    '.rn-pointerEvents\\:none,.rn-pointerEvents\\:box-only *,.rn-pointerEvents\\:box-none{pointer-events:none}'
  );

  const classNames = injector.getClassNames();
  StyleRegistry.initialize(classNames);
};

export default initialize;
