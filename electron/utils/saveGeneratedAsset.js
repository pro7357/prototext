
const fsPromises = require('fs').promises
const createDir = require('./createDir')
const path = require('path')
const { getUUID } = require('./crpyto')


module.exports = async (targetWindow, payload) => {

	const {
		data,
		ext
	} = payload

	const currentDocFilePath = targetWindow.filePath

	if(!currentDocFilePath) {
		return null
	}

	const assetsDir = `${path.dirname(currentDocFilePath)}/assets`

	await createDir(assetsDir)

	const assetFileName = `${getUUID()}.${ext}`
	const assetFilePath = `${assetsDir}/${assetFileName}`
	const assetRelativeFilePath = `./assets/${assetFileName}`

	const dataBuffer = Buffer.from(data)

	await fsPromises.writeFile(
		assetFilePath,
		dataBuffer
	)

	return assetRelativeFilePath

}