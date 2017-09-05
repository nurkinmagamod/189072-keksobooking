'use strict';

(function () {
  var dialogCloseElement = document.querySelector('.dialog__close');
  var offerDialog = document.getElementById('offer-dialog');
  var selectedTd;

  function dialogCloseClickHandler() {
    dialogCloseAction();
  }
  window.showDialog = function () {
    offerDialog.classList.remove('hidden');
  };

  window.dialogCloseAction = function () {
    offerDialog.classList.add('hidden');
    selectedTd.classList.remove('pin--active');
    document.removeEventListener('keydown', dialogCloseKeyDownHandler);
  };

  window.dialogCloseKeyDownHandler = function (evt) {
    if (evt.keyCode === KEY_CODES.ESC) {
      dialogCloseAction();
    }
  };

  dialogCloseElement.addEventListener('click', dialogCloseClickHandler);
  renderDialogPanel(offers[0]);
  renderPin(offers);


})();
