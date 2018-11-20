

module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/work_groups`;

  return {
    getNode,
    list,
    listNodes,
    downloadDocument
  };

  function getNode(workGroupUuid, documentUuid) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes/${documentUuid}`
    });
  }

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

  function downloadDocument(workGroupUuid, documentUuid, options = { responseType: 'blob' }) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes/${documentUuid}/download`,
      responseType: options.responseType
    });
  }
};
