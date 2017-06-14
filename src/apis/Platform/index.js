/**
 * @flow
 */

const Platform = {
  OS: 'web',
  select: (obj: Object) => ('web' in obj ? obj.web : obj.default)
};

export default Platform;
