#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;

const version = process.argv.slice(2)[0];

console.log(`Publishing ${version}`);
// use lerna to bump versions and dependencies
execSync(`./node_modules/.bin/lerna publish --skip-git --skip-npm --repo-version ${version} --yes`);
// add changes
execSync('git add .');
// commit and tag
execSync(`git commit -m "${version}" && git tag -m ${version} "${version}"`);
// publish to npm
execSync('yarn publish');
// push to github
execSync('git push --tags origin master');
