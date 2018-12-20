const BASE_PATH = '/user/v2';

module.exports = function(client) {
  return {
    authentication: require('./authentication')(client, BASE_PATH),
    documents: require('./documents')(client, BASE_PATH),
    shares: require('./shares')(client, BASE_PATH),
    workgroup: require('./workgroup')(client, BASE_PATH),
    sharedSpaceNodes: require('./shared_space_nodes')(client, BASE_PATH)
  };
};
