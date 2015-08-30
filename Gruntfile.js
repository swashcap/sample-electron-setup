'use strict';

module.exports = function(grunt) {
    var config = {
        app: 'app',
        debugPort: 5858,
        dist: 'dist',
        name: 'Sample Electron Setup',
    };
    var pkg = grunt.file.readJSON('package.json');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: config,
        pkg: pkg,

        clean: ['<%= config.dist %>'],
        electron: {
            osxBuild: {
                options: {
                    'app-bundle-id': pkg.name,
                    'app-version': pkg.version,
                    arch: 'x64',
                    asar: false,
                    dir: '.',
                    'helper-bundle-id': pkg.version,
                    /**
                     * @todo  Figure out icon file format
                     */
                    icon: null,
                    /**
                     * @todo  Confirm no file names contain 'test'
                     */
                    ignore: new RegExp(
                        ['DS_Store', 'editorconfig', 'eslintrc', 'Gruntfile',
                        'README', 'test'].concat(Object.keys(pkg.devDependencies)).join('|')
                    ),
                    name: '<%= config.name %>',
                    out: '<%= config.dist %>',
                    overwrite: true,
                    platform: 'darwin',
                    prune: false,
                    version: '0.31.1',
                },
            },
        },
        eslint: {
            target: ['{main,render,test}/**/*.js', 'Gruntfile.js'],
        },
        exec: {
            debug: {
                command: [
                    'node-inspector &',
                    'open http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=<%= config.debugPort %> &&',
                    'node_modules/.bin/electron --debug=<%= config.debugPort %> .',
                ].join(' '),
            },
            electron: {
                command: 'node_modules/.bin/electron .',
            },
        },
        tape: {
            options: {
                pretty: true,
                output: 'console',
            },
            files: ['test/**/*.js'],
        },
    });

    grunt.registerTask('default', ['exec:electron']);
    grunt.registerTask('debug', ['exec:debug']);
    grunt.registerTask('build', ['clean', 'electron']);
    grunt.registerTask('test', ['tape']);
    grunt.registerTask('lint', ['eslint']);
};
