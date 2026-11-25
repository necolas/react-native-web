import packageJson from '../package.json';

const { dependencies } = packageJson;

const context = import.meta.webpackContext('./implementations/', {
  recursive: true,
  regExp: /index\.js$/
});

/**
 * @typedef {Object} ComponentsType
 * @property {import('react').ComponentType<any>} Box
 * @property {import('react').ComponentType<any>} Dot
 * @property {import('react').ComponentType<any>} Provider
 * @property {import('react').ComponentType<any>} View
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
