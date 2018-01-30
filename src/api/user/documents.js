module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/documents`;

  return {
    list,
    create
  };

  function list() {
    return client.api({
      url: BASE_PATH
    });
  }

  function create(formData, { async, onUploadProgress } = {}) {
    return client.api({
      url: BASE_PATH,
      method: 'POST',
      data: formData,
      onUploadProgress,
      params: { async }
    });
  }
};
