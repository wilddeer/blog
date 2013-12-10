$(function() {

	$('.js-peppermint').Peppermint({
		dots: true,
		mouseDrag: true
	});
	
	$('pre').dzScrollFallback();

	/* OH MY GLOBE WHAT AM I DOIN */
	if (Sniffer.os.name == 'kindle' && Sniffer.os.version < 4) {
		$('.title a').each(function() {
			$(this).html('<span>'+$(this).html()+'</span>');
		});

		$('.title > a').css('color', 'transparent');
		$('.title > a > span').css({
			'color': 'black',
			'border-bottom': '2px solid'
		});
	}

	/* prevent focus*/
	addEvent(document.getElementsByTagName('body')[0], 'click', function(event) {
		if ((document.activeElement.tagName == 'BUTTON' ||
			document.activeElement.getAttribute('tabindex'))
			&& event.clientX !== 0 && event.clientY !== 0 && event.offsetX !== 0 && event.offsetY !== 0) {
			document.activeElement.blur();
		}
	}, true);

	/* loading delayed stuff */
	for (var i = 0; i < dzDelayed.length; i++) {
		dzDelayed[i]();
	};
});