import { closeModal, validateTask } from './_task-modal';

export function initialTasks(that) {
  setTask(that);
}

function setTask(that) {
  that.element.children('.vira-board-col').each(function (index) {
    const data = $(this).data('plugin_board-tasks');

    if (typeof data === 'object' && data.length) {
      for (let item of data) {
        $(this)
          .children('.vira-board-col__container')
          .append(templateTask(item));
      }
    }
  });
}

function templateTask(data) {
  return $(
    '<section class="vira-board-task">' +
      '<h4 class="vira-board-task__title">' +
      data.title +
      '</h4>' +
      '<p class="vira-board-task__description">' +
      data.description +
      '</p>' +
      '</section>'
  );
}

export function addTask(data, col) {
  if (validateTask()) {
    col.children('.vira-board-col__container').append(templateTask(data));
    closeModal();
  }
}
