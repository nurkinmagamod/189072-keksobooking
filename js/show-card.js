'use strict';

(function () {
  var dialogCloseElement = document.querySelector('.dialog__close');
  var offerDialog = document.getElementById('offer-dialog');

  window.showCard = {
    closeDialog: function () {
      offerDialog.classList.add('hidden');
      window.pin.highlight();
    },
    showDialog: function () {
      offerDialog.classList.remove('hidden');
    },
    dialogCloseKeyDownHandler: function (evt) {
      if (evt.keyCode === window.pin.KEY_CODES.ESC) {
        window.showCard.closeDialog();
      }
    },
    showOfferCard: function (elem, evt) {
      if (evt.target.classList.contains('pin__main') || evt.target.parentNode.classList.contains('pin__main')) {
        return;
      }
      var pinDataID = !evt.target.parentNode.hasAttribute('data-item') ? evt.target.getAttribute('data-item') : evt.target.parentNode.getAttribute('data-item');
      window.card.renderDialogPanel(elem[pinDataID]);
      window.showCard.showDialog();
    }
  };
  dialogCloseElement.addEventListener('click', window.showCard.closeDialog);
})();

