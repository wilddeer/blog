$(function() {
	
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

	/* loading delayed stuff */
	for (var i = 0; i < dzDelayed.length; i++) {
		dzDelayed[i]();
	};

	/* google analytics */
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-44217538-1', 'dizaina.net');
	ga('send', 'pageview');


	{% if site.dev %}
		console.log(Pixelizr.run());
	{% endif %}
});