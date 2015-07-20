'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('rimraf')

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var hbsfy = require('hbsfy');

var bundler = browserify({
  entries: ['./js/index.js'],
  debug: true
});

bundler.transform(hbsfy);
bundler.on('log', gutil.log); 

gulp.task('watch', function() {
  gulp.watch(['index.js'], ['default'])
})

gulp.task('clean', function (cb) {
   clean('./js/bundle.js', cb)
       // .pipe(gulp.dest('deletedgul'));
});

gulp.task('build', ['clean'], function () {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('js'));
});



// API Server
var jsonServer = require('json-server');

var apiServer = jsonServer.create();
var router = jsonServer.router('db.json');

apiServer.use(jsonServer.defaults);
apiServer.use(router);

gulp.task('serve:api', function (cb) {
  apiServer.listen(3000);
  cb();
});

// Web Server
var serve = require('gulp-serve');

gulp.task('serve:web', serve({
  root: ['.'],
  port: 8000
}));

gulp.task('serve', ['serve:api', 'serve:web'])

gulp.task('default', ['build', 'serve']);