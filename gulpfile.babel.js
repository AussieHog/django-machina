import 'babel-polyfill';

import gulp from 'gulp';
import concat from 'gulp-concat';
import minifyCSS from 'gulp-minify-css';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import path from 'path';


/** Global variables */
const application_name = 'machina';

/** Directories */
const static_dir = './machina/static/machina';
const build_dir = static_dir + '/build';
const sass_dir = static_dir + '/sass';
const js_dir = static_dir + '/js';


/*
 * Django-machina main assets tasks
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/* Task to build the javascript packages. */
gulp.task('build-js-packages', function () {
  gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/popper.js/dist/umd/popper.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
    ])
    .pipe(concat(application_name + '.packages.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(build_dir + '/js'));
});

/* Task to build the main javascript application. */
gulp.task('build-js-application', function () {
  gulp.src(js_dir + '/ui.js')
    .pipe(concat(application_name + '.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(build_dir + '/js'));
});

/* Task to build the application style. */
gulp.task('build-css', function () {
  gulp.src([
      sass_dir + '/admin_theme.scss',
      sass_dir + '/board_theme.scss',
      sass_dir + '/board_theme.vendor.scss',
    ])
    .pipe(sass({ includePaths: ['node_modules'] }))
      .pipe(rename({prefix: application_name + '.', suffix: '.min'}))
      .pipe(minifyCSS())
    .pipe(gulp.dest(build_dir + '/css'));
});

/* Task to copy the application fonts. */
gulp.task('build-font', function () {
  gulp.src([
    'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*',
  ]).pipe(gulp.dest(build_dir + '/fonts'));
});

/* Task to build our application. */
gulp.task('build-machina-application', ['build-js-packages', 'build-js-application', 'build-css', 'build-font']);


/*
 * Django-machina editor tasks
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/* Task to copy the simplemde CSS. */
gulp.task('build-simplemde-css', function () {
  gulp.src('node_modules/simplemde/dist/simplemde.min.css').pipe(gulp.dest(build_dir + '/css/vendor'));
});

/* Task to copy the simplemde JS. */
gulp.task('build-simplemde-js', function () {
  gulp.src('node_modules/simplemde/dist/simplemde.min.js').pipe(gulp.dest(build_dir + '/js/vendor'));
});

/* Task to build the Mardkown editor JS application. */
gulp.task('build-markdown-editor-js-application', function () {
  gulp.src(js_dir + '/editor.js')
    .pipe(concat(application_name + '.editor.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(build_dir + '/js'));
});

/* Task to build the Mardkown editor application. */
gulp.task('build-machina-editor', ['build-simplemde-css', 'build-simplemde-js', 'build-markdown-editor-js-application']);


/*
 * Global tasks
 * ~~~~~~~~~~~~
 */

/* Default task. */
gulp.task('default', ['build-machina-application', 'build-machina-editor', ]);
