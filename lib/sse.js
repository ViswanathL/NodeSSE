const {
    HTTP_200,
    ID_PATTERNS,
    EVENT_HEADER
} = require('./constants');

class ServerSentEvent {

    id = 0;

    constructor(event, request, response) {
        this.event = event;
        this.request = request;
        this.response = response;
        this.lastEventId = this.lastKnownEvent();
        this.init();
    }

    init() {
        this.writeHeader();
        this.request.on('close', this.close.bind(this));
    }

    writeHeader() {
        this.response.writeHead(HTTP_200, this.event.headers);
    }

    fetchKnownEvent() {
        if (this.request.headers[EVENT_HEADER]) {
            return this.request.headers[EVENT_HEADER];
        }
        return null;
    }

    lastKnownEvent() {
        return this.lastEventId;
    }

    nextId(id) {
        if (this.event.id === ID_PATTERNS.INCREMENTAL) {
            return ++ this.id;
        }
        return id;
    }

    fetchType(type) {
        return type ? type : this.event.type;
    }

    /**
     * Close the connection, if open
     */
    close() {
        if (!this.response.finished) {
            this.response.end();
            console.log('Stopped sending events.');
        }
    }

    /**
     * 
     * @param {*} data - data (String formatted) to be sent to client
     * @param {*} type - Type of event (Optional)
     * @param {*} id - ID is considered only when the type is MANUAL
     * @returns {*} boolean - true if writes successfully, false otherwise
     */
    push(data, type, id) {
        if (typeof data !== 'string') {
            throw new Error('Data should be in string format');
        }
        const nextEventId = this.nextId(id);
        const eventString = `id: ${nextEventId}\nevent: ${this.fetchType(type)}\ndata: ${data}\n\n`;
        if(!this.response.finished) {
            this.response.write(eventString);
            this.lastEventId = nextEventId;
            return true;
        }
        return false;
    }

}

module.exports = ServerSentEvent;