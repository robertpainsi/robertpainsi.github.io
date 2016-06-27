var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var notify = require("gulp-notify");
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var successfullyBuild = true;
gulp.task('scripts', function () {
    var bundler = watchify(browserify({entries: ['./app/index.jsx'], debug: true, cache: {}, packageCache: {}}))
        .transform(babelify, {presets: ['es2015', 'react']});

    var bundle = function (bundler) {
        bundler.bundle()
            .on('error', showErrorNotification)
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('./'))
            .on('finish', function () {
                if (successfullyBuild) {
                    gutil.log('Finished rebuild', new Date().toISOString());
                }
                successfullyBuild = true;
            })
            .on('end', function () {
                gutil.log('End');
            });
    };

    bundle(bundler);
    bundler.on('update', function () {
        bundle(bundler);
    });
});

gulp.task('copy-index-html', function () {
    // gulp.src('./app/index.html')
    //     .pipe(gulp.dest('./'));
});

gulp.task('build', ['copy-index-html', 'scripts']);

gulp.task('default', ['build']);

function showErrorNotification() {
    successfullyBuild = false;
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end');
}