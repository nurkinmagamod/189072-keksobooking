'use strict';
(function () {

  var RUSSIAN_APARTMENT_TYPES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var offerDialog = document.getElementById('offer-dialog');

  window.renderDialogPanel = function (lodgeData) {
    var replaceElem = offerDialog.querySelector('.dialog__panel');
    var dialogPanelTemplate = document.getElementById('lodge-template').content;
    var dialogPanelElement = dialogPanelTemplate.cloneNode(true);
    var lodgeElement = dialogPanelElement.querySelector('.dialog__panel');
    var dialogPanelFeatures = dialogPanelElement.querySelector('.lodge__features');
    var dialogTitle = document.querySelector('.dialog__title');
    var avatarIMG = dialogTitle.querySelector('img');
    var apartmentTypeText = RUSSIAN_APARTMENT_TYPES[lodgeData.offer.type];
    var features = lodgeData.offer.features;

    lodgeElement.querySelector('.lodge__title').textContent = lodgeData.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = lodgeData.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = lodgeData.offer.price + ' ₽/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = apartmentTypeText;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + lodgeData.offer.guests + ' гостей в ' + lodgeData.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodgeData.offer.checkin + ', выезд до ' + lodgeData.offer.checkout;
    lodgeElement.querySelector('.lodge__description').textContent = lodgeData.offer.description;

    avatarIMG.setAttribute('src', lodgeData.author.avatar);
    for (var i = 0; i < features.length; i++) {
      var newSpan = document.createElement('span');
      newSpan.className = 'feature__image feature__image--' + features[i];
      dialogPanelFeatures.appendChild(newSpan);
    }
    offerDialog.replaceChild(dialogPanelElement, replaceElem);
  };

})();
