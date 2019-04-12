// const gulp = require("gulp");
// const webserver = require("gulp-webserver");


// gulp.task('server', () => {
//     return gulp.src('./src')
//         .pipe(webserver({
//             port: 9090,
//             livereload: true
//         }));
// })
// gulp.task('default', gulp.series('server'))
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const mincss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const gulpSass = require("gulp-sass");
const babel = require("gulp-babel");

const webserver = require("gulp-webserver");
gulp.task('sass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('devBabel', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        })).pipe(gulp.dest('./dist'));
})
gulp.task('watching', () => {
    gulp.watch(['./src/scss/**/*.scss', './src/js/**/*.js'], gulp.series('sass', 'devBabel'));

})
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9090,
            livereload: true
        }));
})



gulp.task('default', gulp.series('sass', 'server', 'watching'))