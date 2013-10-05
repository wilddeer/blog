(function() {
	var tag = document.getElementsByTagName('html')[0];

	if ((Sniffer.os.name == 'winphone' && Sniffer.browser.name == 'ie' && Sniffer.browser.version < 10) ||
		(Sniffer.browser.name == 'ovi')) {
		/* font-face false-positives on WP7 and Ovi */
		tag.className = tag.className.replace('fontface','no-fontface');
		Modernizr.fontface = false;
	}
	else if (Sniffer.os.name != 'kindle' && navigator.userAgent.indexOf('armv7l') != -1 && navigator.userAgent.indexOf('X11') != -1) {
		tag.className += ' kindle bw';
		Sniffer.os.name = 'kindle';
		Sniffer.os.version = 4;
		Sniffer.features.bw = true;
	}
})();