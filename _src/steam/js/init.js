$(function() {
	var body = $('body');

	/* init the gallery */
	$('.js-peppermint').steamGallery();

	/* ajax froms */
	$('.js-form').steamAjaxForm();

	/* wishlist buttons */
	$('.js-game-share').steamAddToWishlist();

	/* add to cart buttons */
	$('.js-game-buy').steamAddToCart();

	/* prevent focus*/
	addEvent(body[0], 'click', function(event) {
		if ((document.activeElement.tagName == 'BUTTON' ||
			document.activeElement.getAttribute('tabindex'))
			&& event.clientX !== 0 && event.clientY !== 0 && event.offsetX !== 0 && event.offsetY !== 0) {
			document.activeElement.blur();
		}
	}, true);

	/* collapser */
	$('.user-review .review-text').collapser(320);
	$('.game-description .description-text').collapser(450);

});