$.fn.steamAddToCart = function() {
	$(this).each(function() {
		var _this = $(this),
			gameId = _this.attr('data-id') || '',
			addForm = _this.find('.js-add-to-cart-form'),
			addButton = addForm.find('.js-add-to-cart'),
			whishlistedClass = 'game-in-cart';

		addForm.steamAjaxForm({
			success: function() {
				steamEvents.invoke('gameAddedToCart'+gameId);
			}
		});

		steamEvents.subscribe('gameAddedToCart'+gameId, function() {
			_this.addClass(whishlistedClass);
			addButton.attr('disabled', 'disabled');
		});
	});

	return this;
};