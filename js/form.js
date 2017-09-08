'use strict';

(function () {
  var ERROR_OUTLINE = '2px solid red';

  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var apartmentTypeSelect = document.getElementById('type');
  var priceFormElement = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var capacityFormElement = document.getElementById('capacity');
  var addressField = document.querySelector('#address');
  var titleField = document.querySelector('#title');
  var priceField = document.querySelector('#price');
  var noticeForm = document.querySelector('.notice__form');
  var formSubmit = document.querySelector('.form__submit');
  var addressFieldElement = document.getElementById('address');

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
    time2.value = time.value;
  }

  function syncOptions() {
    var roomsNumberOption = parseInt(roomNumber.value, 10);

    for (var i = 0; i < capacityFormElement.children.length; i++) {
      var option = capacityFormElement.children[i];
      var guestNumberOption = parseInt(option.value, 10);

      var isDisabled = false;
      var isSelected = false;
      if (roomsNumberOption < 100) {
        isDisabled = guestNumberOption > roomsNumberOption || guestNumberOption === 0;
        isSelected = guestNumberOption === roomsNumberOption;
      } else {
        isDisabled = guestNumberOption !== 0;
        isSelected = !isDisabled;
      }
      if (isDisabled) {
        option.setAttribute('disabled', '');
      } else {
        option.removeAttribute('disabled');
      }
      if (isSelected) {
        option.setAttribute('selected', isSelected);
      }
    }
  }

  function setInvalidField(input, massage) {
    if (!input.validity.valid) {
      input.style.border = ERROR_OUTLINE;
      input.setCustomValidity(massage);
    }
  }

  function clearInvalid(input) {
    input.setCustomValidity('');
    input.style.border = '';
  }

  function validateValuePresence(input) {
    if (input.validity.valueMissing) {
      setInvalidField(input, 'Это поле обязательно для заполнения !');
    } else {
      clearInvalid(input);
    }
  }

  function validateTextLength(input) {
    if (input.validity.tooLong) {
      setInvalidField(input, 'Название должно содержать не более' + input.maxLength + ' символов');
    } else if (input.validity.tooShort || input.value.length < input.minLength) {
      setInvalidField(input, 'В названии должно быть не менее ' + input.minLength + ' символов');
    } else {
      clearInvalid(input);
    }
  }

  function validateNumber(input) {
    if (input.validity.rangeUnderflow) {
      setInvalidField(input, 'Минимальное значение поля ' + input.min + ' максимально значение ' + input.max);
    } else {
      clearInvalid(input);
    }
  }

  window.changeAddressField = function (elem) {
    addressFieldElement.value = 'x: ' + (elem.offsetLeft + window.MAIN_PIN_WIDHT / 2) + ' y: ' + (elem.offsetTop + window.MAIN_PIN_HIEGHT);
  };

  addressField.addEventListener('invalid', function () {
    validateValuePresence(addressField);
  });
  titleField.addEventListener('input', function () {
    validateTextLength(titleField);
  });
  titleField.addEventListener('invalid', function () {
    validateTextLength(titleField);
  });
  priceField.addEventListener('invalid', function () {
    validateNumber(priceField);
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
  priceFormElement.addEventListener('input', function () {
    setApartmentMinValue(apartmentTypeSelect);
  });
  roomNumber.addEventListener('change', syncOptions);

  formSubmit.addEventListener('click', function () {
    var formFields = noticeForm.elements;
    for (var i = 0; i < formFields.length; i++) {
      var currentField = formFields[i];
      currentField.style.border = '';
      if (!currentField.validity.valid) {
        currentField.style.border = ERROR_OUTLINE;
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
