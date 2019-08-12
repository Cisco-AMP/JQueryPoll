(function ($) {

  var terminator = null
  var url = null
  var interval = null

  $.poll = function (urlToPoll, intervalInMilliseconds, terminatorCallback) {
    url = urlToPoll;
    interval = intervalInMilliseconds;
    terminator = terminatorCallback;
    intervalId = setInterval(poller, intervalInMilliseconds, url);
    return this;
  };

  var poller = function() {
    var terminate = false
    $.get(url).
      done(function (data, textStatus, jqXHR) {
        terminate = terminator(jqXHR, textStatus, data);
      }).
      fail(function (jqXHR, textStatus, errorThrown) {
        terminate = terminator(jqXHR, textStatus, data);
      });

    if(!terminate){
      setTimeout(poller, interval)
    }
  };
  
})(jQuery)