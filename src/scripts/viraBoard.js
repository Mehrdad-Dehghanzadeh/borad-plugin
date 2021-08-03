(function ($, window) {
  let pluginName = 'viraBoard';

  let defaults = {
    maxColumn: 5,
    minColumn: 1,
    direction: 'row', // accept row / column
  };

  const ViraBoard = function (element, options) {
    this.wrapper = element;
    this.settings = $.extend(defaults, options);
    this.init();
  };

  $.extend(ViraBoard.prototype, {
    init: function () {
      console.log(this.wrapper);
    },
  });

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      let attrName = 'plugin_' + pluginName;
      let instance = $.data(this, attrName);

      if (!instance) {
        if (options === undefined || typeof options === 'object') {
          $.data(this, attrName, new ViraBoard($(this), options));
        } else {
          $.error("method '" + options + "' not attached.");
        }
      } else {
        if (instance[options]) {
          instance[options].apply(instance);
        } else if (typeof options === 'object') {
          instance.settings = $.extend({}, instance.settings, options);
        } else if (!options) {
        } else {
          $.error("The method '" + options + "' not exist.");
        }
      }
    });
  };
  $[pluginName] = ViraBoard;
})($, window);

// execute plugin for instance
$('[data-plugin_board]').each(function () {
  let options = $(this).data('plugin_board');
  $(this).viraBoard(options);
});
