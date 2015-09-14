var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var path = require('path');
var options = require('nomnom')
    .option('development', { flag: true })
    .parse();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

var isDevelopment = !!options.development;

// Report crashes to our server.
require('crash-reporter').start();

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    var url = isDevelopment ?
        'http://localhost:3000/' :
        'file://' + path.join(__dirname, '..', 'render', '/index.html');

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1200, height: 700});

    // and load the index.html of the app.
    mainWindow.loadUrl(url);

    if (isDevelopment) {
        // Open the devtools.
        mainWindow.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
