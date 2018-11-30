module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/authentication`;

  return {
    authorized
  };

  function authorized() {
    return client.api({
      url: `${BASE_PATH}/authorized`
    });
  }
};
