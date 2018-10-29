class EventEmitter {
    constructor() {
        this.events = {};
    }
    checkExistence(event) {
        if(!this.events[event]) {
            this.events[event] = [];
        }
    }
    once(event, cb) {
        this.checkExistence(event);
        const cbWithRemove = (...args) => {
            cb(...args);
            this.off(event, cbWithRemove)
        };
        this.events[event].push(cbWithRemove)
    }
    off(event, cb) {
        this.checkExistence(event);
        this.events[event] = this.events[event].filter(registeredCallback => registeredCallback !== cb);
    }

    on(event, cb) {
        this.checkExistence(event);
        this.events[event].push(cb);
    }

    emit(event, ...args) {
        this.checkExistence(event);
        this.events[event].forEach(cb => cb(...args));
    }
}