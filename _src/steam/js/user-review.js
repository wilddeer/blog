$.fn.steamUserReview = function() {
	$(this).each(function() {
		var _this = $(this),
			yesForm = _this.find('.js-vote-form-yes'),
			noForm = _this.find('.js-vote-form-no'),
			yesButton = yesForm.find('.js-vote-button-yes'),
			noButton = noForm.find('.js-vote-button-no'),
			foundHelpful = _this.find('.js-found-helpful'),
			foundHelpfulPercent = _this.find('.js-found-helpful-percent'),
			totalVoted = _this.find('.js-total');

		yesForm.steamAjaxForm({
			success: function(data) {
				yesButton.addClass('active');
				noButton.removeClass('active');
				refreshStats(data);
			}
		});

		noForm.steamAjaxForm({
			success: function(data) {
				noButton.addClass('active');
				yesButton.removeClass('active');
				refreshStats(data);
			}
		});

		function refreshStats(data) {
			data.foundHelpful && foundHelpful.text(data.foundHelpful);
			data.foundHelpfulPercent && foundHelpfulPercent.text(data.foundHelpfulPercent);
			data.totalVoted && totalVoted.text(data.totalVoted);
		}
	});

	return this;
};