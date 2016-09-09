;( function( $, window, document, undefined ) {

    "use strict";

    var pluginName = "kkScrollAnimate",
        defaults = {
            scrollContent: $('body'),
            startFromElement: false,
            scrollType: 'vertical',
            startScroll: 0,
            endScroll: 0,
            cssProperty: '',
            before: 0,
            after: 0,
            unit: ''
        };

    function Plugin ( element, options ) {
        this.element = element;

        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        this.scrollRange = null;
        this.cssArgsBefore = {};
        this.cssArgsAfter = {};
        this.currentCss = {};
        this.scrollFromTop = null;
        this.scrollFromLeft = null;
        this.beforeProp = null;
        this.afterProp = null;

        this.init();
    }

    $.extend( Plugin.prototype, {

        init: function() {
            var _this = this;

            this.setData();
            this.startFromElement();
            this.transformProperty();

            this.settings.scrollContent.on('scroll', function() {
                _this.onScroll();
            });
        },

        setData: function() {
            this.scrollRange = this.settings.endScroll - this.settings.startScroll;
            this.cssArgsBefore[this.settings.cssProperty] = this.settings.before + this.settings.unit;
            this.cssArgsAfter[this.settings.cssProperty] = this.settings.after + this.settings.unit;
        },

        startFromElement: function() {
            if(this.settings.startFromElement) {

                var startingElement = $(this.settings.startFromElement);

                var startingElementOffset = startingElement.offset();
                var startingElementOffsetTop = startingElementOffset.top;
                var startingElementOffsetLeft = startingElementOffset.left;

                var windowWidth = $(window).width();
                var windowHeight = $(window).height();

                this.scrollFromTop = startingElementOffsetTop - windowHeight;
                this.scrollFromLeft = startingElementOffsetLeft - windowWidth;

                $(window).bind('resize', function() {

                    windowWidth = $(window).width();
                    windowHeight = $(window).height();

                    _this.scrollFromTop = startingElementOffsetTop - windowHeight;
                    _this.scrollFromLeft = startingElementOffsetLeft - windowWidth;

                });

            }
        },

        transformProperty: function() {
            if(this.settings.cssProperty == 'transform') {

                // set css3 transform webkit and moz fallbacks
                this.cssArgsBefore['-webkit-transform'] = this.settings.before;
                this.cssArgsAfter['-webkit-transform'] = this.settings.after;
                this.cssArgsBefore['-moz-transform'] = this.settings.before;
                this.cssArgsAfter['-moz-transform'] = this.settings.after;

                // get int from css3 transform rotate and skew
                if(this.settings.before.indexOf('deg') != -1) {

                    this.beforeProp = this.settings.before.split('(');
                    this.beforeProp = this.beforeProp[1].split('deg');
                    this.beforeProp = parseFloat(this.beforeProp[0]);

                    this.afterProp = this.settings.after.split('(');
                    this.afterProp = this.afterProp[1].split('deg');
                    this.afterProp = parseFloat(this.afterProp[0]);

                } else if(this.settings.before.indexOf('scale') != -1) {

                    this.beforeProp = this.settings.before.split('(');
                    this.beforeProp = this.beforeProp[1].split(')');
                    this.beforeProp = parseFloat(this.beforeProp[0]);

                    this.afterProp = this.settings.after.split('(');
                    this.afterProp = this.afterProp[1].split(')');
                    this.afterProp = parseFloat(this.afterProp[0]);

                }

            }
        },

        onScroll: function() {
            var scroll = null;

            if(this.settings.scrollType == 'vertical') {

                scroll = this.settings.scrollContent.scrollTop();

                if(this.settings.startFromElement) {

                    scroll = scroll - scrollFromTop;

                }

            } else if(this.settings.scrollType == 'horizontal') {

                scroll = this.settings.scrollContent.scrollLeft();

                if(this.settings.startFromElement) {

                    scroll = scroll - scrollFromLeft;

                }

            }

            var scrollPercentage = (scroll - this.settings.startScroll) / this.scrollRange;

            if(scroll < this.settings.startScroll) {

                if(this.settings.cssProperty === 'add-class') {
                    $(this.element).removeClass(this.cssArgsAfter['add-class']);
                } else {
                    $(this.element).css(this.cssArgsBefore);
                }

            } else if(scroll > this.settings.endScroll) {

                $(this.element).css(this.cssArgsAfter);

            } else {

                if(this.settings.cssProperty === 'add-class') {
                    $(this.element).addClass(this.cssArgsAfter['add-class']);
                } else if(this.settings.cssProperty == 'transform') {

                    var currentTransformValue = this.beforeProp + (this.afterProp - this.beforeProp) * scrollPercentage;

                    if(this.settings.before.indexOf('rotate') != -1)
                        var currentTransform = 'rotate(' + currentTransformValue + 'deg)';

                    else if(this.settings.before.indexOf('skew') != -1)
                        var currentTransform = 'skew(' + currentTransformValue + 'deg)';

                    else if(this.settings.before.indexOf('scale') != -1)
                        var currentTransform = 'scale(' + currentTransformValue + ')';

                    this.currentCss[this.settings.cssProperty] = currentTransform;
                    this.currentCss['-moz-transform'] = currentTransform;
                    this.currentCss['-webkit-transform'] = currentTransform;

                    $(this.element).css(this.currentCss);

                } else {

                    this.currentCss[this.settings.cssProperty] = (this.settings.before + (this.settings.after - this.settings.before) * scrollPercentage) + this.settings.unit;
                    $(this.element).css(this.currentCss);

                }

            }
        }

    } );

    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                    pluginName, new Plugin( this, options ) );
            }
        } );
    };

} )( jQuery, window, document );