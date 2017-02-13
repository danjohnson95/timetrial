'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  scssPath = "./src/scss/**/*.scss",
	  cssPath = "./dist/css",

	  build = {

		  sass: function(){
			  return gulp.src(scssPath)
			  .pipe(sass().on('error', sass.logError))
			  .pipe(gulp.dest(cssPath));
		  }

	  };

gulp.task('default', build.sass);
gulp.task('sass', build.sass);
gulp.task('watch', function(){
	gulp.watch(scssPath, ['sass']);
});

module.exports = build;
