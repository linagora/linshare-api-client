# linshare-api-client

> JS library for Linshare APIs

## Installation

NPM:

`npm install linshare-api-client`

Bower:

`bower install linagora/linshare-api-client`

## Usage

```javascript
const { Client } = require('linshare-api-client');

const client = new Client({
  baseUrl: 'https://files.linshare.local/linshare/webservice/rest',
  auth: {
    type: 'basic',
    username: '<username>',
    password: '<password>'
    // OR by JWT
    // type: 'jwt',
    // token: '<token>'
  }
});

client.user.workgroup.list()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

On browser:

```javascript
const Client = window.LinshareApiClient.Client;

...
```

## Release

Assume that you are in `master` branch and you have write access to the `origin`
remote, type the following command to release a new version:

`./scripts/release.sh x.y.z`

## Licence

[Affero GPL v3](http://www.gnu.org/licenses/agpl-3.0.html)
