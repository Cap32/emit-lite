'use strict';

var _events = '__emit_lite__';

var EmitLite = function EmitLite() {};

Object.assign(EmitLite.prototype, {
	on: function on(event, fn) {
		this[_events] = this[_events] || {};
		this[_events][event] = this[_events][event] || [];
		this[_events][event].push(fn);
	},
	off: function off(event, fn) {
		var events = this[_events] = this[_events] || {};
		if (!(event in events)) {
			return;
		}

		if (fn) {
			events[event].splice(events[event].indexOf(fn), 1);
		} else {
			events[event] = [];
		}
	},
	once: function once(event, fn) {
		var _this = this;

		var wrappedFn = function wrappedFn() {
			fn.apply(undefined, arguments);
			_this.off(event, wrappedFn);
		};
		this.on(event, wrappedFn);
	},
	emit: function emit(event) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		this[_events] = this[_events] || {};
		if (!(event in this[_events])) {
			return;
		}

		this[_events][event].forEach(function (fn) {
			return fn.apply(undefined, args);
		});
	},
	getCount: function getCount(event) {
		this[_events] = this[_events] || {};
		return (this[_events][event] || []).length;
	}
});

module.exports = EmitLite;
