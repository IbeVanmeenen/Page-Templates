var poc = poc || {};

poc.scroll = (function($, window, undefined) {

    var init,
        setupMenu, setupMenuItems,
        updateScroll;

        var exports = this.app;

    var lastId = '',
        currentOffset, menuStartOffset;

    var main, menu, menuItems, scrollItems;

    var $body = $('body');

    // Init
    init = function() {
        // Initial Setup
        setupMenu();
        setupMenuItems();

        // Start scroll
        updateScroll(window.pageYOffset);

        $('.js-page-banner__caption__btn').on('click', function(e) {
            e.preventDefault();

            var target = $(this).attr('href');

            $(target).velocity('scroll', {
                duration: 500,
                offset: 0
            });
        });
    };


    // Bind to scroll
    updateScroll = function(currentScrollY) {
        currentOffset = currentScrollY;

        updateMenu();
        updateMenuItems();
    };


    // Setup Menu
    setupMenu = function() {
        // Get menu
        main = $('#main');
        menu = $('#article-nav');

        // Get start-offset
        menuStartOffset = menu.offset().top;
    };


    // Update menu (on scroll)
    updateMenu = function() {
        if(menuStartOffset < currentOffset) {
            main.addClass('main--fixed');
        } else {
            main.removeClass('main--fixed');
        }
    };


    // Setup Menu Items
    setupMenuItems = function() {
        // All menu items
        menuItems = menu.find('.js-article-nav__item');

        // Find Anchors corresponding to menu items and store the jQuery object and offset of this anchor.
        scrollItems = menuItems.map(function() {
            var $this = $(this),
                $item = $($this.attr('href')),
                offset = $item.offset().top;

            if($item.length) {
                return {
                    $item: $item,
                    offset: offset
                };
            }
        });

        // Scroll to on click
        menuItems.on('click', function(e) {
            e.preventDefault();

            var target = $(this).attr('href');

            $(target).velocity('scroll', {
                duration: 500,
                offset: 0
            });
        });
    };


    // Update menu items (on scroll)
    updateMenuItems = function() {
        // Get id of the Anchor in view
        var currentInViewTarget;

        // Get all passed anchors
        currentInViewTarget = scrollItems.map(function() {
            if(this.offset < currentOffset + 50) {
                return this.$item;
            }
        });

        // Get the last of the passed anchors
        currentInViewTarget = currentInViewTarget[currentInViewTarget.length-1];

        // Get the id of the current element
        var id = currentInViewTarget && currentInViewTarget.length ? currentInViewTarget[0].id : '';

        // Set first active if no id is present
        if (id === '') {
            $('#section_1').addClass('section--fixed');
        }

        // Update navigations items if there is a new anchor passed
        if (lastId !== id) {
            lastId = id;

            menuItems.removeClass('article-nav__item--active');
            menuItems.filter('[href=#' + id + ']').addClass('article-nav__item--active');

            $('.js-section').removeClass('section--fixed');

            $newSection = $('#' + id);

            $newSection.addClass('section--fixed');
            $body.css('background', $newSection.data('background'));
        }
    };


    return {
        init: init,
        updateScroll: updateScroll
    };

}(jQuery, window));
