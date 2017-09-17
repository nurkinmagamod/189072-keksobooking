'use strict';

(function () {
  window.synchronizeFields = {
    syncFields: function (syncSource, syncTarget, sourceOptions, targetOptions, syncFn) {
      var sync = function () {
        var selectedValue = syncSource.value;
        var selectedOptionIdx = sourceOptions.indexOf(selectedValue);
        if (selectedOptionIdx > -1 && targetOptions.length - 1 >= selectedOptionIdx) {
          var targetValue = targetOptions[selectedOptionIdx];
          syncFn(syncTarget, targetValue);
        }
      };

      sync();
      syncSource.addEventListener('change', sync);

      return function () {
        syncSource.removeEventListener('change', sync);
      };
    }
  };
})();
