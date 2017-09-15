'use strict';

(function () {
  var filteredData;
  var loadedOffers = [];
  var filters = document.querySelectorAll('.tokyo__filter');
  var filtersForm = document.querySelector('.tokyo__filters');
  var housingType = filtersForm.querySelector('#housing_type');
  var housingPrice = filtersForm.querySelector('#housing_price');
  var allFeatures = filtersForm.querySelectorAll('.feature input');
  var housingGuestsNumber = filtersForm.querySelector('#housing_guests-number');
  var housingRoomCapacity = filtersForm.querySelector('#housing_room-number');

  var filterOffersByType = function (elem) {
    if (housingType.value === 'any') {
      return loadedOffers;
    } else {
      return elem.offer.type === housingType.value;
    }
  };

  var filterOffersByPrice = function (elem) {
    switch (housingPrice.value) {
      case 'any':
        return loadedOffers;
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
      return loadedOffers;
    } else {
      return elem.offer.rooms === parseInt(housingRoomCapacity.value, 10);
    }
  };

  var filterOffersByGuestsNumber = function (elem) {
    if (housingGuestsNumber.value === 'any') {
      return loadedOffers;
    } else {
      return elem.offer.guests === parseInt(housingGuestsNumber.value, 10);
    }
  };

  var filterByFeatures = function (elem) {
    var alredyCheckedElements = filtersForm.querySelectorAll('.feature input[type="checkbox"]:checked');
    var checkedFeatures = [].map.call(alredyCheckedElements, function (checkbox) {
      return checkbox.value;
    });
    return checkedFeatures.every(function (feature) {
      return elem.offer.features.indexOf(feature) > -1;
    });
  };

  var filteringMethods = [filterOffersByType, filterOffersByRoomCapacity, filterOffersByPrice, filterOffersByGuestsNumber, filterByFeatures];

  window.setServerData = function (serverData) {
    loadedOffers = serverData;
    updateAfterFiltering();
  };
  window.getFilteredData = function () {
    return filteredData;
  };

  var updateAfterFiltering = function () {
    var newFilteredData = loadedOffers.filter(function (elem) {
      for (var i = 0; i < filteringMethods.length; i++) {
        var filterFn = filteringMethods[i];
        if (!filterFn(elem)) {
          return false;
        }
      }
      return true;
    });

    filteredData = !filteredData ? newFilteredData.slice(0, 3) : newFilteredData;

    window.removePins();
    window.renderPins(filteredData);
    if (typeof filteredData[0] === 'undefined') {
      return;
    }
    window.renderDialogPanel(filteredData[0]);
  };

  var updateFuncWithDebounce = window.debounce(updateAfterFiltering);

  filters.forEach(function (elem) {
    elem.addEventListener('change', updateFuncWithDebounce);
  });
  allFeatures.forEach(function (elem) {
    elem.addEventListener('change', updateFuncWithDebounce);
  });

})();
