var gulp = require('gulp'),
    jeet = require("jeet"),
    nib  = require("nib"),
    rupture  = require("rupture"),
    $ = require('gulp-load-plugins')({
        pattern: [
            'gulp-*'
        ]
    }),
    buildConfig = require('../config/build.config.js'),
    argv = require('minimist')(process.argv.slice(2)),
    isProd = argv.prod || false;


gulp.task('styles', function () {
    return gulp.src([buildConfig.appStyleFiles])
        .pipe($.stylus({'include css': true,use:[jeet(),nib(),rupture()]}))
        .pipe($.autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe($.concat('styles.css'))
        .pipe($.if(isProd, $.cssmin()))
        .pipe($.if(isProd, $.rev()))
        .pipe(gulp.dest(buildConfig.buildCss))
        .pipe($.streamify($.rev.manifest({merge:true})))
        .pipe(gulp.dest(buildConfig.buildCss))
        .pipe($.size({title: 'styles'}));
});
