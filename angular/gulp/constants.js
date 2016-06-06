'use strict';

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');

gulp.task('constants', function () {
  var myConfig = require('./config.json'),
    argv = require('yargs').argv,
    env = argv.env === undefined ? (process.env.NODE_ENV === undefined ? 'dev' : process.env.NODE_ENV) : argv.env,
    envConfig = myConfig[env];

  return ngConstant({
    name: 'angular',
    constants: envConfig,
    stream: true,
    template: "(function() {" +
    "          'use strict';" +
    "          angular" +
    "              .module('AccessControlSystem')" +
    '<% constants.forEach(function(constant) { %>' +
    '.constant("<%- constant.name %>", <%= constant.value %>)\n' +
    '<% }) %>' +
    "     })();"
  })
    .pipe(gulp.dest('src/app'));
});