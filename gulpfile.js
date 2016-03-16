var gulp = require('gulp'),
    // minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    // rename = require('gulp-rename'),
    // concat = require('gulp-concat'),
    // del = require('del'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    // cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),    
    browserSync = require('browser-sync');

gulp.task('sass', function () {
	return sass('2016_spring/scss/*.scss', {base: 'src'}, {style: 'expanded'})
		.pipe(autoprefixer('last 2 version', 'ie >= 7'))
		.pipe(gulp.dest('2016_spring/css'))
		.pipe(notify({message: 'Sass done!'}));
});

// 默认生成所有文件
// gulp.task('default', ['html', 'sass', 'css', 'js', 'img']);
gulp.task('default', ['sass']);

// 监听所有文件并实时生成和预览
gulp.task('refresh', ['sass'], function () {
	var files = [
		'./**/*.html',
		'./**/*.css',
		'./**/*.js',
		'./**/images/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: '.'
		}
	});

	// gulp.watch('2016_spring/**/*.html', ['html']);
	gulp.watch('2016_spring/**/*.scss', ['sass']);
	// gulp.watch('2016_spring/**/*.css', ['css']);
	// gulp.watch('2016_spring/**/*.js', ['js']);
	// gulp.watch('2016_spring/**/images/*', ['img']);
});

// 监听所有文件并实时生成
gulp.task('watch', ['sass'], function () {
	// gulp.watch('2016_spring/**/*.html', ['html']);
	gulp.watch('2016_spring/**/*.scss', ['sass']);
	// gulp.watch('2016_spring/**/*.css', ['css']);
	// gulp.watch('2016_spring/**/*.js', ['js']);
	// gulp.watch('2016_spring/**/images/*', ['img']);
});