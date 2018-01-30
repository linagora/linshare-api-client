const httpClient = require('./http-client');
const user = require('./api/user');

class Client {
  constructor(options) {
    if (!options.baseUrl) {
      throw new Error('baseUrl option is required');
    }


    this.httpClient = httpClient(options);

    this.user = user(this);
  }

  api(config) {
    return this.httpClient(config).then(resp => resp.data);
  }
}


module.exports = Client;
