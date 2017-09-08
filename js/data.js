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

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_NUMBER_OF_ROOMS = 1;
  var MAX_NUMBER_OF_ROOMS = 5;
  var MIN_NUMBER_OF_GUESTS = 1;
  var MAX_NUMBER_OF_GUESTS = 5;

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

  window.createRandomOffers = function () {
    var objects = [];

    for (var i = 0; i < OFFER_TITLES.length; i++) {
      var locationX = randomInteger(window.MIN_X_LOCATION, window.MAX_X_LOCATION);
      var locationY = randomInteger(window.MIN_Y_LOCATION, window.MAX_Y_LOCATION);
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
  };
})();
