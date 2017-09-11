'use strict';

(function () {
  var GET_URL = 'https://1510.dump.academy/keksobooking/data';
  var POST_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };
  window.backend = {
    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('POST', POST_URL);
      xhr.send(data);
    },
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('GET', GET_URL);
      xhr.send();
    }

  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; width:33%;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '200px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();
