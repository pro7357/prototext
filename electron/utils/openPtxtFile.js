
const { dialog } = require('electron')
const readFile = require('./readFile')
const path = require('path')
const log = require('electron-log')


module.exports = async props => {

	const {
		targetWindow,
		filePath,
		importMode,
		doNotKeepFilePath
	} = props

	let data

	try {

		log.info('Read file', filePath)

		data = await readFile(filePath)
		data = JSON.parse(data)
		if(!doNotKeepFilePath) {
			data.filePath = filePath
		}

	} catch (error) {
		log.info('Read file error', error.message)
	}

	if(!data) {
		dialog.showErrorBox(
			'Error. Unable to read the file :(',
			'The file is probably damaged or the reason is incompatibility of the versions of the program. Try to open it in a regular text editor to extract and save the texts manually.'
		)
		return
	}

	if(!importMode && !doNotKeepFilePath) {
		// Keep the current path to the file,
		// not the one that is written inside (the previous one).
		targetWindow.filePath = filePath
		targetWindow.setTitle(path.basename(filePath))
	}

	const fileEncryption = data.encryption

	if(fileEncryption){

		if(importMode) {
			dialog.showErrorBox(
				'This file is protected',
				'The function of importing encrypted data is not implemented at the moment.'
			)
			return
		}

		const savedControlHash = fileEncryption.controlHash

		targetWindow.fileData = data

		targetWindow.webContents.send('open', {
			encryption: {
				unlockMode: true,
				controlHash: savedControlHash
			}
		})

		return

	}

	targetWindow.webContents.send(
		importMode ? 'import' : 'open',
		data
	)

}