export function attachEventModal() {
  $('#task-modal-close').click(function () {
    $('.task-modal').hide();
  });

  $('.vira-board-col__add').click(function () {
    $('.task-modal').show();
  });
}
