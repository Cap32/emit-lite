
const _events = '__emit_lite__';

const EmitLite = function EmitLite() {};

Object.assign(EmitLite.prototype, {
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
			fn(...args);
			this.off(event, wrappedFn);
		};
		this.on(event, wrappedFn);
	},
	emit(event, ...args) {
		this[_events] = this[_events] || {};
		if (!(event in this[_events])) { return; }

		this[_events][event].forEach((fn) => fn(...args));
	},
	getCount(event) {
		this[_events] = this[_events] || {};
		return (this[_events][event] || []).length;
	},
});

module.exports = EmitLite;
