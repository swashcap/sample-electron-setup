'use strict';

var escape = require('escape-string-regexp'); // eslint-disable-line no-unused-vars

module.exports = function(grunt) {
    var config = {
        app: 'app',
        debugPort: 5858,
        dist: 'dist',
        name: 'Sample Electron Setup',
        tmp: '.tmp',
    };
    var pkg = grunt.file.readJSON('package.json');
    /**
     * Must be a valid Electron tag.
     *
     * The 'electron-prebuilt' package's version matches the 'electron' version.
     * Use it.
     *
     * @{@link  https://github.com/maxogden/electron-packager}
     * @{@link  https://github.com/atom/electron/releases}
     */
    var electronVersion = grunt.file.readJSON('node_modules/electron-prebuilt/package.json').version;

    /**
     * Ignore files when building Electron app for distribution.
     *
     * @todo  Ensure no application file has 'test' in its name.
     */
    var electronIgnore = new RegExp([config.app, 'DS_Store', 'editorconfig',
        'eslintrc', 'gitignore', 'Gruntfile.js', 'LICENSE', 'README.md',
        'test'].concat(Object.keys(pkg.devDependencies)).join('|')
    );

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: config,
        pkg: pkg,

        clean: ['<%= config.tmp %>', '<%= config.dist %>'],
        cleanempty: {
            src: ['<%= config.tmp %>/**/*'],
        },
        copy: {
            app: {
                files: [{
                    cwd: '<%= config.app %>/main/',
                    expand: true,
                    dest: '<%= config.tmp %>/main/',
                    src: ['**'],
                }, {
                    cwd: '<%= config.app %>/render/',
                    expand: true,
                    dest: '<%= config.tmp %>/render/',
                    src: ['**', '!**/*.{js,jsx,json}'],
                }],
            },
        },
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
                    ignore: electronIgnore,
                    name: '<%= config.name %>',
                    out: '<%= config.dist %>',
                    overwrite: true,
                    platform: 'darwin',
                    prune: false,
                    version: electronVersion,
                },
            },
        },
        eslint: {
            target: ['{<%= config.app %>,test}/**/*.js', 'Gruntfile.js'],
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
                command: 'node_modules/.bin/electron . --development',
            },
            webpackBuild: {
                command: 'NODE_ENV=production node_modules/.bin/webpack -p --colors --config webpack.config.production.js',
            },
            webpackDevServer: {
                command: 'NODE_ENV=development node webpack.server.js',
            },
        },
        replace: {
            options: {
                prefix: '"main": "',
                preservePrefix: true,
            },
            app: {
                files: [{
                    expand: true,
                    src: ['package.json'],
                }],
                options: {
                    patterns: [{
                        match: '<%= escape(config.app) %>',
                        replacement: '<%= config.tmp %>',
                    }],
                },
            },
            tmp: {
                files: [{
                    expand: true,
                    src: ['package.json'],
                }],
                options: {
                    patterns: [{
                        match: '<%= escape(config.tmp) %>',
                        replacement: '<%= config.app %>',
                    }],
                },
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
    grunt.registerTask('webpack', ['exec:webpackDevServer']);
    grunt.registerTask('debug', ['exec:debug']);
    grunt.registerTask('build', [
        'clean',
        'exec:webpackBuild',
        'copy:app',
        'cleanempty',
        'replace:app',
        'electron',
        'replace:tmp',
    ]);
    grunt.registerTask('test', ['tape']);
    grunt.registerTask('lint', ['eslint']);
};
