function Slime(_this, options) {
	var o = options || {},
		transitionSpeed = 300,
		contentBlock,
		contentWidth,
		slimeWidth,
		positionMin,
		currentPosition = 0;

	o.cssPrefix = o.cssPrefix || '';

	var classes = {
		inactive: o.cssPrefix + 'inactive',
		active: o.cssPrefix + 'active',
		drag: o.cssPrefix + 'drag',
		scroller: o.cssPrefix + 'scroller'
	};

	// feature detects
	var support = {
		transforms: testProp('transform'),
		transitions: testProp('transition')
	};

	function testProp(prop) {
		var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
			block = document.createElement('div');

		if (block.style[prop] !== undefined) return true;

		prop = prop.charAt(0).toUpperCase() + prop.slice(1);
		for (var i in prefixes) {
			if (block.style[prefixes[i]+prop] !== undefined) return true;
		}

		return false;
	}

	function addEvent(el, event, func, bool) {
		if (!event) return;

		el.addEventListener? el.addEventListener(event, func, !!bool): el.attachEvent('on'+event, func);
	}

	function addClass(el, cl) {
		if ((' ' + el.className + ' ').indexOf(' ' + cl + ' ') === -1) {
			el.className = (el.className + ' ' + cl).replace(/^\s+|\s+$/g, '');
		}
	}

	function removeClass(el, cl) {
		el.className = (' ' + el.className + ' ').replace(' ' + cl + ' ', ' ').replace(/^\s+|\s+$/g, '');
	}

	//changes the position of the slider (in px) with a given speed (in ms)
	function changePos(pos, speed) {
		var time = speed?speed+'ms':'';

		contentBlock.style.webkitTransitionDuration = 
		contentBlock.style.MozTransitionDuration = 
		contentBlock.style.msTransitionDuration = 
		contentBlock.style.OTransitionDuration = 
		contentBlock.style.transitionDuration = time;

		setPos(pos);
	}

	//fallback to `setInterval` animation for UAs with no CSS transitions
	function changePosFallback(pos, speed) {
		animationTimer && clearInterval(animationTimer);

		if (!speed) {
			setPos(pos);
			return;
		}

		var startTime = +new Date,
			startPos = currentPosition;

		animationTimer = setInterval(function() {
			//rough bezier emulation
			var diff, y,
				elapsed = +new Date - startTime,
				f = elapsed / speed,
				bezier = [0, 0.7, 1, 1];

			function getPoint(p1, p2) {
				return (p2-p1)*f + p1;
			}
			
			if (f >= 1) {
				setPos(pos);
				clearInterval(animationTimer);
				return;
			}
		
			diff = pos - startPos;

			y = getPoint(
					getPoint(getPoint(bezier[0], bezier[1]), getPoint(bezier[1], bezier[2])),
					getPoint(getPoint(bezier[1], bezier[2]), getPoint(bezier[2], bezier[3]))
					);

			setPos(Math.floor(y*diff + startPos));
	    }, 15);
	}

	//sets the position of the slider (in px)
	function setPos(pos) {
		contentBlock.style.webkitTransform = 'translate('+pos+'px,0) translateZ(0)';
		contentBlock.style.msTransform = 
		contentBlock.style.MozTransform = 
		contentBlock.style.OTransform = 
		contentBlock.style.transform = 'translateX('+pos+'px)';

		currentPosition = pos;
	}

	//`setPos` fallback for UAs with no CSS transforms support
	function setPosFallback(pos) {
		contentBlock.style.left = pos+'px';

		currentPosition = pos;
	}

	//init touch events
	function touchInit() {
		var startPosition;

		eventBurrito(_this, {
			start: function(event, start) {
				//firefox doesn't want to apply the cursor from `:active` CSS rule, have to add a class :-/
				addClass(_this, classes.drag);
				startPosition = currentPosition;
			},
			move: function(event, start, diff) {
				var linearPosition = startPosition + diff.x,
					overlap = Math.max(linearPosition, 0) || Math.min((linearPosition - positionMin), 0);

				diff.x -= overlap - overlap / (Math.abs(overlap)/slimeWidth*2 + 1);

				//change the position of the slider appropriately
				changePos(startPosition + diff.x);
			},
			end: function(event, start, diff) {
				if (diff.x) {
					if (currentPosition > 0) {
						changePos(0, transitionSpeed);
					}
					else if (currentPosition < positionMin) {
						changePos(positionMin, transitionSpeed);
					}
					/*var duration = Number(+new Date - start.time), //duration of the touch move
						ratio = Math.abs(diff.x)/slider.width,
						//How many slides to skip. Remainder > 0.25 counts for one slide.
						skip = Math.floor(ratio) + (ratio - Math.floor(ratio) > 0.25?1:0),
						//Super duper formula to detect a flick.
						//First, it's got to be fast enough.
						//Second, if `skip==0`, 20px move is enough to switch to the next slide.
						//If `skip>0`, it's enough to slide to the middle of the slide minus `slider.width/9` to skip even further.
						flick = duration < flickThreshold+flickThreshold*skip/1.8 && Math.abs(diff.x) - skip*slider.width > (skip?-slider.width/9:20);

					skip += (flick?1:0);

					if (diff.x < 0) {
						changeActiveSlide(activeSlide+skip, o.touchSpeed);
					}
					else {
						changeActiveSlide(activeSlide-skip, o.touchSpeed);	
					}

					o.stopSlideshowAfterInteraction && stopSlideshow();*/
				}

				//remove the drag class
				removeClass(_this, classes.drag);
			}
		});
	}

	function getWidths() {
		slimeWidth = _this.offsetWidth;
		contentWidth = contentBlock.scrollWidth;
		positionMin = slimeWidth - contentWidth;
	}

	function setup() {
		//If the UA doesn't support css transforms or transitions -- use fallback functions.
		//Separate functions instead of checks for better performance.
		if (!support.transforms || !!window.opera) setPos = setPosFallback;
		if (!support.transitions) changePos = changePosFallback;

		contentBlock = _this.children[0];

		/* set classes */
		addClass(contentBlock, classes.scroller);
		addClass(_this, classes.active);
		removeClass(_this, classes.inactive);

		/* get widths */
		getWidths();

		/* init touch events */
		touchInit();

		/* watch for width changes */
		addEvent(window, 'resize', getWidths);
		addEvent(window, 'orientationchange', getWidths);
	}

	setup();
}