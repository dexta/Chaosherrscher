var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server();
});

gulp.task('watch',function(){
  gulp.watch('/*.html');
});
 
gulp.task('default', ['webserver','watch']);