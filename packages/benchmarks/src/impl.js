import packageJson from '../package.json';

const context = require.context('./implementations/', true, /index\.js$/);
const { dependencies } = packageJson;

/**
 * @typedef {Object} ComponentsType
 * @property {React.ComponentType<any>} Box
 * @property {React.ComponentType<any>} Dot
 * @property {React.ComponentType<any>} Provider
 * @property {React.ComponentType<any>} View
 */

/**
 * @typedef {Object} ImplementationType
 * @property {ComponentsType} components
 * @property {string} name
 * @property {string} version
 */

/**
 * @param {Object} context
 * @returns {Array<ImplementationType>}
 */
const toImplementations = (context) =>
  context.keys().map((path) => {
    const components = context(path).default;
    const name = path.split('/')[1];
    const version = dependencies[name] || '';
    return { components, name, version };
  });

/**
 * @param {Array<ImplementationType>} impls
 * @returns {Object}
 */
const toObject = (impls) =>
  impls.reduce((acc, impl) => {
    acc[impl.name] = impl;
    return acc;
  }, {});

const map = toObject(toImplementations(context));

export default map;
