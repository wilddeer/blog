(function() {
	var tag = document.getElementsByTagName('html')[0];

	if ((Sniff.os.name == 'winphone' && Sniff.browser.name == 'ie' && Sniff.browser.majorVersion && Sniff.browser.majorVersion < 10) ||
		(Sniff.browser.name == 'ovi') ||
		(Sniff.os.name == '3ds')) {
		/* font-face false-positives on WP7, 3ds and Ovi */
		tag.className = tag.className.replace('fontface','no-fontface');
		Modernizr.fontface = false;
	}
	else if (Sniff.os.name != 'kindle' && Sniff.browser.engine == 'webkit' && navigator.userAgent.indexOf('armv7l') != -1 && navigator.userAgent.indexOf('X11') != -1) {
		tag.className += ' kindle bw';
		Sniff.os.name = 'kindle';
		Sniff.os.version = 4;
		Sniff.features.bw = true;
	}
})();
