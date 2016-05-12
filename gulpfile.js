'use strict';
var gulp = require('gulp');
var todo = require('gulp-todo');
var eslint = require('gulp-eslint');
var livereload = require('gulp-livereload');
/*eslint-disable*/
// var bcrypt = require('bcrypt');
/*eslint-enable*/
var mocha = require('gulp-mocha');

var sourceDirs = ['./**/*.js', '!node_modules/**/*.js'];

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
  var watchFiles = sourceDirs.slice();
  watchFiles.push('tests/unit/**/*.js');
  livereload.listen();
  gulp.watch(watchFiles, function onChange() {
    gulp.start('lint', 'test');
  });
});
