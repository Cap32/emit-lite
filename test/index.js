
const EmitLite = require('../');
const assert = require('assert');

describe('EmitLite', function () {
	let event = new EmitLite();

	beforeEach(() => {
		event = new EmitLite();
	});

	it('on', function (done) {
		event.on('test:on', (a, b) => {
			assert(a === 'a');
			assert(b === 'b');
			done();
		});
		event.emit('test:on', 'a', 'b');
	});

	it('once', function (done) {
		event.once('test:once', done);
		event.emit('test:once');
	});

	it('not twice', function (done) {
		let count = 0;
		event.once('test:twice', () => {
			if (!count) { count++; }
			else { assert(false); }
		});
		event.emit('test:twice');
		event.emit('test:twice');
		setTimeout(done, 1000);
	});

	it('off', function (done) {
		event.on('test:off', () => assert(false));
		event.off('test:off');
		event.emit('test:off');
		setTimeout(done, 1000);
	});

	it('getCount', function () {
		const count = 3;
		new Array(3).fill().forEach(() => event.on('test:count'));
		assert(event.getCount('test:count') === count);
	});
});
