$(function() {

	/* init the gallery */
	$('.js-peppermint').each(function() {
		var slidesBlock = $(this).find('.slides'),
			thumbBlock = $(this).find('.thumbs'),
			thumbs = $(this).find('.thumb'),
			arrPrev = $(this).find('.arrow-prev'),
			arrNext = $(this).find('.arrow-next'),
			body = $('body'),
			slidesNumber,
			currentSlide;

		var gallery = Peppermint(this, {
			slidesContainer: slidesBlock[0],
			dots: true,
			mouseDrag: true,
			slideshow: true,
			slideshowInterval: 5000,
			stopSlideshowAfterInteraction: true,
			onSlideChange: function(n) {
				/* activate appropriate thumb */
				thumbs.each(function() {
					$(this).removeClass('active');
				});

				$(thumbs[n]).addClass('active');

				arrPrev.removeClass('disabled');
				arrNext.removeClass('disabled');

				if (n == gallery.getSlidesNumber()-1) {
					arrNext.addClass('disabled');
				}
				else if (n == 0) {
					arrPrev.addClass('disabled');
				}

				currentSlide = n;
			}
		});

		var thumbScroller = Slime(thumbBlock[0]);

		slidesNumber = gallery.getSlidesNumber();

		/* bind click & enter handler to thumbs */
		for (var i = thumbs.length - 1; i >= 0; i--) {
			$(thumbs[i]).on('click keyup', function(n) {
				return function(event) {
					if (thumbScroller.getClicksAllowed() && (event.type == 'click' || event.keyCode == 13)) {
						gallery.slideTo(n);
						gallery.stop();
					}
				};
			}(i));
		};

		arrPrev.on('touchend.prev click.prev', function(event) {
			prev();
			/* prevent zooming and clicking after touch */
			event.preventDefault();
		});

		arrNext.on('touchend.next click.next', function(event) {
			next();
			/* prevent zooming and clicking after touch */
			event.preventDefault();
		});

		/* remove click handlers when using touch */
		arrPrev.one('touchend', function(event) {
			arrPrev.off('click.prev');
		});

		arrNext.one('touchend', function(event) {
			arrNext.off('click.next');
		});

		arrPrev.on('click', function(event) {
			event.stopPropagation();
		});

		arrNext.on('click', function(event) {
			event.stopPropagation();
		});

		/* touch check */
		slidesBlock.one('mouseout', function(event) {
			arrNext.removeClass('shown');
			arrPrev.removeClass('shown');
			arrNext.addClass('auto');
			arrPrev.addClass('auto');
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

		function showArrows() {
			arrNext.addClass('shown');
			arrPrev.addClass('shown');
		}

		function hideArrows() {
			arrNext.removeClass('shown');
			arrPrev.removeClass('shown');
		}
	});

	/* prevent focus*/
	$('body').on('click', function(event) {
		if ((document.activeElement.tagName == 'BUTTON' ||
			document.activeElement.getAttribute('tabindex'))
			&& event.clientX !== 0 && event.clientY !== 0 && event.offsetX !== 0 && event.offsetY !== 0) {
			document.activeElement.blur();
		}
	});

});