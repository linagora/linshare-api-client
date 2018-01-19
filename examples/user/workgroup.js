process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Client, NODE_TYPE } = require('../../src');

const client = new Client({
  baseUrl: 'https://files.linshare.local/linshare/webservice/rest',
  auth: {
    type: 'basic',
    username: 'root@localhost.localdomain',
    password: 'adminlinshare'
  }
});

client.user.workgroup.list()
  .then((workgroups) => {
    console.log('Got', workgroups.length, 'workgroups');

    return runSeqence(workgroups.map(workgroup =>
      () => readNode(workgroup)
    ));
  })
  .catch(err => console.log('Error:', err));


function readNode(workGroup, node, level = 1) {
  const prefix = multipleSlash(level);

  if (!node) {
    return client.user.workgroup.listNodes(workGroup.uuid)
      .then(sortNodes)
      .then((nodes) => {
        console.log(`${prefix} Workgroup: ${workGroup.name} - ${nodes.length} child nodes`);
        return runSeqence(nodes.map(childNode =>
          () => readNode(workGroup, childNode, level + 1)
        ));
      });
  }

  if (node.type === NODE_TYPE.DOCUMENT) {
    return console.log(`${prefix} File: ${node.name}`);
  }


  return client.user.workgroup.listNodes(workGroup.uuid, { parent: node.uuid })
    .then(sortNodes)
    .then((nodes) => {
      console.log(`${prefix} Folder: ${node.name} - ${nodes.length} child nodes`);
      return runSeqence(nodes.map(childNode =>
        () => readNode(workGroup, childNode, level + 1)
      ));
    });
}

function runSeqence(funcs) {
  let promise = Promise.resolve();

  funcs.forEach((func) => {
    promise = promise.then(func);
  });

  return promise;
}

function multipleSlash(level) {
  let output = '';

  for (let i = 0; i < level; i++) { // eslint-disable-line
    output += '--';
  }

  return output;
}

function sortNodes(nodes) {
  return nodes.sort((node1, node2) => {
    if (node1.type === node2.type) {
      return node1.name > node2.name ? 1 : -1;
    }

    if (node1.type === NODE_TYPE.DOCUMENT) {
      return -1;
    }

    return 1;
  });
}
