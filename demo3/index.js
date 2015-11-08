// Main process
'use strict';
const app = require('app');
const ipc = require('ipc');
const path = require('path');
const BrowserWindow = require('browser-window');

app.on('ready', () => {
	const win = new BrowserWindow({
		'web-preferences': {
			// Load `electron-notification-shim` in rendering view.
			preload: path.join(__dirname, 'browser.js')
		}
	});

	// Listen for notification events.
	ipc.on('notification-shim', (e, msg) => {
		console.log(`Title: ${msg.title}, Content: ${msg.options.content}`);
		e.sender.send('notification-shim-demo-event', 'Hello to you too!');
	});
	win.loadUrl(`file://${__dirname}/index.html`);
	win.openDevTools();
});
