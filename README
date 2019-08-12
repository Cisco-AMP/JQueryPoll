# $.poll

Allows you to poll an AJAX call until your pre-defined condition is met. Ideal for displaying a spinner until an action is complete.

## API

```JavaScript
/*
url: Points to the GET endpoint from where to poll
interval_in_milliseconds: Interval between calls to the url
terminator_callback: A callback function that returns true to indicate end of polling
*/
$.poll(url, interval_in_milliseconds, terminator_callback)
```

```JavaScript
$.poll('http://my/url', 100, (xhr, status, data) => {
    return data.hello === 'world';
})
```
