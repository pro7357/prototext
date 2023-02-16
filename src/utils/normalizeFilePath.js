
import os from './os'

export const toUnixPath = path => path.replace(/\\/g, '/')
export const toWindowsPath = path => path.replace(/\//g, '\\')


export default (filePath, currentDoc, convertToUnixFormat) => {

	const isWindows = os.isWindows()

	convertToUnixFormat = convertToUnixFormat && isWindows

	let currentDocDir = currentDoc && currentDoc.dir

	if(convertToUnixFormat) {

		// Convert windows file path to the ubix format.
		// For example, from \Mac\image.jpeg to /Mac/image.jpeg
		currentDocDir = toUnixPath(currentDocDir)
		filePath = toUnixPath(filePath)

	} else {
		if(isWindows) {

			// Normalize windows file path slashes.
			// For example, from \Mac\assets/image.jpeg to \Mac\assets\image.jpeg
			currentDocDir = toWindowsPath(currentDocDir)
			filePath = toWindowsPath(filePath)

		}
	}

	if(filePath && currentDocDir) {
		if(filePath[0] === '.') {

			// Make the path absolute.
			filePath = currentDocDir+filePath.slice(2)

		} else {

			// Make the path relative
			// if the file is located nearby with the saved PTXT document.

			// let absFilePath = filePath.slice(0,currentDocDir.length)
			// if(absFilePath === currentDocDir) {
			// 	let prefix = isWindows && !convertToUnixFormat ? '..\\' : './'
			// 	filePath = prefix+filePath.slice(currentDocDir.length)
			// }

		}
	}

	return filePath

}
