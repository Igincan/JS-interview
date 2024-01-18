class EventEmitter {

    #handlersByEventName = new Map();

    /**
     * @param {string} eventName String specifying the event name.
     * @param {(data: any) => void} handler A function to be called whenever the event is triggered. Accepts a single `data` parameter.
     */
    on(eventName, handler) {
        if (!this.#handlersByEventName.has(eventName)) {
            this.#handlersByEventName.set(eventName, [handler]);
        } else {
            this.#handlersByEventName.get(eventName).push(handler);
        }
    }

    /**
     * @param {string} eventName A string specifying the name of the event sent.
     * @param {any} data The data to pass to receivers of the event.
     */
    trigger(eventName, data) {
        if (!this.#handlersByEventName.has(eventName)) {
            return;
        }

        for (const handler of this.#handlersByEventName.get(eventName)) {
            handler(data);
        }
    }


}

module.exports = EventEmitter;
