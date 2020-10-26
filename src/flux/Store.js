export class Store {
    constructor(dispatcher) {
        this.__listeners = [];
        this.__state = this.getInitialState();
        dispatcher.register(this.__onDispatch.bind(this));
    }

    __onDispatch(action) {
        throw new Error('Subclass must override');
    }

    getInitialState() {
        throw new Error('Subclass must override');
    }

    addListener(listener) {
        this.__listeners.push(listener);
    }

    __emitChange() {
        this.__listeners.forEach(listener => listener(this.__state));
    }
}