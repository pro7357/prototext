
const path = require('path')
const { dialog } = require('electron')
const openPtxtFile = require('./openPtxtFile')


module.exports = (targetWindow, app, extension) => {

	const isPtxt = extension === 'ptxt'

	dialog.showOpenDialog(targetWindow, {
		properties: ['openFile'],
		filters: isPtxt
			? [
				{ name: 'ProtoText', extensions: ['ptxt'] },
			]
			: [
				{ extensions: [extension] }
			]
	}).then(async result => {
		if(result.canceled === false && result.filePaths && result.filePaths.length > 0) {

			let filePath = result.filePaths[0]

			if(filePath) {

				if(isPtxt) {
					openPtxtFile({targetWindow, filePath, importMode: true})
					app.addRecentDocument(filePath)
				} else {
					// nothing yet
				}

			}

		}
	}).catch(err => {
		console.log(err)
	})
}