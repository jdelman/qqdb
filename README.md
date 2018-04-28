## qqdb

Zero dependency key-value storage for Node.js. Because sometimes you need that.

Basically, [NSUserDefaults](https://developer.apple.com/documentation/foundation/userdefaults) for your script. Store and retrieve any JSON-serializable data. 100% synchronous.

### install

`npm install qqdb`

### api

#### _constructor_(local = false, location?: string)

Creates or loads an existing `.qqdb` file.

By default, `local` is set to `true`, meaning the DB will be stored in your current working directory.

If set to false, the DB will be stored in `$HOME`.

If set to false with a location, the location will be used.

If a file already exists, it will be loaded.

#### _get_(key: string)

Gets the value at a key. Will return `null` if the key does not exist.

#### _set_(key: string, value: jsonSerializable) : this

Sets the value (any JSON-serializable thing, like a string, array, object, number, etc.) at the key and then saves the database. Returns the QuickDB instance for chaining.

### usage

```js
const QQDB = require('qqdb');
const qdb = new QQDB();

qdb.set('SOME_API_KEY', '0xDEADBEEF');

const key = qdb.get('SOME_API_KEY');
```

need to set a bunch of vars? try chaining!

```js

qdb.set('key1', 'val1')
   .set('key2', 'val2')
   .set('key3', 'val3'); // always returns the instance
```
