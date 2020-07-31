const {
    CONTENT_TYPE_EVENT_STREAM,
    KEEP_ALIVE,
    NO_CACHE,
    CORS,
    ID_PATTERNS
} = require('./constants');

class Event {

    headers = {
        'Connection': KEEP_ALIVE,
        'Content-Type': CONTENT_TYPE_EVENT_STREAM,
        'Cache-Control': NO_CACHE,
        'Access-Control-Allow-Origin': CORS
    };

    id = ID_PATTERNS.INCREMENTAL;

    /**
     * Headers for event-stream
     * @param {*} headers - Overriding default headers or adding additional
     * @param {*} idPattern - Supported values 'INCREMENTAL' & 'MANUAL'
     * @param {*} type - Type of the event (Optional)
     */
    constructor(headers, idPattern, type) {
        this.headers = {
            ...this.headers,
            ...headers
        };
        if (idPattern && ID_PATTERNS.hasOwnProperty(idPattern)) {
            this.id = idPattern;
        }
        this.type = type ? type : 'DEFAULT';
    }

}

module.exports = Event;