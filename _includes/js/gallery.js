$.fn.dzGallery = function () {
	this.each(function() {
		var _this = this,
			gallery = [],
			activeSlide,
			captionBlock = $('<div class="captions"></div>'),
			galleryBlock = $(this),
			galleryActive = false,
			widthThreshold = 0,
			imgs = galleryBlock.find('img');

		function changeActiveSlide(n) {
			if (activeSlide !== undefined) {
				gallery[activeSlide].slide.removeClass('active');
				gallery[activeSlide].caption.removeClass('active');
			}

			gallery[n].slide.addClass('active');
			gallery[n].caption.addClass('active');

			activeSlide = n;
		}

		function refreshStatus() {
			function widthCheck() {
				if (_this.scrollWidth > _this.offsetWidth) {
					console.log(window.innerWidth);
					if (window.innerWidth > widthThreshold) widthThreshold = window.innerWidth;
					galleryBlock.addClass('active');
					galleryActive = true;
				}
				else {
					galleryActive = false;
				}
			}

			if (!galleryActive) {
				widthCheck();
			}
			else if (window.innerWidth > widthThreshold) {
				galleryBlock.removeClass('active');
				widthCheck();
			}
		}

		galleryBlock.children().each(function() {
			var slide = $(this),
				captionText = slide.find('figcaption').text(),
				n = gallery.length;

			gallery.push({
				'slide': slide,
				'caption': $('<span><span>' + captionText + '</span></span>').on('click', function() {
					changeActiveSlide(n);
				})
			});
		});

		$.each(gallery, function(i) {
			this.caption.appendTo(captionBlock);
		});

		captionBlock.prependTo(galleryBlock);

		changeActiveSlide(0);

		$(window).on('resize orientationchange', function() {
			refreshStatus();
		});

		imgs.each(function() {
			$(this).on('load', function() {
				refreshStatus();
			});
		});

		refreshStatus();
	});
};