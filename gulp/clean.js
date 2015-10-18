var gulp = require('gulp');
var del = require('del');
var buildConfig = require('../config/build.config.js');

gulp.task('clean', del.bind(null, [buildConfig.buildDir]));