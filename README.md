Super Light weight Event Emitter for Node.js and browser.

## Installing

Using npm:

```bash
$ npm install emit-lite
```

Using yarn:

```bash
$ yarn add emit-lite
```

## Usage

emitter.on(eventType, handler)

emitter.emit(eventType, [arg[, ...]])

```js
import EmitLite from 'emit-lite';

const emitter = new EmitLite();

emitter.on('test:on', (a, b) => {
	console.log(a); // => 'a'
	console.log(b); // => 'b'
});
emitter.emit('test:on', 'a', 'b');
```

emitter.once(eventType, handler)

```js
emitter.once('test:once', () => {
	console.log('once'); // will only log once.
});
emitter.emit('test:once');
emitter.emit('test:once');
```

emitter.off(eventType[, handler])

```js
const handler = () => console.log('emitted'); // will not emit

emitter.on('test:off', handler);
emitter.off('test:off');
emitter.emit('test:off');
```

emitter.listenerCount(eventType)

```js
const count = 3;
new Array(count).fill().forEach(() => emitter.on('test:listenerCount'));
console.log(emitter.listenerCount('test:listenerCount')); // => 3;
```

EmitLite.mixin(targetObject)

```js
import EmitLite from 'emit-lite';

const obj = { a: 'a' };
EmitLite.mixin(obj);
obj.on('test:mixin', (b) => {
	console.log(obj.a); // => 'a'
	console.log(b); // => 'b'
});
obj.emit('test:mixin', 'b');
```

ES6 class extends

```js
import EmitLite from 'emit-lite';

class Obj extends EmitLite {
	getB() {
		return 'b';
	}
}
const obj = new Obj();
obj.on('test:extends', function (a) {
	console.log(a); // => 'a'
	console.log(this.getB()); // => 'b'
});
obj.emit('test:extends', 'a');
```

## License

MIT
