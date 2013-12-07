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
						'_src/css/boilerplate.css',
						'_src/css/rem-mobile-fallback.css',
						'_src/peppermint/peppermint.required.css',
						'_src/peppermint/peppermint.suggested.css',
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
						'_src/css/boilerplate.css',
						'_src/css/rem-mobile-fallback.css',
						'_src/peppermint/peppermint.required.css',
						'_src/peppermint/peppermint.suggested.css',
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
						'_src/css/boilerplate.css',
						'_src/css/rem-mobile-fallback.css',
						'_src/peppermint/peppermint.required.css',
						'_src/peppermint/peppermint.suggested.css',
						'_src/css/main.css',
						'_src/css/phone.css',
						'_src/css/tablet.css',
						'_src/css/desktop.css',
						'_src/css/syntax/syntax.css',
						'_src/css/font.css',
						'_src/css/ie8.css',
					],
				},
			},

			js: {
				files: {
					'js/scripts.js': [
						'_src/js/jquery-1.10.2.min.js',
						'_src/peppermint/peppermint.min.js',
						'_src/js/scroll-fallback.js',
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
				},
			},

			yml: {
				files: {
					'_config.yml': [
						'_src/yml/config.yml',
						'_src/yml/map.yml',
					]
				}
			}
		},

		'comment-media-queries': {
			ie7: {
				files: {
					'css/ie7.css': ['temp/ie7.css'],
					'css/ie8.css': ['temp/ie8.css']
				}
			},
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
			}
		},

		convert: {
			json2yaml: {
				src: ['temp/map.json'],
				dest: '_src/yml/map.yml'
			}
		},

		watch: {
			js: {
				files: ['_src/**.js'],
				tasks: ['concat:js', 'concat:headJs']
			},

			css: {
				files: ['_src/**.js'],
				tasks: ['concat:css', 'concat:ie7', 'concat:ie8']
			},
		},
	});

	// build
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-hashify');
	grunt.loadNpmTasks('grunt-comment-media-queries');
	grunt.loadNpmTasks('grunt-convert');

	grunt.registerTask('build', ['concat:css', 'concat:js', 'comment-media-queries', 'hashify', 'convert', 'concat:yml']);
	/*grunt.registerTask('w', ['build', 'watch']);*/
	grunt.registerTask('default', 'build');
};