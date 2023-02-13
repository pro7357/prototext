
const fsPromises = require('fs').promises
const isExists = require('./isExists')
const createDir = require('./createDir')

/*

	Save a collection of files of a similar structure [
		{
			name: 'index',
			ext: 'html',
			data: htmlString,
		},
		{
			name: '596b9022-07df-4a2e-dc03-2855829dc98c',
			ext: 'jpg',
			subDir: 'content',
		}
	]

	If the instruction contains the data field, it means that the file must be created from scratch. Otherwise, copy the existing one from the src directory, taking into account the declared subdirectories.

	The instruction may also contain an src field to indicate where to copy the file from. But this opportunity has not yet been used. A general indication is used in the src function settings where to look for files to copy.

*/
module.exports = async (files, dst, src) => {

	if(!files) {
		throw new Error('noDataToSaveFiles')
	}

	for (const file of files) {

		let {
			name,
			ext,
			encoding,
			data,
			subDir
		} = file

		let fullFilename = `${name}.${ext}`
		let outputDir = `${dst}${subDir ? `/${subDir}`:``}`

		await createDir(outputDir)

		if(data) {

			// Save a new file.

			let outputAbsPath = `${outputDir}/${fullFilename}`

			await fsPromises.writeFile(
				outputAbsPath,
				data,
				encoding || 'utf8'
			)

			if(!await isExists(outputAbsPath)) {
				throw new Error('unableToSaveFile')
				return false
			}


		} else {

			// Copy the existing file.

			let inputAbsPath  = `${src}/${fullFilename}`
			let outputAbsPath = `${outputDir}/${fullFilename}`

			if(!await isExists(inputAbsPath)) {
				return false
			}

			await fsPromises.copyFile(
				inputAbsPath,
				outputAbsPath
			)

			if(!await isExists(outputAbsPath)) {
				return false
			}

		}


	}

	return true

}