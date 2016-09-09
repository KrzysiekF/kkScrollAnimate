'use strict';

var gulp     = require('gulp-help')(require('gulp')),
    paths    = require('./gulp/paths'),
    config   = require('./gulp/config'),
    logger   = require('./gulp/logger'),
    sequence = require('run-sequence'),
    $        = require('gulp-load-plugins')({
        pattern: '*',
        rename : {
            'lodash.assign': 'assign'
        }
    });

// require all tasks : gulp-load-subtasks
$.loadSubtasks('gulp/tasks/**/*.js', $, paths, config, logger);

gulp.task(config.task.libs, [config.task.libsScripts, config.task.libsScriptsCopy, config.task.libsStylesCopy]);