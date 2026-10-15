#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import packageJson from '../package.json' with { type: 'json' };

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    'skip-git': { type: 'boolean', default: false },
    otp: { type: 'string' }
  }
});

const version = positionals[0];
const skipGit = values['skip-git'];
const oneTimeCode = values.otp;

if (version == null || oneTimeCode == null) {
  console.error('Usage: npm run release <version> --otp <code> [--skip-git]');
  process.exit(1);
}

try {
  execSync('npm whoami', { stdio: 'ignore' });
} catch {
  console.error('You must be logged in to npm. Run `npm login` first.');
  process.exit(1);
}

console.log(`Publishing react-native-web@${version}`);

// Collect 'react-native-web' workspaces and package manifests
const workspacePaths = packageJson.workspaces.reduce((acc, w) => {
  const resolvedPaths = fs.globSync(w);
  resolvedPaths.forEach((p) => {
    // Remove duplicates and unrelated packages
    if (p.includes('react-native-web') && acc.indexOf(p) === -1) {
      acc.push(p);
    }
  });
  return acc;
}, []);

const workspaces = workspacePaths.map((dir) => {
  const directory = path.resolve(dir);
  const packageJsonPath = path.join(directory, 'package.json');
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, { encoding: 'utf-8' })
  );
  return { directory, packageJson, packageJsonPath };
});

// Update each package version and its dependencies
const workspaceNames = workspaces.map(({ packageJson }) => packageJson.name);
workspaces.forEach(({ directory, packageJson, packageJsonPath }) => {
  packageJson.version = version;
  workspaceNames.forEach((name) => {
    if (packageJson.dependencies && packageJson.dependencies[name]) {
      packageJson.dependencies[name] = version;
    }
    if (packageJson.devDependencies && packageJson.devDependencies[name]) {
      packageJson.devDependencies[name] = version;
    }
  });
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n'
  );
});

execSync('npm install');

// Commit changes
if (!skipGit) {
  // add changes
  execSync('git add .');
  // commit
  execSync(`git commit -m "${version}" --no-verify`);
  // tag
  execSync(`git tag -fam ${version} "${version}"`);
}

// Publish public packages
workspaces.forEach(({ directory, packageJson }) => {
  if (!packageJson.private) {
    execSync(`cd ${directory} && npm publish --otp ${oneTimeCode}`);
  }
});

// Push changes
if (!skipGit) {
  execSync('git push --tags origin master');
}
