
export default (filePath, currentDoc) => {

	const currentDocDir = currentDoc && currentDoc.dir

	if(filePath && currentDocDir) {
		if(filePath[0] === '.') {

			// Make the path absolute.
			filePath = currentDocDir+filePath.slice(2)

		} else {

			// Make the path relative
			// if the file is located nearby with the saved PTXT document.

			let absFilePath = filePath.slice(0,currentDocDir.length)
			if(absFilePath === currentDocDir) {
				filePath = './'+filePath.slice(currentDocDir.length)
			}

		}
	}

	return filePath

}
