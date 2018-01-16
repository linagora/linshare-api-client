

module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/work_groups`;

  return {
    list,
    listNodes
  };

  function list() {
    return client.api({
      url: BASE_PATH
    });
  }


  function listNodes(workGroupUuid, { parent, type } = {}) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes`,
      params: { parent, type }
    });
  }
};
