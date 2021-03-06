var buildConfig = require('../config/build.config.js'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: [
            'gulp-*',
            'browser-sync',
            'browserify',
            'watchify',
            'vinyl-source-stream'
        ]
    });

var argv = require('minimist')(process.argv.slice(2)),
    isProd = argv.prod || false;

gulp.task('bundle', function () {
    var uglifyOptions = {
        mangle: true,
        compress: {
            pure_funcs: ['console.log']
        }
    };

    var bundler = $.browserify({
        entries: [buildConfig.appEntry],
        extensions: ['jsx', 'js'],
        cache:{},
        packageCache: {}, // required for watchify
        fullPaths: buildConfig.isBuild, // required to be true only for watchify
        debug: !isProd
    });
    console.log("Is Build:",buildConfig.isBuild);
    if(!buildConfig.isBuild)bundler = $.watchify(bundler);
    bundler.transform('reactify',{"es6": true});
    if(isProd){
        console.info("Wuff")
        bundler.transform({global:true},"uglifyify");
    }

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe($.vinylSourceStream('bundle.js'))
            //.pipe($.if(isProd, $.streamify($.uglify(uglifyOptions).on('error', $.util.log.bind($.util, 'Uglify Error')))))
            .pipe($.if(isProd, $.streamify($.rev())))
            .pipe(gulp.dest(buildConfig.buildJs))
            .pipe($.streamify($.rev.manifest({merge:true})))
            .pipe(gulp.dest(buildConfig.buildJs))

    }

    return rebundle();
});