
const fsPromises = require('fs').promises
const path = require('path')
const createDir = require('./createDir')


module.exports = async (targetWindow, filePath, doItSoftly) => {
	fsPromises.access(filePath)
		.then(async e => {
			if(doItSoftly) {

				const currentDocFilePath = targetWindow.filePath

				if(!currentDocFilePath) {
					return
				}

				const removedAssetsDir = `${path.dirname(currentDocFilePath)}/trash`

				await createDir(removedAssetsDir)

				const src = filePath
				const dst = `${removedAssetsDir}/${path.basename(filePath)}`

				fsPromises.rename(src, dst)

			} else {
				fsPromises.unlink(filePath)
			}
		})
		.catch(error => {
			console.log('No file', filePath)
		})
}