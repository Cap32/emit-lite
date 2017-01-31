
const EmitLite = require('../');
const assert = require('assert');

describe('EmitLite', function () {
	let emitter = new EmitLite();

	beforeEach(() => {
		emitter = new EmitLite();
	});

	it('on()', function (done) {
		emitter.on('test:on', (a, b) => {
			assert(a === 'a');
			assert(b === 'b');
			done();
		});
		emitter.emit('test:on', 'a', 'b');
	});

	it('once()', function (done) {
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

	it('off()', function (done) {
		emitter.on('test:off', () => assert(false));
		emitter.off('test:off');
		emitter.emit('test:off');
		setTimeout(done, 1000);
	});

	it('off() alt', function (done) {
		const off = emitter.on('test:off', () => assert(false));
		off();
		emitter.emit('test:off');
		setTimeout(done, 1000);
	});

	it('listenerCount()', function () {
		const count = 3;
		new Array(count).fill().forEach(() => emitter.on('test:count'));
		assert(emitter.listenerCount('test:count') === count);
	});

	it('EmitLite.mixin()', function (done) {
		const obj = { a: 'a' };
		EmitLite.mixin(obj);
		obj.on('test:mixin', (b) => {
			assert(obj.a === 'a');
			assert(b === 'b');
			done();
		});
		obj.emit('test:mixin', 'b');
	});

	it('es6 extends', function (done) {
		class Obj extends EmitLite {
			getB() {
				return 'b';
			}
		}
		const obj = new Obj();
		obj.on('test:extends', function (a) {
			assert(a === 'a');
			assert(this.getB() === 'b');
			done();
		});
		obj.emit('test:extends', 'a');
	});
});
