'use strict';

(function () {
  var ERROR_OUTLINE = '2px solid red';
  var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
  var APARTMENT_TYPE_VALUES = ['bungalo', 'flat', 'house', 'palace'];
  var APARTMENT_COST_MIN_VALUES = ['0', '1000', '5000', '10000'];
  var ROOM_NUMBER_VALUES = ['1', '2', '3', '100'];
  var ROOM_CAPACITIES = [['1'], ['2', '1'], ['3', '2', '1'], ['0']];
  var DEFAULT_MIN_PRICE_VALUE = 1000;

  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var apartmentTypeSelect = document.getElementById('type');
  var priceFormElement = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var capacityFormElement = document.getElementById('capacity');
  var titleField = document.querySelector('#title');
  var priceField = document.querySelector('#price');
  var noticeForm = document.querySelector('.notice__form');
  var addressFieldElement = document.getElementById('address');

  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  var syncValueWithOptions = function (element, enabledOptions) {
    var options = [].slice.call(element.querySelectorAll('option'));
    options.forEach(function (option) {
      var optionValueIdx = enabledOptions.indexOf(option.value);
      if (optionValueIdx > -1) {
        option.disabled = false;
        if (optionValueIdx === 0) {
          option.selected = true;
        }
      } else {
        option.disabled = true;
      }
    });
  };

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
      setInvalidField(input, 'Минимальное значение поля ' + input.min + ' максимальное значение ' + input.max);
    } else {
      clearInvalid(input);
    }
  }

  window.changeAddressField = function (addressX, addressY) {
    addressFieldElement.style.border = '';
    addressFieldElement.value = 'x: ' + addressX + ' y: ' + addressY;
  };

  addressFieldElement.addEventListener('submit', function () {
    validateValuePresence(addressFieldElement);
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

  window.synchronizeFields(timeIn, timeOut, TIME_IN_OUT, TIME_IN_OUT, syncValues);
  window.synchronizeFields(timeOut, timeIn, TIME_IN_OUT, TIME_IN_OUT, syncValues);
  window.synchronizeFields(apartmentTypeSelect, priceFormElement, APARTMENT_TYPE_VALUES, APARTMENT_COST_MIN_VALUES, syncValueWithMin);
  window.synchronizeFields(roomNumber, capacityFormElement, ROOM_NUMBER_VALUES, ROOM_CAPACITIES, syncValueWithOptions);
  function setDefaultMinValue(defaultMinPriceValue) {
    priceField.min = defaultMinPriceValue;
  }
  function onSubmitSuccess() {
    window.showMessage('green', 'Данные успешно сохранены');
    setDefaultMinValue(DEFAULT_MIN_PRICE_VALUE);
    noticeForm.reset();
  }
  function onSubmitError(msg) {
    window.showMessage('red', msg);
  }

  noticeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!addressFieldElement.value) {
      addressFieldElement.style.border = ERROR_OUTLINE;
      return;
    }

    window.backend.save(
        new FormData(noticeForm),
        onSubmitSuccess,
        onSubmitError);
  });
})();
