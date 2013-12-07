function Slime(_this, options) {
	var noop = function() {},
		o = options || {},
		transitionSpeed = 300,
		animationTimer,
		contentBlock,
		contentWidth,
		slimeWidth,
		positionMin,
		burrito,
		currentPosition = 0;

	o.cssPrefix = o.cssPrefix || '';
	o.borderPadding = o.borderPadding || 24;
	o.onClick = o.onClick || noop;

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

		setPos(Math.floor(pos));
	}

	//fallback to `setInterval` animation for UAs with no CSS transitions
	function changePosFallback(pos, speed) {
		pos = Math.floor(pos);

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

	function scrollTo(pos) {
		if (pos > 0) {
			pos = 0;
		}
		else if (pos < positionMin) {
			pos = positionMin;
		}

		changePos(pos, transitionSpeed);
	}

	function scrollToElement(element) {
		scrollTo(-element.offsetLeft);
	}

	function moveElementToViewport(element, padding) {
		var pos = -element.offsetLeft + (padding || o.borderPadding),
			width = element.offsetWidth + 2*(padding || o.borderPadding);

		if (currentPosition < pos) {
			scrollTo(pos);	
		}
		else if (currentPosition - slimeWidth > pos - width) {
			scrollTo(pos - width + slimeWidth);
		}
	}

	//init touch events
	function touchInit() {
		var startPosition;

		burrito = eventBurrito(_this, {
			clickTolerance: 5,
			start: function(event, start) {
				//firefox doesn't want to apply the cursor from `:active` CSS rule, have to add a class :-/
				addClass(_this, classes.drag);
				startPosition = currentPosition;
			},
			move: function(event, start, diff, speed) {
				var linearPosition = startPosition + diff.x,
					overlap = Math.max(linearPosition, 0) || Math.min((linearPosition - positionMin), 0);

				if (Math.abs(diff.x) < 6 && diff.time < 150) return;

				diff.x -= overlap - overlap / (Math.abs(overlap)/slimeWidth*2 + 1);

				//change the position of the slider appropriately
				changePos(startPosition + diff.x);
			},
			end: function(event, start, diff, speed) {
				//remove the drag class
				removeClass(_this, classes.drag);

				if (Math.abs(diff.x) < 6 && diff.time < 150) return;

				if (Math.abs(speed.x) < 0.5) speed.x /= 2;

				speed.x /= 2;

				var posDiff = speed.x*Math.pow(Math.abs(speed.x), 0.5)*transitionSpeed/1.5;
				var targetPosition = currentPosition + posDiff;

				var targetOverlap = Math.abs(Math.max(targetPosition, 0) || Math.min((targetPosition - positionMin), 0));
				var overlap = Math.min(targetOverlap / 5, 150);
				var overlapDiff = targetOverlap - overlap;
				var targetSpeed = Math.max(0, transitionSpeed - (overlapDiff / (Math.abs(posDiff) + 1))*transitionSpeed);

				if (targetPosition > 0) {
					targetSpeed && changePos(overlap, targetSpeed);
					setTimeout(function() {
						changePos(0, transitionSpeed);
					}, targetSpeed);
				}
				else if (targetPosition < positionMin) {
					targetSpeed && changePos(positionMin - overlap, targetSpeed);
					setTimeout(function() {
						changePos(positionMin, transitionSpeed);
					}, targetSpeed);
				}
				else {
					changePos(targetPosition, transitionSpeed);
				}
			},
			click: function(event) {
				o.onClick(event);
			}
		});
	}

	function getWidths() {
		slimeWidth = _this.offsetWidth;
		contentWidth = _this.scrollWidth;
		positionMin = slimeWidth - contentWidth;
	}

	function setup() {
		//If the UA doesn't support css transforms or transitions -- use fallback functions.
		//Separate functions instead of checks for better performance.
		if (!support.transforms || !!window.opera) setPos = setPosFallback;
		if (!support.transitions || !!window.opera) changePos = changePosFallback;

		contentBlock = _this.children[0];

		addEvent(_this, 'focus', _this.onfocusin = function(event) {
			_this.scrollLeft = 0;
			setTimeout(function() {
				_this.scrollLeft = 0;
			}, 0);
			event.target && moveElementToViewport(event.target);
		}, true);

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

	return {
		getClicksAllowed: function() {
			return burrito.getClicksAllowed();
		},

		scrollTo: scrollTo,

		scrollToElement: scrollToElement,

		moveElementToViewport: moveElementToViewport
	}
}