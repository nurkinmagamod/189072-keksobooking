'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  window.debounce = function (func) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout !== null) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
    };
  };

})();
