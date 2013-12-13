$.fn.steamAjaxForm = function(callbacks) {
	callbacks = $.extend({}, callbacks);

	$(this).on('submit', function() {
		/* ajax here */

		/* fake data */
		data = {
			totalVoted: 150,
			foundHelpful: 122,
			foundHelpfulPercent: 81
		};
		
		callbacks.success && callbacks.success(data);
		return false;
	});

	return this;
};