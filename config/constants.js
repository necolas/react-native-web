var path = require('path')

var ROOT = path.join(__dirname, '..')

module.exports = {
  DIST_DIRECTORY: path.join(ROOT, 'dist'),
  SRC_DIRECTORY: path.join(ROOT, 'src'),
  ROOT_DIRECTORY: ROOT,
  TEST_ENTRY: path.join(ROOT, 'src/tests.webpack.js')
}
