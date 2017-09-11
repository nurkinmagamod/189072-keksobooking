'use strict';
(function () {
  window.showCard = function (elem) {
    var pinDataID = event.target.parentNode.getAttribute('data-item');
    window.renderDialogPanel(elem[pinDataID]);
  };
})();
