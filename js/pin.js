'use strict';
(function () {
  window.PIN_CONTAINER_WIDTH = 56;
  window.PIN_CONTAINER_HEIGHT = 75;
  window.MAIN_PIN_HIEGHT = 94;
  window.MAIN_PIN_WIDTH = 74;
  var PIN_IMAGE_WIDTH = 40;
  var PIN_IMAGE_HEIGHT = 40;
  window.KEY_CODES = {
    ESC: 27,
    ENTER: 13
  };

  var pinElementsDestructors = [];
  var selectedTd;
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');

  window.highlight = function (node) {
    if (selectedTd) {
      selectedTd.classList.remove('pin--active');
    }
    if (!node) {
      return;
    }
    selectedTd = node;
    selectedTd.classList.add('pin--active');
  };

  window.renderPins = function (pinsContents) {
    var pinMapElement = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    pinMapElement.addEventListener('click', pinClickHandler);
    pinMapElement.addEventListener('keydown', pinKeyDownHandler);

    pinElementsDestructors.push(function () {
      pinMapElement.removeEventListener('click', pinClickHandler);
      pinMapElement.removeEventListener('keydown', pinKeyDownHandler);
    });

    for (var i = 0; i < pinsContents.length; i++) {
      var currentObjToRend = pinsContents[i];
      var pinWrapper = document.createElement('div');
      var pinImage = document.createElement('img');

      pinWrapper.className = 'pin';
      pinImage.setAttribute('tabindex', 0);
      pinWrapper.setAttribute('data-item', i);
      pinWrapper.style.left = currentObjToRend.location.x - window.PIN_CONTAINER_WIDTH / 2 + 'px';
      pinWrapper.style.top = currentObjToRend.location.y - window.PIN_CONTAINER_HEIGHT + 'px';
      pinImage.className = 'rounded';
      pinImage.setAttribute('width', PIN_IMAGE_WIDTH);
      pinImage.setAttribute('src', pinsContents[i].author.avatar);
      pinImage.setAttribute('height', PIN_IMAGE_HEIGHT);
      pinWrapper.appendChild(pinImage);
      fragment.appendChild(pinWrapper);
      if (i === 0) {
        window.highlight(pinWrapper);
      }
    }
    pinMapElement.appendChild(fragment);
  };

  function pinKeyDownHandler(evt) {
    if (evt.keyCode === window.KEY_CODES.ENTER) {
      window.showCard(window.getFilteredData(), evt);
      window.showDialog();
      window.highlight(evt.target.parentNode);
      document.addEventListener('keydown', window.dialogCloseKeyDownHandler);
    }
  }

  function addKeyDownListner() {
    document.addEventListener('keydown', window.dialogCloseKeyDownHandler);
  }

  function pinClickHandler(evt) {
    if (evt.target.classList.contains('pin__main') || evt.target.parentNode.classList.contains('pin__main')) {
      return;
    }
    var pinMap = evt.target.tagName === 'DIV' ? evt.target : evt.target.parentNode;
    window.highlight(pinMap);
    window.showCard(window.getFilteredData(), evt);
    addKeyDownListner();
    window.showDialog();
  }

  window.removePins = function () {
    var pins = nearbyAdsList.querySelectorAll('.pin');
    pins.forEach(function (elem) {
      if (!elem.classList.contains('pin__main')) {
        elem.remove();
      }
    });
    while (pinElementsDestructors.length > 0) {
      var destructor = pinElementsDestructors.shift();
      destructor();
    }
  };
})();
