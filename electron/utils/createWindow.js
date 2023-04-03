
const log = require('electron-log')
const { BrowserWindow, Menu, shell, dialog, webFrame } = require('electron')
const path = require('path')
const isMac = process.platform === 'darwin'

const menuTemplate = require('./getMenu')
const handlePtxtFileOpenByClick = require('./handlePtxtFileOpenByClick')

const getTargetWindow = () => BrowserWindow.getFocusedWindow()


module.exports = props => {

	const {
		app,
		windows,
		fullscreenMode,
		onReady,
	} = props

	let newWindow
	let devtools
	let currentWindow = getTargetWindow()
	let x, y

	if(currentWindow) {
		const [ currentWindowX, currentWindowY ] = currentWindow.getPosition()
		x = currentWindowX + 16
		y = currentWindowY + 16
	}

	newWindow = new BrowserWindow({
		title: 'Untitled',
		x,
		y,
		width: 1380,
		height: 810,
		backgroundColor: '#282c34',
		titleBarStyle: isMac ? 'hidden' : 'default',
		minimizable: true,
		maximizable: true,
		fullScreenable: true,
		closable: true,
		transparent: isMac ? true : false,
		webPreferences: {
			spellcheck: true,
			contextIsolation: true,
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	if(!isMac && fullscreenMode) {
		// TODO:
		//newWindow.setDesktopIndex(desktopIndex)
		//newWindow.moveTop()
	}

	newWindow.loadFile('build/index.html')

	let menu = Menu.buildFromTemplate(
		menuTemplate({
			windows,
			getTargetWindow,
			app,
			isMac
		})
	)

	Menu.setApplicationMenu(menu)

	if(app.isPackaged === false) {
		if(isMac) {
			// newWindow.webContents.openDevTools()
		} else {
			// devtools = new BrowserWindow()
			// newWindow.webContents.setDevToolsWebContents(devtools.webContents)
			// newWindow.webContents.openDevTools({ mode: 'detach' })
		}
	}


	newWindow.webContents.on('crashed', function(e) {
   	log.info('Crashed', e)
   })


	newWindow.webContents.on('render-process-gone', function(e, details) {
		log.info('Render process gone', details)
	})


	newWindow.webContents.on('did-finish-load', function() {

		// Continue the initial opening of the program through the file.
		if(app.filePath) {
			handlePtxtFileOpenByClick(newWindow, app.filePath)
			app.filePath = null
		}

		if(typeof onReady === 'function') {
			onReady(newWindow)
		}

		if(isMac) {
			newWindow.setWindowButtonVisibility(false)
		}

	})

	newWindow.once('ready-to-show', function(){
		newWindow.show()
		if(isMac) {
			setTimeout(() => {
				if(newWindow.isFullScreen()) {
					getTargetWindow().setWindowButtonVisibility(true)
				}
			}, 300)
		}
	})


	newWindow.webContents.on('new-window', function(e, url) {
		e.preventDefault()
		shell.openExternal(url)
	})


	newWindow.on('enter-full-screen', function() {
		if(isMac) {
			setTimeout(() => {
				getTargetWindow().setWindowButtonVisibility(true)
			}, 300)
		}
	})

	newWindow.on('leave-full-screen', function() {
		if(isMac) {
			newWindow.setWindowButtonVisibility(false)
		}
	})


	newWindow.on('close', function(e) {

		log.info('Before Close')

		if(newWindow.isDocumentEdited()) {

			log.info('isDocumentEdited', true)
			log.info('autoSaveMode', app.autoSaveMode)

			if(newWindow.filePath && app.autoSaveMode) {

				log.info('Last saving')
				e.preventDefault()

				targetWindow.webContents.send(
					'save',
					{
						filePath: newWindow.filePath,
						lastSaving: true,
					}
				)

			} else {

				const choice = dialog.showMessageBoxSync(this, {
					type: 'question',
					buttons: ['Yes', 'No'],
					title: 'Confirm',
					message: 'Are you sure you want to quit? If you have unsaved data then it will be lost.'
				})

				if(choice === 1) {
					e.preventDefault()
				}
			}

		}

	})

	newWindow.on('closed', function() {
		windows.delete(newWindow)
		newWindow = null
	})


	windows.add(newWindow)

	return newWindow

}