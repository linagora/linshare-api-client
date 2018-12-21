module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/shared_space_nodes`;

  return {
    findMemberByAccountUuid
  };

  function findMemberByAccountUuid(nodeId, accountId) {
    return client.api({
      url: `${BASE_PATH}/${nodeId}/members/${accountId}`
    });
  }
};
