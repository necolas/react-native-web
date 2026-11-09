#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import packageJson from '../package.json' with { type: 'json' };

try {
  execSync('npm whoami', { stdio: 'ignore' });
} catch {
  console.error('You must be logged in to npm. Run `npm login` first.');
  process.exit(1);
}

if (execSync('git status --porcelain', { encoding: 'utf-8' }).trim() !== '') {
  console.error('A release needs a clean git working tree.');
  process.exit(1);
}

// Collect 'react-native-web' workspaces and package manifests
const workspacePaths = packageJson.workspaces.reduce((acc, workspace) => {
  const resolvedPaths = fs.globSync(workspace);

  // Remove duplicates and unrelated packages
  for (const resolvedPath of resolvedPaths) {
    if (
      resolvedPath.includes('react-native-web') &&
      !acc.includes(resolvedPath)
    ) {
      acc.push(resolvedPath);
    }
  }

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

const currentVersion = workspaces.find(
  ({ packageJson }) => packageJson.name === 'react-native-web'
).packageJson.version;

const releaseTypes = {
  canary: {
    distTag: 'nightly'
  },
  rc: {
    distTag: 'next',
    example: '0.89.0-rc.0',
    pattern: /^\d+\.\d+\.\d+-rc\.\d+$/
  },
  stable: {
    distTag: 'latest',
    example: '0.89.0',
    pattern: /^\d+\.\d+\.\d+$/
  }
};

function createPrompt() {
  const input = async (message, { validate } = {}) => {
    // One interface per question: an open interface keeps the terminal in raw
    // mode, and Ctrl+C then can't stop the commands run between questions
    const readline = createInterface({ input: stdin, output: stdout });
    let answer;

    try {
      answer = (await readline.question(`${message} `)).trim();
    } finally {
      readline.close();
    }

    const error = validate?.(answer);

    if (error != null) {
      console.error(error);
      return input(message, { validate });
    }

    return answer;
  };

  const select = async (message, choices) => {
    for (const [index, { label }] of choices.entries()) {
      console.log(`${index + 1}. ${label}`);
    }

    const answer = await input(`${message} [1-${choices.length}]:`, {
      validate: (value) => {
        if (choices[Number(value) - 1] == null) {
          return 'Invalid choice.';
        }
      }
    });

    return choices[Number(answer) - 1].value;
  };

  const confirm = async (message) => {
    const answer = await input(`${message} [y/N]`);
    return answer.toLowerCase() === 'y';
  };

  return { input, select, confirm };
}

async function main() {
  const prompt = createPrompt();

  console.log(`Current version: ${currentVersion}`);

  const type = await prompt.select('Release type', [
    { value: 'canary', label: 'canary (npm tag: nightly)' },
    { value: 'rc', label: 'rc (npm tag: next)' },
    { value: 'stable', label: 'stable (npm tag: latest)' }
  ]);

  const { distTag, example, pattern } = releaseTypes[type];
  let version;

  if (type === 'canary') {
    // 0.89.0 -> 0.90.0, 0.89.0-rc.0 -> 0.90.0
    const [, major, minor] = currentVersion.match(/^(\d+)\.(\d+)\./);
    const base = `${major}.${Number(minor) + 1}.0`;
    const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');

    const sha = execSync('git rev-parse HEAD', { encoding: 'utf-8' })
      .trim()
      .slice(0, 9);

    version = `${base}-nightly-${date}-${sha}`;
  } else {
    version = await prompt.input('Version:', {
      validate: (value) => {
        if (!pattern.test(value)) {
          return `Invalid ${type} version. Expected a version like ${example}.`;
        }
      }
    });
  }

  const confirmed = await prompt.confirm(
    `Publish react-native-web@${version} with npm tag "${distTag}"?`
  );

  if (!confirmed) {
    console.log('Aborted.');
    process.exit(0);
  }

  execSync('npm run test', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });

  const workspaceNames = workspaces.map(({ packageJson }) => packageJson.name);

  const publicWorkspaces = workspaces.filter(
    ({ packageJson }) => !packageJson.private
  );

  const publishedNames = [];

  // Ctrl+C still stops the running command, which makes execSync throw, so
  // the finally block can restore the files
  process.on('SIGINT', () => {});

  try {
    // Update each package version and its dependencies
    for (const { packageJson, packageJsonPath } of workspaces) {
      packageJson.version = version;

      for (const name of workspaceNames) {
        if (packageJson.dependencies && packageJson.dependencies[name]) {
          packageJson.dependencies[name] = version;
        }
        if (packageJson.devDependencies && packageJson.devDependencies[name]) {
          packageJson.devDependencies[name] = version;
        }
      }

      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n'
      );
    }

    execSync('npm install');

    const oneTimeCode = await prompt.input('npm one-time password:', {
      validate: (value) => {
        if (value === '') {
          return 'The one-time password is required.';
        }
      }
    });

    for (const { directory, packageJson } of publicWorkspaces) {
      execSync(
        `cd ${directory} && npm publish --tag ${distTag} --otp ${oneTimeCode}`
      );

      publishedNames.push(packageJson.name);
    }
  } finally {
    const missingNames = publicWorkspaces
      .map(({ packageJson }) => packageJson.name)
      .filter((name) => !publishedNames.includes(name));

    if (publishedNames.length > 0 && missingNames.length > 0) {
      console.error(
        `Published: ${publishedNames.join(', ')}. Not published: ${missingNames.join(', ')}.`
      );
    }

    // Once a package is on npm, keep the version changes
    if (type === 'canary' || publishedNames.length === 0) {
      const paths = workspaces.map(({ packageJsonPath }) => packageJsonPath);
      execSync(`git checkout -- package-lock.json ${paths.join(' ')}`);
    } else if (missingNames.length > 0) {
      console.error(
        `The version changes are kept. Publish the missing packages with \`npm publish --tag ${distTag}\`, then commit and tag ${version}.`
      );
    }
  }

  // Commit and tag only after a successful publish
  if (type !== 'canary') {
    execSync('git add .');
    execSync(`git commit -m "${version}" --no-verify`);
    execSync(`git tag -fam ${version} "${version}"`);
    execSync('git push --tags origin master');
  }

  if (type === 'stable') {
    execSync('npm run release:react-native-web-docs', { stdio: 'inherit' });
    execSync('npm run release:benchmarks', { stdio: 'inherit' });
  }
}

main();
