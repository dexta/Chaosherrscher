var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server({
    port: 6502,
    host: 'chaosgame.local'
  });
});

gulp.task('watch',function(){
  gulp.watch('/*.html');
});
 
gulp.task('default', ['webserver','watch']);