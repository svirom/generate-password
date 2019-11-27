var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat'); // concat files
var terser = require('gulp-terser'); // minify files
var del = require('del');
var htmlreplace = require('gulp-html-replace');



gulp.task('clean', function() { // clean all files in dist folder
  return del(['dist/**', '!dist']);
});

gulp.task('html', function(){
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(htmlreplace({
      js: 'js/script.min.js'
    }));	
});

gulp.task('build', gulp.series(['clean', 'html'], (done) => {
  gulp.src(['app/js/clipboard.min.js', 'app/js/multirange.js', 'app/js/app.js'])
    .pipe(concat('script.min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('dist/js'));
    done();
}));