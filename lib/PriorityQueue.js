class PriorityQueue {

	constructor(options) {

		this.queue_size = 0;
		this.priority_queue = [];
		for (let i = 0; i < options.prioritylimit; i++) {
			this.priority_queue.push([]);
		}
	}

	enqueue(queuer) {

		if (!('priority' in queuer.optional) || (typeof queuer.optional.priority !== 'number')) {
			queuer.optional.priority = Math.ceil(this.priority_queue.length / 2);
		}
		this.priority_queue[queuer.optional.priority].push(queuer);
		this.queue_size++;
	}

	dequeue() {

		let queuer = null;
		for (let i = 0; i < this.priority_queue.length; i += 1) {
			if (this.priority_queue[i].length) {
				queuer = this.priority_queue[i].shift();
				this.queue_size--;
				break;
			}
		}
		return queuer;
	}
}

module.exports = PriorityQueue;