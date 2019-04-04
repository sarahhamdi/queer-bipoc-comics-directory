// gulp tasks
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import notify from 'gulp-notify';

// js
import jshint from 'gulp-jshint';
import babel from 'gulp-babel';

// css
import sass from 'gulp-sass';
import minifyCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

// images
import imageMin from 'gulp-imagemin'
import del from 'del';

// server
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'public/styles'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'public/scripts'
    },
    assets: {
        src: 'src/assets/**/*',
        dest: 'public/assets'
    }
};

/*
 * For small tasks you can export arrow functions
 */
const startServer = () => browserSync.init({ server: './' })

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
    return gulp.src(paths.styles.src, { sourcemaps: true })
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        // .pipe(sourcemaps.write('.'))
        // .pipe(concat('style.css'))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(reload({ stream: true }));
}

export function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(reload({ stream: true }));
}

export function assets() {
    return gulp.src(paths.assets.src)
        .pipe(imageMin())
        .pipe(gulp.dest('public/assets'));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch('*.html', reload)
}

const serve = gulp.series(gulp.parallel(styles, scripts, assets), startServer);
const build = gulp.parallel(serve, watch)
/*
 * Export a default task
 */
export default build;