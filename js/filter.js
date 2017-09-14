'use strict';

(function () {

  var dataFromServer = [];
  var filters = document.querySelectorAll('.tokyo__filter');
  var filtersForm = document.querySelector('.tokyo__filters');
  var housingType = filtersForm.querySelector('#housing_type');
  var housingPrice = filtersForm.querySelector('#housing_price');
  var allFeatures = filtersForm.querySelectorAll('.feature input');

  var husingGuestsNumber = filtersForm.querySelector('#housing_guests-number');
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');
  var housingRoomCapacity = filtersForm.querySelector('#housing_room-number');

  function removePins() {
    var pins = nearbyAdsList.querySelectorAll('.pin');
    pins.forEach(function (elem) {
      if (!elem.classList.contains('pin__main')) {
        elem.remove();
      }
    });
  }

  var filterOffersByType = function (elem) {
    if (housingType.value === 'any') {
      return dataFromServer;
    } else {
      return elem.offer.type === housingType.value;
    }
  };

  var filterOffersByPrice = function (elem) {
    switch (housingPrice.value) {
      case 'any':
        return dataFromServer;
      case 'middle':
        return elem.offer.price >= 10000 && elem.offer.price <= 50000;
      case 'low':
        return elem.offer.price < 10000;
      case 'high':
        return elem.offer.price > 50000;
      default:
        return false;
    }
  };

  var filterOffersByRoomCapacity = function (elem) {
    if (housingRoomCapacity.value === 'any') {
      return dataFromServer;
    } else {
      return elem.offer.rooms === parseInt(housingRoomCapacity.value, 10);
    }
  };

  var filerOffersByGuestsNumber = function (elem) {
    if (husingGuestsNumber.value === 'any') {
      return dataFromServer;
    } else {
      return elem.offer.guests === parseInt(husingGuestsNumber.value, 10);
    }
  };

  var filtersByFeatures = function (elem) {
    var alredyCheckedElements = filtersForm.querySelectorAll('.feature input[type="checkbox"]:checked');
    var checkedFeatures = [].map.call(alredyCheckedElements, function (checkbox) {
      return checkbox.value;
    });
    return checkedFeatures.every(function (feature) {
      return elem.offer.features.indexOf(feature) > -1;
    });
  };

  var filteringMethodsArray = [filterOffersByType, filterOffersByRoomCapacity, filterOffersByPrice, filerOffersByGuestsNumber, filtersByFeatures];

  var updateAfterFiltering = function () {
    removePins();
    window.filteredData = filteringMethodsArray.reduce(function (initial, elem) {
      return initial.filter(elem);
    }, dataFromServer);
    window.renderPin(window.filteredData);
    window.renderDialogPanel(window.filteredData[0]);
  };

  filters.forEach(function (elem) {
    elem.addEventListener('change', window.debounce(updateAfterFiltering));
  });
  allFeatures.forEach(function (elem) {
    elem.addEventListener('change', window.debounce(updateAfterFiltering));
  });

  window.backend.load(function (data) {
    dataFromServer = data;
    window.filteredData = data;
  }, window.showErrorMessage);
})();
