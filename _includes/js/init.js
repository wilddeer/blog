$(document).ready(function() {
	
	$('.js-gallery').dzGallery();
	$('pre').dzScrollFallback();


	{% if site.dev %}
		console.log(Pixelizr.run());
	{% endif %}
});