const OPTIONS = require('./options.js');
const ExecuteChannel = require('./ExecuteChannel.js');

class Schedule {

	constructor(options, default_channel_options, default_queue_options) {

		this.channels = {};
		this.unfinished_task_num = 0;
		this.noidle = options.noidle;
		this.default_queue_options = default_queue_options;
		this.default_channel_options = default_channel_options;
	}

	enqueue(task) {

		let execute_channel_id = task.optional.channel;
		let channel = this.channels[execute_channel_id];
		if (!channel) {
			channel = new ExecuteChannel(OPTIONS.merge_options(task.optional, this.default_channel_options),
				this.default_queue_options);
			this.channels[execute_channel_id] = channel;
		}
		this.unfinished_task_num++;
		channel.enqueue(task);
	}

	task_done(execute_channel_id) {

		this.unfinished_task_num--;
		let channel = this.channels[execute_channel_id];
		channel.task_done();
		let task = null;
		if (!channel.queuers() && this.noidle && (task = this.getWaitingTask())) {
			channel.enqueue(task);
		}
	}

	getWaitingTask() {

		let task = null;
		let channelIds = Object.keys(this.channels);
		for (var i = 0; i < channelIds.length; i++) {
			if (this.channels[channelIds[i]].queuers() > 1) {
				task = this.channels[channelIds[i]].dequeue();
				break;
			}
		}
		return task;
	}
}

module.exports = Schedule