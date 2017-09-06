'use strict';
(function () {
  var offerDialog = document.getElementById('offer-dialog');

  var RUSSIAN_APARTMENT_TYPES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.renderDialogPanel = function (objsArray) {
    var replaceElem = offerDialog.querySelector('.dialog__panel');
    var dialogPanelTemplate = document.getElementById('lodge-template').content;
    var dialogPanelElement = dialogPanelTemplate.cloneNode(true);
    var lodgeElement = dialogPanelElement.querySelector('.dialog__panel');
    var dialogPanelFeatures = dialogPanelElement.querySelector('.lodge__features');
    var dialogTitle = document.querySelector('.dialog__title');
    var avatarIMG = dialogTitle.querySelector('img');
    var apartmentTypeText = RUSSIAN_APARTMENT_TYPES[objsArray.offer.type];
    var features = objsArray.offer.features;

    lodgeElement.querySelector('.lodge__title').textContent = objsArray.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = objsArray.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = objsArray.offer.price + ' ₽/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = apartmentTypeText;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + objsArray.offer.guests + ' гостей в ' + objsArray.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + objsArray.offer.checkin + ', выезд до ' + objsArray.offer.checkout;
    lodgeElement.querySelector('.lodge__description').textContent = objsArray.offer.description;

    avatarIMG.setAttribute('src', objsArray.author.avatar);
    for (var i = 0; i < features.length; i++) {
      var newSpan = document.createElement('span');
      newSpan.className = 'feature__image feature__image--' + features[i];
      dialogPanelFeatures.appendChild(newSpan);
    }
    offerDialog.replaceChild(dialogPanelElement, replaceElem);
  };

})();
