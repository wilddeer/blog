Modernizr.addTest('pointerevents', function () {
	// Cannot use `.prefixed()` for events, so test each prefix
	var bool = false,
		i = Modernizr._domPrefixes.length;

	// Don't forget un-prefixed...
	bool = Modernizr.hasEvent('pointerdown');

	while (i-- && !bool) {
		if (Modernizr.hasEvent(Modernizr._domPrefixes[i] + 'pointerdown')) {
			bool = true;
		}
	}
	return bool;
});