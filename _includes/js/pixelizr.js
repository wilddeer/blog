var Pixelizr = {
	o: {
		dev: false,
		scope: '*',
		em: false,
		ident: '	',
		linebreaks: true,
		comments: true,
		props:
		[
			'paddingLeft',
			'paddingRight',
			'paddingTop',
			'paddingBottom',
			'marginLeft',
			'marginRight',
			'marginTop',
			'marginBottom',
			'width',
			'height',
			'bottom',
			'top',
			'left',
			'right',
			'fontSize',
			'lineHeight',
			'maxHeight',
			'maxWidth',
			'borderRadius'
		],
		addProps: [],
		keepZeros: false
	},

	run: function(options) {
		if (!window.jQuery) {
			console.warn('Pixelizr depends on jQuery!');
			return;
		}

		if (!window.getMatchedCSSRules) {
			console.warn('Pixelizr only works in Chrome!');
			return;
		}

		options && Pixelizr.applyOptions(options);

		Pixelizr.makeStyle();

		return Pixelizr.makeSheet();
	},

	applyOptions: function(options) {
		var o = Pixelizr.o;

		o = $.extend(o, options);
		o.props = o.props.concat(o.addProps || []);
	},

	makeStyle: function() {
		var o = Pixelizr.o,
			searchString = o.em?'em':'rem';

		$(o.scope).each(function() {
			var _this = $(this);
			var rules = window.getMatchedCSSRules(_this[0]);

			for (var i = rules.length - 1; i >= 0; i--) {
				var modifiedProps = {};

				if (!rules[i].style) break;

				for (var j = o.props.length - 1; j >= 0; j--) {
					var value = rules[i].style[o.props[j]];

					if ((value.replace(searchString) != value) && 
						(o.keepZeros || _this.css(o.props[j]) != '0px')) {
						modifiedProps[o.props[j]] = {
							value: _this.css(o.props[j]),
							originalValue: value
						};
					}
				};

				o.dev && console.log(modifiedProps);
				if (!$.isEmptyObject(modifiedProps)) {
					Pixelizr.style[rules[i].selectorText] = $.extend(Pixelizr.style[rules[i].selectorText], modifiedProps);
				}
			};
		});

		o.dev && console.log('makeStyle done');
		return Pixelizr.style;
	},

	makeSheet: function(options) {
		var o = Pixelizr.o,
			rules = [];

		function camelCaseToDashed(string) {
			return string.replace(/([A-Z])/g, function($1){
				return "-" + $1.toLowerCase();
			});
		};

		$.each(Pixelizr.style, function(i) {
			var props = [];

			$.each(this, function(j) {
				props.push(camelCaseToDashed(j) + ': ' + this.value + ';' + (o.comments?' /*' + this.originalValue + '*/':''));
			});
			
			if (o.linebreaks) {
				rules.push(i + ' {\n' + o.ident + props.join('\n'+o.ident) + '\n}');
			}
			else {
				rules.push(i + ' {' + props.join(' ') + '}');
			}
		});

		o.dev && console.log('makeSheet done');

		return Pixelizr.sheet = rules.join(o.linebreaks?'\n\n':' ');
	},

	applyStyle: function() {
		var sheet = Pixelizr.makeSheet({
			important: false,
			save: false
		});

		Pixelizr.styleSheet = $('<style>' + sheet + '</style>').appendTo('body');
	},

	removeStyle: function() {
		if (Pixelizr.styleSheet) {
			Pixelizr.styleSheet.remove();
			delete Pixelizr.styleSheet;
		}
	},

	style: {},
	sheet: ''
};