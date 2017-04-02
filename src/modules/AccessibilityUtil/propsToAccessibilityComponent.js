import propsToAriaRole from './propsToAriaRole';

const roleComponents = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};

const emptyObject = {};

const propsToAccessibilityComponent = (props = emptyObject) => {
  const role = propsToAriaRole(props);
  if (role === 'heading') {
    const level = props['aria-level'] || 1;
    return `h${level}`;
  }
  return roleComponents[role];
};

module.exports = propsToAccessibilityComponent;
