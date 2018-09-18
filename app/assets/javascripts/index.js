$(function() {
    var timeline = $('.chat-area__timeline');
    $(document).ready(function() {
       $(timeline).delay(5000).animate({
          scrollTop: $(timeline).height()
        }, 3000);
    });
    $(timeline).on('scroll', function() {
       $(timeline).delay(5000).animate({
          scrollTop: $(timeline).height()
        }, 3000);
    });
});
