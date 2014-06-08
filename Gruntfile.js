/*global module */
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		concat: {
			options: {
				separator: '\n\n'
			},

			css: {
				files: {
					'css/style.css': [
						'_src/css/font-face.css',
						'_src/css/normalize.css',
						'_src/css/rem-mobile-fallback.css',
						'_src/peppermint/dist/peppermint.suggested.css',
						'_src/css/slime.css',
						'_src/css/main.css',
						'_src/css/phone.css',
						'_src/css/tablet.css',
						'_src/css/desktop.css',
						'_src/css/syntax.css',
						'_src/css/font.css',
						'_src/css/animations.css',
						'_src/css/print.css',
					],

					'temp/ie7.css': [
						'_src/css/ie-font-face.css',
						'_src/css/normalize.css',
						'_src/css/rem-mobile-fallback.css',
						'_src/peppermint/dist/peppermint.suggested.css',
						'_src/css/slime.css',
						'_src/css/main.css',
						'_src/css/phone.css',
						'_src/css/tablet.css',
						'_src/css/desktop.css',
						'_src/css/syntax/syntax.css',
						'_src/css/font.css',
						'_src/css/ie8.css',
						'_src/css/ie7.css',
					],

					'temp/ie8.css': [
						'_src/css/ie-font-face.css',
						'_src/css/normalize.css',
						'_src/css/rem-mobile-fallback.css',
						'_src/peppermint/dist/peppermint.suggested.css',
						'_src/css/slime.css',
						'_src/css/main.css',
						'_src/css/phone.css',
						'_src/css/tablet.css',
						'_src/css/desktop.css',
						'_src/css/syntax/syntax.css',
						'_src/css/font.css',
						'_src/css/ie8.css',
					],

					'css/steam_styles.css': [
						'_src/css/normalize.css',
						'_src/peppermint/dist/peppermint.suggested.css',
						'_src/css/slime.css',
						'_src/steam/css/base.css',
						'_src/steam/css/classes.css',
						'_src/steam/css/modules.css',
						'_src/steam/css/grid.css',
						'_src/steam/css/layout.css',
						'_src/steam/css/page.css',
						'_src/steam/css/sprites.css'
					],
				},
			},

			js: {
				files: {
					'js/scripts.js': [
						'_src/js/jquery-1.10.2.min.js',
						'_src/peppermint/dist/peppermint.min.js',
						'_src/stickyfill/src/stickyfill.js',
						'_src/js/slime.js',
						'_src/js/scroll-fallback.js',
						'_src/js/collapser.js',
						'_src/js/tools.js',
						'_src/js/test-console.js',
						'_src/js/metrika.js',
						'_src/js/init.js',
					],

					'js/header_scripts.js': [
						'_src/js/modernizr.js',
						'_src/js/modernizr.bonus.js',
						'_src/sniffer/sniffer.min.js',
						'_src/js/sniffer.bonus.js',
						'_src/js/head.js',
					],

					'js/selectivizr.min.js': [
						'_src/js/selectivizr.min.js',
					],

					'js/steam_scripts.js': [
						'_src/js/jquery-1.10.2.min.js',
						'_src/steam/js/events.js',
						'_src/peppermint/dist/peppermint.min.js',
						'_src/js/slime.js',
						'_src/steam/js/collapser.js',
						'_src/steam/js/gallery.js',
						'_src/steam/js/ajax-forms.js',
						'_src/steam/js/wishlist.js',
						'_src/steam/js/add-to-cart.js',
						'_src/steam/js/user-review.js',
						'_src/steam/js/tools.js',
						'_src/steam/js/init.js',
					],

					'js/steam_header_scripts.js': [
						'_src/js/modernizr.js',
					],
				},
			},

			cfg: {
				files: {
					'_config.yml': [
						'_src/config.yml',
						'temp/map.yml',
					]
				}
			}
		},

		'comment-media-queries': {
			ie: {
				files: {
					'css/ie7.css': ['temp/ie7.css'],
					'css/ie8.css': ['temp/ie8.css']
				}
			},

			steam: {
				files: {
					'css/steam_ie.css': ['css/steam_styles.css']
				}
			}
		},

		hashify: {
			options: {
				hashmap: '../temp/map.json',
				copy: true
			},
			js: {
				options: {
					basedir: 'js/'
				},
				src: 'js/*.js'
			},
			css: {
				options: {
					basedir: 'css/'
				},
				src: 'css/*.css'
			},
			/*steam: {
				options: {
					basedir: '',
					hashmap: 'temp/map.json'
				},
				src: [
					'steam/css/styles.css',
					'steam/css/ie.css',
					'steam/js/scripts.js'
				]
			}*/
		},

		convert: {
			json2yaml: {
				src: ['temp/map.json'],
				dest: 'temp/map.yml'
			}
		},

		watch: {
			files: ['_src/**/*.js','_src/**/*.css'],
			tasks: ['build']
		},
	});

	// build
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-hashify');
	grunt.loadNpmTasks('grunt-comment-media-queries');
	grunt.loadNpmTasks('grunt-convert');

	grunt.registerTask('build', ['concat:css', 'concat:js', 'comment-media-queries', 'hashify', 'convert', 'concat:cfg']);
	grunt.registerTask('w', ['build', 'watch']);
	grunt.registerTask('default', 'build');
};
