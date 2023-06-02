const moduleMap = require('./moduleMap');

const isCommonJS = (opts) => opts.commonjs === true;

const getDistLocation = (importName, opts) => {
  const format = isCommonJS(opts) ? 'cjs/' : '';
  const internalName =
    importName === 'unstable_createElement' ? 'createElement' : importName;
  if (internalName === 'index') {
    return `react-native-web/dist/${format}index`;
  } else if (internalName && moduleMap[internalName]) {
    return `react-native-web/dist/${format}exports/${internalName}`;
  }
};

const isReactNativeRequire = (t, node) => {
  const { declarations } = node;
  if (declarations.length > 1) {
    return false;
  }
  const { id, init } = declarations[0];
  return (
    (t.isObjectPattern(id) || t.isIdentifier(id)) &&
    t.isCallExpression(init) &&
    t.isIdentifier(init.callee) &&
    init.callee.name === 'require' &&
    init.arguments.length === 1 &&
    (init.arguments[0].value === 'react-native' ||
      init.arguments[0].value === 'react-native-web')
  );
};

const isReactNativeModule = ({ source, specifiers }) =>
  source &&
  (source.value === 'react-native' || source.value === 'react-native-web') &&
  specifiers.length;

module.exports = function ({ types: t }) {
  return {
    name: 'Rewrite react-native to react-native-web',
    visitor: {
      ImportDeclaration(path, state) {
        const { specifiers } = path.node;
        if (isReactNativeModule(path.node)) {
          if (state.opts.legacy !== false) {
            const imports = specifiers
              .map((specifier) => {
                if (t.isImportSpecifier(specifier)) {
                  const importName = specifier.imported.name;
                  const distLocation = getDistLocation(importName, state.opts);

                  if (distLocation) {
                    return t.importDeclaration(
                      [
                        t.importDefaultSpecifier(
                          t.identifier(specifier.local.name)
                        )
                      ],
                      t.stringLiteral(distLocation)
                    );
                  }
                }
                return t.importDeclaration(
                  [specifier],
                  t.stringLiteral(getDistLocation('index', state.opts))
                );
              })
              .filter(Boolean);

            path.replaceWithMultiple(imports);
          } else {
            const styleSheetSpecifierIndex = specifiers.findIndex(
              (specifier) =>
                specifier.imported && specifier.imported.name === 'StyleSheet'
            );
            if (styleSheetSpecifierIndex !== -1) {
              const otherSpecifiers = [
                ...specifiers.slice(0, styleSheetSpecifierIndex),
                ...specifiers.slice(styleSheetSpecifierIndex + 1)
              ];

              const newImports = [
                t.importDeclaration(
                  [t.importDefaultSpecifier(t.identifier('StyleSheet'))],
                  t.stringLiteral(
                    'react-native-web/dist/exports/StyleSheet/runtime'
                  )
                ),
                t.importDeclaration(
                  otherSpecifiers,
                  t.stringLiteral('react-native')
                )
              ];

              path.replaceWithMultiple(newImports);
            }
          }
        }
      },
      ExportNamedDeclaration(path, state) {
        const { specifiers } = path.node;
        if (isReactNativeModule(path.node) && state.opts.legacy !== false) {
          const exports = specifiers
            .map((specifier) => {
              if (t.isExportSpecifier(specifier)) {
                const exportName = specifier.exported.name;
                const localName = specifier.local.name;
                const distLocation = getDistLocation(localName, state.opts);

                if (distLocation) {
                  return t.exportNamedDeclaration(
                    null,
                    [
                      t.exportSpecifier(
                        t.identifier('default'),
                        t.identifier(exportName)
                      )
                    ],
                    t.stringLiteral(distLocation)
                  );
                }
              }
              return t.exportNamedDeclaration(
                null,
                [specifier],
                t.stringLiteral(getDistLocation('index', state.opts))
              );
            })
            .filter(Boolean);

          path.replaceWithMultiple(exports);
        }
      },
      VariableDeclaration(path, state) {
        if (isReactNativeRequire(t, path.node) && state.opts.legacy !== false) {
          const { id } = path.node.declarations[0];
          if (t.isObjectPattern(id)) {
            const imports = id.properties
              .map((identifier) => {
                const distLocation = getDistLocation(
                  identifier.key.name,
                  state.opts
                );
                if (distLocation) {
                  return t.variableDeclaration(path.node.kind, [
                    t.variableDeclarator(
                      t.identifier(identifier.value.name),
                      t.memberExpression(
                        t.callExpression(t.identifier('require'), [
                          t.stringLiteral(distLocation)
                        ]),
                        t.identifier('default')
                      )
                    )
                  ]);
                }
              })
              .filter(Boolean);

            path.replaceWithMultiple(imports);
          } else if (t.isIdentifier(id)) {
            const name = id.name;
            const importIndex = t.variableDeclaration(path.node.kind, [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(t.identifier('require'), [
                  t.stringLiteral(getDistLocation('index', state.opts))
                ])
              )
            ]);

            path.replaceWith(importIndex);
          }
        }
      }
    }
  };
};
