'use strict';

(function () {
  window.MIN_X_LOCATION = 300;
  window.MIN_Y_LOCATION = 100;
  window.MAX_X_LOCATION = 900;
  window.MAX_Y_LOCATION = 500;
  window.PIN_CONTAINER_WIDTH = 56;
  window.PIN_CONTAINER_HEIGHT = 75;
  var MAIN_PIN_MAX_X = 1162;
  var MAIN_PIN_MAX_Y = 568;
  var MAIN_PIN_MIN_Y = 73;
  var MAIN_PIN_MIN_X = -37;
  var MAIN_PIN_HIEGHT = 94;
  var MAIN_PIN_WIDHT = 74;
  var dialogCloseElement = document.querySelector('.dialog__close');
  var offerDialog = document.getElementById('offer-dialog');


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
  var addressFieldElement = document.getElementById('address');


  var mainPin = document.querySelector('.pin__main');


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

      function preventExternalMove(elem, minX, minY, maxX, maxY) {
        if ((elem.offsetTop - shift.y) > maxY) {
          elem.style.top = maxY + 'px';
        } else if ((elem.offsetTop - shift.y) < minY) {
          elem.style.top = minY + 'px';
        } else if ((elem.offsetLeft - shift.x) < minX) {
          elem.style.left = minX + 'px';
        } else if ((elem.offsetLeft - shift.x) > maxX) {
          elem.style.left = maxX + 'px';
        }
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      preventExternalMove(mainPin, MAIN_PIN_MIN_X, MAIN_PIN_MIN_Y, MAIN_PIN_MAX_X, MAIN_PIN_MAX_Y);
      addressFieldElement.value = 'x: ' + (mainPin.offsetLeft - shift.x + MAIN_PIN_WIDHT / 2) + ' y: ' + (mainPin.offsetTop - shift.y + MAIN_PIN_HIEGHT);
    };
    var onMouseUp = function (upEvt)	{
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
