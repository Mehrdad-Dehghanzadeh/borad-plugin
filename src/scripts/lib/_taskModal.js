import { attachEventModal } from './_events';

export function initialTaskModal() {
  setTaskModal();

  attachEventModal();
}

function setTaskModal() {
  let taskModal = $(
    '<div class="task-modal">' +
      '<div class="task-modal__container">' +
      '<form class="task-modal__form" id="task-modal-form">' +
      '<div class="control">' +
      '<label for="task-modal-input" class="task-modal__label">عنوان</label>' +
      '<input id="task-modal-input" type="text" name="title" />' +
      '</div>' +
      '<div class="control">' +
      '<label for="task-modal-textarea" class="task-modal__label">توضیحات</label>' +
      '<textarea class="task-modal__textarea" id="task-modal-textarea" name="description"></textarea>' +
      '</div>' +
      '<div class="control">' +
      '<button type="submit" class="task-modal__btn" id="task-modal-submit">ثبت</button>' +
      '<button type="button" class="task-modal__btn" id="task-modal-close">بستن</button>' +
      '</div>' +
      '</form>' +
      '</div>' +
      '</div>'
  );

  $('body').append(taskModal);
}
