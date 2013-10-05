$.fn.dzScrollFallback = function() {
	if ((Sniffer.os.name == 'android' && 
			((Sniffer.os.version < 3 && Sniffer.browser.engine == 'webkit') ||
			(Sniffer.browser.engine == 'presto' && Sniffer.browser.name == 'opera'))) ||
		(Sniffer.os.name == 'ios' && Sniffer.os.version <= 5 && Sniffer.browser.engine == 'webkit')) {
		this.each(function() {
			var _this = this,
				last = {},
				max,
				isVerticalScrolling;

			function setup() {
				max = {
					x: _this.scrollWidth - _this.clientWidth,
					y: _this.scrollHeight - _this.clientHeight
				};
			}

			setup();

			_this.addEventListener('touchstart', function(event) {
				last = {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY
				};

				isVerticalScrolling = undefined;
			}, false);

			_this.addEventListener('touchmove', function(event) {
				var diff = {
					x: event.touches[0].clientX - last.x,
					y: event.touches[0].clientY - last.y
				};

				last = {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY
				};

				if (isVerticalScrolling === undefined) {
					isVerticalScrolling = Math.abs(diff.x) < Math.abs(diff.y);
				}

				if (isVerticalScrolling) {
					if (
						(_this.scrollTop < max.y && diff.y < 0) ||
						(_this.scrollTop > 0 && diff.y > 0)) {
							_this.scrollTop -= diff.y;
							event.preventDefault();
					}
				}
				else {
					if (
						(_this.scrollLeft < max.x && diff.x < 0) ||
						(_this.scrollLeft > 0 && diff.x > 0)) {
							_this.scrollLeft -= diff.x;
							event.preventDefault();
					}
				}
			}, false);

			window.addEventListener('resize', setup, false);
			window.addEventListener('orientationchange', setup, false);
		});
	}
}