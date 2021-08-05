import { addTask } from './_tasks';
import { openModal, closeModal, validateTask, clearInputs } from './_taskModal';

export function attachEvents(that) {
  // add Events For Modal
  modalEvents(that);

  // Events For Modal
  function modalEvents(that) {
    // close modal
    $('#task-modal-close').click(function () {
      that.col = null;
      closeModal();
    });

    // open modal
    $('.vira-board-col__add').click(function (event) {
      that.col = $(event.target).parents('.vira-board-col');
      openModal();
    });

    $('#task-modal-title').blur(function () {
      validateTask();
    });

    // Add Task
    $('#task-modal-form').submit(function () {
      let data = {};
      $('#task-modal-form')
        .serializeArray()
        .forEach(function (item) {
          data[item.name] = item.value;
        });

      addTask(data, that.col);
      return false;
    });
  }
}
