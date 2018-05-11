let path = require('path');
let Taskager = require('taskager');

class Zzbond extends Taskager {
  constructor(options) {
    options = (!options || typeof options !== 'object') ? {} : options;
    options.configFilesPath = path.resolve(__dirname, './');
    super(options);
  }
}
module.exports = Zzbond;