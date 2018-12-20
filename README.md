# linshare-api-client

> JS library for Linshare APIs

## Installation

NPM:

`npm install linagora/linshare-api-client`

Bower:

`bower install linshare-api-client`

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

## APIs

### User API

#### Authentication

__Get authorized user__

```javascript
client.user.authentication.authorized().then(...)
```

#### Workgroup

__Create document in a node of work group from URL__

```javascript
client.user.workgroup.createDocumentFromUrl('work-group-uuid', documentInfo, options)
  .then(...)
```

- `documentInfo`: an object contains
  - url (required): file url
  - fileName (optional): file name
  - size (optional): file size
- `options` (optional):  `{ parent: 'parentNodeUuid', async: true/false, strict: true/false }`

__Delete a node in workgroup__

```javascript
client.user.workgroup.deleteNode('work-group-uuid', 'node-uuid')
  .then(...)
```

__List workgroups__

```javascript
client.user.workgroup.list().then(...)
```

__List nodes in a workgroup__

```javascript
client.user.workgroup.listNodes(workgroupUuid, options).then(...)
```

- `options` (optional):  `{ parent: 'parentNodeUuid', type: 'FOLDER | DOCUMENT' }`

__Update a node in workgroup__

```javascript
client.user.workgroup.updateNode('work-group-uuid', 'node-uuid', modified)
  .then(...)
```

#### Documents
__Get a document__

```javascript
client.user.documents.get('documentUuid').then(...)
```

__List documents__

```javascript
client.user.documents.list().then(...)
```

__Create a document__

Upload a file to My space

```javascript
var options = {
  async: false,
  onUploadProgress: function(progressEvent) {
    var processedPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log('Uploading...', processedPercent);
  }
};
var formData = new FormData();

formData.append('file', file);
formData.append('filesize', fileSize);

client.user.documents.create(formData, options).then(...)
```

### Share

__Share documents__

```javascript
client.user.shares.shareDocuments({
  documents: ['documentUuid1', 'documentUuid2'],
  recipients: [{
    mail: 'user1@domain.com'
  }, {
    mail: 'user2@domain.com'
  }]
}).then(...)
```

__Download document__

Accept different response type with default value being `blob`. You are advised to use different response types based on running environment:
 - `blob` is for browser
 - `arrayBuffer` is for nodejs environment

```javascript
client.user.workgroup.downloadDocument('work-group-uuid', 'node-uuid', { responseType: 'blob' })
  .then(function(blob) {
    const file = new File([blob], 'documentname');
  })
```

__Get a node in workgroup__

```javascript
client.user.workgroup.getNode('work-group-uuid', 'node-uuid')
  .then(...)
```

### Shared space nodes
__Get a member of a shared space node__
```javascript
client.user.sharedSpaceNodes.findMemberByAccountUuid('shared-space-node-uuid', 'member-uuid')
  .then(...)
```

### Shared space roles
__Get a shared space role by uuid__
```javascript
client.user.sharedSpaceRoles.findAllPermissions('shared-space-role-uuid')
  .then(...)
```

## Release

Assume that you are in `master` branch and you have write access to the `origin`
remote, type the following command to release a new version:

`./scripts/release.sh x.y.z`

In case your Git remote is NOT `origin`:

`./scripts/release.sh x.y.z my-remote`

## Licence

[Affero GPL v3](http://www.gnu.org/licenses/agpl-3.0.html)
