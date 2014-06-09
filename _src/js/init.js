$(function() {

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
    $('body').on('mouseup', function(event) {
        setTimeout(function() {
            var activeElement = document.activeElement;

            if ((activeElement.tagName == 'BUTTON' ||
            (activeElement.tagName == 'INPUT' &&  activeElement.getAttribute('type') == 'checkbox') ||
            activeElement.getAttribute('tabindex'))) {
                $(activeElement).addClass('is-mouse-clicked').on('blur', function(){
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
