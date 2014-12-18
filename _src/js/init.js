$(function() {
    var bodyElement = $('body');

	$('.js-peppermint').Peppermint({
		dots: true,
		mouseDrag: true
	});

    $('.sticky').Stickyfill();

	$('pre').dzScrollFallback();

    $('.js-demo-frame').demoFrame();

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
    (function() {
        var mouseFocusedClass = 'is-mouse-focused';

        $(document.body).on('mousedown', function(event) {
            setTimeout(function() {
                //find focused element
                var activeElement = document.activeElement,
                    $activeElement = $(activeElement);

                //if found and it's not body...
                if (activeElement && activeElement !== document.body) {
                    //add special class, remove it after `blur`
                    $activeElement.addClass(mouseFocusedClass).one('blur', function() {
                        $activeElement.removeClass(mouseFocusedClass);
                    });
                }
            }, 0);
        });
    })();

	/* loading delayed stuff */
	for (var i = 0; i < dzDelayed.length; i++) {
		dzDelayed[i]();
	};
});
