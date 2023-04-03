
const path = require('path')
const { dialog } = require('electron')
const openPtxtFile = require('./openPtxtFile')


module.exports = (targetWindow, app) => {
	dialog.showOpenDialog(targetWindow, {
		properties: ['openFile'],
		filters: [
			{ name: 'ProtoText', extensions: ['ptxt'] },
		]
	}).then(async result => {
		if(result.canceled === false && result.filePaths && result.filePaths.length > 0) {
			let filePath = result.filePaths[0]
			if(filePath) {
				openPtxtFile({targetWindow, filePath})
				app.addRecentDocument(filePath)
			}
		}
	}).catch(err => {
		console.log(err)
	})
}