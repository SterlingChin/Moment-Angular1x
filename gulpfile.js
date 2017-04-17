//1. Make gulpfile.js
//2. npm i all dependencies
    // npm i --save gulp-webserver del gulp-sass gulp-sourcemas gulp-uglify gulp-concat gulp-babel babel-preset-es2015
//3. check all folder paths used in gulpfile
//4. update index.html
//5. run gulp watch


var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    del = require('del');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('build-css', function() {
    return gulp.src(['./reset.css', './styles/*'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});


 gulp.task('build-js', function() {
  return gulp.src('js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      // .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', [ 'clean', 'build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./index.html', './styles/*.css', './styles/*.scss', './js/**/*.js'], ['build']);
});

gulp.task('default', ['clean', 'build-js', 'build-css', 'watch'])
