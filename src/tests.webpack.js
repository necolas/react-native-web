/**
 * This module creates a context of all the spec files (following a naming
 * convention). It's used as the webpack entry file for unit tests.
 *
 * See: https://github.com/webpack/docs/wiki/context
 */
var context = require.context('.', true, /-test\.js$/)
context.keys().forEach(context)
