// Adiciona os módulos instalados
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

//Função para compilar o sass e adicionar os prefixos

function compilaSass() {
  return gulp
    .src("css/scss/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

//Tarefa de gulp para funçao de sass

//gulp.task("sass", compilaSass);

exports.compilaSass = compilaSass;

//Funçao para juntar o JS
function gulpJS() {
  return gulp
    .src("main/main/*.js")
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("main/"))
    .pipe(browserSync.stream());
}

//gulp.task("mainjs", gulpJS);

exports.gulpJS = gulpJS;

// JS Plugins

function pluginJS() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/moment/min/moment.min.js",
    ])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("main/"))
    .pipe(browserSync.stream());
}

//gulp.task("pluginjs", pluginJS); //forma antiga de criar tarefa

exports.pluginJS = pluginJS;

//Funçao para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

//Tarefa para iniciar o browser-sync
//gulp.task("browser-sync", browser);

exports.browser = browser;

// Funçao de watch do gulp
function watch() {
  gulp.watch("css/scss/*.scss", compilaSass);
  gulp.watch("main/main/*.js", gulpJS);
  gulp.watch("main/plugins/*.js", pluginJS);
  gulp.watch("*.html").on("change", browserSync.reload);
}

// Inicia a tarefa de watch
//gulp.task("watch", watch);

exports.watch = watch;

//Tarefa padrao do gulp, que inicia o watch e o browser-sync
exports.default = gulp.parallel(watch, browser, compilaSass, gulpJS, pluginJS);

//gulp.task(
//  "default",
//  gulp.parallel(watch, browser, compilaSass, gulpJS, pluginJS)
//);
