$.fn.collapser = function(maxHeight) {
	$(this).each(function() {
		var _this = $(this),
			expander = $(this).next();

		if (this.offsetHeight > maxHeight && expander.hasClass('expand')) {
			_this.addClass('collapsed');
			
			expander.on('click', function() {
				_this.removeClass('collapsed');
			});
		}
	});

	return this;
}