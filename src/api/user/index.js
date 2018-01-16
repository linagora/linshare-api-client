const BASE_PATH = '/user/v2';

module.exports = function(client) {
  return {
    workgroup: require('./workgroup')(client, BASE_PATH)
  };
};
