// jQuery.placeholder
// a plugin to simplify placeholder text in input fields.
//
// Copyright (c) 2010 -- Jinzhu || wosmvp@gmail.com || http://github.com/jinzhu

(function($) {

  function placeholder(config) {
    config = config || {};

    function holderContent(elem) {
      var holderText = config.text || elem.attr('placeholder');
      elem.attr('placeholder', holderText)
      return holderText;
    }

    function updatePlaceHolder(elem) {
      if (elem.val() === '') {
        elem.val(holderContent(elem));
      }
    }

    return this.each(function() {
      updatePlaceHolder($(this));

      $(this).blur(function() {
        updatePlaceHolder($(this));
        if (config.blur instanceof Function) { config.blur.call(this) }
      })

      $(this).parents('form').submit(function() {
        var elem = $(this).find("[placeholder]");
        if (elem.val() === holderContent(elem)) { elem.val('') }
      })

      $(this).focus(function() {
        var elem = $(this);
        if (elem.val() === holderContent(elem)) { elem.val('') }
        if (config.focus instanceof Function) { config.focus.call(this) }
      })
    })
  }

  $.extend({placeholder : placeholder});
  $.fn.extend({placeholder : placeholder});
})(jQuery)
