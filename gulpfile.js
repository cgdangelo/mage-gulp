var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    compass = require('gulp-compass'),
    haml = require('gulp-haml'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var paths = {
  templates: './app/design/*/*/*/haml/**/*.haml',
  scripts: './skin/*/*/*/**/*.coffee',
  styles: './skin/*/*/*/**/*.sass',
  compass: './skin/frontend/enterprise/default'
};

gulp.task('templates', function() {
  gulp.src(paths.templates).
    pipe(watch()).
    pipe(plumber()).
    pipe(haml({ext: '.phtml'})).
    pipe(rename(function(path) {
      var dirnames = path.dirname.split('/');
      dirnames.splice(3, 1, 'template');
      path.dirname = dirnames.join('/');
    })).
    pipe(gulp.dest('./app/design'));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts).
    pipe(watch()).
    pipe(plumber()).
    pipe(coffee()).
    pipe(uglify()).
    pipe(rename(function(path) {
      var dirnames = path.dirname.split('/');
      dirnames.splice(3, 1, 'js');
      path.dirname = dirnames.join('/');
    })).
    pipe(gulp.dest('./skin'));
});

gulp.task('styles', function() {
  gulp.src(paths.styles, {cwd: './'}).
    pipe(watch()).
    pipe(plumber()).
    pipe(compass({
      project: paths.compass
    })).
    pipe(rename(function(path) {
      var dirnames = path.dirname.split('/');
      dirnames.splice(3, 1, 'css');
      path.dirname = dirnames.join('/');
    })).
    pipe(gulp.dest('./skin'));
});

gulp.task('default', ['templates', 'scripts', 'styles']);
