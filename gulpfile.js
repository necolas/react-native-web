const gulp = require('gulp');
const del = require('del');
const path = require('path');
const { exec } = require('child_process');

// Utility to run shell commands
function runCommand(command) {
  return function (cb) {
    exec(command, (err, stdout, stderr) => {
      console.log(stdout);
      if (stderr) console.error(stderr);
      cb(err);
    });
  };
}

// Clean dist folders
gulp.task('clean', () => del(['packages/*/dist']));

// Format code using Prettier
gulp.task('format', runCommand('npm run format:fix'));

// Lint code
gulp.task('lint', runCommand('npm run lint:fix'));

// Run unit tests
gulp.task('test', runCommand('npm run unit'));

// Build all workspaces
gulp.task('build:workspaces', runCommand('npm run build --workspaces --if-present'));

// Default task
gulp.task('default', gulp.series('clean', 'format', 'lint', 'test', 'build:workspaces'));
