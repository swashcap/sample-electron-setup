# Sample Electron Setup

_A sample setup for an Electron application._

Here’s what you get:

* Easy task execution with [Grunt.js](http://gruntjs.com/)
* Modern templating with [React](http://facebook.github.io/react/)
* Fast development and builds with [Webpack](http://webpack.github.io/)
* Linting with [ESLint](http://eslint.org/)
* Testing with [tape](https://www.npmjs.com/package/tape)

## Setup

1. Install [Node.js](http://nodejs.org/)
2. Install [Grunt.js](http://gruntjs.com/getting-started#installing-the-cli): `npm install -g grunt-cli`
3. Clone the repository: `git clone git@github.com:swashcap/sample-electron-setup.git`
4. Install dependencies: `cd sample-electron-setup && npm i`

## Up and Running

1. **Run `grunt webpack` in a terminal tab:** This will output Webpack development server and render process information.
2. **Run `grunt` in a terminal tab:** This will output Electron's main process and crash reporter information.

See [project tasks](#project-tasks) for more info.

## Files and Directory Structure

```
├── app                            Application code
│   ├── main                         Files for Electron's 'main' process
│   │   └── index.js                   Electron's entry point
│   └── render                       Files for Electron's 'render' process
│       ├── images                     Logos, images, etc.
│       ├── index.html                 Entry HTML file
│       ├── scripts                    Render scripts
│       │   └── index.js                 Render scripts entry point
│       └── styles                     Render styles
│           └── main.css                 Main app styles
├── dist                           Built application for distribution
├── test                           All application tests
├── webpack.config.base.js         Base Webpack config
├── webpack.config.development.js  Webpack config for development
├── webpack.config.production.js   Webpack config for production/distribution
└── webpack.server.js              Webpack dev server (uses development config)
```

## Project Tasks

* **grunt:** Open the Electron application for development. You’ll also need to run **grunt webpack** to build the project’s render files.
* **grunt webpack:** Run the [Webpack](http://webpack.github.io/) development server.
* **grunt debug:** Run Electron in debug mode with [node-inspector](https://www.npmjs.com/package/node-inspector). You’ll need to have node-insector [globally installed](https://www.npmjs.com/package/node-inspector#install).
* **grunt build:** Build the application for distribution.
* **grunt test:** Run [tape](https://www.npmjs.com/package/tape) tests.
* **grunt lint:** Lint project files with [ESLint](http://eslint.org/).
