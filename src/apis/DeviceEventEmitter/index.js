class DeviceEventEmitter {
    eventList = {ccc: []}

    addListener(eventName, fn) {
        if (this.eventList[eventName]) {
            this.eventList[eventName].push(fn);
        } else {
            this.eventList[eventName] = [fn];
        }
    }

    removeListener(eventName, fn) {
        if (this.eventList[eventName]) {
            for (let i in this.eventList[eventName]) {
                if (this.eventList[eventName][i] === fn) {
                    this.eventList[eventName].splice(i, 1);
                    return;
                }
            }
        }
    }

    removeAllListeners(eventName) {
        delete this.eventList[eventName];
    }

    emit(eventName, data) {
        if (this.eventList[eventName]) {
            this.eventList[eventName].map(event => event(data));
        }
    }
}
const DeviceEventEmitter_ = new DeviceEventEmitter();

module.exports = DeviceEventEmitter_;