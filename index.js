let path = require('path');
let Tool = require('ikits/tool');
let Taskager = require('taskager');

class Zzbond extends Taskager {
  constructor(options) {
    options = Tool.isBasic(options) ? {} : options;
    options.configFilesPath = path.resolve(__dirname, './');
    super(options);
  }
}

module.exports = Zzbond;