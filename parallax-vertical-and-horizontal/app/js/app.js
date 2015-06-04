/* ==========================================================================
   Startkit
   ========================================================================== */

var pageTemplates = pageTemplates || {};

pageTemplates.parallaxVertHor = function(undefined) {

    var init, appScroll, updateScroll,
        _applyTransform,
        getBasics, setupSections;

    var windowHeight;
    var sections;


    // Helper function prefixed transforms
    _applyTransform = function(el, trans) {
        el.style.transform = trans;
        el.style.webkitTransform = trans;
    };


    // Get basics
    getBasics = function() {
        windowHeight = $(window).height(); // 100vh
        windowWidth = $(window).width(); // 100vw

        headerHeight = windowHeight * 0.85; // 85vh
        headerHeadHeight = windowHeight * 0.15; // 15vh
    };


    // Setup Sections
    setupSections = function() {
        // Find all sections
        var $sections = $('.js-scroll-section');

        // Find all values for each section and store them in the sections variable
        sections = $sections.map(function() {
            var $el = $(this),
                $helper = $el.find('.js-scroll-helper'),
                $headerHead = $el.find('.js-header-head'),
                $headerImg = $el.find('.js-header-img'),
                offset = $el.offset().top,
                startSideways = offset + headerHeight,
                stopSideways = startSideways + (windowHeight * 2),
                startHeader = offset - headerHeight;

            if($el.length) {
                return {
                    $el: $el,
                    $helper: $helper,
                    $headerHead: $headerHead,
                    $headerImg: $headerImg,
                    offset: offset,
                    startSideways: startSideways,
                    stopSideways: stopSideways,
                    startHeader: startHeader,
                    active: false
                };
            }
        });

        // Set some values fixed on the elements
        sections.each(function() {
            var section = this;

            section.$el[0].style.height = section.$el.height() + 'px';
            section.$helper[0].style.width = (windowWidth * 2) + 'px';
            section.$helper[0].style.height = windowHeight + 'px';
        });
    };


    // Do stuff on scroll
    updateScroll = function(currentScrollY) {

        // Each Section
        sections.each(function() {
            var section = this;

            // Section Header Image
            if (currentScrollY >= section.startHeader && currentScrollY <= section.startSideways) {
                // Update Dynamic Styles
                var valYImg = -((currentScrollY - section.offset)/2) + 'px';

                _applyTransform(section.$headerImg[0], 'translate3d(-50%,' + valYImg + ',0)');
            }


            // Section Header Head
            if (currentScrollY >= section.startHeader && currentScrollY <= (section.startSideways - headerHeadHeight)) {
                // Update Fixed Styles
                section.$headerHead[0].style.position = 'fixed';
                section.$headerHead[0].style.top = '35%';
                section.$headerHead[0].style.background = 'transparent';
                section.$headerHead[0].style.fontSize = '3.5rem';

                // Update Dynamic Styles
                var valYHead = -((currentScrollY - section.offset)/2) + 'px';

                _applyTransform(section.$headerHead[0], 'translate3d(0,' + valYHead + ',0)');

            } else {

                if (currentScrollY >= section.startHeader && currentScrollY >= (section.startSideways - headerHeadHeight) && currentScrollY < section.stopSideways) {
                    // Update Fixed Styles
                    section.$headerHead[0].style.position = 'fixed';
                    section.$headerHead[0].style.top = '0';
                    section.$headerHead[0].style.background = '#E0B452';
                    section.$headerHead[0].style.fontSize = '3rem';

                    // Update Dynamic Styles to Fixed
                    section.$headerHead[0].style.transform = 'translate3d(0,0,0)';
                    section.$headerHead[0].style.webkitTransform = 'translate3d(0,0,0)';
                    //_applyTransform(section.$headerHead[0], 'translate3d(0,' + valYHead + ',0)');

                } else {

                    if (currentScrollY <= (section.stopSideways + headerHeight)) {
                        // Going Up/Down
                        var valYHeadUp = -(currentScrollY - section.stopSideways) + 'px';

                        section.$headerHead[0].style.transform = 'translate3d(0,' + valYHeadUp + ',0)';
                        section.$headerHead[0].style.webkitTransform = 'translate3d(0,' + valYHeadUp + ',0)';
                    }
                }
            }


            // Section Content
            if (currentScrollY >= section.startSideways && currentScrollY <= section.stopSideways) {
                // Set section active
                section.active = true;

                // Update Fixed Styles
                section.$helper[0].style.position = 'fixed';
                section.$helper[0].style.top = '0';
                section.$helper[0].style.left = '0';
                section.$helper[0].style.bottom = 'auto';

                // Update Dynamic Styles
                var valXContent = -(currentScrollY - section.startSideways) + 'px';

                section.$helper[0].style.transform = 'translate3d(' + valXContent + ',0,0)';
                section.$helper[0].style.webkitTransform = 'translate3d(' + valXContent + ',0,0)';

            } else {
                // Currently Active?
                if (section.active) {

                    // Going Up or down?
                    if (currentScrollY < section.startSideways) {
                        // UP
                        // Update Fixed Styles
                        section.$helper[0].style.position = 'relative';
                        section.$helper[0].style.top = '0';
                        section.$helper[0].style.bottom = 'auto';

                        // Update Dynamic Styles to Fixed Values
                        section.$helper[0].style.transform = 'translate3d(0,0,0)';
                        section.$helper[0].style.webkitTransform = 'translate3d(0,0,0)';

                        // Set section inactive
                        section.active = false;

                    } else {
                        // DOWN
                        // Update Fixed Styles
                        section.$helper[0].style.position = 'absolute';
                        section.$helper[0].style.top = 'auto';
                        section.$helper[0].style.bottom = '0';

                        // Provide reset!!
                        // section.$helper[0].style.transform = 'translate3d(0,0,0)';
                        // section.$helper[0].style.webkitTransform = 'translate3d(0,0,0)';

                        sectionOneActive = false;
                    }
                }
            }
        });
    };


    // Main Scroll
    appScroll = function() {
        var _aniLoop, _onScroll, _update;

        _update = function() {
            var currentScrollY = window.pageYOffset;
            updateScroll(currentScrollY);
        };

        _aniLoop = function() {
            _update();
            window.requestAnimationFrame(_aniLoop);
        };

        _aniLoop();
    };


    // Init
    init = function() {
        getBasics();
        setupSections();
        appScroll();
    }();
};

// All loaded
$(window).load(function() {
    pageTemplates.parallaxVertHor();
});
