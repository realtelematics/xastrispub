var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
    root: 'App',
    livereload: true,
    fallback: 'App/default.html'
  });
});

gulp.task('serve', function () {
  gulp.src('./App/*.*')
    .pipe(connect.reload()).on('error', errorHandler);
});

gulp.task('serve1', function () {
  gulp.src('./App/Resources/*.*')
    .pipe(connect.reload()).on('error', errorHandler);
});

gulp.task('serve2', function () {
  gulp.src('./App/Script/*.*')
    .pipe(connect.reload()).on('error', errorHandler);
});

 
gulp.task('watch', function () {
  gulp.watch(['./App/*.html', './App/Resources/*.html', './App/script/*.js'], 
  	['serve', 'serve1', 'serve2']);
});
 
gulp.task('default', ['connect', 'watch']);

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}