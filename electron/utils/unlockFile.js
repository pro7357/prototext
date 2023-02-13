
const { dialog } = require('electron')
const decryptFileContent = require('./decryptFileContent')
const { getHash32 } = require('./crpyto')

module.exports = async (targetWindow, rawSecret) => {

	const filePath = targetWindow.filePath
	const fileData = targetWindow.fileData
	const fileEncryption = fileData && fileData.encryption
	let savedControlHash = fileEncryption && fileEncryption.controlHash

	if(!savedControlHash) {
		dialog.showErrorBox(
			'For some reason, this file does not contain a control hash key. ',
			'Decryption will continue. If you use the correct secret phrase, the result will also be correct.'
		)
	}

	savedControlHash = savedControlHash.slice(0,32)

	const currentUserSecretKey = getHash32(rawSecret)

	if(savedControlHash && savedControlHash !== getHash32(currentUserSecretKey)) {
		dialog.showErrorBox(
			'Decryption has been canceled.',
			'This secret phrase is incorrect.'
		)
		return
	}

	delete targetWindow.fileData

	fileData.encryption.secretKey = currentUserSecretKey

	fileData.filePath = filePath

	return decryptFileContent(fileData, currentUserSecretKey)

}