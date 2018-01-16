const axios = require('axios');

module.exports = function(options) {
  const httpClient = axios.create({
    baseURL: options.baseUrl
  });

  if (options.auth) {
    httpClient.defaults.headers.common.authorization = buildAuthHeader(options.auth);
  }

  return httpClient;
};

function buildAuthHeader(auth) {
  if (auth.type === 'jwt') {
    return `Bearer ${auth.token}`;
  }

  if (auth.type === 'basic') {
    return `Basic ${Buffer.from([auth.username, auth.password].join(':')).toString('base64')}`;
  }
}
