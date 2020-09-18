$.fn.steamGallery = function() {
    $(this).each(function() {
        var body = $('body'),
            slidesBlock = $(this).find('.slides'),
            thumbsBlock = $(this).find('.thumbs'),
            thumbs = $(this).find('.thumb'),
            arrPrev = $(this).find('.arrow-prev'),
            arrNext = $(this).find('.arrow-next'),
            slidesNumber,
            currentSlide;

        /* init the thumb scroller and save its API */
        var scroller = Slime(thumbsBlock[0]);

        /* init the slider and save its API */
        var gallery = Peppermint(this, {
            slidesContainer: slidesBlock[0],
            dots: true,
            mouseDrag: true,
            slideshow: true,
            slideshowInterval: 5000,
            stopSlideshowAfterInteraction: true,
            onSlideChange: function(n) {
                /* activate appropriate thumb */
                thumbs.removeClass('active');

                thumbs.eq(n).addClass('active');

                /* move active thumb to the viewport, if it's not there */
                scroller.moveElementToViewport(thumbs[n], 24);

                /* see if an arrow should be disabled */
                arrPrev.removeClass('disabled');
                arrNext.removeClass('disabled');

                if (n == gallery.getSlidesNumber()-1) {
                    arrNext.addClass('disabled');
                }
                else if (n == 0) {
                    arrPrev.addClass('disabled');
                }

                /* save current slide number */
                currentSlide = n;
            }
        });

        /* get total number of slides */
        slidesNumber = gallery.getSlidesNumber();

        /* bind click & enter handlers to thumbs */
        for (var i = thumbs.length - 1; i >= 0; i--) {
            $(thumbs[i]).on('click keyup', function(n) {
                return function(event) {
                    if (
                        scroller.getClicksAllowed() &&
                        (
                            event.type == 'click' ||
                            event.keyCode == 13
                        )
                    ) {
                        gallery.slideTo(n);
                        gallery.stop();
                    }
                };
            }(i));
        };

        // bind event handlers to arrows
        arrPrev.on('click keyup', function(event) {
            if (event.type == 'keyup' && event.keyCode !== 13) return;

            prev();

            /* prevent zooming and clicking after touch */
            event.preventDefault();
            event.stopPropagation();
        });

        arrNext.on('click keyup', function(event) {
            if (event.type == 'keyup' && event.keyCode !== 13) return;

            next();

            /* prevent zooming and clicking after touch */
            event.preventDefault();
            event.stopPropagation();
        });

        function prev() {
            if (currentSlide == 0) return;

            gallery.prev();
            gallery.stop();
        }

        function next() {
            if (currentSlide == slidesNumber - 1) return;

            gallery.next();
            gallery.stop();
        }
    });

    return this;
};
