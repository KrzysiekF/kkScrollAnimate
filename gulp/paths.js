'use strict';

module.exports = {

    core: {
        js: {
            files: [
                'src/kkScrollAnimate.js'
            ],
            dest: 'dist',
            watch: ['src/*.js'],
            fileName: 'kkScrollAnimate.js'
        },

        css: {
            files: 'demo/assets/styles/*.scss',
            dest: 'demo/assets/styles',
            watch: [
                'demo/assets/styles/*.scss',
                'demo/assets/styles/components/*.scss'
            ]
        }
    },
    libs: {
        js: {
            files: [
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/jquery-migrate/jquery-migrate.min.js',
                'bower_components/materialize/dist/js/materialize.min.js'
            ],
            dest: 'demo/assets/js',
            fileName: 'libs.min.js',
            copy: {
                files: [],
                dest: 'demo/assets/js/libs'
            }
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