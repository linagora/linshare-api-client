const expect = require('chai').expect;

describe('The shared_space namespace', () => {
  describe('The getMembers function', () => {
    it('should send a GET to get members of a shared space', function() {
      const members = [{
        uuid: 'guy1'
      }, {
        uuid: 'guy2'
      }];

      this.mock.onGet('/user/v2/shared_spaces/123123/members').reply(200, members);
      expect(this.client.user.sharedSpaces.getMembers('123123')).to.eventually.deep.equal(members);
    });

    it('should send a GET with an accountUuid params to filter member by account id', function() {
      const members = [{
        uuid: 'guy1'
      }];

      this.mock.onGet('/user/v2/shared_spaces/123123/members', { params: { accountUuid: 'guy1' } }).reply(200, members);
      expect(this.client.user.sharedSpaces.getMembers('123123', { filterByAccountUuid: 'guy1' })).to.eventually.deep.equal(members);
    });
  });
});
