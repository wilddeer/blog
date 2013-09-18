$(document).ready(function() {
	
	$('.js-gallery').dzGallery();
	$('pre').dzScrollFallback();

	/* OH MY GLOBE WHAT AM I DOIN */
	if (Sniffer.os.name == 'kindle' && Sniffer.os.version < 4) {
		$('a').each(function() {
			$(this).html('<span>'+$(this).html()+'</span>');
		});

		$('a').css('color', 'transparent');
		$('a > span').css({
			'color': 'black',
			'border-bottom': '2px solid'
		});
	}


	{% if site.dev %}
		console.log(Pixelizr.run());
	{% endif %}
});