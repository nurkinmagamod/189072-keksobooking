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
  var KEY_CODES = {
    ESC: 27,
    ENTER: 13
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
  var ERROR_OUTLINE = '2px solid red';
  var selectedTd;

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

  function highlight(node) {
    if (selectedTd) {
      selectedTd.classList.remove('pin--active');
    }
    selectedTd = node;
    selectedTd.classList.add('pin--active');
  }

  function showDialog() {
    offerDialog.classList.remove('hidden');
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

  function pinKeyDownHandler(evt) {
    var pinDataID = event.target.parentNode.getAttribute('data-item');

    if (evt.keyCode === KEY_CODES.ENTER) {
      renderDialogPanel(offers[pinDataID]);
      showDialog();
      highlight(evt.target.parentNode);
      document.addEventListener('keydown', dialogCloseKeyDownHandler);
    }
  }

  function dialogCloseAction() {
    offerDialog.classList.add('hidden');
    selectedTd.classList.remove('pin--active');
    document.removeEventListener('keydown', dialogCloseKeyDownHandler);
  }

  function dialogCloseClickHandler() {
    dialogCloseAction();
  }

  function dialogCloseKeyDownHandler(evt) {
    if (evt.keyCode === KEY_CODES.ESC) {
      dialogCloseAction();
    }
  }

  function renderPin(objToRend) {
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
  }

  function renderDialogPanel(objsArray) {
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
  }

  var offerDialog = document.getElementById('offer-dialog');
  var dialogCloseElement = document.querySelector('.dialog__close');
  var offers = createRandomOffers();

  renderPin(offers);
  renderDialogPanel(offers[0]);

  dialogCloseElement.addEventListener('click', dialogCloseClickHandler);

  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var apartmentTypeSelect = document.getElementById('type');
  var priceFormElement = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var capacityFormElement = document.getElementById('capacity');
  var addressField = document.querySelector('#address');
  var titleField = document.querySelector('#title');
  var priceField = document.querySelector('#price');
  var capacityOptionElements = capacityFormElement.querySelectorAll('option');
  var noticeForm = document.querySelector('.notice__form');
  var formSubmit = document.querySelector('.form__submit');

  function setApartmentMinValue(apartment) {
    switch (apartment.value) {
      case 'bungalo':
        priceFormElement.min = '0';
        break;
      case 'house':
        priceFormElement.min = '5000';
        break;
      case 'flat':
        priceFormElement.min = '1000';
        break;
      case 'palace':
        priceFormElement.min = '10000';
        break;
    }
  }

  function timeSwitch(time, time2) {
    switch (time['value']) {
      case '12:00':
        time2['value'] = '12:00';
        break;
      case '13:00':
        time2['value'] = '13:00';
        break;
      case '14:00':
        time2['value'] = '14:00';
        break;
    }
  }

  function roomCapacitySetter() {
    capacityOptionElements[0].disabled = false;
    capacityOptionElements[1].disabled = false;
    capacityOptionElements[2].disabled = false;
    capacityOptionElements[3].disabled = false;
    switch (roomNumber.value) {
      case '3':
        capacityFormElement.value = '3';
        capacityOptionElements[3].disabled = true;
        break;
      case '2':
        capacityFormElement.value = '2';
        capacityOptionElements[3].disabled = true;
        capacityOptionElements[0].disabled = true;
        break;
      case '1':
        capacityFormElement.value = '1';
        capacityOptionElements[3].disabled = true;
        capacityOptionElements[1].disabled = true;
        capacityOptionElements[0].disabled = true;
        break;
      case '100':
        capacityOptionElements[0].disabled = true;
        capacityOptionElements[1].disabled = true;
        capacityOptionElements[2].disabled = true;
        capacityFormElement.value = '0';
        break;
    }
  }
  function validationChecking(field) {
    var currentField = field;
    if (!currentField.validity.valid) {
      currentField.style.boxShadow = ERROR_OUTLINE;
      if (currentField.validity.valueMissing) {
        currentField.setCustomValidity('Обязательное поле!');
      } else if (currentField.validity.tooShort || currentField.value.length < currentField.minLength) {
        currentField.setCustomValidity('В названии должно быть не менее ' + currentField.minLength + ' символов');
      } else if (currentField.validity.tooLong) {
        currentField.setCustomValidity('Название должно содержать не более ' + currentField.maxLength + ' символов');
      } else if (currentField.validity.rangeUnderflow) {
        currentField.setCustomValidity('Минимальное значение поля ' + currentField.min + ' максимально значение ' + currentField.max);
      } else {
        currentField.setCustomValidity('');
        currentField.style.boxShadow = '';
      }
    }
  }

  addressField.addEventListener('invalid', function () {
    validationChecking(addressField);
  });
  addressField.addEventListener('change', function () {
    validationChecking(addressField);
  });
  titleField.addEventListener('invalid', function () {
    validationChecking(titleField);
  });
  priceField.addEventListener('invalid', function () {
    validationChecking(priceField);
  });
  priceField.addEventListener('change', function () {
    validationChecking(priceField);
  });
  titleField.addEventListener('input', function () {
    validationChecking(titleField);
  });
  titleField.addEventListener('change', function () {
    validationChecking(titleField);
  });

  timeIn.addEventListener('change', function () {
    timeSwitch(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    timeSwitch(timeOut, timeIn);
  });

  apartmentTypeSelect.addEventListener('change', function () {
    setApartmentMinValue(apartmentTypeSelect);
  });

  roomNumber.addEventListener('change', roomCapacitySetter);

  formSubmit.addEventListener('click', function () {
    var formFields = noticeForm.elements;
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].style.boxShadow = '';
      if (!formFields[i].validity.valid) {
        formFields[i].style.border = ERROR_OUTLINE;
        return;
      }
    }
    noticeForm.submit();
  });

  noticeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    noticeForm.reset();
  });

})();
