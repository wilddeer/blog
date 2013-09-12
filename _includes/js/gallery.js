$.fn.dzGallery = function () {
	this.each(function() {
		var _this = this,
			gallery = {
				slides: [],
				captions: [],
				self: _this,
				width: _this.offsetWidth
			},
			speed = 300,
			flickTime = 250,
			slideWidth,
			activeSlide,
			captionBlock,
			slideBlock;

		function changeActiveSlide(n) {
			if (!gallery.slides[n]) n = activeSlide;

			if (n !== activeSlide) {
				if (activeSlide !== undefined) {
					for (var i in gallery.captions) {
						gallery.captions[i].className = '';
					}
				}

				gallery.captions[n].className = 'active';
			}

			changePos(-n*gallery.width, speed);

			activeSlide = n;
		}

		function changePos(pos, speed) {
			var time = speed?speed+'ms':'';

			slideBlock.style.webkitTransitionDuration = 
			slideBlock.style.MozTransitionDuration = 
			slideBlock.style.msTransitionDuration = 
			slideBlock.style.OTransitionDuration = 
			slideBlock.style.transitionDuration = time;

			slideBlock.style.webkitTransform = 'translate('+pos+'px,0)' + 'translateZ(0)';
			slideBlock.style.msTransform = 
			slideBlock.style.MozTransform = 
			slideBlock.style.OTransform = 
			slideBlock.style.transform = 'translateX('+pos+'px)';
		}

		function touchInit() {
			var start = {},
				diff = {},
				isScrolling,
				p = false,
				touchInProgress = false,
				tEvents = {
					start: 'touchstart',
					move: 'touchmove',
					end: 'touchend',
					cancel: 'touchcancel'
				};

			if (window.navigator.msPointerEnabled) {
				p=true;

				tEvents = {
					start: 'MSPointerDown',
					move: 'MSPointerMove',
					end: 'MSPointerUp',
					cancel: 'MSPointerCancel'
				};
			}

			function tStart(event) {
				if (window.navigator.msPointerEnabled
					&& (!event.isPrimary || event.pointerType !== event.MSPOINTER_TYPE_TOUCH)) return;

				start = {
					x: (p?event.clientX:event.touches[0].clientX),
					y: (p?event.clientY:event.touches[0].clientY),

					time: +new Date
				};
				
				isScrolling = undefined;

				diff = {};

				if (p) touchInProgress = true;
			}

			function tMove(event) {
				if (((event.touches && event.touches.length > 1) || (event.scale && event.scale !== 1)) ||
					(window.navigator.msPointerEnabled && (!event.isPrimary || !touchInProgress))) return;

				diff = {
					x: (p? event.clientX : event.touches[0].clientX) - start.x,
					y: (p? event.clientY : event.touches[0].clientY) - start.y
				}

				if (isScrolling === undefined) {
					isScrolling = (Math.abs(diff.x) < Math.abs(diff.y));
				}

				if (isScrolling) return;

				event.preventDefault();

				diff.x = 
				diff.x / 
					(
						(!activeSlide && diff.x > 0
						|| activeSlide == gallery.slides.length - 1 && diff.x < 0)
						?                      
						(Math.abs(diff.x)/gallery.width*2 + 1)
						:
						1
					);
				
				changePos(diff.x - gallery.width*activeSlide);
			}

			function tEnd(event) {
				if (isScrolling ||
					(window.navigator.msPointerEnabled && !event.isPrimary)) return;

				var duration = Number(+new Date - start.time);

				if ((duration < flickTime && Math.abs(diff.x) > 20)
					|| (Math.abs(diff.x) > gallery.width/3)) {

					if (diff.x < 0) {
						changeActiveSlide(activeSlide+1);		
					}
					else {
						changeActiveSlide(activeSlide-1);		
					}

				}
				else {
					changeActiveSlide(activeSlide);
				}

				if (p) {
					if (diff.x === undefined) {
						touchInProgress = false;
					}
					else {
						setTimeout(function() {
							touchInProgress = false;
						}, 10)
					}
				}
			}

			slideBlock.addEventListener(tEvents.start, tStart, false);
			slideBlock.addEventListener(tEvents.move, tMove, false);
			slideBlock.addEventListener(tEvents.end, tEnd, false);
			slideBlock.addEventListener(tEvents.cancel, tEnd, false);

			if (p) {
				slideBlock.addEventListener('click', function(event) {
					touchInProgress && event.preventDefault();
				}, false);
			}
		}
		function onWidthChange() {
			gallery.width = gallery.self.offsetWidth;
			changePos(-activeSlide*gallery.width);
		}

		function setup() {
			captionBlock = document.createElement('div');
			captionBlock.className = 'captions';

			slideBlock = document.createElement('div');
			slideBlock.className = 'slides';

			for (var i = 0; i <= gallery.self.children.length - 1; i++) {
				var slide = gallery.self.children[i],
					caption = document.createElement('span'),
					captionText = slide.getElementsByTagName('figcaption')[0].innerText,
					n = gallery.slides.length;

				gallery.slides.push(slide);

				caption.innerHTML = '<span>'+captionText+'</span>';
				caption.addEventListener('click', function(x) {
					return function() {changeActiveSlide(x);}
				}(n), false);

				gallery.captions.push(caption);
			}

			slideWidth = 100/gallery.slides.length;

			slideBlock.style.width = gallery.slides.length*100+'%';

			for (var i in gallery.slides) {
				slideBlock.appendChild(gallery.slides[i]);
				gallery.slides[i].style.width = slideWidth+'%';
				captionBlock.appendChild(gallery.captions[i]);
			}

			gallery.self.appendChild(captionBlock);
			gallery.self.appendChild(slideBlock);

			changeActiveSlide(0);

			gallery.self.className += ' active';

			window.addEventListener('resize', onWidthChange, false);
			window.addEventListener('orientationchange', onWidthChange, false);
		}

		setup();

		Modernizr.csstransforms && (Modernizr.touch || window.navigator.msPointerEnabled) && touchInit();
	});
};