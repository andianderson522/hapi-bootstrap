'use strict';
const gulp = require('gulp');
const todo = require('gulp-todo');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');

const sourceDirs = ['./**/*.js', '!node_modules/**/*.js'];

gulp.task('lint', function performLint() {
  return gulp
    .src(['./**/*.js', '!node_modules/**/*.js'])
    .pipe(eslint({'configFile': '.eslintrc'}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['todo', 'lint'], function performTests() {
  return gulp.src(['tests/unit/**/*.js'])
    .pipe(mocha({'reporter': 'spec', 'timeout': 100}));
});

// this is for codeship, they have an issue and hang if the process does not implicitly call process exit
gulp.task('test2', ['lint'], function performTests() {
  return gulp.src(['tests/unit/**/*.js'])
    .pipe(mocha({'reporter': 'spec', 'timeout': 200}))
    .once('error', function e() {
      process.exit(1);
    })
    .once('end', function s() {
      process.exit();
    });
});

gulp.task('integrationTest', function performIntegrationTests() {
  return gulp.src(['tests/integration/**/*.js'])
    .pipe(mocha({'reporter': 'spec', 'timeout': 1000}));
});

gulp.task('todo', function performTODOs() {
  gulp.src(['./**/*.js', '!node_modules/**/*.js'])
    .pipe(todo())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['todo', 'lint', 'test']);

gulp.task('watch', function performWatch() {
  const watchFiles = sourceDirs.slice();
  watchFiles.push('tests/unit/**/*.js');
  livereload.listen();
  gulp.watch(watchFiles, function onChange() {
    gulp.start('lint', 'test');
  });
});
