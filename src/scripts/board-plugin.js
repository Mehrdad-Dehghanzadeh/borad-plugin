import { initialColumns } from './lib/_columns';
import { initialTaskModal } from './lib/_task-modal';
import { initialTasks } from './lib/_tasks';
import { attachEvents } from './lib/_events';

(function ($) {
  let pluginName = 'board';

  let defaults = {
    direction: 'row', // accept row / column
    titles: [], // titles of column board is required
  };

  const Board = function (element, options) {
    this.element = element;
    this.settings = $.extend(defaults, options);
    this.col = null;
    this.init();
  };

  $.extend(Board.prototype, {
    init: function () {
      initialColumns(this);
      initialTaskModal();
      initialTasks(this);

      attachEvents(this);
    },
  });

  $.fn[pluginName] = function (options) {
    return $(this).each(function () {
      let attrName = 'plugin_' + pluginName;
      let instance = $.data(this, attrName);
      let optionsData = $(this).data(attrName);

      if (!instance) {
        if (options === undefined && optionsData) {
          $.data(this, attrName, new Board($(this), optionsData));
        } else if (options === undefined || typeof options === 'object') {
          $.data(this, attrName, new Board($(this), options));
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
  $[pluginName] = Board;
})($);

// execute plugin for instance
$('.vira-board').board();
