$.fn.collapser = function(maxHeight) {
	$(this).each(function() {
		var _this = $(this),
			expander = _this.next().find('.expand-button');

		if (this.offsetHeight > maxHeight && expander.length) {
			_this.addClass('collapsed');
			
			expander.on('click', function() {
				_this.removeClass('collapsed');
			});
		}
	});

	return this;
};