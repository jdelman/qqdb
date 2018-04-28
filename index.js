const fs = require('fs');
const os = require('os');
const path = require('path');

const isJSONSerializable = value => {
  // this isn't very good
  if (['string', 'number'].includes(typeof value)) return true;
  return Object(value) === value;
}

class QQDB {
  constructor(local = true, location) {
    if (local) {
      this.location = path.resolve(process.cwd(), '.qqdb');
    }
    else if (!location) {
      this.location = path.resolve(os.homedir(), '.qqdb')
    }
    else {
      this.location = location;
    }

    this.initialize();
  }

  initialize() {
    if (!fs.existsSync(this.location)) {
      // write empty file
      this.db = {};
      this.flush();
      return;
    }

    const raw = fs.readFileSync(this.location, 'utf8');
    this.db = JSON.parse(raw);
  }

  get(key) {
    // reload?
    const raw = this.db[key];
    if (!raw) return null;
    return JSON.parse(raw);
  }

  set(key, value) {
    if (!isJSONSerializable(value)) throw new TypeError('Value must be JSON serializable');

    const serialized = JSON.stringify(value);
    this.db[key] = serialized;

    this.flush();

    return this;
  }

  flush() {
    const raw = JSON.stringify(this.db);
    fs.writeFileSync(this.location, raw, { encoding: 'utf8' });
    return this;
  }
}

module.exports = QQDB;
