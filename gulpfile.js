'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');

require('require-dir')('./gulp');
var config = require('./config/build.config');
var argv = require('minimist')(process.argv.slice(2)),
    isProd = argv.prod || false;

gulp.task('build:config',function(cb){
    config.isBuild = true;
    cb();
});
gulp.task('build:assets', ['clean'], function (cb) {
    runSequence(['styles', 'bundle'], cb);
});

gulp.task('build',['build:config'],function(cb){
    runSequence("build:assets", cb);
});

gulp.task('dev', ['build:assets'], function () {
    gulp.start('browserSync');
    gulp.start('watch');
});

gulp.task('default', ['dev']);
