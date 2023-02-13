
// require('dotenv').config()

const { app, BrowserWindow, Notification, dialog, ipcMain } = require('electron')
const path = require('path')
const os = require('os')
const isMac = process.platform === 'darwin'

const {
	defOutputDirectory
} = require('./constants/index')

const createWindow = require('./utils/createWindow')
const saveStateAsPtxtFile = require('./utils/saveStateAsPtxtFile')
const saveFiles = require('./utils/saveFiles')
const chooseExportDir = require('./utils/chooseExportDir')
const handlePtxtFileOpenByClick = require('./utils/handlePtxtFileOpenByClick')
const handleTranslate = require('./utils/handleTranslate')
const linkFile = require('./utils/linkFile')
const deleteFile = require('./utils/deleteFile')
const { getHash32 } = require('./utils/crpyto')
const encryptFileContent = require('./utils/encryptFileContent')
const unlockFile = require('./utils/unlockFile')
const revealFileInFinder = require('./utils/revealFileInFinder')


let windows = new Set()
const getTargetWindow = () => BrowserWindow.getFocusedWindow()


// Start processing file opening by clicking on the label or in the "Recent" menu.
app.on('open-file', (event, filePath) => {

	let targetWindow = getTargetWindow()

	// The initial opening of the app through the file.
	if(targetWindow) {
		targetWindow.filePath = filePath
	} else {
		app.filePath = filePath
	}

	// Reopening the app via a file or a menu of previously opened files.
	const choice = targetWindow && targetWindow.isDocumentEdited() ? dialog.showMessageBoxSync(targetWindow, {
		type: 'question',
		buttons: ['Yes', 'No'],
		title: 'Confirm',
		message: 'Are you sure you want to close the current file and open another one? If you have unsaved data then it will be lost.'
	 }) : 0

	if(choice === 0) {
		handlePtxtFileOpenByClick(targetWindow, filePath)
	} else {
		event.preventDefault()
	}

})


app.setAboutPanelOptions({
    applicationName: 'ProtoText',
    applicationVersion: '1.7.0',
    version: (new Date()).toISOString().slice(0,10),
    credits: "letter2artemy@gmail.com",
    copyright: false
})



app.whenReady().then( async () => {

	targetWindow = createWindow({windows, app})

	// app.on('activate', () => {
	// 	if (BrowserWindow.getAllWindows().length === 0) {
	// 		targetWindow = createWindow({windows, app})
	// 	}
	// })


	ipcMain.handle('thereAreUnsavedChanges', async (event, props) => {
		// getTargetWindow().thereAreUnsavedChanges = true
		getTargetWindow().setDocumentEdited(true)
	})


	ipcMain.handle('completeSaving', async (event, props) => {

		const filePath = props.filePath
		let currentState = props.state
		let fileEncryption = currentState.encryption

		if(fileEncryption){
			currentState = encryptFileContent(currentState)
		}

		let isOk = await saveStateAsPtxtFile(
			filePath,
			JSON.stringify(currentState, null, 2)
		)

		if(isOk) {

			new Notification({
				title:'Saved ✅',
				body: filePath
			}).show()

			app.addRecentDocument(filePath)

			getTargetWindow().setDocumentEdited(false)

		} else {
			dialog.showErrorBox(
				'Error. Unable to save file :(',
				'Some error has happened. Try the "Menu > Export".'
			)
		}

	})


	ipcMain.handle('exportData', async (event, props) => {

		let dst = props.dst || defOutputDirectory

		if(dst[0] === '~') {
			dst = path.join(os.homedir(), dst.slice(1))
		}

		let isOk = await saveFiles(
			props.files,
			dst
		)

		if(isOk) {
			new Notification({
				title:'All files are saved' ,
				body: '✅'
			}).show()
		} else {
			dialog.showErrorBox(
				'Error. Unable to save files :(',
				'Some error has happened.'
			)
		}

	})


	ipcMain.handle('requestSecretHash', (event, secret) => {
		return getHash32(secret)
	})


	ipcMain.handle('unlockFile', async (event, secret) => {
		return await unlockFile(getTargetWindow(), secret)
	})


	ipcMain.handle('linkFile', async (event, assetMode) => {
		return await linkFile(getTargetWindow(), assetMode)
	})


	ipcMain.handle('deleteAsset', async (event, filePath) => {
		return await deleteFile(getTargetWindow(), filePath, true)
	})


	ipcMain.handle('revealFileInFinder', (event, filePath) => {
		return revealFileInFinder(filePath)
	})


	ipcMain.handle('requestOutputDir', async (event, props) => {
		return await chooseExportDir(getTargetWindow())
	})


	ipcMain.handle('closeApp', async (event, props) => {
		getTargetWindow().close()
	})


	ipcMain.handle('minimizeWindow', async (event, props) => {
		getTargetWindow().minimize()
	})


	ipcMain.handle('maximizeWindow', async (event, props) => {
		getTargetWindow().setFullScreen(true)
	})


	ipcMain.handle('toggleWindowButtons', async (event, value) => {
		if(isMac) {
			let targetWindow = getTargetWindow()
			if(targetWindow) targetWindow.setWindowButtonVisibility(!!value)
		}
	})


	ipcMain.handle('translate', async (event, props) => {
		return await handleTranslate(props, getTargetWindow())
	})


})

app.on('window-all-closed', function () {
	app.quit()
})