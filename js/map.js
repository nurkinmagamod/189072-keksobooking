'use strict';

(function () {
  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES_OF_APARTMENTS = [
    'flat',
    'house',
    'bungalo'
  ];
  var CHECK_IN_OUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var APARTMENT_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var RUSSIAN_APARTMENT_TYPES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var PIN_CONTAINER_WIDTH = 56;
  var PIN_CONTAINER_HEIGHT = 75;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_NUMBER_OF_ROOMS = 1;
  var MAX_NUMBER_OF_ROOMS = 5;
  var MIN_NUMBER_OF_GUESTS = 1;
  var MAX_NUMBER_OF_GUESTS = 5;
  var MIN_X_LOCATION = 300;
  var MAX_X_LOCATION = 900;
  var MIN_Y_LOCATION = 100;
  var MAX_Y_LOCATION = 500;
  var PIN_IMAGE_WIDTH = 40;
  var PIN_IMAGE_HEIGHT = 40;

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  function getRandomItem(list) {
    return list[Math.floor(Math.random() * (list.length))];
  }

  function randomLengthArrayInit(arr) {
    return arr.slice(0, randomInteger(1, APARTMENT_FEATURES.length));
  }

  function createRandomOffers() {
    var objects = [];

    for (var i = 0; i < OFFER_TITLES.length; i++) {
      var locationX = randomInteger(MIN_X_LOCATION, MAX_X_LOCATION) - PIN_CONTAINER_WIDTH / 2;
      var locationY = randomInteger(MIN_Y_LOCATION, MAX_Y_LOCATION) - PIN_CONTAINER_HEIGHT;
      objects.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: OFFER_TITLES[i],
          address: locationX + ',' + ' ' + locationY,
          price: randomInteger(MIN_PRICE, MAX_PRICE),
          type: getRandomItem(TYPES_OF_APARTMENTS),
          rooms: randomInteger(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
          guests: randomInteger(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
          checkin: getRandomItem(CHECK_IN_OUT_TIMES),
          checkout: getRandomItem(CHECK_IN_OUT_TIMES),
          features: randomLengthArrayInit(APARTMENT_FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }
    return objects;
  }

  function renderPin(objToRend) {
    var pinMapElement = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < objToRend.length; i++) {
      var currentObjToRend = objToRend[i];
      var pinWrapper = document.createElement('div');
      var pinImage = document.createElement('img');
      pinWrapper.className = 'pin';
      pinWrapper.style.left = currentObjToRend.location.x + 'px';
      pinWrapper.style.top = currentObjToRend.location.y + 'px';
      pinImage.className = 'rounded';
      pinImage.setAttribute('width', PIN_IMAGE_WIDTH);
      pinImage.setAttribute('src', objToRend[i].author.avatar);
      pinImage.setAttribute('height', PIN_IMAGE_HEIGHT);
      pinWrapper.appendChild(pinImage);
      fragment.appendChild(pinWrapper);
    }
    pinMapElement.appendChild(fragment);
  }

  function renderDialogPanel(objsArray) {
    var offerDialog = document.getElementById('offer-dialog');
    var replaceEr = offerDialog.querySelector('.dialog__panel');
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
    offerDialog.replaceChild(dialogPanelElement, replaceEr);
  }

  var offers = createRandomOffers();
  renderPin(offers);
  renderDialogPanel(offers[0]);
})();
