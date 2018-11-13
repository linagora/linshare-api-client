

module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/work_groups`;

  return {
    list,
    listNodes,
    downloadDocument
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

  function downloadDocument(workGroupUuid, documentUuid) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes/${documentUuid}/download`,
      method: 'GET',
      responseType: 'blob'
    });
  }
};
