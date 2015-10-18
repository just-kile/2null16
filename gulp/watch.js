var buildConfig = require('../config/build.config.js'),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    $ = require('gulp-load-plugins')({
        pattern: [
            'gulp-*',
            'browser-sync'
        ]
    });

gulp.task('browserSync', ['nodemon'], function () {
    $.browserSync.init(null, {
        proxy: {
            host: "http://localhost",
            port: "5000"
        }
    });
});
var timeout = null;
function browserSyncReload(){
    if(timeout){
        clearTimeout(timeout);
    }
    timeout = setTimeout(function(){
        console.log("restart");
        $.browserSync.reload();
        timeout = null;
    },100);

}
gulp.task('nodemon', function (cb) {
    var called = false;
    return $.nodemon({
        script: './src/server/index.js',
        ext: 'jade js jsx',
        watch: ["./src/server", "./src/client"]
    }).on("restart",function(){
        browserSyncReload();
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        });
});
gulp.task("reload:scripts",function(){
    runSequence('bundle',  $.browserSync.reload);
});
gulp.task('watch', function () {
    //$.browserSync.reload();
  //  gulp.watch([buildConfig.appBase + '**/*.js','./src/server/**/*.js'], [$.browserSync.reload]);
    gulp.watch([buildConfig.appBase + '**/*.styl'], ['styles', $.browserSync.reload]);
    gulp.watch([buildConfig.appBase + '**/*.jade'], [$.browserSync.reload]);
});