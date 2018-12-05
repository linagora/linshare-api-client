const axios = require('axios');

module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/work_groups`;

  return {
    createDocumentFromUrl,
    createInWorkgroupNode,
    createInWorkgroupNodeFromUrl,
    deleteNode,
    downloadDocument,
    getNode,
    list,
    listNodes,
    updateNode
  };

  function createDocumentFromUrl(workGroupUuid, { url, fileName, size } = {}, { parent, async, strict } = {}) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes/url`,
      method: 'POST',
      data: { url, fileName, size },
      params: { parent, async, strict }
    });
  }

  function createInWorkgroupNode(formData, { async, onUploadProgress } = {}, workGroupUuid) {
    const source = axios.CancelToken.source();
    const promise = client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes`,
      method: 'POST',
      data: formData,
      onUploadProgress,
      params: { async },
      cancelToken: source.token
    });

    promise.cancel = () => source.cancel('Operation canceled by the user.');

    return promise;
  }

  function createInWorkgroupNodeFromUrl({ url, fileName } = {}, { async } = {}, workGroupUuid) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes/url`,
      method: 'POST',
      data: { url, fileName },
      params: { async }
    });
  }

  function deleteNode(workGroupUuid, nodeUuid) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes/${nodeUuid}`,
      method: 'DELETE'
    });
  }

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

  function updateNode(workGroupUuid, nodeUuid, modified) {
    return client.api({
      url: `${BASE_PATH}/${workGroupUuid}/nodes/${nodeUuid}`,
      method: 'PUT',
      data: modified
    });
  }
};
