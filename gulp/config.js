'use strict';

module.exports = {

    task: {
        appScripts: 'plugin-scripts',
        appStyles: 'plugin-styles',

        libsScripts: 'libs-scripts',
        libsScriptsCopy: 'libs-scripts-copy',
        libsStylesCopy: 'libs-styles-copy',

        watch: 'watch',
        libs: 'libs'
    },

    size: {
        options: {
            showFiles: true
        }
    },
    uglify: {
        devOptions: {
            mangle: false,
            output: {
                beautify: true,
                comments: true
            }
        },
        prodOptions: {
            mangle: true,
            output: {
                beautify: false,
                comments: false
            }
        }
    },
    autoprefixer: {
        options: 'last 2 version'
    },
    sass: {
        options: {
            outputStyle: 'compressed'
        }
    },
    urlAdjuster: {
        options: {
            prepend: '../'
        }
    },
    cleanCSS: {
        options: {
            compatibility: 'ie9',
            keepSpecialComments: 0
        }
    },

    error: function(error) {
        gutil.log(
            gutil.colors.red(
                '\n\------------------------------\n\Error in plugin (' + gutil.colors.green(error.plugin) + '):\n\ ' + gutil.colors.blue(error.message) + '------------------------------'
            )
        );
        this.emit('end');
    }
};