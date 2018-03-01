const axios = require('axios');

module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/documents`;

  return {
    list,
    create,
    createFromUrl
  };

  function list() {
    return client.api({
      url: BASE_PATH
    });
  }

  function create(formData, { async, onUploadProgress } = {}) {
    const source = axios.CancelToken.source();
    const promise = client.api({
      url: BASE_PATH,
      method: 'POST',
      data: formData,
      onUploadProgress,
      params: { async },
      cancelToken: source.token
    });

    promise.cancel = () => source.cancel('Operation canceled by the user.');

    return promise;
  }

  function createFromUrl({ url, fileName, size } = {}, { async } = {}) {
    return client.api({
      url: BASE_PATH,
      method: 'POST',
      data: { url, fileName, size },
      params: { async }
    });
  }
};
