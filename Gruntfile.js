/*global module */
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		concat: {
			options: {
				separator: '\n\n'
			},

			css: {
				src: [
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
				dest: 'temp/css/style.css',
			},

			ie7: {
				src: [
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
				dest: 'temp/css/ie7.css',
			},

			ie8: {
				src: [
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
				dest: 'temp/css/ie8.css',
			},

			js: {
				options: {
					banner: '"use strict";\n\n'
				},
				src: [
					'_src/js/jquery-1.10.2.min.js',
					'_src/peppermint/peppermint.min.js',
					'_src/js/scroll-fallback.js',
					'_src/js/tools.js',
					'_src/js/test-console.js',
					'_src/js/metrika.js',
					'_src/js/init.js',
				],
				dest: 'temp/js/scripts.js',
			},

			headJs: {
				src: [
					'_src/js/modernizr.js',
					'_src/js/modernizr.bonus.js',
					'_src/sniffer/sniffer.min.js',
					'_src/js/sniffer.bonus.js',
					'_src/js/head.js',
				],
				dest: 'temp/js/header_scripts.js',
			},
		},

		'comment-media-queries': {
			ie7: {
				files: {
					'css/dist/ie7.css': ['temp/css/ie7.css'],
					'css/dist/ie8.css': ['temp/css/ie8.css']
				}
			},
		},

		/*hashres: {
			options: {
				fileNameFormat: '${name}.${ext}?${hash}',
				renameFiles: false,
			},
			ie7: {
				src: [
					'dist/prod/scripts/my-compressed-and-minified-scripts.js',
					'dist/prod/styles/my-compressed-and-minified-styles.css'
				],
				dest: 'dist/prod/home.php',
			}
		},

		uglify: {
			options: {
				mangle: {
					except: ['Peppermint', '$', 'jQuery', 'EventBurrito']
				}
			},
			peppermint: {
				files: {
					'temp/peppermint.min.js': ['src/peppermint.js']
				}
			},
			burrito: {
				files: {
					'temp/eventburrito.min.js': ['src/burrito/eventburrito.js']
				}
			}
		},

		watch: {
			files: ['src/*.js', 'package.json'],
			tasks: ['build']
		},*/
	});

	// build
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-hashres');
	grunt.loadNpmTasks('grunt-comment-media-queries');

	grunt.registerTask('build', ['concat', 'comment-media-queries']);
	/*grunt.registerTask('w', ['build', 'watch']);*/
	grunt.registerTask('default', 'build');
};