var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var uglify      = require('gulp-uglify');
var pump        = require('pump');
var concat      = require('gulp-concat');
var uglifycss   = require('gulp-uglifycss');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var jslint      = require('gulp-jslint');

gulp.task('copy-js-lib-dev',function(cb){
  pump([
        gulp.src('src/lib/js/*.js'),
        jslint(),
        gulp.dest('dev/js/')
    ],cb);
  });

gulp.task('concat-js-lib-dev',function(cb){
  pump([
        gulp.src(['src/lib/js/jquery.js','src/lib/js/tether.js','src/lib/js/bootstrap.js']),
        concat('lib.js'),
        gulp.dest('dev/js')
    ],cb);
  });

gulp.task('copy-js-custom-dev',function(cb){
  pump([
      gulp.src('src/js/*.js'),
      jslint(),
      gulp.dest('dev/js')
    ],cb);
  });

gulp.task('concat-js-custom-dev',function(cb){
  pump([
        gulp.src(['src/js/chaosherrscher.js','src/js/jqEvents.js','src/js/vueangect.js']),
        jslint(),
        concat('chaosmeister.js'),
        gulp.dest('dev/js')
    ],cb);
  });

gulp.task('concat-css-lib-dev',function(cb){
  pump([
        gulp.src('src/lib/css/*.css'),
        concat('lib.css'),
        gulp.dest('dev/css')
    ],cb);
  });

gulp.task('concat-css-custom-dev',function(cb){
  pump([
        gulp.src('src/css/*.css'),
        concat('chaosmeister.css'),
        gulp.dest('dev/css')
    ],cb);
  });

gulp.task('compress-js-lib',function(cb){
  pump([
        gulp.src(['src/lib/js/jquery.js','src/lib/js/tether.js','src/lib/js/bootstrap.js']),
        uglify(),
        concat('lib.min.js'),
        gulp.dest('dist/js')
    ],cb);
  });

gulp.task('compress-css-lib',function(cb){
  pump([
        gulp.src('src/lib/css/*.css'),
        uglifycss({
            "maxLineLen": 80,
          "uglyComments": true
        }),
        concat('lib.min.css'),
        gulp.dest('dist/css')
    ],cb);
  });

gulp.task('compress-js-custom',function(cb){
  pump([
        gulp.src(['src/js/chaosherrscher.js','src/js/jqEvents.js','src/js/vueangect.js']),
        // jslint(),
        // jslint.reporter('stylish'),
        uglify(),
        concat('chaosherrscher.min.js'),
        gulp.dest('dist/js')
    ],cb);
  });

gulp.task('compress-css-custom',function(cb){
  pump([
        gulp.src('src/css/*.css'),
        uglifycss({
            "maxLineLen": 80,
          "uglyComments": true
        }),
        concat('chaosherrscher.min.css'),
        gulp.dest('dist/css')
    ],cb);
  });

gulp.task('font-awesome',function(cb){
  pump([
      gulp.src('src/fonts/*.*'),
      gulp.dest('dist/fonts')
    ],cb);
  });

gulp.task('font-awesome-dev',function(cb){
  pump([
      gulp.src('src/fonts/*.*'),
      gulp.dest('dev/fonts')
    ],cb);
  });

gulp.task('html-dev',function(cb){
  pump([
      gulp.src('src/index.html'),
      gulp.dest('dev')
    ],cb);
  });

gulp.task('html-dist',function(cb){
  pump([
      gulp.src('src/index.html'),
      htmlreplace({
        'css': ['css/lib.min.css','css/chaosherrscher.min.css'],
        'js' : ['js/lib.min.js','js/chaosherrscher.min.js']
      }),
      gulp.dest('dist')
    ],cb);
  });

gulp.task('build-dev-custom',function(cb){
  runSequence(['concat-css-custom-dev','copy-js-custom-dev','font-awesome-dev','html-dev'],cb);
});

gulp.task('build-dev-lib',function(cb){
  runSequence(['concat-css-lib-dev','concat-js-lib-dev','font-awesome-dev','html-dev'],cb);
});

gulp.task('browser-sync-dev', function() {
  browserSync.init({
    server: {
      baseDir: './dev/'
    }
  });
 });

gulp.task('browser-sync-dist', function() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
 });

gulp.task('reWatch-dev',['build-dev-all'],function(done){
  browserSync.reload();
  done();
  });

gulp.task('reWatch-dist',['build-dist-all'],function(done){
  browserSync.reload();
  done();
  });

gulp.task('watch-dev',['build-dev-all','browser-sync-dev'],function(){
  gulp.watch(["src/js/*.js","src/css/*.css","src/*.html"], ['reWatch-dev']);
});

gulp.task('watch-dist',['build-dist-all','browser-sync-dist'],function(){
  gulp.watch(["gulpfile.js","src/js/*.js","src/css/*.css","src/*.html"]);
});

gulp.task('build-dev-all',function(cb) {
  runSequence(['build-dev-lib','build-dev-custom','font-awesome-dev','html-dev'],cb);
});

gulp.task('build-dist-all',function(cb) {
  runSequence('compress-css-custom','compress-js-custom','compress-css-lib','compress-js-lib','font-awesome','html-dist',cb);
});