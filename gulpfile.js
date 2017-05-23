'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),
  maps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  del = require('del'),
  browserSync = require('browser-sync').create();

var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './',
};


// Default
gulp.task('default', ['browserSync', 'watch']);

// Styles
gulp.task('compile-scss', function () {
  return gulp.src('./scss/*.scss')
    //.pipe(maps.init())
    .pipe(sass({
      includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }).on('error', sass.logError))
    //.pipe(maps.write('./'))
    .pipe(gulp.dest(config.publicDir + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('concat-css',['compile-scss'], function(){
    return gulp.src(['css/*.css'])
        .pipe(concat('style.css')) // concat into file name
        .pipe(gulp.dest('css'));    // send that file to the css directory
});

gulp.task('minify-css',['concat-css'], function(){
    return gulp.src('css/style.css')
      //  .pipe(maps.init({loadMaps:true}))   // create maps from scss *sourcemaps* not the css
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
      //  .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
});

//Scripts
gulp.task('concat-scripts', function(){
    return gulp.src([                       // specify all source JS file paths
            'js/sic-scripts.js'])
        .pipe(maps.init())
        .pipe(concat('sic-scripts.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});
// `gulp minify-scripts` will run concat-scripts first
gulp.task('minify-scripts',['concat-scripts'], function(){
    return gulp.src('js/sic-scripts.js')
        .pipe(maps.init({loadmaps:true}))
        .pipe(uglify())
        .pipe(rename('sic-scripts.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

// Watch
gulp.task('watch', ['browserSync', 'compile-scss'], function () {
  gulp.watch('./scss/*/*.scss',  ['minify-css'])
  gulp.watch('./bower_components/bootstrap-sass/assets/stylesheets/bootstrap/*.scss', ['minify-css'])
  gulp.watch('./*.html', browserSync.reload)
  gulp.watch('./js/*.js',['minify-scripts'])
});

// BrowserSync server
gulp.task('browserSync', function () {
  browserSync.init({
    server:{
      basedir: './'
    },
  })
});
