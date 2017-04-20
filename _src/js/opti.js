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
        var images = shuffleArray([
          'header-casa-porto-santo',
          'header-casa-grandola',
          'header-casa-palmeira',
          'header-casa-palmeira-interior',
          'header-casa-rabacal',
          'header-casa-tatami',
          'header-edificio-camden',
          'header-edificio-manhattan'
        ]);
        var index = 0;
        var image = images[0]
        var $header = $('.header-carousel')
        var $logo = $header.find('.intro-content');
        setInterval(setImageHeader, 5000)
        setImageHeader()

        function setImageHeader() {
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

                index = (index + 1) % images.length;
                image = images[index];
                $('#slogan').text(window.opti.slogans[index % window.opti.slogans.length])
                $header.addClass(image);
                $header.fadeIn(function() {
                    $logo.fadeTo(4000, 1)
                });

            })

        }
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

    var portfolio = $(".portfolio-carousel")

    portfolio.owlCarousel({
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

    var hashes = [
      '#projects-casa-porto-santo',
      '#projects-casa-grandola',
      '#projects-casa-palmeira',
      '#projects-casa-rabacal',
      '#projects-casa-tatami'
    ]

    var hash = window.location.hash
    var projectPos = -1

    if (hash) {
        projectPos = hashes.indexOf(hash);
    } else {
        projectPos = Math.floor(Math.random() * hashes.length)
    }

    if (projectPos >= 0) {
        $('html, body').stop().animate({
            scrollTop: ($('#projects').offset().top - 50)
        }, 0);

        portfolio.trigger('owl.jumpTo', projectPos);
    }


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
        ga('send', 'event', 'Newsletter', 'subscribe newsletter')
    })

    $.getJSON('/contacts', function (data) {
        if (data.phone) {
            $('#contact-phone').text(data.phone)
        }

        if (data.email) {
            $('#contact-email')
              .text(data.email)
              .attr('href', 'mailto:' + data.email)
        }
    })

    function shuffleArray (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

})(jQuery); // End of use strict
