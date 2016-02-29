'use strict'

// these refer to all the packages we installed
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
const postCSS = require('gulp-postcss');

gulp.task('styles', () => {
	// grabs all the scss files
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sourcemaps.init())
		// chained methods below
		.pipe(sass().on('error', sass.logError))
		
		.pipe(postCSS([
			require('postcss-size')
			]))
		// adds vender prefixes to all things
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		// mashes all these style files into one file (style.css)
	    .pipe(concat('style.css'))
	    .pipe(sourcemaps.write('.'))
	    // moves the style.css file to public/styles
	    .pipe(gulp.dest('./public/styles/'))
	    .pipe(reload({stream: true}));

});

// manages the js files using babel
gulp.task('scripts', () => {
	gulp.src('./dev/scripts/main.js')
	    .pipe(babel({
	      	presets: ['es2015']
	    }))
	    .pipe(gulp.dest('./public/scripts'))
	    .pipe(reload({stream: true}));
});

// creates a local server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: '.'  
  })
});

gulp.task('watch', () => {
	// watches for changes and then runs tasks on it when it has changed
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/*.js', ['scripts']);
	gulp.watch('./public/*.html', reload);
});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);
