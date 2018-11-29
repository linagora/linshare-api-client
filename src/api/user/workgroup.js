const axios = require('axios');

module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/work_groups`;

  return {
    list,
    listNodes,
    downloadDocument,
    createInWorkgroupNode,
    createInWorkgroupNodeFromUrl
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
};
