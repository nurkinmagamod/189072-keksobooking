'use strict';
(function () {
  var PERSONS_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES_OF_APARTMENTS = ['flat', 'house', 'bungalo'];
  var TIME_ARRAY = ['12:00', '13:00', '14:00'];
  var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var NUMBER_OF_OBJ = 8;
  var PIN_CONTAINER_WIDTH = 56;
  var PIN_CONTAINER_HEIGHT = 75;
  var MIN_PRICE_VALUE = 1000;
  var MAX_PRICE_VALUE = 1000000;
  var MIN_NUMBER_OF_ROOMS = 1;
  var MAX_NUMBER_OF_ROOMS = 5;
  var MIN_NUMBER_OF_GUESTS = 1;
  var MAX_NUMBER_OF_GUESTS = 5;
  var MIN_X_LOCATION = 300;
  var MAX_X_LOCATION = 900;
  var MIN_Y_LOCATION = 100;
  var MAX_Y_LOCATION = 500;

  var sampleObj = objArrayInit(NUMBER_OF_OBJ);

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  function getRandomItem(list) {
    return list[Math.floor(Math.random() * (list.length))];
  }

  function randomLengthArrayInit(arr) {
    var arr2 = arr.slice(0, randomInteger(1, FEATURES_ARRAY.length));
    return arr2;
  }
  function objArrayInit(numberOfObjcts) {
    var objects = [];
    for (var i = 0; i < numberOfObjcts; i++) {
      objects[i] =
      {
        author: {
          avatar: PERSONS_AVATARS[i]
        },
        offer: {
          title: OFFER_TITLES[i],
          address: '',
          price: randomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
          type: getRandomItem(TYPES_OF_APARTMENTS),
          rooms: randomInteger(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
          guests: randomInteger(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
          checkin: getRandomItem(TIME_ARRAY),
          checkout: getRandomItem(TIME_ARRAY),
          features: randomLengthArrayInit(FEATURES_ARRAY),
          description: '',
          photos: []
        },
        location: {
          x: randomInteger(MIN_X_LOCATION, MAX_X_LOCATION),
          y: randomInteger(MIN_Y_LOCATION, MAX_Y_LOCATION)
        }
      };
      objects[i].offer.address = objects[i].location.x + ',' + ' ' + objects[i].location.y;
    }
    return objects;
  }


  function pinRender(objToRend, pinHeigh, pinWidth) {
    var map1 = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < objToRend.length; i++) {
      var elem = document.createElement('div');
      var elem2 = document.createElement('img');
      elem.className = 'pin';
      elem.style.left = objToRend[i].location.x - PIN_CONTAINER_WIDTH / 2 + 'px';
      elem.style.top = objToRend[i].location.y - PIN_CONTAINER_HEIGHT + 'px';
      elem2.className = 'rounded';
      elem2.setAttribute('width', pinWidth);
      elem2.setAttribute('src', objToRend[i].author.avatar);
      elem2.setAttribute('height', pinHeigh);
      elem.appendChild(elem2);
      fragment.appendChild(elem);
    }
    map1.appendChild(fragment);

  }
  pinRender(sampleObj, '40', '40');

  function findFlatType(typesOfApartment) {
    if (typesOfApartment.type === 'flat') {
      return 'Квартира';
    } else if (typesOfApartment.type === 'house') {
      return 'Дом';
    } else {
      return 'Бунгало';
    }
  }

  function renderDialogPanel(objsArray) {
    var offerDialog = document.querySelector('#offer-dialog');
    var replaceEr = offerDialog.querySelector('.dialog__panel');
    var dialogPanelTemplate = document.querySelector('#lodge-template').content;
    var dialogPanelElement = dialogPanelTemplate.cloneNode(true);
    var listEl = dialogPanelElement.querySelector('.dialog__panel');
    var dialogPanelFeatures = dialogPanelElement.querySelector('.lodge__features');
    var dialogTitle = document.querySelector('.dialog__title');
    var avatarIMG = dialogTitle.getElementsByTagName('img');

    listEl.querySelector('.lodge__title').textContent = objsArray[0].offer.title;
    listEl.querySelector('.lodge__address').textContent = objsArray[0].offer.address;
    listEl.querySelector('.lodge__price').textContent = objsArray[0].offer.price + ' ₽/ночь';
    listEl.querySelector('.lodge__type').textContent = findFlatType(objsArray[0].offer);
    listEl.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + objsArray[0].offer.guests + ' гостей в ' + objsArray[0].offer.rooms + ' комнатах';
    listEl.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + objsArray[0].offer.checkin + ', выезд до ' + objsArray[0].offer.checkout;
    listEl.querySelector('.lodge__description').textContent = objsArray[0].offer.description;

    avatarIMG[0].setAttribute('src', objsArray[0].author.avatar);
    for (var i = 0; i < objsArray[0].offer.features.length; i++) {
      var newSpan = document.createElement('span');
      newSpan.className = 'feature__image feature__image--' + objsArray[0].offer.features[i];
      dialogPanelFeatures.appendChild(newSpan);
    }
    offerDialog.replaceChild(dialogPanelElement, replaceEr);
  }
  renderDialogPanel(sampleObj);
})();
