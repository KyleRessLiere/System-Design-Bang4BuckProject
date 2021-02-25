const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const fs = require('fs');

const cssAddonsPath = './css/modules/';

// CSS Tasks
gulp.task('css-compile-modules', (done) => {
  gulp.src('scss/**/modules/**/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ dirname: cssAddonsPath }))
    .pipe(gulp.dest('./dist/'));

    done();
});

gulp.task('css-compile', gulp.series('css-compile-modules', () => {
  return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css/'));
}));

gulp.task('css-minify-modules', () => {
  return gulp.src(['./dist/css/modules/*.css', '!./dist/css/modules/*.min.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/modules'));
});

gulp.task('css-minify', gulp.series('css-minify-modules', () => {
    return gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css', '!./dist/css/bootstrap.css'])
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
}));

// JavaScript Tasks
gulp.task('js-build', () => {

  const plugins = getJSModules();

  return gulp.src(plugins.modules)
    .pipe(concat('mdb.js'))
    .pipe(gulp.dest('./dist/js/'));

    gulp.start('js-lite-build');
    gulp.start('js-minify');

});

gulp.task('js-minify', () => {
  return gulp.src(['./dist/js/mdb.js'])
    .pipe(minify({
      ext:{
        // src:'.js',
        min:'.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

// Image Compression
gulp.task('img-compression', function() {
  gulp.src('./img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/img'));
});

// Live Server
gulp.task('live-server', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
  });
});

// Watch on everything
gulp.task('wath', function() {
  gulp.watch("scss/**/*.scss", gulp.series('css-compile'));
  gulp.watch(["dist/css/*.css", "!dist/css/*.min.css"], gulp.series('css-minify'));
  gulp.watch("js/**/*.js", gulp.series('js-build'));
  gulp.watch(["dist/js/*.js", "!dist/js/*.min.js"], gulp.series('js-minify'));
  gulp.watch("**/*", {cwd: './img/'}, gulp.series('img-compression'));
  gulp.watch("**/*", {cwd: './dist/'},).on('change', browserSync.reload);
})

// Watch on everything
gulp.task('mdb-go', gulp.parallel('live-server', 'wath'));

function getJSModules() {
  delete require.cache[require.resolve('./js/modules.js')];
  return require('./js/modules');
}
