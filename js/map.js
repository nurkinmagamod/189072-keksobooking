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

  function getBoundedCoords(possibleX, possibleY) {
    var coords = {x: possibleX, y: possibleY};

    if (possibleY > MAIN_PIN_MAX_Y) {
      coords.y = MAIN_PIN_MAX_Y;
    } else if (possibleY < MAIN_PIN_MIN_Y) {
      coords.y = MAIN_PIN_MIN_Y;
    }
    if (possibleX > MAIN_PIN_MAX_X) {
      coords.x = MAIN_PIN_MAX_X;
    } else if (possibleX < MAIN_PIN_MIN_X) {
      coords.x = MAIN_PIN_MIN_X;
    }
    return coords;
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
      mainPin.style.zIndex = 998;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY

      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPinPosition = {
        x: (mainPin.offsetLeft - shift.x),
        y: (mainPin.offsetTop - shift.y)
      };

      var coords = getBoundedCoords(newPinPosition.x, newPinPosition.y);

      mainPin.style.top = coords.y + 'px';
      mainPin.style.left = coords.x + 'px';

      var pinAddressX = coords.x + window.MAIN_PIN_WIDTH / 2;
      var pinAddressY = coords.y + window.MAIN_PIN_HIEGHT;

      window.changeAddressField(pinAddressX, pinAddressY);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.showErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 999;
    node.style.backgroundColor = 'red';
    node.style.textAlign = 'center';
    node.style.width = 100 + '%';
    node.style.margin = '0 auto';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = 30 + '%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  dialogCloseElement.addEventListener('click', dialogCloseClickHandler);

  window.backend.load(function (data) {
    window.dataFromServer = data;
    window.renderDialogPanel(window.dataFromServer[0]);
    window.renderPin(window.dataFromServer);
  }, window.showErrorMessage);
})();
