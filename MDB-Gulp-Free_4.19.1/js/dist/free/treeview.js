'use strict';

jQuery(function ($) {
  $.fn.mdbTreeview = function () {

    var $this = $(this);

    if ($this.hasClass('treeview')) {
      treeviewToggle($this);
    }

    if ($this.hasClass('treeview-animated')) {
      treeviewAnimated($this);
    }

    if ($this.hasClass('treeview-colorful')) {
      treeviewColorful($this);
    }
  };

  function treeviewToggle($this) {
    var $toggler = $this.find('.rotate');

    $toggler.each(function () {
      var $this = $(this);

      $this.off('click');
      $this.on('click', function () {
        var $this = $(this);

        $this.siblings('.nested').toggleClass('active');
        $this.toggleClass('down');
      });
    });
  }

  function treeviewAnimated($this) {
    var $elements = $this.find('.treeview-animated-element');
    var $closed = $this.find('.closed');

    $this.find('.nested').hide();

    $closed.off('click');
    $closed.on('click', function () {
      var $this = $(this);
      var $target = $this.siblings('.nested');
      var $pointer = $this.children('.fa-angle-right');

      $this.toggleClass('open');
      $pointer.toggleClass('down');

      if (!$target.hasClass('active')) {
        $target.addClass('active').slideDown();
      } else {
        $target.removeClass('active').slideUp();
      }
    });

    $elements.off('click');
    $elements.on('click', function () {
      var $this = $(this);

      if ($this.hasClass('opened')) {
        $this.removeClass('opened');
      } else {
        $elements.removeClass('opened');
        $this.addClass('opened');
      }
    });
  }

  function treeviewColorful($this) {
    var $elements = $this.find('.treeview-colorful-element');
    var $header = $this.find('.treeview-colorful-items-header');

    $this.find('.nested').hide();

    $header.off('click');
    $header.on('click', function () {
      var $this = $(this);
      var $target = $this.siblings('.nested');
      var $pointerPlus = $this.children('.fa-plus-circle');
      var $pointerMinus = $this.children('.fa-minus-circle');

      $this.toggleClass('open');
      $pointerPlus.removeClass('fa-plus-circle');
      $pointerPlus.addClass('fa-minus-circle');
      $pointerMinus.removeClass('fa-minus-circle');
      $pointerMinus.addClass('fa-plus-circle');

      if (!$target.hasClass('active')) {
        $target.addClass('active').slideDown();
      } else {
        $target.removeClass('active').slideUp();
      }
    });

    $elements.off('click');
    $elements.on('click', function () {
      var $this = $(this);

      if ($this.hasClass('opened')) {
        $elements.removeClass('opened');
      } else {
        $elements.removeClass('opened');
        $this.addClass('opened');
      }
    });
  }
});