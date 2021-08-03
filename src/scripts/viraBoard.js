import { initialColumns } from './lib/_columns';
import { initialTaskModal } from './lib/_taskModal';
import { initialTasks } from './lib/_tasks';

(function ($) {
  let pluginName = 'viraBoard';

  let defaults = {
    direction: 'row', // accept row / column
    titles: [], // titles of column board is required
  };

  const ViraBoard = function (element, options) {
    this.element = element;
    this.settings = $.extend(defaults, options);
    this.init();
  };

  $.extend(ViraBoard.prototype, {
    init: function () {
      initialColumns(this);
      initialTaskModal();
      initialTasks(this);
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
})($);

// execute plugin for instance
$('[data-plugin_board]').each(function () {
  let options = $(this).data('plugin_board');
  $(this).viraBoard(options);
});
