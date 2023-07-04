
const log = require('electron-log')
const { isWindows, isMac } = require('./os')

const {
	contextBridge,
	ipcRenderer,
	webFrame,
 } = require('electron')


// Expose API in React App world
contextBridge.exposeInMainWorld('electronAPI', {
	send: ( channel, data ) => ipcRenderer.invoke(channel, data),
	handle: ( channel, callable, event, data ) => ipcRenderer.on(
		channel,
		callable(event, data)
	),
	isMac,
	isWindows
})

window.addEventListener('DOMContentLoaded', () => {
	webFrame.setVisualZoomLevelLimits(1, 10)
})

window.addEventListener('error', e => {
	log.info(e && e.message)
})