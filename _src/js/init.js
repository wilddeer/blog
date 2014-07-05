$(function() {
    var bodyElement = $('body');

	$('.js-peppermint').Peppermint({
		dots: true,
		mouseDrag: true
	});

    $('.sticky').Stickyfill();
	
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

	/* prevent outline after mouse clicks */  
    bodyElement.on('mousedown', function(event) {
        setTimeout(function() {
            var activeElement = document.activeElement;

            if (activeElement && activeElement !== bodyElement[0]) {
                $(activeElement).addClass('is-mouse-clicked').one('blur', function(){
                    $(activeElement).removeClass('is-mouse-clicked');
                });
            }
        }, 0);
    });

	/* loading delayed stuff */
	for (var i = 0; i < dzDelayed.length; i++) {
		dzDelayed[i]();
	};
});
