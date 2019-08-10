(function ($) {

  var intervalId = null
  var terminator = null

  $.poll = function (url, interval_milliseconds, terminator_callback) {
    terminator = terminator_callback;
    intervalId = setInterval(poller, interval_milliseconds, url);
    return this;
  };

  var poller = function(url) {
    return $.get(url).
      done(function (data, textStatus, jqXHR) {
        checkTermination(jqXHR, textStatus, data)
      }).
      fail(function (jqXHR, textStatus, errorThrown) {
        checkTermination(jqXHR, textStatus, errorThrown)
      })
  }
  
  var checkTermination = function(jqXHR, textStatus, data) {
    if (terminator(jqXHR, textStatus, data)) {
      clearInterval(intervalId);
    }
  };

})(jQuery)