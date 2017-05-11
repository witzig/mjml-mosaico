'use strict';

const path = require('path');

module.exports = grunt => {
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');
    grunt.initConfig({
        makeThumbs: {
            main: {
                templates: './templates/*/*.html',
                template: './templates/%/*.html',
                outputFolder: 'edres',
                renderWidth: 680,
                outputWidth: 340
            }
        },
    });
};
