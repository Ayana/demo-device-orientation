// const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require("gulp") //When use this line instead of above line, change method without [gulp.] ex. gulp.dest => dest
const del = require("del")
const sass = require("gulp-sass")
const concat = require("gulp-concat")
const minify = require("gulp-minify")
const autoprefixer = require("gulp-autoprefixer")
const babel = require("gulp-babel")
const browserSync = require("browser-sync").create()
const imagemin = require("gulp-imagemin")
const mozjpeg = require("imagemin-mozjpeg")
const pngquant = require("imagemin-pngquant")
const fileinclude = require("gulp-file-include")

// Clean dist folder
function cleanTask() {
  return del(["./docs"])
}

// CSS bundle, minify task
function cssTask() {
  return (
    src("./src/scss/*.scss")
      // .pipe(sass().on('error', sass.logError))
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(dest("./docs/css"))
      .pipe(browserSync.stream())
  )
}

// HTML task
function htmlTask() {
  return src("./src/*.html").pipe(dest("./docs/"))
  // .pipe(browserSync.stream())
}

// Vendor task
function vendorTask() {
  return src("./src/vendor/*").pipe(dest("./docs/vendor/"))
  // .pipe(browserSync.stream())
}

// JS Babel & minify task
function jsTask() {
  return (
    src("./src/js/**/*.js")
      .pipe(concat("app.js"))
      .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(minify())
      // .pipe(minify({ ext: { src: '-debug.js', min: '.js' }, ignoreFiles: ['-min.js'] }))
      .pipe(dest("./docs/js"))
      .pipe(browserSync.stream())
  )
}

// Image minify task
function imageTask() {
  return src("./src/images/*")
    .pipe(
      imagemin([
        pngquant({
          quality: [0.9, 1.0], // [minimum, maximum]
        }),
        mozjpeg({
          quality: 100,
        }),
      ])
    )
    .pipe(dest("./docs/images"))
    .pipe(browserSync.stream())
}

// File include task
function fileincludeTask() {
  return src(["./src/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest("./docs/"))
}

// Watch task
function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./docs/", //Destination folder
    },
  })
  watch("./src/images/**/*", imageTask)
  watch("./src/scss/**/*.scss", cssTask)
  watch("./src/js/*.js", jsTask)
  watch("./src/vendor/*", vendorTask)
  watch("./src/**/*.html", series(htmlTask, fileincludeTask)).on("change", browserSync.reload)
  // watch('./dist/*.html').on('change', browserSync.reload)
  // watch('./dest/js/*.js').on('change', reloadBrowser); //Use when change js files directly
}

// Export tasks  -- To start task, "gulp TASKNAME"
exports.image = imageTask //ig. "gulp image"
exports.style = cssTask
exports.js = jsTask
exports.html = htmlTask
exports.fileinclude = fileincludeTask
exports.watch = watchTask
exports.clean = cleanTask

// Default task
exports.default = series(
  cleanTask,
  parallel(imageTask, vendorTask, cssTask, jsTask),
  htmlTask,
  fileincludeTask,
  watchTask
)
