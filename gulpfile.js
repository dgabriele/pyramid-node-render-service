var gulp = require('gulp');
var babel = require('gulp-babel');
var config = require('config');
var runsequence = require('run-sequence');
var gutil = require('gulp-util');
var exec = require('gulp-exec');
var ignore = require('gulp-ignore');
var changed = require('gulp-changed');
var livereload = require('gulp-livereload');
var del = require('del');
var path = require('path');
var paths = require('./paths');

// default build config to development
process.env['NODE_ENV'] = process.env['NODE_ENV'] || 'development';

gulp.task('build', function() {
    runsequence(['transpile', 'copy:views','bundle'])
});

gulp.task('clean', function() {
    del([paths.build.dir]);
});

gulp.task('serve', function() {
    require('./build/app').listen();
});

/** Run the express app under livereload.
 */
gulp.task('watch', ['serve'], function() {
    livereload.listen({
        host: config.get('livereload.host'),
        port: config.get('livereload.port'),
    });
    gulp.watch(path.join(paths.source.dir, '*.js'), ['transpile']);
    gulp.watch(path.join(paths.source.components.src), ['transpile']);
    gulp.watch(path.join(paths.source.routes.src), ['transpile']);
    gulp.watch(path.join(paths.source.pub.src), ['bundle']);
    gulp.watch(path.join(paths.source.views.jadeFiles), ['copy:views']);
    gulp.watch(path.join(paths.source.dir, '/**/*'), ['serve']);
});

/** bundle and minify client apps.
 */
gulp.task('bundle', function() {
    var src = '<%= file.path %>';
    var dest = path.join(paths.build.dir, 'public', '<%= file.relative %>');
    var flags = '--inject' + (config.get('jspm.minify') ? ' --minify' : '');
    var cmd = ['jspm bundle-sfx', src, dest, flags].join(' ');
    gulp.src(paths.source.pub.src)
        .pipe(changed(paths.build.pub.dir))
        .pipe(exec(cmd))
        .pipe(exec.reporter({
            stdout: false,
            stderr: true,
            err: true,
        }));
});

/** transpile EC6 to EC5.
 */
gulp.task('transpile', function() {
    gulp.src(paths.source.src)
        .pipe(ignore(paths.source.pub.dir))
        .pipe(changed(paths.build.dir))
        .pipe(babel(config.get('babel')))
        .pipe(gulp.dest(paths.build.dir));
});

/** copy jade files to build dir.
 */
gulp.task('copy:views', function() {
    gulp.src(paths.source.views.jadeFiles)
        .pipe(changed(paths.build.views.dir))
        .pipe(gulp.dest(paths.build.views.dir));
});
