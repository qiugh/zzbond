const cheerio = require('cheerio');
const request = require('request');
const charset = require('./charset.js');

class Task {

	constructor(necessary, optional, callback, done) {

		this.necessary = necessary;
		this.optional = optional;
		this.callback = callback;
		this.done = function () {

			done(optional.channel);
		}
	}

	execute() {

		let self = this;
		request(self.necessary, function (error, result) {

			if (error) {
				result = {
					error: error
				};
				return self.callback(self, result, self.done);
			}
			charset.decodeBody(result, self.optional.decoding);
			if (self.optional.jquery) {
				result.$ = cheerio.load(result.body);
			}
			self.callback(self, result, self.done);
		})
	}
}

module.exports = Task