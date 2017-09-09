'use strict';

(function () {
  var ERROR_OUTLINE = '2px solid red';
  var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
  var APARTMENT_TYPE_VALUES = ['bungalo', 'flat', 'house', 'palace'];
  var APARTMENT_COST_MIN_VALUES = ['0', '1000', '5000', '10000'];
  var ROOM_NUMBER_VALUES = ['100', '1', '2', '3'];
  var ROOM_CAPACITIES = [[0], [1], [1, 2], [1, 2, 3]];

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

  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  var syncValueWithOptions = function (element, list) {
    var optionsArr = [].slice.apply(element.querySelectorAll('option'));
    optionsArr.forEach(function (item, index) {
      if (list[0] === 0 && index === 3) {
        item.disabled = false;
        item.selected = true;
        return;
      }
      if (list[0] === 1 && index === 2) {
        item.disabled = false;
        item.selected = true;
        return;
      }
      if (list.length === 2 && (index === 2 || index === 1)) {
        item.disabled = false;
        item.selected = true;
        return;
      }
      if (list.length === 3 && (index === 0 || index === 1 || index === 2)) {
        item.disabled = false;
        item.selected = true;
        return;
      }
      item.disabled = true;
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
      setInvalidField(input, 'Минимальное значение поля ' + input.min + ' максимально значение ' + input.max);
    } else {
      clearInvalid(input);
    }
  }

  window.changeAddressField = function (addressX, addressY) {
    addressFieldElement.value = 'x: ' + addressX + ' y: ' + addressY;
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
    window.synchronizeFields(timeIn, timeOut, TIME_IN_OUT, TIME_IN_OUT, syncValues);
  });
  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, TIME_IN_OUT, TIME_IN_OUT, syncValues);
  });
  apartmentTypeSelect.addEventListener('change', function () {
    window.synchronizeFields(apartmentTypeSelect, priceFormElement, APARTMENT_TYPE_VALUES, APARTMENT_COST_MIN_VALUES, syncValueWithMin);
  });
  roomNumber.addEventListener('change', function () {
    window.synchronizeFields(roomNumber, capacityFormElement, ROOM_NUMBER_VALUES, ROOM_CAPACITIES, syncValueWithOptions);
  });

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
