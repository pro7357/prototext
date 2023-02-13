
const os = require('os')
const path = require('path')
const { dialog } = require('electron')


module.exports = async (targetWindow) => {

	let filePath = targetWindow.filePath

	let defaultPath = filePath || path.join(os.homedir(), 'Desktop')
	let dir

	try {

		let result = await dialog.showOpenDialog(targetWindow, {
			defaultPath,
			buttonLabel: 'Choose',
			ttile: 'Choose a directory',
			properties: ['createDirectory','openDirectory']
		})

		if(result.canceled === false && result.filePaths && result.filePaths.length) {
			dir = result.filePaths[0]
		}

	} catch (error) {
		console.log(error)
	}

	return dir

}
