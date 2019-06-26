module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/shared_spaces`;

  return {
    getMembers
  };

  function getMembers(sharedSpaceUuid, options = {}) {
    const settings = {
      url: `${BASE_PATH}/${sharedSpaceUuid}/members`,
      params: {}
    };

    if (options.filterByAccountUuid) {
      settings.params.accountUuid = options.filterByAccountUuid;
    }

    return client.api(settings);
  }
};
