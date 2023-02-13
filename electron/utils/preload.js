
const {
	contextBridge,
	ipcRenderer,
	webFrame,
 } = require('electron')


window.addEventListener('DOMContentLoaded', () => {

	// Expose API in React App world
	contextBridge.exposeInMainWorld('electronAPI', {
		send: ( channel, data ) => ipcRenderer.invoke( channel, data ),
		handle: ( channel, callable, event, data ) => ipcRenderer.on( channel, callable( event, data ) )
	})

	webFrame.setVisualZoomLevelLimits(1, 10)

})