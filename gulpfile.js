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

// 暂时没有拼接，仅copy到新目录
// gulp.task('html', function () {
// 	return gulp.src('public/**/*.html', {base: 'src'})
// 		.pipe(gulp.dest('dist/'))
// 		.pipe(notify({message: 'HTML done!'}));
// });

gulp.task('sass', function () {
	return sass('public/scss/*.scss', {base: 'src'}, {style: 'expanded'})
		.pipe(autoprefixer('last 2 version', 'ie >= 7'))
		.pipe(gulp.dest('public/css'))
		.pipe(notify({message: 'Sass done!'}));
});

// gulp.task('css', function () {
// 	return gulp.src('public/**/*.css', {base: 'src'})
// 		.pipe(autoprefixer('last 2 version', 'ie >= 7'))
// 		.pipe(gulp.dest('dist/'))
// 		.pipe(notify({message: 'CSS done!'}));
// });

// 暂时关闭jshint,IDE中默认使用jshint
// gulp.task('js', function () {
// 	return gulp.src('public/**/*.js', {base: 'src'})
// 		// .pipe(jshint())
// 		// .pipe(jshint.reporter('default'))
// 		.pipe(gulp.dest('dist/'))
// 		.pipe(notify({message: 'JS done!'}));
// });

// gulp.task('img', function () {
// 	return gulp.src('public/**/images/*', {base: 'src'})
// 		.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
// 		.pipe(gulp.dest('dist/'))
// 		.pipe(notify({message: 'Images done!'}))
// });

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

	// gulp.watch('public/**/*.html', ['html']);
	gulp.watch('public/**/*.scss', ['sass']);
	// gulp.watch('public/**/*.css', ['css']);
	// gulp.watch('public/**/*.js', ['js']);
	// gulp.watch('public/**/images/*', ['img']);
});

// 监听所有文件并实时生成
gulp.task('watch', ['sass'], function () {
	// gulp.watch('public/**/*.html', ['html']);
	gulp.watch('public/**/*.scss', ['sass']);
	// gulp.watch('public/**/*.css', ['css']);
	// gulp.watch('public/**/*.js', ['js']);
	// gulp.watch('public/**/images/*', ['img']);
});