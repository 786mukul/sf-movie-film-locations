'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            css: {
                files: ['styles/*.sass'],
                tasks: ['sass'],
            },
            js: {
                files: ['js/{,*/}*.js'],
                tasks: ['jshint'],
            },
        },
        sass: {
            dist: {
                options: {
                    compass: true,
                    style: 'compressed'
                },
                files: {
                    'styles/main.css': 'styles/main.sass',
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'js/{,*/}*.js',
            ]
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['watch']);
};
