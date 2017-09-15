'use strict';
(function () {
  window.showCard = function (elem, evt) {
    if (evt.target.classList.contains('pin__main') || evt.target.parentNode.classList.contains('pin__main')) {
      return;
    }
    var pinDataID = !evt.target.parentNode.hasAttribute('data-item') ? evt.target.getAttribute('data-item') : evt.target.parentNode.getAttribute('data-item');
    window.renderDialogPanel(elem[pinDataID]);
  };
})();
