const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chai = require('chai');
const { Client } = require('../src');

chai.use(require('chai-as-promised'));

before(function() {
  this.mock = new MockAdapter(axios);
});

beforeEach(function() {
  this.mock.reset();
  this.client = new Client({
    token: 'heyheyhey',
    baseUrl: 'http://linshare.webservice.rest'
  });
});

after(function() {
  this.mock.restore();
});
