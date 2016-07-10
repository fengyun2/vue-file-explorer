'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

// 目标目录清理
gulp.task('clean', function() {
    return gulp.src(['build/static/*'], { read: false })
        .pipe(clean());
});

//压缩css并输出
var cssSrc = 'src/static/css/**/*.css',
    cssDest = 'build/static/css';
gulp.task('css', function() {
    return gulp.src(cssSrc)
        .pipe(plumber())
        // .pipe(changed(cssDest))
        .pipe(autoprefixer({
            flexbox: true,
            browsers: ['> 0.1%'],
            cascade: false,
            supports: true
        }))
        .pipe(minifyCSS())
        // .pipe(minifyCSS({ compatibility: 'ie8' }))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(cssDest));
});
//压缩js并输出
var jsSrc = 'src/static/js/**/!(calendar)*.js',
    jsDest = 'build/static/js';
gulp.task('uglifyjs', function() {
    return gulp.src(jsSrc)
        .pipe(plumber())
        // .pipe(changed(jsDest))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

//不需要压缩js并输出
var copyjsSrc = 'src/static/js/**/calendar.js',
    copyjsDest = 'build/static/js';
gulp.task('copyjs', function() {
    return gulp.src(copyjsSrc)
        .pipe(plumber())
        // .pipe(changed(jsDest))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(jshint())
        .pipe(gulp.dest(copyjsDest));
});

//压缩图片并输出
var imagesSrc = 'src/static/img/**/*',
    imagesDest = 'build/static/img';
gulp.task('images', function() {
    return gulp.src(imagesSrc)
        .pipe(plumber())
        // .pipe(changed(imagesDest))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imagesDest));
});
var fontsSrc = 'src/static/css/**/iconfont.*',
    fontsDest = 'build/static/css';
gulp.task('fonts', function() {
    return gulp.src(fontsSrc)
        .pipe(plumber())
        // .pipe(changed(fontsDest))
        .pipe(gulp.dest(fontsDest));
});
//默认任务
// gulp.task('default', ['images', 'css', 'uglifyjs']);
gulp.task('default', ['css', 'fonts', 'copyjs', 'uglifyjs', 'images']);

//监听任务
gulp.task('watch', function() {
    // 监听images
    gulp.watch(imagesSrc, ['images']);
});
