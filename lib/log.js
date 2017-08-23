const logger = require('winston');
const moment = require('moment');
const timeRotate = require('winston-daily-rotate-file');
const env = process.env.NODE_ENV || 'development';

function getLog(options) {

	if (!options.logtype || !options.logopt) {
		return logger;
	}
	options.logopt.prgname = getPrgname();
	options.logopt.handleExceptions = options.logopt.handleExceptions || (env !== 'development');
	if (options.type == 'log') {
		return getlogger(options.logopt);
	} else if (options.type == 'rotatelog') {
		return getTimeRotateLogger(options.logopt);
	} else {
		return logger;
	}
}

function getlogger(options) {

	logger.add(logger.transports.File, {
		filename: options.logdir + options.prgname + '.log' + moment().format(options.datePattern),
		handleExceptions: options.handleExceptions,
		timestamp: function () {
			return moment().format('YYYY-MM-DD HH:mm:ss');
		}
	});
	logger.level = options.level || (env === 'development' ? 'debug' : 'info');
	return logger;
}

function getTimeRotateLogger(options) {

	logger.add(timeRotate, {
		localTime: true,
		filename: options.logdir + options.prgname + '.log',
		datePattern: options.datePattern,
		handleExceptions: options.handleExceptions,
		timestamp: function () {
			return moment().format('YYYY-MM-DD HH:mm:ss');
		}
	});
	logger.level = options.level || (env === 'development' ? 'debug' : 'info');
	return logger;
}

function getPrgname() {

	let os = process.platform;
	let filename = process.mainModule.filename;
	let separator = os.match('win') ? '\\' : '/';
	let index1 = filename.lastIndexOf(separator);
	let index2 = filename.lastIndexOf('.');
	filename = filename.substring(index1 + 1, index2);
	return filename;
}

exports.getLog = getLog;