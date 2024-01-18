/**
 * Class for handling events.
 */
class EventEmitter {

    /**
     * @type {Map<Map<(data: any) => void>>}
     */
    #handlersByEventName = new Map();
    #highestId = 0;

    /**
     * Adds handler for specific event name.
     * @param {string} eventName String specifying the event name.
     * @param {(data: any) => void} handler A function to be called whenever the event is triggered. Accepts a single `data` parameter.
     * @returns {() => void} A function that receives no arguments, and returns nothing, that removes the listener that was added by on. Calling it twice should have the same effect as calling it once.
     */
    on(eventName, handler) {
        if (!this.#handlersByEventName.has(eventName)) {
            this.#handlersByEventName.set(eventName, new Map());
        }

        const handlersById = this.#handlersByEventName.get(eventName);
        const id = ++this.#highestId;

        handlersById.set(id, handler);

        return () => {
            handlersById.delete(id);
        };
    }

    /**
     * Calls all handlers attached to the specific event name.
     * @param {string} eventName A string specifying the name of the event sent.
     * @param {any} data The data to pass to receivers of the event.
     */
    trigger(eventName, data) {
        if (!this.#handlersByEventName.has(eventName)) {
            return;
        }

        for (const [id, handler] of this.#handlersByEventName.get(eventName)) {
            handler(data);
        }
    }


}

module.exports = EventEmitter;
