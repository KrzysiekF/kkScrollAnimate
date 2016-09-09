'use strict';

var fs    = require('fs'),
    path  = require('path'),
    chalk = require('chalk'),
    cleanCSS = require('gulp-clean-css'),
    urlAdjuster = require('gulp-css-url-adjuster');

module.exports = function (gulp, $, paths, config, Logger) {

    gulp.task(config.task.appStyles, ' - pliki styli koszyka', function () {
        Logger.msg('');
        Logger.msg('Generuję plik styli...');
        Logger.msg('');

        return gulp.src(paths.core.css.files)
            .pipe($.sass(config.sass.options).on('error', $.sass.logError))
            .pipe($.autoprefixer(config.autoprefixer.options))
            .pipe(gulp.dest(paths.core.css.dest))
            .on('data', function () {
                Logger.msg('Plik gotowy:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('Minimalizuję plik...');
                Logger.msg('');
            })
            .pipe(cleanCSS(config.cleanCSS.options))
            .pipe(gulp.dest(paths.core.css.dest))
            .on('data', function () {
                Logger.msg('Plik gotowy:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.success('Gotowe!');
                Logger.msg('');
            });
    });

    gulp.task(config.task.libsStylesCopy, ' - kopiowanie potrzebnych plików styli bibliotek', function () {
        var length = paths.libs.css.copy.files.length;
        var i      = 1;

        Logger.warning('Kopiuje potrzebne pliki bibliotek (ilość plików: ' + length + '):');
        Logger.msg('');

        return gulp
            .src(paths.libs.css.copy.files)
            .pipe(gulp.dest(paths.libs.css.copy.dest))
            .on('data', function (file) {

                $.util.log(chalk.black.bgGreen(' COPY: ') + ' ' + path.basename(file.path));

                if (i >= length) {
                    Logger.msg('');
                }

                i++;
            });
    });

};