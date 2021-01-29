'use strict';

const csso = require('csso');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventySvgContentsPlugin = require('eleventy-plugin-svg-contents');
const eleventySyntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const htmlmin = require('html-minifier');
const markdown = require('markdown-it');
const markdownAnchor = require('markdown-it-anchor');
const markdownAttrs = require('markdown-it-attrs');
const markdownContainer = require('markdown-it-container');
const markdownEmoji = require('markdown-it-emoji');
const markdownFootnote = require('markdown-it-footnote');
const markdownTasks = require('markdown-it-task-lists');
const twemoji = require('twemoji');
const UglifyJS = require('uglify-es');

/**
 * Markdown plugin
 * Add classes to markdown elements by default
 */
function markdownitTagToClass(md, mapping = {}) {
  const toArray = a => (Array.isArray(a) ? a : [a]);
  const splitWithSpace = s => (s ? s.split(' ') : []);

  function parseTokens(tokens) {
    tokens.forEach(token => {
      if (/(_open$|hr|image)/.test(token.type) && mapping[token.tag]) {
        const orig = splitWithSpace(token.attrGet('class'));
        const addition = toArray(mapping[token.tag]);
        token.attrSet('class', [...orig, ...addition].join(' '));
      }
      if (token.children) {
        parseTokens(token.children);
      }
    });
  }
  md.core.ruler.push('markdownit-tag-to-class', state => parseTokens(state.tokens));
}

module.exports = function(eleventyConfig) {
  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // PLUGINS -----

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  // Inline SVG files https://www.npmjs.com/package/eleventy-plugin-svg-contents
  eleventyConfig.addPlugin(eleventySvgContentsPlugin);
  // Syntax Highlighting https://www.11ty.dev/docs/plugins/syntaxhighlight/
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin);

  // TRANSFORMS -----

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (typeof outputPath === 'string' && outputPath.includes('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });

  // FILTERS -----

  // Date formatting (human readable)
  eleventyConfig.addFilter('readableDate', dateObj => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  });
  // Date formatting (machine readable)
  eleventyConfig.addFilter('machineDate', dateObj => {
    return dateObj.toISOString();
  });
  // Minify CSS
  eleventyConfig.addFilter('cssmin', function(code) {
    return csso.minify(code).css;
  });
  // Minify JS
  eleventyConfig.addFilter('jsmin', function(code) {
    const minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  // SHORTCODES -----

  eleventyConfig.addShortcode('version', function() {
    return String(Date.now());
  });

  // PASSTHROUGH -----

  eleventyConfig.addPassthroughCopy('src/static');

  // COLLECTIONS -----

  // Collection of items for navigation
  eleventyConfig.addCollection('nav', function(collection) {
    return collection
      .getAll()
      .filter(function(item) {
        return 'eleventyNavigation' in item.data;
      })
      .sort((a, b) => {
        const keyA = a.data.eleventyNavigation.key;
        const keyB = b.data.eleventyNavigation.key;
        if (keyA > keyB) {
          return 1;
        } else if (keyA < keyB) {
          return -1;
        }
        return 0;
      });
  });

  // MARKDOWN -----

  const options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  };

  const markdownLib = markdown(options);

  markdownLib
    // Customize markdown HTML
    // .use(markdownitTagToClass, {})
    // Automatically place anchors next to headings
    // https://github.com/valeriangalliat/markdown-it-anchor
    .use(markdownAnchor, {
      level: [2, 3],
      permalink: true,
      // permalinkClass: "direct-link",
      permalinkSymbol: '#'
    })
    // Syntax for adding attributes {.class decode=async}
    // https://github.com/arve0/markdown-it-attrs
    .use(markdownAttrs, {
      allowedAttributes: ['class', 'decode', 'height', 'lazy', 'width']
    })
    // Custom containers (::: name)
    // https://github.com/markdown-it/markdown-it-container
    .use(markdownContainer, 'callout')
    .use(markdownContainer, 'lead')
    .use(markdownContainer, 'warning')
    // Emoji replacement
    // https://github.com/markdown-it/markdown-it-emoji
    .use(markdownEmoji)
    // Add footnotes
    // https://github.com/markdown-it/markdown-it-footnote
    .use(markdownFootnote)
    // Render a task list
    // https://github.com/revin/markdown-it-task-lists
    .use(markdownTasks);

  // Custom emoji renderer
  markdownLib.renderer.rules.emoji = function(token, idx) {
    return twemoji.parse(token[idx].content);
  };

  eleventyConfig.setLibrary('md', markdownLib);

  // ELEVENTY CONFIG -----

  return {
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: './src',
      includes: 'includes',
      data: 'data',
      output: 'dist'
    },
    // Matches the GitHub Pages subdirectory of the site (necolas.github.io/react-native-web)
    pathPrefix: '/react-native-web/'
  };
};
