$(function() {


	$('.js-peppermint').Peppermint({
		bullets: true,
		slideshow: false
	});
	$('.js-gallery').dzGallery();
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

	/* loading delayed stuff */
	for (var i = 0; i < dzDelayed.length; i++) {
		dzDelayed[i]();
	};
	

	{% if site.dev %}
		console.log(Pixelizr.run());
	{% endif %}
});