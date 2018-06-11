let cheerio = require('cheerio');
let request = require('request');
let charset = require('./charset');

const NOT_SET = 'Not Set';

module.exports = function () {
  return {
    "options": {
      "uri": NOT_SET,
      "url": NOT_SET,
      "qs": NOT_SET,
      "method": "GET",
      "headers": NOT_SET,
      "body": NOT_SET,
      "form": NOT_SET,
      "json": NOT_SET,
      "multipart": NOT_SET,
      "followRedirect": NOT_SET,
      "followAllRedirects": NOT_SET,
      "maxRedirects": NOT_SET,
      "encoding": NOT_SET,
      "pool": NOT_SET,
      "timeout": 10000,
      "proxy": NOT_SET,
      "auth": NOT_SET,
      "oauth": NOT_SET,
      "strictSSL": NOT_SET,
      "jar": NOT_SET,
      "aws": NOT_SET,
      "gzip": false,
      "time": NOT_SET,
      "tunnel": NOT_SET,
      "proxyHeaderWhiteList": NOT_SET,
      "proxyHeaderExclusiveList": NOT_SET,
      "localAddress": NOT_SET,
      "forever": NOT_SET
    },
    "processors": [
      {
        "name": "proxy",
        "asyn": true,
        "func": function (task, callback) {
          console.log(task)
          console.log('executing proxy processor')
          //task.opt('proxy','11111111');
          setTimeout(callback, 200,null, task);
        }
      },
      {
        "name": "request",
        "asyn": true,
        "func": function (task, callback) {
          console.log('executing request processor')
          request(task.opt(), function (err, res) {
            console.log(err)
            task.response = res;
            task.responseError = err;
            callback(err, task);
          });
        }
      },
      {
        "name": "normalErrorCheck",
        "asyn": false,
        "func": function (task) {
          console.log('executing normalErrorCheck processor')

          if (task.responseError) {
            console.log(task.responseError);
          }
        }
      },
      {
        "name": "statusCodeCheck",
        "asyn": false,
        "func": function (task) {
          console.log('executing statusCheck processor')

          if (task.response.statusCode != 200) {
            console.log(task.response.statusCode);
          }
        }
      },
      {
        "name": "encode",
        "asyn": false,
        "func": function (task) {
          console.log('executing encode processor')

          let encode = task.attr('encode');
          if (!encode) return;
          charset.decodeBody(task.response);

        }
      },
      {
        "name": "jquery",
        "asyn": false,
        "func": function (task) {
          console.log('executing jquery processor')

          let jquery = task.attr('jquery');
          if (jquery) {
            task.response.$ = cheerio.load(task.response.body);
          }
        }
      },
      {
        "name": "eg:listErrorCheck",
        "asyn": false,
        "func": function (task) {
          console.log('executing listErrorCheck processor')
          if (task.responseError) {
            console.log(task.responseError);
          }
        }
      },
      {
        "name": "eg:detailErrorCheck",
        "asyn": false,
        "func": function (task) {
          console.log('executing detailErrorCheck processor')
          if (task.responseError) {
            console.log(task.responseError);
          }
        }
      }, {
        "name": "final",
        "asyn": false,
        "func": function (task) {
          console.log('executing final processor')
          console.log(task.response.body)
          return task
        }
      }
    ]
  };
};