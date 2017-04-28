'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './',
};


// Default
gulp.task('default', ['browserSync', 'watch']);

// Compile SASS
gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass({
      includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.publicDir + '/css'))
    .pipe(browserSync.stream());
});

// Watch
gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('./scss/*/*.*',  ['sass'])
  gulp.watch('./bower_components/bootstrap-sass/assets/stylesheets/bootstrap/*.scss', ['sass'])
  gulp.watch('./*.html', browserSync.reload)
});

// BrowserSync server
gulp.task('browserSync', function () {
  browserSync.init({
    server:{
      basedir: './'
    },
  })
});
