'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

jQuery(function ($) {
  var WOW = function () {
    function WOW() {
      _classCallCheck(this, WOW);
    }

    _createClass(WOW, [{
      key: 'init',
      value: function init() {
        $('.wow').wow();
      }
    }]);

    return WOW;
  }();

  var MDBWow = function () {
    function MDBWow($wowElement, customization) {
      _classCallCheck(this, MDBWow);

      this.$wowElement = $wowElement;
      this.customization = customization;
      this.animated = true;
      this.options = this.assignElementCustomization();
    }

    _createClass(MDBWow, [{
      key: 'init',
      value: function init() {
        var _this = this;

        $(window).scroll(function () {
          if (_this.animated) {
            _this.hide();
          } else {
            _this.mdbWow();
          }
        });

        this.appear();
      }
    }, {
      key: 'assignElementCustomization',
      value: function assignElementCustomization() {
        return {
          animationName: this.$wowElement.css('animation-name'),
          offset: 100,
          iteration: this.fallback().or(this.$wowElement.data('wow-iteration')).or(1).value(),
          duration: this.fallback().or(this.$wowElement.data('wow-duration')).or(1000).value(),
          delay: this.fallback().or(this.$wowElement.data('wow-delay')).or(0).value()
        };
      }
    }, {
      key: 'mdbWow',
      value: function mdbWow() {
        var _this2 = this;

        if (this.$wowElement.css('visibility') === 'visible') {
          return;
        }

        if (this.shouldElementBeVisible(true)) {
          setTimeout(function () {
            return _this2.$wowElement.removeClass('animated');
          }, this.countRemoveTime());
          this.appear();
        }
      }
    }, {
      key: 'appear',
      value: function appear() {
        this.$wowElement.addClass('animated');
        this.$wowElement.css({
          visibility: 'visible',
          'animation-name': this.options.animationName,
          'animation-iteration-count': this.options.iteration,
          'animation-duration': this.options.duration,
          'animation-delay': this.options.delay
        });
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this3 = this;

        if (this.shouldElementBeVisible(false)) {
          this.$wowElement.removeClass('animated');
          this.$wowElement.css({
            'animation-name': 'none',
            visibility: 'hidden'
          });
        } else {
          setTimeout(function () {
            _this3.$wowElement.removeClass('animated');
          }, this.countRemoveTime());
        }
        this.mdbWow();
        this.animated = !this.animated;
      }
    }, {
      key: 'shouldElementBeVisible',
      value: function shouldElementBeVisible(state) {
        var thisElementOffset = this.getOffset(this.$wowElement[0]);
        var thisElementHeight = this.$wowElement.height();
        var documentHeight = $(document).height();
        var windowHeight = window.innerHeight;
        var scroll = window.scrollY;

        var isElementTopVisible = windowHeight + scroll - this.options.offset > thisElementOffset;
        var isElementBottomVisible = windowHeight + scroll - this.options.offset > thisElementOffset + thisElementHeight;
        var isScrolledToTop = scroll < thisElementOffset;
        var isScrolledToBottom = scroll < thisElementOffset + thisElementHeight;
        var isDocumentHeightEqual = windowHeight + scroll === documentHeight;
        var isOffsetHigherThanDocument = thisElementOffset + this.options.offset > documentHeight;
        var isElementBottomHidden = windowHeight + scroll - this.options.offset < thisElementOffset;
        var isScrolledOverTop = scroll > thisElementOffset + this.options.offset;
        var isNotScrolledToTop = scroll < thisElementOffset + this.options.offset;
        var isScrolledOverElement = thisElementOffset + thisElementHeight > documentHeight - this.options.offset;

        var returnLogic = false;

        if (state) {
          returnLogic = isElementTopVisible && isScrolledToTop || isElementBottomVisible && isScrolledToBottom || isDocumentHeightEqual && isOffsetHigherThanDocument;
        } else {
          returnLogic = isElementTopVisible && isScrolledOverTop || isElementBottomHidden && isNotScrolledToTop || isScrolledOverElement;
        }
        return returnLogic;
      }
    }, {
      key: 'countRemoveTime',
      value: function countRemoveTime() {
        var defaultAnimationTime = this.$wowElement.css('animation-duration').slice(0, -1) * 1000;
        var removeTime = 0;

        if (this.options.duration) {
          removeTime = defaultAnimationTime + this.checkOptionsStringFormat(this.options.duration);
        }
        if (this.options.delay) {
          removeTime += this.checkOptionsStringFormat(this.options.delay);
        }
        return removeTime;
      }
    }, {
      key: 'checkOptionsStringFormat',
      value: function checkOptionsStringFormat(element) {
        var valueToReturn = void 0;

        if (element.toString().slice(-1) === 's') {
          valueToReturn = element.toString().slice(0, -1);
        } else if (!isNaN(element.toString().slice(-1))) {
          valueToReturn = element;
        } else {
          return console.log('Not supported animation customization format.');
        }

        return valueToReturn;
      }
    }, {
      key: 'getOffset',
      value: function getOffset(element) {
        var box = element.getBoundingClientRect();
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var top = box.top + scrollTop - clientTop;

        return Math.round(top);
      }
    }, {
      key: 'fallback',
      value: function fallback() {
        return {
          _value: undefined,
          or: function or(value) {
            if (typeof value !== 'undefined' && typeof this._value === 'undefined') {
              this._value = value;
            }
            return this;
          },
          value: function value() {
            return this._value;
          }
        };
      }
    }]);

    return MDBWow;
  }();

  $.fn.wow = function (options) {
    this.each(function () {
      var mdbWow = new MDBWow($(this), options);
      mdbWow.init();
    });
  };

  window.WOW = WOW;
});