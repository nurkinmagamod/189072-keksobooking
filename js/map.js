'use strict';

(function () {
  window.MIN_X_LOCATION = 300;
  window.MIN_Y_LOCATION = 100;
  window.MAX_X_LOCATION = 900;
  window.MAX_Y_LOCATION = 500;
  var MAIN_PIN_MAX_X = 1162;
  var MAIN_PIN_MAX_Y = 568;
  var MAIN_PIN_MIN_Y = 73;
  var MAIN_PIN_MIN_X = -37;

  var dialogCloseElement = document.querySelector('.dialog__close');
  var offerDialog = document.getElementById('offer-dialog');
  var mainPin = document.querySelector('.pin__main');

  function preventExternalMove(elem, position, minX, minY, maxX, maxY) {
    elem.style.top = position.y + 'px';
    elem.style.left = position.x + 'px';

    if (elem.offsetTop > maxY) {
      elem.style.top = maxY + 'px';
    } else if (elem.offsetTop < minY) {
      elem.style.top = minY + 'px';
    }
    if (elem.offsetLeft < minX) {
      elem.style.left = minX + 'px';
    } else if (elem.offsetLeft > maxX) {
      elem.style.left = maxX + 'px';
    }
  }

  function dialogCloseClickHandler() {
    window.dialogCloseAction();
  }
  window.showDialog = function () {
    offerDialog.classList.remove('hidden');
  };

  window.dialogCloseAction = function () {
    offerDialog.classList.add('hidden');
    window.highlight();
    document.removeEventListener('keydown', window.dialogCloseKeyDownHandler);
  };

  window.dialogCloseKeyDownHandler = function (evt) {
    if (evt.keyCode === window.KEY_CODES.ESC) {
      window.dialogCloseAction();
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      mainPin.style.zIndex = 999;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY

      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        x: (mainPin.offsetLeft - shift.x),
        y: (mainPin.offsetTop - shift.y)
      };

      preventExternalMove(mainPin, pinPosition, MAIN_PIN_MIN_X, MAIN_PIN_MIN_Y, MAIN_PIN_MAX_X, MAIN_PIN_MAX_Y);
      window.changeAddressField(mainPin);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  dialogCloseElement.addEventListener('click', dialogCloseClickHandler);

  window.offers = window.createRandomOffers();
  window.renderDialogPanel(window.offers[0]);
  window.renderPin(window.offers);

})();
