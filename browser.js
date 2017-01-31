'use strict';

var _events = '_emit_lite';

var emitter = {
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
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			fn.apply(_this, args);
			_this.off(event, wrappedFn);
		};
		this.on(event, wrappedFn);
	},
	emit: function emit(event) {
		var _this2 = this;

		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		this[_events] = this[_events] || {};
		if (!(event in this[_events])) {
			return;
		}

		this[_events][event].forEach(function (fn) {
			return fn.apply(_this2, args);
		});
	},
	listenerCount: function listenerCount(event) {
		this[_events] = this[_events] || {};
		return (this[_events][event] || []).length;
	}
};

var EmitLite = function EmitLite() {};

EmitLite.mixin = function (src) {
	for (var method in emitter) {
		// eslint-disable-line guard-for-in
		emitter.hasOwnProperty(method) && (src[method] = emitter[method]);
	}
	return src;
};

EmitLite.mixin(EmitLite.prototype, emitter);

module.exports = EmitLite;
