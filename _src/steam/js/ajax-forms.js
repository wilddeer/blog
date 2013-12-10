$.fn.steamAjaxForm = function(callbacks) {
	callbacks = $.extend({}, callbacks);

	$(this).on('submit', function() {
		/* ajax here */
		callbacks.success && callbacks.success();
		return false;
	});

	return this;
};