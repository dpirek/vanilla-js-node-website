const https = require('https');
const http = require('http');
const { URL } = require('url');

/*
  Example usage:
  --------------

  request('www.someurl.com/foo-bar-test').then(data => {
    console.log(data);
  });
*/

function request(url) {
  const parsedUrl = new URL(url);

  return new Promise((resolve, reject) => {
    const _protocol = parsedUrl.protocol === 'http' ? http : https;

    _protocol.request({
      host: parsedUrl.host,
      path: parsedUrl.pathname,
      port: parsedUrl.port
    }, function(response) {

      let str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        resolve(str);
      });
    }).end();
  });
}

module.exports = request;
