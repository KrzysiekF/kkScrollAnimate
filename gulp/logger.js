var gutil = require('gulp-util');

module.exports = {
    success : function(msg) {
        var msg = ' ' + msg + ' ';

        gutil.log('');
        gutil.log( gutil.colors.black( gutil.colors.bgGreen(msg) ) );

        return this;
    },
    warning : function(msg) {
        var msg = ' ' + msg + ' ';

        gutil.log('');
        gutil.log( gutil.colors.black( gutil.colors.bgYellow(msg) ) );

        return this;
    },
    msg : function(msg) {
        var msg = msg + ' ';

        gutil.log(msg);

        return this;
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