const express = require('express');
const app = express();
const port = 3000;
const {
    Event,
    EventSource,
    Constants
} = require('./lib');

/**
 * Dummy API for normal GET
 */
app.get('/', (req, res) => res.send('Hello World!'));

/**
 * Event Streaming API
 */
app.get('/events', (req, res) => {
    const event = new Event({}, Constants.ID_PATTERNS.INCREMENTAL, 'flightEvent');
    const eventSource = new EventSource(event, req, res);
    repeat(eventSource, 3);
});

const repeat = (eventSource, i) => {
    setTimeout(() => {
        let isOpen = eventSource.push(JSON.stringify({ flightNumber: `JA-${Math.ceil(Math.random() * 100)}`, takeOffTime: +new Date() }));
        if (isOpen) {
            if (i < 8) {
                const lastKnownId = eventSource.lastKnownEvent();
                console.log('ID: ', lastKnownId);
                repeat(eventSource, ++ i);
            } else {
                eventSource.close();
            }
        }
    }, 3000);
};

app.listen(port, () => console.log(`Express server running at http://localhost:${port}`));