$(function() {
	var body = $('body');

	/* init the gallery */
	$('.js-peppermint').each(function() {
		var slidesBlock = $(this).find('.slides'),
			thumbBlock = $(this).find('.thumbs'),
			thumbs = $(this).find('.thumb'),
			arrPrev = $(this).find('.arrow-prev'),
			arrNext = $(this).find('.arrow-next'),
			slidesNumber,
			currentSlide;

		var scroller = Slime(thumbBlock[0]);

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

				scroller.moveElementToViewport(thumbs[n], 24);

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

		slidesNumber = gallery.getSlidesNumber();

		/* bind click & enter handler to thumbs */
		for (var i = thumbs.length - 1; i >= 0; i--) {
			$(thumbs[i]).on('click keyup', function(n) {
				return function(event) {
					if (scroller.getClicksAllowed() && (event.type == 'click' || event.keyCode == 13)) {
						gallery.slideTo(n);
						gallery.stop();
					}
				};
			}(i));
		};

		arrPrev.on('touchend click.prev keyup', function(event) {
			if (event.type == 'keyup' && event.keyCode !== 13) return;

			prev();

			/* prevent zooming and clicking after touch */
			event.preventDefault();
			event.stopPropagation();
		});

		arrNext.on('touchend click.next keyup', function(event) {
			if (event.type == 'keyup' && event.keyCode !== 13) return;

			next();

			/* prevent zooming and clicking after touch */
			event.preventDefault();
			event.stopPropagation();
		});

		/* remove click handlers when using touch */
		arrPrev.one('touchend', function(event) {
			arrPrev.off('click.prev');
		});

		arrNext.one('touchend', function(event) {
			arrNext.off('click.next');
		});

		/* touch check */
		if (!!window.navigator.pointerEnabled || !!window.navigator.msPointerEnabled) {
			body.one('pointermove MSPointerMove', function(event) {
				if (event.pointerType == (event.MSPOINTER_TYPE_MOUSE || 'mouse')) {
					autoArrows();
				}
			});
		}
		else {
			body.one('mousemove.touchtest', function(event) {
				body.off('touchstart.touchtest');
				autoArrows();
			});

			body.one('touchstart.touchtest', function(event) {
				body.off('mousemove.touchtest');
			});
		}

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

		function autoArrows() {
			arrNext.removeClass('shown');
			arrPrev.removeClass('shown');
			arrNext.addClass('auto');
			arrPrev.addClass('auto');
		}
	});

	/* prevent focus*/
	addEvent(body[0], 'click', function(event) {
		if ((document.activeElement.tagName == 'BUTTON' ||
			document.activeElement.getAttribute('tabindex'))
			&& event.clientX !== 0 && event.clientY !== 0 && event.offsetX !== 0 && event.offsetY !== 0) {
			document.activeElement.blur();
		}
	}, true);

	/* collapser */
	$('.user-review .review-text').collapser(320);
	$('.game-description .description-text').collapser(450);

});