# NodeSSE
Library for Server Sent Events NodeJS

    const event = new Event({}, Constants.ID_PATTERNS.INCREMENTAL, 'eventName');
    const eventSource = new EventSource(event, req, res);
    
Pass additional `Response Headers` as first parameter
    
**Sent data**

    eventSource.push('{ "your_jsondata": "value" }');
    
**Note: Event Data should be string**

Once done close your connection as below

    eventSource.close();
