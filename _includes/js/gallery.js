$.fn.dzGallery = function () {
	this.each(function() {
		var _this = this,
			gallery = {
				slides: [],
				captions: [],
				self: _this
			},
			speed = 300,
			slideWidth,
			activeSlide,
			galleryBlock = $(this),
			captionBlock,
			slideBlock,
			imgs = galleryBlock.find('img');

		function changeActiveSlide(n) {
			console.log(n);
			if (!gallery.slides[n]) return;

			if (activeSlide !== undefined) {
				for (var i in gallery.captions) {
					gallery.captions[i].className = '';
				}
			}

			gallery.captions[n].className = 'active';

			slideBlock.style.webkitTransform = 'translate(-' + slideWidth*n + '%,0)' + 'translateZ(0)';
			slideBlock.style.msTransform = 
			slideBlock.style.MozTransform = 
			slideBlock.style.OTransform = 'translateX(-' + slideWidth*n + '%)';

			activeSlide = n;
		}

		/*function refreshStatus() {
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
		}*/

		/*function watch() {
			$(window).on('resize orientationchange', function() {
				refreshStatus();
			});

			imgs.each(function() {
				$(this).on('load', function() {
					refreshStatus();
				});
			});

			refreshStatus();
		}*/

		function newTouch() {
			slideBlock.addEventListener('touchstart', start, false);
			slideBlock.addEventListener('touchmove', move, false);
			slideBlock.addEventListener('touchend', end, false);
		}

		function touchScroll() {
			function animate(block, speed, fallback) {
				var distance = window.innerWidth;
				var time = distance/speed;

				block.css('-webkit-transition', '-webkit-transform linear '+time/1000+'s, opacity linear '+time/1000+'s');
				block.css({
					'-webkit-transform': 'translate3d(-960px,0,0)',
					'opacity': '0'
				});

				setTimeout(function() {
					block.css({
						'-webkit-transform': '',
						'-webkit-transition': '',
						'opacity': ''
					});

					fallback();
				}, time);
			}

			if(Modernizr.touch) {
				var scrollStartPosX = 0,
					scrollStartPosY = 0,
					scrollLastPosX = 0,
					scrollLastPosY = 0,
					x,
					y,
					lastTime,
					timeDif;

				galleryBlock.on('touchstart', function(e) {
					e.preventDefault();

					scrollStartPosX = e.originalEvent.touches[0].clientX;
					scrollStartPosY = e.originalEvent.touches[0].clientY;
					scrollLastPosX = e.originalEvent.touches[0].clientX;
					scrollLastPosY = e.originalEvent.touches[0].clientY;

					lastTime = new Date();
				});

				galleryBlock.on('touchmove', function(e) {
					e.preventDefault();

					var diffX = e.originalEvent.touches[0].clientX - scrollStartPosX;

					x = scrollLastPosX - e.originalEvent.touches[0].clientX;
					y = scrollLastPosY - e.originalEvent.touches[0].clientY;

					scrollLastPosX = e.originalEvent.touches[0].clientX;
					scrollLastPosY = e.originalEvent.touches[0].clientY;

					gallery[activeSlide].slide.css({
						'-webkit-transform': 'translate3d('+diffX+'px,0,0)'
					});

					timeDif = (new Date()).getTime() - lastTime.getTime();
					lastTime = new Date();
				});

				galleryBlock.on('touchend', function(e) {
					e.preventDefault();

					console.log(e);

					var	xMod = (x<0?-x:x),
						yMod = (y<0?-y:y),
						speed = xMod/timeDif;

					console.log(x);
					console.log(speed);

					if (xMod > yMod) {
						if (x>0) {
							animate(gallery[activeSlide].slide, speed, function() {
								changeActiveSlide(activeSlide+1);
							});
						}
						else {
							animate(gallery[activeSlide].slide, speed, function() {
								changeActiveSlide(activeSlide-1);
							});	
						}
					}
				});
			}
		}

		function setup() {
			captionBlock = document.createElement('div');
			captionBlock.className = 'captions';

			slideBlock = document.createElement('div');
			slideBlock.className = 'slides';

			galleryBlock.children().each(function() {
				var slide = this,
					captionText = $(slide).find('figcaption').text(),
					n = gallery.slides.length;

				gallery.slides.push(slide);

				var caption = document.createElement('span');
				caption.innerHTML = '<span>'+captionText+'</span>';
				caption.addEventListener('click', function() {changeActiveSlide(n);}, false);

				gallery.captions.push(caption);
			});

			slideWidth = 100/gallery.slides.length;

			slideBlock.style.width = gallery.slides.length*100+'%';
			slideBlock.style.webkitTransitionDuration = 
			slideBlock.style.MozTransitionDuration = 
			slideBlock.style.msTransitionDuration = 
			slideBlock.style.OTransitionDuration = 
			slideBlock.style.transitionDuration = speed + 'ms';

			for (var i in gallery.slides) {
				slideBlock.appendChild(gallery.slides[i]);
				gallery.slides[i].style.width = slideWidth+'%';
				captionBlock.appendChild(gallery.captions[i]);
			}

			gallery.self.appendChild(captionBlock);
			gallery.self.appendChild(slideBlock);

			changeActiveSlide(0);

			galleryBlock.addClass('active');
		}

		setup();

		//touchScroll();

		Modernizr.csstransforms && Modernizr.touch && newTouch();
	});
};