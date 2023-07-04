
const fsPromises = require('fs').promises
const createDir = require('./createDir')
const path = require('path')
const { getUUID } = require('./crpyto')


module.exports = async (targetWindow, payload) => {

	const {
		ext,
		isBase64
	} = payload

	let data = payload.data

	const currentDocFilePath = targetWindow.filePath

	if(!currentDocFilePath) {
		return null
	}

	const assetsDir = `${path.dirname(currentDocFilePath)}/assets`

	await createDir(assetsDir)

	const assetFileName = `${getUUID()}.${ext}`
	const assetFilePath = `${assetsDir}/${assetFileName}`
	const assetRelativeFilePath = `./assets/${assetFileName}`

	let encoding = isBase64 ? 'base64' : 'utf8'

	if(typeof data === 'string' && data.indexOf(';base64,') > -1) {
		data = data.replace(/^data:([A-Za-z-+/]+);base64,/, '')
		encoding = 'base64'
	}

	const dataBuffer = Buffer.from(data, encoding)

	await fsPromises.writeFile(
		assetFilePath,
		dataBuffer
	)

	return assetRelativeFilePath

}