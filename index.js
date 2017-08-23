const LOG = require('./lib/log.js');
const Task = require('./lib/Task.js');
const OPTIONS = require('./lib/options.js');
const Schedule = require('./lib/Schedule.js');
const DEFAULT_OPT = require('./lib/config.json');
const EventEmitter = require("events").EventEmitter;

class Zzbond extends EventEmitter {

	constructor(options) {

		super();
		options = (options && (typeof options === 'object')) ? options : {};
		this.log = LOG.getLog(OPTIONS.merge_default_options('log_options', options));
		this.request_options = OPTIONS.merge_default_options('request_options', options);
		this.schedule = new Schedule(OPTIONS.merge_default_options('schedule_options', options),
			OPTIONS.merge_default_options('channel_options', options),
			OPTIONS.merge_default_options('queue_options', options));
	}

	queue(task_options, callback) {

		if (!callback || typeof callback !== 'function') {
			throw new Error('callback is necessarily a function');
		}
		let optional = {};
		this.emit('schedule', task_options);
		checkTaskOptions(this.request_options, task_options, optional);
		preprocess(optional);
		let task = new Task(task_options, optional, callback, this.done());
		this.schedule.enqueue(task);
	}

	done() {

		let self = this;
		let inform_done = function (channel) {
			self.schedule.task_done(channel);
			if (!self.schedule.unfinished_task_num) {
				self.emit('drain');
			}
		}
		return inform_done;
	}
}

function preprocess(optional) {

	if (!('channel' in optional)) {
		optional.channel = 'default_channel';
	}
	if (!('jquery' in optional)) {
		optional.jquery = true;
	}
}

function checkTaskOptions(global_request_options, task_options, optional) {

	if (!task_options) {
		throw new Error('task option is necessary');
	}
	if (!('uri' in task_options)) {
		throw new Error('uri is necessary');
	}
	task_options = OPTIONS.merge_options(task_options, global_request_options);
	let keys = Object.keys(task_options);
	for (let i = 0; i < keys.length; i++) {
		if (!(keys[i] in DEFAULT_OPT.request_options)) {
			optional[keys[i]] = task_options[keys[i]];
			delete task_options[keys[i]];
		}
	}
}

module.exports = Zzbond;