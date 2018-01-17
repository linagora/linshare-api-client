module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/documents`;

  return {
    list
  };

  function list() {
    return client.api({
      url: BASE_PATH
    });
  }
};
