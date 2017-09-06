'use strict';

(function () {
  window.MIN_X_LOCATION = 300;
  window.MIN_Y_LOCATION = 100;
  window.MAX_X_LOCATION = 900;
  window.MAX_Y_LOCATION = 500;
  window.PIN_CONTAINER_WIDTH = 56;
  window.PIN_CONTAINER_HEIGHT = 75;

  var dialogCloseElement = document.querySelector('.dialog__close');
  var offerDialog = document.getElementById('offer-dialog');
  var selectedTd;

  function dialogCloseClickHandler() {
    window.dialogCloseAction();
  }
  window.showDialog = function () {
    offerDialog.classList.remove('hidden');
  };

  window.dialogCloseAction = function () {
    offerDialog.classList.add('hidden');
    selectedTd.classList.remove('pin--active');
    document.removeEventListener('keydown', window.dialogCloseKeyDownHandler);
  };

  window.dialogCloseKeyDownHandler = function (evt) {
    if (evt.keyCode === window.KEY_CODES.ESC) {
      window.dialogCloseAction();
    }
  };

  dialogCloseElement.addEventListener('click', dialogCloseClickHandler);

  window.offers = window.createRandomOffers();
  window.renderDialogPanel(window.offers[0]);
  window.renderPin(window.offers);

})();
