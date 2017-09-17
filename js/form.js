'use strict';

(function () {
  var ERROR_OUTLINE = '2px solid red';
  var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
  var APARTMENT_TYPE_VALUES = ['bungalo', 'flat', 'house', 'palace'];
  var APARTMENT_COST_MIN_VALUES = ['0', '1000', '5000', '10000'];
  var ROOM_NUMBER_VALUES = ['1', '2', '3', '100'];
  var ROOM_CAPACITIES = [['1'], ['2', '1'], ['3', '2', '1'], ['0']];

  var formBindings = [];
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var apartmentTypeSelect = document.getElementById('type');
  var priceFormElement = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var capacityFormElement = document.getElementById('capacity');
  var titleField = document.getElementById('title');
  var priceField = document.getElementById('price');
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
        option.selected = optionValueIdx === 0;
      } else {
        option.disabled = true;
      }
    });
  };

  function setInvalid(input, message) {
    input.style.border = ERROR_OUTLINE;
    input.setCustomValidity(message);
  }

  function clearInvalid(input) {
    input.style.border = '';
    input.setCustomValidity('');
  }

  var validateTitle = function () {
    var titleValidity = titleField.validity;
    var customValidity;
    if (titleValidity.valueMissing) {
      customValidity = 'Это поле обязательно для заполнения !';
    } else if (titleValidity.tooLong) {
      customValidity = 'Название должно быть не длиннее' + titleField.maxLength + ' символов';
    } else if (titleValidity.tooShort) {
      customValidity = 'Названиe не должно быть короче ' + titleField.minLength + ' символов';
    }

    if (customValidity) {
      setInvalid(titleField, customValidity);
    } else {
      clearInvalid(titleField);
    }
  };

  var validatePrice = function () {
    var priceValidity = priceField.validity;
    var customValidity;
    if (priceValidity.valueMissing) {
      customValidity = 'Это поле обязательно для заполнения !';
    } else if (priceValidity.rangeOverflow) {
      customValidity = 'Цена не должна быть больше ' + priceField.max;
    } else if (priceValidity.rangeUnderflow) {
      customValidity = 'Цена не должна быть меньше ' + priceField.min;
    }

    if (customValidity) {
      setInvalid(priceField, customValidity);
    } else {
      clearInvalid(priceField);
    }
  };

  var isAddressValid = function () {
    return !!addressFieldElement.value;
  };

  var validateAddress = function () {
    var isValid = isAddressValid();
    if (isAddressValid()) {
      clearInvalid(addressFieldElement);
    } else {
      setInvalid(addressFieldElement, 'Укажите адрес!');
      window.map.showMessage('red', 'Укажите адрес, перетащив маркер на карте');
    }
    return isValid;
  };

  window.form = {
    changeAddressField: function (addressX, addressY) {
      clearInvalid(addressFieldElement);
      addressFieldElement.value = 'x: ' + addressX + ' y: ' + addressY;
    }
  };

  titleField.addEventListener('input', validateTitle);
  titleField.addEventListener('invalid', validateTitle);
  priceField.addEventListener('input', validatePrice);
  priceField.addEventListener('invalid', validatePrice);

  function initForm() {
    [
      window.synchronizeFields.syncFields(timeIn, timeOut, TIME_IN_OUT, TIME_IN_OUT, syncValues),
      window.synchronizeFields.syncFields(timeOut, timeIn, TIME_IN_OUT, TIME_IN_OUT, syncValues),
      window.synchronizeFields.syncFields(apartmentTypeSelect, priceFormElement, APARTMENT_TYPE_VALUES, APARTMENT_COST_MIN_VALUES, syncValueWithMin),
      window.synchronizeFields.syncFields(roomNumber, capacityFormElement, ROOM_NUMBER_VALUES, ROOM_CAPACITIES, syncValueWithOptions)
    ].forEach(function (bindingDestructor) {
      formBindings.push(bindingDestructor);
    });
  }

  function clearFormBindings() {
    while (formBindings.length > 0) {
      var bindingDestructor = formBindings.shift();
      bindingDestructor();
    }
  }

  function onSubmitSuccess() {
    window.map.showMessage('green', 'Данные успешно сохранены');
    noticeForm.reset();
    clearFormBindings();
    initForm();
  }

  function onSubmitError() {
    window.map.showMessage('red', 'Произошла ошибка при отправке формы');
  }

  initForm();

  noticeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var isFormInvalid = [
      titleField.checkValidity(),
      priceField.checkValidity(),
      validateAddress()
    ].some(function (isFiledValid) {
      return !isFiledValid;
    });

    if (isFormInvalid) {
      return;
    }

    window.backend.save(
        new FormData(noticeForm),
        onSubmitSuccess,
        onSubmitError
    );
  });
})();
