var buildConfig = require('../config/build.config.js'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: [
            'gulp-*',
            'browser-sync'
        ]
    });

gulp.task('assets', function () {
    return gulp.src(buildConfig.appAssets)
        .pipe(gulp.dest(buildConfig.buildDir))
        .pipe($.size({title: 'assets'}));
});
