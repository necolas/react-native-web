#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const args = process.argv.slice(2);
const version = args[0];
const skipGit = args[1] === '--skip-git';

console.log(`Publishing ${version}`);

// Collect workspaces and package manifests
const workspacePaths = require('../../package.json').workspaces.concat(['./']);
const workspaces = workspacePaths.reduce((acc, curr) => {
  const packageDirectories = glob.sync(path.resolve(curr));
  packageDirectories.forEach(directory => {
    const packageJsonPath = path.join(directory, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));
    acc.push({ directory, packageJson, packageJsonPath });
  });
  return acc;
}, []);

// Update each package version and its dependencies
const workspaceNames = workspaces.map(({ packageJson }) => packageJson.name);
workspaces.forEach(({ directory, packageJson, packageJsonPath }) => {
  packageJson.version = version;
  workspaceNames.forEach(name => {
    if (packageJson.dependencies && packageJson.dependencies[name]) {
      packageJson.dependencies[name] = version;
    }
    if (packageJson.devDependencies && packageJson.devDependencies[name]) {
      packageJson.devDependencies[name] = version;
    }
  });
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
});

// Commit changes
if (!skipGit) {
  // add changes
  execSync('git add .');
  // commit
  execSync(`git commit -m "${version}" --no-verify`);
  // tag
  execSync(`git tag -m ${version} "${version}"`);
}

// Publish public packages
workspaces.forEach(({ directory, packageJson }) => {
  if (!packageJson.private) {
    execSync(`cd ${directory} && npm publish`);
  }
});

// Push changes
if (!skipGit) {
  execSync('git push --tags origin master');
}
