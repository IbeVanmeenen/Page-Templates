var poc = poc || {};

poc.app = (function($, window, undefined) {

    var init, initOnload, appScroll,
        $body = $('body');

    // On Dom readyorder
    init = function() {

    };

    // On All loaded
    initOnload = function() {
        poc.scroll.init();
        appScroll();
    };

    // On Scroll
    appScroll = function() {
        // Put functions in the '_update' function :-)
        var _onScroll, _requestTick, _update,
            latestKnownScrollY = 0,
            ticking = false;

        _onScroll = function() {
            latestKnownScrollY = window.pageYOffset;
            _requestTick();
        };

        _requestTick = function() {
            if(!ticking) {
                window.requestAnimationFrame(_update);
            }
            ticking = true;
        };

        _update = function() {
            ticking = false;

            var currentScrollY = latestKnownScrollY;

            poc.scroll.updateScroll(currentScrollY);
        };

        window.onscroll = function(e) {
            _onScroll();
        };
    };

    return {
        init: init,
        initOnload: initOnload
    };

}(jQuery, window));

// Dom ready
$(function() {
    poc.app.init();
});

// All loaded
$(window).load(function() {
    poc.app.initOnload();
});
