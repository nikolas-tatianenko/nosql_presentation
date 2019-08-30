const Memcached = require('memcached');

/**
 * Sets a value in Memcached.
 *
 * @param {string} key The key for the value.
 * @param {*} value The value to set.
 * @param {number} expiration The expiration time in seconds (default: 0).
 */
function setMemcachedValue (key, value, expiration = 0) {
  const memcached = new Memcached('localhost:11211');
  memcached.set(key, value, expiration, (err) => {
    if (err) {
      console.error('Error setting value in Memcached:', err);
    }
    memcached.end();
  });
}

/**
 * Gets a value from Memcached.
 *
 * @param {string} key The key of the value.
 * @returns {*} The retrieved value or null if not found.
 */
function getMemcachedValue (key) {
  const memcached = new Memcached('localhost:11211');
  return new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
      if (err) {
        console.error('Error getting value from Memcached:', err);
        reject(err);
      } else {
        resolve(data);
      }
      memcached.end();
    });
  });
}

/**
 * Increments the value of an item in Memcached.
 *
 * @param {string} key The key of the item.
 * @param {number} amount The amount to increment by (default: 1).
 * @returns {number|boolean} The new value or false on failure.
 */
function incrementMemcachedValue (key, amount = 1) {
  const memcached = new Memcached('localhost:11211');
  return new Promise((resolve, reject) => {
    memcached.increment(key, amount, (err, newValue) => {
      if (err) {
        console.error('Error incrementing value in Memcached:', err);
        reject(err);
      } else {
        resolve(newValue);
      }
      memcached.end();
    });
  });
}

/**
 * Decrements the value of an item in Memcached.
 *
 * @param {string} key The key of the item.
 * @param {number} amount The amount to decrement by (default: 1).
 * @returns {number|boolean} The new value or false on failure.
 */
function decrementMemcachedValue (key, amount = 1) {
  const memcached = new Memcached('localhost:11211');
  return new Promise((resolve, reject) => {
    memcached.decrement(key, amount, (err, newValue) => {
      if (err) {
        console.error('Error decrementing value in Memcached:', err);
        reject(err);
      } else {
        resolve(newValue);
      }
      memcached.end();
    });
  });
}

/**
 * Checks if a key exists in Memcached.
 *
 * @param {string} key The key to check.
 * @returns {boolean} True if the key exists, false otherwise.
 */
function checkMemcachedKeyExists (key) {
  const memcached = new Memcached('localhost:11211');
  return new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
      if (err) {
        console.error('Error checking key existence in Memcached:', err);
        reject(err);
      } else {
        resolve(data !== undefined);
      }
      memcached.end();
    });
  });
}

/**
 * Sets multiple items in Memcached.
 *
 * @param {Object} items An object with key-value pairs.
 */
function setMultipleMemcachedValues (items) {
  const memcached = new Memcached('localhost:11211');
  memcached.setMulti(items, (err) => {
    if (err) {
      console.error('Error setting multiple values in Memcached:', err);
    }
    memcached.end();
  });
}

/**
 * Gets multiple items from Memcached.
 *
 * @param {Array<string>} keys An array of keys to retrieve.
 * @returns {Object} An object with key-value pairs.
 */
function getMultipleMemcachedValues (keys) {
  const memcached = new Memcached('localhost:11211');
  return new Promise((resolve, reject) => {
    memcached.getMulti(keys, (err, data) => {
      if (err) {
        console.error('Error getting multiple values from Memcached:', err);
        reject(err);
      } else {
        resolve(data);
      }
      memcached.end();
    });
  });
}

/**
 * Deletes a key from Memcached.
 *
 * @param {string} key The key to delete.
 */
function deleteMemcachedKey (key) {
  const memcached = new Memcached('localhost:11211');
  memcached.del(key, (err) => {
    if (err) {
      console.error('Error deleting key from Memcached:', err);
    }
    memcached.end();
  });
}

/**
 * Flushes all keys from Memcached.
 */
function flushMemcached () {
  const memcached = new Memcached('localhost:11211');
  memcached.flush((err) => {
    if (err) {
      console.error('Error flushing Memcached:', err);
    }
    memcached.end();
  });
}
