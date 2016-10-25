
const EmitLite = require('../');
const assert = require('assert');

describe('EmitLite', function () {
	let emitter = new EmitLite();

	beforeEach(() => {
		emitter = new EmitLite();
	});

	it('on', function (done) {
		emitter.on('test:on', (a, b) => {
			assert(a === 'a');
			assert(b === 'b');
			done();
		});
		emitter.emit('test:on', 'a', 'b');
	});

	it('once', function (done) {
		emitter.once('test:once', done);
		emitter.emit('test:once');
	});

	it('not twice', function (done) {
		let count = 0;
		emitter.once('test:twice', () => {
			if (!count) { count++; }
			else { assert(false); }
		});
		emitter.emit('test:twice');
		emitter.emit('test:twice');
		setTimeout(done, 1000);
	});

	it('off', function (done) {
		emitter.on('test:off', () => assert(false));
		emitter.off('test:off');
		emitter.emit('test:off');
		setTimeout(done, 1000);
	});

	it('getCount', function () {
		const count = 3;
		new Array(count).fill().forEach(() => emitter.on('test:count'));
		assert(emitter.getCount('test:count') === count);
	});
});
