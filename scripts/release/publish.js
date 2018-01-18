#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;

const args = process.argv.slice(2);
const version = args[0];
const skipGit = args[1] === '--skip-git';

console.log(`Publishing ${version}`);

// use lerna to bump versions and dependencies
execSync(`./node_modules/.bin/lerna publish --skip-git --skip-npm --repo-version ${version} --yes`);

if (!skipGit) {
  // add changes
  execSync('git add .');
  // commit
  execSync(`git commit -m "${version}" --no-verify`);
  // tag
  execSync(`git tag -m ${version} "${version}"`);
}

// publish to npm (expect plugin to error as version won't change often)
execSync('cd packages/react-native-web && npm publish');
execSync('cd packages/babel-plugin-react-native-web && npm publish');

if (!skipGit) {
  // push to github
  execSync('git push --tags origin master');
}
