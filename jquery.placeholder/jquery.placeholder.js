// jQuery.placeholder
// a plugin to simplify placeholder text in input fields.
//
// Copyright (c) 2010 -- Jinzhu || wosmvp@gmail.com || http://github.com/jinzhu

(function($) {

  function placeholder(config) {
    config = config || {};

    function holderContent(elem) {
      return config.text || elem.attr('placeholder');
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
