$(document).ready(function() {
	
	$('.js-gallery').dzGallery();
	{% if site.dev %}
		console.log(Pixelizr.run());
	{% endif %}
});