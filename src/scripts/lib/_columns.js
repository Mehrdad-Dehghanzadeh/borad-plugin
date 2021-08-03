export function initialColumns(that) {
  checkColumns(that);
  setColumnsContainer();
  setHeaderColumns(that);
  addTitleColumns(that);
}

function checkColumns(that) {
  try {
    if (that.settings.titles.length === 0)
      throw new Error('Please Enter titles at data-plugin_board');

    if (that.element.children('.vira-board-col').length === 0)
      throw new Error(
        'Please Add column or Add "vira-board-col" className for Column'
      );

    if (
      that.element.children('.vira-board-col').length !==
      that.settings.titles.length
    )
      throw new Error("number of title isn't match number of column");
  } catch (e) {
    console.error(e);
  }
}

function setHeaderColumns(that) {
  let columns = that.element.children('.vira-board-col');
  columns.each(function () {
    $(this).prepend(
      '<div class="vira-board-col__header">' +
        '<span class="vira-board-col__add">add</span>' +
        '<h3 class="vira-board-col__title"></h3>' +
        '</div>'
    );
  });
}

function setColumnsContainer() {
  $('.vira-board-col').each(function () {
    let contents = $(this).contents();
    $(this)
      .html('')
      .append('<article class="vira-board-col__container"></article>');
    $(this).children('.vira-board-col__container').append(contents);
  });
}

function addTitleColumns(that) {
  $('.vira-board-col__title').each(function (index) {
    $(this).text(that.settings.titles[index]);
  });
}
