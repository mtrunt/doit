const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

const webpackConfig = require('./webpack.config.js');

const paths = {
    static: './client/**/*.html',
    scripts: './client/scripts/**/!(scripts|build).js',
    components: ['./client/app.vue', './client/components/**/*.vue'],
    styles: './client/sass/**/*.scss',
    images: './client/images/**/*',
    entry: './client/main.js'
};

gulp.task('build', function() {
    return gulp.src(paths.entry)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('client/scripts'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('client/scripts'));
});

gulp.task('sass', function() {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('client/css'))
        .pipe(browserSync.stream());
});

gulp.task('sass-dist', function() {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename('temp.css'))
        .pipe(gulp.dest('client/css'))
        .pipe(browserSync.stream());
});

gulp.task('concat-css', function() {
    return gulp.src('./client/css/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('static-dist', function() {
    return gulp.src([paths.static, paths.images])
        // .pipe(rename('styles.css'))
        .pipe(gulp.dest('dist/'));
    // .pipe(browserSync.stream());
});

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});

gulp.task('serve', gulp.series('sass', 'build', function() {
    browserSync.init({
        server: './client'
    });

    gulp.watch(paths.styles, gulp.series('sass'));
    gulp.watch(paths.scripts, gulp.series('scripts', 'reload'));
    gulp.watch(paths.components, gulp.series('build', 'reload'));
    gulp.watch(paths.static).on('change', browserSync.reload);
}));

gulp.task('dist', gulp.series('static-dist', 'sass-dist', 'concat-css'));

gulp.task('default', gulp.series('sass', 'build'));
