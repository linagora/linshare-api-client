const BASE_PATH = '/user/v2';

module.exports = function(client) {
  return {
    authentication: require('./authentication')(client, BASE_PATH),
    documents: require('./documents')(client, BASE_PATH),
    shares: require('./shares')(client, BASE_PATH),
    workgroup: require('./workgroup')(client, BASE_PATH),
    sharedSpaces: require('./shared_spaces')(client, BASE_PATH),
    sharedSpaceRoles: require('./shared_space_roles')(client, BASE_PATH)
  };
};
