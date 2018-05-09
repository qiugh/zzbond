let path = require('path');
let Taskager = require('taskager');

class Zzbond extends Taskager {
  constructor(options) {
    options = options || {};
    options.configFilesPath = path.resolve(__dirname, './config');
    super(options);
  }
}
module.exports = Zzbond;