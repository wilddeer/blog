$.fn.steamWishlistBlock = function(callbacks) {
	$(this).each(function() {
		var _this = $(this),
			addForm = _this.find('.js-add-to-wishlist-form'),
			removeForm = _this.find('.js-remove-from-wishlist-form'),
			whishlistedClass = 'game-in-whishlist';

		addForm.steamAjaxForm({
			success: function() {
				steamEvents.invoke('gameAddedToWishlist');
			}
		});

		removeForm.steamAjaxForm({
			success: function() {
				steamEvents.invoke('gameRemovedFromWishlist');
			}
		});

		steamEvents.subscribe('gameAddedToWishlist', function() {
			_this.addClass(whishlistedClass);
		});

		steamEvents.subscribe('gameRemovedFromWishlist', function() {
			_this.removeClass(whishlistedClass);
		});
	});

	return this;
};