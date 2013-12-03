$(function() {

	/* init the gallery */
	$('.js-peppermint').each(function() {
		var slidesBlock = $(this).find('.slides')[0],
			thumbs = $(this).find('.thumb');

		var gallery = Peppermint(this, {
			slidesContainer: slidesBlock,
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
			}
		});

		/* bind clicks & enter press to thumbs */
		for (var i = thumbs.length - 1; i >= 0; i--) {
			$(thumbs[i]).on('click keyup', function(n) {
				return function(event) {
					if (event.type == 'click' || event.keyCode == 13) {
						gallery.slideTo(n);
						gallery.stop();
					}
				};
			}(i));
		};
	});

	/* prevent focus*/
	$('body').on('click', function(event) {
		console.log(event);
		if ((document.activeElement.tagName == 'BUTTON' ||
			document.activeElement.getAttribute('tabindex'))
			&& event.clientX !== 0 && event.clientY !== 0 && event.offsetX !== 0 && event.offsetY !== 0) {
			document.activeElement.blur();
		}
	});

});