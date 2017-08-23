const PriorityQueue = require('./PriorityQueue.js');

class ExecuteChannel {

	constructor(options, default_queue_options) {

		this.running_task_num = 0;
		this.last_task_execute_time = new Date();
		this.task_execute_rate = options.ratelimit;
		this.queue = new PriorityQueue(default_queue_options);
		this.task_parallel_num = options.ratelimit ? 1 : options.parallel;
	}

	enqueue(task) {

		this.queue.enqueue(task);
		this.execute_task();
	}

	dequeue() {

		return this.queue.dequeue();
	}

	queuers() {

		return this.queue.queue_size;
	}

	task_done() {

		this.running_task_num--;
		this.execute_task();
	}

	execute_task() {

		if ((this.running_task_num >= this.task_parallel_num) || !this.queuers()) return;
		let need_wait_time = this.task_execute_rate - Math.max(this.task_execute_rate, new Date() - this.last_task_execute_time);
		if (need_wait_time > 0) return setTimeout(this.execute_task, need_wait_time);
		let task = this.dequeue();
		this.running_task_num++;
		this.last_task_execute_time = new Date();
		task.execute();
	}
}

module.exports = ExecuteChannel