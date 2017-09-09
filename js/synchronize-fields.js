'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, fieldValues1, field2Values, syncValues) {
    var indexValue = fieldValues1.indexOf(field1.value);

    syncValues(field2, field2Values[indexValue]);
  };
})();
