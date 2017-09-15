'use strict';

(function () {
  var dialogCloseElement = document.querySelector('.dialog__close');
  var offerDialog = document.getElementById('offer-dialog');

  var closeDialog = function () {
    offerDialog.classList.add('hidden');
    window.highlight();
  };

  var showDialog = function () {
    offerDialog.classList.remove('hidden');
  };

  var dialogCloseKeyDownHandler = function (evt) {
    if (evt.keyCode === window.KEY_CODES.ESC) {
      closeDialog();
    }
  };

  dialogCloseElement.addEventListener('click', closeDialog);

  window.showDialog = showDialog;

  window.closeDialog = closeDialog;

  window.dialogCloseKeyDownHandler = dialogCloseKeyDownHandler;

  window.showCard = function (elem, evt) {
    if (evt.target.classList.contains('pin__main') || evt.target.parentNode.classList.contains('pin__main')) {
      return;
    }
    var pinDataID = !evt.target.parentNode.hasAttribute('data-item') ? evt.target.getAttribute('data-item') : evt.target.parentNode.getAttribute('data-item');
    window.renderDialogPanel(elem[pinDataID]);
    showDialog();
  };
})();

