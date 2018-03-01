process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Client } = require('../../src');

const client = new Client({
  baseUrl: 'https://files.linshare.local/linshare/webservice/rest',
  auth: {
    type: 'basic',
    username: 'root@localhost.localdomain',
    password: 'adminlinshare'
  }
});

client.user.documents.createFromUrl({
  url: 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
  fileName: 'your_example_file.pdf',
  size: 7945
}, { async: true })
  .then((resp) => {
    console.log('Response:', resp);
  })
  .catch(err => console.log('Error:', err));
