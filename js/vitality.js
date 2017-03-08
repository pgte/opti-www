/*!
 * Vitality v1.4.0 (http://themes.startbootstrap.com/vitality-v1.4.0)
 * Copyright 2013-2016 Start Bootstrap Themes
 * To use this theme you must have a license purchased at WrapBootstrap (https://wrapbootstrap.com)
 */

// Load WOW.js on non-touch devices
var isPhoneDevice = "ontouchstart" in document.documentElement;
$(document).ready(function() {
    if (isPhoneDevice) {
        //mobile
    } else {
        //desktop
        // Initialize WOW.js
        wow = new WOW({
            offset: 50
        })
        wow.init();
    }
});

(function($) {
    "use strict"; // Start of use strict

    // Smooth Scrolling: Smooth scrolls to an ID on the current page.
    // To use this feature, add a link on your page that links to an ID, and add the .page-scroll class to the link itself. See the docs for more details.
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        var href = $anchor.attr('href')
        var title = $anchor.attr('title')
        $('html, body').stop().animate({
            scrollTop: ($(href).offset().top - 50)
        }, 1250, 'easeInOutExpo', function() {
            if (history && history.pushState) {
                history.pushState(null, 'OPTi Housing Systems - ' + title, href)
            }
            if (ga) {
                ga('send', 'pageview', { 'page': location.pathname + location.search + location.hash});
            }
        });
        event.preventDefault();
    });

    // Activates floating label headings for the contact form.
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    (function() {
        var images = [
          'header-casa-grandola',
          'header-casa-rabacal',
          'header-casa-porto-santo'
        ];
        var index = -1;
        var image
        var $header = $('.header-carousel')
        var $logo = $header.find('.intro-content');
        setInterval(function () {

            $logo.stop({
                clearQueue: true,
                jumpToEnd: true
            });
            $header.stop({
                clearQueue: true,
                jumpToEnd: true
            })
            $logo.fadeTo('normal', 0)
            $header.fadeOut(function() {
                if (image) {
                    $header.removeClass(images[index])
                }

                index = (index + 1) % images.length
                image = images[index];
                $header.addClass(image);
                $header.fadeIn(function() {
                    $logo.fadeTo(4000, 1)
                });
            })

        }, 5000)
    }())

    // Owl Carousel Settings
    $(".about-carousel").owlCarousel({
        items: 3,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    });

    $(".portfolio-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        autoHeight: true,
        mouseDrag: true,
        touchDrag: true,
        transitionStyle: "fadeUp"
    });

    $(".testimonials-carousel, .mockup-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: true,
        autoHeight: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        transitionStyle: "backSlide"
    });

    $(".portfolio-gallery").owlCarousel({
        items: 3,
    });

    // Magnific Popup jQuery Lightbox Gallery Settings
    $('.gallery-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: 'title'
        }
    });

    $('.mix').magnificPopup({
        type: 'image',
        image: {
            titleSrc: 'title'
        }
    });

    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Portfolio Filtering Scripts & Hover Effect
    var filterList = {
        init: function() {

            // MixItUp plugin
            $('#portfoliolist').mixItUp();

        },

    };

    filterList.init();

    $('#mc-embedded-subscribe-form').on('submit', function(event) {
        if (ga) {
            ga('send', 'Newsletter', 'subscribe newsletter')
        }
    })

})(jQuery); // End of use strict
