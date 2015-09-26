/*global module */
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        concat: {
            options: {
                separator: '\n\n'
            },

            js: {
                files: {
                    'js/scripts.js': [
                        '_src/js/jquery-1.10.2.min.js',
                        '_src/peppermint/dist/peppermint.min.js',
                        '_src/stickyfill/dist/stickyfill.min.js',
                        '_src/js/slime.js',
                        '_src/js/scroll-fallback.js',
                        '_src/js/demo-frame.js',
                        '_src/js/collapser.js',
                        '_src/js/tools.js',
                        '_src/js/test-console.js',
                        '_src/js/metrika.js',
                        '_src/js/init.js',
                    ],

                    'js/header_scripts.js': [
                        '_src/js/modernizr.js',
                        '_src/js/modernizr.bonus.js',
                        '_src/sniffer/dist/min/sniffer.min.js',
                        '_src/js/sniffer.bonus.js',
                        '_src/js/head.js',
                    ]
                }
            }
        },

        stylus: {
            dev: {
                options: {
                    'include css': true,
                    compress: false,
                    paths: ['_src/styles', 'i'],
                    urlfunc: {
                        name: 'inline-image', // use inline-image('test.png') in our code to trigger Data URI embedding
                        limit: false,
                        paths: ['i']
                    }
                },
                files: {
                    'css/style.css': '_src/styles/style.styl'
                }
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false
                },
                processors: [
                    require('autoprefixer')({
                        browsers: '> 1%, last 2 versions, Firefox ESR'
                    })
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        connect: {
            server: {
                options: {
                    port: 8005,
                    hostname: '*',
                    base: '_site'
                }
            }
        },

        watch: {
            assets: {
                options: {
                    atBegin: true
                },
                files: ['_src/**/*'],
                tasks: ['build-drafts']
            },
            jekyll: {
                options: {
                    atBegin: false
                },
                files: [
                    '_drafts/**/*',
                    '_posts/**/*',
                    '_includes/**/*',
                    '_layouts/**/*',
                    'i/**/*',
                    'pics/**/*',
                    '_config.yml'
                ],
                tasks: ['shell:drafts']
            }
        },

        shell: {
            drafts: {
                command: 'jekyll build --drafts'
            },
            prod: {
                command: 'jekyll build'
            }
        }
    });

    // build
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.loadNpmTasks('grunt-shell');


    grunt.registerTask('assets', ['concat:js', 'stylus', 'postcss']);
    grunt.registerTask('build', ['assets', 'shell:prod']);
    grunt.registerTask('build-drafts', ['assets', 'shell:drafts']);
    grunt.registerTask('w', ['connect', 'watch']);
    grunt.registerTask('default', 'build');
};
