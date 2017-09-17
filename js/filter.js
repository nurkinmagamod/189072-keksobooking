'use strict';

(function () {
  var filteredOffers;
  var loadedOffers = [];
  var filters = document.querySelectorAll('.tokyo__filter');
  var filtersForm = document.querySelector('.tokyo__filters');
  var housingType = document.getElementById('housing_type');
  var housingPrice = document.getElementById('housing_price');
  var allFeatures = filtersForm.querySelectorAll('.feature input');
  var housingGuestsNumber = document.getElementById('housing_guests-number');
  var housingRoomCapacity = document.getElementById('housing_room-number');

  var filterOffersByType = function (elem) {
    return housingType.value === 'any' ? loadedOffers : elem.offer.type === housingType.value;
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
    return housingRoomCapacity.value === 'any' ? loadedOffers : elem.offer.rooms === parseInt(housingRoomCapacity.value, 10);
  };

  var filterOffersByGuestsNumber = function (elem) {
    return housingGuestsNumber.value === 'any' ? loadedOffers : elem.offer.guests === parseInt(housingGuestsNumber.value, 10);
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

  window.filter = {
    setOffers: function (offers) {
      loadedOffers = offers;
      updateAfterFiltering();
    },
    getFilteredOffers: function () {
      return filteredOffers;
    }
  };

  var updateAfterFiltering = function () {
    var newFilteredOffers = loadedOffers.filter(function (elem) {
      for (var i = 0; i < filteringMethods.length; i++) {
        var filterFn = filteringMethods[i];
        if (!filterFn(elem)) {
          return false;
        }
      }
      return true;
    });

    filteredOffers = !filteredOffers ? newFilteredOffers.slice(0, 3) : newFilteredOffers;

    window.pin.removePins();
    window.pin.renderPins(filteredOffers);
    if (typeof filteredOffers[0] === 'undefined') {
      return;
    }
    window.card.renderDialogPanel(filteredOffers[0]);
  };

  var updateFuncWithDebounce = window.debounce.funcDebounce(updateAfterFiltering);

  filters.forEach(function (elem) {
    elem.addEventListener('change', updateFuncWithDebounce);
  });

  allFeatures.forEach(function (elem) {
    elem.addEventListener('change', updateFuncWithDebounce);
  });
})();
