var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat'); // concat files
var terser = require('gulp-terser'); // minify js files
var cssnano = require('gulp-cssnano'); // minify css files
var sourcemaps = require('gulp-sourcemaps'); // files sourcemaps
var del = require('del');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');



gulp.task('clean', function() { // clean all files in dist folder
  return del(['dist/**', '!dist']);
});

gulp.task('html', function(){
  return gulp.src('app/**/*.html')
    .pipe(htmlreplace({
      css: 'css/style.min.css',
      js: 'js/script.min.js'
    }))
    .pipe(gulp.dest('dist'));	
});

gulp.task('img', () => {
  return gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('css', () => {
  return gulp.src(['app/css/multirange.css', 'app/css/style.css'])
    .pipe(sourcemaps.init())
    .pipe(concat('style.min.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js-babel', () => { // compile js into compatible version
  return gulp.src('app/js/app.js')
    .pipe(babel())
    .pipe(rename({
			suffix: '.es5'
    }))
    .pipe(gulp.dest('app/js'));
});

gulp.task('build', gulp.series(['clean', gulp.parallel(['html', 'img', 'css', 'js-babel'])], (done) => {
  gulp.src(['app/js/multirange.js', 'app/js/clipboard.min.js', 'app/js/app.es5.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('script.min.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
  done();
}));