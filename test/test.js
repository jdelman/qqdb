const fs = require('fs');
const path = require('path');
const assert = require('assert');

const QQDB = require('../index');

const pathToDB = path.resolve(__dirname, '.qqdb');
console.log(pathToDB);

describe('QQDB', function() {
  let db;

  before(function() {
    if (fs.existsSync(pathToDB)) {
      fs.unlinkSync(pathToDB);
    }
  });

  beforeEach(function() {
    db = new QQDB(false, pathToDB);
  });

  it('should set a string value', function() {
    db.set('key', 'value');
  });

  it('should get the string value', function() {
    const value = db.get('key');
    assert.equal(value, 'value');
  });

  it('should set a complex object value', function() {
    const obj = {
      a: {
        b: {
          c: {
            d: ['e']
          }
        }
      }
    };

    db.set('obj', obj);
  });

  it('should get the complex object value', function() {
    const obj = {
      a: {
        b: {
          c: {
            d: ['e']
          }
        }
      }
    };

    const value = db.get('obj');

    assert.deepEqual(value, obj);
  });
});
