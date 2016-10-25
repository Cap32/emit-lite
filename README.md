Super Light weight Event Emitter for Node.js and browser. (Only 0.61KB after gzipped)

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

emitter.off(eventType, handler)

```js
const handler = () => console.log('emitted'); // will not emit

emitter.on('test:off', handler);
emitter.off('test:off');
emitter.emit('test:off');
```

emitter.getCount(eventType)

```js
const count = 3;
new Array(count).fill().forEach(() => emitter.on('test:getCount'));
console.log(emitter.getCount('test:getCount')); // 3;
```

## License

MIT
