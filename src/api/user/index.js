const BASE_PATH = '/user/v2';

module.exports = function(client) {
  return {
    documents: require('./documents')(client, BASE_PATH),
    workgroup: require('./workgroup')(client, BASE_PATH)
  };
};
