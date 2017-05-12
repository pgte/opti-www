(function($) {
    "use strict"; // Start of use strict

    var initialized = false
    var activatedFacebookMessages = false
    var messagesClosed = true
    var activatingMessages = false

    setTimeout(activateFacebookMessages, 30000)

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
                ga('madeira.send', 'pageview', { 'page': location.pathname + location.search + location.hash});
            }

            activateFacebookMessages();
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

    var hashes = [
      '#projects-casa-porto-santo',
      '#projects-casa-grandola',
      '#projects-casa-palmeira',
      '#projects-casa-rabacal',
      '#projects-casa-tatami',
      '#projects-edificio-manhattan',
      '#projects-edificio-camden'
    ]

    var hash = window.location.hash
    var projectPos = -1
    var projectsElem = $('#projects')

    if (hash) {
        projectPos = hashes.indexOf(hash);
        if (projectPos >= 0) {
            if (projectsElem.length) {
                $('html, body').stop().animate({
                    scrollTop: (projectsElem.offset().top - 50)
                }, 0);
            }
        }
    }
    if (projectPos < 0) {
        projectPos = Math.floor(Math.random() * hashes.length)
    }

    console.log('detaching %d pos', projectPos)
    $('.item.teaser-project')
      .detach()
      .insertBefore($('#projects .item:nth-child(' + (projectPos + 1) + ')'));

    setTimeout(function () {
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
            transitionStyle: "fadeUp",
            beforeMove: maybeActivateFacebookMessages
        });

        portfolio.trigger('owl.jumpTo', projectPos + 1);
    }, 0)

    setTimeout(function() {
        initialized = true
    }, 0)

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
        ga('madeira.send', 'event', 'Newsletter', 'subscribe newsletter')
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

    function maybeActivateFacebookMessages () {
      if (initialized) {
        activateFacebookMessages()
      }
    }

    function activateFacebookMessages() {
        if (mobileBrowser()) {
            return
        }
        if (activatingMessages) {
            return
        }
        activatingMessages = true

        var $header = $('#message-header')
        $header.click(function() {
            if (!messagesClosed) {
                return closeMessages()
            }
            messagesClosed = false;

            $('#message-wrapper').css({opacity: 1});
            $('#message-wrapper').css({height: '280px', width: '400px'});
            $('#message-header').css({opacity: 1});
            $('#message-header span').html('&nbsp;Fechar');

            if (activatedFacebookMessages) {
                return
            }

            activatedFacebookMessages = true;

            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v2.9";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        })

        var timeout = Math.floor(Math.random() * 3000) + 3000

        setTimeout(function() {
            var direction = 1;
            var interval = 1000;
            $('#message-wrapper').show().css({ height: '30px' });
            var $messageWrapper = $('#message-wrapper');
            var $messageHeader = $('#message-header');
            $messageWrapper.css({height: '30px'});

            $messageWrapper.animate({opacity: direction}, interval, function maybeReiterateAnimation() {
                if (!messagesClosed) {
                    return;
                }
                direction = direction === 1 ? 0.7 : 1;
                $messageHeader.animate({opacity: direction}, interval, maybeReiterateAnimation);
            })
        }, timeout)
    }

    function closeMessages () {
        messagesClosed = true
        $('#message-wrapper')
          .css({height: '30px', width: '50px'})
          .animate({right: 0});
        $('#message-header span').text('');
        $('#message-wrapper').css({opacity: 0.5});
    }

    function mobileBrowser () {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

})(jQuery); // End of use strict
