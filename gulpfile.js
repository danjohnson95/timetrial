'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  scssPath = "./src/scss/**/*.scss",
	  cssPath = "./dist/css",
	  clientJsPath = "./src/js/client/**/*.js",
	  clientJsOutput = "./dist/js",

	  build = {

		  default: function(){
			  build.sass();
			  build.js();
		  },

		  sass: function(){
			  return gulp.src(scssPath)
			  .pipe(sass().on('error', sass.logError))
			  .pipe(gulp.dest(cssPath));
		  },

		  js: function(){
			  // TODO: Minify here too
			  return gulp.src(clientJsPath, {base: './src/js/client'})
			  .pipe(gulp.dest(clientJsOutput));
		  }

	  };

gulp.task('default', build.default);
gulp.task('sass', build.sass);
gulp.task('js', build.js);
gulp.task('watch', function(){
	gulp.watch(scssPath, ['sass']);
	gulp.watch(clientJsPath, ['js']);
});

module.exports = build;
