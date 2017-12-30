#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;

const args = process.argv.slice(2);
const version = args[0];
const skipGit = args[1] === '--skip-git';

const releaseCommands = [
  // use lerna to bump versions and dependencies
  `./node_modules/.bin/lerna publish --skip-git --skip-npm --repo-version ${version} --yes`
];

if (!skipGit) {
  releaseCommands.push(
    ...[
      // add changes
      'git add .',
      // commit
      `git commit -m "${version}"`,
      // tag
      `git tag -m ${version} "${version}"`
    ]
  );
}

// publish to npm
releaseCommands.push('cd packages/babel-plugin-react-native-web && npm publish');
releaseCommands.push('cd ../react-native-web && npm publish');

if (!skipGit) {
  // push to github
  releaseCommands.push('git push --tags origin master');
}

console.log(`Publishing ${version}`);
execSync(releaseCommands.join(' && '));
