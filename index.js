
const _events = '_emit_lite';

const emitter = {
	on(event, fn) {
		this[_events] = this[_events] || {};
		this[_events][event] = this[_events][event] || [];
		this[_events][event].push(fn);
	},
	off(event, fn) {
		const events = this[_events] = this[_events] || {};
		if (!(event in events)) { return; }

		if (fn) { events[event].splice(events[event].indexOf(fn), 1); }
		else { events[event] = []; }
	},
	once(event, fn) {
		const wrappedFn = (...args) => {
			fn.apply(this, args);
			this.off(event, wrappedFn);
		};
		this.on(event, wrappedFn);
	},
	emit(event, ...args) {
		this[_events] = this[_events] || {};
		if (!(event in this[_events])) { return; }

		this[_events][event].forEach((fn) => fn.apply(this, args));
	},
	listenerCount(event) {
		this[_events] = this[_events] || {};
		return (this[_events][event] || []).length;
	},
};

const EmitLite = function EmitLite() {};

EmitLite.mixin = (src) => {
	for (const method in emitter) { // eslint-disable-line guard-for-in
		emitter.hasOwnProperty(method) && (src[method] = emitter[method]);
	}
	return src;
};

EmitLite.mixin(EmitLite.prototype, emitter);

module.exports = EmitLite;
