global.Promise.prototype.done = global.Promise.prototype.then;
global.clearImmediate = id => clearTimeout(id);
global.setImmediate = fn => setTimeout(fn, 0);
