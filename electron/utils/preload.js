
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
	isMac: process.platform === 'darwin',
	isWindows: process.platform === 'win32'
})

window.addEventListener('DOMContentLoaded', () => {
	webFrame.setVisualZoomLevelLimits(1, 10)
})