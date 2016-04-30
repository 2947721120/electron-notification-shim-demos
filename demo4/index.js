// Main process
'use strict';
const path = require('path');
const app = require('app');
const ipc = require('electron').ipcMain;
const BrowserWindow = require('browser-window');

function createWindow(xOffset, yOffset) {
	const win = new BrowserWindow({
		x: xOffset,
		y: yOffset,

		webPreferences: {
			// Load `electron-notification-shim` in rendering view.
			preload: path.join(__dirname, 'browser.js')
		}
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('focus', () => win.webContents.send('notifications-shim-demo-focus-event'));
	win.openDevTools();
}

app.on('ready', () => {
	// Create two demo windows. Play with them to see notifications.
	createWindow(10, 10);
	createWindow(110, 110);

	// Listen for notification events. We have to listen globally as there's only one channel, but the event includes the 'sender' so we know where it came from.
	ipc.on('notification-shim', (e, msg) => {
		console.log(`Title: ${msg.title}, Content: ${msg.options.content}`);
		e.sender.send('notification-shim-demo-event', 'Hello to you too!');
	});
});
