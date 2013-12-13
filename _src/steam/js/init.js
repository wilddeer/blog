$(function() {
	/* init the gallery */
	$('.js-peppermint').steamGallery();

	/* ajax froms */
	$('.js-form').steamAjaxForm();

	/* wishlist buttons */
	$('.js-add-to-wishlist-area').steamAddToWishlist();

	/* add to cart buttons */
	$('.js-add-to-cart-area').steamAddToCart();

	/* user reviews */
	$('.js-user-review').steamUserReview();

	/* collapser */
	$('.user-review .review-text').collapser(320);
	$('.game-description .description-text').collapser(450);

	/* prevent focus after clicks */
	addEvent(document.getElementsByTagName('body')[0], 'click', function(event) {
		if ((document.activeElement.tagName == 'BUTTON' ||
			document.activeElement.getAttribute('tabindex'))
			&& event.clientX !== 0 && event.clientY !== 0 && event.offsetX !== 0 && event.offsetY !== 0) {
			document.activeElement.blur();
		}
	}, true);

});