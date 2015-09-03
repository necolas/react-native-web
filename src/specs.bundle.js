/**
 * This module creates a context of all the spec files (following a naming
 * convention). It's used as the webpack entry file for unit tests.
 *
 * See: https://github.com/webpack/docs/wiki/context
 */
const specContext = require.context('.', true, /.+\.spec\.jsx?$/)
specContext.keys().forEach(specContext)
module.exports = specContext
