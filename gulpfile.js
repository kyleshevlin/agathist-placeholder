const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const image = require('gulp-image')
const connect = require('gulp-connect')
const ejs = require('gulp-ejs')

// Templates
gulp.task('templates', () => {
  return gulp.src('./src/templates/index.ejs')
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

// Styles
gulp.task('styles', () => {
  const postCssPlugins = [
    autoprefixer()
  ]

  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload())
})

// JS
gulp.task('babel', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload())
})

// Images
gulp.task('images', () => {
  return gulp.src('./src/assets/imgs/**')
    .pipe(image())
    .pipe(gulp.dest('./build/public'))
})

// Connect
gulp.task('connect', () => {
  connect.server({
    root: './build',
    livereload: true
  })
})

// Watch
gulp.task('watch', () => {
  gulp.watch('./src/templates/**/*.ejs', ['templates'])
  gulp.watch('./src/scss/**/*.scss', ['styles'])
  gulp.watch('./src/js/**/*.js', ['babel'])
})

gulp.task('default', ['templates', 'styles', 'babel', 'images', 'connect', 'watch'])
