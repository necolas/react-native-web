const getDistLocation = importName => {
  const root = 'react-native-web/dist';

  switch (importName) {
    // apis
    case 'Animated':
    case 'AppRegistry':
    case 'AppState':
    case 'AsyncStorage':
    case 'BackHandler':
    case 'Clipboard':
    case 'Dimensions':
    case 'Easing':
    case 'I18nManager':
    case 'InteractionManager':
    case 'Keyboard':
    case 'Linking':
    case 'NetInfo':
    case 'PanResponder':
    case 'PixelRatio':
    case 'Platform':
    case 'StyleSheet':
    case 'UIManager':
    case 'Vibration': {
      return `${root}/apis/${importName}`;
    }

    // components
    case 'ActivityIndicator':
    case 'Button':
    case 'FlatList':
    case 'Image':
    case 'KeyboardAvoidingView':
    case 'ListView':
    case 'Modal':
    case 'Picker':
    case 'ProgressBar':
    case 'RefreshControl':
    case 'ScrollView':
    case 'SectionList':
    case 'Slider':
    case 'StatusBar':
    case 'Switch':
    case 'Text':
    case 'TextInput':
    case 'View':
    case 'VirtualizedList': {
      return `${root}/components/${importName}`;
    }

    case 'Touchable':
    case 'TouchableHighlight':
    case 'TouchableNativeFeedback':
    case 'TouchableOpacity':
    case 'TouchableWithoutFeedback': {
      return `${root}/components/Touchable/${importName}`;
    }

    // modules
    case 'createElement':
    case 'findNodeHandle':
    case 'NativeModules':
    case 'processColor':
    case 'render':
    case 'unmountComponentAtNode': {
      return `${root}/modules/${importName}`;
    }

    // propTypes
    case 'ColorPropType':
    case 'EdgeInsetsPropType':
    case 'PointPropType': {
      return `${root}/propTypes/${importName}`;
    }
    case 'TextPropTypes': {
      return `${root}/components/Text/${importName}`;
    }
    case 'ViewPropTypes': {
      return `${root}/components/View/${importName}`;
    }

    default:
      return;
  }
};

const isReactNativeRequire = (t, node) => {
  const { declarations } = node;
  if (declarations.length > 1) {
    return false;
  }
  const { id, init } = declarations[0];
  return (
    t.isObjectPattern(id) &&
    t.isCallExpression(init) &&
    t.isIdentifier(init.callee) &&
    init.callee.name === 'require' &&
    init.arguments.length === 1 &&
    init.arguments[0].value === 'react-native'
  );
};

module.exports = function({ types: t }) {
  return {
    name: 'Rewrite react-native paths for react-native-web',
    visitor: {
      ImportDeclaration(path) {
        const { source, specifiers } = path.node;
        if (source && source.value === 'react-native' && specifiers.length) {
          const imports = specifiers
            .map(specifier => {
              if (t.isImportSpecifier(specifier)) {
                const importName = specifier.imported.name;
                const distLocation = getDistLocation(importName);

                if (distLocation) {
                  return t.importDeclaration(
                    [t.importDefaultSpecifier(t.identifier(specifier.local.name))],
                    t.stringLiteral(distLocation)
                  );
                }
              }
              return t.importDeclaration([specifier], t.stringLiteral('react-native-web'));
            })
            .filter(Boolean);

          path.replaceWithMultiple(imports);
        }
      },
      ExportNamedDeclaration(path) {
        const { source, specifiers } = path.node;
        if (source && source.value === 'react-native' && specifiers.length) {
          const exports = specifiers
            .map(specifier => {
              if (t.isExportSpecifier(specifier)) {
                const exportName = specifier.exported.name;
                const localName = specifier.local.name;
                const distLocation = getDistLocation(localName);

                if (distLocation) {
                  return t.exportNamedDeclaration(
                    null,
                    [t.exportSpecifier(t.identifier('default'), t.identifier(exportName))],
                    t.stringLiteral(distLocation)
                  );
                }
                return t.exportNamedDeclaration(
                  null,
                  [specifier],
                  t.stringLiteral('react-native-web')
                );
              }
            })
            .filter(Boolean);

          path.replaceWithMultiple(exports);
        }
      },
      VariableDeclaration(path) {
        if (isReactNativeRequire(t, path.node)) {
          const { id } = path.node.declarations[0];
          const imports = id.properties
            .map(identifier => {
              const distLocation = getDistLocation(identifier.key.name);
              if (distLocation) {
                return t.variableDeclaration(path.node.kind, [
                  t.variableDeclarator(
                    t.identifier(identifier.value.name),
                    t.callExpression(t.identifier('require'), [t.stringLiteral(distLocation)])
                  )
                ]);
              }
            })
            .filter(Boolean);

          path.replaceWithMultiple(imports);
        }
      }
    }
  };
};
