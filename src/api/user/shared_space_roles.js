module.exports = function(client, parentPath) {
  const BASE_PATH = `${parentPath}/shared_space_roles`;

  return {
    findAllPermissions
  };

  function findAllPermissions(roleId) {
    return client.api({
      url: `${BASE_PATH}/${roleId}/permissions`
    });
  }
};
