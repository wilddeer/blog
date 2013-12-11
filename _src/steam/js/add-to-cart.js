$.fn.steamAddToCart = function() {
	$(this).each(function() {
		var _this = $(this),
			gameId = _this.attr('data-game-id') || '',
			addForm = _this.find('.js-add-to-cart-form'),
			whishlistedClass = 'game-in-cart';

		addForm.steamAjaxForm({
			success: function() {
				steamEvents.invoke('gameAddedToCart'+gameId);
			}
		});

		steamEvents.subscribe('gameAddedToCart'+gameId, function() {
			_this.addClass(whishlistedClass);
		});
	});

	return this;
};