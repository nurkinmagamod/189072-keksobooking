'use strict';
(function () {
  var PIN_IMAGE_WIDTH = 40;
  var PIN_IMAGE_HEIGHT = 40;
  var KEY_CODES = {
    ESC: 27,
    ENTER: 13
  };
  var selectedTd;

  function highlight(node) {
    if (selectedTd) {
      selectedTd.classList.remove('pin--active');
    }
    selectedTd = node;
    selectedTd.classList.add('pin--active');
  }

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
      pinWrapper.style.left = currentObjToRend.location.x + 'px';
      pinWrapper.style.top = currentObjToRend.location.y + 'px';
      pinImage.className = 'rounded';
      pinImage.setAttribute('width', PIN_IMAGE_WIDTH);
      pinImage.setAttribute('src', objToRend[i].author.avatar);
      pinImage.setAttribute('height', PIN_IMAGE_HEIGHT);
      pinWrapper.appendChild(pinImage);
      fragment.appendChild(pinWrapper);
      if (i === 0) {
        highlight(pinWrapper);
      }
    }
    pinMapElement.appendChild(fragment);
  };

  function pinKeyDownHandler(evt) {
    var pinDataID = event.target.parentNode.getAttribute('data-item');

    if (evt.keyCode === KEY_CODES.ENTER) {
      renderDialogPanel(offers[pinDataID]);
      showDialog();
      highlight(evt.target.parentNode);
      document.addEventListener('keydown', dialogCloseKeyDownHandler);
    }
  }

  function addKeyDownListner() {
    document.addEventListener('keydown', dialogCloseKeyDownHandler);
  }

  function pinClickHandler(evt) {
    var pinMap = evt.target.tagName === 'DIV' ? evt.target : evt.target.parentNode;
    var pinDataID = pinMap.getAttribute('data-item');

    highlight(pinMap);
    renderDialogPanel(offers[pinDataID]);
    addKeyDownListner();
    showDialog();
  }


})();
