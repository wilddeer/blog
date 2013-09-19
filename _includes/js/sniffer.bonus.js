(function() {
	var tag = document.getElementsByTagName('html')[0];

	if (Sniffer.os.name == 'winphone' && Sniffer.browser.name == 'ie' && Sniffer.browser.version < 10) {
		/* font-face false-positive on WP7 */
		tag.className = tag.className.replace('fontface','no-fontface');
	}
	else if (Sniffer.os.name != 'kindle' && navigator.userAgent.indexOf('armv7l') != -1 && navigator.userAgent.indexOf('X11') != -1) {
		tag.className += ' kindle bw';
		Sniffer.os.name = 'kindle';
		Sniffer.os.version = 4;
		Sniffer.features.bw = true;
	}
})();