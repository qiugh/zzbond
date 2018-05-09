const NOT_SET = 'Not Set';

module.exports = {
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
    "gzip": true,
    "time": NOT_SET,
    "tunnel": NOT_SET,
    "proxyHeaderWhiteList": NOT_SET,
    "proxyHeaderExclusiveList": NOT_SET,
    "localAddress": NOT_SET,
    "forever": NOT_SET
  },
  "processors": [
    {
      "name": "p1",
      "func": function (task) {
        let processor = 'p1'
        console.log('before_execute_process_flow <' + processor + '> is executing along with the value: <' + task.processor(processor) + '>.');
      },
      asyn: false
    },
    {
      "name": "p2",
      "func": function (task) {
        let processor = 'p2'
        charset.decodeBody(result, self.optional.decoding);

        console.log('before_execute_process_flow <' + processor + '> is executing along with the value: <' + task.processor(processor) + '>.');
      },
      asyn: false
    },
    {
      "name": "p3",
      "func": function (task, callback) {
        let processor = 'p3'

        console.log('before_execute_process_flow <' + processor + '> is executing along with the value: <' + task.processor(processor) + '>.');
        setTimeout(callback, 2000, 'error', task)
      },
      asyn: true
    }
  ]
}