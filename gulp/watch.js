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
      //  proxy: "http://localhost:1337"

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
        watch: ["./src/server", "./build"]
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
gulp.task("reload:scripts",["bundle"],function(){
     $.browserSync.reload();
});
gulp.task("reload:styles",["styles"],function(done){
    $.browserSync.reload();
});

gulp.task('watch', function () {
    //$.browserSync.reload();
    gulp.watch([buildConfig.appBase + '**/*.js','./src/server/**/*.js'], ["reload:scripts"]);
    gulp.watch([buildConfig.appBase + '**/*.styl'], ['reload:styles']);
    gulp.watch([buildConfig.appBase + '**/*.jade'], [$.browserSync.reload]);
});