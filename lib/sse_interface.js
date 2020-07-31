const ServerSentEvent = require('./sse');

class SSEInterface {

    constructor(sseEvent) {
        this.sseEvent = sseEvent;
    }

    /**
     * 
     * @param {*} data - data (String formatted) to be sent to client
     * @param {*} type - Type of event (Optional)
     * @param {*} id - ID is considered only when the type is MANUAL
     */
    push(data, type, id) {
        return this.sseEvent.push(data, type, id);
    }

    /**
     * Fetch the last known event from client
     */
    lastKnownEvent() {
        return this.sseEvent.lastKnownEvent();
    }

    close() {
        this.sseEvent.close();
    }

}

function EventSource(event, request, response) {
    const serverSentEvent = new ServerSentEvent(event, request, response);
    return new SSEInterface(serverSentEvent);
}

module.exports = EventSource;