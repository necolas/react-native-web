// gulpfile.js - Fully loaded version
const gulp = require('gulp');
const del = require('del');
const { exec } = require('child_process');
const browserSync = require('browser-sync').create();
require('dotenv').config();

function runCommand(command) {
  return function (cb) {
    exec(command, (err, stdout, stderr) => {
      console.log(stdout);
      if (stderr) console.error(stderr);
      cb(err);
    });
  };
}

// Clean build output
gulp.task('clean', () => del(['packages/*/dist']));

// Code quality tasks
gulp.task('format', runCommand('npm run format:fix'));
gulp.task('lint', runCommand('npm run lint:fix'));
gulp.task('test', runCommand('npm run unit'));

gulp.task('build:workspaces', runCommand('npm run build --workspaces --if-present'));

gulp.task('storybook', runCommand('npm run storybook'));

// BrowserSync dev server
gulp.task('serve', (cb) => {
  browserSync.init({
    server: {
      baseDir: './packages/react-native-web/dist' // adjust if needed
    },
    port: process.env.PORT || 3000,
    open: false
  });
  cb();
});

gulp.task('reload', (cb) => {
  browserSync.reload();
  cb();
});

gulp.task('watch', () => {
  gulp.watch(
    ['packages/**/*.js', 'configs/**/*.js', 'scripts/**/*.js'],
    gulp.series('lint', 'build:workspaces', 'reload')
  );
});

// Dev & Prod
gulp.task('dev', gulp.series('clean', 'lint', 'build:workspaces', 'serve', 'watch'));
gulp.task('prod', gulp.series('clean', 'format', 'lint', 'test', 'build:workspaces'));
gulp.task('default', gulp.series('prod'));
