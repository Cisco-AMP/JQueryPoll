(function ($) {

  var terminator = null
  var url = null
  var interval = null

  $.poll = function (url_to_poll, interval_milliseconds, terminator_callback) {
    url = url_to_poll;
    interval = interval_milliseconds;
    terminator = terminator_callback;
    intervalId = setInterval(poller, interval_milliseconds, url);
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