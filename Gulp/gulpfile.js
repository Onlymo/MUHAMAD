var gulp = require('gulp');
var css = require('gulp-css');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('css', function () {
	return gulp.src('taufix/css/*style.css')
	.pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('taufix/css'))
	.pipe(reload({stream:true}));
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: {
			host: "http://localhost",
			port: "5000"
		}
	});
});

gulp.task('default', ['css', 'browser-sync'], function () {
	gulp.watch("taufix/css/*style.css", ['css']);
	gulp.watch(["taufix/js/**/*.js", "./*.html"], reload);
});

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({script: 'app.js'}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});
