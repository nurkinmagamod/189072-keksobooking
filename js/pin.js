'use strict';

(function () {
  var PIN_CONTAINER_WIDTH = 56;
  var PIN_CONTAINER_HEIGHT = 75;
  var PIN_IMAGE_WIDTH = 40;
  var PIN_IMAGE_HEIGHT = 40;

  var selectedTd;
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');

  window.pin = {

    KEY_CODES: {
      ESC: 27,
      ENTER: 13
    },
    MAIN_PIN_HIEGHT: 94,
    MAIN_PIN_WIDTH: 74,

    highlight: function (node) {
      if (selectedTd) {
        selectedTd.classList.remove('pin--active');
      }
      if (!node) {
        return;
      }
      selectedTd = node;
      selectedTd.classList.add('pin--active');
    },

    renderPins: function (pinsContents) {
      var pinMapElement = document.querySelector('.tokyo__pin-map');
      var fragment = document.createDocumentFragment();

      pinMapElement.addEventListener('click', pinClickHandler);
      pinMapElement.addEventListener('keydown', pinKeyDownHandler);

      for (var i = 0; i < pinsContents.length; i++) {
        var currentObjToRend = pinsContents[i];
        var pinWrapper = document.createElement('div');
        var pinImage = document.createElement('img');

        pinWrapper.className = 'pin';
        pinImage.setAttribute('tabindex', 0);
        pinWrapper.setAttribute('data-item', i);
        pinWrapper.style.left = currentObjToRend.location.x - PIN_CONTAINER_WIDTH / 2 + 'px';
        pinWrapper.style.top = currentObjToRend.location.y - PIN_CONTAINER_HEIGHT + 'px';
        pinImage.className = 'rounded';
        pinImage.setAttribute('width', PIN_IMAGE_WIDTH);
        pinImage.setAttribute('src', pinsContents[i].author.avatar);
        pinImage.setAttribute('height', PIN_IMAGE_HEIGHT);
        pinWrapper.appendChild(pinImage);
        fragment.appendChild(pinWrapper);
        if (i === 0) {
          window.pin.highlight(pinWrapper);
        }
      }
      pinMapElement.appendChild(fragment);
    },
    removePins: function () {
      var pins = nearbyAdsList.querySelectorAll('.pin');
      pins.forEach(function (elem) {
        if (!elem.classList.contains('pin__main')) {
          elem.remove();
        }
      });
    }
  };

  function pinKeyDownHandler(evt) {
    if (evt.keyCode === window.pin.KEY_CODES.ENTER) {
      window.showCard.showOfferCard(window.filter.getFilteredOffers(), evt);
      window.pin.highlight(evt.target.parentNode);
      document.addEventListener('keydown', window.showCard.dialogCloseKeyDownHandler);
    }
  }

  function addKeyDownListner() {
    document.addEventListener('keydown', window.showCard.dialogCloseKeyDownHandler);
  }

  function pinClickHandler(evt) {
    if (evt.target.classList.contains('pin__main') || evt.target.parentNode.classList.contains('pin__main')) {
      return;
    }
    var pinMap = evt.target.tagName === 'DIV' ? evt.target : evt.target.parentNode;
    window.pin.highlight(pinMap);
    window.showCard.showOfferCard(window.filter.getFilteredOffers(), evt);
    addKeyDownListner();
  }
})();
