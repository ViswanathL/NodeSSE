/**
 * Default header values
 */
exports.KEEP_ALIVE = 'keep-alive';
exports.CONTENT_TYPE_EVENT_STREAM = 'text/event-stream';
exports.NO_CACHE = 'no-cache';
exports.CORS = '*';
exports.EVENT_HEADER = 'last-event-id';

/**
 * Pattern in which the SSE id is created
 */
exports.ID_PATTERNS = {
    INCREMENTAL: 0,
    MANUAL: 1
};

/**
 * Http Status Codes
 */
exports.HTTP_200 = 200;