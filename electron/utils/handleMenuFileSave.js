
const os = require('os')
const path = require('path')
const { dialog } = require('electron')


module.exports = (saveAsMode, targetWindow, app) => {

	let filePath = targetWindow.filePath

	// Save the file to the previous address.
	if(filePath && !saveAsMode) {
		targetWindow.webContents.send('save', {filePath})
		return
	}

	dialog.showSaveDialog(targetWindow, {
		defaultPath: filePath || path.join(os.homedir(), 'Desktop', 'Untitled.ptxt'),
		properties: ['createDirectory','showOverwriteConfirmation']
	}).then(result => {
		if(result.canceled === false && result.filePath) {

			let newFilepath = result.filePath

			if(newFilepath && newFilepath.slice(-5) !== '.ptxt') {
				newFilepath += '.ptxt'
			}

			targetWindow.webContents.send('save', {filePath: newFilepath})
			targetWindow.filePath = newFilepath
			targetWindow.setTitle(path.basename(newFilepath))
			targetWindow.setDocumentEdited(false)

		}
	}).catch(err => {
		console.log(err)
	})

}
