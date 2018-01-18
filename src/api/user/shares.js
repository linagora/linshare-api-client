module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/shares`;

  return {
    shareDocuments
  };

  function shareDocuments({ documents, recipients } = {}) {
    return client.api({
      url: BASE_PATH,
      method: 'POST',
      data: { documents, recipients }
    });
  }
};
