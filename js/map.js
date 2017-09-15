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

  window.showMessage = function (bgColor, errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 999;
    node.style.backgroundColor = bgColor;
    node.style.textAlign = 'center';
    node.style.width = 100 + '%';
    node.style.margin = '0 auto';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, 3000);
  };

  function onDataLoadError(msg) {
    window.showMessage('red', msg);
  }

  window.backend.load(window.setOffers, onDataLoadError);
})();
