export function initialTaskModal() {
  setTaskModal();
}

function setTaskModal() {
  let taskModal = $(
    '<div class="task-modal">' +
      '<div class="task-modal__container">' +
      '<form class="task-modal__form" id="task-modal-form">' +
      '<div class="control">' +
      '<label for="task-modal-title" class="task-modal__label">عنوان</label>' +
      '<input id="task-modal-title" type="text" name="title" />' +
      '</div>' +
      '<div class="control">' +
      '<label for="task-modal-description" class="task-modal__label">توضیحات</label>' +
      '<textarea class="task-modal__textarea" id="task-modal-description" name="description"></textarea>' +
      '</div>' +
      '<div class="control">' +
      '<button type="submit" class="task-modal__btn" id="task-modal-create">ثبت</button>' +
      '<button type="button" class="task-modal__btn" id="task-modal-close">بستن</button>' +
      '</div>' +
      '</form>' +
      '</div>' +
      '</div>'
  );

  $('body').append(taskModal);
}

export function closeModal() {
  $('.task-modal').hide();
  $('#task-modal-form')
    .find('input, textarea')
    .each(function () {
      $(this).val('');
    });
}

export function openModal() {
  $('.task-modal').show();
}

export function toggleModal() {
  $('.task-modal').toggle();
}

// Validate Modal Form For Add Task
export function validateTask() {
  const title = $('#task-modal-title');
  const val = title.val();
  if (val) {
    title.siblings('.error').remove();
  } else if (title.siblings('.error').length === 0) {
    title.after('<i class="error">لطفا مقدار وارد کنید</i>');
  }
  return val;
}
