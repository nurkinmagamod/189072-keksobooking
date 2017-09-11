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
  var selectedTd;

  window.highlight = function (node) {
    if (selectedTd) {
      selectedTd.classList.remove('pin--active');
    }
    selectedTd = node;
    selectedTd.classList.add('pin--active');
  };

  window.renderPin = function (objToRend) {
    var pinMapElement = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    pinMapElement.addEventListener('click', pinClickHandler);
    pinMapElement.addEventListener('keydown', pinKeyDownHandler);

    for (var i = 0; i < objToRend.length; i++) {
      var currentObjToRend = objToRend[i];
      var pinWrapper = document.createElement('div');
      var pinImage = document.createElement('img');

      pinWrapper.className = 'pin';
      pinImage.setAttribute('tabindex', 0);
      pinWrapper.setAttribute('data-item', i);
      pinWrapper.style.left = currentObjToRend.location.x - window.PIN_CONTAINER_WIDTH / 2 + 'px';
      pinWrapper.style.top = currentObjToRend.location.y - window.PIN_CONTAINER_HEIGHT + 'px';
      pinImage.className = 'rounded';
      pinImage.setAttribute('width', PIN_IMAGE_WIDTH);
      pinImage.setAttribute('src', objToRend[i].author.avatar);
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
      window.showCard(window.offers);
      window.showDialog();
      window.highlight(evt.target.parentNode);
      document.addEventListener('keydown', window.dialogCloseKeyDownHandler);
    }
  }

  function addKeyDownListner() {
    document.addEventListener('keydown', window.dialogCloseKeyDownHandler);
  }

  function pinClickHandler(evt) {
    var pinMap = evt.target.tagName === 'DIV' ? evt.target : evt.target.parentNode;
    window.highlight(pinMap);
    window.showCard(window.dataFromServer);
    addKeyDownListner();
    window.showDialog();
  }

})();
